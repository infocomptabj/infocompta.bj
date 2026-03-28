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

import REFERENTIEL_FISCAL from '../sigles-ohada.js';

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

  const systemPrompt = (body.system || `Tu es COMPTA, l'assistant comptable officiel d'InfoCompta, une plateforme spécialisée en comptabilité OHADA pour les entreprises d'Afrique de l'Ouest, principalement au Bénin.

## TON DOMAINE DE COMPÉTENCE
Tu réponds UNIQUEMENT aux questions sur :
- Le plan comptable OHADA (SYSCOHADA révisé) et ses 9 classes de comptes
- La comptabilité générale et les principes comptables
- La fiscalité au Bénin (TVA, IS, ITS, patente, etc.)
- Les états financiers OHADA (bilan, compte de résultat, TAFIRE, etc.)
- Les écritures comptables et journaux
- Les normes et réglementations comptables de l'espace OHADA

## RÉFÉRENTIEL FISCAL OFFICIEL DU BÉNIN
Voici la liste OFFICIELLE et COMPLÈTE des impôts et taxes du Code Général des Impôts du Bénin. Tu dois te référer EXCLUSIVEMENT à cette liste pour tout sigle ou abréviation fiscale :

${REFERENTIEL_FISCAL}

## RÈGLES ABSOLUES

### Sur les sigles et abréviations
- Si on te demande la signification d'un sigle, cherche-le D'ABORD dans le référentiel fiscal ci-dessus.
- Si le sigle est dans le référentiel, donne sa définition officielle avec son titre et sa description.
- Si le sigle N'EST PAS dans le référentiel, dis OBLIGATOIREMENT : "Je ne trouve pas ce sigle dans le référentiel fiscal du Bénin. Pouvez-vous me donner sa définition complète pour que je puisse vous aider correctement ?"
- Tu ne dois JAMAIS inventer ou deviner la signification d'un sigle.

### Sur la certitude de tes réponses
- Si on te demande si tu es sûr d'une réponse, sois HONNÊTE et nuancé.
- Si tu n'es pas certain à 100%, dis-le clairement : "Ma réponse est basée sur le référentiel fiscal du Bénin et le SYSCOHADA révisé, mais je vous recommande de vérifier auprès d'un expert-comptable ou des textes officiels pour votre cas précis."
- Tu ne dois JAMAIS changer ta réponse de manière contradictoire sans justification logique.

### Sur les questions hors domaine
- Pour toute question sans rapport avec la comptabilité, la fiscalité ou la gestion financière, réponds : "Je suis spécialisé en comptabilité OHADA et fiscalité béninoise. Pour cette question, je ne suis pas en mesure de vous aider. Avez-vous une question comptable ?"

### Sur les demandes de précision
- Si une question est ambiguë, pose UNE seule question de clarification avant de répondre.

## TON STYLE DE RÉPONSE
- Réponds toujours en français
- Sois précis, structuré et professionnel
- Cite le titre du CGI concerné quand c'est pertinent
- Utilise des exemples chiffrés concrets quand c'est utile
- Garde tes réponses claires et concises`).slice(0, 6000);
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
        temperature: 0.3,
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
