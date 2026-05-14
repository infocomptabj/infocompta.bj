// ═══════════════════════════════════════════════════════════════
//  ecritures-data.js — InfoCompta
//  Écritures comptables SYSCOHADA validées par l'expert
//  Source : cabinet InfoCompta Bénin
//
//  STRUCTURE DE CHAQUE ÉCRITURE :
//  {
//    libelle:   "Nom de l'impôt/opération",
//    condition: "Quand utiliser cette écriture (optionnel)",
//    lignes: [
//      { sens: "D" | "C", compte: "XXXXX", intitule: "...", montant: "variable|..." },
//    ],
//    libelle_ecriture: "S/Libellé de l'écriture",
//  }
//
//  Pour ajouter une nouvelle écriture, copiez un bloc existant
//  et remplissez les champs. Le chat l'utilisera automatiquement.
// ═══════════════════════════════════════════════════════════════

const ECRITURES = {

  // ────────────────────────────────────────────────────────────
  //  AIB — Acompte sur Impôts assis sur les Bénéfices
  // ────────────────────────────────────────────────────────────
  AIB_DECLARATION: {
    libelle: "AIB — Déclaration (compensation AIB collecté / AIB supporté)",
    condition: "À utiliser lors de la déclaration mensuelle d'AIB",
    cas: [
      {
        sous_titre: "Cas 1 : AIB collecté > AIB supporté (solde à reverser)",
        lignes: [
          { sens: "D", compte: "447801", intitule: "AIB collecté/facturé" },
          { sens: "C", compte: "447802", intitule: "AIB supporté/récupérable" },
          { sens: "C", compte: "447804", intitule: "AIB à reverser" },
        ],
        libelle_ecriture: "S/Déclaration AIB — solde à reverser",
      },
      {
        sous_titre: "Cas 2 : AIB supporté > AIB collecté (crédit reportable)",
        lignes: [
          { sens: "D", compte: "447801", intitule: "AIB collecté/facturé" },
          { sens: "D", compte: "4492",   intitule: "Crédit AIB reportable" },
          { sens: "C", compte: "447802", intitule: "AIB supporté/récupérable" },
        ],
        libelle_ecriture: "S/Déclaration AIB — crédit reportable",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  //  TVA — Taxe sur la Valeur Ajoutée
  // ────────────────────────────────────────────────────────────
  TVA_DECLARATION: {
    libelle: "TVA — Déclaration mensuelle (compensation TVA collectée / TVA supportée)",
    condition: "À utiliser lors de la déclaration mensuelle de TVA",
    cas: [
      {
        sous_titre: "Cas 1 : TVA collectée > TVA supportée (TVA due)",
        lignes: [
          { sens: "D", compte: "443",  intitule: "TVA collectée/facturée" },
          { sens: "C", compte: "4452", intitule: "TVA supportée/récupérable" },
          { sens: "C", compte: "4441", intitule: "TVA due à reverser" },
        ],
        libelle_ecriture: "S/Déclaration TVA — TVA due",
      },
      {
        sous_titre: "Cas 2 : TVA supportée > TVA collectée (crédit de TVA)",
        lignes: [
          { sens: "D", compte: "443",  intitule: "TVA collectée/facturée" },
          { sens: "D", compte: "4449", intitule: "Crédit de TVA reportable" },
          { sens: "C", compte: "4452", intitule: "TVA supportée/récupérable" },
        ],
        libelle_ecriture: "S/Déclaration TVA — crédit reportable",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  //  IRF — Impôt sur les Revenus Fonciers (RIRF = Retenue IRF)
  // ────────────────────────────────────────────────────────────
  IRF_DECLARATION: {
    libelle: "RIRF — Retenue IRF sur loyers (déclaration)",
    condition: "Lors de la comptabilisation du loyer avec retenue IRF à la source",
    cas: [
      {
        sous_titre: "Constatation de la charge de loyer avec retenue IRF",
        lignes: [
          { sens: "D", compte: "641100", intitule: "Charges de loyer (montant brut)" },
          { sens: "C", compte: "4428",   intitule: "RIRF retenu à la source (à reverser à la DGI)" },
          { sens: "C", compte: "401",    intitule: "Fournisseur — Bailleur (montant net versé)" },
        ],
        libelle_ecriture: "S/Déclaration RIRF — retenue sur loyer",
      },
    ],
  },
  IRF_REGLEMENT: {
    libelle: "RIRF — Règlement à la DGI",
    condition: "Lors du reversement de la retenue IRF à la DGI",
    cas: [
      {
        sous_titre: "Reversement de la retenue IRF à la DGI",
        lignes: [
          { sens: "D", compte: "4428",            intitule: "RIRF retenu (soldé)" },
          { sens: "C", compte: "521100 / 571100", intitule: "Banque / Caisse" },
        ],
        libelle_ecriture: "S/Règlement RIRF à la DGI",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  //  CCIB / ACCIB — Contribution à la Chambre de Commerce
  // ────────────────────────────────────────────────────────────
  ACCIB_DECLARATION: {
    libelle: "ACCIB — Cotisation à la Chambre de Commerce et d'Industrie du Bénin",
    condition: "Lors de la déclaration/paiement de la cotisation CCIB",
    cas: [
      {
        sous_titre: "Déclaration et règlement CCIB",
        lignes: [
          { sens: "D", compte: "635100",           intitule: "Cotisation CCIB (charge)" },
          { sens: "C", compte: "521100 / 571100",  intitule: "Banque / Caisse" },
        ],
        libelle_ecriture: "S/Déclaration CCIB",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  //  IS — Acomptes provisionnels sur Impôt sur les Sociétés
  // ────────────────────────────────────────────────────────────
  IS_ACOMPTE: {
    libelle: "IS — Versement des acomptes provisionnels (1er / 2e / 3e / 4e acompte)",
    condition: "À chaque versement d'acompte IS trimestriel",
    cas: [
      {
        sous_titre: "Versement d'un acompte IS",
        lignes: [
          { sens: "D", compte: "4492",             intitule: "Acompte IS versé (créance sur l'État)" },
          { sens: "C", compte: "521100 / 571100",  intitule: "Banque / Caisse" },
        ],
        libelle_ecriture: "S/Versement acompte IS (1er/2e/3e/4e acompte)",
      },
    ],
  },
  IS_REGULARISATION: {
    libelle: "IS — Régularisation annuelle au 31/12 (imputation des acomptes)",
    condition: "À la clôture de l'exercice, pour imputer les acomptes versés sur l'IS dû",
    cas: [
      {
        sous_titre: "Constatation de l'IS de l'exercice et imputation des acomptes",
        lignes: [
          { sens: "D", compte: "441",  intitule: "IS de l'exercice dû" },
          { sens: "C", compte: "4492", intitule: "Acomptes IS versés dans l'année (soldés)" },
        ],
        libelle_ecriture: "S/Reversement acomptes IS — Régularisation 31/12/N",
      },
    ],
    note: "Si IS dû > total acomptes versés → complément à payer : Débit 441 / Crédit 521100. Si IS dû < total acomptes → crédit d'IS à reporter.",
  },

  // ────────────────────────────────────────────────────────────
  //  DGI / CNSS — Salaires, ITS, VPS, Cotisations sociales
  // ────────────────────────────────────────────────────────────
  DGI_CNSS_DECLARATION: {
    libelle: "DGI/CNSS — Déclaration mensuelle (salaires, ITS, VPS, cotisations sociales)",
    condition: "Lors de la comptabilisation de la paie mensuelle",
    cas: [
      {
        sous_titre: "Constatation de la paie, des cotisations et retenues",
        lignes: [
          { sens: "D", compte: "6611",   intitule: "Appointements / Salaires bruts" },
          { sens: "D", compte: "6413",   intitule: "VPS (Versement Patronal sur Salaires)" },
          { sens: "D", compte: "6641",   intitule: "Charges patronales CNSS (19,4% du salaire brut)" },
          { sens: "C", compte: "4311",   intitule: "CNSS — Prestations familiales (part patronale)" },
          { sens: "C", compte: "4312",   intitule: "CNSS — Risques professionnels (part patronale)" },
          { sens: "C", compte: "4313",   intitule: "CNSS — Assurance vieillesse (3,6% salarié + 6,4% patronal)" },
          { sens: "C", compte: "4472",   intitule: "ITS retenu sur salaires (à reverser DGI)" },
          { sens: "C", compte: "442801", intitule: "VPS à reverser (DGI)" },
          { sens: "C", compte: "42200",  intitule: "Salaires nets à payer au personnel" },
        ],
        libelle_ecriture: "S/Déclaration DGI/CNSS — paie du mois",
      },
    ],
  },
  DGI_CNSS_REGLEMENT: {
    libelle: "DGI/CNSS — Règlement des cotisations et retenues",
    condition: "Lors du versement des cotisations CNSS et retenues fiscales à la DGI",
    cas: [
      {
        sous_titre: "Reversement CNSS + ITS + VPS",
        lignes: [
          { sens: "D", compte: "4311",   intitule: "CNSS — Prestations familiales" },
          { sens: "D", compte: "4312",   intitule: "CNSS — Risques professionnels" },
          { sens: "D", compte: "4313",   intitule: "CNSS — Assurance vieillesse" },
          { sens: "D", compte: "4472",   intitule: "ITS retenu" },
          { sens: "D", compte: "442801", intitule: "VPS" },
          { sens: "C", compte: "521100 / 571100", intitule: "Banque / Caisse (montant CNSS + DGI)" },
        ],
        libelle_ecriture: "S/Règlement DGI/CNSS",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  //  ORTB — Redevance ORTB
  // ────────────────────────────────────────────────────────────
  ORTB_DECLARATION: {
    libelle: "ORTB — Redevance audiovisuelle ORTB (déclaration)",
    condition: "Lors de la constatation de la redevance ORTB",
    cas: [
      {
        sous_titre: "Constatation de la redevance ORTB",
        lignes: [
          { sens: "D", compte: "6358", intitule: "Redevance ORTB (charge)" },
          { sens: "C", compte: "4428", intitule: "ORTB — redevance à reverser" },
        ],
        libelle_ecriture: "S/Redevance ORTB",
      },
    ],
  },
  ORTB_REGLEMENT: {
    libelle: "ORTB — Règlement de la redevance",
    condition: "Lors du paiement de la redevance ORTB",
    cas: [
      {
        sous_titre: "Paiement de la redevance ORTB",
        lignes: [
          { sens: "D", compte: "4428",            intitule: "ORTB — redevance à reverser (soldé)" },
          { sens: "C", compte: "521100 / 571100", intitule: "Banque / Caisse" },
        ],
        libelle_ecriture: "S/Règlement redevance ORTB",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  //  PATENTE — Contribution des Patentes
  // ────────────────────────────────────────────────────────────
  PATENTE_DECLARATION: {
    libelle: "PATENTE — Déclaration acompte / solde patente",
    condition: "Lors de la déclaration d'un acompte ou du solde de patente",
    cas: [
      {
        sous_titre: "Constatation de la patente due",
        lignes: [
          { sens: "D", compte: "6412", intitule: "Patente (charge fiscale)" },
          { sens: "C", compte: "4422", intitule: "Patente à payer" },
        ],
        libelle_ecriture: "S/Déclaration acompte / solde patente",
      },
    ],
  },
  PATENTE_REGLEMENT: {
    libelle: "PATENTE — Règlement de l'acompte / solde patente",
    condition: "Lors du paiement de la patente",
    cas: [
      {
        sous_titre: "Paiement de la patente",
        lignes: [
          { sens: "D", compte: "4422",   intitule: "Patente à payer (soldé)" },
          { sens: "C", compte: "521100", intitule: "Banque" },
        ],
        libelle_ecriture: "S/Règlement acompte / solde patente",
      },
    ],
  },

};

// ─── Index de recherche : mots-clés → clés d'écritures ───────────
// Permet au chat de trouver la bonne écriture selon les mots de la question
const INDEX_ECRITURES = {
  // AIB
  'aib':          ['AIB_DECLARATION'],
  '447801':       ['AIB_DECLARATION'],
  '447802':       ['AIB_DECLARATION'],
  '447804':       ['AIB_DECLARATION'],
  'acompte impot benefice': ['AIB_DECLARATION'],

  // TVA
  'tva':          ['TVA_DECLARATION'],
  '443':          ['TVA_DECLARATION'],
  '4452':         ['TVA_DECLARATION'],
  '4441':         ['TVA_DECLARATION'],
  '4449':         ['TVA_DECLARATION'],
  'taxe valeur ajoutee': ['TVA_DECLARATION'],

  // IRF
  'irf':          ['IRF_DECLARATION', 'IRF_REGLEMENT'],
  'rirf':         ['IRF_DECLARATION', 'IRF_REGLEMENT'],
  'revenu foncier': ['IRF_DECLARATION', 'IRF_REGLEMENT'],
  'loyer':        ['IRF_DECLARATION', 'IRF_REGLEMENT'],
  '641100':       ['IRF_DECLARATION'],
  '4428':         ['IRF_DECLARATION', 'IRF_REGLEMENT', 'ORTB_DECLARATION', 'ORTB_REGLEMENT'],

  // CCIB / ACCIB
  'ccib':         ['ACCIB_DECLARATION'],
  'accib':        ['ACCIB_DECLARATION'],
  'chambre commerce': ['ACCIB_DECLARATION'],
  '635100':       ['ACCIB_DECLARATION'],

  // IS acomptes
  'acompte is':   ['IS_ACOMPTE', 'IS_REGULARISATION'],
  'acompte impot societe': ['IS_ACOMPTE', 'IS_REGULARISATION'],
  '4492':         ['IS_ACOMPTE', 'IS_REGULARISATION'],
  '441':          ['IS_REGULARISATION'],
  'regularisation is': ['IS_REGULARISATION'],

  // DGI / CNSS / Salaires
  'salaire':      ['DGI_CNSS_DECLARATION', 'DGI_CNSS_REGLEMENT'],
  'its':          ['DGI_CNSS_DECLARATION', 'DGI_CNSS_REGLEMENT'],
  'vps':          ['DGI_CNSS_DECLARATION', 'DGI_CNSS_REGLEMENT'],
  'cnss':         ['DGI_CNSS_DECLARATION', 'DGI_CNSS_REGLEMENT'],
  'paie':         ['DGI_CNSS_DECLARATION', 'DGI_CNSS_REGLEMENT'],
  '6611':         ['DGI_CNSS_DECLARATION'],
  '6413':         ['DGI_CNSS_DECLARATION'],
  '6641':         ['DGI_CNSS_DECLARATION'],
  '4311':         ['DGI_CNSS_DECLARATION', 'DGI_CNSS_REGLEMENT'],
  '4472':         ['DGI_CNSS_DECLARATION', 'DGI_CNSS_REGLEMENT'],
  '442801':       ['DGI_CNSS_DECLARATION', 'DGI_CNSS_REGLEMENT'],
  '42200':        ['DGI_CNSS_DECLARATION'],

  // ORTB
  'ortb':         ['ORTB_DECLARATION', 'ORTB_REGLEMENT'],
  'redevance':    ['ORTB_DECLARATION', 'ORTB_REGLEMENT'],
  '6358':         ['ORTB_DECLARATION'],

  // PATENTE
  'patente':      ['PATENTE_DECLARATION', 'PATENTE_REGLEMENT'],
  '6412':         ['PATENTE_DECLARATION'],
  '4422':         ['PATENTE_DECLARATION', 'PATENTE_REGLEMENT'],
};

// ─── Impôts SANS écriture prédéfinie ────────────────────────────
// Pour ces impôts, le chat NE propose PAS d'écriture spontanément.
// Il peut répondre sur le fiscal, mais attend qu'on lui demande
// explicitement une écriture avant d'en proposer une.
const IMPOTS_SANS_ECRITURE = [
  'TFU',    // Taxe Foncière Unique
  'TVM',    // Taxe sur les Véhicules à Moteur
  'TAFA',   // Taxe sur les Activités Financières
  'TSPP',   // Taxe Spécifique Produits Pétroliers
  'TEOM',   // Taxe Enlèvement Ordures Ménagères
  'TPVI',   // Taxe Plus-Values Immobilières
  'IRCM',   // Impôt Revenus Capitaux Mobiliers
  'TPS',    // Taxe Professionnelle Synthétique
  'IBA',    // Impôt sur les Bénéfices d'Affaires (écriture à la demande)
];

export default ECRITURES;
export { ECRITURES, INDEX_ECRITURES, IMPOTS_SANS_ECRITURE };
