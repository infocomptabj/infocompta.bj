// netlify/functions/chat.js
// Proxy sécurisé utilisant Google Gemini (gratuit)
// La clé API reste côté serveur — jamais exposée au navigateur

exports.handler = async function(event, context) {

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
      body: JSON.stringify({ error: 'Clé API Gemini manquante.' })
    };
  }

  try {
    // Lire le body envoyé par le widget
    const body = JSON.parse(event.body);

    // Extraire le system prompt et les messages
    const systemPrompt = body.system || '';
    const messages     = body.messages || [];

    // Construire l'historique au format Gemini
    const geminiContents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Appel à l'API Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: geminiContents,
          generationConfig: {
            maxOutputTokens: 1200,
            temperature: 0.7
          }
        })
      }
    );

    const data = await response.json();

    // Extraire le texte de la réponse Gemini
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
      || "Désolé, je n'ai pas pu générer de réponse.";

    // Retourner au format compatible avec le widget
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur proxy : ' + error.message })
    };
  }
};
