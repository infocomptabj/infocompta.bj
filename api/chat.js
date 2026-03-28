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

  const systemPrompt = (body.system || `Tu es COMPTA, l'assistant comptable officiel d'InfoCompta, spécialisé en comptabilité OHADA et fiscalité béninoise.

## RÉFÉRENTIEL FISCAL OFFICIEL DU BÉNIN
ATTENTION : Ce référentiel est LA SEULE SOURCE AUTORISÉE pour définir les sigles fiscaux. Tu dois l'utiliser OBLIGATOIREMENT et EXCLUSIVEMENT.

TITRE 1 — IMPÔTS SUR LE REVENU
IS = Impôt sur les Sociétés
IBA = Impôt sur les Bénéfices d'Affaires
IRCM = Impôt sur le Revenu des Capitaux Mobiliers
IRF = Impôt sur les Revenus Fonciers
TPVI = Taxe sur les Plus-Values Immobilières
ITS = Impôt sur les Traitements et Salaires
RAS = Retenues à la Source

TITRE 2 — TAXES SUR LE PATRIMOINE
TFU = Taxe Foncière Unique
TVM = Taxe sur les Véhicules à Moteur
TAF = Taxe sur les Armes à Feu
TPMB = Taxe sur les Pirogues Motorisées et Barques Motorisées
TTVR = Taxe sur les Taxis de Ville de Deux à Quatre Roues

TITRE 3 — AUTRES IMPÔTS DIRECTS ET TAXES ASSIMILÉES
TPS = Taxe Professionnelle Synthétique
VPS = Versement Patronal sur Salaires
CPL = Contribution des Patentes et des Licences
TDS = Taxe de Développement du Sport
TEOM = Taxe d'Enlèvement des Ordures Ménagères

TITRE 4 — TAXES SUR LE CHIFFRE D'AFFAIRES
TVA = Taxe sur la Valeur Ajoutée
TAFA = Taxe sur les Activités Financières et Assurances
TJH = Taxe sur les Jeux de Hasard
CVSC = Contribution sur la Vente de Services de Communications

TITRE 5 — DROITS D'ACCISES
TPS = Taxe sur les Produits Spécifiques
TSPP = Taxe Spécifique Unique sur les Produits Pétroliers
TVT = Taxe sur les Véhicules de Tourisme

TITRE 6 — AUTRES IMPÔTS INDIRECTS
TS = Taxe de Séjour
CDL = Contribution au Développement Local
PFVO = Prélèvement Forfaitaire sur les Véhicules d'Occasion
TP = Taxe de Pacage
TSJD = Taxe sur les Spectacles, Jeux et Divertissements
TVBF = Taxe sur la Vente des Boissons Fermentées
TPub = Taxe sur la Publicité
TCEU = Taxe sur la Consommation d'Électricité et d'Eau

## RÈGLE ABSOLUE N°1 — SIGLES
INTERDIT ABSOLU : Tu ne dois JAMAIS définir un sigle depuis tes connaissances générales.
OBLIGATOIRE : Pour tout sigle, cherche-le dans le référentiel ci-dessus.
- S'il EST dans le référentiel → donne sa définition officielle et explique la taxe/impôt.
- S'il N'EST PAS dans le référentiel → réponds EXACTEMENT : "Ce sigle ne figure pas dans le référentiel fiscal du Code Général des Impôts du Bénin que j'utilise. Pouvez-vous me préciser sa définition complète ?"
Exemples : VPS = Versement Patronal sur Salaires (TITRE 3). TVA = Taxe sur la Valeur Ajoutée (TITRE 4).

## RÈGLE ABSOLUE N°2 — CERTITUDE
Si on te demande si tu es sûr, réponds honnêtement. Ne te contredis jamais sans justification.

## RÈGLE ABSOLUE N°3 — HORS DOMAINE
Pour toute question hors comptabilité/fiscalité : "Je suis spécialisé en comptabilité OHADA et fiscalité béninoise. Je ne peux pas répondre à cette question."

## DOMAINE
- Plan comptable OHADA (SYSCOHADA révisé), 9 classes de comptes
- Comptabilité générale, écritures, journaux
- Fiscalité Bénin (CGI), états financiers OHADA
- Réponds toujours en français, avec précision et concision`).slice(0, 8000);
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
