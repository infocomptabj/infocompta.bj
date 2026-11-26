/* ═══════════════════════════════════════════════════════════
   InfoCompta – Quiz (quiz.js)
   Contient : 1) l'anti-scintillement d'authentification
              2) les données des quiz (anciens + OHADA)
              3) la logique d'affichage et de navigation
   Pour ajouter un quiz : ajouter un objet dans le tableau QUIZZES.
═══════════════════════════════════════════════════════════ */

/* 1. Indique tôt que l'utilisateur est connecté (évite le scintillement du header) */
(function () {
  try {
    var raw = localStorage.getItem('sb-lmivfisdmuqbspvmvdzh-auth-token');
    if (raw) {
      var parsed = JSON.parse(raw);
      if (!parsed.expires_at || parsed.expires_at * 1000 > Date.now()) {
        document.documentElement.classList.add('ic-authed');
      }
    }
  } catch (e) {}
})();

/* 2. Données */
var QUIZZES = [
 {
  "id": "pc-bases",
  "theme": "plan",
  "themeLabel": "Plan Comptable OHADA",
  "icon": "📋",
  "title": "Les bases du SYSCOHADA",
  "desc": "Maîtrisez la structure des 9 classes du plan comptable OHADA révisé.",
  "level": "debutant",
  "questions": [
   {
    "q": "Combien de classes comporte le plan comptable OHADA (SYSCOHADA révisé) ?",
    "opts": [
     "7 classes",
     "8 classes",
     "9 classes",
     "10 classes"
    ],
    "answer": 2,
    "expl": "Le SYSCOHADA révisé comporte <strong>9 classes</strong> : classes 1 à 8 pour les comptes de bilan et de résultat, et la classe 9 pour la comptabilité analytique."
   },
   {
    "q": "Dans quelle classe du SYSCOHADA se trouvent les capitaux propres ?",
    "opts": [
     "Classe 1",
     "Classe 2",
     "Classe 3",
     "Classe 4"
    ],
    "answer": 0,
    "expl": "La <strong>Classe 1 : Comptes de ressources durables</strong> regroupe les capitaux propres, les dettes financières et les provisions pour risques."
   },
   {
    "q": "Le compte 401 dans le SYSCOHADA correspond à :",
    "opts": [
     "Clients",
     "Fournisseurs",
     "Banques",
     "Personnel"
    ],
    "answer": 1,
    "expl": "Le compte <strong>401 : Fournisseurs</strong> enregistre les dettes envers les fournisseurs de biens et services. Les clients sont en classe 4 également mais au compte 411."
   },
   {
    "q": "Quelle classe regroupe les comptes de trésorerie ?",
    "opts": [
     "Classe 4",
     "Classe 5",
     "Classe 6",
     "Classe 7"
    ],
    "answer": 1,
    "expl": "La <strong>Classe 5 : Comptes de trésorerie</strong> regroupe les disponibilités : caisse (571), banques (521), chèques postaux (531), etc."
   },
   {
    "q": "Le résultat net de l'exercice est la différence entre :",
    "opts": [
     "Actif et Passif",
     "Produits (classe 7) et Charges (classe 6)",
     "Capitaux propres et Dettes",
     "Immobilisations et Stocks"
    ],
    "answer": 1,
    "expl": "Le résultat net = <strong>Produits (classe 7) − Charges (classe 6)</strong>. Un résultat positif est un bénéfice, négatif une perte."
   }
  ]
 },
 {
  "id": "pc-avance",
  "theme": "plan",
  "themeLabel": "Plan Comptable OHADA",
  "icon": "📊",
  "title": "Comptes spécifiques OHADA",
  "desc": "Approfondissez votre connaissance des comptes particuliers du SYSCOHADA.",
  "level": "avance",
  "questions": [
   {
    "q": "Le compte 211 « Terrains » appartient à quelle classe ?",
    "opts": [
     "Classe 1",
     "Classe 2",
     "Classe 3",
     "Classe 5"
    ],
    "answer": 1,
    "expl": "Le compte <strong>211 : Terrains</strong> est en <strong>Classe 2 : Comptes d'actif immobilisé</strong>. La classe 2 regroupe toutes les immobilisations (corporelles, incorporelles et financières)."
   },
   {
    "q": "Quel compte enregistre les amortissements des immobilisations corporelles ?",
    "opts": [
     "Compte 28x",
     "Compte 29x",
     "Compte 39x",
     "Compte 49x"
    ],
    "answer": 0,
    "expl": "Les <strong>comptes 28x</strong> enregistrent les amortissements des immobilisations. Ex : 2812 pour l'amortissement des matériels et outillages. Les 29x sont pour les dépréciations d'immobilisations."
   },
   {
    "q": "Le compte 6011 correspond à :",
    "opts": [
     "Achats de marchandises",
     "Achats de matières premières",
     "Variation de stocks",
     "Frais de transport"
    ],
    "answer": 1,
    "expl": "Le compte <strong>6011 : Achats de matières premières</strong> enregistre les achats destinés à la production. Le 6010 est pour les achats de marchandises revendues en l'état."
   },
   {
    "q": "Dans le SYSCOHADA, le compte 701 enregistre :",
    "opts": [
     "Ventes de marchandises",
     "Ventes de produits finis",
     "Prestations de services",
     "Produits accessoires"
    ],
    "answer": 1,
    "expl": "Le compte <strong>701 : Ventes de produits finis</strong> enregistre les ventes de produits issus de la fabrication. Le 700 est pour les ventes de marchandises, le 706 pour les prestations de services."
   },
   {
    "q": "Quel est le solde normal du compte Fournisseurs (401) ?",
    "opts": [
     "Débiteur",
     "Créditeur",
     "Il n'a pas de solde normal",
     "Nul en fin d'exercice"
    ],
    "answer": 1,
    "expl": "Le compte <strong>401 : Fournisseurs</strong> a un solde normalement <strong>créditeur</strong>, car il représente une dette envers le fournisseur. Il est débité lors du paiement et crédité lors de la réception de la facture."
   }
  ]
 },
 {
  "id": "fisc-tva",
  "theme": "fiscalite",
  "themeLabel": "Fiscalité CGI Bénin",
  "icon": "🏛️",
  "title": "TVA au Bénin",
  "desc": "Taux, exonérations et mécanismes de la TVA selon le CGI béninois.",
  "level": "intermediaire",
  "questions": [
   {
    "q": "Quel est le taux normal de la TVA au Bénin ?",
    "opts": [
     "15%",
     "16%",
     "18%",
     "20%"
    ],
    "answer": 2,
    "expl": "Le taux normal de la <strong>TVA au Bénin est de 18%</strong> selon le Code Général des Impôts (CGI) béninois. C'est le taux applicable à la majorité des opérations imposables."
   },
   {
    "q": "Lequel de ces produits est exonéré de TVA au Bénin ?",
    "opts": [
     "Matériaux de construction",
     "Produits pétroliers",
     "Médicaments et produits pharmaceutiques",
     "Équipements informatiques"
    ],
    "answer": 2,
    "expl": "Les <strong>médicaments et produits pharmaceutiques</strong> sont exonérés de TVA au Bénin. Cette exonération vise à rendre les soins de santé accessibles à tous."
   },
   {
    "q": "La TVA collectée par une entreprise est comptabilisée au :",
    "opts": [
     "Compte 4451 : TVA facturée",
     "Compte 4452 : TVA récupérable",
     "Compte 4454 : TVA due",
     "Compte 6551 : Taxes"
    ],
    "answer": 0,
    "expl": "La <strong>TVA collectée (facturée)</strong> sur les ventes est enregistrée au <strong>compte 4451 : TVA facturée sur ventes</strong>. C'est une dette envers l'État, donc un compte créditeur."
   },
   {
    "q": "Quelle est la périodicité de déclaration de la TVA pour les entreprises relevant du régime réel normal au Bénin ?",
    "opts": [
     "Annuelle",
     "Trimestrielle",
     "Mensuelle",
     "Semestrielle"
    ],
    "answer": 2,
    "expl": "Les entreprises du régime réel normal effectuent une déclaration de TVA <strong>mensuelle</strong>, à déposer avant le 15 du mois suivant, accompagnée du paiement correspondant."
   },
   {
    "q": "Le droit à déduction de la TVA ne s'applique pas aux :",
    "opts": [
     "Achats de matières premières",
     "Frais de transport de marchandises",
     "Dépenses de logement et restauration des dirigeants",
     "Acquisitions de matériel de production"
    ],
    "answer": 2,
    "expl": "Les <strong>dépenses de logement, de restauration et de réception</strong> sont exclues du droit à déduction de TVA au Bénin, car elles sont considérées comme des dépenses à caractère personnel."
   }
  ]
 },
 {
  "id": "fisc-is",
  "theme": "fiscalite",
  "themeLabel": "Fiscalité CGI Bénin",
  "icon": "📑",
  "title": "Impôt sur les Sociétés",
  "desc": "Taux, assiette et obligations déclaratives de l'IS au Bénin.",
  "level": "avance",
  "questions": [
   {
    "q": "Quel est le taux de l'Impôt sur les Sociétés (IS) au Bénin ?",
    "opts": [
     "25%",
     "28%",
     "30%",
     "35%"
    ],
    "answer": 2,
    "expl": "Le taux de l'<strong>Impôt sur les Sociétés au Bénin est de 30%</strong> selon le CGI. Ce taux s'applique sur le bénéfice imposable de l'exercice."
   },
   {
    "q": "La contribution des patentes au Bénin est calculée sur la base de :",
    "opts": [
     "Le chiffre d'affaires uniquement",
     "La valeur locative des locaux professionnels",
     "Le bénéfice net",
     "Le capital social"
    ],
    "answer": 1,
    "expl": "La <strong>contribution des patentes</strong> est assise sur la <strong>valeur locative des locaux professionnels</strong>. C'est un impôt local dû par toute personne exerçant une activité commerciale ou industrielle."
   },
   {
    "q": "L'acompte d'IS au Bénin est payé :",
    "opts": [
     "En une seule fois en fin d'année",
     "En 3 versements trimestriels",
     "En 12 mensualités",
     "En 2 versements semestriels"
    ],
    "answer": 1,
    "expl": "L'acompte d'IS est versé en <strong>3 fractions trimestrielles</strong> (avril, juillet, octobre), chacune égale à 1/3 de l'impôt de l'exercice précédent. Le solde est réglé lors du dépôt de la déclaration annuelle."
   },
   {
    "q": "Quelle charge n'est PAS déductible de l'assiette de l'IS au Bénin ?",
    "opts": [
     "Salaires versés aux employés",
     "Intérêts des emprunts bancaires",
     "Amendes et pénalités fiscales",
     "Dotations aux amortissements"
    ],
    "answer": 2,
    "expl": "Les <strong>amendes, pénalités et majorations fiscales</strong> ne sont pas déductibles du résultat imposable. Elles ne constituent pas des charges d'exploitation normales mais des sanctions."
   },
   {
    "q": "Le minimum de perception de l'IS au Bénin s'applique lorsque :",
    "opts": [
     "L'entreprise réalise un bénéfice",
     "L'entreprise est déficitaire ou son IS calculé est inférieur au minimum",
     "L'entreprise est en liquidation",
     "Le chiffre d'affaires dépasse 1 milliard de FCFA"
    ],
    "answer": 1,
    "expl": "Le <strong>minimum de perception</strong> garantit un impôt minimum même en cas de déficit ou de faible bénéfice. Il est calculé sur le chiffre d'affaires et l'entreprise paie le montant le plus élevé entre l'IS calculé et le minimum."
   }
  ]
 },
 {
  "id": "ecr-bases",
  "theme": "ecritures",
  "themeLabel": "Écritures Comptables",
  "icon": "✍️",
  "title": "Écritures de base",
  "desc": "Passez les écritures courantes : achats, ventes, règlements.",
  "level": "debutant",
  "questions": [
   {
    "q": "Lors d'un achat de marchandises à crédit (HT : 500 000 FCFA, TVA 18%), on crédite :",
    "opts": [
     "Le compte 601 : Achats de marchandises",
     "Le compte 4011 : Fournisseurs",
     "Le compte 5211 : Banque",
     "Le compte 4451 : TVA collectée"
    ],
    "answer": 1,
    "expl": "À l'achat à crédit, on <strong>débite</strong> le compte 601 (achat) et 4452 (TVA déductible), et on <strong>crédite le compte 4011 : Fournisseurs</strong> pour le montant TTC (590 000 FCFA)."
   },
   {
    "q": "Lors du règlement d'un fournisseur par virement bancaire, on :",
    "opts": [
     "Débite 4011 Fournisseurs / Crédite 5211 Banque",
     "Débite 5211 Banque / Crédite 4011 Fournisseurs",
     "Débite 601 Achats / Crédite 5211 Banque",
     "Débite 4011 Fournisseurs / Crédite 401 Fournisseurs"
    ],
    "answer": 0,
    "expl": "Le règlement d'un fournisseur <strong>diminue la dette</strong> (débit 4011) et <strong>diminue la banque</strong> (crédit 5211). Principe : on débite ce qui diminue au passif et crédite ce qui diminue à l'actif."
   },
   {
    "q": "La vente de marchandises en espèces (HT 200 000 FCFA, TVA 18%) génère une écriture avec :",
    "opts": [
     "Débit 5711 Caisse 236 000 / Crédit 7011 Ventes 200 000 et 4451 TVA 36 000",
     "Débit 7011 Ventes / Crédit 5711 Caisse",
     "Débit 4111 Clients / Crédit 7011 Ventes",
     "Débit 5711 Caisse / Crédit 6011 Achats"
    ],
    "answer": 0,
    "expl": "La vente en espèces : <strong>Débit 5711 Caisse 236 000</strong> (encaissement TTC) / <strong>Crédit 7011 Ventes 200 000</strong> (produit HT) et <strong>Crédit 4451 TVA collectée 36 000</strong> (TVA due à l'État)."
   },
   {
    "q": "L'écriture de dotation aux amortissements d'un équipement se traduit par :",
    "opts": [
     "Débit 681 Dotations / Crédit 28x Amortissements",
     "Débit 28x Amortissements / Crédit 681 Dotations",
     "Débit 21x Immobilisations / Crédit 681 Dotations",
     "Débit 681 Dotations / Crédit 21x Immobilisations"
    ],
    "answer": 0,
    "expl": "<strong>Débit 681 : Dotations aux amortissements</strong> (charge) / <strong>Crédit 28x - Amortissements</strong> (compte de correction à l'actif). L'immobilisation reste au bilan à sa valeur brute, la dépréciation est portée dans le compte d'amortissement."
   },
   {
    "q": "Quelle est la règle fondamentale de la partie double en comptabilité ?",
    "opts": [
     "Toute recette doit être compensée par une dépense",
     "Le total des débits doit toujours égaler le total des crédits",
     "Tout actif doit être financé par un passif de même montant",
     "Les charges doivent toujours être inférieures aux produits"
    ],
    "answer": 1,
    "expl": "La <strong>partie double</strong> stipule que pour toute opération, le <strong>total des débits = total des crédits</strong>. C'est le principe fondateur de la comptabilité en partie double, garantissant l'équilibre permanent du bilan."
   }
  ]
 },
 {
  "id": "doc-pieces",
  "theme": "documents",
  "themeLabel": "Documents & Pièces",
  "icon": "📁",
  "title": "Pièces justificatives",
  "desc": "Identifiez et maîtrisez les documents obligatoires en comptabilité OHADA.",
  "level": "debutant",
  "questions": [
   {
    "q": "Quel document est obligatoire pour enregistrer un achat en comptabilité ?",
    "opts": [
     "Un bon de commande",
     "Une facture fournisseur",
     "Un devis",
     "Un bon de livraison"
    ],
    "answer": 1,
    "expl": "La <strong>facture fournisseur</strong> est la pièce justificative obligatoire pour enregistrer un achat. Elle doit mentionner : identité des parties, date, désignation, prix HT, TVA et total TTC."
   },
   {
    "q": "Les états financiers annuels obligatoires selon le SYSCOHADA comprennent :",
    "opts": [
     "Bilan + Compte de résultat uniquement",
     "Bilan + Compte de résultat + TAFIRE + Notes annexes",
     "Bilan + Tableau des flux de trésorerie",
     "Compte de résultat + Tableau de bord"
    ],
    "answer": 1,
    "expl": "Le SYSCOHADA impose 4 états financiers : <strong>Bilan, Compte de résultat, TAFIRE</strong> (Tableau Financier des Ressources et Emplois) et <strong>Notes annexes</strong>. Le système normal comprend aussi l'État supplémentaire statistique (ESS)."
   },
   {
    "q": "La durée légale de conservation des documents comptables au Bénin est de :",
    "opts": [
     "3 ans",
     "5 ans",
     "7 ans",
     "10 ans"
    ],
    "answer": 3,
    "expl": "Les livres comptables et documents justificatifs doivent être conservés pendant <strong>10 ans</strong> selon le droit OHADA (Acte Uniforme relatif au droit commercial général)."
   },
   {
    "q": "Le Grand Livre est :",
    "opts": [
     "Un registre légal obligatoire listant toutes les opérations par date",
     "Un registre regroupant tous les comptes avec leurs mouvements débits/crédits",
     "Un document récapitulant uniquement les soldes de fin d'exercice",
     "Un livre réservé aux grandes entreprises"
    ],
    "answer": 1,
    "expl": "Le <strong>Grand Livre</strong> est un registre obligatoire qui regroupe <strong>tous les comptes</strong> de l'entreprise avec le détail de leurs mouvements (débits et crédits). Il permet de suivre l'historique de chaque compte."
   },
   {
    "q": "Une note de débit envoyée par un client signifie :",
    "opts": [
     "Le client demande une réduction de prix sur une facture",
     "Le client réclame le remboursement d'un trop-perçu",
     "Le client informe d'un retard de livraison",
     "Le client confirme la réception de marchandises"
    ],
    "answer": 1,
    "expl": "Une <strong>note de débit</strong> (ou avis de débit) émise par un client signifie qu'il <strong>réclame un remboursement</strong> ou une correction - par exemple suite à un retour de marchandises défectueuses ou une erreur de facturation."
   }
  ]
 },
 {
  "id": "ohada-cadre",
  "theme": "plan",
  "themeLabel": "Plan Comptable OHADA",
  "icon": "🌍",
  "title": "OHADA, SYSCOHADA et AUDCIF",
  "desc": "Le cadre juridique : qui fait quoi, quand et pourquoi la révision de 2017.",
  "level": "debutant",
  "questions": [
   {
    "q": "Que signifie OHADA ?",
    "opts": [
     "Organisation pour l’Harmonisation en Afrique du Droit des Affaires",
     "Organisation des Hautes Autorités du Droit des Affaires",
     "Office Harmonisé des Affaires et de la Dette en Afrique",
     "Organisation pour l’Harmonisation des Activités Douanières en Afrique"
    ],
    "answer": 0,
    "expl": "L’OHADA a été créée par le traité de Port-Louis (Maurice) du <strong>17 octobre 1993</strong>."
   },
   {
    "q": "Que regroupe le SYSCOHADA ?",
    "opts": [
     "Uniquement le plan comptable général",
     "Le plan comptable général et le dispositif des comptes consolidés et combinés",
     "Le Code général des impôts et le plan comptable",
     "Les normes d’audit ISA et le code d’éthique"
    ],
    "answer": 1,
    "expl": "Le SYSCOHADA est annexé à l’AUDCIF."
   },
   {
    "q": "Que signifie AUDCIF ?",
    "opts": [
     "Acte uniforme relatif à l’audit et au contrôle de l’information financière",
     "Autorité uniforme de droit comptable et d’inspection fiscale",
     "Acte uniforme relatif au droit comptable et à l’information financière",
     "Acte uniforme du droit commercial et industriel financier"
    ],
    "answer": 2,
    "expl": "C’est le texte juridique ; le SYSCOHADA en est l’annexe technique."
   },
   {
    "q": "Quand l’AUDCIF a-t-il été adopté ?",
    "opts": [
     "Le 24 mars 2000 à Dakar",
     "Le 17 octobre 1993 à Port-Louis",
     "Le 1er janvier 2018 à Abidjan",
     "Le 26 janvier 2017 à Brazzaville"
    ],
    "answer": 3,
    "expl": "Il a été publié au Journal Officiel de l’OHADA le 15 février 2017."
   },
   {
    "q": "À partir de quelle date le SYSCOHADA révisé s’applique-t-il aux comptes individuels ?",
    "opts": [
     "1er janvier 2018",
     "1er janvier 2017",
     "1er janvier 2001",
     "1er janvier 2020"
    ],
    "answer": 0,
    "expl": "Pour les comptes consolidés, l’application est en principe fixée au 1er janvier 2019 (à confirmer dans le texte officiel)."
   },
   {
    "q": "Quand l’ancien plan comptable général OHADA a-t-il été adopté ?",
    "opts": [
     "Le 26 janvier 2017",
     "Le 24 mars 2000",
     "Le 17 octobre 1993",
     "Le 9 juin 2017"
    ],
    "answer": 1,
    "expl": "Il a été appliqué à partir du 1er janvier 2001 et remplacé par le SYSCOHADA révisé."
   },
   {
    "q": "Pourquoi le système a-t-il été révisé en 2017 ?",
    "opts": [
     "Pour supprimer la comptabilité en partie double",
     "Pour supprimer les états financiers",
     "Pour rapprocher la comptabilité des normes IFRS",
     "Pour aligner l’OHADA sur la comptabilité publique française"
    ],
    "answer": 2,
    "expl": "On est passé d’une comptabilité générale à une vraie comptabilité financière."
   },
   {
    "q": "Combien de comptes ont été créés par la révision par rapport à l’ancien plan ?",
    "opts": [
     "44",
     "191",
     "9",
     "188"
    ],
    "answer": 3,
    "expl": "Elle a aussi modifié l’intitulé de 191 comptes et supprimé 44 comptes."
   },
   {
    "q": "Qui est exclu du SYSCOHADA tout en restant dans le champ de l’AUDCIF ?",
    "opts": [
     "Les entités à but non lucratif",
     "Les sociétés anonymes",
     "Les entreprises individuelles",
     "Les SARL"
    ],
    "answer": 0,
    "expl": "Il n’existe pas de plan spécifique pour les associations et ONG : elles adaptent le SYSCOHADA."
   }
  ]
 },
 {
  "id": "ohada-notions",
  "theme": "plan",
  "themeLabel": "Plan Comptable OHADA",
  "icon": "📘",
  "title": "Notions de base de la comptabilité",
  "desc": "Partie double, actif, passif, charges, produits, exercice : le vocabulaire essentiel.",
  "level": "debutant",
  "questions": [
   {
    "q": "Que signifie le principe de la partie double ?",
    "opts": [
     "Chaque opération est enregistrée deux fois dans le même compte",
     "Chaque opération débite un compte et en crédite un autre du même montant",
     "Toute vente doit être accompagnée d’un achat",
     "Il faut deux signatures pour valider une écriture"
    ],
    "answer": 1,
    "expl": "Les débits sont donc toujours égaux aux crédits."
   },
   {
    "q": "Comment varie un compte d’actif ?",
    "opts": [
     "Il augmente au crédit et diminue au débit",
     "Il augmente toujours au crédit",
     "Il augmente au débit et diminue au crédit",
     "Il ne varie jamais"
    ],
    "answer": 2,
    "expl": "À l’inverse, un compte de passif augmente au crédit."
   },
   {
    "q": "Comment s’enregistre une charge ?",
    "opts": [
     "Au crédit",
     "Au débit ou au crédit selon la banque",
     "Elle ne s’enregistre pas",
     "Au débit"
    ],
    "answer": 3,
    "expl": "Un produit s’enregistre au crédit."
   },
   {
    "q": "Que regroupe l’actif ?",
    "opts": [
     "Ce que l’entité possède ou contrôle et qui lui procurera des avantages économiques",
     "Ce que l’entité doit aux tiers",
     "Uniquement la trésorerie",
     "Uniquement les immobilisations"
    ],
    "answer": 0,
    "expl": "Le passif regroupe les capitaux propres et les dettes."
   },
   {
    "q": "Une charge est-elle forcément un décaissement ?",
    "opts": [
     "Oui, toujours",
     "Non : c’est une consommation de ressources de la période",
     "Oui, mais seulement en espèces",
     "Non, c’est toujours un produit"
    ],
    "answer": 1,
    "expl": "Exemple : une dotation aux amortissements est une charge sans décaissement."
   },
   {
    "q": "Comment calcule-t-on le résultat net ?",
    "opts": [
     "Total de l’actif − total du passif",
     "Chiffre d’affaires − trésorerie",
     "Total des produits − total des charges",
     "Capital − dettes"
    ],
    "answer": 2,
    "expl": "Bénéfice : compte 131 ; perte : compte 139."
   },
   {
    "q": "Que montre le bilan ?",
    "opts": [
     "L’activité détaillée de chaque mois",
     "Uniquement les ventes de l’année",
     "Les impôts à payer",
     "Le patrimoine de l’entité à la date de clôture"
    ],
    "answer": 3,
    "expl": "Il est toujours équilibré : total actif = total passif."
   },
   {
    "q": "Que présente le compte de résultat ?",
    "opts": [
     "Les charges et produits de l’exercice et le résultat net",
     "Les dettes et créances en fin d’année",
     "Les engagements hors bilan uniquement",
     "Les stocks de fin d’année"
    ],
    "answer": 0,
    "expl": "Il est présenté en soldes successifs (marge, valeur ajoutée, EBE, etc.)."
   },
   {
    "q": "Quelle est la durée normale d’un exercice comptable ?",
    "opts": [
     "Six mois",
     "Douze mois",
     "Vingt-quatre mois",
     "Trois mois"
    ],
    "answer": 1,
    "expl": "Il coïncide en général avec l’année civile ; le premier exercice peut avoir une durée différente."
   },
   {
    "q": "Quelle est la durée générale de conservation des documents comptables dans l’espace OHADA ?",
    "opts": [
     "Trois ans",
     "Cinq ans",
     "Dix ans",
     "Vingt ans"
    ],
    "answer": 2,
    "expl": "À vérifier dans l’AUDCIF et la fiscalité de chaque État."
   },
   {
    "q": "Qu’est-ce qu’une immobilisation ?",
    "opts": [
     "Un bien destiné à être vendu en l’état",
     "Une dette à long terme",
     "Une charge payée d’avance",
     "Un bien destiné à servir durablement (plus d’un an) à l’activité"
    ],
    "answer": 3,
    "expl": "Ce qui est consommé dans l’année est une charge."
   },
   {
    "q": "Que comprennent les capitaux propres ?",
    "opts": [
     "Capital, réserves, report à nouveau, résultat, subventions d’investissement, provisions réglementées",
     "Capital et dettes bancaires",
     "Capital et stocks",
     "Résultat et créances"
    ],
    "answer": 0,
    "expl": "Le capital seul n’est qu’une partie des capitaux propres."
   },
   {
    "q": "Quelle est la différence entre créance et dette ?",
    "opts": [
     "Une créance est due par l’entité, une dette est due à l’entité",
     "Une créance est due à l’entité, une dette est due par l’entité",
     "Les deux sont des produits",
     "Aucune différence"
    ],
    "answer": 1,
    "expl": "Clients, État, personnel peuvent être créanciers ou débiteurs selon le cas."
   }
  ]
 },
 {
  "id": "ohada-plan",
  "theme": "plan",
  "themeLabel": "Plan Comptable OHADA",
  "icon": "📋",
  "title": "Structure du plan de comptes et systèmes",
  "desc": "Classes, codification, classe 9, système normal et système minimal de trésorerie.",
  "level": "debutant",
  "questions": [
   {
    "q": "Combien de classes comporte le SYSCOHADA ?",
    "opts": [
     "Sept",
     "Huit",
     "Neuf",
     "Dix"
    ],
    "answer": 2,
    "expl": "Les classes 1 à 5 sont des comptes de bilan, 6 à 8 des comptes de gestion, 9 est facultative."
   },
   {
    "q": "Quelle classe regroupe les engagements hors bilan et la comptabilité analytique ?",
    "opts": [
     "La classe 8",
     "La classe 7",
     "La classe 0",
     "La classe 9"
    ],
    "answer": 3,
    "expl": "Elle est d’application facultative."
   },
   {
    "q": "Que contient la classe 8 ?",
    "opts": [
     "Les autres charges et autres produits (HAO)",
     "Les comptes de trésorerie",
     "Les stocks",
     "Les capitaux propres"
    ],
    "answer": 0,
    "expl": "HAO = hors activités ordinaires."
   },
   {
    "q": "Dans le compte 4111, que désigne le premier chiffre ?",
    "opts": [
     "Le sous-compte",
     "La classe (tiers)",
     "Le type de client",
     "La banque"
    ],
    "answer": 1,
    "expl": "La codification est décimale : classe, puis nature, puis détail."
   },
   {
    "q": "Que signifie la terminaison 9 dans 39, 49 ou 59 ?",
    "opts": [
     "Comptes de TVA",
     "Comptes de clôture",
     "Dépréciations ou provisions de la classe",
     "Comptes de caisse"
    ],
    "answer": 2,
    "expl": "De même, 28 correspond aux amortissements."
   },
   {
    "q": "La classe 9 est-elle obligatoire ?",
    "opts": [
     "Oui, toujours",
     "Oui, pour les sociétés anonymes uniquement",
     "Oui, dès 30 millions de CA",
     "Non, elle est facultative"
    ],
    "answer": 3,
    "expl": "Les engagements hors bilan doivent toutefois figurer en notes annexes."
   },
   {
    "q": "Combien de systèmes de présentation existe-t-il depuis la révision ?",
    "opts": [
     "Deux : normal et minimal de trésorerie",
     "Trois : normal, allégé et minimal",
     "Un seul",
     "Quatre"
    ],
    "answer": 0,
    "expl": "Le système allégé a été abandonné."
   },
   {
    "q": "Quel est le seuil de chiffre d’affaires du SMT pour les entités de négoce ?",
    "opts": [
     "30 millions de FCFA",
     "60 millions de FCFA",
     "40 millions de FCFA",
     "100 millions de FCFA"
    ],
    "answer": 1,
    "expl": "Artisanal : 40 millions ; services : 30 millions."
   },
   {
    "q": "Quel est le seuil du SMT pour les entités de services ?",
    "opts": [
     "10 millions de FCFA",
     "60 millions de FCFA",
     "30 millions de FCFA",
     "40 millions de FCFA"
    ],
    "answer": 2,
    "expl": "Ancien seuil : 10 millions de FCFA."
   },
   {
    "q": "De quoi se compose l’état financier du système normal ?",
    "opts": [
     "Bilan et compte de résultat uniquement",
     "Compte de résultat et TAFIRE",
     "Journal et grand livre",
     "Bilan, compte de résultat, TFT et notes annexes"
    ],
    "answer": 3,
    "expl": "Le TFT remplace l’ancien TAFIRE."
   },
   {
    "q": "Qu’est-ce que le système minimal de trésorerie ?",
    "opts": [
     "Une comptabilité très simplifiée fondée sur les encaissements et décaissements",
     "Une comptabilité réservée aux banques",
     "Un système réservé aux groupes",
     "Une comptabilité sans pièces justificatives"
    ],
    "answer": 0,
    "expl": "Il aboutit à un bilan, un compte de résultat et des notes annexes."
   },
   {
    "q": "Que signifie HAO ?",
    "opts": [
     "Honoraires et autres opérations",
     "Hors activités ordinaires",
     "Hors actif ordinaire",
     "Haut niveau d’assurance opérationnelle"
    ],
    "answer": 1,
    "expl": "On y trouve cessions d’immobilisations, sinistres, restructurations."
   }
  ]
 },
 {
  "id": "ohada-comptes",
  "theme": "plan",
  "themeLabel": "Plan Comptable OHADA",
  "icon": "🔎",
  "title": "Reconnaître les comptes",
  "desc": "Associez le numéro de compte à son intitulé dans le plan révisé.",
  "level": "intermediaire",
  "questions": [
   {
    "q": "À quoi correspond le compte 12 ?",
    "opts": [
     "Réserves",
     "Résultat net",
     "Report à nouveau",
     "Capital"
    ],
    "answer": 2,
    "expl": "121 : report à nouveau créditeur ; 129 : débiteur."
   },
   {
    "q": "À quoi correspond le compte 13 ?",
    "opts": [
     "Report à nouveau",
     "Subventions",
     "Emprunts",
     "Résultat net de l’exercice"
    ],
    "answer": 3,
    "expl": "131 : bénéfice ; 139 : perte."
   },
   {
    "q": "À quoi correspond le compte 14 ?",
    "opts": [
     "Subventions d’investissement",
     "Provisions réglementées",
     "Emprunts",
     "Réserves"
    ],
    "answer": 0,
    "expl": "Elles sont inscrites en capitaux propres."
   },
   {
    "q": "Que contient le compte 17 ?",
    "opts": [
     "Réserves",
     "Dettes de location-acquisition",
     "Capital",
     "Provisions"
    ],
    "answer": 1,
    "expl": "La location-acquisition est inscrite au bilan de l’utilisateur."
   },
   {
    "q": "Que contient le compte 22 ?",
    "opts": [
     "Immobilisations incorporelles",
     "Bâtiments",
     "Terrains",
     "Matériel"
    ],
    "answer": 2,
    "expl": "21 : immobilisations incorporelles ; 23 : bâtiments ; 24 : matériel."
   },
   {
    "q": "Quel compte est celui des clients ?",
    "opts": [
     "40",
     "42",
     "44",
     "41"
    ],
    "answer": 3,
    "expl": "40 : fournisseurs ; 42 : personnel ; 44 : État."
   },
   {
    "q": "Quel compte regroupe les banques ?",
    "opts": [
     "52",
     "57",
     "51",
     "58"
    ],
    "answer": 0,
    "expl": "57 : caisse ; 51 : valeurs à encaisser."
   },
   {
    "q": "Quel compte regroupe les transports ?",
    "opts": [
     "60",
     "61",
     "62",
     "64"
    ],
    "answer": 1,
    "expl": "611 : transports sur achats ; 612 : sur ventes."
   },
   {
    "q": "Quel compte regroupe les charges de personnel ?",
    "opts": [
     "64",
     "65",
     "66",
     "67"
    ],
    "answer": 2,
    "expl": "661 : rémunérations directes ; 664 : charges sociales."
   },
   {
    "q": "Quel compte regroupe les frais financiers ?",
    "opts": [
     "66",
     "68",
     "77",
     "67"
    ],
    "answer": 3,
    "expl": "671 : intérêts des emprunts."
   },
   {
    "q": "Que contient le compte 78 ?",
    "opts": [
     "Transferts de charges",
     "Revenus financiers",
     "Ventes",
     "Subventions d’exploitation"
    ],
    "answer": 0,
    "expl": "77 : revenus financiers ; 79 : reprises."
   },
   {
    "q": "Quel compte regroupe les stocks de marchandises ?",
    "opts": [
     "32",
     "31",
     "36",
     "39"
    ],
    "answer": 1,
    "expl": "32 : matières premières ; 36 : produits finis ; 39 : dépréciations."
   },
   {
    "q": "Quel compte regroupe l’impôt sur le résultat ?",
    "opts": [
     "87",
     "88",
     "89",
     "64"
    ],
    "answer": 2,
    "expl": "87 : participation des travailleurs ; 88 : subventions d’équilibre."
   }
  ]
 },
 {
  "id": "ohada-principes",
  "theme": "plan",
  "themeLabel": "Plan Comptable OHADA",
  "icon": "⚖️",
  "title": "Principes comptables fondamentaux",
  "desc": "Continuité d’exploitation, prudence, indépendance des exercices, image fidèle.",
  "level": "intermediaire",
  "questions": [
   {
    "q": "Combien de principes comptables fondamentaux le SYSCOHADA retient-il ?",
    "opts": [
     "Cinq",
     "Sept",
     "Douze",
     "Dix"
    ],
    "answer": 3,
    "expl": "Ils sont classés en postulats et en conventions."
   },
   {
    "q": "Qu’est-ce que la continuité d’exploitation ?",
    "opts": [
     "L’hypothèse que l’entité poursuivra son activité dans un avenir prévisible",
     "L’obligation d’exploiter 365 jours par an",
     "La continuité des numéros de pièces",
     "L’interdiction de licencier"
    ],
    "answer": 0,
    "expl": "Elle permet d’évaluer les biens à leur valeur actuelle pour apprécier les pertes de valeur."
   },
   {
    "q": "Que se passe-t-il sans continuité d’exploitation ?",
    "opts": [
     "Les biens restent évalués au coût historique",
     "Les biens sont évalués à leur valeur liquidative",
     "Les comptes ne sont plus tenus",
     "Les amortissements doublent"
    ],
    "answer": 1,
    "expl": "Cette information figure dans les notes annexes."
   },
   {
    "q": "La comptabilité d’engagement est :",
    "opts": [
     "Une hypothèse de base",
     "Une option",
     "Un postulat",
     "Un état financier"
    ],
    "answer": 2,
    "expl": "L’hypothèse de base est la continuité d’exploitation."
   },
   {
    "q": "Que signifie l’image fidèle ?",
    "opts": [
     "Les états financiers doivent être identiques à ceux de l’an passé",
     "Les états doivent maximiser le bénéfice",
     "Les états doivent être signés par le banquier",
     "Les états financiers donnent une représentation sincère du patrimoine, de la situation et du résultat"
    ],
    "answer": 3,
    "expl": "Des informations complémentaires sont fournies en notes si nécessaire."
   },
   {
    "q": "Que dit le principe de prudence ?",
    "opts": [
     "Constater les pertes probables mais ne pas comptabiliser des gains non réalisés",
     "Ne jamais constater de pertes",
     "Constater tous les gains probables",
     "Interdire les provisions"
    ],
    "answer": 0,
    "expl": "Une provision est constituée dès qu’une perte est probable."
   },
   {
    "q": "Quelle comptabilité repose sur les droits constatés ?",
    "opts": [
     "La comptabilité de trésorerie",
     "La comptabilité d’engagement",
     "La comptabilité de caisse",
     "La comptabilité budgétaire"
    ],
    "answer": 1,
    "expl": "On enregistre l’opération à sa naissance, pas à son paiement."
   },
   {
    "q": "Que signifie l’indépendance des exercices ?",
    "opts": [
     "Chaque exercice a un expert-comptable différent",
     "Les exercices n’ont pas de lien avec le bilan d’ouverture",
     "Chaque exercice ne contient que ses propres charges et produits",
     "Les exercices sont tenus dans des logiciels distincts"
    ],
    "answer": 2,
    "expl": "D’où les écritures de régularisation à la clôture."
   },
   {
    "q": "Que signifie l’intangibilité du bilan d’ouverture ?",
    "opts": [
     "Le bilan ne peut jamais être publié",
     "Le bilan est tenu secret",
     "Le bilan est corrigé chaque mois",
     "Le bilan d’ouverture doit correspondre au bilan de clôture précédent"
    ],
    "answer": 3,
    "expl": "Il ne se corrige pas par le compte de résultat."
   },
   {
    "q": "Que signifie la non-compensation ?",
    "opts": [
     "On ne compense ni actif et passif, ni charges et produits",
     "On compense les créances et les dettes à la clôture",
     "On compense les erreurs avec les bénéfices",
     "On compense les amortissements avec les stocks"
    ],
    "answer": 0,
    "expl": "Un fournisseur débiteur reste à l’actif."
   }
  ]
 },
 {
  "id": "ohada-techniques",
  "theme": "plan",
  "themeLabel": "Plan Comptable OHADA",
  "icon": "🧩",
  "title": "Traitements techniques du SYSCOHADA révisé",
  "desc": "Composants, démantèlement, R&D, location, retraite, IFRS : d’après les avis techniques officiels de l’OHADA.",
  "level": "avance",
  "questions": [
   {
    "q": "L’approche par composants est-elle obligatoire ?",
    "opts": [
     "Non, c’est une option",
     "Oui, si l’entité remplit les quatre conditions de l’article 38-1",
     "Oui, pour toutes les entités sans condition",
     "Non, elle est réservée aux groupes"
    ],
    "answer": 1,
    "expl": "Avis technique OHADA, réponse n° 21."
   },
   {
    "q": "Quand teste-t-on la perte de valeur d’une immobilisation ?",
    "opts": [
     "À chaque clôture, systématiquement",
     "Uniquement avec un expert externe",
     "Seulement en présence d’un indice de perte de valeur",
     "Jamais"
    ],
    "answer": 2,
    "expl": "L’entité peut déterminer elle-même la valeur actuelle."
   },
   {
    "q": "Combien de conditions doivent être remplies pour immobiliser des frais de développement ?",
    "opts": [
     "Deux",
     "Quatre",
     "Huit",
     "Six"
    ],
    "answer": 3,
    "expl": "Faisabilité technique, intention, capacité, marché, ressources, évaluation fiable."
   },
   {
    "q": "En règle générale, quand une immobilisation incorporelle est-elle inscrite à l’actif ?",
    "opts": [
     "Lorsqu’elle est acquise",
     "Lorsqu’elle est créée en interne",
     "Toujours",
     "Jamais"
    ],
    "answer": 0,
    "expl": "Exceptions : frais de développement et prospection minière sous conditions."
   },
   {
    "q": "Où inclut-on les coûts de démantèlement lorsque l’entité y est obligée ?",
    "opts": [
     "En provision pour charges à répartir",
     "Dans le coût d’acquisition de l’immobilisation",
     "En charges de l’exercice du démantèlement",
     "En capitaux propres"
    ],
    "answer": 1,
    "expl": "Le compte « provisions pour charges à répartir » a été supprimé."
   },
   {
    "q": "Quand une pièce de rechange de sécurité est-elle amortie ?",
    "opts": [
     "À la date de son utilisation",
     "Jamais",
     "Dès son acquisition",
     "À la clôture suivante"
    ],
    "answer": 2,
    "expl": "La pièce principale, au contraire, est amortie à partir de son utilisation."
   },
   {
    "q": "La réévaluation partielle est-elle permise ?",
    "opts": [
     "Oui, pour les terrains",
     "Oui, pour les véhicules",
     "Oui, sur décision de l’AG",
     "Non, toute réévaluation partielle est interdite (art. 62)"
    ],
    "answer": 3,
    "expl": "Toutes les immobilisations corporelles et financières doivent être réévaluées."
   },
   {
    "q": "Comment traite-t-on la valeur résiduelle d’un bien en crédit-bail ?",
    "opts": [
     "Elle vient en déduction de la base amortissable",
     "Elle est ajoutée à la base amortissable",
     "Elle est ignorée",
     "Elle est en charges"
    ],
    "answer": 0,
    "expl": "Quel que soit le mode d’acquisition du bien."
   },
   {
    "q": "Quelle méthode d’évaluation des retraites doivent utiliser les entités cotées ?",
    "opts": [
     "La méthode simplifiée",
     "La méthode actuarielle",
     "La méthode forfaitaire",
     "Aucune évaluation"
    ],
    "answer": 1,
    "expl": "Les autres entités peuvent choisir la méthode simplifiée."
   },
   {
    "q": "Comment corrige-t-on une erreur significative d’un exercice antérieur ?",
    "opts": [
     "Par le compte de résultat de l’exercice en cours",
     "Par suppression des écritures",
     "Par ajustement du compte report à nouveau",
     "Par un compte de caisse"
    ],
    "answer": 2,
    "expl": "Article 20, alinéa 3."
   },
   {
    "q": "Que dit l’OHADA sur l’évaluation initiale d’un contrat de couverture ?",
    "opts": [
     "Elle génère une charge immédiate",
     "Elle génère un produit immédiat",
     "Elle est portée en capital",
     "Elle ne génère aucune écriture : c’est un engagement hors bilan"
    ],
    "answer": 3,
    "expl": "Il est mentionné en note annexe."
   },
   {
    "q": "Comment les entités faisant appel public à l’épargne établissent-elles leurs comptes consolidés ?",
    "opts": [
     "En normes IFRS",
     "En SYSCOHADA uniquement",
     "Elles n’en établissent pas",
     "En normes françaises"
    ],
    "answer": 0,
    "expl": "Pour les comptes personnels : SYSCOHADA et IFRS."
   },
   {
    "q": "Quel compte suit les avoirs des clients d’un mobile money ?",
    "opts": [
     "Le compte 411 Clients",
     "Le compte 473 Mandants",
     "Le compte 101 Capital",
     "Le compte 571 Caisse"
    ],
    "answer": 1,
    "expl": "Les commissions vont au 706 ou 7071."
   },
   {
    "q": "L’assemblée générale approuve-t-elle le bilan d’ouverture (pro forma) ?",
    "opts": [
     "Oui, obligatoirement",
     "Oui, avec le commissaire aux comptes",
     "Non, elle approuve les comptes de fin d’exercice",
     "Oui, avant le 30 juin"
    ],
    "answer": 2,
    "expl": "Le bilan d’ouverture ne modifie pas le résultat fiscal."
   },
   {
    "q": "Quel compte transitoire a servi au passage au SYSCOHADA révisé ?",
    "opts": [
     "Le compte 131",
     "Le compte 129",
     "Le compte 101",
     "Le compte 475"
    ],
    "answer": 3,
    "expl": "Article 111-1 : on ne corrige pas les soldes d’ouverture par le résultat."
   },
   {
    "q": "Que présente-t-on dans la colonne N-1 du compte de résultat de 2018 ?",
    "opts": [
     "Aucun chiffre",
     "Les chiffres de 2017 retraités",
     "Les chiffres de 2016",
     "Les chiffres budgétés"
    ],
    "answer": 0,
    "expl": "Seul le bilan a fait l’objet d’un pro forma."
   },
   {
    "q": "Que traite la ligne FL du TFT ?",
    "opts": [
     "Les subventions accordées par l’entité",
     "Les subventions reçues par l’entité",
     "Les dividendes versés",
     "Les emprunts remboursés"
    ],
    "answer": 1,
    "expl": "Les avances accordées (compte 4497) relèvent de la ligne FB."
   }
  ]
 },
 {
  "id": "ecr-achats-ventes",
  "theme": "ecritures",
  "themeLabel": "Écritures Comptables",
  "icon": "🛒",
  "title": "Achats, ventes et règlements",
  "desc": "TVA, escomptes, immobilisations, avances : les écritures commerciales courantes.",
  "level": "debutant",
  "questions": [
   {
    "q": "Achat de marchandises à crédit : 1 000 000 HT, TVA 18 %. Quelle écriture ?",
    "opts": [
     "D 601 : 1 180 000 / C 4011 : 1 180 000",
     "D 4011 / C 601",
     "D 601 : 1 000 000 ; D 4452 : 180 000 / C 4011 : 1 180 000",
     "D 4452 : 1 180 000 / C 601"
    ],
    "answer": 2,
    "expl": "La TVA récupérable est un compte de tiers (État), pas une charge."
   },
   {
    "q": "Vente à crédit de 2 000 000 HT, TVA 18 % : quel montant débite-t-on au compte clients ?",
    "opts": [
     "2 000 000",
     "360 000",
     "2 180 000",
     "2 360 000"
    ],
    "answer": 3,
    "expl": "Crédit 701 : 2 000 000 et 4431 : 360 000."
   },
   {
    "q": "Règlement d’un client par virement : quelle écriture ?",
    "opts": [
     "D 521 Banques / C 4111 Clients",
     "D 4111 Clients / C 521 Banques",
     "D 701 Ventes / C 521",
     "D 4011 / C 521"
    ],
    "answer": 0,
    "expl": "La trésorerie augmente, la créance disparaît."
   },
   {
    "q": "Règlement d’un fournisseur par chèque : quelle écriture ?",
    "opts": [
     "D 521 Banques / C 4011",
     "D 4011 Fournisseurs / C 521 Banques",
     "D 601 / C 4011",
     "D 4452 / C 521"
    ],
    "answer": 1,
    "expl": "La dette diminue et la banque aussi."
   },
   {
    "q": "Quel compte reçoit un chèque client non encore encaissé ?",
    "opts": [
     "521 Banques",
     "571 Caisse",
     "513 Chèques à encaisser",
     "4111 Clients"
    ],
    "answer": 2,
    "expl": "À la remise en banque : D 521 / C 513."
   },
   {
    "q": "Quel compte enregistre le transport sur achats ?",
    "opts": [
     "612",
     "601",
     "624",
     "611"
    ],
    "answer": 3,
    "expl": "612 : transport sur ventes."
   },
   {
    "q": "Quel compte reçoit les rabais, remises et ristournes obtenus sur achats ?",
    "opts": [
     "6019",
     "7019",
     "673",
     "773"
    ],
    "answer": 0,
    "expl": "7019 : RRR accordés sur ventes."
   },
   {
    "q": "L’escompte de règlement accordé aux clients est :",
    "opts": [
     "Un produit financier (773)",
     "Une charge financière (673)",
     "Un produit d’exploitation",
     "Une réduction du capital"
    ],
    "answer": 1,
    "expl": "L’escompte obtenu des fournisseurs : 773."
   },
   {
    "q": "À quel compte enregistre-t-on le fournisseur d’une immobilisation achetée à crédit ?",
    "opts": [
     "4011 Fournisseurs",
     "401 Capital",
     "481 Fournisseurs d’investissements",
     "4111 Clients"
    ],
    "answer": 2,
    "expl": "La TVA sur immobilisations va au 4451."
   },
   {
    "q": "Quel est le compte d’une avance versée à un fournisseur ?",
    "opts": [
     "419 Clients créditeurs",
     "421 Personnel",
     "462 Associés",
     "409 Fournisseurs débiteurs"
    ],
    "answer": 3,
    "expl": "419 enregistre les acomptes reçus des clients."
   },
   {
    "q": "Quel est le coût d’entrée d’une immobilisation acquise ?",
    "opts": [
     "Prix d’achat net, frais accessoires, frais d’installation et démantèlement estimé si obligation",
     "Le prix de vente prévu",
     "Le prix d’achat TTC uniquement",
     "La valeur de l’assurance"
    ],
    "answer": 0,
    "expl": "Article 37 de l’AUDCIF."
   }
  ]
 },
 {
  "id": "ecr-gestion",
  "theme": "ecritures",
  "themeLabel": "Écritures Comptables",
  "icon": "🏭",
  "title": "Paie, emprunts, immobilisations et stocks",
  "desc": "Amortissements, cessions, salaires, loyers, emprunts, affectation du résultat, stocks.",
  "level": "intermediaire",
  "questions": [
   {
    "q": "Un matériel de 5 000 000 FCFA est amorti linéairement sur 5 ans (valeur résiduelle nulle). Quelle est l’annuité ?",
    "opts": [
     "500 000",
     "1 000 000",
     "2 500 000",
     "5 000 000"
    ],
    "answer": 1,
    "expl": "Annuité = base amortissable ÷ durée d’utilité."
   },
   {
    "q": "Quel mode d’amortissement est interdit pour les immobilisations corporelles ?",
    "opts": [
     "Le mode linéaire",
     "Le mode dégressif",
     "Celui basé sur les revenus générés par l’actif",
     "Le mode variable selon les unités produites"
    ],
    "answer": 2,
    "expl": "Article 45 AUDCIF, aligné sur les IFRS."
   },
   {
    "q": "Cession d’un véhicule : valeur d’origine 10 000 000, amorti 8 000 000. Quelle est la VNC portée au compte 81 ?",
    "opts": [
     "8 000 000",
     "10 000 000",
     "3 000 000",
     "2 000 000"
    ],
    "answer": 3,
    "expl": "Le prix de cession est un produit au compte 82."
   },
   {
    "q": "À quel compte inscrit-on la créance sur la cession d’une immobilisation ?",
    "opts": [
     "485",
     "411",
     "4111",
     "463"
    ],
    "answer": 0,
    "expl": "Elle est distincte des créances d’exploitation."
   },
   {
    "q": "Quel compte reçoit le salaire brut ?",
    "opts": [
     "422",
     "661",
     "431",
     "664"
    ],
    "answer": 1,
    "expl": "Le net à payer est dû au 422."
   },
   {
    "q": "Quel compte reçoit les charges sociales patronales ?",
    "opts": [
     "661",
     "431",
     "664",
     "447"
    ],
    "answer": 2,
    "expl": "Elles ont pour contrepartie une dette sociale."
   },
   {
    "q": "Quel compte reçoit un loyer ?",
    "opts": [
     "624 Entretien",
     "625 Assurances",
     "611 Transports",
     "622 Locations et charges locatives"
    ],
    "answer": 3,
    "expl": "Si le loyer concerne l’exercice suivant : charge constatée d’avance (476)."
   },
   {
    "q": "À la réception d’un emprunt bancaire, que crédite-t-on ?",
    "opts": [
     "162",
     "671",
     "521",
     "101"
    ],
    "answer": 0,
    "expl": "On débite 521 Banques."
   },
   {
    "q": "Quel compte reçoit les intérêts d’emprunt ?",
    "opts": [
     "162",
     "671",
     "673",
     "773"
    ],
    "answer": 1,
    "expl": "Ils sont des frais financiers."
   },
   {
    "q": "Comment s’affecte un bénéfice approuvé par l’AG ?",
    "opts": [
     "D 139 / C 131",
     "D 121 / C 465",
     "D 131 / C réserves, dividendes à payer (465), report à nouveau (121)",
     "D 101 / C 131"
    ],
    "answer": 2,
    "expl": "Une réserve légale est prélevée jusqu’au cinquième du capital pour les sociétés commerciales."
   },
   {
    "q": "Comment s’affecte une perte ?",
    "opts": [
     "D 139 / C 129",
     "D 131 / C 129",
     "D 101 / C 139",
     "D 129 Report à nouveau débiteur / C 139 Résultat net : perte"
    ],
    "answer": 3,
    "expl": "La perte est reportée sur les exercices suivants."
   },
   {
    "q": "Où enregistre-t-on une subvention d’investissement reçue ?",
    "opts": [
     "Compte 14 en capitaux propres",
     "Compte 71 en produits",
     "Compte 4111",
     "Compte 101"
    ],
    "answer": 0,
    "expl": "Elle est reprise en résultat HAO au rythme de l’amortissement du bien."
   },
   {
    "q": "Quelles méthodes d’évaluation des sorties de stock sont admises ?",
    "opts": [
     "LIFO uniquement",
     "CUMP et PEPS (FIFO)",
     "LIFO et FIFO",
     "Prix de vente"
    ],
    "answer": 1,
    "expl": "Le LIFO n’est pas admis."
   },
   {
    "q": "Stock initial : 100 u à 1 000 ; entrée : 50 u à 1 200. Quel est le CUMP ?",
    "opts": [
     "1 100",
     "1 000",
     "1 066,67",
     "1 200"
    ],
    "answer": 2,
    "expl": "(100 × 1 000 + 50 × 1 200) ÷ 150."
   },
   {
    "q": "Quel compte reçoit la variation de stocks de marchandises ?",
    "opts": [
     "601",
     "701",
     "7341",
     "6031"
    ],
    "answer": 3,
    "expl": "On annule le stock initial puis on constate le stock final."
   },
   {
    "q": "Les frais de constitution d’une société sont :",
    "opts": [
     "Des charges de l’exercice",
     "Des immobilisations",
     "Des capitaux propres",
     "Des créances"
    ],
    "answer": 0,
    "expl": "Seules les immobilisations incorporelles acquises sont inscrites à l’actif."
   }
  ]
 },
 {
  "id": "ecr-cloture",
  "theme": "ecritures",
  "themeLabel": "Écritures Comptables",
  "icon": "📅",
  "title": "Clôture, régularisations et erreurs",
  "desc": "Charges constatées d’avance, factures non parvenues, devises, créances douteuses.",
  "level": "intermediaire",
  "questions": [
   {
    "q": "Quel compte enregistre les charges constatées d’avance ?",
    "opts": [
     "477",
     "476",
     "4081",
     "4181"
    ],
    "answer": 1,
    "expl": "477 : produits constatés d’avance."
   },
   {
    "q": "Quel compte enregistre les factures non parvenues ?",
    "opts": [
     "4181",
     "476",
     "4081",
     "409"
    ],
    "answer": 2,
    "expl": "4181 : clients, factures à établir."
   },
   {
    "q": "Quel compte enregistre un produit acquis mais non encore facturé ?",
    "opts": [
     "4081 Fournisseurs, factures non parvenues",
     "477",
     "419",
     "4181 Clients, factures à établir"
    ],
    "answer": 3,
    "expl": "C’est un produit à recevoir."
   },
   {
    "q": "Quel compte reçoit les dépréciations de stocks ?",
    "opts": [
     "39",
     "49",
     "29",
     "59"
    ],
    "answer": 0,
    "expl": "49 : dépréciations des tiers ; 29 : immobilisations."
   },
   {
    "q": "Où transfère-t-on un client douteux ?",
    "opts": [
     "411 Clients",
     "416 Clients douteux ou litigieux",
     "419 Clients créditeurs",
     "654 Pertes"
    ],
    "answer": 1,
    "expl": "On constate ensuite une dépréciation (491)."
   },
   {
    "q": "Quel compte enregistre une perte sur créance irrécouvrable ?",
    "opts": [
     "416",
     "491",
     "654",
     "673"
    ],
    "answer": 2,
    "expl": "La dépréciation éventuelle est reprise."
   },
   {
    "q": "Quels comptes enregistrent les écarts de conversion de devises ?",
    "opts": [
     "401 et 411",
     "673 et 773",
     "131 et 139",
     "478 (actif) et 479 (passif)"
    ],
    "answer": 3,
    "expl": "Une perte latente non compensée donne lieu à une provision pour risque de change."
   },
   {
    "q": "Que vérifie un rapprochement bancaire ?",
    "opts": [
     "La concordance entre le compte 52 et le relevé de la banque",
     "La concordance entre la caisse et le capital",
     "La concordance entre stocks et ventes",
     "La concordance entre TVA et salaires"
    ],
    "answer": 0,
    "expl": "On cherche chèques non débités, remises non créditées, frais non comptabilisés."
   },
   {
    "q": "Quel compte enregistre une avance sur salaire ?",
    "opts": [
     "422",
     "421",
     "431",
     "447"
    ],
    "answer": 1,
    "expl": "Elle est récupérée sur le salaire suivant."
   },
   {
    "q": "Où enregistre-t-on une erreur non significative d’un exercice antérieur ?",
    "opts": [
     "Au report à nouveau",
     "Au capital",
     "En charges ou produits de l’exercice en cours (art. 61)",
     "En dettes"
    ],
    "answer": 2,
    "expl": "Mention spécifique dans les notes annexes."
   },
   {
    "q": "Une facture d’électricité de l’année dernière arrive après la clôture et n’était pas estimable. Où la comptabiliser ?",
    "opts": [
     "En report à nouveau",
     "En immobilisation",
     "On l’ignore",
     "En charge de l’exercice en cours avec mention en annexe"
    ],
    "answer": 3,
    "expl": "Si elle était connue à la clôture, elle aurait dû être en factures non parvenues."
   },
   {
    "q": "Peut-on effacer une écriture erronée ?",
    "opts": [
     "Non, on passe une écriture d’annulation (extourne) puis une écriture correcte",
     "Oui, avec du blanc correcteur",
     "Oui, avant la clôture mensuelle uniquement",
     "Oui, si le patron le demande"
    ],
    "answer": 0,
    "expl": "Les écritures sont chronologiques et intangibles."
   }
  ]
 },
 {
  "id": "ecr-insolites",
  "theme": "ecritures",
  "themeLabel": "Écritures Comptables",
  "icon": "🤯",
  "title": "Cas insolites et rocambolesques",
  "desc": "Teck, mobile money, carrière, troc, incendie : des situations hors manuels.",
  "level": "avance",
  "questions": [
   {
    "q": "Un terrain est acheté avec des plants de teck destinés à la vente. Comment traiter l’achat ?",
    "opts": [
     "Tout en terrain 2211",
     "Ventiler : terrain en 2211, plants en stock (3632 ou 3452)",
     "Tout en charges",
     "Tout en 3632"
    ],
    "answer": 1,
    "expl": "Ventilation selon l’article 38 de l’AUDCIF."
   },
   {
    "q": "Comment évalue-t-on les rejets qui repoussent des souches ?",
    "opts": [
     "À zéro",
     "Au prix de vente TTC",
     "À leur valeur actuelle si marché, sinon en stock de produits en cours (7341)",
     "En immobilisations amortissables"
    ],
    "answer": 2,
    "expl": "Jusqu’à maturité."
   },
   {
    "q": "Dans un mobile money, comment sont traités les fonds des abonnés ?",
    "opts": [
     "En capital",
     "En chiffre d’affaires",
     "En emprunts",
     "En comptabilité de mandataire (compte 473)"
    ],
    "answer": 3,
    "expl": "Les commissions sont enregistrées en 706 ou 7071."
   },
   {
    "q": "Une carrière est mise à disposition par l’État contre redevance. Faut-il l’inscrire à l’actif ?",
    "opts": [
     "Non, l’entité n’inscrit aucun bien appartenant au concédant",
     "Oui, en terrain",
     "Oui, en stock",
     "Oui, en subvention"
    ],
    "answer": 0,
    "expl": "Il faut analyser la convention (concessions et PPP)."
   },
   {
    "q": "Une carrière acquise comprend :",
    "opts": [
     "Un terrain uniquement",
     "Un gisement (stock, compte 32) et un tréfonds (compte 225 ou 2295)",
     "Un bâtiment et un terrain",
     "Un stock de marchandises"
    ],
    "answer": 1,
    "expl": "Ventilation selon l’article 38."
   },
   {
    "q": "Une usine industrielle a-t-elle automatiquement une obligation de démantèlement ?",
    "opts": [
     "Oui, toujours",
     "Oui, dès 10 ans",
     "Non, uniquement si l’entité a l’obligation de remise en état du site",
     "Non, jamais"
    ],
    "answer": 2,
    "expl": "Exemple d’obligation : une plateforme pétrolière."
   },
   {
    "q": "Dans une entreprise individuelle, où inscrit-on les fonds mis à disposition par l’exploitant ?",
    "opts": [
     "101",
     "462",
     "131",
     "1041 ou 1042"
    ],
    "answer": 3,
    "expl": "Compte de l’exploitant (104)."
   },
   {
    "q": "Le bâtiment de logement du personnel est-il un actif ?",
    "opts": [
     "Oui, il génère indirectement une ressource économique",
     "Non, c’est une charge",
     "Non, c’est une dette",
     "Non, c’est un stock"
    ],
    "answer": 0,
    "expl": "Avis technique OHADA, réponse n° 28."
   },
   {
    "q": "Une association doit-elle appliquer le SYSCOHADA ?",
    "opts": [
     "Oui, sans adaptation",
     "Non, elle est dans l’AUDCIF mais exclue du SYSCOHADA ; elle adapte le plan",
     "Non, elle n’a aucune obligation comptable",
     "Oui, avec la classe 9 obligatoire"
    ],
    "answer": 1,
    "expl": "Il n’existe pas de plan spécifique."
   },
   {
    "q": "À quelle valeur évalue-t-on un bien reçu gratuitement ?",
    "opts": [
     "À zéro",
     "À sa valeur d’origine chez le donateur",
     "À sa valeur actuelle (art. 36)",
     "Au prix de vente"
    ],
    "answer": 2,
    "expl": "Contrepartie : compte 14 Subventions."
   },
   {
    "q": "Une caisse affiche un solde créditeur. Que signifie-t-il ?",
    "opts": [
     "C’est normal",
     "Un bénéfice",
     "Un profit de change",
     "Une erreur : recette non enregistrée, dépense fictive ou vol"
    ],
    "answer": 3,
    "expl": "Une caisse ne peut jamais être créditrice."
   },
   {
    "q": "Un associé paie une dépense personnelle avec les fonds de la société. Où l’imputer ?",
    "opts": [
     "462 Associés, comptes courants",
     "Une charge de la société",
     "Le capital",
     "Le résultat"
    ],
    "answer": 0,
    "expl": "Elle devient une créance sur l’associé."
   },
   {
    "q": "Un client a disparu : que fait-on ?",
    "opts": [
     "On supprime la facture",
     "416 puis dépréciation, puis perte (654) quand elle est certaine",
     "On compense avec le capital",
     "On ne fait rien"
    ],
    "answer": 1,
    "expl": "TVA et déductibilité : selon chaque État."
   },
   {
    "q": "Un incendie détruit les archives comptables. Que faut-il faire ?",
    "opts": [
     "Ne rien faire",
     "Arrêter les comptes",
     "Reconstituer à partir de sources externes et informer CAC, banque et administration",
     "Dissoudre la société"
    ],
    "answer": 2,
    "expl": "La perte de biens va en charges HAO (83)."
   },
   {
    "q": "Une entité en liquidation évalue ses actifs :",
    "opts": [
     "À leur coût historique",
     "À leur valeur de remplacement",
     "À zéro",
     "À leur valeur liquidative"
    ],
    "answer": 3,
    "expl": "La continuité d’exploitation n’est plus applicable."
   },
   {
    "q": "Un client paie en nature (troc). Comment comptabiliser ?",
    "opts": [
     "Deux opérations séparées, vente et achat, puis compensation",
     "Aucune écriture",
     "Un produit unique net",
     "Un don"
    ],
    "answer": 0,
    "expl": "Avec pièce justificative de l’échange."
   },
   {
    "q": "Une facture fournisseur est saisie deux fois. Que faire ?",
    "opts": [
     "La laisser telle quelle",
     "Passer une extourne du doublon et vérifier l’absence de double paiement",
     "Supprimer la ligne",
     "Payer deux fois"
    ],
    "answer": 1,
    "expl": "Contrôle des doublons recommandé."
   },
   {
    "q": "Un contrat signé n’est pas encore exécuté. Comment le traiter ?",
    "opts": [
     "Charge immédiate",
     "Produit immédiat",
     "Engagement hors bilan à mentionner en annexe (éventuellement classe 9)",
     "Capital"
    ],
    "answer": 2,
    "expl": "L’écriture n’est passée qu’à la livraison ou au paiement."
   },
   {
    "q": "Un fournisseur est débiteur et un client créditeur à la clôture. Peut-on compenser ?",
    "opts": [
     "Oui toujours",
     "Oui si même montant",
     "Oui, après accord du banquier",
     "Non, principe de non-compensation"
    ],
    "answer": 3,
    "expl": "Débiteur à l’actif, créditeur au passif."
   },
   {
    "q": "À quelles conditions constitue-t-on une provision pour litige ?",
    "opts": [
     "Obligation envers un tiers, sortie probable, montant fiable",
     "Dès l’ouverture du litige quoi qu’il arrive",
     "Jamais",
     "Seulement si perdu"
    ],
    "answer": 0,
    "expl": "Sinon, mention en notes annexes."
   },
   {
    "q": "Une comptabilité est tenue avec plusieurs années de retard. Quelle est la bonne démarche ?",
    "opts": [
     "La régulariser d’un seul coup en fin d’année",
     "Reconstituer exercice par exercice en commençant par le plus ancien",
     "Ne rien faire",
     "Supprimer les années anciennes"
    ],
    "answer": 1,
    "expl": "Une comptabilité tenue avec retard n’est pas régulière."
   },
   {
    "q": "Peut-on tenir une comptabilité régulière uniquement sur Excel ?",
    "opts": [
     "Oui, sans limites",
     "Non, jamais",
     "Difficilement : un logiciel adapté offre intangibilité et pistes d’audit",
     "Oui, si le tableur est protégé par mot de passe"
    ],
    "answer": 2,
    "expl": "Pour les petites entités, le SMT simplifie la tenue."
   }
  ]
 },
 {
  "id": "doc-livres",
  "theme": "documents",
  "themeLabel": "Documents & Pièces",
  "icon": "📚",
  "title": "Livres, pièces et états financiers",
  "desc": "Journal, grand livre, balance, inventaire, TFT, notes annexes, commissaire aux comptes.",
  "level": "intermediaire",
  "questions": [
   {
    "q": "Qu’est-ce qu’une pièce justificative ?",
    "opts": [
     "Un devis non signé",
     "Un brouillon",
     "Un budget",
     "Le document qui prouve une opération (facture, reçu, contrat…)"
    ],
    "answer": 3,
    "expl": "Aucune écriture sans pièce justificative."
   },
   {
    "q": "Que contient le journal ?",
    "opts": [
     "Les opérations jour après jour",
     "Les soldes de fin d’année",
     "Les impôts à payer",
     "Les statuts"
    ],
    "answer": 0,
    "expl": "Le grand livre les regroupe par compte."
   },
   {
    "q": "À quoi sert la balance ?",
    "opts": [
     "À calculer l’impôt",
     "À lister les soldes de tous les comptes et vérifier débits = crédits",
     "À fixer les salaires",
     "À présenter le capital"
    ],
    "answer": 1,
    "expl": "Une balance équilibrée ne prouve pas l’absence d’erreur."
   },
   {
    "q": "Que fait-on si la balance n’est pas équilibrée ?",
    "opts": [
     "On supprime les écritures",
     "On change les soldes",
     "Chercher un montant égal à l’écart, sa moitié, ou un écart divisible par 9",
     "On attend la clôture"
    ],
    "answer": 2,
    "expl": "Puis vérifier les reports de totaux."
   },
   {
    "q": "Qu’est-ce que l’inventaire ?",
    "opts": [
     "Un budget",
     "Un bilan prévisionnel",
     "Un contrat",
     "Le relevé annuel de tous les actifs et passifs (comptage, rapprochement bancaire…)"
    ],
    "answer": 3,
    "expl": "Il vérifie que la comptabilité reflète la réalité."
   },
   {
    "q": "Comment calcule-t-on le résultat d’exploitation ?",
    "opts": [
     "Produits d’exploitation − charges d’exploitation",
     "Produits financiers − charges financières",
     "Actif − passif",
     "Ventes − achats seulement"
    ],
    "answer": 0,
    "expl": "Il est calculé avant éléments financiers et exceptionnels."
   },
   {
    "q": "Que mesure le fonds de roulement ?",
    "opts": [
     "Le total de la trésorerie",
     "L’excédent des ressources durables sur les emplois durables",
     "Le résultat net",
     "Le capital social"
    ],
    "answer": 1,
    "expl": "Trésorerie nette = FR − BFR."
   },
   {
    "q": "À quoi sert le TFT ?",
    "opts": [
     "À calculer l’impôt",
     "À lister les clients",
     "À expliquer la variation de trésorerie (activité, investissement, financement)",
     "À contrôler les stocks"
    ],
    "answer": 2,
    "expl": "Bien établi, il s’équilibre toujours."
   },
   {
    "q": "À partir de quels documents construit-on le TFT ?",
    "opts": [
     "Le journal de caisse uniquement",
     "Le plan de comptes",
     "La balance N-2",
     "Bilans N et N-1 et balances N et N-1 (mouvements N)"
    ],
    "answer": 3,
    "expl": "Avis technique OHADA, réponse n° 3."
   },
   {
    "q": "Que contiennent les notes annexes ?",
    "opts": [
     "Méthodes, détails des postes, engagements hors bilan, événements postérieurs",
     "Les offres de la banque",
     "Le budget",
     "Les contrats de travail"
    ],
    "answer": 0,
    "expl": "Elles font partie intégrante des états financiers."
   },
   {
    "q": "Quelle est la différence entre commissaire aux comptes et comptable agréé ?",
    "opts": [
     "Ils font la même chose",
     "Le CAC émet une opinion, le comptable agréé établit une attestation",
     "Le CAC tient la comptabilité",
     "Le comptable agréé certifie les comptes"
    ],
    "answer": 1,
    "expl": "Avis technique OHADA, réponse n° 4."
   },
   {
    "q": "Peut-on soumettre les comptes consolidés à l’AG pour distribuer des dividendes dans l’espace OHADA ?",
    "opts": [
     "Oui, toujours",
     "Oui, pour les cotées",
     "Non, les dividendes se distribuent sur les comptes individuels",
     "Oui, si les IFRS sont appliquées"
    ],
    "answer": 2,
    "expl": "Les consolidés ne sont pas soumis à l’approbation de l’AG."
   }
  ]
 },
 {
  "id": "fisc-compta",
  "theme": "fiscalite",
  "themeLabel": "Fiscalité & OHADA",
  "icon": "🧾",
  "title": "Fiscalité et comptabilité OHADA",
  "desc": "TVA dans les comptes, liasse, résultat fiscal : le lien entre comptabilité et fiscalité.",
  "level": "intermediaire",
  "questions": [
   {
    "q": "Quels comptes enregistrent la TVA collectée et la TVA récupérable ?",
    "opts": [
     "4411 et 4421",
     "4451 et 4431 uniquement",
     "4481 et 4491",
     "4431 et 4452"
    ],
    "answer": 3,
    "expl": "4451 pour la TVA sur immobilisations. Les taux dépendent de chaque État."
   },
   {
    "q": "À la déclaration de TVA, si la TVA collectée dépasse la TVA récupérable :",
    "opts": [
     "La différence est enregistrée au 4441 (TVA due)",
     "On la porte au capital",
     "On la porte en charge",
     "On l’ignore"
    ],
    "answer": 0,
    "expl": "Si la récupérable est supérieure : crédit de TVA au 4449."
   },
   {
    "q": "Quel compte enregistre un crédit de TVA à reporter ?",
    "opts": [
     "4441",
     "4449",
     "4431",
     "4452"
    ],
    "answer": 1,
    "expl": "4441 : TVA due."
   },
   {
    "q": "La liasse SYSCOHADA prévoit-elle des tableaux fiscaux ?",
    "opts": [
     "Oui, tableaux 22 à 24",
     "Oui, pour les SARL uniquement",
     "Non, chaque État garde son autonomie fiscale",
     "Oui, pour l’IS"
    ],
    "answer": 2,
    "expl": "La liasse de 50 pages est exigée dans l’UEMOA."
   },
   {
    "q": "Où se détermine le passage du résultat comptable au résultat fiscal ?",
    "opts": [
     "Dans le plan comptable",
     "Dans le journal",
     "Dans le grand livre",
     "Dans les tableaux de la législation fiscale de chaque État"
    ],
    "answer": 3,
    "expl": "Réintégrations, déductions, déficits antérieurs."
   },
   {
    "q": "Le bilan d’ouverture nécessite-t-il une déclaration rectificative ?",
    "opts": [
     "Non, il ne modifie pas le résultat",
     "Oui, toujours",
     "Oui, pour la TVA",
     "Oui, dans les trois mois"
    ],
    "answer": 0,
    "expl": "Avis technique OHADA, réponse n° 24."
   },
   {
    "q": "Un troc est-il neutre fiscalement ?",
    "opts": [
     "Oui, toujours",
     "Non, ses aspects fiscaux relèvent de chaque État",
     "Oui, jusqu’à un million",
     "Oui, entre amis"
    ],
    "answer": 1,
    "expl": "Il faut respecter les règles de TVA locales."
   },
   {
    "q": "La TVA sur créance irrécouvrable est-elle récupérable ?",
    "opts": [
     "Oui, toujours",
     "Non, jamais",
     "Cela dépend de la réglementation fiscale de chaque État",
     "Oui après un an"
    ],
    "answer": 2,
    "expl": "Il faut consulter la législation nationale."
   }
  ]
 }
];

