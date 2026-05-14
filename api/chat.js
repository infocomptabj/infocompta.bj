// ═══════════════════════════════════════════════════════════════
//  api/chat.js — InfoCompta  (version 2.0)
//
//  SYSTÈME DE RÉPONSE EN 5 NIVEAUX :
//  1. Référentiel fiscal CGI Bénin (sigles officiels)
//  2. comptes-data.js  (plan comptable OHADA)
//  3. Docs-context.js  (CGI Bénin + SYSCOHADA)
//  4. Connaissances LLM filtrées OHADA/Bénin
//  5. Recherche web (fallback si rien trouvé) → source citée
//
//  CORRECTIONS v2 :
//  ✔ Recherche floue multi-mots (plus de ratés sur les données du site)
//  ✔ Anti-hallucination : le LLM est forcé de dire "je ne sais pas"
//    plutôt qu'inventer taux/montants/références légales
//  ✔ Fallback web via API gratuite (voir config SEARCH_API ci-dessous)
//  ✔ Source web toujours citée dans la réponse
//  ✔ Déduplication et nettoyage du system prompt
//  ✔ Gestion robuste des erreurs (Groq 429, 401, réseau)
// ═══════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────────
//  CONFIG RECHERCHE WEB
//  Option A (recommandée) : Brave Search API — gratuit 2 000 req/mois
//    → https://api.search.brave.com  (créer un compte gratuit)
//    → Ajouter dans Vercel : BRAVE_SEARCH_API_KEY = <votre clé>
//
//  Option B : Google Custom Search (100 req/jour gratuit)
//    → GOOGLE_SEARCH_API_KEY + GOOGLE_SEARCH_CX dans Vercel
//
//  Si aucune clé n'est configurée, le fallback web est désactivé
//  proprement et le chat l'indique à l'utilisateur.
// ────────────────────────────────────────────────────────────────

