// =============================================================================
// docs-context.js — Contexte fiscal & comptable pour assistant IA
// Source 1 : Résumé CGI Bénin 2026 (Loi n° 2021-15, MAJ Loi de Finances 2026)
// Source 2 : SYSCOHADA Révisé — Guide d'application (Ed. 2017, 142 applications)
// Généré le : 2026-03-20
// =============================================================================

const DOCS_CONTEXT = {

  // ===========================================================================
  // PARTIE 1 — CODE GÉNÉRAL DES IMPÔTS (CGI) BÉNIN 2026
  // ===========================================================================

  cgi: {

    meta: {
      titre: "Code Général des Impôts — République du Bénin 2026",
      loi: "Loi n° 2021-15 du 23 décembre 2021, mise à jour Loi de Finances 2026",
      structure: "6 livres (Art. 2–659)",
      devise: "FCFA",
    },

    // -------------------------------------------------------------------------
    // 1. IMPÔT SUR LES SOCIÉTÉS (IS) — Art. 2 à 53
    // -------------------------------------------------------------------------
    IS: {
      definition: `Impôt annuel sur les bénéfices des personnes morales (SA, SARL, SAS, SCS,
coopératives, banques, assurances, entreprises publiques commerciales). Toute
société résidente (siège ou direction effective au Bénin) ou disposant d'un
établissement stable est imposable.`,
      base_imposable: `Bénéfice net = actif net à la clôture − actif net à l'ouverture,
incluant cessions d'actif, produits financiers, subventions d'exploitation.`,
      taux: [
        { cas: "Activité industrielle (hors extractives), enseignement privé", taux: "25 %" },
        { cas: "Toutes autres personnes morales", taux: "30 %" },
        { cas: "Sociétés sous convention minière/pétrolière", taux: "Selon convention (≥ taux de droit commun)" },
      ],
      minimum_perception: [
        { secteur: "Sociétés à prépondérance immobilière", taux_min: "10 % des produits encaissables" },
        { secteur: "BTP", taux_min: "3 % des produits encaissables" },
        { secteur: "Tous autres cas", taux_min: "1 % des produits encaissables" },
        { secteur: "Stations-services", taux_min: "0,60 FCFA/litre vendu" },
        { secteur: "Minimum absolu", taux_min: "250 000 FCFA" },
      ],
      charges_deductibles: [
        "Rémunérations du personnel (effectives et non excessives)",
        "Intérêts dans la limite de 30 % du résultat avant impôt, intérêts, amortissements et provisions",
        "Redevances : 5 % du CA HT si bénéficiaire hors Bénin",
        "Frais de siège : 10 % du bénéfice imposable",
        "Dons et libéralités : 1 ‰ du CA HT",
        "Provisions justifiées",
        "Amortissements selon les taux officiels",
      ],
      charges_non_deductibles: [
        "Amendes et pénalités",
        "Dépenses somptuaires",
        "Rémunérations occultes",
        "IS lui-même",
        "Taxe sur les véhicules à moteur",
      ],
      report_deficitaire: "Déductible sur les 5 exercices suivants",
      declaration_paiement: [
        { obligation: "Déclaration annuelle des résultats", echeance: "30 avril de chaque année" },
        { obligation: "1er acompte trimestriel", echeance: "10 mars" },
        { obligation: "2e acompte trimestriel", echeance: "10 juin" },
        { obligation: "3e acompte trimestriel", echeance: "10 septembre" },
        { obligation: "4e acompte trimestriel", echeance: "10 décembre" },
        { obligation: "Solde de l'IS", echeance: "30 avril (jour du dépôt de la déclaration)" },
        { obligation: "Redevance ORTB (4 000 FCFA)", echeance: "Avec le 1er acompte (10 mars)" },
      ],
      note_acomptes: `Chaque acompte = 1/4 de l'IS de l'année précédente. Si déclaration
non encore déposée au 10 mars, 1er acompte calculé sur l'avant-dernier exercice,
avec régularisation au 2e acompte.`,
      penalites: [
        { infraction: "Retard ou défaut de déclaration", sanction: "20 % des droits (40 % après 30 jours de mise en demeure)" },
        { infraction: "Insuffisance de déclaration (bonne foi)", sanction: "20 % des droits non déclarés" },
        { infraction: "Insuffisance (mauvaise foi / manœuvres frauduleuses)", sanction: "40 % à 80 %" },
        { infraction: "Retard de paiement", sanction: "10 % + intérêts de retard 0,25 %/mois" },
        { infraction: "Déclaration inexacte en réduction d'acomptes (> 1/10)", sanction: "20 % de la différence" },
        { infraction: "Fraude fiscale (pénal)", sanction: "100 000 à 2 000 000 FCFA + emprisonnement 1 à 5 ans" },
      ],
    },

    // -------------------------------------------------------------------------
    // 2. IMPÔT SUR LES BÉNÉFICES D'AFFAIRES (IBA) — Art. 54 à 67
    // -------------------------------------------------------------------------
    IBA: {
      definition: `Impôt annuel sur les bénéfices des personnes physiques exerçant
habituellement une activité lucrative : commerçants, artisans, agriculteurs,
éleveurs, pêcheurs, professions libérales. S'applique aussi aux associés de
sociétés non soumises à l'IS pour leur quote-part de bénéfices.`,
      exonerations: [
        "Artistes vendant leur art, musiciens, comédiens",
        "Activités agricoles, élevage, pêche",
        "Contribuables relevant de la TPS",
        "Gains des jeux de hasard",
      ],
      taux: [
        { cas: "Toutes les personnes physiques relevant de l'IBA", taux: "30 %" },
        { cas: "Établissements privés d'enseignement", taux: "25 %" },
        { cas: "Artisans travaillant seuls à domicile ou en façon", taux: "50 % de réduction" },
      ],
      minimum_perception: [
        { secteur: "Cas général", taux_min: "1,5 % des produits encaissables" },
        { secteur: "BTP", taux_min: "3 % des produits encaissables" },
        { secteur: "Prépondérance immobilière", taux_min: "10 % des produits encaissables" },
        { secteur: "Minimum absolu", taux_min: "250 000 FCFA" },
      ],
      declaration_paiement: "Identiques à l'IS : déclaration au 30 avril, 4 acomptes trimestriels (10 mars, juin, septembre, décembre)",
      specificites: "Amortissement uniquement en mode linéaire. Report déficitaire limité à 3 ans.",
      penalites: "Identiques à celles de l'IS (art. 485 à 503)",
    },

    // -------------------------------------------------------------------------
    // 3. IMPÔT SUR LE REVENU DES CAPITAUX MOBILIERS (IRCM) — Art. 68 à 100
    // -------------------------------------------------------------------------
    IRCM: {
      definition: `Impôt sur les revenus des valeurs mobilières (dividendes, intérêts
sur obligations), des créances, dépôts et cautionnements, et les plus-values
de cession de valeurs mobilières. Retenu à la source par les entreprises qui
versent ces revenus.`,
      taux: [
        { type: "Dividendes distribués aux associés non-résidents", taux: "5 %" },
        { type: "Dividendes de sociétés cotées en bourse (UEMOA)", taux: "5 %" },
        { type: "Plus-values de cession d'actions (particuliers ou non-résidents)", taux: "5 %" },
        { type: "Dividendes (autres cas)", taux: "10 %" },
        { type: "Bénéfices réputés distribués par les établissements stables", taux: "10 %" },
        { type: "Rémunérations d'administrateurs, avances, etc.", taux: "15 %" },
        { type: "Revenus des obligations et emprunts", taux: "6 %" },
        { type: "Obligations émises par États UEMOA (5 à 10 ans)", taux: "3 %" },
        { type: "Obligations émises par États UEMOA (> 10 ans)", taux: "0 %" },
        { type: "Plus-values de cession d'obligations", taux: "5 %" },
        { type: "Revenus des créances, dépôts et cautionnements", taux: "15 %" },
      ],
      exonerations_principales: [
        "Produits des titres émis par l'État béninois",
        "Amortissements de capital dans conditions légales",
        "Plus-values de cession de titres inscrits à l'actif d'une entreprise IS/IBA",
        "Revenus distribués par les OPCVM agréés par le CREPMF",
        "Revenus de la Caisse des Dépôts et Consignations",
      ],
      declaration_paiement: [
        { obligation: "Versement de la retenue à la source", echeance: "Au plus tard le 10 du mois suivant le paiement des revenus" },
        { obligation: "Dividendes approuvés en AG", echeance: "Au plus tard le 10 du mois suivant la tenue de l'AG" },
        { obligation: "Déclaration récapitulative annuelle", echeance: "30 avril de chaque année" },
        { obligation: "Revenus de source étrangère", echeance: "Au plus tard le 10 du mois suivant l'encaissement" },
      ],
      penalites: "Défaut/retard de reversement : 20 % (porté à 40 % si retard > 2 mois). Art. 485 pour déclarations tardives.",
    },

    // -------------------------------------------------------------------------
    // 4. IMPÔT SUR LES REVENUS FONCIERS (IRF) — Art. 101 à 107
    // -------------------------------------------------------------------------
    IRF: {
      definition: `Impôt sur les revenus des propriétés bâties (maisons, immeubles,
locations meublées) et non bâties (terrains, carrières, salines) perçus par
les personnes physiques, l'État, les communes, les associations et ONG. Également
applicable aux associés de sociétés à prépondérance immobilière non soumises à l'IS.`,
      base_imposable: "Montant brut des loyers perçus (+ charges du propriétaire mises à la charge du locataire − charges supportées pour le compte des locataires)",
      taux: [
        { cas: "Taux normal (retenue et imposition)", taux: "12 % du loyer brut" },
        { cas: "Retenue si bailleur soumis à l'IBA ou l'IS", taux: "10 % du loyer brut" },
        { cas: "Redevance ORTB", taux: "4 000 FCFA ajoutés à l'impôt dû" },
      ],
      declaration_paiement: [
        { obligation: "État annuel des locataires et loyers perçus", echeance: "10 février de chaque année" },
        { obligation: "Retenue à la source sur loyers (par locataires personnes morales)", echeance: "10 du mois suivant le paiement du loyer" },
        { obligation: "Paiement de l'impôt (4 acomptes)", echeance: "Comme IBA : 10 mars, juin, septembre, décembre" },
      ],
      penalites: "Défaut ou retard de déclaration : art. 485. Défaut de reversement des retenues : 20 % (40 % après 2 mois). Acomptes en retard : 10 %.",
    },

    // -------------------------------------------------------------------------
    // 5. TAXE SUR LES PLUS-VALUES IMMOBILIÈRES (TPVI) — Art. 108 à 118
    // -------------------------------------------------------------------------
    TPVI: {
      definition: `Taxe sur les plus-values réalisées lors de la cession d'immeubles bâtis
ou non bâtis, de droits réels immobiliers, de titres de sociétés à prépondérance
immobilière ou de titres miniers.`,
      exonerations: [
        "Cessions par l'État et établissements publics administratifs",
        "Plus-values de cession d'immeubles inscrits à l'actif d'une entreprise IS/IBA",
      ],
      base_imposable: `Plus-value = Prix de cession − Prix/valeur d'acquisition (majoré des ouvrages).
En cas de construction : plus-value forfaitaire = 10 % du prix de cession.`,
      taux: [
        { cas: "Taux général", taux: "5 % de la plus-value" },
        { cas: "Plancher (toujours applicable)", taux: "Minimum 1 % du prix de cession" },
      ],
      declaration_paiement: `Déclarée et payée au moment des formalités d'enregistrement de l'acte
d'aliénation. Pour cessions de titres miniers entre non-résidents : le cessionnaire
retient et acquitte pour le compte du cédant. Aucune mutation foncière ne peut
s'effectuer sans justification préalable du paiement.`,
      penalites: [
        { infraction: "Omission de renseignements", sanction: "20 % de la taxe" },
        { infraction: "Fausse valeur d'acquisition", sanction: "40 %" },
        { infraction: "Retard", sanction: "Art. 485" },
      ],
    },

    // -------------------------------------------------------------------------
    // 6. IMPÔT SUR LES TRAITEMENTS ET SALAIRES (ITS) — Art. 119 à 129
    // -------------------------------------------------------------------------
    ITS: {
      definition: `Impôt retenu à la source sur les salaires, traitements, émoluments,
avantages en nature et accessoires, indemnités de fin de carrière, et
rémunérations des dirigeants de sociétés IS.`,
      exonerations: [
        "Indemnités légales de licenciement",
        "Allocations familiales dans la limite légale",
        "Cotisations patronales de prévoyance dans la limite légale",
        "Rémunérations de stage (max 3 mois, ≤ 3 SMIG, obligation scolaire)",
      ],
      bareme_mensuel: [
        { tranche: "0 à 60 000 FCFA", taux: "0 %" },
        { tranche: "60 001 à 150 000 FCFA", taux: "10 %" },
        { tranche: "150 001 à 250 000 FCFA", taux: "15 %" },
        { tranche: "250 001 à 500 000 FCFA", taux: "19 %" },
        { tranche: "Au-delà de 500 000 FCFA", taux: "30 %" },
      ],
      avantages_nature: [
        "Logement = 15 % du salaire de base",
        "Électricité dirigeants = 50 000 FCFA/mois",
      ],
      redevance_ORTB: "1 000 FCFA en mars + 3 000 FCFA en juin (exonéré si ≤ première tranche)",
      abattements: "25 % d'abattement sur les IFC et primes de départ",
      declaration_paiement: [
        { obligation: "Retenue mensuelle à la source par l'employeur", echeance: "10 du mois suivant le mois de paie" },
        { obligation: "Déclaration mensuelle (DSF)", echeance: "10 du mois suivant" },
        { obligation: "État annuel des salaires versés", echeance: "30 avril de chaque année" },
      ],
      penalites: "Défaut de retenue : l'employeur est personnellement redevable du montant non retenu + pénalités. Retard de reversement : 20 % (40 % après 2 mois).",
    },

    // -------------------------------------------------------------------------
    // 7. RETENUES À LA SOURCE — Art. 130 à 144
    // -------------------------------------------------------------------------
    retenues_source: {
      AIB: {
        nom: "Acompte sur Impôt Assis sur les Bénéfices",
        description: `Prélèvement obligatoire sur importations, achats commerciaux et paiements
aux fournisseurs par l'État et les entreprises IS/IBA. Imputable sur l'IS/IBA/TPS.`,
        taux: [
          { operation: "Importations de marchandises", taux: "1 %" },
          { operation: "Achats commerciaux et travaux par entreprises immatriculées à l'IFU", taux: "1 %" },
          { operation: "Fournitures à l'État, collectivités, entreprises publiques (immatriculées)", taux: "1 %" },
          { operation: "Prestations de services (personnes immatriculées à l'IFU)", taux: "3 %" },
          { operation: "Achats/travaux/services par personnes NON immatriculées à l'IFU", taux: "5 %" },
          { operation: "Factures normalisées pour TPS (art. 135 et 256)", taux: "5 %" },
        ],
        versement: "Au plus tard le 10 du mois suivant la facturation ou le prélèvement",
      },
      prelevement_non_connu: {
        nom: "Prélèvement sur opérations des personnes non connues du fichier DGI",
        taux: "10 % sur importations/exportations et paiements par comptables publics",
        nature: "Non imputable — dû à titre définitif",
      },
      retenue_non_residents: {
        nom: "Retenue sur rémunérations dues aux prestataires non-résidents",
        taux: "20 % sur toutes sommes dues à des non-résidents sans établissement stable au Bénin",
        champ: "Travaux immobiliers, services divers, redevances, droits d'auteur",
        reduction: "Réduction possible par convention fiscale",
        versement: "Au plus tard le 10 du mois suivant la constatation de la charge",
      },
      prelevement_hydrocarbures: {
        nom: "Prélèvement libératoire sur ventes d'hydrocarbures par non-domiciliés",
        taux: "0,3 FCFA/litre vendu",
        versement: "Au plus tard le 10 du mois suivant",
      },
    },

    // -------------------------------------------------------------------------
    // 8. TAXE FONCIÈRE UNIQUE (TFU) — Art. 151 à 165
    // -------------------------------------------------------------------------
    TFU: {
      definition: `Contribution annuelle sur les propriétés foncières bâties et non bâties
sises au Bénin. Redevable : le propriétaire au 1er janvier de l'année.`,
      exonerations: [
        "Immeubles de l'État improductifs de revenus",
        "Terrains agricoles",
        "Lieux scolaires",
        "Immeubles cultuels",
        "Exemption temporaire 4 ans pour constructions nouvelles à usage d'habitation exclusif du propriétaire",
      ],
      taux: [
        { type: "Propriétés non bâties", taux: "3 % à 7 % de la valeur vénale administrative (défaut : 5 %)", remarque: "Décidé annuellement par le Conseil Municipal" },
        { type: "Propriétés bâties", taux: "4 % à 8 % de la valeur locative (défaut : 6 %)", remarque: "Décidé annuellement par le Conseil Municipal" },
      ],
      declaration_paiement: [
        { obligation: "Déclaration de la propriété (nouvelles acquisitions/constructions)", echeance: "Dans les 30 jours suivant l'acquisition ou l'achèvement" },
        { obligation: "Liste annuelle des locataires au service des impôts", echeance: "10 décembre de chaque année" },
        { obligation: "1er acompte (50 % du montant N−1)", echeance: "10 février" },
        { obligation: "Solde (50 %)", echeance: "30 avril" },
      ],
      penalites: "Défaut de déclaration : art. 485. Retard de paiement : 10 % + intérêts de retard.",
    },

    // -------------------------------------------------------------------------
    // 9. TAXE SUR LES VÉHICULES À MOTEUR — Art. 166 à 171
    // -------------------------------------------------------------------------
    TVM: {
      definition: "Taxe annuelle sur tout véhicule à moteur d'au moins 3 roues immatriculé au Bénin. Redevable : propriétaire inscrit sur la carte grise au 1er janvier.",
      montants_annuels: [
        { categorie: "Transport privé ≤ 7 CV", montant: "20 000 FCFA" },
        { categorie: "Transport privé 8-10 CV", montant: "30 000 FCFA" },
        { categorie: "Transport privé 11-15 CV", montant: "40 000 FCFA" },
        { categorie: "Transport privé > 15 CV", montant: "60 000 FCFA" },
        { categorie: "Véhicules à 3 roues", montant: "15 000 FCFA" },
        { categorie: "Transport public 0-9 places", montant: "38 000 FCFA" },
        { categorie: "Transport public 10-20 places", montant: "57 000 FCFA" },
        { categorie: "Transport public > 20 places", montant: "86 800 FCFA" },
        { categorie: "Transport public marchandises 0-2,5 t", montant: "49 500 FCFA" },
        { categorie: "Transport public marchandises > 10 t", montant: "136 400 FCFA" },
        { categorie: "Véhicule de société ≤ 7 CV", montant: "150 000 FCFA" },
        { categorie: "Véhicule de société > 7 CV", montant: "200 000 FCFA" },
      ],
      declaration_paiement: `Paiement au plus tard le 30 avril, sur présentation de la carte grise.
Pour véhicules mis en circulation en cours d'année : taxe au prorata temporis,
exigible dans les 10 premiers jours du mois suivant l'immatriculation.`,
      penalites: "Retard de paiement : 20 % du montant dû. Défaut de paiement : immobilisation du véhicule.",
    },

    // -------------------------------------------------------------------------
    // 10. TAXE PROFESSIONNELLE SYNTHÉTIQUE (TPS) — Art. 178 à 190
    // -------------------------------------------------------------------------
    TPS: {
      definition: `Impôt libératoire unique remplaçant l'IBA, la contribution des patentes,
la contribution des licences et le versement patronal sur salaires pour les
personnes physiques relevant de l'IBA dont le CA est inférieur au seuil fixé
par arrêté du Ministre des Finances.`,
      exonerations: [
        "Artistes vendant leur art",
        "Entreprises agricoles/pêche/élevage",
        "Entreprises nouvelles pour leurs 12 premiers mois",
      ],
      calcul: "TPS = 5 % des recettes annuelles. Minimum : 10 000 FCFA. Redevance ORTB : 4 000 FCFA en sus. Due par commune et par établissement.",
      affectation: "50 % budget de l'État, 50 % budget de la collectivité locale (moins 10 % de coût administratif)",
      declaration_paiement: [
        { obligation: "Déclaration annuelle", echeance: "30 avril de chaque année" },
        { obligation: "1er acompte (calculé sur TPS N−1)", echeance: "10 février" },
        { obligation: "2e acompte", echeance: "10 juin" },
        { obligation: "Solde", echeance: "30 avril (avec la déclaration)" },
      ],
      penalites: "Art. 485 à 503.",
    },

    // -------------------------------------------------------------------------
    // 11. VERSEMENT PATRONAL SUR SALAIRES (VPS) — Art. 191 à 195
    // -------------------------------------------------------------------------
    VPS: {
      definition: "Contribution des employeurs assise sur la même base que l'ITS.",
      exonerations: [
        "Représentations diplomatiques",
        "Assujettis à la TPS",
        "Entreprises nouvelles (1er exercice pour salariés béninois)",
        "Premiers emplois béninois pendant 2 ans",
        "Sportifs et artistes professionnels (dans la limite de 4 SMIG)",
      ],
      taux: [
        { cas: "Taux général", taux: "4 % de la base imposable ITS" },
        { cas: "Établissements d'enseignement privé", taux: "2 %" },
      ],
      declaration_paiement: "Liquidé sur la même déclaration que l'ITS. Versé avec l'ITS au plus tard le 10 du mois suivant le mois de paie.",
    },

    // -------------------------------------------------------------------------
    // 12. CONTRIBUTION DES PATENTES ET DES LICENCES — Art. 196 à 217
    // -------------------------------------------------------------------------
    patentes_licences: {
      patentes: {
        definition: `Contribution annuelle personnelle sur toute personne physique ou morale
exerçant un commerce, une industrie ou une profession au Bénin.`,
        exonerations: ["État", "Artistes", "Cultivateurs (pour leurs récoltes)", "Pêcheurs", "Assujettis à la TPS", "Entreprises nouvelles (12 premiers mois)"],
        calcul: "Droit fixe (selon CA et zone géographique) + Droit proportionnel sur valeur locative des locaux professionnels",
        droits_fixes: [
          { zone: "Zone 1 (Atlantique, Littoral, etc.) — CA ≤ 1 milliard", droit: "70 000 FCFA" },
          { zone: "Zone 1 — CA > 1 milliard", droit: "70 000 FCFA + 10 000 FCFA par milliard supplémentaire" },
          { zone: "Zone 2 (Alibori, Atacora, Borgou, Donga) — CA ≤ 1 milliard", droit: "60 000 FCFA" },
          { zone: "Zone 2 — CA > 1 milliard", droit: "60 000 FCFA + 10 000 FCFA par milliard supplémentaire" },
        ],
        droit_proportionnel: "12 % (Mono, Couffo) à 25 % (Parakou) de la valeur locative des locaux",
        patente_complementaire: "0,5 % du montant HT du marché ou avenant pour bénéficiaires de marchés publics",
        declaration_paiement: [
          { obligation: "Déclaration annuelle de la patente", echeance: "30 avril" },
          { obligation: "1er acompte (50 %)", echeance: "10 février" },
          { obligation: "Solde (50 %)", echeance: "Fin avril" },
          { obligation: "Patente complémentaire (marchés)", echeance: "Dans les 10 jours suivant le mois d'attribution du marché" },
        ],
      },
      licences: {
        definition: "Droit perçu sur toute personne vendant des boissons alcooliques ou fermentées, indépendamment de la patente.",
        taux: [
          { ca_zone1: "CA ≤ 500 millions FCFA", droit: "50 000 FCFA (Zone 1) / 30 000 FCFA (Zone 2)" },
          { ca_zone1: "CA 500 M à 1 milliard FCFA", droit: "80 000 FCFA / 60 000 FCFA" },
          { ca_zone1: "CA > 1 milliard FCFA", droit: "100 000 FCFA (toutes zones)" },
        ],
        paiement: "50 % au 10 février + solde fin avril. Retard : pénalité 10 %.",
      },
    },

    // -------------------------------------------------------------------------
    // 13. TVA — Art. 223 à 263
    // -------------------------------------------------------------------------
    TVA: {
      definition: `Impôt sur la consommation frappant toutes les opérations réalisées au
Bénin : importations, livraisons de biens, prestations de services, travaux
immobiliers, livraisons à soi-même. Assujettis : personnes physiques ou morales
réalisant un CA supérieur au seuil fixé par arrêté ministériel.`,
      exonerations_principales: [
        "Ventes par petits contribuables (CA < seuil)",
        "Produits médicaux",
        "Produits alimentaires de base (pain, céréales locales, tubercules, légumes, fruits locaux, viande fraîche, poisson non transformé, lait non transformé)",
        "Enseignement, soins médicaux",
        "Journaux, livres",
        "Transports publics de voyageurs",
        "Activités agricoles",
        "Gaz domestique",
        "Panneaux solaires",
        "Services liés aux marchés financiers",
      ],
      taux: [
        { cas: "Taux normal", taux: "18 % du prix HT" },
        { cas: "Exportations et assimilées", taux: "0 %" },
        { cas: "TVA retenue à la source (opérations avec l'État)", taux: "40 % de la TVA" },
        { cas: "TVA retenue à la source (non-assujettis)", taux: "100 % de la TVA" },
      ],
      mecanisme: "TVA collectée (sur ventes) − TVA déductible (sur achats) = TVA à payer. Si résultat négatif = crédit de TVA reportable ou remboursable sous conditions.",
      exclusions_droit_deduction: [
        "Véhicules de tourisme (sauf loueurs, crédits-bailleurs, auto-écoles)",
        "Frais de carburant pour véhicules non affectés au transport professionnel",
        "Frais d'hébergement et de réception",
        "Dons et libéralités > 10 000 FCFA unitaire",
      ],
      remboursement_credit_TVA: {
        eligibles: [
          "Producteurs",
          "Exportateurs (> 50 % du CA)",
          "Acquéreurs de biens d'investissement > 40 millions FCFA TTC",
          "Entreprises cessant leur activité",
        ],
        delai_instruction: "1 mois",
        conditions: "Absence d'arriérés fiscaux",
        classement_risque: "Faible (remboursement automatique) / Moyen (après contrôle) / Élevé (après vérification générale)",
      },
      declaration_paiement: [
        { obligation: "Déclaration mensuelle de TVA", echeance: "10 du mois suivant" },
        { obligation: "Retenue TVA à la source par l'État", echeance: "10 du mois suivant la retenue" },
        { obligation: "Demande de remboursement crédit TVA", echeance: "Dernier jour du mois suivant la fin du bimestre" },
      ],
      penalites: [
        { infraction: "Retard de déclaration ou paiement", sanction: "20 % (40 % après 30 jours)" },
        { infraction: "Facturation illégale de TVA", sanction: "80 %" },
        { infraction: "Annulation/réduction de crédit TVA après contrôle", sanction: "25 % (80 % si crédit déjà remboursé)" },
        { infraction: "Défaut de déclaration néant ou créditrice", sanction: "50 000 FCFA/mois (max 500 000 FCFA)" },
      ],
    },

    // -------------------------------------------------------------------------
    // 14. TAFA (Taxe sur Activités Financières et Assurances) — Art. 264 à 271
    // -------------------------------------------------------------------------
    TAFA: {
      definition: "Taxe sur les opérations des banques, établissements financiers, bureaux de change et contrats d'assurance (sauf assurances vie/maladie).",
      exonerations: ["BCEAO", "Prêts au trésor public", "Opérations interbancaires", "Collecte/crédit des SFD", "Réassurance"],
      taux: [
        { type: "Assurances contre incendie", taux: "20 %" },
        { type: "Assurances de transport", taux: "5 %" },
        { type: "Tous autres cas (assurances, commissions bancaires, etc.)", taux: "10 %" },
      ],
      declaration_paiement: "Mêmes modalités que la TVA (déclaration mensuelle, paiement au plus tard le 10 du mois suivant).",
    },

    // -------------------------------------------------------------------------
    // 15. DROITS D'ACCISES — Art. 274 à 290
    // -------------------------------------------------------------------------
    droits_accises: {
      TPS_produits_specifiques: {
        description: "Applicable à l'importation ou à la première cession des produits listés.",
        taux: [
          { produit: "Cigarettes, cigares, tabac", taux: "40 %" },
          { produit: "Boissons alcoolisées", taux: "15 %" },
          { produit: "Boissons non alcoolisées énergisantes", taux: "20 %" },
          { produit: "Eau minérale importée", taux: "20 %" },
          { produit: "Jus de fruits importé", taux: "20 %" },
          { produit: "Autres boissons non alcoolisées (hors eau non gazéifiée)", taux: "7 %" },
          { produit: "Farine de blé", taux: "1 %" },
          { produit: "Pâtes alimentaires importées", taux: "5 %" },
          { produit: "Huiles et corps gras alimentaires", taux: "1 %" },
          { produit: "Préparations pour soupe/bouillons", taux: "10 %" },
          { produit: "Café, thé", taux: "10 %" },
          { produit: "Produits de parfumerie et cosmétiques", taux: "15 %" },
          { produit: "Sachets en matière plastique", taux: "5 %" },
          { produit: "Marbre, lingots d'or, pierres précieuses", taux: "10 %" },
        ],
      },
      taxe_produits_petroliers: {
        description: "Perçue au cordon douanier. Tarif modifiable par voie réglementaire.",
        tarifs: [
          { produit: "Super carburant", tarif: "65 FCFA/litre" },
          { produit: "Essence ordinaire", tarif: "55 FCFA/litre" },
          { produit: "Gas-oil", tarif: "20 FCFA/litre" },
          { produit: "Lubrifiants (huiles)", tarif: "17 FCFA/litre" },
          { produit: "Graisses", tarif: "23 FCFA/kg" },
          { produit: "Pétrole lampant", tarif: "0 FCFA/litre" },
          { produit: "Fuel-oil", tarif: "0 FCFA/litre" },
          { produit: "Pétrole liquéfié (butane)", tarif: "0 FCFA/kg" },
        ],
      },
      taxe_vehicules_tourisme: {
        description: "Véhicules de tourisme ≥ 13 CV à l'importation ou à la 1ère cession.",
        taux: "10 % de la valeur en douane + droits et taxes (hors TVA)",
      },
    },

    // -------------------------------------------------------------------------
    // 16. DROITS D'ENREGISTREMENT — Art. 317 à 398
    // -------------------------------------------------------------------------
    droits_enregistrement: {
      delai_general: "1 mois à compter de la signature de l'acte",
      minimum_perception: "2 500 FCFA",
      taux: [
        { acte: "Mutation immobilière à titre onéreux (vente)", taux: "5 % du prix" },
        { acte: "Échange d'immeubles", taux: "2 % (sur la moindre portion ; soulte au taux des mutations)" },
        { acte: "Cession de fonds de commerce, clientèle, office", taux: "5 % du prix" },
        { acte: "Cession de droit au bail", taux: "5 % de la somme ou valeur vénale" },
        { acte: "Ventes publiques de meubles", taux: "1 % du prix" },
        { acte: "Baux d'immeubles à durée déterminée", taux: "1 % du total des loyers de toute la période" },
        { acte: "Marchés publics", taux: "1 % du prix HT (0,5 % si ≥ 20 milliards FCFA)" },
        { acte: "Jugements, arrêts (condamnations)", taux: "5 % du montant condamné (4 % en matière sociale)" },
        { acte: "Jugements de liquidation d'astreinte", taux: "25 %" },
        { acte: "Partages entre copropriétaires/cohéritiers", taux: "0,5 % de l'actif net partagé (soulte : droit de mutation)" },
        { acte: "Rentes et pensions (constitution)", taux: "1 % du capital constitué" },
        { acte: "Cessions d'actions ou parts sociales", taux: "Droit fixe 10 000 FCFA" },
        { acte: "Actes de formation de sociétés", taux: "Enregistrés gratis" },
        { acte: "Donations entre vifs", taux: "5 %" },
        { acte: "Successions / mutations par décès", taux: "Enregistrées gratis" },
      ],
      paiement: "Paiement intégral préalable à l'enregistrement. Possibilité de fractionnement (baux, marchés publics, mutations immobilières par annuités). Mutations par décès : dans les 6 mois du décès (1 an si décès hors Bénin).",
      penalites: "Retard d'enregistrement d'actes gratis : 50 000 FCFA. Infractions procédurales : 100 000 FCFA par infraction (art. 493).",
    },

    // -------------------------------------------------------------------------
    // 17. DROITS DE TIMBRE — Art. 399 à 459
    // -------------------------------------------------------------------------
    droits_timbre: {
      taux: [
        { type: "Timbre de dimension (par feuille)", montant: "1 200 FCFA" },
        { type: "Timbre proportionnel sur effets de commerce", montant: "1 FCFA par 1 000 FCFA ou fraction" },
        { type: "Timbre-quittance (reçu de paiement)", montant: "100 FCFA par quittance" },
        { type: "Timbre-quittance sur paiements en espèces > 100 000 FCFA", montant: "1 % du montant" },
        { type: "Carte d'identité nationale", montant: "300 FCFA" },
        { type: "Passeport", montant: "600 FCFA" },
        { type: "Visa jusqu'à 1 mois", montant: "2 000 FCFA" },
        { type: "Visa jusqu'à 1 an", montant: "20 000 FCFA" },
        { type: "Carte de résident 1 an", montant: "20 000 FCFA" },
        { type: "Carte grise ≤ 7 CV", montant: "5 000 FCFA" },
        { type: "Carte grise 7-15 CV", montant: "10 000 FCFA" },
        { type: "Visite technique", montant: "2 000 FCFA" },
        { type: "Contrats transport aérien", montant: "1 000 FCFA" },
        { type: "Connaissements maritimes", montant: "3 000 FCFA" },
        { type: "Permis de conduire (Cat. A/B)", montant: "2 000 FCFA timbre + 3 000 FCFA examen" },
      ],
      minimum_perception: "50 FCFA",
    },

    // -------------------------------------------------------------------------
    // 18. OBLIGATIONS GÉNÉRALES DES CONTRIBUABLES — Art. 460 à 483
    // -------------------------------------------------------------------------
    obligations_generales: {
      IFU: "Immatriculation obligatoire avant tout exercice d'activité. Doit figurer sur toutes déclarations, factures, lettres et pièces officielles. Modification à déclarer dans les 30 jours.",
      enseigne: "Obligatoire pour tous assujettis IS/IBA/TPS, visible, mentionnant dénomination, adresse, RCCM et IFU.",
      comptabilite: "Obligatoire en français, conforme au système comptable OHADA, conservée pendant 10 ans.",
      facturation: "Toute opération doit être facturée via une machine électronique certifiée de facturation (MECeF) homologuée par la DGI. La facture normalisée doit comporter le numéro IFU du fournisseur et du client, la TVA distinguée, le numéro MECeF et un code électronique.",
    },

    // -------------------------------------------------------------------------
    // 19. TABLEAU RÉCAPITULATIF DES SANCTIONS — Art. 485 à 511
    // -------------------------------------------------------------------------
    sanctions_generales: [
      { infraction: "Retard de déclaration", sanction: "20 % des droits (40 % après 30 jours de mise en demeure)" },
      { infraction: "Insuffisance de déclaration (bonne foi)", sanction: "20 %" },
      { infraction: "Insuffisance (mauvaise foi / manœuvres frauduleuses)", sanction: "40 % à 80 %" },
      { infraction: "Retard de paiement d'impôt", sanction: "10 % + intérêts 0,25 %/mois (plafonnés au montant des droits)" },
      { infraction: "Retard de reversement des retenues à la source", sanction: "20 % (40 % si > 2 mois)" },
      { infraction: "Défaut de retenue à la source", sanction: "Personnellement redevable du montant + pénalités" },
      { infraction: "Annulation de crédit TVA après contrôle", sanction: "25 % (80 % si crédit déjà remboursé)" },
      { infraction: "Absence d'IFU ou faux IFU", sanction: "100 000 FCFA (200 000 FCFA après mise en demeure)" },
      { infraction: "Défaut d'enseigne professionnelle", sanction: "100 000 FCFA" },
      { infraction: "Défaut/irrégularité de comptabilité", sanction: "1 000 000 FCFA/exercice (2 000 000 en récidive)" },
      { infraction: "Défaut de facture normalisée", sanction: "5 × montant non facturé (min 500 000 FCFA), plafonnée" },
      { infraction: "Récidive de défaut de facturation", sanction: "10 × montant + possible fermeture 3 mois" },
      { infraction: "Usage frauduleux de l'IFU d'autrui", sanction: "10 000 000 FCFA" },
      { infraction: "Opposition à contrôle fiscal", sanction: "500 000 FCFA" },
      { infraction: "Défaut de déclaration des prix de transfert", sanction: "10 000 000 FCFA" },
      { infraction: "Fraude fiscale (pénal)", sanction: "100 000 à 2 000 000 FCFA + emprisonnement 1 à 5 ans" },
      { infraction: "Retard de paiement taxe véhicule à moteur", sanction: "20 %" },
    ],

    // -------------------------------------------------------------------------
    // 20. CONTRÔLE DE L'IMPÔT — Art. 512 à 582
    // -------------------------------------------------------------------------
    controle_impot: {
      types: [
        { type: "Contrôle sur pièces", description: "Depuis les bureaux. Pas d'avis préalable. Limité à un seul exercice comptable." },
        { type: "Contrôle ponctuel", description: "Sur place, avis notifié 2 jours avant. Durée max : 3 demi-journées en 15 jours. Impôts mensuels et année en cours." },
        { type: "Vérification de comptabilité", description: "Examen approfondi sur place, avis notifié 2 jours avant. Durée max : 3 mois (CA ≤ 500 millions) ou 6 mois (autres) + prolongation possible." },
        { type: "ECSFP (Examen Contradictoire de Situation Fiscale Personnelle)", description: "Contrôle de la cohérence revenus déclarés / train de vie. Durée max 6 mois (1 an si activité occulte)." },
        { type: "Flagrance fiscale", description: "Procès-verbal immédiat pour activités occultes, fausses factures, comptabilité irrégulière. Permet saisies conservatoires." },
      ],
      prescription: "3 ans (impôts directs/indirects), 6 ans en cas d'agissements frauduleux",
    },

    // -------------------------------------------------------------------------
    // 21. RECOURS DU CONTRIBUABLE — Art. 583 à 593
    // -------------------------------------------------------------------------
    recours: [
      { voie: "Réclamation contentieuse préalable", delai: "3 mois à compter de la notification de l'AMR ou du paiement contesté", autorite: "Ministre des Finances (délégué au DGI)" },
      { voie: "Recours juridictionnel", delai: "2 mois à compter de la décision (ou du silence de 2 mois)", autorite: "Tribunal de 1ère instance (matière administrative)" },
      { voie: "Commission des impôts (désaccord de fait)", delai: "5 jours à compter de la confirmation de rectification", autorite: "Commission des impôts" },
      { voie: "Demande gracieuse (remise d'impôt)", delai: "Sans limitation de délai (pénalités : 2 mois)", autorite: "Directeur Général des Impôts" },
      { voie: "Transaction (atténuation pénalités)", delai: "30 jours à compter de la confirmation de rectification", autorite: "Directeur Général des Impôts" },
    ],
    sursis_paiement: "Possible si réclamation + cautionnement de 25 % de la partie contestée.",

    // -------------------------------------------------------------------------
    // 22. CALENDRIER FISCAL ANNUEL (SYNTHÈSE)
    // -------------------------------------------------------------------------
    calendrier_fiscal: [
      { mois: "10 JANVIER", obligation: "Paiement retenues à la source (mois de décembre N-1)", impots: "ITS, IRCM, AIB, TVA, etc." },
      { mois: "10 FÉVRIER", obligation: "1er acompte patentes/licences (50 %) ; 1er acompte TPS ; 50 % TFU N-1 ; déclaration taxe armes à feu annuelle ; état des loyers et retenues IRF", impots: "Patentes, TPS, TFU, IRF" },
      { mois: "10 MARS", obligation: "1er acompte IS/IBA (+ redevance ORTB 4 000 FCFA)", impots: "IS, IBA" },
      { mois: "10 de chaque mois", obligation: "Déclaration et paiement TVA, TAFA, AIB, retenues ITS/VPS, IRCM, etc.", impots: "Tous impôts mensuels" },
      { mois: "30 AVRIL", obligation: "Déclaration annuelle IS, IBA, TPS, Patentes, Licences + soldes ; dépôt des états financiers, déclaration des prix de transfert ; déclaration annuelle des salaires ; solde TFU (50 %)", impots: "IS, IBA, TPS, Patentes, ITS, IRCM, TFU" },
      { mois: "10 JUIN", obligation: "2e acompte IS/IBA (+ redevance ORTB 3 000 FCFA sur ITS) ; 2e acompte TPS", impots: "IS, IBA, ITS, TPS" },
      { mois: "10 SEPTEMBRE", obligation: "3e acompte IS/IBA", impots: "IS, IBA" },
      { mois: "10 DÉCEMBRE", obligation: "4e acompte IS/IBA ; solde patentes/licences", impots: "IS, IBA" },
      { mois: "31 DÉCEMBRE", obligation: "Paiement taxe véhicule à moteur mis en circulation en décembre", impots: "TVM" },
      { mois: "Avant 1er AVRIL", obligation: "Taxe sur pirogues motorisées ; taxe sur boissons fermentées", impots: "Taxes communales" },
    ],

    // -------------------------------------------------------------------------
    // 23. RÉGIMES INCITATIFS — Art. 145 à 150
    // -------------------------------------------------------------------------
    regimes_incitatifs: [
      { dispositif: "Réduction IS/IBA pour entreprises nouvelles", avantage: "25 % les 2 premiers exercices ; 50 % au 3e exercice", conditions: "CA < 1 milliard FCFA ; hors reprises d'activités" },
      { dispositif: "Exonération IS + VPS — Start-up TIC", avantage: "Exonération IS et VPS pendant 2 ans ; 50 % de réduction la 3e année", conditions: "CA < 100 millions FCFA ; labellisation startup" },
      { dispositif: "Adhésion à un Centre de Gestion Agréé (CGA)", avantage: "Réduction 40 % IS/IBA/TPS pendant 4 ans", conditions: "Non connu du fichier DGI ; CA ≤ 50 millions FCFA HT" },
      { dispositif: "Crédit d'impôt pour création d'emplois salariés béninois (CDI)", avantage: "100 000 à 500 000 FCFA selon nombre d'emplois créés", conditions: "Assujettis IS/IBA ; 1ère embauche CDI ; salarié béninois 1 an de service" },
    ],
  },

  // ===========================================================================
  // PARTIE 2 — SYSCOHADA RÉVISÉ (Guide d'application, Ed. 2017)
  // ===========================================================================

  syscohada: {

    meta: {
      titre: "SYSCOHADA Révisé — Guide d'application",
      edition: "2017",
      applications: "142 applications comptables complètes",
      description: "Exemples d'écritures comptables avec énoncés, journaux et commentaires",
    },

    // -------------------------------------------------------------------------
    // PRINCIPES FONDAMENTAUX
    // -------------------------------------------------------------------------
    principes: {
      postulats: [
        "Spécialisation des exercices",
        "Continuité d'exploitation",
        "Permanence des méthodes",
        "Prudence",
        "Non-compensation",
        "Prééminence de la réalité sur l'apparence",
      ],
      classes_comptes: [
        { classe: "1", intitule: "Comptes de capitaux" },
        { classe: "2", intitule: "Comptes d'actif immobilisé" },
        { classe: "3", intitule: "Comptes de stocks et en-cours" },
        { classe: "4", intitule: "Comptes de tiers" },
        { classe: "5", intitule: "Comptes de trésorerie" },
        { classe: "6", intitule: "Comptes de charges" },
        { classe: "7", intitule: "Comptes de produits" },
        { classe: "8", intitule: "Comptes des autres charges et produits (HAO)" },
        { classe: "9", intitule: "Comptes des engagements hors bilan" },
      ],
    },

    // -------------------------------------------------------------------------
    // OPÉRATIONS COURANTES
    // -------------------------------------------------------------------------
    operations_courantes: {

      achats_ventes: {
        description: "Comptabilisation des achats et ventes selon la nature des biens/services",
        comptes_principaux: {
          achats_marchandises: "601 (dans la région OHADA) / 602 (hors région)",
          achats_matieres: "602",
          autres_achats: "604-608",
          ventes_marchandises: "701",
          ventes_produits_finis: "702",
          ventes_travaux: "705",
          ventes_services: "706",
          produits_accessoires: "707",
        },
        regles_cles: [
          "Frais de port sur achats : inclus dans le compte d'achat correspondant (compte 6015)",
          "Emballages consignés : compte 4194 (fournisseur) / compte 4094 (client)",
          "Retours sur achats : contre-passation au crédit des comptes d'achats",
          "Escompte de règlement : enregistré au moment du paiement (673 accordé / 773 obtenu)",
          "RRR accordés par le fournisseur : crédités directement au compte d'achat ou en compte 6019-6089",
        ],
        note_frais_port: "Chez le client, les frais de port majorent le coût d'achat (comptes 60 ou classe 2 selon affectation). Chez le fournisseur : compte 7071 Ports facturés.",
      },

      stocks: {
        methodes_inventaire: {
          intermittent: `Stocks neutralisés en cours d'exercice. Régularisation en fin d'exercice via :
- Compte 603 (marchandises, matières, fournitures)
- Compte 73 (produits)
Écriture : 
  Début : 6031 Variations des stocks (D) / Stock (C) [annulation stock initial]
  Fin   : Stock (D) / 6031 (C) [constatation stock final]`,
          permanent: `Chaque entrée/sortie comptabilisée en cours d'exercice.
Différence avec intermittent : fréquence des écritures uniquement.
En fin de période : 603 enregistre les différences d'inventaire (manquants au débit, excédents au crédit).`,
        },
        valorisation: "FIFO ou Coût Moyen Unitaire Pondéré (CMUP) recalculé après chaque entrée",
        charges_constats_avance: "Stocks non consommés en fin d'exercice → Compte 476 Charges constatées d'avance",
      },

      TVA_comptabilite: {
        chez_fournisseur: {
          TVA_collectee: "Créditée au compte 4431 (ventes) / 4432 (services) / 4433 (travaux) / 4434 (livraisons à soi-même)",
        },
        chez_client: {
          TVA_deductible: "Débitée au compte 4451 (sur immobilisations) / 4452 (sur achats) / 4453 (sur transport)",
          TVA_non_deductible: "Incorporée au coût d'achat ou comptabilisée en compte 645",
        },
        centralisation_fin_periode: `Comptes 4431-4434 (TVA collectée) et 4451-4453 (TVA déductible) → virés au compte 4441 TVA due.
Si solde débiteur → compte 4449 Crédit de TVA à reporter.`,
        schema_ecriture_client_TVA_recuperable: `
  Débit : 60.. Achats hors taxes
  Débit : 4452 TVA récupérable sur achats
  Crédit : 4011 Fournisseurs (TTC)`,
      },

      charges_personnel: {
        base: `Salaires enregistrés au brut :
  Débit : 661x Appointements/Salaires (brut)
  Crédit : 422 Personnel rémunérations dues (brut)`,
        cotisations_salariales: `
  Débit : 422 (brut)
  Crédit : 431 Sécurité sociale + 432 Retraite (cotisations salariales)`,
        cotisations_patronales: `
  Débit : 664 Charges sociales
  Crédit : 431 à 433 Organismes sociaux`,
        retenues_diverses: `
  Avances/acomptes → 421
  Oppositions/saisies-arrêts → 423
  Impôts retenus à la source → 447`,
        avantages_nature: "Débiteurs par nature (614, 622, 628...) — régularisés en 6617/6627 + crédit 781 en fin d'exercice",
        personnel_exterieur: "Compte 637 en cours d'exercice → transféré en 667 en fin d'exercice",
        remboursements_frais: "Comptabilisés par nature dans les comptes 60 à 63 (pas dans les charges de personnel)",
        impot_sur_benefice: {
          acomptes: "Débit : 441.n État impôt sur les bénéfices / Crédit : 5... Trésorerie",
          constatation_finale: "Débit : 891 Impôts sur les bénéfices / Crédit : 441.n",
        },
      },
    },

    // -------------------------------------------------------------------------
    // OPÉRATIONS DE TRÉSORERIE
    // -------------------------------------------------------------------------
    tresorerie: {
      modes_reglement: {
        cheque_emis: "Débit : 4... Tiers / Crédit : 52.. Banques (à l'émission, par prudence)",
        cheque_recu: `
  1. Réception : Débit 513 Chèques à encaisser / Crédit 4... Tiers
  2. Envoi banque : Débit 514 Chèques à l'encaissement / Crédit 513
  3. Avis de crédit : Débit 52.. Banques / Crédit 514`,
        virement: "Emetteur traite comme un chèque. Créancier enregistre à réception de l'avis de crédit uniquement.",
        carte_bancaire: `
  Passage en machine : Débit 515 Cartes de crédit à encaisser / Crédit 4... ou 70..
  Avis de crédit : Débit 52.. Banques (net) + Débit 6315 Commissions / Crédit 515 (brut)`,
        monnaie_electronique: `
  Chargement : Débit 55.. Instruments monnaie électronique / Crédit 52.. ou 57..
  Règlement : Débit 4... Tiers / Crédit 55..`,
      },
      effets_commerce: {
        effets_a_payer: `Débiteur : transfert de 401 vers 402 Fournisseurs effets à payer
À l'échéance : Débit 402 / Crédit 52..`,
        effets_a_recevoir: `Créancier : transfert de 411 vers 412 Clients effets à recevoir
À l'encaissement : Débit 512 Effets à l'encaissement / Crédit 412 → puis Débit 52.. / Crédit 512`,
        effets_a_escompte: `
  Débit 415 Clients effets escomptés non échus / Crédit 412
  Réception des fonds : Débit 52.. (net) + Débit 675 Escomptes des effets / Crédit 565 Banques escompte (brut)
  À l'échéance bonne fin : Débit 565 / Crédit 415`,
        effets_impayes: `
  Frais d'impayés : Débit 6318 Autres frais bancaires / Crédit 521
  Reconstitution créance : Débit 413 Clients chèques/effets impayés / Crédit 51.. + Crédit 7078 (récupération frais)`,
      },
      escompte_reglement: `
  Chez le client (débiteur) : Débit 401 / Crédit 773 Escomptes obtenus + Crédit 445 TVA + Crédit 5... Trésorerie
  Chez le fournisseur (créancier) : Débit 5... + Débit 673 Escomptes accordés + Débit 443 TVA / Crédit 411`,
    },

    // -------------------------------------------------------------------------
    // IMMOBILISATIONS
    // -------------------------------------------------------------------------
    immobilisations: {
      definition: `Éléments corporels et incorporels destinés à servir de façon durable à
l'activité de l'entité (durée > 1 an). Seuil de signification applicable.`,
      classification: {
        incorporelles: "Comptes 21.. (frais de développement, brevets, licences, logiciels, fonds commercial, marques)",
        corporelles: "Comptes 22.. à 24.. (terrains, bâtiments, installations, matériels, actifs biologiques)",
        financieres: "Comptes 25.. à 27.. (titres de participation, prêts, dépôts et cautionnements)",
      },
      cout_entree: {
        definition: `Coût réel d'acquisition = Prix d'achat (net de remises et escomptes de règlement)
+ Charges accessoires (transport, assurance, droits de douane, transit, montage, mise en route,
honoraires d'architecte/notaire, droits d'enregistrement)
+ Coûts de démantèlement et remise en état (si obligation)`,
        production_immobilisee: "Coût d'acquisition des matières + charges directes + charges indirectes raisonnablement rattachables",
        coûts_emprunt: "Incorporables si concernent la période de production d'un actif qualifié (jusqu'à la date de réception définitive)",
      },
      amortissements: {
        methodes: [
          { methode: "Linéaire", description: "Charge constante sur la durée d'utilité" },
          { methode: "Dégressif à taux décroissant (SOFTY)", description: "Taux décroissant = (années restant à courir) / (somme des numéros d'ordre de toutes les années). Charge décroissante." },
          { methode: "Unités d'œuvre", description: "Charge basée sur l'utilisation ou la production effective de l'actif" },
        ],
        base_amortissable: "Coût d'entrée − Valeur résiduelle prévisionnelle",
        interdits: ["Amortissement basé sur les revenus générés (immobilisations corporelles)", "Amortissement financier"],
        ecriture: `
  Débit : 681 Dotations aux amortissements d'exploitation (ou 852 si HAO)
  Crédit : 28.. Amortissements (compte démembrement de l'immobilisation)`,
        amortissements_derogatoires: `Provision réglementée (différence entre amortissement fiscal et économique) :
  Débit : 851 Dotations HAO aux provisions réglementées
  Crédit : 151 Amortissements dérogatoires`,
      },
      approche_composants: `Décomposer les immobilisations complexes en composants distincts ayant des durées
d'utilité différentes. Chaque composant est amorti séparément.
Exemple bâtiment : Structure (30 ans) + Composant ascenseur (10 ans).`,
      depréciation: {
        indice_perte_valeur: "Tester en fin d'exercice si indice de perte de valeur",
        comptabilisation: "Débit : 691 (exploitation) ou 697 (financière) ou 853 (HAO) / Crédit : 29.. Dépréciations",
        reprise: "Reprise si valeur actuelle dépasse la valeur nette comptable (plafond = VNC sans dépréciation)",
      },
      cessions: {
        vente: `
  1. Constatation de la créance : Débit 485 Créances sur cessions / Crédit 82.. Produits des cessions
  2. Amortissement complémentaire jusqu'à la date de cession : Débit 681 / Crédit 28..
  3. Sortie : Débit 81.. Valeurs comptables des cessions / Débit 28.. Amortissements / Crédit 2... Immobilisation (brut)`,
        mise_au_rebut: "Idem vente mais sans recette de cession (pas d'écriture 82..)",
        plus_value_a_reinvestir: `Constitution : Débit 851 / Crédit 152 Plus-values de cession à réinvestir
Reprise lors du réinvestissement : Débit 152 / Crédit 861`,
        cessions_courantes: "Si fréquentes et récurrentes : utiliser comptes 654 (valeur comptable) et 754 (prix de cession) au lieu de 81 et 82",
      },
    },

    // -------------------------------------------------------------------------
    // RÉGULARISATIONS PÉRIODIQUES
    // -------------------------------------------------------------------------
    regularisations: {
      charges_constates_avance: `Charge enregistrée en N concerne partiellement N+1 :
  Débit 476 Charges constatées d'avance / Crédit 6... (compte de charge concerné)
Contrepassation au début de l'exercice suivant.`,
      charges_a_payer: `Charges certaines de N non encore enregistrées faute de pièce :
  Débit 6... / Crédit 408 (FNP), 4281 (congés), 4486 (État), 1662 (intérêts courus)...`,
      produits_constates_avance: `Produits de N concernant N+1 :
  Débit 7... / Crédit 477 Produits constatés d'avance`,
      produits_a_recevoir: `Produits certains de N non encore enregistrés :
  Débit 4181 (factures à établir), 4098 (RRR à obtenir)... / Crédit 7...`,
      provisions_risques_charges: {
        dotation_long_terme: "Débit 691 (exploitation) ou 697 (financière) ou 854 (HAO) / Crédit 19.. Provisions",
        dotation_court_terme: "Débit 659 ou 679 ou 839 / Crédit 499 ou 599",
        reprise: "Débit 19.. ou 499/599 / Crédit 791 ou 797 ou 864 (pour reprises long terme) / 759 ou 779 ou 849 (pour reprises court terme)",
      },
      depreciations_actifs: {
        stocks: "Débit 659 / Crédit 391-398",
        creances: "Débit 659 / Crédit 490-499",
        titres_placement: "Débit 679 / Crédit 590-599",
        reprises: "Débit 391-398 ou 490-499 ou 590-599 / Crédit 759 (exploitation) ou 779 (financières) ou 849 (HAO)",
      },
    },

    // -------------------------------------------------------------------------
    // CAPITAUX PROPRES
    // -------------------------------------------------------------------------
    capitaux_propres: {
      constitution_societe: {
        promesse_apports: `
  Débit 4611 Apporteurs apports en nature / Débit 4612 Apporteurs apports en numéraire
  Crédit 1011 Capital souscrit non appelé`,
        appel_capital: "Débit 1011 / Crédit 1012 Capital souscrit appelé non versé",
        realisation_apports: "Actifs apportés au débit / Dettes reprises au crédit / Crédit 4613 Apporteurs capital appelé non versé",
        versement_numeraire: "Débit 521 Banques / Crédit 4613",
        reclassement: "Débit 1012 / Crédit 1013 Capital souscrit appelé versé non amorti",
        capital_non_appele: "Compte 109 Apporteurs capital souscrit non appelé (actif en soustraction)",
      },
      affectation_resultat: `
  Débit 1301 Résultat en instance d'affectation
  Crédit 111 Réserve légale + 112 Réserve statutaire + 1181 Réserves facultatives
          + 465 Associés dividendes à payer + 121 Report à nouveau créditeur`,
      dividendes: "Débit 465 Associés dividendes à payer / Crédit 521 Banques",
      augmentation_capital_numeraire: `
  Souscription : Débit 4732 Mandataires / Crédit 4615 Versements reçus sur augmentation
  Réalisation : Débit 4615 / Crédit 1013 (nominal) + Crédit 1051 Prime d'émission`,
      augmentation_capital_incorporation: "Débit 1181 Réserves / Crédit 1013",
      reduction_capital_pertes: "Débit 1013 / Crédit 1291 Perte nette à reporter",
      reduction_capital_remboursement: "Débit 1013 / Crédit 4619 Apporteurs capital à rembourser → puis Débit 4619 / Crédit 521",
    },

    // -------------------------------------------------------------------------
    // SUBVENTIONS D'INVESTISSEMENT
    // -------------------------------------------------------------------------
    subventions_investissement: {
      reception: `
  Octroi : Débit 4494 État subventions d'investissement à recevoir / Crédit 141x Subventions d'équipement
  Encaissement : Débit 521 / Crédit 4494`,
      reprise: `Reprise annuelle au même rythme que l'amortissement du bien subventionné :
  Débit 141x / Crédit 799 Reprises de subventions d'investissement`,
      depreciation_bien_subventionne: `
  Méthode 1 : Dépréciation = (VNC − Subvention restante) − Valeur actuelle
  Méthode 2 : Dépréciation = VNC − Valeur actuelle ; Reprise subvention = solde du compte 14x
  (Impact identique sur le résultat dans les deux méthodes)`,
    },

    // -------------------------------------------------------------------------
    // EMPRUNTS OBLIGATAIRES
    // -------------------------------------------------------------------------
    emprunts_obligataires: {
      emission: `
  Ouverture : Débit 47131 Obligations à placer / Crédit 1611 Emprunts obligataires
  Souscription : Débit 47132 / Crédit 47131
  Versement fonds : Débit 521 / Crédit 47132
  Frais d'émission : Débit 6316 / Crédit 521`,
      prime_remboursement: {
        amortissement_constant: "Prime étalée proportionnellement au nombre d'obligations remboursées",
        remboursement_in_fine: "Prime étalée proportionnellement aux intérêts courus",
        ecriture: "Débit 6714 Primes de remboursement des obligations / Crédit 1661 Intérêts courus sur emprunts obligataires",
      },
      obligataire_convertible: `Provision pour risque de paiement de la prime si non conversion :
  Débit 697 / Crédit 1988 Autres provisions pour divers risques
Reprise lors de la conversion : Débit 1988 / Crédit 797`,
    },

    // -------------------------------------------------------------------------
    // OPÉRATIONS EN DEVISES
    // -------------------------------------------------------------------------
    operations_devises: {
      ecarts_conversion: {
        actif: `Perte latente (diminution créance ou augmentation dette) :
  Débit 4781 ou 4782 ou 4783 ou 4784 Écart de conversion-Actif / Crédit 4... ou 1...`,
        passif: `Gain latent (augmentation créance ou diminution dette) :
  Débit 4... ou 1... / Crédit 4791 à 4794 Écart de conversion-Passif`,
        provision_perte: `Si perte latente non compensée par couverture :
  Débit 6591 ou 6971 / Crédit 194 Provisions pour pertes de change`,
        contrepassation: "Contre-passation au 1er janvier de l'exercice suivant",
      },
      gains_pertes_changes: {
        realises: "Pertes : compte 656 (commercial) ou 676 (financier) / Gains : compte 756 (commercial) ou 776 (financier)",
        position_globale_change: "Compensation possible entre perte sur créance et gain sur dette libellées en même devise",
      },
    },

    // -------------------------------------------------------------------------
    // CONTRATS À LONG TERME
    // -------------------------------------------------------------------------
    contrats_long_terme: {
      methode_avancement: `Comptabilisée si résultat à terminaison évaluable de manière fiable.
CA partiel = CA total × % d'avancement
% d'avancement = Coûts engagés / Coûts totaux prévisionnels
Écriture fin d'exercice :
  Débit 4181 Clients factures à établir / Crédit 705x Travaux + Crédit 4435 TVA sur factures à établir`,
      methode_achevement: `Comptabilisée si résultat à terminaison non évaluable de manière fiable.
CA partiel = coûts engagés (résultat nul en cours de contrat)
Écriture fin d'exercice :
  Débit 4181 / Crédit 705x (montant = charges engagées) + Crédit 4435 TVA`,
      contrat_deficitaire: `Perte à terminaison constatée dès identification :
  Provision pour pertes sur marchés à achèvement futur :
  Débit 6911 / Crédit 193 Provisions pour pertes sur marchés à achèvement futur`,
    },

    // -------------------------------------------------------------------------
    // FUSIONS ET OPÉRATIONS ASSIMILÉES
    // -------------------------------------------------------------------------
    fusions: {
      valeur_apports: {
        prise_de_controle: "Valeur réelle des actifs et passifs (juste valeur)",
        absorption_filiale_100pct: "Valeur comptable",
      },
      ecart_acquisition: `
  Calcul : Coût d'acquisition − Quote-part dans juste valeur des actifs/passifs identifiables
  Si positif (goodwill) : inscrit en immobilisations incorporelles
  Si négatif (badwill) : rapporté en résultat sur la durée convenue ou globalement`,
      ecart_evaluation: `Différence entre juste valeur et valeur comptable des éléments identifiables.
Donne lieu à imposition différée (pas d'impôt différé sur l'écart d'acquisition).`,
      fusion_renonciation: `L'absorbante renonce à émettre les titres qui lui reviendraient (quote-part déjà détenue).
Boni de fusion = part de l'écart d'évaluation sur titres annulés − valeur comptable des titres.
Inscrit au compte 1053 Prime de fusion.`,
    },

    // -------------------------------------------------------------------------
    // COMPTES CONSOLIDÉS (PRINCIPES CLÉS)
    // -------------------------------------------------------------------------
    consolidation: {
      methodes: [
        { methode: "Intégration globale", usage: "Contrôle exclusif (> 50 % des droits de vote, ou pouvoirs de direction effectifs)" },
        { methode: "Intégration proportionnelle", usage: "Contrôle conjoint (accord contractuel entre associés)" },
        { methode: "Mise en équivalence", usage: "Influence notable (en général 20 % à 50 %)" },
      ],
      pourcentage_controle: "Droits de vote (actions à vote double comptées double, actions sans droit de vote exclues, droits de vote potentiels substantifs inclus)",
      pourcentage_interet: "Part dans les capitaux propres = produit des % de participation le long de la chaîne de détention",
      elimination_titres: "Titres de participation éliminés contre fraction des capitaux propres correspondante",
      interets_minoritaires: "Part des actionnaires minoritaires dans les capitaux propres et résultats consolidés",
      retraitements: [
        "Harmonisation des méthodes comptables",
        "Elimination des opérations et comptes réciproques intragroupes",
        "Elimination des résultats internes (marges sur stocks intercompagnies, dividendes intragroupe)",
        "Annulation des amortissements dérogatoires",
        "Comptabilisation des provisions pour engagements de retraite non provisionnées",
        "Reclassement des subventions d'investissement en produits constatés d'avance",
        "Annulation des écarts de conversion",
      ],
    },

    // -------------------------------------------------------------------------
    // COMPTES COMBINÉS
    // -------------------------------------------------------------------------
    comptes_combines: {
      definition: `Comptes combinés = comptes consolidés d'entités sans lien de capital direct
mais sous contrôle commun d'une même entité (souvent hors espace OHADA).
Obligation légale pour les entités OHADA sous contrôle d'une entité étrangère.`,
      perimetre: "Entités situées dans l'espace OHADA contrôlées par la même entité étrangère",
      methode: "Intégration globale des entités combinées ; élimination des opérations réciproques entre elles",
      capital_combine: "Quote-part de l'entité tête de groupe dans les capitaux propres de chaque entité combinée",
    },

    // -------------------------------------------------------------------------
    // ÉTATS FINANCIERS
    // -------------------------------------------------------------------------
    etats_financiers: {
      composantes: [
        "Bilan",
        "Compte de résultat",
        "Tableau des flux de trésorerie",
        "Notes annexes (état financier à part entière)",
      ],
      arrete: "Au plus tard dans les 4 mois suivant la date de clôture de l'exercice",
      soldes_intermediaires_gestion: [
        { solde: "Marge commerciale", calcul: "Ventes marchandises − Achats marchandises ± Variation stocks marchandises" },
        { solde: "Chiffre d'affaires", calcul: "Total des ventes (TA + TB + TC + TD)" },
        { solde: "Valeur ajoutée", calcul: "CA + Autres produits − Achats ± Variation stocks − Autres consommations intermédiaires" },
        { solde: "EBE (Excédent Brut d'Exploitation)", calcul: "Valeur ajoutée − Charges de personnel" },
        { solde: "Résultat d'exploitation", calcul: "EBE + Reprises d'exploitation − Dotations d'exploitation" },
        { solde: "Résultat financier", calcul: "Revenus financiers − Frais financiers" },
        { solde: "Résultat des activités ordinaires", calcul: "Résultat d'exploitation + Résultat financier" },
        { solde: "Résultat HAO", calcul: "Produits HAO − Charges HAO" },
        { solde: "Résultat net", calcul: "R. activités ordinaires + R. HAO − Participation travailleurs − Impôts sur le résultat" },
      ],
      CAFG: `Capacité d'Autofinancement Globale = EBE + Résultat financier + Produits HAO − Charges HAO
       − Participation travailleurs − Impôts sur le résultat
       (± Valeurs comptables et produits des cessions courantes d'immobilisations)`,
      tresorie_nette: "Trésorerie-actif − Trésorerie-passif",
    },

    // -------------------------------------------------------------------------
    // PREMIÈRE APPLICATION DU SYSCOHADA RÉVISÉ
    // -------------------------------------------------------------------------
    premiere_application: {
      frais_etablissement: `Frais d'établissement antérieurs à la révision → virer au compte 4751 Compte transitoire
Étaler sur la durée restant à amortir (max 5 ans) par charges par nature :
  Débit 6324 + 6325 + 646... / Crédit 4751`,
      composants: `Réallocation des VNC entre composants sans modifier la VNC globale.
Application prospective des nouvelles durées d'amortissement.
Sans impact sur les capitaux propres.`,
      retraite: `Engagement de retraite non comptabilisé → Débit 4751 / Crédit 196
Méthode d'étalement : max 5 ans par dotations annuelles
  Débit 691 ou 697 / Crédit 4751`,
      contrats_long_terme: "Soldes des comptes 34/35 (méthode à l'achèvement) → Débit 4181 Clients factures à établir / Crédit 34/35",
    },

  }, // fin syscohada

}; // fin DOCS_CONTEXT

// Exportation pour utilisation dans le system prompt ou les modules Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = DOCS_CONTEXT;
}