/* ══════════════════════════════════════════════
   LOGIQUE DU QUIZ
══════════════════════════════════════════════ */
var LEVELS = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé' };
var LETTERS = ['A', 'B', 'C', 'D'];
var STORE_KEY = 'ic-quiz-best';

var state = { theme: 'all', level: 'all' };
var currentQuiz = null;
var currentQ = 0;
var answers = [];

function $(id) { return document.getElementById(id); }

function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

/* ── Meilleurs scores (localStorage, facultatif) ── */
function loadBest() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
}
function saveBest(id, pct) {
  try {
    var b = loadBest();
    if (b[id] === undefined || pct > b[id]) { b[id] = pct; localStorage.setItem(STORE_KEY, JSON.stringify(b)); }
  } catch (e) {}
}

/* ── Statistiques d'en-tête et compteurs de filtres ── */
function renderStats() {
  var total = QUIZZES.reduce(function (n, q) { return n + q.questions.length; }, 0);
  if ($('statQuizzes')) $('statQuizzes').textContent = QUIZZES.length;
  if ($('statQuestions')) $('statQuestions').textContent = total;

  document.querySelectorAll('#filterBar .filter-btn').forEach(function (b) {
    var t = b.dataset.theme;
    var n = t === 'all' ? QUIZZES.length : QUIZZES.filter(function (q) { return q.theme === t; }).length;
    var span = b.querySelector('.filter-count');
    if (!span) { span = document.createElement('span'); span.className = 'filter-count'; b.appendChild(span); }
    span.textContent = n;
  });
}