// ── Référentiel fiscal CGI Bénin (sigles officiels) ─────────────
const REFERENTIEL_SIGLES = {

  // ── TITRE 1 — IMPÔTS SUR LE REVENU ──────────────────────────
  IS: {
    titre: "TITRE 1 — IMPÔTS SUR LE REVENU",
    definition:
      "Impôt sur les Sociétés. Impôt annuel sur les bénéfices des personnes morales (SA, SARL…). " +
      "Taux général : 30%. Base : bénéfice fiscal de l'exercice. " +
      "Comptabilisation à la clôture : Débit 8512 (IS) / Crédit 4411 (IS à payer). " +
      "Paiement : Débit 4411 / Crédit 521.",
  },

  IBA: {
    titre: "TITRE 1 — IMPÔTS SUR LE REVENU",
    definition:
      "Impôt sur les Bénéfices d'Affaires. Impôt annuel sur les bénéfices des personnes physiques " +
      "exerçant une activité commerciale, industrielle ou artisanale (entreprises individuelles). " +
      "⚠️ NE PAS CONFONDRE AVEC L'AIB (Acompte sur Impôts assis sur les Bénéfices) qui est une retenue à la source. " +
      "L'IBA est un impôt final annuel ; l'AIB est un acompte prélevé à chaque transaction.",
  },

  AIB: {
    titre: "TITRE 1 — IMPÔTS SUR LE REVENU (Acompte / Retenue à la source)",
    definition:
      "Acompte sur Impôts assis sur les Bénéfices. " +
      "⚠️ L'AIB EST DIFFÉRENT DE L'IBA. L'IBA est l'impôt annuel sur les bénéfices des personnes physiques. " +
      "L'AIB est un ACOMPTE / RETENUE À LA SOURCE prélevé à chaque transaction, déductible de l'impôt final. " +
      "\n" +
      "TAUX LÉGAUX (CGI Bénin) :\n" +
      "  • 5% : sur les factures normalisées pour les achats de prestations de services et les achats de marchandises en gros.\n" +
      "  • 1% : au cordon douanier sur la valeur en douane majorée des droits et taxes (hors TVA) pour les importations/exportations.\n" +
      "\n" +
      "CAS D'APPLICATION :\n" +
      "  1. Achats de prestations de services (facture normalisée)\n" +
      "  2. Achats de marchandises en gros\n" +
      "  3. Importations / exportations (perçu au cordon douanier)\n" +
      "  4. Personnes sans IFU ou non répertoriées à la DGI\n" +
      "\n" +
      "FONCTIONNEMENT : AIB collecté − AIB supporté = montant à reverser (ou crédit reportable). " +
      "Depuis la loi de finances 2021 : suppression des demandes préalables de compensation.\n" +
      "\n" +
      "EXONÉRATION : Entreprises soumises à la TPS durant leur 1ère année d'activité.\n" +
      "\n" +
      "COMPTABILISATION SYSCOHADA :\n" +
      "  ⚠️ COMPTE CORRECT : 4478x (sous-comptes de 4478 — Autres impôts et taxes). " +
      "  ⚠️ COMPTE INCORRECT À NE JAMAIS UTILISER : 4452 (ce compte est réservé à la TVA, PAS à l'AIB). " +
      "  ⚠️ COMPTE INCORRECT À NE JAMAIS UTILISER : 635 (ce compte est réservé aux impôts sur bénéfices, PAS aux acomptes).\n" +
      "\n" +
      "  Chez l'ACHETEUR (qui supporte l'AIB retenu par le vendeur) :\n" +
      "    → Paiement de la facture TTC avec AIB retenu :\n" +
      "       Débit  607/6xx  — Achats / Charges         [montant HT]\n" +
      "       Débit  4452     — TVA déductible            [TVA si assujetti]\n" +
      "       Débit  44781    — AIB supporté              [5% ou 1% du montant]\n" +
      "         Crédit  401   — Fournisseurs              [total facture]\n" +
      "    → Paiement fournisseur : Débit 401 / Crédit 521\n" +
      "\n" +
      "  Chez le VENDEUR/COLLECTEUR (qui prélève et reverse l'AIB) :\n" +
      "    → Emission facture normalisée :\n" +
      "       Débit  411      — Clients                   [montant net après retenue]\n" +
      "       Débit  44782    — AIB collecté à reverser   [5% ou 1% prélevé]\n" +
      "         Crédit  70x   — Ventes/Prestations        [montant HT]\n" +
      "         Crédit  4431  — TVA collectée             [TVA si applicable]\n" +
      "    → Reversement DGI : Débit 44782 / Crédit 521\n" +
      "\n" +
      "  À la CLÔTURE (imputation sur impôt annuel) :\n" +
      "       Débit  8512     — IS / IBA de l'exercice\n" +
      "         Crédit  44781 — AIB supporté (soldé)\n" +
      "         Crédit  4411  — Impôt à payer (solde restant dû)\n" +
      "\n" +
      "SOURCE LÉGALE : CGI Bénin, circulaire DGI sur l'AIB ; Loi de finances 2021 (suppression formalités).",
  },

  IRCM: {
    titre: "TITRE 1 — IMPÔTS SUR LE REVENU",
    definition: "Impôt sur le Revenu des Capitaux Mobiliers. S'applique aux dividendes, intérêts et revenus de placements financiers.",
  },
  IRF: {
    titre: "TITRE 1 — IMPÔTS SUR LE REVENU",
    definition: "Impôt sur les Revenus Fonciers. S'applique aux loyers et revenus tirés de la location de biens immobiliers.",
  },
  TPVI: {
    titre: "TITRE 1 — IMPÔTS SUR LE REVENU",
    definition: "Taxe sur les Plus-Values Immobilières. Prélevée sur les gains réalisés lors de la cession de biens immobiliers.",
  },
  ITS: {
    titre: "TITRE 1 — IMPÔTS SUR LE REVENU",
    definition:
      "Impôt sur les Traitements et Salaires. Retenu à la source par l'employeur sur les salaires versés aux employés. " +
      "Comptabilisation employeur : Débit 661 (Salaires bruts) / Crédit 421 (Personnel, rémunérations dues) + Crédit 4441 (ITS à reverser). " +
      "Reversement DGI : Débit 4441 / Crédit 521.",
  },
  RAS: {
    titre: "TITRE 1 — IMPÔTS SUR LE REVENU",
    definition: "Retenues à la Source. Mécanisme général de prélèvement à la source sur différents revenus (honoraires, loyers, etc.).",
  },

  // ── TITRE 2 — TAXES SUR LE PATRIMOINE ───────────────────────
  TFU: {
    titre: "TITRE 2 — TAXES SUR LE PATRIMOINE",
    definition: "Taxe Foncière Unique. Taxe annuelle sur la propriété des terrains et bâtiments au Bénin.",
  },
  TVM: {
    titre: "TITRE 2 — TAXES SUR LE PATRIMOINE",
    definition: "Taxe sur les Véhicules à Moteur. Taxe annuelle due par les propriétaires de véhicules.",
  },

  // ── TITRE 3 — AUTRES IMPÔTS DIRECTS ─────────────────────────
  TPS: {
    titre: "TITRE 3 — AUTRES IMPÔTS DIRECTS",
    definition:
      "Taxe Professionnelle Synthétique. Régime simplifié pour les petites entreprises dont le chiffre d'affaires " +
      "est inférieur au seuil d'assujettissement à la TVA. Remplace IS/IBA, TVA et VPS. " +
      "Exonération AIB possible en 1ère année d'activité pour les entreprises soumises à la TPS.",
  },
  VPS: {
    titre: "TITRE 3 — AUTRES IMPÔTS DIRECTS",
    definition:
      "Versement Patronal sur Salaires. Contribution de l'employeur calculée sur la masse salariale. " +
      "Comptabilisation : Débit 664 (Charges sociales patronales) / Crédit 4446 (VPS à reverser).",
  },
  TEOM: {
    titre: "TITRE 3 — AUTRES IMPÔTS DIRECTS",
    definition: "Taxe d'Enlèvement des Ordures Ménagères. Taxe locale due par les occupants de locaux.",
  },

  // ── TITRE 4 — TAXES SUR LE CHIFFRE D'AFFAIRES ───────────────
  TVA: {
    titre: "TITRE 4 — TAXES SUR LE CHIFFRE D'AFFAIRES",
    definition:
      "Taxe sur la Valeur Ajoutée. Taux normal : 18% au Bénin. " +
      "⚠️ COMPTES TVA : 4431 (TVA collectée), 4452 (TVA déductible sur achats). " +
      "⚠️ Le compte 4452 est EXCLUSIVEMENT pour la TVA. NE JAMAIS l'utiliser pour l'AIB ou d'autres impôts. " +
      "TVA à décaisser = 4431 − 4452. Déclaration mensuelle.",
  },
  TAFA: {
    titre: "TITRE 4 — TAXES SUR LE CHIFFRE D'AFFAIRES",
    definition: "Taxe sur les Activités Financières et Assurances. S'applique aux opérations bancaires et d'assurance.",
  },

  // ── TITRE 5 — DROITS D'ACCISES ───────────────────────────────
  TSPP: {
    titre: "TITRE 5 — DROITS D'ACCISES",
    definition: "Taxe Spécifique Unique sur les Produits Pétroliers. Droits d'accises sur les carburants et produits pétroliers.",
  },

  // ── ADMINISTRATION & INSTITUTIONS ───────────────────────────
  IFU: {
    titre: "ADMINISTRATION FISCALE",
    definition:
      "Identifiant Fiscal Unique. Numéro d'identification attribué par la DGI à chaque contribuable au Bénin. " +
      "Les entreprises sans IFU sont automatiquement soumises à l'AIB à 5% sur leurs factures normalisées.",
  },
  DGI: {
    titre: "ADMINISTRATION FISCALE",
    definition: "Direction Générale des Impôts (Bénin). Autorité fiscale nationale chargée de l'assiette, du recouvrement et du contrôle des impôts.",
  },
  CNSS: {
    titre: "SÉCURITÉ SOCIALE",
    definition:
      "Caisse Nationale de Sécurité Sociale. Gère les cotisations sociales au Bénin. " +
      "Part patronale : 15,4% du salaire brut. Part salariale : 3,6% du salaire brut.",
  },
  OHADA: {
    titre: "DROIT DES AFFAIRES",
    definition: "Organisation pour l'Harmonisation en Afrique du Droit des Affaires. Cadre juridique et comptable (SYSCOHADA) commun aux États membres.",
  },
  UEMOA: {
    titre: "INTÉGRATION RÉGIONALE",
    definition: "Union Économique et Monétaire Ouest-Africaine. Union regroupant 8 pays dont le Bénin, partageant le franc CFA (XOF).",
  },
  CGI: {
    titre: "DROIT FISCAL",
    definition: "Code Général des Impôts du Bénin. Texte de référence regroupant l'ensemble de la législation fiscale béninoise.",
  },
};

