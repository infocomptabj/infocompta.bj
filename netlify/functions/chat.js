// netlify/functions/chat.js
// Proxy sécurisé entre votre site et l'API Anthropic.
// La clé API n'est JAMAIS exposée au navigateur — elle reste ici côté serveur.

exports.handler = async function(event, context) {

  // Autoriser uniquement les requêtes POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Méthode non autorisée' })
    };
  }

  // Récupérer la clé API depuis les variables d'environnement Netlify
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Clé API manquante. Vérifiez vos variables d\'environnement Netlify.' })
    };
  }

  try {
    // Transmettre la requête à l'API Anthropic
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: event.body  // on transmet tel quel le body envoyé par le widget
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*'  // autorise votre site à appeler cette fonction
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur interne du proxy : ' + error.message })
    };
  }
};