/* ── Cartes ── */
function renderCards() {
  var grid = $('quizGrid');
  var best = loadBest();
  var list = QUIZZES.filter(function (q) {
    return (state.theme === 'all' || q.theme === state.theme) &&
           (state.level === 'all' || q.level === state.level);
  });

  if (!list.length) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-icon">🗂️</div><p>Aucun quiz ne correspond à ce filtre pour l’instant.</p></div>';
    return;
  }

  grid.innerHTML = list.map(function (quiz) {
    var b = best[quiz.id];
    var bestHtml = b !== undefined ? '<span class="best-badge">🏆 ' + b + '%</span>' : '';
    return '' +
      '<article class="quiz-card" data-theme="' + quiz.theme + '" data-id="' + quiz.id + '" tabindex="0" role="button" aria-label="Ouvrir le quiz ' + esc(quiz.title) + '">' +
        '<div class="quiz-card-top">' +
          '<div class="quiz-card-icon" aria-hidden="true">' + quiz.icon + '</div>' +
          '<div class="quiz-card-theme">' + esc(quiz.themeLabel) + '</div>' +
          '<h3 class="quiz-card-title">' + esc(quiz.title) + '</h3>' +
        '</div>' +
        '<div class="quiz-card-body">' +
          '<p class="quiz-card-desc">' + esc(quiz.desc) + '</p>' +
          '<div class="quiz-card-meta">' +
            '<span class="meta-q">❓ ' + quiz.questions.length + ' questions</span>' +
            '<span class="level-badge level-' + quiz.level + '">' + LEVELS[quiz.level] + '</span>' +
            bestHtml +
          '</div>' +
          '<button class="btn-start" type="button">Commencer →</button>' +
        '</div>' +
      '</article>';
  }).join('');
}