// ── Mots vides à ignorer lors de la recherche floue ─────────────
const MOTS_VIDES = new Set([
  'les','des','une','que','qui','est','dans','pour','par','sur',
  'avec','vous','nous','mais','donc','alors','comment','quels',
  'quelles','quel','quelle','etre','avoir','faire','plus','sans',
  'comme','tout','tous','cette','cela','ceci','votre','notre',
  'leur','leurs','mon','son','ses','mes','tes','aux','the','and',
]);

// ── Extraction de mots-clés significatifs ───────────────────────
function extraireMots(texte, longueurMin = 4) {
  return texte
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // retire accents
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(m => m.length >= longueurMin && !MOTS_VIDES.has(m));
}

// ── Score de pertinence entre question et texte cible ────────────
function scorerPertinence(mots, texte) {
  const cible = texte.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let score = 0;
  for (const mot of mots) {
    if (cible.includes(mot)) score++;
    // bonus si le mot apparaît plusieurs fois (terme central)
    const occurrences = (cible.match(new RegExp(mot, 'g')) || []).length;
    if (occurrences > 1) score += Math.min(occurrences - 1, 2) * 0.5;
  }
  return score;
}

// ── NIVEAU 1 : Détection des sigles ─────────────────────────────
function detecterSigles(question) {
  const mots = question.toUpperCase().replace(/[^A-Z0-9\s]/g, ' ').split(/\s+/);
  return mots
    .filter(m => m.length >= 2 && REFERENTIEL_SIGLES[m])
    .map(m => ({ sigle: m, ...REFERENTIEL_SIGLES[m] }));
}

