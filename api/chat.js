// ═══════════════════════════════════════════════════════════════
//  api/chat.js — InfoCompta
//  Système de réponse en 4 niveaux :
//  1. Référentiel fiscal CGI Bénin (sigles)
//  2. comptes-data.js (comptes OHADA)
//  3. Docs-context.js (fiscal + SYSCOHADA)
//  4. Connaissances générales OHADA/Bénin
// ═══════════════════════════════════════════════════════════════

// ── Référentiel fiscal CGI Bénin ──
const REFERENTIEL_SIGLES = {
  IS:   { titre: "TITRE 1 — IMPÔTS SUR LE REVENU", definition: "Impôt sur les Sociétés" },
  IBA:  { titre: "TITRE 1 — IMPÔTS SUR LE REVENU", definition: "Impôt sur les Bénéfices d'Affaires" },
  IRCM: { titre: "TITRE 1 — IMPÔTS SUR LE REVENU", definition: "Impôt sur le Revenu des Capitaux Mobiliers" },
  IRF:  { titre: "TITRE 1 — IMPÔTS SUR LE REVENU", definition: "Impôt sur les Revenus Fonciers" },
  TPVI: { titre: "TITRE 1 — IMPÔTS SUR LE REVENU", definition: "Taxe sur les Plus-Values Immobilières" },
  ITS:  { titre: "TITRE 1 — IMPÔTS SUR LE REVENU", definition: "Impôt sur les Traitements et Salaires" },
  RAS:  { titre: "TITRE 1 — IMPÔTS SUR LE REVENU", definition: "Retenues à la Source" },
  TFU:  { titre: "TITRE 2 — TAXES SUR LE PATRIMOINE", definition: "Taxe Foncière Unique" },
  TVM:  { titre: "TITRE 2 — TAXES SUR LE PATRIMOINE", definition: "Taxe sur les Véhicules à Moteur" },
  TPS:  { titre: "TITRE 3 — AUTRES IMPÔTS DIRECTS", definition: "Taxe Professionnelle Synthétique" },
  VPS:  { titre: "TITRE 3 — AUTRES IMPÔTS DIRECTS", definition: "Versement Patronal sur Salaires" },
  TEOM: { titre: "TITRE 3 — AUTRES IMPÔTS DIRECTS", definition: "Taxe d'Enlèvement des Ordures Ménagères" },
  TVA:  { titre: "TITRE 4 — TAXES SUR LE CHIFFRE D'AFFAIRES", definition: "Taxe sur la Valeur Ajoutée" },
  TAFA: { titre: "TITRE 4 — TAXES SUR LE CHIFFRE D'AFFAIRES", definition: "Taxe sur les Activités Financières et Assurances" },
  TSPP: { titre: "TITRE 5 — DROITS D'ACCISES", definition: "Taxe Spécifique Unique sur les Produits Pétroliers" },
};

// ── Détection des sigles dans la question ──
function detecterSigles(question) {
  const siglesDetectes = [];
  const mots = question.toUpperCase().replace(/[^A-Z0-9\s]/g, ' ').split(/\s+/);
  for (const mot of mots) {
    if (mot.length >= 2 && REFERENTIEL_SIGLES[mot]) {
      siglesDetectes.push({ sigle: mot, ...REFERENTIEL_SIGLES[mot] });
    }
  }
  return siglesDetectes;
}

// ── Recherche dans comptesData ──
function rechercherDansComptes(question, comptesData) {
  if (!comptesData) return null;
  const q = question.toLowerCase();
  const resultats = [];

  // Par numéro de compte
  const matchCodes = q.match(/\b(\d{2,4})\b/g) || [];
  for (const code of matchCodes) {
    if (comptesData[code]) {
      const c = comptesData[code];
      resultats.push(
        `COMPTE ${code} — ${c.libelle}\n` +
        `Nature : ${c.nature || ''} | Sens : ${c.sens || ''}\n` +
        `${(c.contenu || '').slice(0, 400)}\n` +
        (c.fonctionnement?.debit?.length  ? `Au débit : ${c.fonctionnement.debit.slice(0,2).join('; ')}\n` : '') +
        (c.fonctionnement?.credit?.length ? `Au crédit : ${c.fonctionnement.credit.slice(0,2).join('; ')}\n` : '') +
        (c.commentaires ? `Note : ${c.commentaires.slice(0, 250)}\n` : '')
      );
    }
  }

  // Par libellé
  if (resultats.length < 3) {
    const mots = q.split(/\s+/).filter(m => m.length > 4);
    for (const [code, compte] of Object.entries(comptesData)) {
      if (resultats.length >= 3) break;
      const libelle = (compte.libelle || '').toLowerCase();
      const contenu  = (compte.contenu  || '').toLowerCase();
      if (mots.some(m => libelle.includes(m)) && !resultats.some(r => r.startsWith(`COMPTE ${code}`))) {
        resultats.push(
          `COMPTE ${code} — ${compte.libelle}\n` +
          `Nature : ${compte.nature || ''}\n` +
          `${(compte.contenu || '').slice(0, 300)}\n` +
          (compte.commentaires ? `Note : ${compte.commentaires.slice(0, 200)}\n` : '')
        );
      }
    }
  }

  return resultats.length > 0 ? resultats.join('\n---\n') : null;
}

