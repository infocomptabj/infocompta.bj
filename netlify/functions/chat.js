// ═══════════════════════════════════════════════════════════════
//  netlify/functions/chat.js
//  Proxy sécurisé → API Groq (100% GRATUIT — 14 400 req/jour)
//
//  SETUP (une seule fois) :
//  1. Allez sur https://console.groq.com
//  2. Créez un compte gratuit (pas de carte bancaire)
//  3. Cliquez sur "API Keys" → "Create API Key"
//  4. Dans Netlify : Site settings → Environment variables
//     Ajoutez : GROQ_API_KEY = gsk_xxxxxxxxxxxxxxxxxxxxxxxx
//
//  Modèle utilisé : llama-3.3-70b-versatile (gratuit, très puissant)
//  Quota gratuit  : 14 400 requêtes/jour — largement suffisant
// ═══════════════════════════════════════════════════════════════

exports.handler = async function(event, context) {

  // ── CORS preflight ──
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

  // ── Vérification de la clé API Groq ──
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: [{
          type: 'text',
          text: '🔴 Configuration manquante.\n\n→ Allez sur console.groq.com\n→ Créez un compte gratuit\n→ Générez une clé API\n→ Dans Netlify : Site settings → Environment variables → Ajoutez GROQ_API_KEY'
        }]
      })
    };
  }

  // ── Lecture du body ──
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Corps de la requête invalide' })
    };
  }

  const systemPrompt = (body.system   || 'Tu es un assistant comptable OHADA spécialisé.').slice(0, 4000);
  const messages     = (body.messages || []).slice(-14);

  // ── Nettoyage des messages (Groq suit le format OpenAI) ──
  // Les rôles doivent alterner user/assistant, commencer par user
  const cleanMessages = [];
  for (const m of messages) {
    if (!m.content || !String(m.content).trim()) continue;
    const role    = m.role === 'assistant' ? 'assistant' : 'user';
    const content = String(m.content).slice(0, 3000);
    if (cleanMessages.length > 0 && cleanMessages[cleanMessages.length - 1].role === role) {
      // Fusionner deux messages consécutifs du même rôle
      cleanMessages[cleanMessages.length - 1].content += '\n' + content;
    } else {
      cleanMessages.push({ role, content });
    }
  }

  // S'assurer que le premier message est "user"
  if (cleanMessages.length === 0 || cleanMessages[0].role !== 'user') {
    cleanMessages.unshift({ role: 'user', content: 'Bonjour' });
  }

  // ── Appel à l'API Groq (format compatible OpenAI) ──
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model:       'llama-3.3-70b-versatile', // Modèle gratuit le plus puissant
        max_tokens:  1024,
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemPrompt }, // System prompt en premier
          ...cleanMessages
        ]
      })
    });

    // ── Gestion des erreurs HTTP ──
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg  = errData?.error?.message || `HTTP ${response.status}`;

      let userMsg = '';
      if (response.status === 401) {
        userMsg = '🔴 Clé API Groq invalide. Vérifiez votre clé GROQ_API_KEY sur console.groq.com';
      } else if (response.status === 429) {
        userMsg = '⏳ Limite de requêtes atteinte. Patientez quelques secondes et réessayez.';
      } else if (response.status === 400) {
        userMsg = `⚠️ Requête invalide : ${errMsg}`;
      } else {
        userMsg = `⚠️ Erreur API Groq (${response.status}) : ${errMsg}`;
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ content: [{ type: 'text', text: userMsg }] })
      };
    }

    // ── Extraction de la réponse ──
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || '';

    if (!text.trim()) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ content: [{ type: 'text', text: 'Désolé, je n\'ai pas pu générer de réponse. Veuillez réessayer.' }] })
      };
    }

    // ── Succès : retourner au format attendu par le widget ──
    return {
      statusCode: 200,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        content: [{ type: 'text', text }]
      })
    };

  } catch (fetchError) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        content: [{
          type: 'text',
          text: `⚠️ Erreur réseau : ${fetchError.message}. Vérifiez votre connexion et réessayez.`
        }]
      })
    };
  }
};