// ── NIVEAU 2 : Recherche dans comptesData (floue + numéro) ───────
function rechercherDansComptes(question, comptesData) {
  if (!comptesData || typeof comptesData !== 'object') return null;

  const mots = extraireMots(question, 4);
  const matchCodes = question.match(/\b(\d{2,6})\b/g) || [];
  const resultats = [];

  // Recherche directe par numéro de compte
  for (const code of matchCodes) {
    if (comptesData[code]) {
      const c = comptesData[code];
      resultats.push({
        score: 100,
        texte:
          `COMPTE ${code} — ${c.libelle}\n` +
          `Nature : ${c.nature || '—'} | Sens : ${c.sens || '—'}\n` +
          `${(c.contenu || '').slice(0, 500)}\n` +
          (c.fonctionnement?.debit?.length  ? `Au débit : ${c.fonctionnement.debit.slice(0, 3).join('; ')}\n` : '') +
          (c.fonctionnement?.credit?.length ? `Au crédit : ${c.fonctionnement.credit.slice(0, 3).join('; ')}\n` : '') +
          (c.commentaires ? `Note : ${c.commentaires.slice(0, 300)}\n` : ''),
      });
    }
  }

  // Recherche floue par libellé + contenu (si pas déjà trouvé par code)
  if (mots.length > 0) {
    for (const [code, compte] of Object.entries(comptesData)) {
      if (resultats.some(r => r.texte.startsWith(`COMPTE ${code}`))) continue;
      const texteRecherche = `${compte.libelle || ''} ${compte.contenu || ''} ${compte.commentaires || ''}`;
      const score = scorerPertinence(mots, texteRecherche);
      if (score >= 1) {
        resultats.push({
          score,
          texte:
            `COMPTE ${code} — ${compte.libelle}\n` +
            `Nature : ${compte.nature || '—'}\n` +
            `${(compte.contenu || '').slice(0, 400)}\n` +
            (compte.commentaires ? `Note : ${compte.commentaires.slice(0, 250)}\n` : ''),
        });
      }
    }
  }

  // Tri par pertinence, on garde les 4 meilleurs
  resultats.sort((a, b) => b.score - a.score);
  const top = resultats.slice(0, 4).map(r => r.texte);
  return top.length > 0 ? top.join('\n---\n') : null;
}

// ── NIVEAU 3 : Recherche dans docsContext (floue) ────────────────
function rechercherDansDocs(question, docsContext) {
  if (!docsContext || typeof docsContext !== 'object') return null;

  const mots    = extraireMots(question, 3);
  const qUp     = question.toUpperCase().replace(/[^A-Z0-9\s]/g, ' ');
  const resultats = [];

  // Recherche dans CGI Bénin
  if (docsContext.cgi && typeof docsContext.cgi === 'object') {
    for (const [cle, valeur] of Object.entries(docsContext.cgi)) {
      if (cle === 'meta') continue;
      const v = typeof valeur === 'object' && valeur !== null ? valeur : {};
      const texteIndex = `${cle} ${v.definition || ''} ${JSON.stringify(v).slice(0, 500)}`;
      const score = scorerPertinence(mots, texteIndex) + (qUp.includes(cle.toUpperCase()) ? 5 : 0);
      if (score >= 1) {
        let extrait = `CGI BÉNIN — ${cle}\n`;
        if (v.definition)           extrait += `Définition : ${String(v.definition).slice(0, 400)}\n`;
        if (v.taux)                 extrait += `Taux : ${JSON.stringify(v.taux).slice(0, 300)}\n`;
        if (v.base_imposable)       extrait += `Base imposable : ${String(v.base_imposable).slice(0, 300)}\n`;
        if (v.declaration_paiement) extrait += `Échéances : ${JSON.stringify(v.declaration_paiement).slice(0, 300)}\n`;
        if (v.charges_deductibles)  extrait += `Charges déductibles : ${v.charges_deductibles.slice(0, 5).join(', ')}\n`;
        if (v.penalites)            extrait += `Pénalités : ${JSON.stringify(v.penalites).slice(0, 200)}\n`;
        if (v.exonerations)         extrait += `Exonérations : ${JSON.stringify(v.exonerations).slice(0, 200)}\n`;
        resultats.push({ score, texte: extrait });
      }
    }
  }

  // Recherche dans SYSCOHADA
  if (docsContext.syscohada && typeof docsContext.syscohada === 'object') {
    for (const [cle, valeur] of Object.entries(docsContext.syscohada)) {
      const v = typeof valeur === 'object' && valeur !== null ? valeur : {};
      const texteIndex = `${cle} ${v.titre || ''} ${v.resume || ''} ${v.contenu || ''}`;
      const score = scorerPertinence(mots, texteIndex);
      if (score >= 1) {
        resultats.push({
          score,
          texte:
            `SYSCOHADA — ${cle}\n` +
            (v.titre  ? `Titre : ${v.titre}\n` : '') +
            `${String(v.resume || v.contenu || JSON.stringify(v)).slice(0, 500)}\n`,
        });
      }
    }
  }

  resultats.sort((a, b) => b.score - a.score);
  const top = resultats.slice(0, 4).map(r => r.texte);
  return top.length > 0 ? top.join('\n---\n') : null;
}

