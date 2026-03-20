// netlify/functions/chat.js
// Proxy sécurisé utilisant Google Gemini 2.0 Flash (gratuit)
// Dossier : netlify/functions/chat.js
// La clé API reste côté serveur — jamais exposée au navigateur

exports.handler = async function(event, context) {

  // Autoriser les requêtes OPTIONS (CORS preflight)
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

  // Autoriser uniquement les requêtes POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Méthode non autorisée' })
    };
  }

  // Récupérer la clé API Gemini depuis les variables d'environnement Netlify
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Clé API Gemini manquante. Ajoutez GEMINI_API_KEY dans les variables d\'environnement Netlify.' })
    };
  }

  try {
    // Lire le body envoyé par le widget
    const body = JSON.parse(event.body);

    // Extraire le system prompt et les messages
    const systemPrompt = body.system || '';
    const messages     = body.messages || [];

    // ── Construire l'historique au format Gemini ──
    // Le widget envoie des messages user/assistant alternés.
    // Gemini attend des rôles "user" et "model" (pas "assistant").
    const geminiContents = messages.map(m => ({
      role:  m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // ── Appel à l'API Gemini 2.0 Flash (modèle gratuit le plus récent) ──
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Instruction système : contexte OHADA d'InfoCompta
          system_instruction: {
            parts: [{ text: systemPrompt }]
          },
          // Historique de la conversation
          contents: geminiContents,
          // Paramètres de génération
          generationConfig: {
            maxOutputTokens: 1200,
            temperature:     0.7
          },
          // Paramètres de sécurité assouplis pour le contexte comptable
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
          ]
        })
      }
    );

    // Vérifier le statut HTTP de l'API Gemini
    if (!response.ok) {
      const errText = await response.text();
      console.error('Erreur API Gemini :', response.status, errText);
      return {
        statusCode: 502,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          error: `Erreur API Gemini (${response.status}) : ${errText}`
        })
      };
    }

    const data = await response.json();

    // ── Extraire le texte de la réponse Gemini ──
    // Structure : data.candidates[0].content.parts[0].text
    let text = '';
    try {
      text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (_) {
      text = '';
    }

    // Cas où Gemini bloque la réponse pour raisons de sécurité
    if (!text) {
      const finishReason = data?.candidates?.[0]?.finishReason || 'UNKNOWN';
      if (finishReason === 'SAFETY') {
        text = "Je ne peux pas répondre à cette question. Veuillez reformuler.";
      } else {
        text = "Désolé, je n'ai pas pu générer de réponse. Veuillez réessayer.";
      }
    }

    // ── Retourner la réponse au format compatible avec le widget InfoCompta ──
    // Le widget attend : { content: [{ type: 'text', text: '...' }] }
    return {
      statusCode: 200,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        content: [{ type: 'text', text: text }]
      })
    };

  } catch (error) {
    console.error('Erreur proxy chat :', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Erreur proxy : ' + error.message })
    };
  }
};