/* ── Ouverture / fermeture ── */
function openQuiz(id) {
  currentQuiz = QUIZZES.filter(function (q) { return q.id === id; })[0];
  if (!currentQuiz) return;
  currentQ = 0;
  answers = new Array(currentQuiz.questions.length).fill(null);

  $('modalTheme').textContent = currentQuiz.themeLabel;
  $('modalTitle').textContent = currentQuiz.icon + '  ' + currentQuiz.title;
  $('quizPanel').setAttribute('data-theme', currentQuiz.theme);
  $('viewQuestion').style.display = 'block';
  $('viewResults').style.display = 'none';
  $('quizModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderQuestion();
}

function closeQuiz() {
  $('quizModal').classList.remove('open');
  document.body.style.overflow = '';
  currentQuiz = null;
  renderCards();
}

/* ── Question ── */
function renderQuestion() {
  var q = currentQuiz.questions[currentQ];
  var total = currentQuiz.questions.length;

  $('qCounter').textContent = 'Question ' + (currentQ + 1) + ' / ' + total;
  $('qText').textContent = q.q;
  $('progressFill').style.width = (currentQ / total * 100) + '%';

  var expl = $('qExplanation');
  expl.className = 'quiz-explanation';
  expl.innerHTML = '';

  var btn = $('btnNext');
  btn.disabled = true;
  btn.textContent = 'Suivant →';

  $('qOptions').innerHTML = q.opts.map(function (opt, i) {
    return '<button type="button" class="quiz-option" data-idx="' + i + '">' +
             '<span class="opt-letter">' + LETTERS[i] + '</span>' +
             '<span class="opt-text">' + esc(opt) + '</span>' +
           '</button>';
  }).join('');

  $('quizPanel').scrollTop = 0;
}

function selectOption(idx) {
  var q = currentQuiz.questions[currentQ];
  var opts = document.querySelectorAll('#qOptions .quiz-option');
  if (!opts.length || opts[0].classList.contains('disabled')) return;

  answers[currentQ] = idx;
  opts.forEach(function (o) { o.classList.add('disabled'); o.disabled = true; });
  opts[idx].classList.add(idx === q.answer ? 'correct' : 'wrong');
  if (idx !== q.answer) opts[q.answer].classList.add('correct');

  var expl = $('qExplanation');
  var ok = idx === q.answer;
  expl.className = 'quiz-explanation show ' + (ok ? 'is-ok' : 'is-ko');
  expl.innerHTML = '<div class="expl-head">' + (ok ? '✅ Bonne réponse !' : '❌ Pas tout à fait') + '</div>' + q.expl;

  var last = currentQ === currentQuiz.questions.length - 1;
  var btn = $('btnNext');
  btn.disabled = false;
  btn.textContent = last ? 'Voir les résultats →' : 'Suivant →';
  btn.focus();
}

function nextQuestion() {
  if (currentQ < currentQuiz.questions.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    showResults();
  }
}

/* ── Résultats ── */
function showResults() {
  var total = currentQuiz.questions.length;
  var score = answers.filter(function (a, i) { return a === currentQuiz.questions[i].answer; }).length;
  var pct = Math.round(score / total * 100);
  saveBest(currentQuiz.id, pct);

  $('progressFill').style.width = '100%';
  $('viewQuestion').style.display = 'none';
  $('viewResults').style.display = 'block';

  $('resScore').textContent = score;
  $('resTotal').textContent = '/ ' + total + '  ·  ' + pct + '%';

  var title, msg, cls;
  if (pct >= 80) { title = 'Excellent !'; msg = 'Vous maîtrisez très bien ce sujet. Continuez ainsi !'; cls = 'great'; }
  else if (pct >= 60) { title = 'Bien joué !'; msg = 'Bonne maîtrise globale. Quelques points à revoir.'; cls = 'good'; }
  else if (pct >= 40) { title = 'À retravailler'; msg = 'Des lacunes existent. Relisez les explications ci-dessous et recommencez.'; cls = 'mid'; }
  else { title = 'Insuffisant'; msg = 'Ce sujet nécessite une révision approfondie. Courage !'; cls = 'low'; }

  $('resCircle').className = 'result-score-circle ' + cls;
  $('resTitle').textContent = title;
  $('resMsg').textContent = msg;

  $('resCorrections').innerHTML = currentQuiz.questions.map(function (q, i) {
    var chosen = answers[i];
    var ok = chosen === q.answer;
    return '' +
      '<div class="correction-item ' + (ok ? 'ok' : 'nok') + '">' +
        '<div class="ci-q">' + (ok ? '✅' : '❌') + ' Q' + (i + 1) + '. ' + esc(q.q) + '</div>' +
        '<div class="ci-a">' +
          (!ok && chosen !== null ? 'Votre réponse : <span class="bad">' + LETTERS[chosen] + '. ' + esc(q.opts[chosen]) + '</span><br>' : '') +
          'Bonne réponse : <span class="good">' + LETTERS[q.answer] + '. ' + esc(q.opts[q.answer]) + '</span>' +
        '</div>' +
      '</div>';
  }).join('');

  $('quizPanel').scrollTop = 0;
}

function restartQuiz() { if (currentQuiz) openQuiz(currentQuiz.id); }

/* ══════════════════════════════════════════════
   ÉVÉNEMENTS (après chargement du DOM)
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  renderStats();
  renderCards();

  /* Filtres thème */
  $('filterBar').addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('#filterBar .filter-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    state.theme = btn.dataset.theme;
    renderCards();
  });

  /* Filtres niveau */
  $('levelBar').addEventListener('click', function (e) {
    var btn = e.target.closest('.level-btn');
    if (!btn) return;
    document.querySelectorAll('#levelBar .level-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    state.level = btn.dataset.level;
    renderCards();
  });

  /* Clic / clavier sur une carte */
  $('quizGrid').addEventListener('click', function (e) {
    var card = e.target.closest('.quiz-card');
    if (card) openQuiz(card.dataset.id);
  });
  $('quizGrid').addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.quiz-card');
    if (card) { e.preventDefault(); openQuiz(card.dataset.id); }
  });

  /* Modal */
  $('qOptions').addEventListener('click', function (e) {
    var opt = e.target.closest('.quiz-option');
    if (opt) selectOption(parseInt(opt.dataset.idx, 10));
  });
  $('btnNext').addEventListener('click', nextQuestion);
  $('btnClose').addEventListener('click', closeQuiz);
  $('btnCloseResults').addEventListener('click', closeQuiz);
  $('btnRestart').addEventListener('click', restartQuiz);
  $('quizModal').addEventListener('click', function (e) { if (e.target === this) closeQuiz(); });

  /* Raccourcis clavier : A-D ou 1-4 pour répondre, Entrée pour continuer, Échap pour fermer */
  document.addEventListener('keydown', function (e) {
    if (!currentQuiz || !$('quizModal').classList.contains('open')) return;
    if (e.key === 'Escape') { closeQuiz(); return; }
    if ($('viewQuestion').style.display === 'none') return;
    var k = e.key.toLowerCase();
    var map = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 };
    if (map[k] !== undefined && map[k] < currentQuiz.questions[currentQ].opts.length) { selectOption(map[k]); return; }
    if ((e.key === 'Enter' || e.key === 'ArrowRight') && !$('btnNext').disabled) { e.preventDefault(); nextQuestion(); }
  });

  /* Menu hamburger */
  var btn = $('hamburgerBtn'), nav = $('mainNav');
  if (btn && nav) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var o = nav.classList.toggle('open');
      btn.classList.toggle('open', o);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); btn.classList.remove('open'); });
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        nav.classList.remove('open'); btn.classList.remove('open');
      }
    });
  }

  /* Apparition progressive */
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(function (el) { obs.observe(el); });
  } else {
    document.querySelectorAll('.fade-in').forEach(function (el) { el.classList.add('visible'); });
  }
});