// ── NIVEAU 2ter : Recherche des écritures comptables validées ────
// Retourne { ecrituresTexte, impotSansEcriture }
// - ecrituresTexte : bloc formaté à injecter dans le prompt
// - impotSansEcriture : true si l'impôt détecté n'a pas d'écriture prédéfinie
async function rechercherEcritures(question) {
  let ecrData = null;
  try {
    const mod = await import('../ecritures-data.js');
    ecrData = {
      ecritures:         mod.ECRITURES         ?? mod.default?.ECRITURES         ?? mod.default ?? {},
      index:             mod.INDEX_ECRITURES    ?? mod.default?.INDEX_ECRITURES   ?? {},
      sansEcriture:      mod.IMPOTS_SANS_ECRITURE ?? mod.default?.IMPOTS_SANS_ECRITURE ?? [],
    };
  } catch (_) { return { ecrituresTexte: '', impotSansEcriture: false }; }

  const { ecritures, index, sansEcriture } = ecrData;
  const qNorm = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 1. Détecter si la question concerne un impôt SANS écriture prédéfinie
  //    et que l'utilisateur ne demande PAS explicitement une écriture
  const demandeEcriture = /ecrit|journalis|comptabilis|passer|enregistr|journal|pass|compt/i.test(question);
  const siglesDetectesSansEcriture = sansEcriture.filter(s =>
    new RegExp(`\\b${s}\\b`, 'i').test(question)
  );
  if (siglesDetectesSansEcriture.length > 0 && !demandeEcriture) {
    return {
      ecrituresTexte: '',
      impotSansEcriture: true,
      impotsConcernes: siglesDetectesSansEcriture,
    };
  }

  // 2. Chercher les écritures correspondantes via l'index
  const clesTrouvees = new Set();
  for (const [motCle, cles] of Object.entries(index)) {
    if (qNorm.includes(motCle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
      cles.forEach(c => clesTrouvees.add(c));
    }
  }

  if (clesTrouvees.size === 0) {
    return { ecrituresTexte: '', impotSansEcriture: false };
  }

  // 3. Formater les écritures trouvées
  const blocs = [];
  for (const cle of clesTrouvees) {
    const e = ecritures[cle];
    if (!e) continue;

    let bloc = `\n📒 **${e.libelle}**`;
    if (e.condition) bloc += `\n   _(${e.condition})_`;

    const casListe = e.cas || [];
    for (const cas of casListe) {
      if (cas.sous_titre) bloc += `\n\n   **${cas.sous_titre}**`;
      bloc += '\n```';
      const maxCompte = Math.max(...cas.lignes.map(l => l.compte.length));
      for (const l of cas.lignes) {
        const pad = ' '.repeat(maxCompte - l.compte.length);
        bloc += `\n   ${l.sens === 'D' ? 'D' : '  C'}  ${l.compte}${pad}  — ${l.intitule}`;
      }
      bloc += `\n   ${cas.libelle_ecriture}`;
      bloc += '\n```';
    }

    if (e.note) bloc += `\n   ⚠️ ${e.note}`;
    blocs.push(bloc);
  }

  return {
    ecrituresTexte: blocs.length > 0
      ? '\n\n### ✅ ÉCRITURES COMPTABLES VALIDÉES (InfoCompta)\n' + blocs.join('\n')
      : '',
    impotSansEcriture: false,
  };
}

// ── NIVEAU 5 : Recherche web (fallback) ─────────────────────────
// Utilise Brave Search API (gratuit) ou Google Custom Search.
// Renvoie { extrait, sourceUrl, sourceNom } ou null.
async function rechercherSurWeb(question) {
  const braveKey  = process.env.BRAVE_SEARCH_API_KEY;
  const googleKey = process.env.GOOGLE_SEARCH_API_KEY;
  const googleCX  = process.env.GOOGLE_SEARCH_CX;

  const requete = encodeURIComponent(
    `comptabilité fiscalité Bénin OHADA ${question.slice(0, 200)}`
  );

  // ── Brave Search ──
  if (braveKey) {
    try {
      const r = await fetch(
        `https://api.search.brave.com/res/v1/web/search?q=${requete}&count=3&lang=fr&country=BJ`,
        {
          headers: {
            'Accept':              'application/json',
            'Accept-Encoding':     'gzip',
            'X-Subscription-Token': braveKey,
          },
        }
      );
      if (r.ok) {
        const d = await r.json();
        const results = d?.web?.results || [];
        if (results.length > 0) {
          const top = results[0];
          return {
            extrait:   (top.description || top.extra_snippets?.[0] || '').slice(0, 600),
            sourceUrl: top.url,
            sourceNom: top.title || top.url,
          };
        }
      }
    } catch (_) { /* continue vers Google */ }
  }

  // ── Google Custom Search ──
  if (googleKey && googleCX) {
    try {
      const r = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${googleKey}&cx=${googleCX}&q=${requete}&num=3&lr=lang_fr`
      );
      if (r.ok) {
        const d = await r.json();
        const items = d?.items || [];
        if (items.length > 0) {
          const top = items[0];
          return {
            extrait:   (top.snippet || '').slice(0, 600),
            sourceUrl: top.link,
            sourceNom: top.title || top.link,
          };
        }
      }
    } catch (_) { /* aucun résultat */ }
  }

  return null; // aucune clé configurée ou aucun résultat
}

// ── NIVEAU 2bis : Recherche dans CGI-data.js (articles officiels) ─
function rechercherDansCGI(question, cgiData) {
  if (!cgiData || typeof cgiData !== 'object') return null;

  const mots    = extraireMots(question, 3);
  const qUp     = question.toUpperCase().replace(/[^A-Z0-9\s]/g, ' ');
  const resultats = [];

  // Sigles directement détectés dans la question → chercher la section correspondante
  const siglesQuestion = question.toUpperCase().match(/\b(IS|IBA|IRF|IRCM|ITS|AIB|TVA|TPS|VPS|TFU|TAFA|TPVI|IFU)\b/g) || [];

  for (const [section, contenu] of Object.entries(cgiData)) {
    if (section === 'meta') continue;
    if (typeof contenu !== 'object') continue;

    // Score de base : sigle exact dans la question
    let score = siglesQuestion.includes(section.toUpperCase()) ? 10 : 0;

    // Score sur le résumé
    if (contenu.resume) {
      score += scorerPertinence(mots, contenu.resume);
    }

    if (score < 1) continue;

    // Chercher les articles les plus pertinents dans cette section
    const articlesCorrespondants = [];
    if (contenu.articles && typeof contenu.articles === 'object') {
      for (const [num, texteArt] of Object.entries(contenu.articles)) {
        const scoreArt = scorerPertinence(mots, texteArt);
        if (scoreArt >= 1 || siglesQuestion.includes(section.toUpperCase())) {
          articlesCorrespondants.push({ num, texte: texteArt, score: scoreArt });
        }
      }
      articlesCorrespondants.sort((a, b) => b.score - a.score);
    }

    // Construire l'extrait
    let extrait = `[${section}] ${(contenu.resume || '').slice(0, 300)}\n`;
    for (const art of articlesCorrespondants.slice(0, 5)) {
      extrait += `\nArticle ${art.num} : ${art.texte.slice(0, 800)}\n`;
    }

    resultats.push({ score, texte: extrait });
  }

  resultats.sort((a, b) => b.score - a.score);
  const top = resultats.slice(0, 3).map(r => r.texte);
  return top.length > 0 ? top.join('\n---\n') : null;
}

// ── Détection si une réponse est nécessaire via le web ───────────
// Heuristique : si la question contient des mots d'actualité ou
// de référence précise non couverte par les données locales.
function necessiteWebSearch(question, aDesContexteLocal) {
  if (aDesContexteLocal) return false; // priorité aux données du site
  const signauxWeb = [
    /loi\s+de\s+finances/i,
    /budget\s+\d{4}/i,
    /nouveau[x]?\s+taux/i,
    /modifi[eé]/i,
    /actualit[eé]/i,
    /r[eé]forme/i,
    /\d{4}.*bénin/i,
    /décret\s+n°/i,
    /arrêté/i,
    /circulaire/i,
    /note\s+de\s+service/i,
  ];
  return signauxWeb.some(rx => rx.test(question));
}

// ════════════════════════════════════════════════════════════════
//  HANDLER PRINCIPAL
// ════════════════════════════════════════════════════════════════
export default async function handler(req, res) {

  // ── CORS ──
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Méthode non autorisée' });

  // ── Vérification clé Groq ──
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      content: [{ type: 'text', text: '🔴 Configuration manquante : GROQ_API_KEY absent dans les variables Vercel.' }],
    });
  }

  // ── Lecture du body ──
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Corps de requête invalide.' });
  }

  const messages         = (body.messages || []).slice(-14);
  const derniereQuestion = messages.filter(m => m.role === 'user').pop()?.content || '';
  const frontendSystem   = typeof body.system === 'string' ? body.system.trim() : '';

  if (!derniereQuestion.trim()) {
    return res.status(200).json({
      content: [{ type: 'text', text: 'Je n\'ai pas reçu de question. Veuillez réessayer.' }],
    });
  }

  // ════════════════════════════════════════════════════════════════
  //  COLLECTE DES CONTEXTES (niveaux 1 → 3)
  // ════════════════════════════════════════════════════════════════

  // NIVEAU 1 — Sigles officiels
  const siglesDetectes = detecterSigles(derniereQuestion);
  let contexteSignes = '';
  if (siglesDetectes.length > 0) {
    contexteSignes = '\n\n### ✅ SIGLES OFFICIELS CGI BÉNIN\n';
    for (const s of siglesDetectes) {
      contexteSignes += `▸ **${s.sigle}** = ${s.definition} [${s.titre}]\n`;
    }
    contexteSignes += '⚠️ Ces définitions sont OFFICIELLES et IMMUABLES.\n';
  }

  // NIVEAU 2 — Plan comptable OHADA
  let contexteComptes = '';
  try {
    const mod = await import('../comptes-data.js');
    const comptesData = mod.default ?? mod.comptesData ?? mod;
    const resultat = rechercherDansComptes(derniereQuestion, comptesData);
    if (resultat) {
      contexteComptes = '\n\n### ✅ PLAN COMPTABLE OHADA (données site)\n' + resultat;
    }
  } catch (_) { /* fichier non disponible */ }

  // NIVEAU 2bis — CGI Bénin 2026 (texte officiel, articles exacts)
  let contexteCGI = '';
  try {
    const mod = await import('../CGI-data.js');
    const cgiData = mod.default ?? mod.CGI_BENIN ?? mod;
    const resultat = rechercherDansCGI(derniereQuestion, cgiData);
    if (resultat) {
      contexteCGI = '\n\n### ✅ CODE GÉNÉRAL DES IMPÔTS BÉNIN 2026 (texte officiel)\n' + resultat;
    }
  } catch (_) { /* fichier non disponible */ }

  // NIVEAU 3 — Docs-context.js (SYSCOHADA + anciens docs fiscaux)
  let contexteDocs = '';
  try {
    const mod = await import('../Docs-context.js');
    const docsContext = mod.default ?? mod.DOCS_CONTEXT ?? mod;
    const resultat = rechercherDansDocs(derniereQuestion, docsContext);
    if (resultat) {
      contexteDocs = '\n\n### ✅ CGI BÉNIN / SYSCOHADA (données site)\n' + resultat;
    }
  } catch (_) { /* fichier non disponible */ }

  const aDesContexteLocal = !!(contexteSignes || contexteComptes || contexteCGI || contexteDocs);

  // NIVEAU 2ter — Écritures comptables validées par l'expert InfoCompta
  const { ecrituresTexte, impotSansEcriture, impotsConcernes } =
    await rechercherEcritures(derniereQuestion);

  // NIVEAU 5 — Fallback web (seulement si aucune donnée locale ET mots-clés d'actualité)
  let contexteWeb   = '';
  let sourceWebInfo = '';
  if (necessiteWebSearch(derniereQuestion, aDesContexteLocal)) {
    const webResult = await rechercherSurWeb(derniereQuestion);
    if (webResult) {
      contexteWeb   = `\n\n### 🌐 RÉSULTAT RECHERCHE WEB\n${webResult.extrait}\n`;
      sourceWebInfo = `\n📌 Source web : [${webResult.sourceNom}](${webResult.sourceUrl})`;
    }
  }

  const aDesContexte = aDesContexteLocal || !!contexteWeb;

  // ════════════════════════════════════════════════════════════════
  //  CONSTRUCTION DU SYSTEM PROMPT
  // ════════════════════════════════════════════════════════════════
  const blocContexte = [contexteSignes, contexteComptes, contexteCGI, contexteDocs, ecrituresTexte, contexteWeb]
    .filter(Boolean).join('');

  // Instruction source web à injecter dans le prompt si recherche web utilisée
  const instructionWeb = contexteWeb
    ? `\n- CITATION SOURCE WEB : Si tu utilises des informations du bloc "RÉSULTAT RECHERCHE WEB", tu DOIS terminer ta réponse par : "📌 Source : ${sourceWebInfo.replace('📌 Source web : ', '')}" — ne jamais omettre cette citation.`
    : '';

  // Instruction écritures comptables
  const instructionEcritures = impotSansEcriture
    ? `\n- ÉCRITURES COMPTABLES : La question concerne ${(impotsConcernes || []).join(', ')}. Aucune écriture standard n'est prédéfinie pour cet impôt dans nos données. NE PAS proposer d'écriture comptable spontanément. Réponds uniquement sur les aspects fiscaux (définition, taux, base, échéances). Si l'utilisateur demande EXPLICITEMENT une écriture, tu peux en proposer une en précisant clairement que c'est à titre indicatif et qu'elle doit être validée par un expert-comptable.`
    : ecrituresTexte
    ? `\n- ÉCRITURES COMPTABLES : Des écritures validées sont fournies dans le contexte (bloc "ÉCRITURES COMPTABLES VALIDÉES"). Utilise-les EXACTEMENT telles quelles. Ne pas les modifier, compléter ou remplacer par d'autres écritures.`
    : `\n- ÉCRITURES COMPTABLES : Si la question ne porte pas explicitement sur une écriture comptable, NE PAS en proposer spontanément. Attends que l'utilisateur le demande.`;

  const instructionsBase = `
## RÈGLES STRICTES ANTI-HALLUCINATION
- SIGLES : Si un sigle est fourni dans le contexte, utilise OBLIGATOIREMENT cette définition. Ne jamais l'inventer.
- DONNÉES CHIFFRÉES : Ne jamais inventer un taux, un montant, une date ou une référence légale. Si tu n'es pas certain, dis-le explicitement.
- HONNÊTETÉ : Si tu ne trouves pas l'information dans tes sources, réponds exactement : "Je n'ai pas trouvé cette information dans les données disponibles. Pourriez-vous reformuler ou préciser votre question ?"
- RÉPONSE COMPLÈTE : Pour tout impôt/taxe identifié, donne : définition, personnes concernées, base imposable, taux, échéances déclaratives. L'écriture comptable suit les règles ci-dessous.
- Ne pas mélanger la fiscalité d'autres pays avec celle du Bénin.${instructionEcritures}${instructionWeb}

## ORDRE DE PRIORITÉ DES SOURCES
1. Données extraites des fichiers du site (contexte ci-dessous, marqué ✅)
2. Résultats de recherche web (marqué 🌐) — citer la source
3. Connaissances générales OHADA/fiscalité béninoise (niveau 4)
${!aDesContexte ? '\n⚠️ Aucune donnée locale trouvée pour cette question. Reste prudent et signale si tu es incertain.' : ''}`;

  let systemPrompt;
  if (frontendSystem) {
    systemPrompt =
      frontendSystem +
      '\n\n## RÈGLES ET DONNÉES COMPLÉMENTAIRES (BACKEND)' +
      instructionsBase +
      (blocContexte ? '\n\n## DONNÉES EXTRAITES DES FICHIERS DU SITE' + blocContexte : '');
  } else {
    systemPrompt =
      `Tu es **COMPTA**, l'assistant comptable officiel d'**InfoCompta** (Bénin).
Tu es spécialisé en comptabilité OHADA (SYSCOHADA révisé) et fiscalité béninoise (CGI Bénin).
Tu réponds toujours en **français**, de façon **claire, structurée et professionnelle**.
` +
      instructionsBase +
      (blocContexte ? '\n\n## DONNÉES EXTRAITES DES FICHIERS DU SITE' + blocContexte : '');
  }

  // ════════════════════════════════════════════════════════════════
  //  NETTOYAGE ET VALIDATION DES MESSAGES
  // ════════════════════════════════════════════════════════════════
  const cleanMessages = [];
  for (const m of messages) {
    if (!m?.content || !String(m.content).trim()) continue;
    const role    = m.role === 'assistant' ? 'assistant' : 'user';
    const content = String(m.content).slice(0, 3000);
    // fusion des messages consécutifs de même rôle (évite erreur Groq)
    if (cleanMessages.length > 0 && cleanMessages[cleanMessages.length - 1].role === role) {
      cleanMessages[cleanMessages.length - 1].content += '\n' + content;
    } else {
      cleanMessages.push({ role, content });
    }
  }
  // Le premier message doit être "user"
  if (cleanMessages.length === 0 || cleanMessages[0].role !== 'user') {
    cleanMessages.unshift({ role: 'user', content: 'Bonjour' });
  }

  // ════════════════════════════════════════════════════════════════
  //  APPEL API GROQ
  // ════════════════════════════════════════════════════════════════
  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model:       'llama-3.3-70b-versatile',
        max_tokens:  2048,
        temperature: 0.2,          // plus bas = moins d'inventions
        top_p:       0.9,
        messages: [
          { role: 'system', content: systemPrompt.slice(0, 12000) },
          ...cleanMessages,
        ],
      }),
    });

    // ── Gestion des erreurs HTTP Groq ──
    if (!groqResponse.ok) {
      let errData = {};
      try { errData = await groqResponse.json(); } catch (_) {}
      const errMsg = errData?.error?.message || `HTTP ${groqResponse.status}`;

      let msgUtilisateur;
      switch (groqResponse.status) {
        case 401:
          msgUtilisateur = '🔴 Clé API Groq invalide. Vérifiez la variable GROQ_API_KEY dans Vercel.';
          break;
        case 429:
          msgUtilisateur = '⏳ Limite de requêtes atteinte. Veuillez patienter quelques secondes puis réessayer.';
          break;
        case 503:
          msgUtilisateur = '🔧 Le service est temporairement indisponible. Réessayez dans un moment.';
          break;
        default:
          msgUtilisateur = `⚠️ Erreur API (${groqResponse.status}) : ${errMsg}`;
      }
      return res.status(200).json({ content: [{ type: 'text', text: msgUtilisateur }] });
    }

    const data = await groqResponse.json();
    let texte  = data?.choices?.[0]?.message?.content?.trim() || '';

    if (!texte) {
      return res.status(200).json({
        content: [{ type: 'text', text: 'Je n\'ai pas pu générer de réponse. Veuillez reformuler votre question.' }],
      });
    }

    // Ajout automatique de la citation source web si pas déjà présente
    if (contexteWeb && sourceWebInfo && !texte.includes('📌 Source')) {
      texte += `\n\n${sourceWebInfo}`;
    }

    return res.status(200).json({ content: [{ type: 'text', text: texte }] });

  } catch (fetchError) {
    const msg = fetchError?.message || 'Erreur inconnue';
    return res.status(200).json({
      content: [{ type: 'text', text: `⚠️ Erreur réseau : ${msg}. Vérifiez votre connexion et réessayez.` }],
    });
  }
}
