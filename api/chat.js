// ═══════════════════════════════════════════════════════════════
//  api/chat.js  ← doit être dans un dossier "api" à la racine
//  Serverless Function Vercel → proxy API Groq (GRATUIT)
//
//  SETUP :
//  1. Allez sur https://console.groq.com
//  2. Créez un compte gratuit → "API Keys" → "Create API Key"
//  3. Dans Vercel : projet → Settings → Environment Variables
//     Ajoutez : GROQ_API_KEY = gsk_xxxxxxxxxxxxxxxxxxxxxxxx
//  4. Redéployez le projet
// ═══════════════════════════════════════════════════════════════

export default async function handler(req, res) {

  // ── CORS ──
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  // ── Vérification clé API ──
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      content: [{
        type: 'text',
        text: '🔴 Configuration manquante.\n\n→ Allez sur console.groq.com\n→ Créez un compte gratuit\n→ Générez une clé API\n→ Dans Vercel : Settings → Environment Variables → Ajoutez GROQ_API_KEY\n→ Redéployez le projet'
      }]
    });
  }

  // ── Lecture du body ──
  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: 'Corps de la requête invalide' });
  }

  const systemPrompt = (body.system   || 'Tu es un assistant comptable OHADA spécialisé.').slice(0, 4000);
  const messages     = (body.messages || []).slice(-14);

  // ── Nettoyage des messages (format OpenAI/Groq) ──
  const cleanMessages = [];
  for (const m of messages) {
    if (!m.content || !String(m.content).trim()) continue;
    const role    = m.role === 'assistant' ? 'assistant' : 'user';
    const content = String(m.content).slice(0, 3000);
    if (cleanMessages.length > 0 && cleanMessages[cleanMessages.length - 1].role === role) {
      cleanMessages[cleanMessages.length - 1].content += '\n' + content;
    } else {
      cleanMessages.push({ role, content });
    }
  }

  if (cleanMessages.length === 0 || cleanMessages[0].role !== 'user') {
    cleanMessages.unshift({ role: 'user', content: 'Bonjour' });
  }

  // ── Appel API Groq ──
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model:       'llama-3.3-70b-versatile',
        max_tokens:  1024,
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemPrompt },
          ...cleanMessages
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg  = errData?.error?.message || `HTTP ${response.status}`;
      let userMsg   = '';

      if (response.status === 401) {
        userMsg = '🔴 Clé API Groq invalide. Vérifiez GROQ_API_KEY sur console.groq.com';
      } else if (response.status === 429) {
        userMsg = '⏳ Limite de requêtes atteinte. Patientez quelques secondes et réessayez.';
      } else {
        userMsg = `⚠️ Erreur API Groq (${response.status}) : ${errMsg}`;
      }

      return res.status(200).json({ content: [{ type: 'text', text: userMsg }] });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || '';

    if (!text.trim()) {
      return res.status(200).json({
        content: [{ type: 'text', text: "Désolé, je n'ai pas pu générer de réponse. Veuillez réessayer." }]
      });
    }

    return res.status(200).json({
      content: [{ type: 'text', text }]
    });

  } catch (fetchError) {
    return res.status(200).json({
      content: [{
        type: 'text',
        text: `⚠️ Erreur réseau : ${fetchError.message}. Vérifiez votre connexion et réessayez.`
      }]
    });
  }
}
