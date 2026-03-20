// netlify/functions/chat.js
// VERSION DEBUG — Identifie précisément pourquoi Gemini ne répond pas

exports.handler = async function(event, context) {

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Méthode non autorisée' }) };
  }

  // ── TEST 1 : Clé API présente ? ──
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: [{ type: 'text', text: '🔴 ERREUR CONFIG : La variable GEMINI_API_KEY est absente.\n\n→ Netlify : Site settings → Environment variables → Ajoutez GEMINI_API_KEY avec votre clé Google AI Studio.' }]
      })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: [{ type: 'text', text: '🔴 ERREUR : Corps de la requête invalide.' }] })
    };
  }

  const systemPrompt = (body.system || 'Tu es un assistant comptable OHADA.').slice(0, 3000);
  const messages     = body.messages || [];

  const geminiContents = messages.map(m => ({
    role:  m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content).slice(0, 2000) }]
  }));

  if (geminiContents.length === 0) {
    geminiContents.push({ role: 'user', parts: [{ text: 'Bonjour' }] });
  }

  // ── Essai sur plusieurs modèles Gemini (du plus récent au plus ancien) ──
  const modelsToTry = [
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest'
  ];

  const diagnostics = [];

  for (const model of modelsToTry) {
    try {
      const payload = {
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: geminiContents,
        generationConfig: { maxOutputTokens: 800, temperature: 0.7 }
      };

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
      );

      const raw = await res.text();

      if (!res.ok) {
        diagnostics.push(`❌ ${model} → HTTP ${res.status} : ${raw.slice(0, 200)}`);
        continue;
      }

      let data;
      try { data = JSON.parse(raw); } catch (e) {
        diagnostics.push(`❌ ${model} → Réponse non-JSON`);
        continue;
      }

      const text         = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const finishReason = data?.candidates?.[0]?.finishReason;

      if (text && text.trim()) {
        // ✅ Succès
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ content: [{ type: 'text', text }] })
        };
      }

      if (finishReason === 'SAFETY') {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ content: [{ type: 'text', text: 'Je ne peux pas répondre à cette question. Veuillez reformuler.' }] })
        };
      }

      diagnostics.push(`⚠️ ${model} → Réponse vide (finishReason: ${finishReason}) | candidates: ${JSON.stringify(data?.candidates).slice(0, 150)}`);

    } catch (err) {
      diagnostics.push(`❌ ${model} → Exception : ${err.message}`);
    }
  }

  // ── Retourner le diagnostic complet ──
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({
      content: [{
        type: 'text',
        text: [
          '🔴 DIAGNOSTIC — Aucun modèle n\'a fonctionné :',
          '',
          ...diagnostics,
          '',
          '💡 Solutions :',
          '1. Clé API invalide → Générez une nouvelle clé sur aistudio.google.com',
          '2. API désactivée → Activez "Generative Language API" dans Google Cloud Console',
          '3. Quota dépassé → Vérifiez votre quota sur aistudio.google.com',
          '4. Copiez ce message et envoyez-le pour aide'
        ].join('\n')
      }]
    })
  };
};