// ── Recherche dans docsContext ──
function rechercherDansDocs(question, docsContext) {
  if (!docsContext) return null;
  const qUp  = question.toUpperCase().replace(/[^A-Z0-9\s]/g, ' ');
  const qLow = question.toLowerCase();
  const resultats = [];

  if (docsContext.cgi) {
    for (const [cle, valeur] of Object.entries(docsContext.cgi)) {
      if (cle === 'meta') continue;
      if (qUp.includes(cle) || qLow.includes(cle.toLowerCase())) {
        const v = typeof valeur === 'object' ? valeur : {};
        let extrait = `CGI BÉNIN — ${cle}\n`;
        if (v.definition)           extrait += `Définition : ${String(v.definition).slice(0, 300)}\n`;
        if (v.taux)                 extrait += `Taux : ${JSON.stringify(v.taux).slice(0, 200)}\n`;
        if (v.base_imposable)       extrait += `Base : ${String(v.base_imposable).slice(0, 200)}\n`;
        if (v.declaration_paiement) extrait += `Échéances : ${JSON.stringify(v.declaration_paiement).slice(0, 200)}\n`;
        if (v.charges_deductibles)  extrait += `Charges déductibles : ${v.charges_deductibles.slice(0,3).join(', ')}\n`;
        if (v.penalites)            extrait += `Pénalités : ${JSON.stringify(v.penalites).slice(0, 200)}\n`;
        resultats.push(extrait);
      }
    }
  }

  if (docsContext.syscohada) {
    for (const [cle, valeur] of Object.entries(docsContext.syscohada)) {
      if (qLow.includes(cle.toLowerCase()) || qLow.includes((valeur?.titre || '').toLowerCase())) {
        resultats.push(
          `SYSCOHADA — ${cle}\n` +
          `${String(valeur?.resume || valeur?.contenu || JSON.stringify(valeur)).slice(0, 400)}\n`
        );
      }
    }
  }

  return resultats.length > 0 ? resultats.join('\n---\n') : null;
}

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Méthode non autorisée' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      content: [{ type: 'text', text: '🔴 GROQ_API_KEY manquante dans les variables d\'environnement Vercel.' }]
    });
  }

  const body = req.body;
  if (!body) return res.status(400).json({ error: 'Corps invalide' });

  const messages = (body.messages || []).slice(-14);
  const derniereQuestion = messages.filter(m => m.role === 'user').pop()?.content || '';

  // ══ Récupération du system prompt enrichi envoyé par le frontend ══
  // Le frontend construit un system prompt très riche (contexte OHADA + CGI + compte courant).
  // On le conserve pour l'injecter dans le system prompt final du backend.
  const frontendSystem = (typeof body.system === 'string' && body.system.trim())
    ? body.system.trim()
    : null;

  // ══ NIVEAU 1 — Sigles ══
  const siglesDetectes = detecterSigles(derniereQuestion);
  let contexteSignes = '';
  if (siglesDetectes.length > 0) {
    contexteSignes = '\n\n### SIGLES OFFICIELS CGI BÉNIN DÉTECTÉS\n';
    for (const s of siglesDetectes) {
      contexteSignes += `▸ ${s.sigle} = ${s.definition} [${s.titre}]\n`;
    }
    contexteSignes += '⚠ Ces définitions sont OFFICIELLES. Utilise-les telles quelles.\n';
  }

  // ══ NIVEAU 2 — comptes-data.js ══
  let contexteComptes = '';
  try {
    const mod = await import('../comptes-data.js');
    const comptesData = mod.default || mod.comptesData || mod;
    const resultat = rechercherDansComptes(derniereQuestion, comptesData);
    if (resultat) contexteComptes = '\n\n### PLAN COMPTABLE OHADA\n' + resultat;
  } catch (e) { /* non disponible */ }

  // ══ NIVEAU 3 — Docs-context.js ══
  let contexteDocs = '';
  try {
    const mod = await import('../Docs-context.js');
    const docsContext = mod.default || mod.DOCS_CONTEXT || mod;
    const resultat = rechercherDansDocs(derniereQuestion, docsContext);
    if (resultat) contexteDocs = '\n\n### CGI BÉNIN / SYSCOHADA\n' + resultat;
  } catch (e) { /* non disponible */ }

  const aDesContexte = contexteSignes || contexteComptes || contexteDocs;

  // ══ Construction du system prompt ══
  // Si le frontend a envoyé son propre system prompt (riche en contexte de page),
  // on l'utilise comme base et on y ajoute le contexte extrait côté serveur.
  // Sinon, on construit un system prompt générique.
  let systemPrompt;
  if (frontendSystem) {
    // Le frontend a déjà tout construit (contexte du compte courant, plan OHADA, CGI…).
    // On se contente d'y ajouter les données extraites par le backend (sigles, comptes, docs)
    // uniquement s'il y en a, pour éviter les doublons.
    systemPrompt = frontendSystem;
    if (aDesContexte) {
      systemPrompt += '\n\n## DONNÉES COMPLÉMENTAIRES EXTRAITES PAR LE SERVEUR'
        + contexteSignes + contexteComptes + contexteDocs;
    }
  } else {
    // Aucun system prompt du frontend — on construit le nôtre.
    systemPrompt = `Tu es COMPTA, l'assistant comptable officiel d'InfoCompta (Bénin).
Tu es spécialisé en comptabilité OHADA (SYSCOHADA révisé) et fiscalité béninoise (CGI Bénin).

## ORDRE DE PRIORITÉ DES SOURCES
1. Les données extraites de nos fichiers officiels (fournies ci-dessous si disponibles)
2. Tes connaissances en comptabilité OHADA et fiscalité béninoise

## RÈGLES IMPÉRATIVES
- SIGLES : Si un sigle est fourni dans le contexte ci-dessous, utilise OBLIGATOIREMENT cette définition. Ne jamais la remplacer par une autre. Si un sigle n'est pas dans le contexte, demande à l'utilisateur de préciser.
- RÉPONSE COMPLÈTE : Quand tu identifies un impôt ou une taxe, donne toujours : définition, qui est concerné, base imposable, taux, échéances déclaratives et comment le comptabiliser en OHADA.
- HONNÊTETÉ : Si tu ne trouves pas l'information, dis : "Je n'ai pas trouvé cette information dans mes sources. Pourriez-vous reformuler ou préciser votre question ?"
- Ne jamais inventer de taux, montants ou références légales.
- Réponds toujours en français, de façon claire et structurée.
${aDesContexte ? '\n## DONNÉES EXTRAITES DE NOS FICHIERS OFFICIELS' + contexteSignes + contexteComptes + contexteDocs : ''}`;
  }

  // ── Nettoyage messages ──
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
        max_tokens:  2048,
        temperature: 0.3,
        messages: [
          { role: 'system', content: systemPrompt.slice(0, 12000) },
          ...cleanMessages
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg  = errData?.error?.message || `HTTP ${response.status}`;
      let msg = '';
      if (response.status === 401) msg = '🔴 Clé API Groq invalide.';
      else if (response.status === 429) msg = '⏳ Limite atteinte. Réessayez dans quelques secondes.';
      else msg = `⚠️ Erreur API (${response.status}) : ${errMsg}`;
      return res.status(200).json({ content: [{ type: 'text', text: msg }] });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || '';

    if (!text.trim()) {
      return res.status(200).json({
        content: [{ type: 'text', text: "Je n'ai pas pu générer de réponse. Veuillez réessayer." }]
      });
    }

    return res.status(200).json({ content: [{ type: 'text', text }] });

  } catch (fetchError) {
    return res.status(200).json({
      content: [{ type: 'text', text: `⚠️ Erreur réseau : ${fetchError.message}.` }]
    });
  }
}
