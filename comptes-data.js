/**
 * comptes-data.js — InfoCompta
 * Source officielle : Plan Comptable Général OHADA — Classe 1
 *
 * Chaque entrée contient :
 *   libelle, classe, nature, sens,
 *   contenu        : description générale
 *   subdivisions   : { code: libellé }
 *   fonctionnement : { credit: [...], debit: [...] }
 *   exclusions     : { texte, comptes: [...] }
 *   commentaires   : texte détaillé
 *   controle       : [éléments de contrôle]
 *   comptes_lies   : [codes]
 *   textes_ref     : [références]
 */

const comptesData = {

  "1": {
    libelle: "Ressources Durables",
    classe: "Classe 1",
    nature: "Classe de comptes",
    sens: "Créditeur (en général)",
    contenu: "Les comptes de la classe 1 enregistrent les ressources de financement mises à la disposition de l'entreprise de façon durable et permanente par les associés et les tiers. Ces comptes regroupent : les capitaux propres (capital, réserves, report à nouveau, résultat net, subventions d'investissement, provisions réglementées), les emprunts et dettes assimilées, les dettes de crédit-bail, les dettes liées à des participations et comptes de liaison, ainsi que les provisions financières pour risques et charges.",
    fonctionnement: { credit: [], debit: [] },
    commentaires: "La classe 1 constitue le passif permanent du bilan. Elle est opposée à la classe 2 (Actif immobilisé) dans l'équilibre financier à long terme. Un bilan sain présente des ressources durables (classe 1) supérieures aux emplois stables (classe 2), dégageant ainsi un Fonds de Roulement positif.",
    comptes_lies: ["101","102","103","104","105","106","109","11","12","13","14","15","16","17","18","19"],
    textes_ref: ["Acte Uniforme OHADA portant organisation et harmonisation des comptabilités des entreprises"],
    exemples_ecritures: []
  },

  "101": {
    libelle: "Capital social",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Le Capital social traduit le montant des valeurs apportées par les associés. Dans les sociétés, le capital initial correspond à la valeur des apports (nature ou espèces) effectués par les associés à la création de l'entreprise tels qu'ils figurent dans les statuts. Il est divisé en actions ou parts d'une même valeur nominale. Au cours de la vie sociale, le capital peut, sur décision des organes compétents, être augmenté ou diminué pour diverses raisons, notamment : apports et/ou retraits de capital, affectation de résultats et incorporation de réserves. Pour certaines sociétés, la loi prévoit la limitation de la responsabilité des associés à l'égard des créanciers sociaux en fixant le montant minimum du capital social.",
    subdivisions: {
      "1011": "Capital souscrit, non appelé",
      "1012": "Capital souscrit, appelé, non versé",
      "1013": "Capital souscrit, appelé, versé, non amorti",
      "1014": "Capital souscrit, appelé, versé, amorti",
      "1018": "Capital souscrit, soumis à des conditions particulières"
    },
    fonctionnement: {
      credit: [
        "Apports initiaux des associés à la constitution de la société",
        "Augmentations de capital en espèces ou en nature (déduction faite des primes), par le débit du compte 46 – Associés et Groupe",
        "Incorporation de réserves au capital, par le débit du compte 11 – Réserves",
        "Incorporation du résultat net au capital, par le débit du compte 13 – Résultat net de l'exercice"
      ],
      debit: [
        "Réductions de capital : absorption de pertes reportées, par le crédit du compte 12 – Report à nouveau",
        "Absorption des pertes de l'exercice, par le crédit du compte 13 – Résultat net de l'exercice",
        "Remboursement d'une partie du capital aux associés, par le crédit du compte 46 – Associés et Groupe"
      ]
    },
    commentaires: "1) Le capital social représente la valeur nominale des actions ou parts sociales.\n\n2) Le compte 1011 enregistre à son crédit les promesses d'apport par le débit du compte 109 – Actionnaires, capital souscrit non appelé.\n\n3) Lors de chaque appel de fonds, le compte 1011 est débité par le crédit du compte 1012. Corrélativement, le compte 467 est débité par le crédit du compte 109.\n\n4) Le compte 1012 enregistre la fraction en instance de libération. En cas de libération effective, il est viré au compte 1013.\n\n5) Les organes compétents peuvent décider de rembourser aux associés tout ou partie du nominal de leurs actions (amortissement du capital) : les actions amorties deviennent des « actions de jouissance », isolées dans le compte 1014. Elles donnent les mêmes droits que les actions ordinaires, à l'exception du premier dividende (intérêt statutaire).\n\n6) Le compte 1018 enregistre le capital provenant d'opérations particulières telles que l'incorporation de plus-values nettes à long terme (PVNLT) ou l'émission de certificats d'investissement, d'actions préférentielles ou à dividendes prioritaires sans droit de vote.",
    exclusions: {
      texte: "Ne doit pas enregistrer : les versements/retraits temporaires des associés, les apports de l'exploitant individuel, les apports non remboursables de la puissance publique.",
      comptes: ["46 – Associés et Groupe", "103 – Capital personnel", "102 – Capital par dotation"]
    },
    controle: [
      "Statuts de la société",
      "Virements bancaires et relevés de banque",
      "Procès-verbal de l'Assemblée des associés"
    ],
    comptes_lies: ["1011","1012","1013","1014","1018","105","109","46","11","12","13"],
    textes_ref: ["AUSC art. 67 à 72", "AUSC art. 387 (SA)", "AUSC art. 311 (SARL)"],
    exemples_ecritures: [
        {
          libelle: "Constitution de la société — apport en numéraire",
          debit: "4612 – Associés, apports en numéraire",
          credit: "101 – Capital social"
        },
        {
          libelle: "Augmentation de capital par incorporation de réserves",
          debit: "11 – Réserves",
          credit: "101 – Capital social"
        },
        {
          libelle: "Réduction de capital pour absorption de pertes",
          debit: "101 – Capital social",
          credit: "13 – Résultat net : Perte"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 58",
          titre: "Libération intégrale des apports à la constitution",
          enonce: "Constitution d'une SA. Capital entièrement libéré dès la souscription. Nominal 10 000 F, prime 2 000 F par action.",
          ecritures: [
            {
              libelle: "Souscription + versement intégral (numéraire)",
              debit: "4612 – Associés, apports en numéraire",
              credit: "1013 – Capital versé non amorti + 1051 – Prime d'émission"
            },
            {
              libelle: "Règlement en trésorerie",
              debit: "52 – Banques",
              credit: "4612 – Associés, apports en numéraire"
            },
          ],
        },
        {
          ref: "App. 59",
          titre: "Libération fractionnée du capital",
          enonce: "Capital souscrit libéré à 50 % à la constitution. Appel du solde ultérieurement.",
          ecritures: [
            {
              libelle: "Promesse d'apport — fraction non appelée",
              debit: "109 – Capital souscrit non appelé",
              credit: "1011 – Capital souscrit non appelé"
            },
            {
              libelle: "Appel de fonds — personnalisation créance actionnaire",
              debit: "467 – Actionnaires, restant dû sur capital appelé",
              credit: "109 – Capital souscrit non appelé"
            },
            {
              libelle: "Virement 1011 → 1012 (appelé non versé)",
              debit: "1011",
              credit: "1012 – Capital appelé non versé"
            },
            {
              libelle: "Libération effective — versement par les actionnaires",
              debit: "52 – Banques",
              credit: "1013 – Capital versé non amorti"
            },
          ],
        },
        {
          ref: "App. 60",
          titre: "Augmentation de capital en numéraire",
          enonce: "Émission de nouvelles actions avec prime d'émission. Frais imputés sur la prime.",
          ecritures: [
            {
              libelle: "Souscription — prix d'émission total",
              debit: "4612 – Associés, apports en numéraire",
              credit: "1013 – Capital (nominal) + 1051 – Prime d'émission"
            },
            {
              libelle: "Versement",
              debit: "52 – Banques",
              credit: "4612 – Associés, apports en numéraire"
            },
            {
              libelle: "Frais d'augmentation imputés sur la prime",
              debit: "105 – Primes liées aux capitaux propres",
              credit: "78 – Transferts de charges d'exploitation"
            },
          ],
        },
        {
          ref: "App. 61",
          titre: "Augmentation par incorporation de réserves",
          enonce: "L'AGE incorpore réserves facultatives et prime d'émission dans le capital social.",
          ecritures: [
            {
              libelle: "Incorporation de réserves et prime au capital",
              debit: "118 – Réserves facultatives + 105 – Primes",
              credit: "101 – Capital social"
            },
          ],
          commentaire: "Aucun flux de trésorerie. Le capital nominal augmente d'autant que les réserves/primes incorporées diminuent.",
        },
        {
          ref: "App. 62",
          titre: "Réduction de capital par imputation des pertes",
          enonce: "L'AGE réduit le capital pour absorber les pertes en report à nouveau débiteur.",
          ecritures: [
            {
              libelle: "Absorption des pertes par réduction de capital",
              debit: "101 – Capital social",
              credit: "129 – Report à nouveau débiteur"
            },
          ],
        },
        {
          ref: "App. 63",
          titre: "Réduction de capital par remboursement aux actionnaires",
          enonce: "L'AGE réduit le capital et rembourse le nominal aux actionnaires.",
          ecritures: [
            {
              libelle: "Constatation du remboursement dû",
              debit: "101 – Capital social",
              credit: "4619 – Associés, capital à rembourser"
            },
            {
              libelle: "Versement aux actionnaires",
              debit: "4619 – Associés, capital à rembourser",
              credit: "52 – Banques"
            },
          ],
        },
        {
          ref: "App. 64",
          titre: "Amortissement du capital — actions de jouissance",
          enonce: "La société rembourse par anticipation le nominal par prélèvement sur réserves. Les actions deviennent des actions de jouissance (compte 1014).",
          ecritures: [
            {
              libelle: "Prélèvement sur réserves pour amortissement",
              debit: "118 – Réserves facultatives",
              credit: "465 – Associés, dividendes à payer"
            },
            {
              libelle: "Transfert 1013 → 1014 (actions de jouissance)",
              debit: "1013 – Capital versé non amorti",
              credit: "1014 – Capital versé amorti"
            },
            {
              libelle: "Versement aux actionnaires",
              debit: "465 – Associés, dividendes à payer",
              credit: "52 – Banques"
            },
          ],
          commentaire: "Le capital nominal au bilan reste inchangé. Seule la subdivision 1013→1014 change.",
        },
    ],
  },

  "1011": {
    libelle: "Capital souscrit, non appelé",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Enregistre la fraction du capital social souscrite par les actionnaires mais dont la libération n'a pas encore été demandée par les organes compétents.",
    fonctionnement: {
      credit: [
        "Promesses d'apport faites par les associés (création ou augmentation de capital), par le débit du compte 109 – Actionnaires, capital souscrit non appelé"
      ],
      debit: [
        "À chaque appel de fonds : virement vers le compte 1012 à concurrence du montant appelé. Corrélativement, le compte 467 est débité par le crédit du compte 109"
      ]
    },
    commentaires: "Le solde du compte 1011 est toujours égal, en valeur absolue, au solde du compte 109 (de sens opposé). Il est nul lorsque la totalité du capital a été appelée.",
    comptes_lies: ["101","1012","109","467"],
    textes_ref: ["AUSC art. 387"],
    exemples_ecritures: [
        {
          libelle: "Souscription du capital non encore appelé",
          debit: "109 – Actionnaires, capital souscrit non appelé",
          credit: "1011 – Capital souscrit, non appelé"
        },
        {
          libelle: "Appel de fonds (1er appel 50 %)",
          debit: "1011 – Capital souscrit, non appelé",
          credit: "1012 – Capital souscrit, appelé, non versé"
        },
      ]
  },

  "1012": {
    libelle: "Capital souscrit, appelé, non versé",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Représente la fraction de capital appelée (exigée) par la société mais non encore versée par les actionnaires. La créance personnalisée sur chaque actionnaire est portée au débit du compte 467.",
    fonctionnement: {
      credit: [
        "Virement depuis le compte 1011 lors de chaque appel de fonds (montant appelé non encore versé)"
      ],
      debit: [
        "Libération effective des apports par les actionnaires : virement vers le compte 1013 – Capital souscrit, appelé, versé, non amorti"
      ]
    },
    commentaires: "La contrepartie lors de l'appel est le compte 467 – Actionnaires, restant dû sur capital appelé (débité), lui-même soldé par le crédit du compte 109 lors de la personnalisation de la créance. Ce solde représente une créance à surveiller sur les actionnaires défaillants.",
    comptes_lies: ["1011","1013","109","467"],
    textes_ref: ["AUSC art. 387 à 395"],
    exemples_ecritures: [
        {
          libelle: "Libération effective par les actionnaires",
          debit: "1012 – Capital souscrit, appelé, non versé",
          credit: "1013 – Capital souscrit, appelé, versé, non amorti"
        },
        {
          libelle: "Appel de fonds — personnalisation de la créance",
          debit: "467 – Actionnaires, restant dû sur capital appelé",
          credit: "109 – Actionnaires, capital souscrit non appelé"
        },
      ]
  },

  "1013": {
    libelle: "Capital souscrit, appelé, versé, non amorti",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Représente la fraction du capital effectivement libérée par les actionnaires et non encore remboursée. C'est le sous-compte le plus courant dans une société en activité normale.",
    fonctionnement: {
      credit: [
        "Libération effective des apports par les actionnaires : virement depuis le compte 1012"
      ],
      debit: [
        "Amortissement du capital (remboursement anticipé aux actionnaires) : virement vers le compte 1014",
        "Réduction de capital décidée par l'AGE"
      ]
    },
    commentaires: "L'amortissement du capital est une opération exceptionnelle : la société rembourse par anticipation une partie du capital aux actionnaires par prélèvement sur les bénéfices ou réserves, sans réduire le capital nominal inscrit au bilan. Les actions deviennent des « actions de jouissance » (voir compte 1014).",
    comptes_lies: ["1012","1014","109"],
    textes_ref: ["AUSC art. 387"],
    exemples_ecritures: [
        {
          libelle: "Versement des apports par les actionnaires",
          debit: "52 – Banques",
          credit: "1013 – Capital souscrit, appelé, versé, non amorti"
        },
        {
          libelle: "Amortissement du capital (remboursement anticipé)",
          debit: "1013 – Capital souscrit, appelé, versé, non amorti",
          credit: "1014 – Capital souscrit, appelé, versé, amorti"
        },
      ]
  },

  "1014": {
    libelle: "Capital souscrit, appelé, versé, amorti",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Isole la contre-valeur des actions de jouissance, c'est-à-dire les actions dont le capital nominal a été remboursé aux actionnaires par prélèvement sur les bénéfices ou réserves, le capital social restant inchangé.",
    fonctionnement: {
      credit: [
        "Virement depuis le compte 1013 lors de l'amortissement du capital"
      ],
      debit: [
        "Annulation de l'amortissement en cas de reconstitution du capital"
      ]
    },
    commentaires: "Les actions amorties (actions de jouissance) donnent les mêmes droits que les actions ordinaires, à l'exception du premier dividende (intérêt statutaire). Leurs porteurs ont déjà récupéré leur mise initiale. Cette opération est encadrée par les statuts et les dispositions légales.",
    comptes_lies: ["1013"],
    textes_ref: ["AUSC art. 656 à 659"],
    exemples_ecritures: [
        {
          libelle: "Isolation des actions amorties (actions de jouissance)",
          debit: "1013 – Capital souscrit, appelé, versé, non amorti",
          credit: "1014 – Capital souscrit, appelé, versé, amorti"
        },
      ]
  },

  "1018": {
    libelle: "Capital souscrit, soumis à des conditions particulières",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Enregistre le capital provenant d'opérations particulières prévues par la législation, telles que l'incorporation de plus-values nettes à long terme ou l'émission de titres spéciaux.",
    fonctionnement: {
      credit: [
        "Incorporation de plus-values nettes à long terme (PVNLT) lorsque les dispositions législatives et réglementaires le prévoient",
        "Émission de certificats d'investissement, d'actions préférentielles et d'actions à dividendes prioritaires sans droit de vote"
      ],
      debit: [
        "Opérations inverses sur décision des organes compétents"
      ]
    },
    commentaires: "Ce compte est ouvert uniquement lorsque des textes légaux ou réglementaires spécifiques le prévoient. Son utilisation reste donc exceptionnelle et doit être documentée par les décisions des organes compétents et les textes applicables.",
    comptes_lies: ["101","1013"],
    textes_ref: ["Législation fiscale nationale applicable"]
  },

  "102": {
    libelle: "Capital par dotation",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Le Capital par dotation représente la contrepartie de l'intégration au patrimoine des entreprises publiques, des immobilisations et fonds affectés, sur décision de l'Autorité publique, au fonctionnement de ces entreprises. Cette dotation peut aussi se réaliser par transformation de dettes.",
    subdivisions: {
      "1021": "Dotation initiale",
      "1022": "Dotations complémentaires",
      "1028": "Autres dotations"
    },
    fonctionnement: {
      credit: [
        "Dotations en numéraire et en nature accordées par une collectivité publique, par le débit du compte 4493 – État, fonds de dotation à recevoir",
        "Par le débit du compte 45 – Organismes internationaux ou du compte 47 – Débiteurs et créditeurs divers",
        "Par le débit des comptes d'actifs concernés (immobilisations, stocks, créances)"
      ],
      debit: [
        "En cas de reprise contractuelle de dettes, par le crédit des comptes de passif concernés"
      ]
    },
    commentaires: "1) Ce compte est exclusivement réservé aux entreprises publiques. Il enregistre les fonds de dotation des collectivités publiques affectés de manière irrévocable.\n\n2) Certaines subventions d'investissement accordées par les collectivités auxquelles les entreprises sont rattachées peuvent être considérées comme des fonds de dotation, notamment lorsque l'organisme subventionneur et l'entreprise subventionnée émanent de la même personne morale publique. Dans ce cas, il faut se référer à la décision d'octroi pour leur qualification.",
    exclusions: {
      texte: "Ne doit pas enregistrer : les prêts ou avances remboursables aux entreprises publiques, les subventions d'investissement non transformées en capital par dotation.",
      comptes: ["163 – Avances reçues de l'État", "167 – Avances assorties de conditions particulières", "14 – Subventions d'investissement"]
    },
    controle: [
      "Décret, arrêté ou lettre officielle d'octroi ou de déblocage des fonds",
      "Procès-verbal de remise d'un bien cédé en guise d'apport en nature",
      "Pièces justificatives de virements correspondants"
    ],
    comptes_lies: ["1021","1022","1028","4493","45","47","163","167","14"],
    textes_ref: ["Dispositions OHADA relatives aux entreprises publiques"],
    exemples_ecritures: [
        {
          libelle: "Dotation initiale en numéraire par l'État",
          debit: "52 – Banques",
          credit: "102 – Capital par dotation"
        },
        {
          libelle: "Dotation en nature (immobilisation reçue)",
          debit: "23 – Bâtiments / 24 – Matériel",
          credit: "102 – Capital par dotation"
        },
      ]
  },

  "103": {
    libelle: "Capital personnel",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif, peut être négatif)",
    sens: "Créditeur (peut être débiteur sans changer de position au bilan)",
    contenu: "A la création de l'entreprise exploitée sous la forme individuelle, le capital initial représente le montant des apports en nature ou en espèces effectués par l'entrepreneur à titre définitif et des dettes qu'il décide d'inscrire au bilan. Ce capital initial est modifié ultérieurement par les apports et les retraits de capital ainsi que par l'affectation des résultats.",
    fonctionnement: {
      credit: [
        "Apports définitifs de l'exploitant en début ou en cours d'activité, par le débit des comptes d'actifs concernés (immobilisations, stocks, trésorerie)",
        "À la clôture de l'exercice : apport net issu du solde créditeur du compte 104 – Compte de l'exploitant, par le débit du compte 104",
        "À l'ouverture de l'exercice suivant : affectation du bénéfice précédent, par le débit du compte 131 – Résultat net : Bénéfice"
      ],
      debit: [
        "À l'ouverture de l'exercice suivant : affectation de la perte précédente, par le crédit du compte 139 – Résultat net : Perte",
        "À la clôture de l'exercice : solde débiteur du compte 104 (retraits nets), par le crédit du compte 104 – Compte de l'exploitant"
      ]
    },
    commentaires: "Ce compte ne doit pas être confondu avec le compte de l'exploitant (104). Lorsque son solde est débiteur, il reste au passif du bilan mais précédé du signe moins. Il est l'équivalent du capital social pour les entreprises individuelles.",
    exclusions: {
      texte: "Ne doit pas enregistrer les prélèvements et versements dans les entreprises non individuelles, ni les apports temporaires de l'exploitant.",
      comptes: ["462 – Associés, comptes courants", "104 – Compte de l'exploitant"]
    },
    controle: [
      "Compte de résultat de l'exercice précédent",
      "Virements bancaires, fiches de caisse, relevés de banque"
    ],
    comptes_lies: ["104","131","139"],
    textes_ref: ["SC OHADA — Entreprises individuelles"],
    exemples_ecritures: [
        {
          libelle: "Apport initial de l'exploitant individuel",
          debit: "57 – Caisse / 52 – Banques / 22 – Terrains",
          credit: "103 – Capital personnel"
        },
        {
          libelle: "Affectation du bénéfice de l'exercice précédent",
          debit: "131 – Résultat net : Bénéfice",
          credit: "103 – Capital personnel"
        },
        {
          libelle: "Imputation de la perte de l'exercice précédent",
          debit: "103 – Capital personnel",
          credit: "139 – Résultat net : Perte"
        },
      ]
  },

  "104": {
    libelle: "Compte de l'exploitant",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (soldé à chaque clôture)",
    sens: "Débiteur ou Créditeur en cours d'exercice",
    contenu: "Ce compte sert à établir la situation de l'entrepreneur en ce qui concerne :\n\nles apports et compléments d'apports financiers et/ou de biens et services effectués à titre temporaire en cours d'exercice. Ces apports et compléments d'apports financiers peuvent consister en des versements dans la caisse ou sur un compte bancaire de l'entreprise ou en des règlements de dépenses de l'entreprise sur la trésorerie privée de l'exploitant ;\nles retraits effectués au cours de l'exercice pour son usage personnel ou celui de sa famille et dans le cadre de l'exploitation. Ceux-ci consistent en des :\nprélèvements en nature de biens et services, objets de l'activité, qui concourent à la détermination du résultat ;\nprélèvements financiers opérés sur un compte de trésorerie affecté à l'activité, qu'il s'agisse de prélèvements directs (retraits de fonds) ou indirects (paiement d'une dépense privée).",
    subdivisions: {
      "1041": "Apports temporaires",
      "1042": "Opérations courantes",
      "1043": "Rémunérations, impôts et autres charges personnelles",
      "1047": "Prélèvements d'autoconsommation",
      "1048": "Autres prélèvements"
    },
    fonctionnement: {
      credit: [
        "En cours d'exercice : apports et compléments d'apports temporaires par l'exploitant, par le débit d'un compte de trésorerie ou des comptes d'actifs correspondants",
        "À la clôture : virement du solde débiteur vers le compte 103, par le débit du compte 103 – Capital personnel"
      ],
      debit: [
        "En cours d'exercice : retraits de fonds ou prélèvements de biens et services par l'exploitant pour usage personnel ou familial, par le crédit des comptes d'actifs correspondants",
        "À la clôture : virement du solde créditeur vers le compte 103, par le crédit du compte 103 – Capital personnel"
      ]
    },
    commentaires: "Le compte 104 est un démembrement du compte 103 – Capital personnel. Il est systématiquement soldé à la clôture de chaque exercice : son solde (débiteur ou créditeur) est intégralement viré au compte 103. Il ne doit jamais figurer au bilan en tant que tel.",
    exclusions: {
      texte: "Ne doit pas enregistrer les prélèvements et versements dans les entreprises non individuelles.",
      comptes: ["462 – Associés, comptes courants dans des entreprises non individuelles"]
    },
    controle: [
      "Virements bancaires, fiches de caisse, relevés de banque"
    ],
    comptes_lies: ["103","131","139"],
    textes_ref: ["SC OHADA — Entreprises individuelles"],
    exemples_ecritures: [
        {
          libelle: "Apport temporaire de l'exploitant en cours d'exercice",
          debit: "57 – Caisse",
          credit: "104 – Compte de l'exploitant"
        },
        {
          libelle: "Prélèvement en espèces par l'exploitant",
          debit: "104 – Compte de l'exploitant",
          credit: "57 – Caisse"
        },
        {
          libelle: "Clôture : virement du solde débiteur vers capital personnel",
          debit: "103 – Capital personnel",
          credit: "104 – Compte de l'exploitant"
        },
      ]
  },

  "105": {
    libelle: "Primes liées aux capitaux propres",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "La prime peut être analysée comme étant un droit d'entrée demandé au nouvel actionnaire d'autant que l'action vaut, avant augmentation du capital, beaucoup plus que sa valeur nominale. Elle représente une partie des apports purs et simples non comprise dans le capital social.\n\nLes primes liées aux capitaux propres doivent figurer distinctement au passif du bilan dans les rubriques appropriées. Selon la nature des opérations d'augmentation de capital, en nature ou en espèces, il y a lieu de distinguer quatre (4) catégories de primes, d'émission, de fusion, d'apport et de conversion.",
    subdivisions: {
      "1051": "Primes d'émission",
      "1052": "Primes d'apport",
      "1053": "Primes de fusion",
      "1054": "Primes de conversion",
      "1058": "Autres primes"
    },
    fonctionnement: {
      credit: [
        "Lors des augmentations de capital : excédent du prix d'émission sur la valeur nominale des actions, par le débit des comptes d'associés, de tiers ou de trésorerie"
      ],
      debit: [
        "Incorporation des primes au capital, par le crédit du compte 101 – Capital social",
        "Absorption de pertes, par le crédit du compte 12 – Report à nouveau ou 139 – Résultat net : Perte",
        "Remboursement du capital, par le crédit du compte 462 – Associés, comptes courants",
        "Imputation des frais d'augmentation de capital, par le crédit du compte 78 – Transferts de charges"
      ]
    },
    commentaires: "Quatre types de primes :\n\n1) Prime d'émission (1051) : excédent du prix d'émission sur la valeur nominale des actions ou parts.\n\n2) Prime de fusion (1053) : différence entre la valeur réelle de l'entreprise absorbée et la valeur nominale des actions rémunérant l'apport.\n\n3) Prime d'apport (1052) : différence entre la valeur du bien apporté et la valeur nominale des titres remis.\n\n4) Prime de conversion (1054) : différence entre la valeur de conversion des titres de créances et la valeur nominale des actions reçues en échange.\n\nLes primes constituent une réserve disponible pouvant être utilisée pour absorber des pertes ou être incorporées au capital.",
    exclusions: {
      texte: "Ne doit pas enregistrer certaines sommes qualifiées de 'primes' mais de nature différente : primes de remboursement des obligations, primes d'assurance, primes de création d'emplois.",
      comptes: ["206 – Primes de remboursement des obligations", "625 – Primes d'assurance", "7078 – Autres produits accessoires"]
    },
    controle: [
      "Décisions de l'Assemblée des associés portant augmentation du capital social",
      "Textes relatifs au protocole de fusion ou d'apport",
      "Factures de frais ou calcul analytique des frais d'augmentation de capital"
    ],
    comptes_lies: ["101","1051","1052","1053","1054","1058","12","139","462","78"],
    textes_ref: ["AUSC art. 592 (prime d'émission SA)", "AUSC art. 197 (prime de fusion)"],
    exemples_ecritures: [
        {
          libelle: "Emission d'actions nouvelles avec prime (émission à 15 000 F, nominal 10 000 F)",
          debit: "4612 – Associés, apports en numéraire (15 000)",
          credit: "101 – Capital social (10 000) + 1051 – Prime d'émission (5 000)"
        },
        {
          libelle: "Incorporation de la prime au capital",
          debit: "105 – Primes liées aux capitaux propres",
          credit: "101 – Capital social"
        },
        {
          libelle: "Imputation des frais d'augmentation de capital",
          debit: "105 – Primes liées aux capitaux propres",
          credit: "78 – Transferts de charges"
        },
      ]
  },

  "106": {
    libelle: "Écarts de réévaluation",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "L'écart de réévaluation représente la contrepartie au passif du bilan des augmentations de valeur d'éléments actifs soit dans le cadre d'une réévaluation légale, soit dans celui d'une réévaluation libre.\n\nLa différence entre les valeurs réévaluées et les valeurs nettes précédemment comptabilisées constitue l'écart de réévaluation.\n\nL'écart de réévaluation s'inscrit distinctement au passif du bilan dans les capitaux propres.",
    subdivisions: {
      "1061": "Écarts de réévaluation légale",
      "1062": "Écarts de réévaluation libre"
    },
    fonctionnement: {
      credit: [
        "Réévaluation des éléments d'actif : montant de la plus-value de réévaluation, par le débit des comptes d'actifs concernés (classe 2)"
      ],
      debit: [
        "Incorporation directe de l'écart au capital, par le crédit du compte 10 – Capital"
      ]
    },
    commentaires: "L'écart de réévaluation n'a pas la nature d'un résultat : il ne peut pas être utilisé pour compenser les pertes de l'exercice de réévaluation et il n'est pas distribuable aux associés. Il peut toutefois être incorporé en tout ou partie au capital social par décision de l'AGE. Des sous-comptes peuvent être ouverts par catégorie d'actif réévalué pour suivre les réductions de l'écart lors des sorties d'actifs.",
    controle: [
      "Évaluation des actifs à la date de la réévaluation",
      "Décisions de l'AGE portant augmentation de capital par incorporation de tout ou partie de l'écart"
    ],
    comptes_lies: ["1061","1062","10","21","22"],
    textes_ref: ["SC OHADA — Réévaluation des actifs", "Législation nationale de réévaluation légale"],
    exemples_ecritures: [
        {
          libelle: "Réévaluation d'un bâtiment (plus-value de 5 000 000 F)",
          debit: "23 – Bâtiments (5 000 000)",
          credit: "106 – Écarts de réévaluation (5 000 000)"
        },
        {
          libelle: "Incorporation de l'écart de réévaluation au capital",
          debit: "106 – Écarts de réévaluation",
          credit: "101 – Capital social"
        },
      ]
  },

  "109": {
    libelle: "Actionnaires, capital souscrit non appelé",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Actif — en déduction des capitaux propres au passif)",
    sens: "Débiteur",
    contenu: "Ce compte retrace la créance de la société sur les actionnaires, pour la fraction du capital non encore appelé par les organes compétents en cas de libération partielle. Celle-ci peut être consécutive aux opérations de constitution d'une société ou d'augmentation de capital.",
    fonctionnement: {
      debit: [
        "Lors de la création ou d'une augmentation de capital : montant non appelé immédiatement, par le crédit du compte 101 – Capital social (via le compte 1011)"
      ],
      credit: [
        "Lors des appels successifs du capital : réduction de la créance, par le débit du compte 467 – Actionnaires, restant dû sur capital appelé"
      ]
    },
    commentaires: "Le montant inscrit au compte 109 représente la créance globale de la société sur les actionnaires. Cette créance est personnalisée pour chacun lors des appels effectifs (portée alors au compte 467). Le solde du compte 109 est toujours égal, en valeur absolue, et de sens opposé au compte 1011. Il doit être nul lorsque le capital est intégralement appelé.",
    controle: [
      "Statuts de la société",
      "Décisions des AGO et AGE",
      "Compte 1011 de solde opposé et de montant identique"
    ],
    comptes_lies: ["101","1011","467"],
    textes_ref: ["AUSC art. 387"],
    exemples_ecritures: [
        {
          libelle: "Capital souscrit non appelé à la constitution",
          debit: "109 – Actionnaires, capital souscrit non appelé",
          credit: "1011 – Capital souscrit, non appelé"
        },
        {
          libelle: "Appel de fonds — réduction de la créance",
          debit: "467 – Actionnaires, restant dû sur capital appelé",
          credit: "109 – Actionnaires, capital souscrit non appelé"
        },
      ]
  },

  "11": {
    libelle: "Réserves",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Les réserves correspondent à des bénéfices laissés à la disposition de l'entreprise et non incorporés au capital.\n\nL'obligation de constituer des réserves résulte des dispositions statutaires ou réglementaires et des décisions des organes compétents.",
    subdivisions: {
      "111":  "Réserve légale",
      "112":  "Réserves statutaires ou contractuelles",
      "113":  "Réserves réglementées",
      "1131": "Réserves de plus-values nettes à long terme",
      "1133": "Réserves consécutives à l'octroi de subventions d'investissement",
      "1138": "Autres réserves réglementées",
      "118":  "Autres réserves",
      "1181": "Réserves facultatives",
      "1188": "Réserves diverses"
    },
    fonctionnement: {
      credit: [
        "Affectation du bénéfice aux réserves, par le débit du compte 131 – Résultat net : Bénéfice ou 1301 – Résultat en instance d'affectation : Bénéfice"
      ],
      debit: [
        "Incorporation directe des réserves au capital, par le crédit du compte 101 – Capital social",
        "Distribution aux associés, par le crédit du compte 465 – Associés, dividendes à payer",
        "Prélèvement pour amortissement des pertes, par le crédit du compte 129 – Report à nouveau débiteur ou 139 – Résultat net : Perte"
      ]
    },
    commentaires: "1) Le compte 111 – Réserve légale constate l'obligation annuelle de prélèvement de 1/20e (5%) du bénéfice net, jusqu'à atteindre 20% du capital social. Elle peut aussi être alimentée par prélèvement sur d'autres réserves disponibles (ex. primes liées au capital). Elle cesse d'être obligatoire dès que son montant atteint 20% du capital.\n\n2) Le compte 1131 – Réserve de plus-values nettes à long terme enregistre la PVNLT pour son montant net d'impôt, lorsque la législation fiscale le prévoit.\n\n3) Le compte 1133 – Réserves consécutives à l'octroi de subventions est ouvert lorsque la convention de subvention prévoit la constitution et le maintien d'une réserve d'un montant déterminé pendant une période définie.",
    exclusions: {
      texte: "Ne doit pas enregistrer les provisions pour dépréciation (pertes et charges, stocks, clients, trésorerie).",
      comptes: ["19 – Provisions financières pour risques et charges", "29 – Provisions pour dépréciation", "39 – Dépréciations des stocks", "49 – Dépréciations et risques provisionnés (Tiers)", "59 – Dépréciations et risques provisionnés (Trésorerie)"]
    },
    controle: [
      "Dispositions législatives, statutaires ou contractuelles sur la répartition des résultats",
      "Décisions de l'AGO portant répartition des résultats"
    ],
    comptes_lies: ["111","112","113","1131","1133","118","131","1301","101","465","129","139"],
    textes_ref: ["AUSC art. 143 et 144 — réserve légale 20% du capital"],
    exemples_ecritures: [
        {
          libelle: "Dotation à la réserve légale (5 % du bénéfice)",
          debit: "131 – Résultat net : Bénéfice",
          credit: "111 – Réserve légale"
        },
        {
          libelle: "Incorporation des réserves au capital",
          debit: "11 – Réserves",
          credit: "101 – Capital social"
        },
        {
          libelle: "Distribution de réserves aux associés",
          debit: "11 – Réserves",
          credit: "465 – Associés, dividendes à payer"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 65",
          titre: "Affectation du résultat bénéficiaire",
          enonce: "Bénéfice N = 500 000. Réserve légale 25 000 (5 %), réserves facultatives 100 000, dividendes 300 000, report à nouveau 75 000.",
          ecritures: [
            {
              libelle: "Virement bénéfice en instance d'affectation",
              debit: "131 – Résultat net : Bénéfice",
              credit: "1301 – Résultat en instance d'affectation"
            },
            {
              libelle: "Dotation réserve légale (5 % du bénéfice)",
              debit: "1301",
              credit: "111 – Réserve légale"
            },
            {
              libelle: "Dotation réserves facultatives",
              debit: "1301",
              credit: "118 – Réserves facultatives"
            },
            {
              libelle: "Dividendes mis en distribution",
              debit: "1301",
              credit: "465 – Associés, dividendes à payer"
            },
            {
              libelle: "Report à nouveau (solde)",
              debit: "1301",
              credit: "121 – Report à nouveau créditeur"
            },
            {
              libelle: "Versement des dividendes",
              debit: "465 – Associés, dividendes à payer",
              credit: "52 – Banques"
            },
          ],
          commentaire: "Réserve légale obligatoire à 5 % du bénéfice jusqu'à 20 % du capital (AUSC art. 143). Cesser dès que le plafond est atteint.",
        },
    ],
  },

  "111": {
    libelle: "Réserve légale",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Constate l'obligation annuelle de constitution d'un fonds de réserve légale, en application des dispositions juridiques régissant certains types de sociétés (SA et SARL notamment). La réserve légale cesse d'être obligatoire lorsque son montant atteint 20% du capital social.",
    fonctionnement: {
      credit: [
        "Dotation annuelle obligatoire : 1/20e du bénéfice net (5%), par le débit du compte 131 – Résultat net : Bénéfice",
        "Prélèvement sur toute réserve disponible (notamment primes liées au capital)"
      ],
      debit: [
        "Imputation de pertes (seulement si toutes les autres réserves sont épuisées), par le crédit du compte 139",
        "Incorporation au capital, par le crédit du compte 101"
      ]
    },
    commentaires: "La dotation à la réserve légale est obligatoire et s'impose aux SA, SARL et autres sociétés de capitaux dans l'espace OHADA. Elle cesse d'être obligatoire lorsque son montant cumulé atteint 20% du montant du capital social. La réserve légale ne peut en principe pas être distribuée entre les associés.",
    comptes_lies: ["11","131","101","139"],
    textes_ref: ["AUSC art. 143 (SA)", "AUSC art. 345 (SARL)"]
  },

  "12": {
    libelle: "Report à nouveau",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif si créditeur, négatif si débiteur)",
    sens: "Créditeur (bénéfice reporté) ou Débiteur (perte reportée)",
    contenu: "Le report à nouveau correspond au montant soit des bénéfices d'exercices antérieurs dont l'affectation a été reportée sur les exercices ultérieurs, soit des pertes constatées à la clôture d'exercices antérieurs qui n'ont pas été compensées par des prélèvements opérés sur les bénéfices, les réserves ou le capital.\n\nLe report à nouveau est inscrit au passif du bilan où il doit figurer sur une ligne distincte : en moins si son solde est débiteur, et en plus si son solde est créditeur. Il constitue un élément des capitaux propres.",
    subdivisions: {
      "121":  "Report à nouveau créditeur",
      "1211": "Bénéfice net à reporter",
      "1213": "Bénéfice — correction d'erreur",
      "129":  "Report à nouveau débiteur",
      "1291": "Perte nette à reporter",
      "1292": "Perte — amortissements réputés différés",
      "1293": "Perte — correction d'erreur"
    },
    fonctionnement: {
      credit: [
        "Lors de la répartition des bénéfices : partie non distribuée et non affectée à un compte de réserves, par le débit du compte 131 – Résultat net : Bénéfice"
      ],
      debit: [
        "Lors de l'affectation du résultat : pertes non compensées par des réserves ou par une réduction de capital, par le crédit du compte 139 – Résultat net : Perte",
        "Report à nouveau mis en distribution, par le crédit du compte 465 – Associés, dividendes à payer"
      ]
    },
    commentaires: "Le fonctionnement de ce compte est subordonné à la décision de l'AGO statuant sur l'affectation du bénéfice ou sur le sort des pertes. Le report à nouveau est constitué par : les sommes non affectées laissées à disposition, les pertes non compensées, et les arrondis de dividendes distribués.\n\nLorsque la législation fiscale prévoit un traitement des amortissements différés distinct des pertes ordinaires, l'entreprise utilise les sous-comptes 1291 et 1292.",
    exclusions: {
      texte: "Ne doit pas enregistrer les sommes à porter en réserves par décision de l'AGO.",
      comptes: ["11 – Réserves"]
    },
    controle: ["Décisions des assemblées sur la répartition des résultats"],
    comptes_lies: ["121","129","131","139","465","11","101"],
    textes_ref: ["AUSC art. 150 (SA)", "AUSC art. 371 (SARL)"],
    exemples_ecritures: [
        {
          libelle: "Report d'un bénéfice non distribué",
          debit: "131 – Résultat net : Bénéfice",
          credit: "121 – Report à nouveau créditeur"
        },
        {
          libelle: "Report d'une perte non compensée",
          debit: "129 – Report à nouveau débiteur",
          credit: "139 – Résultat net : Perte"
        },
        {
          libelle: "Distribution du report à nouveau aux associés",
          debit: "121 – Report à nouveau créditeur",
          credit: "465 – Associés, dividendes à payer"
        },
      ]
  },

  "13": {
    libelle: "Résultat net de l'exercice",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif si bénéfice, Actif si perte)",
    sens: "Créditeur (bénéfice) ou Débiteur (perte)",
    contenu: "Le résultat net de l'exercice peut être défini de deux façons :\n\n1. différence entre les produits (reçus ou à recevoir) et les charges (payées ou à payer) de la période ;\n\n2. variation des capitaux propres entre le début et la clôture de l'exercice, hors nouveaux apports et retraits d'apports et hors réévaluation.\n\nQuel que soit son signe, le résultat net de l'exercice est inscrit au passif du bilan sur la ligne correspondante, parmi les capitaux propres.",
    subdivisions: {
      "130":  "Résultat en instance d'affectation",
      "1301": "Résultat en instance d'affectation : bénéfice",
      "1309": "Résultat en instance d'affectation : perte",
      "131":  "Résultat net : Bénéfice",
      "132":  "Marge brute (M.B.)",
      "1321": "Marge brute sur marchandises",
      "1322": "Marge brute sur matières",
      "133":  "Valeur ajoutée (V.A.)",
      "134":  "Excédent brut d'exploitation (E.B.E.)",
      "135":  "Résultat d'exploitation (R.E.)",
      "136":  "Résultat financier (R.F.)",
      "137":  "Résultat des activités ordinaires (R.A.O.)",
      "138":  "Résultat hors activités ordinaires (R.H.A.O.)",
      "139":  "Résultat net : Perte"
    },
    fonctionnement: {
      credit: [
        "À la clôture : solde des comptes de produits (classe 7) et des comptes créditeurs de la classe 8",
        "Après clôture, lors de l'imputation des pertes décidée par les organes compétents : par le débit des comptes 12 – Report à nouveau, 11 – Réserves, 101 – Capital social ou 103 – Capital personnel"
      ],
      debit: [
        "À la clôture : solde des comptes de charges (classe 6) et des comptes débiteurs de la classe 8",
        "Après clôture, lors de l'affectation des bénéfices : par le crédit des comptes 12, 11, 101, 103 ou 465 – Associés, dividendes à payer"
      ]
    },
    commentaires: "Le compte 13 est soldé lors de la comptabilisation de l'affectation décidée par les organes compétents au cours de l'exercice suivant. À la réouverture des comptes, les entreprises peuvent utiliser le compte 130 – Résultat en instance d'affectation pour anticiper cette affectation. Dans les entreprises individuelles, le solde du compte 13 est viré au compte 103 – Capital personnel.",
    exclusions: {
      texte: "Ne doit pas enregistrer les charges ou produits qui n'auraient pas au préalable transité par les comptes de gestion (classes 6, 7 et 8).",
      comptes: ["Classe 6 – Charges", "Classe 7 – Produits", "Classe 8 – Autres charges et produits"]
    },
    controle: ["Soldes des comptes de gestion (classes 6, 7 et 8)"],
    comptes_lies: ["130","131","132","133","134","135","136","137","138","139","11","12","101","103","465"],
    textes_ref: ["SC OHADA — États financiers annuels", "Compte de résultat OHADA"],
    exemples_ecritures: [
        {
          libelle: "Clôture — virement des produits au résultat",
          debit: "70 / 71 / 72 / 77… – Comptes de produits",
          credit: "131 – Résultat net : Bénéfice"
        },
        {
          libelle: "Clôture — virement des charges au résultat",
          debit: "139 – Résultat net : Perte",
          credit: "60 / 61 / 62… – Comptes de charges"
        },
        {
          libelle: "Affectation du bénéfice en réserves et dividendes",
          debit: "131 – Résultat net : Bénéfice",
          credit: "111 – Réserve légale + 118 – Réserves + 465 – Dividendes à payer"
        },
      ]
  },

  "14": {
    libelle: "Subventions d'investissement",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Les subventions d'investissement sont des aides financières non remboursables accordées aux entreprises (publiques ou privées), pour différentes raisons : acquisition, création de valeurs immobilisées (subventions d'équipement) ou financement d'activités à long terme, afin de pourvoir au remplacement ou à la remise en état des immobilisations.\n\nElles peuvent également consister en l'octroi de biens et services.",
    subdivisions: {
      "141":  "Subventions d'équipement A",
      "1411": "État",
      "1412": "Régions",
      "1413": "Départements",
      "1414": "Communes et collectivités publiques décentralisées",
      "1415": "Entreprises publiques ou mixtes",
      "1416": "Entreprises et organismes privés",
      "1417": "Organismes internationaux",
      "1418": "Autres",
      "142":  "Subventions d'équipement B",
      "148":  "Autres subventions d'investissement"
    },
    fonctionnement: {
      credit: [
        "Réception d'immobilisations transférées gratuitement : valeur d'évaluation des biens reçus, par le débit du compte approprié de la classe 2",
        "Réception de la subvention en numéraire, par le débit du compte 4494 – État, subventions d'équipement à recevoir, ou 4582 – Organismes internationaux, subventions à recevoir"
      ],
      debit: [
        "À la clôture de l'exercice : quote-part de subvention rapportée au résultat de la période, par le crédit du compte 865 – Reprises de subventions d'investissement",
        "À la date de cession de l'actif financé par la subvention : solde non encore repris, par le crédit du compte 865"
      ]
    },
    commentaires: "Le compte 14 permet d'échelonner sur plusieurs exercices l'enrichissement provenant de la subvention. La quote-part reprise chaque exercice est égale :\n— au montant de la dotation aux amortissements de l'exercice pour les immobilisations amortissables ;\n— à un montant déterminé par la durée d'inaliénabilité pour les immobilisations non amortissables, ou à défaut au 1/10e du montant de la subvention.\n\nDes dérogations peuvent être admises selon les circonstances particulières (régime juridique, objet de l'activité, conditions posées par l'autorité de tutelle).",
    exclusions: {
      texte: "Ne doit pas enregistrer les subventions d'exploitation ni les subventions d'équilibre.",
      comptes: ["71 – Subventions d'exploitation", "88 – Subventions d'équilibre"]
    },
    controle: [
      "Décisions d'octroi de la subvention",
      "Tableau d'amortissement des biens acquis pour vérification du rythme de reprise"
    ],
    comptes_lies: ["141","142","148","865","21","22","4494","4582"],
    textes_ref: ["SC OHADA — Traitement des subventions d'investissement"],
    exemples_ecritures: [
        {
          libelle: "Réception d'une subvention d'équipement en numéraire",
          debit: "4494 – État, subventions d'équipement à recevoir",
          credit: "14 – Subventions d'investissement"
        },
        {
          libelle: "Encaissement effectif de la subvention",
          debit: "52 – Banques",
          credit: "4494 – État, subventions d'équipement à recevoir"
        },
        {
          libelle: "Reprise annuelle de la subvention au résultat",
          debit: "14 – Subventions d'investissement",
          credit: "865 – Reprises de subventions d'investissement"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 66",
          titre: "Subvention d'investissement — comptabilisation et reprises",
          enonce: "Subvention d'équipement État : 5 000 000 F pour matériel amortissable sur 5 ans (linéaire 20 %).",
          ecritures: [
            {
              libelle: "Notification (droit acquis)",
              debit: "4494 – État, subventions d'équipement à recevoir",
              credit: "141 – Subventions d'équipement A"
            },
            {
              libelle: "Encaissement",
              debit: "52 – Banques",
              credit: "4494 – État, subventions d'équipement à recevoir"
            },
            {
              libelle: "Reprise annuelle (1 000 000 F = 1/5 × 5 000 000)",
              debit: "141 – Subventions d'équipement A",
              credit: "865 – Reprises de subventions d'investissement"
            },
          ],
          commentaire: "Quote-part reprise = amortissement exercice × (subvention / coût immob.). Pour immob. non amortissables : 1/10 par an ou durée d'inaliénabilité.",
        },
        {
          ref: "App. 67",
          titre: "Subvention d'exploitation",
          enonce: "Prime d'embauche État 150 000 F + subvention organisme international 80 000 F.",
          ecritures: [
            {
              libelle: "Subvention d'exploitation État à recevoir",
              debit: "4495 – État, subventions d'exploitation à recevoir",
              credit: "718 – Autres subventions d'exploitation"
            },
            {
              libelle: "Encaissement",
              debit: "52 – Banques",
              credit: "4495"
            },
            {
              libelle: "Subvention organisme international",
              debit: "4582 – Organismes internationaux, subventions à recevoir",
              credit: "718 – Autres subventions d'exploitation"
            },
          ],
          commentaire: "Distinguer : 14 (immob.), 71 (charges courantes / insuffisance prix), 88 (pertes exceptionnelles). L'acte d'octroi est déterminant.",
        },
        {
          ref: "App. 68",
          titre: "Subvention d'équilibre",
          enonce: "Subvention exceptionnelle État pour compenser une perte H.A.O. : 2 000 000 F.",
          ecritures: [
            {
              libelle: "Encaissement subvention d'équilibre",
              debit: "52 – Banques",
              credit: "881 – Subventions d'équilibre — État"
            },
          ],
        },
    ],
  },

  "15": {
    libelle: "Provisions réglementées et fonds assimilés",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Les provisions réglementées sont des provisions à caractère purement fiscal ou réglementaire, comptabilisées non pas en application de principes comptables, mais suivant des dispositions légales et réglementaires (lois de finances, par exemple).\n\nPeuvent être classées dans cette catégorie, les provisions :\n\nautorisées spécialement pour certaines professions (reconstitution de gisements miniers et pétroliers) ;\npour hausse des prix et fluctuation des cours ;\npour investissement.\nOnt notamment le caractère de fonds assimilés, lorsqu'ils sont prévus par la législation fiscale :\n\nles amortissements dérogatoires ;\nles plus-values de cession à réinvestir ;\nles fonds réglementés ;\nla provision spéciale de réévaluation, lorsque la législation fiscale n'autorisant pas la déductibilité du supplément d'amortissement (concept dit de \"neutralité fiscale\") impose la comptabilisation sous cette forme.",
    subdivisions: {
      "151":  "Amortissements dérogatoires",
      "152":  "Plus-values de cession à réinvestir",
      "153":  "Fonds réglementés",
      "1531": "Fonds national",
      "1532": "Prélèvement pour le budget",
      "154":  "Provision spéciale de réévaluation",
      "155":  "Provisions réglementées relatives aux immobilisations",
      "1551": "Reconstitution des gisements miniers et pétroliers",
      "156":  "Provisions réglementées relatives aux stocks",
      "1561": "Hausse de prix",
      "1562": "Fluctuation des cours",
      "157":  "Provisions pour investissement",
      "158":  "Autres provisions et fonds réglementés"
    },
    fonctionnement: {
      credit: [
        "Création ou augmentation des provisions réglementées, par le débit du compte 85 – Dotations H.A.O."
      ],
      debit: [
        "Annulation ou diminution des provisions réglementées, par le crédit du compte 86 – Reprises H.A.O."
      ]
    },
    commentaires: "Du fait de leur caractère de réserves non libérées d'impôt (charge latente différée), les provisions réglementées sont inscrites au passif parmi les capitaux propres. Elles sont créées et augmentées exclusivement par « Dotations H.A.O. » (compte 85) et réduites ou annulées exclusivement par « Reprises H.A.O. » (compte 86).\n\nExemple — Plus-values à réinvestir (compte 152) :\n→ La plus-value est constatée par différence entre compte 81 et 82\n→ L'engagement de réemploi est comptabilisé : Débit 851 / Crédit 152\n→ En l'absence de réinvestissement dans le délai légal, reprise intégrale : Débit 152 / Crédit 861\n→ En cas de réinvestissement, reprise partielle annuelle à hauteur de la différence entre l'amortissement global et l'amortissement sur le coût net de la plus-value.",
    exclusions: {
      texte: "Ne doit pas enregistrer les provisions pour risques et charges futurs, ni les dépréciations de l'actif.",
      comptes: ["19 – Provisions financières pour risques et charges", "29 – Provisions pour dépréciation", "39", "49", "59"]
    },
    controle: [
      "Écritures à la clôture de l'exercice",
      "Tableaux d'amortissements comptables et fiscaux",
      "Factures de cession d'immobilisations",
      "Décisions des assemblées sur la répartition du résultat et législation applicable"
    ],
    comptes_lies: ["151","152","153","154","155","156","157","158","85","86"],
    textes_ref: ["Code Général des Impôts national applicable", "SC OHADA — Provisions réglementées"],
    exemples_ecritures: [
        {
          libelle: "Dotation aux amortissements dérogatoires",
          debit: "851 – Dotations aux provisions réglementées",
          credit: "151 – Amortissements dérogatoires"
        },
        {
          libelle: "Engagement de réemploi d'une plus-value de cession",
          debit: "851 – Dotations aux provisions réglementées",
          credit: "152 – Plus-values de cession à réinvestir"
        },
        {
          libelle: "Reprise de la provision réglementée",
          debit: "15 – Provisions réglementées",
          credit: "861 – Reprises de provisions réglementées"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 16",
          titre: "Plus-value à réinvestir",
          enonce: "Cession d'un bâtiment : plus-value nette 3 000 000 F. Engagement de réemploi pris dans le délai légal.",
          ecritures: [
            {
              libelle: "Engagement de réemploi de la plus-value",
              debit: "851 – Dotations H.A.O. aux provisions réglementées",
              credit: "152 – Plus-values de cession à réinvestir"
            },
            {
              libelle: "Reprise intégrale si non réinvesti dans le délai légal",
              debit: "152 – Plus-values de cession à réinvestir",
              credit: "861 – Reprises de provisions réglementées"
            },
            {
              libelle: "Reprise partielle annuelle si réinvestissement effectué",
              debit: "152 – Plus-values de cession à réinvestir",
              credit: "861 – Reprises de provisions réglementées"
            },
          ],
          commentaire: "Reprise partielle annuelle = différence entre amortissement global de l'immob. acquise et amortissement sur le coût net de la plus-value.",
        },
        {
          ref: "App. 18",
          titre: "Amortissements dérogatoires",
          enonce: "Matériel 1 200 000 F, durée 5 ans. Amortissement fiscal N : 400 000 ; économique : 240 000. Complément dérogatoire = 160 000 F.",
          ecritures: [
            {
              libelle: "Amortissement économique normal",
              debit: "6813 – Dotations aux amortissements immob. corporelles",
              credit: "284 – Amortissements du matériel"
            },
            {
              libelle: "Complément dérogatoire (surplus fiscal)",
              debit: "851 – Dotations H.A.O. aux provisions réglementées",
              credit: "151 – Amortissements dérogatoires"
            },
            {
              libelle: "Reprise dérogatoire (quand amort. fiscal < amort. éco.)",
              debit: "151 – Amortissements dérogatoires",
              credit: "861 – Reprises de provisions réglementées"
            },
          ],
          commentaire: "Compte 68 = dépréciation économique uniquement. Le surplus fiscal transite exclusivement par 851/151/861, jamais par 681.",
        },
    ],
  },

  "16": {
    libelle: "Emprunts et dettes assimilées",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Les emprunts et les dettes assimilées sont des ressources financières externes, contractées auprès d'établissements de crédit et/ou de tiers divers, affectées de façon durable au financement des moyens d'exploitation ou de production. Remboursables à terme, ils participent concurremment avec les capitaux propres à la couverture des besoins durables de l'entreprise.",
    subdivisions: {
      "161":  "Emprunts obligataires",
      "1611": "Emprunts obligataires ordinaires",
      "1612": "Emprunts obligataires convertibles",
      "1618": "Autres emprunts obligataires",
      "162":  "Emprunts et dettes auprès des établissements de crédit",
      "163":  "Avances reçues de l'État",
      "164":  "Avances reçues et comptes courants bloqués",
      "165":  "Dépôts et cautionnements reçus",
      "1651": "Dépôts",
      "1652": "Cautionnements",
      "166":  "Intérêts courus",
      "167":  "Avances assorties de conditions particulières",
      "1671": "Avances bloquées pour augmentation du capital",
      "1672": "Avances conditionnées par l'État",
      "1674": "Avances conditionnées par les organismes internationaux",
      "168":  "Autres emprunts et dettes",
      "1685": "Emprunts participatifs",
      "1686": "Participation des travailleurs aux bénéfices"
    },
    fonctionnement: {
      credit: [
        "Réception des fonds empruntés ou avances diverses, par le débit des comptes de trésorerie concernés (et du compte 206 – Primes de remboursement des obligations le cas échéant)",
        "À la clôture de l'exercice : intérêts courus jusqu'à la date de clôture, par le débit du compte 671 – Intérêts des emprunts",
        "Réception de dépôts et cautionnements, par le débit des comptes de trésorerie"
      ],
      debit: [
        "À la date d'échéance : remboursement du principal, par le crédit d'un compte de tiers ou de trésorerie",
        "À l'ouverture de l'exercice suivant : contrepassation des intérêts courus, par le crédit du compte 671",
        "Restitution des dépôts et cautionnements, par le crédit des comptes de trésorerie"
      ]
    },
    commentaires: "Les emprunts ne sont pas distingués par terme d'exigibilité dans les comptes courants, mais à la clôture, les fractions exigibles à 1 an, à 2 ans et à plus de 2 ans sont isolées dans le tableau des créances et dettes (état annexé).\n\nSchéma d'émission d'un emprunt obligataire avec prime de remboursement :\n→ À l'émission : Débit 52 (montant net reçu) + Débit 206 (prime) / Crédit 161 (montant total à rembourser)\n→ Au remboursement : Débit 161 / Crédit 52 ; et Débit 6872 / Crédit 206 pour l'amortissement de la prime",
    exclusions: {
      texte: "Ne doit pas enregistrer les emprunts liés à des participations ni les dettes de crédit-bail.",
      comptes: ["181 – Dettes liées à des participations", "17 – Dettes de crédit-bail et contrats assimilés"]
    },
    controle: [
      "Contrats de prêts signés par l'entreprise",
      "Virements (réception et remboursements)",
      "Tableau d'amortissement des emprunts",
      "Calcul des intérêts courus",
      "Contrats de dépôts et cautionnements",
      "Engagements de l'État et des organismes internationaux"
    ],
    comptes_lies: ["161","162","163","164","165","166","167","168","671","206","52","481"],
    textes_ref: ["SC OHADA — Emprunts et dettes financières"],
    exemples_ecritures: [
        {
          libelle: "Obtention d'un emprunt bancaire",
          debit: "52 – Banques",
          credit: "162 – Emprunts et dettes auprès des établissements de crédit"
        },
        {
          libelle: "Constatation des intérêts courus à la clôture",
          debit: "671 – Intérêts des emprunts",
          credit: "166 – Intérêts courus"
        },
        {
          libelle: "Remboursement de l'échéance (principal)",
          debit: "162 – Emprunts et dettes auprès des établissements de crédit",
          credit: "52 – Banques"
        },
      ]
  },

  "17": {
    libelle: "Dettes de crédit-bail et contrats assimilés",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre le montant correspondant à la valeur d'entrée du bien acquis par contrats de crédit-bail et assimilés. Cette valeur est celle figurant dans le contrat ou la somme actualisée des redevances de créditbail.",
    subdivisions: {
      "172":  "Emprunts équivalents crédit-bail immobilier",
      "173":  "Emprunts équivalents crédit-bail mobilier",
      "176":  "Intérêts courus",
      "1762": "Sur emprunts équivalents de crédit-bail immobilier",
      "1763": "Sur emprunts équivalents de crédit-bail mobilier",
      "1768": "Sur emprunts équivalents d'autres contrats",
      "178":  "Emprunts équivalents d'autres contrats"
    },
    fonctionnement: {
      credit: [
        "À l'entrée du bien sous le contrôle de l'entreprise : montant stipulé au contrat ou somme actualisée des redevances, par le débit du compte d'immobilisation concerné (classe 2)",
        "À la clôture de l'exercice : intérêts courus de l'exercice sur l'emprunt équivalent, par le débit du compte 672 – Intérêts dans loyers de crédit-bail"
      ],
      debit: [
        "À la clôture de l'exercice : fraction des redevances payées correspondant au remboursement du capital de la dette, par le crédit du compte 623 – Redevances de crédit-bail",
        "À l'ouverture de l'exercice suivant : contrepassation des intérêts courus, par le crédit du compte 672"
      ]
    },
    commentaires: "Le traitement OHADA du crédit-bail (retraitement préférentiel) consiste à :\n1) Inscrire le bien à l'actif (classe 2) à sa valeur d'entrée\n2) Constater la dette au passif (compte 17)\n3) Amortir le bien normalement\n4) Décomposer chaque redevance payée en remboursement de capital (débit 17, via compte 623) et intérêts financiers (compte 672)\n\nCe traitement reflète la réalité économique du financement. Ne sont visés que les contrats de crédit-bail d'importance significative ou de locations renouvelables sans limitation.",
    exclusions: {
      texte: "Ne doit pas enregistrer les dettes autres que celles relatives aux contrats de crédit-bail répondant au critère d'inscription à l'actif, ni les redevances non retraitées.",
      comptes: ["16 ou 18 – Selon le cas", "622 – Locations et charges locatives"]
    },
    controle: [
      "Factures de redevances",
      "Contrats de crédit-bail et assimilés",
      "Échéanciers de remboursement"
    ],
    comptes_lies: ["172","173","176","21","22","623","672","481"],
    textes_ref: ["SC OHADA — Traitement du crédit-bail (traitement de référence)"],
    exemples_ecritures: [
        {
          libelle: "Entrée d'un bien en crédit-bail à l'actif",
          debit: "24 – Matériel (valeur contrat)",
          credit: "173 – Emprunts équivalents crédit-bail mobilier"
        },
        {
          libelle: "Paiement de la redevance (décomposée)",
          debit: "173 – Dette crédit-bail (remboursement capital) + 672 – Intérêts",
          credit: "52 – Banques (redevance totale)"
        },
        {
          libelle: "Amortissement du bien pris en crédit-bail",
          debit: "681 – Dotations aux amortissements d'exploitation",
          credit: "284 – Amortissements du matériel"
        },
      ]
  },

  "18": {
    libelle: "Dettes liées à des participations et comptes de liaison",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif)",
    sens: "Créditeur",
    contenu: "Les dettes liées à des participations sont des emprunts contractés auprès d'entreprises liées ou avec lesquelles elles ont un lien de participation.\n\nLes dettes liées à des participations figurent au passif du bilan parmi les dettes financières diverses.\n\nLe compte de liaison des établissements et succursales est un compte de bilan ouvert au nom de l'établissement. Il fonctionne comme un compte courant, de sorte que toutes les opérations réalisées entre le siège et l'établissement y soient enregistrées comme s'il s'agissait d'un tiers. En conséquence, il conviendra :\n\nde créer, au siège, un compte de liaison au nom de chaque établissement ou succursale ;\nde créer, dans l'établissement ou la succursale, un compte réfléchi au nom du siège.\nLes opérations entre le siège et l'établissement ou la succursale sont à enregistrer de manière symétrique, dans la même période comptable et sur la base des mêmes pièces justificatives. Il en résulte que les comptes de liaison sont égaux et de sens contraire dans la comptabilité du siège et dans celle de l'établissement ou la succursale.",
    subdivisions: {
      "181":  "Dettes liées à des participations",
      "1811": "Dettes liées à des participations (groupe)",
      "1812": "Dettes liées à des participations (hors groupe)",
      "182":  "Dettes liées à des sociétés en participation",
      "183":  "Intérêts courus sur dettes liées à des participations",
      "184":  "Comptes permanents bloqués des établissements et succursales",
      "185":  "Comptes permanents non bloqués des établissements et succursales",
      "186":  "Comptes de liaison charges",
      "187":  "Comptes de liaison produits",
      "188":  "Comptes de liaison des sociétés en participation"
    },
    fonctionnement: {
      credit: [
        "Comptes 181, 182 : valeur à rembourser des emprunts contractés auprès d'entités liées, par le débit des comptes de trésorerie ou de tiers",
        "Compte 183 : intérêts courus à la clôture, par le débit du compte 671 – Intérêts des emprunts",
        "Comptes 184 à 187 : opérations entre le siège et ses établissements ou succursales, par le débit des comptes concernés"
      ],
      debit: [
        "Comptes 181, 182 : remboursement à l'échéance, par le crédit des comptes de trésorerie",
        "Comptes 184 à 187 : opérations inverses entre le siège et ses établissements (y compris les apports permanents antérieurs), par le crédit des comptes concernés"
      ]
    },
    commentaires: "Les comptes 181, 182, 183 et 188 sont exclusivement réservés aux opérations financières entre entreprises liées. Les comptes 184 à 187 sont réservés aux opérations entre établissements d'une même entreprise.\n\nLes comptes de liaison doivent être symétriques et de sens contraire entre le siège et l'établissement ou la succursale. Les opérations sont enregistrées dans la même période comptable et sur la base des mêmes pièces justificatives. Il en résulte que les comptes de liaison sont égaux et de sens contraire dans la comptabilité du siège et dans celle de l'établissement.",
    exclusions: {
      texte: "Ne doit pas enregistrer les dettes résultant d'opérations commerciales courantes intra-groupe, les dettes financières envers des tiers non liés, les comptes bloqués d'associés.",
      comptes: ["40 – Fournisseurs et comptes rattachés", "16 – Emprunts et dettes assimilées", "164 – Avances reçues et comptes courants bloqués"]
    },
    controle: [
      "Vérification du lien de participation",
      "Contrat de prêt et tableau de remboursement",
      "Calcul des intérêts courus",
      "Vérification des conditions d'octroi",
      "Virements"
    ],
    comptes_lies: ["181","182","183","184","185","186","187","188","671","26","40","16","164"],
    textes_ref: ["SC OHADA — Transactions intra-groupe et comptes de liaison"],
    exemples_ecritures: [
        {
          libelle: "Emprunt contracté auprès d'une filiale",
          debit: "52 – Banques",
          credit: "181 – Dettes liées à des participations"
        },
        {
          libelle: "Opération entre le siège et un établissement",
          debit: "186 – Comptes de liaison charges (siège)",
          credit: "186 – Comptes de liaison charges (établissement)"
        },
        {
          libelle: "Intérêts courus sur dettes liées à des participations",
          debit: "671 – Intérêts des emprunts",
          credit: "183 – Intérêts courus sur dettes liées à des participations"
        },
      ]
  },

  "19": {
    libelle: "Provisions financières pour risques et charges",
    classe: "Classe 1 — Ressources Durables",
    nature: "Compte de bilan (Passif — dettes financières)",
    sens: "Créditeur",
    contenu: "Les provisions financières pour risques et charges sont des provisions destinées à couvrir des charges, des risques et pertes nettement précisés quant à leur objet que des événements survenus ou en cours rendent probables, mais comportant un élément d'incertitude quant à leur montant ou leur réalisation prévisible à plus d'un an.\n\nLes provisions financières pour risques et charges sont inscrites au passif du bilan dans les dettes financières et ressources assimilées.",
    subdivisions: {
      "191":  "Provisions pour litiges",
      "192":  "Provisions pour garanties données aux clients",
      "193":  "Provisions pour pertes sur marchés à achèvement futur",
      "194":  "Provisions pour pertes de change",
      "195":  "Provisions pour impôts",
      "196":  "Provisions pour pensions et obligations similaires",
      "197":  "Provisions pour charges à répartir sur plusieurs exercices",
      "1971": "Provisions pour grosses réparations",
      "198":  "Autres provisions financières pour risques et charges",
      "1981": "Provisions pour amendes et pénalités",
      "1982": "Provisions pour renouvellement des immobilisations (entreprises concessionnaires)",
      "1983": "Provisions de propre assureur",
      "1988": "Autres provisions financières pour risques et charges"
    },
    fonctionnement: {
      credit: [
        "À la clôture de l'exercice : dotation pour charges et pertes prévisibles, par le débit du compte 691 – Dotations aux provisions d'exploitation ou 697 – Dotations aux provisions financières",
        "Ou par le débit du compte 85 – Dotations H.A.O. selon la nature de la provision"
      ],
      debit: [
        "À la clôture : reprise des provisions antérieures dont les raisons ont cessé d'exister, par le crédit du compte 79 – Reprises de provisions",
        "Ou par le crédit du compte 86 – Reprises H.A.O."
      ]
    },
    commentaires: "Détail des principales subdivisions :\n\n191 – Provisions pour litiges : à constituer lorsque l'entreprise, engagée dans un procès, risque d'être condamnée au versement de dommages et intérêts.\n\n192 – Provisions pour garanties données aux clients : estimation sur bases statistiques des risques liés aux garanties contractuelles (expérience des années antérieures).\n\n195 – Provisions pour impôts : en cas d'imposition fractionnée pour des montants significatifs (ex. étalement des plus-values nettes à long terme).\n\n196 – Provisions pour pensions et obligations similaires : indemnités de départ à la retraite ou de fin de carrière, versées en une seule fois le jour du départ.\n\n197 – Provisions pour charges à répartir sur plusieurs exercices : importantes dépenses prévisibles ne pouvant être supportées par le seul exercice (ex. grosses réparations).\n\nEn application du principe de prudence, même en cas d'absence ou d'insuffisance de bénéfice, les provisions doivent être constituées obligatoirement. Le compte 19 est réajusté à chaque clôture.",
    exclusions: {
      texte: "Ne doit pas enregistrer : les charges certaines d'un montant déterminé, les provisions de nature purement fiscale sans charges réellement prévisibles, les provisions correspondant à des risques à moins d'un an.",
      comptes: ["Classe 6 et 8 – Charges", "15 – Provisions réglementées et fonds assimilés", "499 – Risques provisionnés"]
    },
    controle: [
      "Vérification du calcul des provisions",
      "Recherche de la réalité du risque ou de l'éventualité de la charge",
      "Appréciation de l'échéance du risque (doit être supérieure à 1 an)"
    ],
    comptes_lies: ["191","192","193","194","195","196","197","198","691","697","79","85","86","499"],
    textes_ref: ["SC OHADA — Provisions pour risques et charges", "Principe de prudence OHADA"],
    exemples_ecritures: [
        {
          libelle: "Constitution d'une provision pour litige",
          debit: "691 – Dotations aux provisions d'exploitation",
          credit: "191 – Provisions pour litiges"
        },
        {
          libelle: "Constitution d'une provision pour grosses réparations",
          debit: "691 – Dotations aux provisions d'exploitation",
          credit: "197 – Provisions pour charges à répartir"
        },
        {
          libelle: "Reprise de provision devenue sans objet",
          debit: "191 – Provisions pour litiges",
          credit: "791 – Reprises de provisions d'exploitation"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 20",
          titre: "Provisions pour risques et charges — constitution et reprises",
          enonce: "N : risque CT exploitation 10, garanties clients 20, pertes de change 11, pensions 27, impôts H.A.O. 8, amendes 2. N+1 : reprises partielles sur garanties, pertes de change, impôts.",
          ecritures: [
            {
              libelle: "Provision risque à court terme (< 1 an)",
              debit: "6591 – Charges provisionnées d'exploitation",
              credit: "4991 – Risques provisionnés"
            },
            {
              libelle: "Provision pour garanties données aux clients",
              debit: "6911 – Dotations aux provisions d'exploitation",
              credit: "192 – Provisions pour garanties clients"
            },
            {
              libelle: "Provision pour pertes de change",
              debit: "6971 – Dotations aux provisions financières",
              credit: "194 – Provisions pour pertes de change"
            },
            {
              libelle: "Provision pour pensions et retraites",
              debit: "6911 – Dotations aux provisions d'exploitation",
              credit: "196 – Provisions pour pensions"
            },
            {
              libelle: "Provision pour impôts H.A.O. (> 1 an)",
              debit: "854 – Dotations aux provisions risques H.A.O.",
              credit: "195 – Provisions pour impôts"
            },
            {
              libelle: "Provision pour amendes et pénalités",
              debit: "6911 – Dotations aux provisions d'exploitation",
              credit: "1981 – Provisions pour amendes et pénalités"
            },
            {
              libelle: "Reprise garanties clients (N+1)",
              debit: "192 – Provisions pour garanties clients",
              credit: "7911 – Reprises de provisions d'exploitation"
            },
            {
              libelle: "Reprise pertes de change (N+1)",
              debit: "194 – Provisions pour pertes de change",
              credit: "7971 – Reprises de provisions financières"
            },
            {
              libelle: "Reprise impôts H.A.O. (N+1)",
              debit: "195 – Provisions pour impôts",
              credit: "864 – Reprises de provisions H.A.O."
            },
          ],
          commentaire: "Provisions < 1 an : 659/499. Provisions > 1 an : 691 ou 697 / 19. Reprise toujours symétrique au compte de dotation utilisé.",
        },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     CLASSE 2 — COMPTES D'ACTIF IMMOBILISÉ
     Source officielle : Plan Comptable Général OHADA
  ═══════════════════════════════════════════════════════════════ */

  "2": {
    libelle: "Actif Immobilisé",
    classe: "Classe 2",
    nature: "Classe de comptes",
    sens: "Débiteur",
    contenu: "L'actif immobilisé comprend les charges immobilisées et les immobilisations. Les immobilisations représentent les biens et valeurs destinés à rester durablement dans l'entreprise : immobilisations incorporelles, corporelles et financières. Les immobilisations louées par l'entreprise et qui concourent à son exploitation sont également inscrites au bilan. Les immobilisations entièrement amorties demeurent inscrites au bilan aussi longtemps qu'elles subsistent dans l'entreprise.",
    fonctionnement: { credit: [], debit: [] },
    commentaires: "Valeur d'entrée des immobilisations :\n— Bien acquis à titre onéreux : coût d'acquisition (prix d'achat + frais accessoires, hors taxes récupérables)\n— Bien produit par l'entreprise : coût de production (matières + charges directes + charges indirectes rattachables)\n— Bien acquis à titre gratuit : valeur vénale\n— Bien reçu en apport en nature : valeur figurant dans l'acte d'apport\n\nMême en cas d'absence ou d'insuffisance de bénéfice, l'entreprise procède aux amortissements et provisions nécessaires pour que le bilan donne une image fidèle.",
    comptes_lies: ["20","21","22","23","24","25","26","27","28","29"],
    textes_ref: ["Acte Uniforme OHADA — Classe 2 Actif immobilisé"],
    exemples_ecritures: []
  },

  "20": {
    libelle: "Charges immobilisées",
    classe: "Classe 2 — Actif Immobilisé",
    nature: "Compte de bilan (Actif fictif)",
    sens: "Débiteur",
    contenu: "Les charges immobilisées sont des charges à caractère général ayant une incidence sur le résultat de l'entreprise. Elles sont non répétitives et peuvent engendrer soit des économies, soit des gains sur les exercices ultérieures.\n\nLes charges immobilisées constituent des actifs fictifs. Elles figurent à l'actif du bilan et comprennent :\n\nles frais d'établissement : ce sont des dépenses engagées à la constitution de l'entreprise (honoraires, droits d'enregistrement, frais de formalités légales, frais de prospection, frais de publicité et de lancement ... ) ou dans le cadre d'opérations tendant à maintenir ou à promouvoir le développement de l'entreprise (augmentation du capital, restructuration) ;\nles charges à répartir sur plusieurs exercices : ce sont des charges engagées au cours d'un exercice, mais qui concernent également les exercices suivants :\nsoit parce qu'elles se rapportent à une production déterminée à venir pour laquelle les chances de succès commercial et de rentabilité économique sont démontrées ;\nsoit parce qu'elles ont été engendrées :\npar l'émission d'un emprunt (frais d'émission d'emprunts) et peuvent être réparties sur la durée de l'emprunt,\nou par l'acquisition d'une immobilisation ;\nles primes de remboursement des obligations qui se rapportent à des emprunts obligataires à primes.",
    subdivisions: {
      "201":  "Frais d'établissement",
      "2011": "Frais de constitution",
      "2012": "Frais de prospection",
      "2013": "Frais de publicité et de lancement",
      "2014": "Frais de fonctionnement antérieurs au démarrage",
      "2015": "Frais de modification du capital (fusions, scissions, transformations)",
      "2016": "Frais d'entrée à la bourse",
      "2017": "Frais de restructuration",
      "2018": "Frais divers d'établissement",
      "202":  "Charges à répartir sur plusieurs exercices",
      "2021": "Charges différées",
      "2022": "Frais d'acquisition d'immobilisations",
      "2026": "Frais d'émission des emprunts",
      "2028": "Charges à étaler",
      "206":  "Primes de remboursement des obligations",
      "2061": "Obligations ordinaires",
      "2062": "Obligations convertibles",
      "2068": "Autres emprunts obligataires"
    },
    fonctionnement: {
      debit: [
        "Frais à immobiliser ne constituant pas des immobilisations incorporelles, par le crédit du compte 78 – Transferts de charges (charges d'exploitation et financières)",
        "Ou par le crédit du compte 848 – Transferts de charges H.A.O. pour les charges de cette nature",
        "Primes de remboursement des obligations : par le crédit du compte 16 – Emprunts et dettes assimilées (inscription directe)"
      ],
      credit: [
        "Quote-part de la charge imputée à l'exercice (amortissement direct), par le débit du compte 6811 – Dotations aux amortissements des charges immobilisées",
        "Amortissement des primes de remboursement des obligations, par le débit du compte 6872 – Dotations aux amortissements des primes de remboursement des obligations"
      ]
    },
    commentaires: "Les charges immobilisées sont préalablement comptabilisées dans des comptes de charges par nature. En aucun cas elles ne peuvent être portées directement au compte 20, à l'exception des primes de remboursement des obligations (compte 206) qui sont inscrites directement.\n\nL'étalement se réalise par amortissement direct à la clôture de chaque exercice : Débit 6811 / Crédit 20.\n\nLes charges immobilisées doivent être amorties le plus tôt possible : 2 à 5 ans maximum, sauf les primes de remboursement des obligations qui peuvent être réparties sur la durée de l'emprunt.\n\nAucune distribution de bénéfice ne peut intervenir avant amortissement complet des frais d'établissement. En cas de bénéfices suffisants, le plan d'amortissement initial peut ne pas être mené à son terme et la totalité des charges non encore amorties peut être soldée globalement pour permettre la distribution de dividendes.",
    exclusions: {
      texte: "Ne doit pas enregistrer : les charges courantes ne présentant pas le caractère de charges immobilisées, ni les frais de transport/installation/montage à rattacher à la valeur d'entrée des immobilisations.",
      comptes: ["Comptes de la classe 6", "Comptes de la classe 2"]
    },
    controle: [
      "Factures",
      "Justification de leur étalement (plan d'amortissement)",
      "Bons de souscription des obligations"
    ],
    comptes_lies: ["201","202","206","78","848","6811","6872","16"],
    textes_ref: ["SC OHADA — Charges immobilisées et actifs fictifs"],
    exemples_ecritures: [
        {
          libelle: "Immobilisation des frais de constitution",
          debit: "201 – Frais d'établissement",
          credit: "78 – Transferts de charges d'exploitation"
        },
        {
          libelle: "Amortissement annuel des frais d'établissement",
          debit: "6811 – Dotations aux amortissements des charges immobilisées",
          credit: "201 – Frais d'établissement"
        },
        {
          libelle: "Émission d'un emprunt obligataire avec prime",
          debit: "52 – Banques (net) + 206 – Primes de remboursement",
          credit: "161 – Emprunts obligataires (nominal total)"
        },
      ]
  },

  "21": {
    libelle: "Immobilisations incorporelles",
    classe: "Classe 2 — Actif Immobilisé",
    nature: "Compte de bilan (Actif)",
    sens: "Débiteur",
    contenu: "Les immobilisations incorporelles sont des immobilisations immatérielles et tous les autres éléments susceptibles de générer des avantages futurs.\n\nElles ont la nature de biens acquis ou créés par l'entreprise, non pour être vendus ou transformés, mais pour être utilisés de manière durable, directement ou indirectement, pour la réalisation des opérations professionnelles ou non.",
    subdivisions: {
      "211":  "Frais de recherche et de développement",
      "212":  "Brevets, licences, concessions et droits similaires",
      "213":  "Logiciels",
      "214":  "Marques",
      "215":  "Fonds commercial",
      "216":  "Droit au bail",
      "217":  "Investissements de création",
      "218":  "Autres droits et valeurs incorporels",
      "219":  "Immobilisations incorporelles en cours",
      "2191": "Frais de recherche et de développement en cours",
      "2193": "Logiciels en cours",
      "2198": "Autres droits et valeurs incorporels en cours"
    },
    fonctionnement: {
      debit: [
        "Valeur d'apport, d'acquisition ou de création de l'immobilisation incorporelle, par le crédit du compte 10 – Capital",
        "Par le crédit du compte 46 – Associés et Groupe",
        "Par le crédit des comptes de tiers ou de trésorerie",
        "Par le crédit du compte 72 – Production immobilisée (pour les immobilisations créées en interne)"
      ],
      credit: [
        "En cas de cession, disparition, destruction ou mise au rebut : par le débit du compte 81 – Valeurs comptables des cessions d'immobilisations (ou compte 654)",
        "Et/ou par le débit du compte 281 – Amortissements des immobilisations incorporelles, pour solde des amortissements"
      ]
    },
    commentaires: "211 – Frais de recherche et de développement : ne peuvent être immobilisées que les dépenses relatives à des projets nettement individualisés ayant de sérieuses chances de réalisation technique et de rentabilité commerciale. Sont exclus : la recherche fondamentale et les frais de lancement de la production.\n\n212 – Brevets, licences, concessions et droits similaires : dépenses pour obtenir la protection accordée aux inventeurs ou bénéficiaires du droit d'exploitation. Amortissables sur leur durée de vie économique, au maximum égale à la durée de la protection juridique.\n\n213 – Logiciels : droit d'usage, d'adaptation ou de reproduction d'un logiciel acquis, ou coût de production d'un logiciel créé pour les besoins internes.\n\n214 – Marques : coût d'acquisition des marques commerciales ou industrielles. Si la valeur n'est pas pérenne, elles sont à amortir.\n\n215 – Fonds commercial : éléments incorporels non évalués séparément qui concourent au maintien ou développement du potentiel d'activité (clientèle, achalandage, droit au bail, nom commercial, enseigne). Seul le fonds commercial acquis est inscrit à ce compte.\n\n216 – Droit au bail : montant versé ou dû au locataire précédent pour le transfert des droits résultant des conventions ou de la législation sur la propriété commerciale.\n\n217 – Investissements de création : dépenses engagées par les fabricants, producteurs, éditeurs pour l'étude et la production de certains ouvrages (encyclopédies, ouvrages d'art) et frais de collection dans l'industrie textile.\n\n219 – Immobilisations incorporelles en cours : coût de production des brevets, investissements de création et logiciels élaborés en interne, transitant pour la plupart par le compte 211.",
    exclusions: {
      texte: "Ne doit pas enregistrer : les frais d'établissement, les frais de recherche fondamentale, les frais de préexploitation portés en classe 6.",
      comptes: ["201 – Frais d'établissement", "Charges de la classe 6", "20 – Charges immobilisées"]
    },
    controle: [
      "Factures",
      "Promesses d'apport et actes d'acquisition",
      "Récépissés de dépôt de brevets, de marques",
      "Contrats de concession"
    ],
    comptes_lies: ["211","212","213","214","215","216","217","218","219","281","291","72","81","654","10","46"],
    textes_ref: ["SC OHADA — Immobilisations incorporelles"],
    exemples_ecritures: [
        {
          libelle: "Acquisition d'un logiciel",
          debit: "213 – Logiciels",
          credit: "401 – Fournisseurs"
        },
        {
          libelle: "Acquisition d'un brevet",
          debit: "212 – Brevets, licences, concessions",
          credit: "52 – Banques"
        },
        {
          libelle: "Cession d'une immobilisation incorporelle",
          debit: "281 – Amortissements + 811 – V.C.N. H.A.O.",
          credit: "213 – Logiciels (valeur brute)"
        },
      ]
  },

  "22": {
    libelle: "Terrains",
    classe: "Classe 2 — Actif Immobilisé",
    nature: "Compte de bilan (Actif)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre la valeur des terrains dont l'entreprise est propriétaire et de ceux qui sont mis à sa disposition par des tiers.",
    subdivisions: {
      "221":  "Terrains agricoles et forestiers",
      "2211": "Terrains d'exploitation agricole",
      "2212": "Terrains d'exploitation forestière",
      "2218": "Autres terrains agricoles et forestiers",
      "222":  "Terrains nus",
      "2221": "Terrains à bâtir",
      "2228": "Autres terrains nus",
      "223":  "Terrains bâtis",
      "2231": "Pour bâtiments industriels et agricoles",
      "2232": "Pour bâtiments administratifs et commerciaux",
      "2234": "Pour bâtiments affectés aux opérations professionnelles",
      "2235": "Pour bâtiments affectés aux opérations non professionnelles",
      "2238": "Autres terrains bâtis",
      "224":  "Travaux de mise en valeur des terrains",
      "2241": "Plantations d'arbres et d'arbustes",
      "2248": "Autres travaux",
      "225":  "Terrains de gisement",
      "2251": "Carrières",
      "226":  "Terrains aménagés",
      "2261": "Parkings",
      "227":  "Terrains mis en concession",
      "228":  "Autres terrains",
      "2281": "Terrains des immeubles de rapport",
      "2285": "Terrains des logements affectés au personnel",
      "2288": "Autres terrains",
      "229":  "Aménagements de terrains en cours"
    },
    fonctionnement: {
      debit: [
        "Valeur d'apport ou d'acquisition des terrains, par le crédit du compte 10 – Capital",
        "Par le crédit du compte 46 – Associés et Groupe",
        "Ou par le crédit des comptes de tiers et de trésorerie concernés"
      ],
      credit: [
        "En cas de cession : par le débit du compte 81 – Valeurs comptables des cessions d'immobilisations",
        "Et le débit du compte 282 – Amortissements des terrains, pour le montant des amortissements pratiqués sur terrains agricoles ou forestiers et travaux de mise en valeur"
      ]
    },
    commentaires: "Les terrains nus sont des terrains pouvant constituer le sol de bâtiments ou d'ouvrages, sans construction.\n\nLes terrains bâtis sont ceux sur lesquels des constructions sont édifiées. La valeur d'entrée du terrain doit toujours être distinguée de celle du bâtiment correspondant. À défaut de pièces justificatives séparées, la ventilation du prix global peut être effectuée par tous moyens disponibles.\n\nLes terrains de gisement sont des terrains d'extraction de matières destinées aux besoins de l'entreprise ou à la revente.\n\nLes travaux de mise en valeur des terrains (compte 224 : défrichage, drainage, irrigation, nivellement, défonçage, plantations) ne peuvent être isolés et donner lieu à amortissement que s'ils ont été effectués par l'entreprise ou sous ses ordres. Ils excluent tout travail de construction ou de fondation (à inclure dans le coût des bâtiments).",
    exclusions: {
      texte: "Ne doit pas enregistrer les dépenses de construction qui constituent des composantes du coût des bâtiments.",
      comptes: ["23 – Bâtiments, installations techniques et agencements"]
    },
    controle: [
      "Actes d'acquisition",
      "Titres de propriété"
    ],
    comptes_lies: ["221","222","223","224","225","226","227","228","229","282","292","81","10","46"],
    textes_ref: ["SC OHADA — Immobilisations corporelles — Terrains"],
    exemples_ecritures: [
        {
          libelle: "Acquisition d'un terrain nu",
          debit: "222 – Terrains nus",
          credit: "481 – Fournisseurs d'investissements"
        },
        {
          libelle: "Règlement du fournisseur d'immobilisation",
          debit: "481 – Fournisseurs d'investissements",
          credit: "52 – Banques"
        },
        {
          libelle: "Cession d'un terrain",
          debit: "81 – Valeurs comptables des cessions",
          credit: "222 – Terrains nus"
        },
      ]
  },

  "23": {
    libelle: "Bâtiments, installations techniques et agencements",
    classe: "Classe 2 — Actif Immobilisé",
    nature: "Compte de bilan (Actif)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre le montant des opérations ayant trait aux apports effectués par les associés ou à l'acquisition et à la création par l'entreprise de bâtiments, installations et agencements, de même que leur cession, disparition et mise au rebut.",
    subdivisions: {
      "231":  "Bâtiments industriels, agricoles, administratifs et commerciaux sur sol propre",
      "2311": "Bâtiments industriels",
      "2312": "Bâtiments agricoles",
      "2313": "Bâtiments administratifs et commerciaux",
      "2314": "Bâtiments affectés au logement du personnel",
      "2315": "Immeubles de rapport",
      "232":  "Bâtiments industriels agricoles, administratifs et commerciaux sur sol d'autrui",
      "2321": "Bâtiments industriels",
      "2322": "Bâtiments agricoles",
      "2323": "Bâtiments administratifs et commerciaux",
      "2324": "Bâtiments affectés au logement du personnel",
      "2325": "Immeubles de rapport",
      "233":  "Ouvrages d'infrastructure",
      "2331": "Voies de terre",
      "2332": "Voies de fer",
      "2333": "Voies d'eau",
      "2334": "Barrages, digues",
      "2335": "Pistes d'aérodrome",
      "2338": "Autres ouvrages d'infrastructure",
      "234":  "Installations techniques",
      "2341": "Installations complexes spécialisées sur sol propre",
      "2342": "Installations complexes spécialisées sur sol d'autrui",
      "2343": "Installations à caractère spécifique sur sol propre",
      "2344": "Installations à caractère spécifique sur sol d'autrui",
      "235":  "Aménagements de bureaux",
      "2351": "Installations générales",
      "2358": "Autres aménagements",
      "237":  "Bâtiments industriels, agricoles et commerciaux mis en concession",
      "238":  "Autres installations et agencements",
      "239":  "Bâtiments et installations en cours"
    },
    fonctionnement: {
      debit: [
        "Valeur d'apport, d'acquisition ou de création des bâtiments et installations, par le crédit du compte 10 – Capital",
        "Par le crédit du compte 46 – Associés et Groupe ou des comptes de tiers et de trésorerie",
        "Par le crédit du compte 72 – Production immobilisée",
        "Par le crédit du compte 239 – Bâtiments et installations en cours, lorsque les travaux sont terminés"
      ],
      credit: [
        "En cas de cession, disparition, mise au rebut : par le débit du compte 81 – Valeurs comptables des cessions d'immobilisations",
        "Et le débit du compte 283 – Amortissements des bâtiments, installations et agencements, à concurrence des amortissements pratiqués"
      ]
    },
    commentaires: "La valeur des terrains n'est pas comprise dans celle des bâtiments — ils font l'objet d'évaluations distinctes.\n\nSont à inclure dans la valeur des bâtiments :\n— Le coût de la peinture extérieure et intérieure des constructions neuves\n— Le coût de tous les aménagements permanents (chauffage, climatisation, conduites d'eau, gaz, électricité)\n— Le coût du matériel normalement installé avant que le bâtiment soit occupé\n\nLes bâtiments et installations en cours (compte 239) sont ceux non terminés à la clôture mais appartenant déjà à l'entreprise. Après achèvement, ils sont portés au débit des comptes 231 à 238 par le crédit du compte 239. L'amortissement ne peut commencer qu'à partir de la mise en service effective.",
    exclusions: {
      texte: "Ne doit pas enregistrer les biens corporels disparaissant par le premier usage ou d'une durée d'utilisation inférieure à un an (petit outillage).",
      comptes: ["Compte approprié de la classe 6"]
    },
    controle: [
      "Actes d'acquisition",
      "Titres de propriété (titres fonciers)",
      "Factures"
    ],
    comptes_lies: ["231","232","233","234","235","237","238","239","283","293","81","72","10","46"],
    textes_ref: ["SC OHADA — Immobilisations corporelles — Bâtiments"],
    exemples_ecritures: [
        {
          libelle: "Construction d'un bâtiment par un tiers",
          debit: "231 – Bâtiments sur sol propre",
          credit: "481 – Fournisseurs d'investissements"
        },
        {
          libelle: "Dotation aux amortissements du bâtiment (4 %)",
          debit: "6813 – Dotations aux amortissements des immobilisations corporelles",
          credit: "283 – Amortissements des bâtiments"
        },
        {
          libelle: "Cession d'un bâtiment (valeur brute 10 M, amort. 4 M)",
          debit: "283 – Amortissements (4 M) + 812 – V.C.N. (6 M)",
          credit: "231 – Bâtiments (10 M)"
        },
      ]
  },

  "24": {
    libelle: "Matériel",
    classe: "Classe 2 — Actif Immobilisé",
    nature: "Compte de bilan (Actif)",
    sens: "Débiteur",
    contenu: "Le matériel (machines, mobiliers) est constitué par l'ensemble des objets et instruments avec (et ou par) lesquels :\n\nsont extraits, transformés ou façonnés les matières ou fournitures ;\nsont fournis les services qui sont l'objet même de la profession exercée.",
    subdivisions: {
      "241":  "Matériel et outillage industriel et commercial",
      "2411": "Matériel industriel",
      "2412": "Outillage industriel",
      "2413": "Matériel commercial",
      "2414": "Outillage commercial",
      "242":  "Matériel et outillage agricole",
      "2421": "Matériel agricole",
      "2422": "Outillage agricole",
      "243":  "Matériel d'emballage récupérable et identifiable",
      "244":  "Matériel et mobilier",
      "2441": "Matériel de bureau",
      "2442": "Matériel informatique",
      "2443": "Matériel bureautique",
      "2444": "Mobilier de bureau",
      "2446": "Matériel et mobilier des immeubles de rapport",
      "2447": "Matériel et mobilier des logements affectés au personnel",
      "245":  "Matériel de transport",
      "2451": "Matériel automobile",
      "2452": "Matériel ferroviaire",
      "2453": "Matériel fluvial, lagunaire",
      "2454": "Matériel naval",
      "2455": "Matériel aérien",
      "2456": "Matériel hippomobile",
      "2458": "Autres (vélo, mobylette, moto)",
      "246":  "Immobilisations animales et agricoles",
      "2461": "Cheptel, animaux de trait",
      "2462": "Cheptel, animaux reproducteurs",
      "2463": "Animaux de garde",
      "2465": "Plantations agricoles",
      "2468": "Autres immobilisations animales",
      "247":  "Agencements et aménagements du matériel",
      "248":  "Autres matériels",
      "2481": "Collections et oeuvres d'art",
      "249":  "Matériel en cours"
    },
    fonctionnement: {
      debit: [
        "Valeur d'apport, d'acquisition ou de création des matériels, par le crédit du compte 10 – Capital",
        "Par le crédit du compte 46 – Associés et Groupe ou des comptes de tiers et de trésorerie",
        "Par le crédit du compte 72 – Production immobilisée",
        "Par le crédit du compte 249 – Matériel en cours, lorsque achevés"
      ],
      credit: [
        "En cas de cession, disparition, mise au rebut : par le débit du compte 284 – Amortissements du matériel, à concurrence des amortissements pratiqués",
        "Et le débit du compte 81 – Valeurs comptables des cessions d'immobilisations (ou 654) pour le solde (valeur nette comptable)"
      ]
    },
    commentaires: "Les matériels d'emballage récupérables sont destinés à être utilisés durablement comme instrument de travail.\n\nLa remise à neuf et les transformations importantes des matériels sont comptabilisées avec les matériels eux-mêmes, si ces travaux entraînent une augmentation de leur durée de vie initiale ou une meilleure adaptation aux exigences de la production.\n\n245 – Matériel de transport : véhicules et appareils servant au transport des biens et des personnes. Les transformations, améliorations et frais annexes d'achat de matériels d'occasion y sont rattachés.\n\n246 – Immobilisations animales et agricoles : animaux de trait, reproducteurs, de garde, et plantations. Ne comprend pas les animaux achetés ou élevés pour être commercialisés (qui font partie du stock — classe 3).\n\n2443 – Matériel bureautique : ardoises électroniques, écrans et progiciels de substitution au papier, matériel de téléconférence, messagerie vocale, modems de communication, etc.",
    exclusions: {
      texte: "Ne doit pas enregistrer les biens corporels disparaissant par le premier usage, d'une durée de vie inférieure à un an, ou de très faible valeur.",
      comptes: ["Comptes de la classe 6"]
    },
    controle: [
      "Factures",
      "Inventaires physiques",
      "Documents de circulation (cartes grises, livrets de bord)",
      "Recoupements avec les assurances payées et les taxes sur matériels roulants"
    ],
    comptes_lies: ["241","242","243","244","245","246","247","248","249","284","294","81","72","10","46"],
    textes_ref: ["SC OHADA — Immobilisations corporelles — Matériel"],
    exemples_ecritures: [
        {
          libelle: "Acquisition d'un véhicule",
          debit: "2451 – Matériel automobile",
          credit: "481 – Fournisseurs d'investissements"
        },
        {
          libelle: "Amortissement annuel du véhicule (20 %)",
          debit: "6813 – Dotations aux amortissements",
          credit: "2845 – Amortissements du matériel de transport"
        },
        {
          libelle: "Mise au rebut d'un matériel totalement amorti",
          debit: "284 – Amortissements (solde) + 812 – V.C.N. (0)",
          credit: "2451 – Matériel automobile (valeur brute)"
        },
      ]
  },

  "25": {
    libelle: "Avances et acomptes versés sur immobilisations",
    classe: "Classe 2 — Actif Immobilisé",
    nature: "Compte de bilan (Actif)",
    sens: "Débiteur",
    contenu: "Sommes versées par l'entreprise à des tiers pour des commandes en cours d'immobilisations. Le solde de ce compte représente la créance de l'entreprise sur ses fournisseurs d'immobilisations.",
    subdivisions: {
      "251": "Avances et acomptes versés sur immobilisations incorporelles",
      "252": "Avances et acomptes versés sur immobilisations corporelles"
    },
    fonctionnement: {
      debit: [
        "Montant des sommes versées aux fournisseurs d'immobilisations à la commande ou en cours d'exécution des contrats, par le crédit des comptes de trésorerie"
      ],
      credit: [
        "Pour solde à la réception de la facture définitive du fournisseur, par le débit du compte d'immobilisation concerné (classe 2)"
      ]
    },
    commentaires: "Les avances et acomptes sont des versements effectués au profit des fournisseurs d'immobilisations au moment des commandes ou au cours de l'exécution des contrats. Selon que ces sommes ont pour objet l'acquisition d'une immobilisation incorporelle ou corporelle, elles sont portées dans les comptes appropriés (251 ou 252).",
    exclusions: {
      texte: "Ne doit pas enregistrer les en-cours d'immobilisation (travaux non terminés), ni les avances sur d'autres biens que les immobilisations.",
      comptes: ["Comptes appropriés de la classe 2 (en-cours)", "48 – Créances et dettes H.A.O.", "40 – Fournisseurs et comptes rattachés"]
    },
    controle: [
      "Chèques et relevés bancaires",
      "Factures",
      "Versements effectués"
    ],
    comptes_lies: ["251","252","295","21","22","23","24","40","48"],
    textes_ref: ["SC OHADA — Avances sur immobilisations"],
    exemples_ecritures: [
        {
          libelle: "Versement d'un acompte à un fournisseur d'immobilisation",
          debit: "252 – Avances sur immobilisations corporelles",
          credit: "52 – Banques"
        },
        {
          libelle: "Réception de la facture définitive — soldage de l'acompte",
          debit: "231 – Bâtiments (montant total)",
          credit: "252 – Avances (acompte) + 481 – Fournisseurs (solde)"
        },
      ]
  },

  "26": {
    libelle: "Titres de participation",
    classe: "Classe 2 — Actif Immobilisé",
    nature: "Compte de bilan (Actif)",
    sens: "Débiteur",
    contenu: "Les titres de participation sont constitués par les droits dans le capital d'autres entreprises, matérialisés ou non par des titres, afin de créer un lien durable avec celles-ci et de contribuer à l'activité et au développement de la société détentrice.",
    subdivisions: {
      "261": "Titres de participation dans des sociétés sous contrôle exclusif",
      "262": "Titres de participation dans des sociétés sous contrôle conjoint",
      "263": "Titres de participation dans des sociétés conférant une influence notable",
      "265": "Participations dans des organismes professionnels",
      "266": "Parts dans des groupements d'intérêt économique (G.I.E.)",
      "268": "Autres titres de participation"
    },
    fonctionnement: {
      debit: [
        "Valeur d'apport ou d'acquisition, par le crédit du compte 10 – Capital",
        "Ou par le crédit des comptes de tiers et de trésorerie concernés",
        "Par le crédit du compte 472 – Versements restant à effectuer sur titres non libérés, pour la partie non libérée"
      ],
      credit: [
        "En cas de cession de titres, par le débit du compte 81 – Valeurs comptables des cessions d'immobilisations"
      ]
    },
    commentaires: "Sont présumés être des titres de participation : les titres acquis par OPA ou OPE, et les titres représentant au moins 10% du capital social d'une entreprise.\n\nDegrés de contrôle :\n— Contrôle exclusif (261) : détention directe ou indirecte conférant la majorité des droits de vote, ou fraction > 40% sans autre associé dominant\n— Contrôle conjoint (262) : partage du contrôle entre un nombre limité d'associés, décisions par commun accord\n— Influence notable (263) : détention directe ou indirecte d'au moins 1/5e (20%) des droits de vote\n\nLes titres de participation figurent à l'actif pour leur coût d'acquisition (montant brut), majoré des frais accessoires d'achat.\n\nEn cas de libération partielle, la part non libérée est inscrite au compte 472 – Versements restant à effectuer sur titres non libérés.\n\n266 – Parts dans des G.I.E. : enregistre les prises et cessions de parts sociales dans les groupements d'intérêt économique, à l'exclusion des avances aux G.I.E. (compte 2774).",
    exclusions: {
      texte: "Ne doit pas enregistrer les titres de placement ni les titres immobilisés.",
      comptes: ["50 – Titres de placement", "274 – Titres immobilisés"]
    },
    controle: [
      "Bons de souscription",
      "Ordres d'achat et de vente en Bourse"
    ],
    comptes_lies: ["261","262","263","265","266","268","296","472","81","10","50","274"],
    textes_ref: ["SC OHADA — Titres de participation", "AUSC — Définition du contrôle et de l'influence notable"],
    exemples_ecritures: [
        {
          libelle: "Acquisition de titres de participation (10 % d'une filiale)",
          debit: "261 – Titres de participation (contrôle exclusif)",
          credit: "52 – Banques"
        },
        {
          libelle: "Cession partielle des titres de participation",
          debit: "52 – Banques (prix de cession)",
          credit: "261 – Titres de participation + 826 ou 77 (résultat)"
        },
        {
          libelle: "Provision pour dépréciation de titres de participation",
          debit: "697 – Dotations aux provisions financières",
          credit: "296 – Provisions pour dépréciation des titres de participation"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 48",
          titre: "Acquisition d'un portefeuille de titres diversifié",
          enonce: "Commission 1,5 %. 05/06 : 5 000 actions SICAV cotées à 12 000 F (placement CT). 09/06 : 2 500 actions non cotées, 80 % du capital à 16 000 F (participation). 16/06 : 1 500 obligations durables à 20 000 F (TIAP).",
          ecritures: [
            {
              libelle: "05/06 — Acquisition SICAV (placement court terme)",
              debit: "5022 – Actions cotées : 60 000 000 + 5026 – Frais acquisition : 900 000",
              credit: "521 – Banques : 60 900 000"
            },
            {
              libelle: "09/06 — Prise de participation (contrôle exclusif 80 %)",
              debit: "261 – Titres participation contrôle exclusif : 40 600 000",
              credit: "521 – Banques : 40 600 000"
            },
            {
              libelle: "16/06 — Titres immobilisés de portefeuille (TIAP)",
              debit: "2741 – TIAP : 30 450 000",
              credit: "521 – Banques : 30 450 000"
            },
          ],
          commentaire: "Frais acquisition titres participation inclus dans 261. Pour titres placement : 5026 ou 6311. La nature de l'intention détermine le classement.",
        },
        {
          ref: "App. 49",
          titre: "Versement restant à effectuer sur titres non libérés",
          enonce: "Entité A souscrit 20 000 actions B (nominal 10 000 F, prime 2 000 F), libérées à 50 % le 01/05/N. Frais 1 000 000 F. Libération solde le 08/11/N.",
          ecritures: [
            {
              libelle: "01/05/N — Souscription avec libération 50 %",
              debit: "2746 – Titres immobilisés : 241 000 000 + 472 – Versements restant : 100 000 000",
              credit: "521 – Banques : 141 000 000"
            },
            {
              libelle: "08/11/N — Libération de la deuxième moitié",
              debit: "472 – Versements restant à effectuer : 100 000 000",
              credit: "521 – Banques : 100 000 000"
            },
          ],
        },
    ],
  },

  "27": {
    libelle: "Autres immobilisations financières",
    classe: "Classe 2 — Actif Immobilisé",
    nature: "Compte de bilan (Actif)",
    sens: "Débiteur",
    contenu: "Les autres immobilisations financières comprennent :\n\nles titres autres que les titres de participation, que l'entreprise n'a ni l'intention, ni la possibilité de revendre dans un bref délai ;\nles prêts nés en vertu de dispositions contractuelles ;\nles créances non commerciales assimilées à des prêts (dépôts et cautionnements).",
    subdivisions: {
      "271":  "Prêts et créances non commerciales",
      "2711": "Prêts participatifs",
      "2712": "Prêts aux associés",
      "2713": "Billets de fonds",
      "2714": "Titres prêtés",
      "272":  "Prêts au personnel",
      "2721": "Prêts immobiliers",
      "2722": "Prêts mobiliers et d'installation",
      "2728": "Autres prêts (frais d'études)",
      "273":  "Créances sur l'État",
      "2731": "Retenues de garantie",
      "2733": "Fonds réglementé",
      "2738": "Autres créances sur l'État",
      "274":  "Titres immobilisés",
      "2741": "Titres immobilisés de l'activité de portefeuille (T.I.A.P.)",
      "2742": "Titres participatifs",
      "2743": "Certificats d'investissement",
      "2744": "Parts de fonds commun de placement (F.C.P.)",
      "2748": "Autres titres immobilisés",
      "275":  "Dépôts et cautionnements versés",
      "2751": "Dépôts pour loyers d'avance",
      "2752": "Dépôts pour l'électricité",
      "2753": "Dépôts pour l'eau",
      "2754": "Dépôts pour le gaz",
      "2755": "Dépôts pour le téléphone, le télex, la télécopie",
      "2756": "Cautionnements sur marchés publics",
      "2757": "Cautionnements sur autres opérations",
      "2758": "Autres dépôts et cautionnements",
      "276":  "Intérêts courus",
      "2761": "Sur prêts et créances non commerciales",
      "2762": "Sur prêts au personnel",
      "2763": "Sur créances sur l'État",
      "2764": "Sur titres immobilisés",
      "2765": "Sur dépôts et cautionnements versés",
      "2767": "Sur créances rattachées à des participations",
      "2768": "Sur immobilisations financières diverses",
      "277":  "Créances rattachées à des participations et avances à des G.I.E.",
      "2771": "Créances rattachées à des participations (groupe)",
      "2772": "Créances rattachées à des participations (hors groupe)",
      "2773": "Créances rattachées à des sociétés en participation",
      "2774": "Avances à des groupements d'intérêt économique (G.I.E.)",
      "278":  "Immobilisations financières diverses",
      "2781": "Créances diverses hors groupe",
      "2782": "Créances diverses groupe",
      "2785": "Or et métaux précieux"
    },
    fonctionnement: {
      debit: [
        "Valeur d'apport ou d'acquisition des titres, montant des prêts accordés, créances nées, dépôts et cautionnements versés, par le crédit des comptes de tiers et de trésorerie concernés",
        "Partie non libérée des titres immobilisés, par le crédit du compte 472 – Versements restant à effectuer sur titres non libérés"
      ],
      credit: [
        "Lors du règlement ou en cas de cession de titres, par le débit des comptes de trésorerie ou de tiers intéressés"
      ]
    },
    commentaires: "Les dépôts (compte 275) sont des sommes versées à certains fournisseurs (gaz, eau, électricité) ou prestataires (téléphone, bailleur) pour garantir le paiement des redevances ou des loyers. Les cautionnements garantissent la bonne fin d'exécution d'un marché ou d'une opération. Ils sont remboursés lors du dénouement.\n\nLes créances rattachées à des participations (compte 277) sont des prêts ou avances consentis à une société qui est une participation de l'entreprise.\n\nLes prêts et créances ne sont pas distingués par terme d'exigibilité dans les comptes courants, mais à la clôture, la partie exigible à un an ou moins est isolée dans le tableau d'échéances des créances et dettes.\n\nLes prêts assortis d'une garantie (nantissement, hypothèque, dépôt de titres, caution bancaire, gages) doivent être mentionnés dans l'État annexé.",
    exclusions: {
      texte: "Ne doit pas enregistrer les titres de participation, les titres de placement, ni les frais accessoires d'achat de titres (impôts, courtages, commissions, honoraires) sauf pour les T.I.A.P. (compte 2741).",
      comptes: ["26 – Titres de participation", "50 – Titres de placement", "Comptes concernés de la classe 6"]
    },
    controle: [
      "Contrats de prêts, reçus des dépôts et cautionnements",
      "Souscriptions de titres, certificats de propriété",
      "Reconnaissances de dettes de tiers, virements bancaires"
    ],
    comptes_lies: ["271","272","273","274","275","276","277","278","297","472","26","50"],
    textes_ref: ["SC OHADA — Autres immobilisations financières"],
    exemples_ecritures: [
        {
          libelle: "Versement d'un dépôt de garantie (loyer)",
          debit: "2751 – Dépôts pour loyers d'avance",
          credit: "52 – Banques"
        },
        {
          libelle: "Prêt accordé au personnel",
          debit: "272 – Prêts au personnel",
          credit: "52 – Banques"
        },
        {
          libelle: "Constatation des intérêts courus sur prêts",
          debit: "2761 – Intérêts courus sur prêts",
          credit: "771 – Intérêts de prêts"
        },
      ]
  },

  "28": {
    libelle: "Amortissements",
    classe: "Classe 2 — Actif Immobilisé",
    nature: "Compte de bilan (Actif — valeur négative en déduction des immobilisations brutes)",
    sens: "Créditeur",
    contenu: "L'amortissement est la constatation comptable obligatoire de l'amoindrissement de la valeur des immobilisations qui se déprécient de façon certaine et irréversible avec le temps, l'usage ou en raison du changement de techniques, de l'évolution des marchés ou de toute autre cause.\n\nIl consiste à répartir le coût du bien sur la durée probable d'utilisation selon un plan prédéfini. Le coût du bien pour l'entreprise s'entend de la différence entre son coût d'entrée et sa valeur résiduelle prévisionnelle. Cette dernière est nulle lorsque la durée probable de vie du bien coïncide avec sa durée d'utilisation dans l'entreprise.\n\nToute modification significative dans l'environnement économique, technique et juridique ou des conditions d'utilisation du bien est susceptible d'entraîner la révision du plan d'amortissement en cours d'exécution.\n\nLes amortissements sont inscrits distinctement à l'actif en diminution de la valeur brute des biens correspondants pour donner leur valeur comptable nette.",
    subdivisions: {
      "281":  "Amortissements des immobilisations incorporelles",
      "2811": "Amortissements des frais de recherche et de développement",
      "2812": "Amortissements des brevets, licences, concessions et droits similaires",
      "2813": "Amortissements des logiciels",
      "2814": "Amortissements des marques",
      "2815": "Amortissements du fonds commercial",
      "2816": "Amortissements du droit au bail",
      "2817": "Amortissements des investissements de création",
      "2818": "Amortissements des autres droits et valeurs incorporels",
      "282":  "Amortissements des terrains",
      "2821": "Amortissements des terrains agricoles et forestiers",
      "2824": "Amortissements des travaux de mise en valeur des terrains",
      "2825": "Amortissements des terrains de gisement",
      "283":  "Amortissements des bâtiments, installations techniques et agencements",
      "2831": "Amortissements des bâtiments sur sol propre",
      "2832": "Amortissements des bâtiments sur sol d'autrui",
      "2833": "Amortissements des ouvrages d'infrastructure",
      "2834": "Amortissements des installations techniques",
      "2835": "Amortissements des aménagements de bureaux",
      "2837": "Amortissements des bâtiments mis en concession",
      "2838": "Amortissements des autres installations et agencements",
      "284":  "Amortissements du matériel",
      "2841": "Amortissements du matériel et outillage industriel et commercial",
      "2842": "Amortissements du matériel et outillage agricole",
      "2843": "Amortissements du matériel d'emballage récupérable",
      "2844": "Amortissements du matériel et mobilier",
      "2845": "Amortissements du matériel de transport",
      "2846": "Amortissements des immobilisations animales et agricoles",
      "2847": "Amortissements des agencements et aménagements du matériel",
      "2848": "Amortissements des autres matériels"
    },
    fonctionnement: {
      credit: [
        "En fin d'exercice : annuité d'amortissement (dotation), par le débit du compte 681 – Dotations aux amortissements d'exploitation",
        "Ou par le débit du compte 85 – Dotations H.A.O. pour amortissements exceptionnels"
      ],
      debit: [
        "En cas de cession d'immobilisation : annulation des amortissements relatifs à l'immobilisation cédée, par le crédit du compte d'immobilisation concerné (classe 2)",
        "Reprise d'amortissements en cas de révision du plan, par le crédit du compte 798 – Reprises d'amortissements",
        "Ou par le crédit du compte 862 – Reprises d'amortissements H.A.O."
      ]
    },
    commentaires: "L'amortissement est calculé selon les usages de la profession pour amortir chaque catégorie d'immobilisations sur la durée normale d'utilisation. Les annuités peuvent être adaptées aux conditions d'exploitation (unités de mesure : tonnage, heures de fonctionnement, etc.).\n\nToute modification significative de l'environnement économique, technique ou juridique peut entraîner la révision du plan d'amortissement. La correction doit être révélée et quantifiée, avec indication des raisons.\n\nSi la durée d'utilisation du bien dans l'entreprise est nettement inférieure à sa durée probable de vie, une valeur résiduelle raisonnable est déduite pour le calcul de la base amortissable.\n\nFacteurs influençant le taux d'amortissement : travail en équipes tournantes (double ou triple), désuétude potentielle due aux changements technologiques, obsolescence due aux variations de la demande.\n\nLes amortissements doivent être pratiqués à la clôture de chaque exercice, même en cas d'absence ou d'insuffisance de bénéfice.",
    exclusions: {
      texte: "Ne doit pas enregistrer l'amortissement des frais d'établissement, charges à répartir et primes de remboursement des obligations (amortissement direct par le crédit du compte 20).",
      comptes: ["20 – Charges immobilisées (crédité pour amortissement direct)"]
    },
    controle: [
      "Tableaux d'amortissement par immobilisation"
    ],
    comptes_lies: ["281","282","283","284","681","85","798","862","21","22","23","24"],
    textes_ref: ["SC OHADA — Amortissements des immobilisations"],
    exemples_ecritures: [
        {
          libelle: "Dotation aux amortissements d'un bâtiment (fin d'exercice)",
          debit: "681 – Dotations aux amortissements d'exploitation",
          credit: "283 – Amortissements des bâtiments"
        },
        {
          libelle: "Dotation aux amortissements du matériel",
          debit: "681 – Dotations aux amortissements d'exploitation",
          credit: "284 – Amortissements du matériel"
        },
        {
          libelle: "Sortie des amortissements lors d'une cession",
          debit: "284 – Amortissements du matériel",
          credit: "24 – Matériel (valeur brute)"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 13",
          titre: "Amortissement dégressif à taux décroissant",
          enonce: "Machine-outil acquise le 01/01/N, coût 550 000 F, valeur résiduelle 50 000 F, durée 5 ans. Base amortissable = 500 000 F. Taux : 5/15, 4/15, 3/15, 2/15, 1/15.",
          tableau: [
            { date: "31/12/N", taux: "5/15", annuite: 166667, cumul: 166667, vcn: 383333 },
            { date: "31/12/N+1", taux: "4/15", annuite: 133333, cumul: 300000, vcn: 250000 },
            { date: "31/12/N+2", taux: "3/15", annuite: 100000, cumul: 400000, vcn: 150000 },
            { date: "31/12/N+3", taux: "2/15", annuite: 66667, cumul: 466667, vcn: 83333 },
            { date: "31/12/N+4", taux: "1/15", annuite: 33333, cumul: 500000, vcn: 50000 },
          ],
          ecritures: [
            {
              libelle: "Dotation exercice N (166 667 F)",
              debit: "6813 – Dotations aux amortissements immob. corporelles",
              credit: "284 – Amortissements du matériel"
            },
          ],
          commentaire: "Formule : annuité = 2V(n+1-p) / n(n+1). Somme des taux = 1. La méthode répartit davantage la charge sur les premières années.",
        },
        {
          ref: "App. 14",
          titre: "Amortissement par unités d'oeuvre",
          enonce: "Même machine (coût 550 000, VR 50 000). Unités fabriquées : N 150 000 / N+1 250 000 / N+2 250 000 / N+3 50 000 / N+4 50 000. Total = 750 000.",
          tableau: [
            { date: "31/12/N", unites: 150000, annuite: 100000, cumul: 100000, vcn: 450000 },
            { date: "31/12/N+1", unites: 250000, annuite: 166667, cumul: 266667, vcn: 283333 },
            { date: "31/12/N+2", unites: 250000, annuite: 166667, cumul: 433334, vcn: 116666 },
            { date: "31/12/N+3", unites: 50000, annuite: 33333, cumul: 466667, vcn: 83333 },
            { date: "31/12/N+4", unites: 50000, annuite: 33333, cumul: 500000, vcn: 50000 },
          ],
          ecritures: [
            {
              libelle: "Dotation exercice N (100 000 F)",
              debit: "6813 – Dotations aux amortissements immob. corporelles",
              credit: "284 – Amortissements du matériel"
            },
          ],
          commentaire: "Annuité = base amortissable x (unités exercice / total unités). Reflète le rythme réel d'utilisation.",
        },
    ],
  },

  "29": {
    libelle: "Provisions pour dépréciation",
    classe: "Classe 2 — Actif Immobilisé",
    nature: "Compte de bilan (Actif — valeur négative en déduction des immobilisations brutes)",
    sens: "Créditeur",
    contenu: "La provision pour dépréciation des immobilisations constate l'amoindrissement probable de la valeur d'un élément d'actif résultant de causes dont les effets ne sont pas jugés irréversibles. Cette provision est constatée par une dotation au compte de résultat.\n\nLes provisions pour dépréciation sont inscrites distinctement à l'actif, en diminution de la valeur brute des biens correspondants pour donner leur valeur comptable nette (V.C.N.).\n\nMême en cas d'absence ou d'insuffisance de bénéfice au cours de l'exercice, il doit être procédé aux provisions nécessaires pour couvrir les dépréciations.",
    subdivisions: {
      "291":  "Provisions pour dépréciation des immobilisations incorporelles",
      "2912": "Provisions pour dépréciation des brevets, licences, concessions",
      "2913": "Provisions pour dépréciation des logiciels",
      "2914": "Provisions pour dépréciation des marques",
      "2915": "Provisions pour dépréciation du fonds commercial",
      "2916": "Provisions pour dépréciation du droit au bail",
      "2917": "Provisions pour dépréciation des investissements de création",
      "2918": "Provisions pour dépréciation des autres droits incorporels",
      "2919": "Provisions pour dépréciation des immobilisations incorporelles en cours",
      "292":  "Provisions pour dépréciation des terrains",
      "293":  "Provisions pour dépréciation des bâtiments, installations et agencements",
      "294":  "Provisions pour dépréciation du matériel",
      "295":  "Provisions pour dépréciation des avances et acomptes versés sur immobilisations",
      "296":  "Provisions pour dépréciation des titres de participation",
      "2961": "Pour titres sous contrôle exclusif",
      "2962": "Pour titres sous contrôle conjoint",
      "2963": "Pour titres conférant une influence notable",
      "2965": "Pour participations dans des organismes professionnels",
      "2966": "Pour parts dans des G.I.E.",
      "2968": "Pour autres titres de participation",
      "297":  "Provisions pour dépréciation des autres immobilisations financières",
      "2971": "Pour prêts et créances non commerciales",
      "2972": "Pour prêts au personnel",
      "2973": "Pour créances sur l'État",
      "2974": "Pour titres immobilisés",
      "2975": "Pour dépôts et cautionnements versés",
      "2977": "Pour créances rattachées à des participations",
      "2978": "Pour créances financières diverses"
    },
    fonctionnement: {
      credit: [
        "Dotation aux provisions : par le débit du compte 691 – Dotations aux provisions d'exploitation",
        "Ou par le débit du compte 697 – Dotations aux provisions financières",
        "Ou par le débit du compte 853 – Dotations aux provisions pour dépréciation H.A.O."
      ],
      debit: [
        "Reprise de provision : par le crédit du compte 791 – Reprises de provisions d'exploitation",
        "Par le crédit du compte 797 – Reprises de provisions financières",
        "Ou par le crédit du compte 863 – Reprises de provisions pour dépréciation H.A.O."
      ]
    },
    commentaires: "Les provisions pour dépréciation résultent de l'évaluation des moins-values constatées sur les éléments d'actif non amortissables (terrains, fonds commercial) ou des dépréciations exceptionnelles des immobilisations amortissables dont le caractère n'est pas définitif.\n\nÉvaluation des titres à la clôture :\n— Titres cotés : cours moyen boursier du dernier mois\n— Titres non cotés : valeur probable de négociation\n\nRègle de non-compensation : les plus-values sur titres en hausse ne compensent pas les moins-values sur titres en baisse. Toutefois, en cas de baisse anormale et momentanée de certains titres cotés, l'entreprise peut, sous sa responsabilité, inclure tout ou partie de la moins-value dans la provision, dans la mesure d'une compensation avec des plus-values normales constatées sur d'autres titres.\n\nUne provision supplémentaire peut être constituée lors d'événements exceptionnels (faillite, par exemple).\n\nLes provisions doivent être pratiquées à la clôture de l'exercice, même en l'absence de bénéfice, aussi bien sur les immobilisations acquises que sur celles en cours de fabrication.",
    exclusions: {
      texte: "Ne doit pas enregistrer les dépréciations des stocks, des comptes de tiers, ni des comptes de trésorerie.",
      comptes: ["39 – Dépréciations des stocks", "49 – Dépréciations et risques provisionnés (Tiers)", "59 – Dépréciations et risques provisionnés (Trésorerie)"]
    },
    controle: [
      "Rapprochements entre la valeur d'entrée des actifs et leur valeur à la clôture",
      "Factures et documents d'évaluation",
      "Argus (pour les véhicules)",
      "Livre d'inventaire"
    ],
    comptes_lies: ["291","292","293","294","295","296","297","691","697","853","791","797","863"],
    textes_ref: ["SC OHADA — Provisions pour dépréciation des immobilisations"],
    exemples_ecritures: [
        {
          libelle: "Provision pour dépréciation d'un fonds commercial",
          debit: "691 – Dotations aux provisions d'exploitation",
          credit: "2915 – Provisions pour dépréciation du fonds commercial"
        },
        {
          libelle: "Provision pour dépréciation de titres de participation",
          debit: "697 – Dotations aux provisions financières",
          credit: "296 – Provisions pour dépréciation des titres de participation"
        },
        {
          libelle: "Reprise de provision pour dépréciation",
          debit: "29 – Provisions pour dépréciation",
          credit: "791 – Reprises de provisions d'exploitation"
        },
      ]
  },

  /* ═══════════════════════════════════════════════════════════════
     CLASSE 3 — COMPTES DE STOCKS
  ═══════════════════════════════════════════════════════════════ */

  "3": {
    libelle: "Stocks",
    classe: "Classe 3",
    nature: "Classe de comptes",
    sens: "Débiteur",
    contenu: "Les stocks sont formés de l'ensemble des marchandises, matières premières et fournitures liées, produits intermédiaires, produits finis ainsi que des produits et services en cours qui sont la propriété de l'entreprise à la date de l'inventaire.",
    fonctionnement: { debit: [], credit: [] },
    commentaires: "Méthodes d'évaluation des sorties :\n— Coût Moyen Pondéré (C.M.P.)\n— Premier Entré Premier Sorti (P.E.P.S.)\n\nDeux systèmes d'inventaire :\n— Inventaire permanent : connaissance à chaque instant du montant des stocks, du coût des marchandises vendues et des matières engagées dans la fabrication\n— Inventaire intermittent : connaissance des existants uniquement à la clôture, par inventaire extra-comptable\n\nValeur d'entrée en stocks :\n— Biens achetés : coût direct d'achat (prix CAF + frais accessoires, sous déduction des RRR, hors taxes récupérables)\n— Produits fabriqués : coût de production\n— Déchets, rebuts et produits de récupération : cours du jour ou valeur probable de réalisation",
    comptes_lies: ["31","32","33","34","35","36","37","38","39"],
    textes_ref: ["Acte Uniforme OHADA portant organisation et harmonisation des comptabilités des entreprises — Classe 3"],
    exemples_ecritures: []
  },

  "31": {
    libelle: "Marchandises",
    classe: "Classe 3 — Stocks",
    nature: "Compte de bilan (Actif circulant)",
    sens: "Débiteur",
    contenu: "Les marchandises sont les objets, matières et fournitures, acquis par l'entreprise et destinés à être revendus en l'état.",
    subdivisions: {
      "311":  "Marchandises A",
      "3111": "Marchandises A1",
      "3112": "Marchandises A2",
      "312":  "Marchandises B",
      "3121": "Marchandises B1",
      "3122": "Marchandises B2",
      "318":  "Marchandises hors activités ordinaires (H.A.O.)"
    },
    fonctionnement: {
      debit: [
        "Inventaire intermittent — clôture : stock final constaté par inventaire extra-comptable (méthode P.E.P.S. ou C.M.P.), par le crédit du compte 6031 – Variations des stocks de marchandises",
        "Inventaire permanent — entrée en stock : coût des marchandises achetées (prix d'achat + frais accessoires), par le crédit du compte 6031",
        "Inventaire permanent — clôture : différences en plus constatées par rapport à l'inventaire permanent, par le crédit du compte 6031"
      ],
      credit: [
        "Inventaire intermittent — clôture : stock initial soldé, par le débit du compte 6031",
        "Inventaire permanent — sortie de stock : coût des marchandises vendues calculé selon P.E.P.S. ou C.M.P., par le débit du compte 6031",
        "Inventaire permanent — clôture : différences en moins constatées par rapport à l'inventaire permanent, par le débit du compte 6031"
      ]
    },
    commentaires: "Le compte 31 est subdivisé selon les besoins de l'entreprise, conformément à la nomenclature des biens et services en usage dans chaque État-partie.\n\nLes marchandises H.A.O. (compte 318) ne sont distinguées que si leur montant est supérieur à 5 % du total de l'actif circulant.",
    exclusions: {
      texte: "Ne doit pas enregistrer les achats de matières premières et fournitures destinés à être incorporés dans la fabrication.",
      comptes: ["32 – Matières premières et fournitures liées"]
    },
    controle: ["Inventaire extra-comptable", "Factures d'achats et de frais accessoires"],
    comptes_lies: ["311","312","318","391","6031","601"],
    textes_ref: ["SC OHADA — Compte 31 Marchandises"],
    exemples_ecritures: [
        {
          libelle: "Constatation du stock final (inventaire intermittent)",
          debit: "31 – Marchandises (stock final)",
          credit: "6031 – Variations des stocks de marchandises"
        },
        {
          libelle: "Solde du stock initial (inventaire intermittent)",
          debit: "6031 – Variations des stocks de marchandises",
          credit: "31 – Marchandises (stock initial)"
        },
        {
          libelle: "Entrée en stock (inventaire permanent)",
          debit: "31 – Marchandises",
          credit: "6031 – Variations des stocks de marchandises"
        },
      ]
  },

  "32": {
    libelle: "Matières premières et fournitures liées",
    classe: "Classe 3 — Stocks",
    nature: "Compte de bilan (Actif circulant)",
    sens: "Débiteur",
    contenu: "Les matières premières et fournitures liées sont les objets, matières et fournitures achetés pour être incorporés aux produits fabriqués.",
    subdivisions: {
      "321": "Matières A",
      "322": "Matières B",
      "323": "Fournitures (A, B)"
    },
    fonctionnement: {
      debit: [
        "Inventaire intermittent — clôture : stock final (méthode P.E.P.S. ou C.M.P.), par le crédit du compte 6032 – Variations des stocks de matières premières et fournitures liées",
        "Inventaire permanent — entrée en stock : coût d'acquisition (prix d'achat + frais accessoires), par le crédit du compte 6032",
        "Inventaire permanent — clôture : différences en plus par rapport à l'inventaire permanent, par le crédit du compte 6032"
      ],
      credit: [
        "Inventaire intermittent — clôture : stock initial soldé, par le débit du compte 6032",
        "Inventaire permanent — sortie de stock : coût P.E.P.S. ou C.M.P., par le débit du compte 6032",
        "Inventaire permanent — clôture : différences en moins par rapport à l'inventaire permanent, par le débit du compte 6032"
      ]
    },
    commentaires: "Les matières dites consommables ne font pas partie des « fournitures liées » et sont classées dans le compte 33 – Autres approvisionnements.",
    exclusions: {
      texte: "Ne doit pas enregistrer le matériel de remplacement ou de réserve qui n'est pas encore en service.",
      comptes: ["24 – Matériel"]
    },
    controle: ["Inventaire extra-comptable", "Factures d'achats et de frais accessoires"],
    comptes_lies: ["321","322","323","392","6032","602"],
    textes_ref: ["SC OHADA — Compte 32 Matières premières et fournitures liées"],
    exemples_ecritures: [
        {
          libelle: "Constatation du stock final de matières premières",
          debit: "32 – Matières premières et fournitures liées",
          credit: "6032 – Variations des stocks de matières premières"
        },
        {
          libelle: "Sortie de matières premières en production (inventaire permanent)",
          debit: "6032 – Variations des stocks de matières premières",
          credit: "32 – Matières premières et fournitures liées"
        },
      ]
  },

  "33": {
    libelle: "Autres approvisionnements",
    classe: "Classe 3 — Stocks",
    nature: "Compte de bilan (Actif circulant)",
    sens: "Débiteur",
    contenu: "Les autres approvisionnements sont fabrication ou à l'exploitation, sans des matières, des fournitures acquises entrer dans la composition des par l'entreprise et qui concourent à la produits fabriqués ou traités.",
    subdivisions: {
      "331":  "Matières consommables",
      "332":  "Fournitures d'atelier et d'usine",
      "333":  "Fournitures de magasin",
      "334":  "Fournitures de bureau",
      "335":  "Emballages",
      "3351": "Emballages perdus",
      "3352": "Emballages récupérables non identifiables",
      "3353": "Emballages à usage mixte",
      "3358": "Autres emballages",
      "338":  "Autres matières"
    },
    fonctionnement: {
      debit: [
        "Inventaire intermittent — clôture : stock final (méthode P.E.P.S. ou C.M.P.), par le crédit du compte 6033 – Variations des stocks d'autres approvisionnements",
        "Inventaire permanent — entrée en stock : coût d'acquisition (prix d'achat + frais accessoires), par le crédit du compte 6033",
        "Inventaire permanent — clôture : différences en plus par rapport à l'inventaire permanent, par le crédit du compte 6033"
      ],
      credit: [
        "Inventaire intermittent — clôture : stock initial soldé, par le débit du compte 6033",
        "Inventaire permanent — sortie de stock : coût P.E.P.S. ou C.M.P., par le débit du compte 6033",
        "Inventaire permanent — clôture : différences en moins par rapport à l'inventaire permanent, par le débit du compte 6033"
      ]
    },
    commentaires: "Le compte 33 peut comprendre des pièces de rechange, du petit outillage et, le cas échéant, du matériel mobile dont la destination définitive (immobilisation ou entretien) n'est pas encore connue.",
    exclusions: {
      texte: "Ne doit pas enregistrer le matériel de remplacement ou de réserve qui n'est pas encore en service.",
      comptes: ["24 – Matériel"]
    },
    controle: ["Inventaire extra-comptable", "Factures d'achats et de frais accessoires"],
    comptes_lies: ["331","332","333","334","335","338","393","6033","604"],
    textes_ref: ["SC OHADA — Compte 33 Autres approvisionnements"],
    exemples_ecritures: [
        {
          libelle: "Constatation du stock final d'autres approvisionnements",
          debit: "33 – Autres approvisionnements",
          credit: "6033 – Variations des stocks d'autres approvisionnements"
        },
        {
          libelle: "Consommation de fournitures de bureau (inventaire permanent)",
          debit: "6033 – Variations des stocks d'autres approvisionnements",
          credit: "334 – Fournitures de bureau"
        },
      ]
  },

  "34": {
    libelle: "Produits en cours",
    classe: "Classe 3 — Stocks",
    nature: "Compte de bilan (Actif circulant)",
    sens: "Débiteur",
    contenu: "Les produits en cours sont des biens et services en voie de formation ou de transformation à la clôture de l'exercice.",
    subdivisions: {
      "341":  "Produits en cours",
      "3411": "Produits en cours P1",
      "3412": "Produits en cours P2",
      "342":  "Travaux en cours",
      "3421": "Travaux en cours T1",
      "3422": "Travaux en cours T2",
      "343":  "Produits intermédiaires en cours",
      "3431": "Produits intermédiaires A",
      "3432": "Produits intermédiaires B",
      "344":  "Produits résiduels en cours",
      "3441": "Produits résiduels A",
      "3442": "Produits résiduels B"
    },
    fonctionnement: {
      debit: [
        "Inventaire intermittent — fin d'exercice : montant constaté des en-cours déterminé en comptabilité analytique ou extra-comptable, par le crédit du compte 734 – Variations des stocks de produits en cours",
        "Inventaire permanent — à chaque incorporation de frais dans les en-cours : montant déterminé en comptabilité analytique, par le crédit du compte 734"
      ],
      credit: [
        "Inventaire intermittent — fin d'exercice : montant initial des en-cours soldé, par le débit du compte 734",
        "Inventaire permanent — à chaque sortie des en-cours achevés transférés en produits finis ou intermédiaires au coût de production, par le débit du compte 734"
      ]
    },
    commentaires: "Les produits en cours ne sont pas inscrits à un compte de magasin.\n\nLes travaux en cours (compte 342) concernent des biens d'équipement lourd, immeubles ou constructions à long délai de fabrication, dont la propriété n'est pas encore transférée à l'acheteur.",
    exclusions: {
      texte: "Ne doit pas enregistrer les services en cours.",
      comptes: ["35 – Services en cours"]
    },
    controle: ["Inventaire extra-comptable", "Évaluation des coûts de production"],
    comptes_lies: ["341","342","343","344","394","734"],
    textes_ref: ["SC OHADA — Compte 34 Produits en cours"],
    exemples_ecritures: [
        {
          libelle: "Constatation des produits en cours à la clôture",
          debit: "34 – Produits en cours",
          credit: "734 – Variations des stocks de produits en cours"
        },
        {
          libelle: "Solde des produits en cours de l'exercice précédent",
          debit: "734 – Variations des stocks de produits en cours",
          credit: "34 – Produits en cours"
        },
      ]
  },

  "35": {
    libelle: "Services en cours",
    classe: "Classe 3 — Stocks",
    nature: "Compte de bilan (Actif circulant)",
    sens: "Débiteur",
    contenu: "Les services en cours sont des études et prestations en cours d'exécution, dont la remise définitive à l'acheteur ou au passeur d'ordre n'est pas encore intervenue.",
    subdivisions: {
      "351":  "Études en cours",
      "3511": "Études en cours E1",
      "3512": "Études en cours E2",
      "352":  "Prestations de services en cours",
      "3521": "Prestations de services S1",
      "3522": "Prestations de services S2"
    },
    fonctionnement: {
      debit: [
        "Fin d'exercice : montant constaté des en-cours (déterminé en comptabilité analytique ou extra-comptable), par le crédit du compte 735 – Variations des en-cours de services",
        "Inventaire permanent — à chaque incorporation de frais dans les en-cours, par le crédit du compte 735"
      ],
      credit: [
        "Fin d'exercice : montant des en-cours existant en début d'exercice soldé, par le débit du compte 735",
        "Inventaire permanent — à chaque sortie des en-cours achevés et vendus au coût de production, par le débit du compte 735"
      ]
    },
    commentaires: "Les montants d'études et de prestations déjà engagées et non encore facturées (études d'organisation, transport international, etc.) peuvent être suivis en inventaire permanent ou seulement constatés en inventaire intermittent, selon l'organisation de l'entreprise.",
    exclusions: {
      texte: "Ne doit pas enregistrer les produits en cours.",
      comptes: ["34 – Produits en cours"]
    },
    controle: ["Inventaire extra-comptable", "Évaluation des coûts de production"],
    comptes_lies: ["351","352","395","735"],
    textes_ref: ["SC OHADA — Compte 35 Services en cours"],
    exemples_ecritures: [
        {
          libelle: "Constatation des services (études) en cours à la clôture",
          debit: "35 – Services en cours",
          credit: "735 – Variations des en-cours de services"
        },
        {
          libelle: "Solde des services en cours de l'exercice précédent",
          debit: "735 – Variations des en-cours de services",
          credit: "35 – Services en cours"
        },
      ]
  },

  "36": {
    libelle: "Produits finis",
    classe: "Classe 3 — Stocks",
    nature: "Compte de bilan (Actif circulant)",
    sens: "Débiteur",
    contenu: "Les produits finis sont les produits fabriqués par l'entreprise qui ont atteint le stade final de production. Ils sont destinés à être vendus, loués ou fournis.",
    subdivisions: {
      "361": "Produits finis A",
      "362": "Produits finis B"
    },
    fonctionnement: {
      debit: [
        "Inventaire intermittent — fin d'exercice : stock final évalué au coût réel de production (corps certains) ou P.E.P.S./C.M.P. (biens interchangeables), par le crédit du compte 736 – Variations des stocks de produits finis",
        "Inventaire permanent — entrée en stock : coût de production déterminé par la comptabilité analytique, par le crédit du compte 736",
        "Inventaire permanent — clôture : différences en plus par rapport à l'inventaire permanent, par le crédit du compte 736"
      ],
      credit: [
        "Inventaire intermittent — fin d'exercice : stock initial soldé, par le débit du compte 736",
        "Inventaire permanent — sortie de stock : coût réel (corps certains) ou P.E.P.S./C.M.P. (biens interchangeables), par le débit du compte 736",
        "Inventaire permanent — clôture : différences en moins par rapport à l'inventaire permanent, par le débit du compte 736"
      ]
    },
    commentaires: "Lorsque l'entreprise vend indistinctement des produits achetés et des produits fabriqués en tous points semblables (se distinguant seulement par leur origine), elle peut n'ouvrir qu'un seul compte pour les deux. Les sorties sont alors créditées par le débit du compte 6031 et du compte 736 selon un prorata déterminé sous sa propre responsabilité.",
    exclusions: {
      texte: "Ne doit pas enregistrer les produits intermédiaires fabriqués.",
      comptes: ["37 – Produits intermédiaires et résiduels"]
    },
    controle: ["Inventaire extra-comptable", "Évaluation des coûts de production"],
    comptes_lies: ["361","362","396","736","6031"],
    textes_ref: ["SC OHADA — Compte 36 Produits finis"],
    exemples_ecritures: [
        {
          libelle: "Entrée de produits finis en stock (inventaire permanent)",
          debit: "36 – Produits finis",
          credit: "736 – Variations des stocks de produits finis"
        },
        {
          libelle: "Sortie de produits finis lors d'une vente",
          debit: "736 – Variations des stocks de produits finis",
          credit: "36 – Produits finis"
        },
      ]
  },

  "37": {
    libelle: "Produits intermédiaires et résiduels",
    classe: "Classe 3 — Stocks",
    nature: "Compte de bilan (Actif circulant)",
    sens: "Débiteur",
    contenu: "Les produits intermédiaires sont des produits ayant atteint un stade déterminé de fabrication et disponibles pour des fabrications ultérieures.",
    subdivisions: {
      "371":  "Produits intermédiaires",
      "3711": "Produits intermédiaires A",
      "3712": "Produits intermédiaires B",
      "372":  "Produits résiduels",
      "3721": "Déchets",
      "3722": "Rebuts",
      "3723": "Matières de récupération"
    },
    fonctionnement: {
      debit: [
        "Inventaire intermittent — clôture : stock final de produits intermédiaires (coût réel ou P.E.P.S./C.M.P.), par le crédit du compte 7371 – Variations des stocks de produits intermédiaires",
        "Inventaire intermittent — clôture : valeur estimée du stock final de produits résiduels, par le crédit du compte 7372 – Variations des stocks de produits résiduels",
        "Produits de récupération provenant de la fabrication ou de la mise hors service d'immobilisations (non affectables aux comptes 31, 32 ou 33), par le crédit du compte 7372",
        "Inventaire permanent — entrée en stock : coût de production déterminé par la comptabilité analytique, par le crédit du compte 737"
      ],
      credit: [
        "Inventaire intermittent — clôture : stocks initiaux soldés, par le débit du compte 7371 ou 7372",
        "Inventaire permanent — sortie de stock : coût réel ou P.E.P.S./C.M.P., par le débit du compte 737",
        "Inventaire permanent — clôture : différences en moins par rapport à l'inventaire permanent, par le débit du compte 737"
      ]
    },
    commentaires: "Les produits résiduels comprennent :\n— Déchets et rebuts : résidus de toutes natures impropres à une utilisation ou un écoulement normal\n— Produits de la récupération : matières récupérées à la suite de la mise hors service d'immobilisations\n\nLe compte 372 n'est ouvert que si les déchets et rebuts ne peuvent pas être normalement introduits dans la nomenclature des biens et services de l'entreprise.\n\nLorsque l'entreprise utilise indistinctement un produit intermédiaire fabriqué et une matière achetée identiques, elle peut n'ouvrir qu'un seul compte en créditant les sorties par le débit du compte 7371 et du compte 6032 selon un prorata.",
    exclusions: {
      texte: "Ne doit pas enregistrer les produits en cours (non inscriptibles en compte de magasin), les produits d'immobilisations démontées en attente d'affectation définitive, ni les produits de récupération définitivement affectés à d'autres stocks.",
      comptes: ["34 – Produits en cours", "38 – Stocks en cours de route (en attente)", "31, 32 ou 33 selon affectation définitive"]
    },
    controle: ["Inventaire extra-comptable", "Évaluation des coûts de production des produits concernés"],
    comptes_lies: ["371","372","397","7371","7372","737","6032"],
    textes_ref: ["SC OHADA — Compte 37 Produits intermédiaires et résiduels"],
    exemples_ecritures: [
        {
          libelle: "Entrée de produits intermédiaires en stock",
          debit: "371 – Produits intermédiaires",
          credit: "7371 – Variations des stocks de produits intermédiaires"
        },
        {
          libelle: "Entrée de déchets en stock (valeur estimée)",
          debit: "372 – Produits résiduels",
          credit: "7372 – Variations des stocks de produits résiduels"
        },
      ]
  },

  "38": {
    libelle: "Stocks en cours de route, en consignation ou en dépôt",
    classe: "Classe 3 — Stocks",
    nature: "Compte de bilan (Actif circulant — compte de passage)",
    sens: "Débiteur",
    contenu: "Ce sont des marchandises, matières, fournitures ou produits fabriqués, expédiés par le fournisseur et non encore réceptionnés par l'entreprise ou détenus chez des tiers mais dont l'entreprise est propriétaire.",
    subdivisions: {
      "381":  "Marchandises en cours de route",
      "382":  "Matières premières et fournitures liées en cours de route",
      "383":  "Autres approvisionnements en cours de route",
      "386":  "Produits finis en cours de route",
      "387":  "Stocks en consignation ou en dépôt",
      "3871": "Stocks en consignation",
      "3872": "Stocks en dépôt",
      "388":  "Stocks provenant d'immobilisations mises hors service ou au rebut"
    },
    fonctionnement: {
      debit: [
        "Inventaire intermittent — fin d'exercice : stocks en cours de route à leur coût approché ou standard (le coût réel n'étant pas connu), par le crédit des sous-comptes 603 concernés",
        "Inventaire permanent — stocks non encore réceptionnés (coût approché ou standard), par le crédit des sous-comptes 603 concernés"
      ],
      credit: [
        "Inventaire intermittent — clôture : stocks en cours de route de début d'exercice soldés, par le débit des sous-comptes 603 concernés",
        "Inventaire permanent — dès réception par l'entreprise, le consignataire ou le dépositaire : ventilation dans les comptes de stocks appropriés de la classe 3, par le débit de ces comptes"
      ]
    },
    commentaires: "Le compte 38 est un compte de passage. En inventaire permanent, dès réception, les stocks sont ventilés dans les comptes appropriés (31, 32, 33, 36, etc.).\n\nEn inventaire intermittent, le compte 38 est utilisé exceptionnellement si les stocks ne sont pas encore réceptionnés à la date d'établissement des comptes annuels.\n\nEn fin de période, le détail par catégorie des stocks figurant au bilan dans le compte 38 doit être inscrit dans l'État annexé.",
    exclusions: {
      texte: "Ne doit pas enregistrer les stocks dont l'entreprise a pris possession et pour lesquels elle attend encore les factures d'achat (utiliser les comptes de régularisation à la clôture).",
      comptes: ["Comptes de régularisation (408 – Factures non parvenues) à la clôture"]
    },
    controle: ["Inventaire extra-comptable", "Factures d'achat", "Documents de transport (connaissements, lettres de voiture)"],
    comptes_lies: ["381","382","383","386","387","388","398","603"],
    textes_ref: ["SC OHADA — Compte 38 Stocks en cours de route"],
    exemples_ecritures: [
        {
          libelle: "Stocks en cours de route à la clôture (inventaire intermittent)",
          debit: "381 – Marchandises en cours de route",
          credit: "6031 – Variations des stocks de marchandises"
        },
        {
          libelle: "Réception des marchandises (soldage du compte de passage)",
          debit: "31 – Marchandises",
          credit: "381 – Marchandises en cours de route"
        },
      ]
  },

  "39": {
    libelle: "Dépréciations des stocks",
    classe: "Classe 3 — Stocks",
    nature: "Compte de bilan (Actif — valeur négative, en déduction des stocks bruts)",
    sens: "Créditeur",
    contenu: "Ce sont des dépréciations subies par des stocks de marchandises, de matières, et autres approvisionnements résultant de causes diverses dont les effets ne sont pas jugés irréversibles.",
    subdivisions: {
      "391": "Dépréciations des stocks de marchandises",
      "392": "Dépréciations des stocks de matières premières et fournitures liées",
      "393": "Dépréciations des stocks d'autres approvisionnements",
      "394": "Dépréciations des produits en cours",
      "395": "Dépréciations des services en cours",
      "396": "Dépréciations des stocks de produits finis",
      "397": "Dépréciations des stocks de produits intermédiaires et résiduels",
      "398": "Dépréciations des stocks en cours de route, en consignation ou en dépôt"
    },
    fonctionnement: {
      credit: [
        "Fin d'exercice : dépréciations constatées sur les stocks, par le débit du compte 6593 – Charges provisionnées d'exploitation sur stocks",
        "Ou par le débit du compte 839 – Charges provisionnées H.A.O. (si nature H.A.O.)"
      ],
      debit: [
        "Fin d'exercice : reprises des dépréciations existant en début d'exercice (dont les raisons ont cessé), par le crédit du compte 7593 – Reprises de charges provisionnées d'exploitation sur stocks",
        "Ou par le crédit du compte 849 – Reprises de charges provisionnées H.A.O."
      ]
    },
    commentaires: "Calcul de la provision :\nValeur comptable (coût réel d'achat ou de production selon P.E.P.S. ou C.M.P.) − Valeur actuelle au jour de l'inventaire\n\nValeur actuelle :\n— Marchandises, en-cours et produits finis : valeur probable de réalisation\n— Matières et fournitures : coût d'achat au cours du jour de l'inventaire\n\nRègles importantes :\n— Les éléments détériorés, défraîchis ou démodés doivent faire l'objet d'une provision\n— La provision doit être constituée même si son montant est incertain\n— La provision est obligatoire même en l'absence ou en cas d'insuffisance de bénéfices (principe de prudence)\n— Les événements générateurs survenus après la clôture ne sont pas pris en compte dans l'exercice",
    exclusions: {
      texte: "Ne doit pas enregistrer les provisions pour dépréciation de l'actif immobilisé (classe 2), des clients et comptes rattachés, ni des comptes de trésorerie.",
      comptes: ["29 – Provisions pour dépréciation (actif immobilisé)", "49 – Dépréciations et risques provisionnés (Tiers)", "59 – Dépréciations et risques provisionnés (Trésorerie)"]
    },
    controle: ["Inventaire extra-comptable", "Comparaison valeur comptable / valeur de marché au jour de l'inventaire"],
    comptes_lies: ["391","392","393","394","395","396","397","398","6593","7593","839","849"],
    textes_ref: ["SC OHADA — Compte 39 Dépréciations des stocks"],
    exemples_ecritures: [
        {
          libelle: "Provision pour dépréciation de marchandises",
          debit: "6593 – Charges provisionnées d'exploitation sur stocks",
          credit: "391 – Dépréciations des stocks de marchandises"
        },
        {
          libelle: "Reprise de provision sur stocks devenue sans objet",
          debit: "391 – Dépréciations des stocks de marchandises",
          credit: "7593 – Reprises de charges provisionnées sur stocks"
        },
      ]
  },

  /* ═══════════════════════════════════════════════════════════════
     CLASSE 4 — COMPTES DE TIERS
  ═══════════════════════════════════════════════════════════════ */

  "4": {
    libelle: "Comptes de Tiers",
    classe: "Classe 4",
    nature: "Classe de comptes",
    sens: "Débiteur ou Créditeur selon le solde",
    contenu: "Les comptes de la classe 4 retracent les relations de l'entreprise avec les tiers. Ils servent à comptabiliser les dettes et les créances de l'entreprise, à l'exclusion de celles inscrites dans les comptes de ressources stables et les comptes d'actif immobilisé. Figurent également les comptes de régularisation pour rattacher à un exercice déterminé toutes les charges et produits qui le concernent.",
    fonctionnement: { debit: [], credit: [] },
    commentaires: "Aucune compensation n'est admise au bilan entre les comptes de tiers à solde débiteur et à solde créditeur. Les avances et acomptes versés sur commandes figurent à l'actif ; les avances et acomptes reçus des clients figurent au passif.",
    comptes_lies: ["40","41","42","43","44","45","46","47","48","49"],
    textes_ref: ["Acte Uniforme OHADA — Classe 4 Comptes de tiers"],
    exemples_ecritures: []
  },

  "40": {
    libelle: "Fournisseurs et comptes rattachés",
    classe: "Classe 4 — Comptes de Tiers",
    nature: "Compte de bilan (Passif — dettes d'exploitation)",
    sens: "Créditeur",
    contenu: "Les fournisseurs d'exploitation sont des tiers auxquels l'entreprise a recours pour ses achats de fournitures de toutes natures et de services.",
    subdivisions: {
      "401":  "Fournisseurs, dettes en compte",
      "4011": "Fournisseurs",
      "4012": "Fournisseurs-groupe",
      "4013": "Fournisseurs sous-traitants",
      "4017": "Fournisseurs, retenues de garantie",
      "402":  "Fournisseurs, effets à payer",
      "4021": "Fournisseurs, effets à payer",
      "4022": "Fournisseurs-groupe, effets à payer",
      "4023": "Fournisseurs sous-traitants, effets à payer",
      "408":  "Fournisseurs, factures non parvenues",
      "4081": "Fournisseurs",
      "4082": "Fournisseurs-groupe",
      "4083": "Fournisseurs sous-traitants",
      "4086": "Fournisseurs, intérêts courus",
      "409":  "Fournisseurs débiteurs",
      "4091": "Fournisseurs, avances et acomptes versés",
      "4092": "Fournisseurs-groupe, avances et acomptes versés",
      "4093": "Fournisseurs sous-traitants, avances et acomptes versés",
      "4094": "Fournisseurs, créances pour emballages et matériels à rendre",
      "4098": "Rabais, remises, ristournes et autres avoirs à obtenir"
    },
    fonctionnement: {
      credit: [
        "Montant des factures d'achats de biens ou de prestations, par le débit des comptes de la classe 6 (montant HT hors taxes récupérables) ou de la classe 3 (inventaire permanent)",
        "Par le débit du compte 4094 – Fournisseurs, créances pour emballages et matériels à rendre",
        "Par le débit du compte 445 – État, TVA récupérable"
      ],
      debit: [
        "Avances et acomptes versés aux fournisseurs, par le crédit des comptes de trésorerie ou d'effets à payer",
        "Règlements effectués sur factures, par le crédit des comptes de trésorerie",
        "Factures d'avoir pour retour de marchandises, par le crédit des comptes de la classe 6",
        "Rabais, remises et ristournes hors factures obtenus, par le crédit des comptes de la classe 6 concernés",
        "Escomptes de règlement obtenus des fournisseurs, par le crédit du compte 773 – Escomptes obtenus"
      ]
    },
    commentaires: "Les dettes d'exploitation se caractérisent par le rattachement à ce compte de toutes les opérations le concernant : effets à payer, factures à recevoir à la clôture, intérêts courus, avances et acomptes versés, retenues de garantie.\n\nAucune compensation n'est admise au bilan entre les comptes fournisseurs à solde débiteur et à solde créditeur. Les avances et acomptes versés subsistant à la clôture figurent en clair à l'actif du bilan.\n\nCritères de classification : (1) Responsabilité de l'exécution : fournisseur / sous-traitant / façonnier ; (2) Relations avec l'entreprise : groupe / hors groupe ; (3) Nature de la dette : retenues de garantie, avances, factures à recevoir, emballages à rendre ; (4) Identité du fournisseur (sous-compte individuel) ; (5) Nature de l'agent économique ; (6) Répartition géographique : État-partie / autres États de la Région / hors Région.",
    exclusions: {
      texte: "Ne doit pas enregistrer les fournisseurs d'immobilisations.",
      comptes: ["481 – Fournisseurs d'investissements"]
    },
    controle: ["Factures fournisseurs", "Chèques de règlement", "Effets à payer"],
    comptes_lies: ["401","402","408","409","481","445","773","6","3"],
    textes_ref: ["SC OHADA — Compte 40 Fournisseurs et comptes rattachés"],
    exemples_ecritures: [
        {
          libelle: "Réception d'une facture fournisseur (achat HT + TVA)",
          debit: "601 – Achats de marchandises (HT) + 4452 – TVA récupérable",
          credit: "401 – Fournisseurs"
        },
        {
          libelle: "Règlement du fournisseur par virement",
          debit: "401 – Fournisseurs",
          credit: "52 – Banques"
        },
        {
          libelle: "Escompte de règlement obtenu du fournisseur",
          debit: "401 – Fournisseurs",
          credit: "773 – Escomptes obtenus"
        },
      ]
  },

  "41": {
    libelle: "Clients et comptes rattachés",
    classe: "Classe 4 — Comptes de Tiers",
    nature: "Compte de bilan (Actif — créances d'exploitation)",
    sens: "Débiteur",
    contenu: "Les clients d'exploitation sont des tiers auxquels l'entreprise vend les biens ou services, objet de son activité.",
    subdivisions: {
      "411":  "Clients",
      "4111": "Clients",
      "4112": "Clients-groupe",
      "4114": "Clients, État et collectivités publiques",
      "4115": "Clients, organismes internationaux",
      "4117": "Clients, retenues de garantie",
      "4118": "Clients, dégrèvements de TVA",
      "412":  "Clients, effets à recevoir en portefeuille",
      "4121": "Clients, effets à recevoir",
      "4122": "Clients-groupe, effets à recevoir",
      "4124": "État et collectivités publiques, effets à recevoir",
      "4125": "Organismes internationaux, effets à recevoir",
      "414":  "Créances sur cessions courantes d'immobilisations",
      "4141": "Créances en compte",
      "4142": "Effets à recevoir",
      "415":  "Clients, effets escomptés non échus",
      "416":  "Créances clients litigieuses ou douteuses",
      "4161": "Créances litigieuses",
      "4162": "Créances douteuses",
      "418":  "Clients, produits à recevoir",
      "4181": "Clients, factures à établir",
      "4186": "Clients, intérêts courus",
      "419":  "Clients créditeurs",
      "4191": "Clients, avances et acomptes reçus",
      "4192": "Clients-groupe, avances et acomptes reçus",
      "4194": "Clients, dettes pour emballages et matériels consignés",
      "4198": "Rabais, remises, ristournes et autres avoirs à accorder"
    },
    fonctionnement: {
      debit: [
        "Montant des factures de ventes de biens ou de prestations, par le crédit des comptes de la classe 7 (montant HT)",
        "Par le crédit du compte 4194 – Clients, dettes pour emballages et matériels consignés",
        "Par le crédit du compte 443 – État, TVA facturée"
      ],
      credit: [
        "Avances, acomptes et règlements reçus des clients, par le débit des comptes de trésorerie ou effets à recevoir",
        "Factures d'avoir pour retour de marchandises, par le débit des comptes de la classe 7",
        "Rabais, ristournes et remises accordés hors factures, par le débit des comptes 70 – Ventes",
        "Transfert en créances litigieuses ou douteuses, par le débit du compte 416",
        "Escomptes de règlement accordés, par le débit du compte 673 – Escomptes accordés"
      ]
    },
    commentaires: "Aucune compensation n'est admise au bilan entre les comptes clients à solde débiteur et à solde créditeur. Les avances et acomptes reçus sur commandes en cours figurent au passif du bilan.\n\nCritères de classification : (1) Répartition géographique : État-partie / autres États de la Région / hors Région ; (2) Nature du client : entreprise, particulier, État, collectivité, institution financière ; (3) Relations avec l'entreprise : groupe / hors groupe ; (4) Nature de la créance : avances reçues, factures à établir, créances litigieuses/douteuses, effets à recevoir, emballages consignés ; (5) Identité du client (sous-compte individuel) ; (6) Nature du produit ou service vendu.",
    exclusions: {
      texte: "Ne doit pas enregistrer les créances nées d'opérations autres que la vente de marchandises, biens ou services.",
      comptes: ["485 – Créances sur cessions d'immobilisations"]
    },
    controle: ["Factures clients", "Chèques de règlement", "Effets à recevoir", "Dossiers contentieux", "Relances clients", "Impayés"],
    comptes_lies: ["411","412","414","415","416","418","419","485","443","491","70","673"],
    textes_ref: ["SC OHADA — Compte 41 Clients et comptes rattachés"],
    exemples_ecritures: [
        {
          libelle: "Émission d'une facture de vente (HT + TVA)",
          debit: "411 – Clients",
          credit: "701 – Ventes de marchandises (HT) + 443 – TVA facturée"
        },
        {
          libelle: "Encaissement du règlement client",
          debit: "52 – Banques",
          credit: "411 – Clients"
        },
        {
          libelle: "Transfert d'une créance en créance douteuse",
          debit: "4162 – Créances douteuses",
          credit: "4111 – Clients"
        },
      ]
  },

  "42": {
    libelle: "Personnel",
    classe: "Classe 4 — Comptes de Tiers",
    nature: "Compte de bilan (Passif — dettes salariales / Actif — avances)",
    sens: "Créditeur (en général)",
    contenu: "Le compte Personnel enregistre l'ensemble des opérations qui interviennent entre l'entreprise et les personnes qui lui sont liées par un contrat de travail. Par extension, les opérations qui concernent les représentants du personnel ou les organismes similaires lui sont rattachées.\n\nLe personnel de l'entreprise comprend :\n\nle personnel de direction et d'encadrement, les employés, les ouvriers et les occasionnels indépendamment de leur situation ou de leurs fonctions ;\nles représentants salariés ;\nles associés et les dirigeants de société qui exercent des fonctions techniques ;\nles membres de la famille de l'exploitant exerçant un emploi salarié.",
    subdivisions: {
      "421":  "Personnel, avances et acomptes",
      "4211": "Personnel, avances",
      "4212": "Personnel, acomptes",
      "4213": "Frais avancés et fournitures au personnel",
      "422":  "Personnel, rémunérations dues",
      "423":  "Personnel, oppositions, saisies-arrêts",
      "4231": "Personnel, oppositions",
      "4232": "Personnel, saisies-arrêts",
      "4233": "Personnel, avis à tiers détenteur",
      "424":  "Personnel, œuvres sociales internes",
      "4241": "Assistance médicale",
      "4242": "Allocations familiales",
      "4245": "Organismes sociaux rattachés à l'entreprise",
      "4248": "Autres œuvres sociales internes",
      "425":  "Représentants du personnel",
      "4251": "Délégués du personnel",
      "4252": "Syndicats et comités d'entreprise, d'établissement",
      "4258": "Autres représentants du personnel",
      "426":  "Personnel, participation aux bénéfices",
      "427":  "Personnel-dépôts",
      "428":  "Personnel, charges à payer et produits à recevoir",
      "4281": "Dettes provisionnées pour congés à payer",
      "4286": "Autres charges à payer",
      "4287": "Produits à recevoir"
    },
    fonctionnement: {
      credit: [
        "Rémunérations brutes à payer au personnel (ou au comité d'entreprise), par le débit des comptes 66 – Charges de personnel"
      ],
      debit: [
        "Avances et acomptes faits au personnel, par le crédit des comptes de trésorerie",
        "Rémunérations versées au personnel, par le crédit des comptes de trésorerie",
        "Sommes dues par le personnel, par le crédit des comptes de produits",
        "Versements aux organismes sociaux pour le compte du personnel (cotisations salariales), par le crédit du compte 43 – Organismes sociaux",
        "En cas d'opposition de tiers sur salaires : fraction soumise à saisie versée, par le crédit des comptes de trésorerie"
      ]
    },
    commentaires: "À la clôture de l'exercice, aucune compensation ne doit être effectuée entre les sommes dues au personnel et les montants éventuellement dus par le personnel qui n'auraient pas été retenus sur la dernière paie.",
    exclusions: {
      texte: "Ne doit pas enregistrer les prêts consentis au personnel, ni les opérations en comptes courants des associés et administrateurs pour des mouvements de fonds n'intéressant pas la rémunération de leur travail.",
      comptes: ["272 – Prêts au personnel", "46 – Associés et Groupe"]
    },
    controle: ["Fiches de paie", "Déclarations sociales", "Contrats de prêts", "Procès-verbaux de saisie-arrêt", "Avis à tiers détenteur"],
    comptes_lies: ["421","422","423","424","425","426","427","428","43","66","272","46"],
    textes_ref: ["SC OHADA — Compte 42 Personnel"],
    exemples_ecritures: [
        {
          libelle: "Comptabilisation des salaires bruts",
          debit: "661 – Rémunérations directes versées au personnel national",
          credit: "422 – Personnel, rémunérations dues"
        },
        {
          libelle: "Versement des salaires nets",
          debit: "422 – Personnel, rémunérations dues",
          credit: "52 – Banques"
        },
        {
          libelle: "Avance sur salaire accordée à un employé",
          debit: "4211 – Personnel, avances",
          credit: "57 – Caisse"
        },
      ]
  },

  "43": {
    libelle: "Organismes sociaux",
    classe: "Classe 4 — Comptes de Tiers",
    nature: "Compte de bilan (Passif — dettes sociales)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre, d'une part, le montant des cotisations sociales salariales et patronales dues aux organismes sociaux et, d'autre part, les règlements de cotisations effectués à leur profit.",
    subdivisions: {
      "431":  "Sécurité sociale",
      "4311": "Prestations familiales",
      "4312": "Accidents du travail",
      "4313": "Caisse de retraite obligatoire",
      "4314": "Caisse de retraite facultative",
      "4318": "Autres cotisations sociales",
      "432":  "Caisses de retraite complémentaire",
      "433":  "Autres organismes sociaux",
      "4331": "Mutuelle",
      "438":  "Organismes sociaux, charges à payer et produits à recevoir",
      "4381": "Charges sociales sur gratifications à payer",
      "4382": "Charges sociales sur congés à payer",
      "4386": "Autres charges à payer",
      "4387": "Produits à recevoir"
    },
    fonctionnement: {
      credit: [
        "Cotisations sociales patronales dues, par le débit du compte 664 – Charges sociales (part patronale)",
        "Cotisations salariales dues, par le débit du compte 422 – Personnel, rémunérations dues (part salariale)"
      ],
      debit: [
        "Règlements de cotisations effectués aux organismes sociaux, par le crédit des comptes de trésorerie concernés"
      ]
    },
    commentaires: "Les obligations de l'entreprise vis-à-vis des organismes sociaux sont remplies à partir des procédures comptables définies dans le Système Comptable OHADA.",
    exclusions: {
      texte: "Ne doit pas enregistrer les opérations faites avec les organismes sociaux en tant que clients.",
      comptes: ["41 – Clients et comptes rattachés"]
    },
    controle: ["Fiches de paie", "Bordereaux de déclarations sociales", "Livres de paie"],
    comptes_lies: ["431","432","433","438","422","664"],
    textes_ref: ["SC OHADA — Compte 43 Organismes sociaux"],
    exemples_ecritures: [
        {
          libelle: "Cotisations patronales (charges sociales)",
          debit: "664 – Charges sociales (part patronale)",
          credit: "431 – Sécurité sociale"
        },
        {
          libelle: "Cotisations salariales retenues sur salaire",
          debit: "422 – Personnel, rémunérations dues",
          credit: "431 – Sécurité sociale"
        },
        {
          libelle: "Règlement des cotisations à la caisse sociale",
          debit: "431 – Sécurité sociale",
          credit: "52 – Banques"
        },
      ]
  },

  "44": {
    libelle: "État et Collectivités publiques",
    classe: "Classe 4 — Comptes de Tiers",
    nature: "Compte de bilan (Actif ou Passif selon solde)",
    sens: "Débiteur ou Créditeur",
    contenu: "Les opérations à inscrire à ce compte concernent d'une manière générale les opérations qui sont faites avec l'Etat et avec les diverses collectivités publiques en tant que pouvoirs publics.",
    subdivisions: {
      "441":  "État, impôt sur les bénéfices",
      "442":  "État, autres impôts et taxes",
      "4421": "Impôts et taxes d'État",
      "4422": "Impôts et taxes pour les collectivités publiques",
      "4423": "Impôts et taxes recouvrables sur des obligataires",
      "4424": "Impôts et taxes recouvrables sur des associés",
      "4426": "Droits de douane",
      "4428": "Autres impôts et taxes",
      "443":  "État, TVA facturée",
      "4431": "TVA facturée sur ventes",
      "4432": "TVA facturée sur prestations de services",
      "4433": "TVA facturée sur travaux",
      "4434": "TVA facturée sur production livrée à soi-même",
      "4435": "TVA sur factures à établir",
      "444":  "État, TVA due ou crédit de TVA",
      "4441": "État, TVA due",
      "4449": "État, crédit de TVA à reporter",
      "445":  "État, TVA récupérable",
      "4451": "TVA récupérable sur immobilisations",
      "4452": "TVA récupérable sur achats",
      "4453": "TVA récupérable sur transport",
      "4454": "TVA récupérable sur services extérieurs et autres charges",
      "4455": "TVA récupérable sur factures non parvenues",
      "4456": "TVA transférée par d'autres entreprises",
      "446":  "État, autres taxes sur le chiffre d'affaires",
      "447":  "État, impôts retenus à la source",
      "4471": "Impôt général sur le revenu",
      "4472": "Impôts sur salaires",
      "4473": "Contribution nationale",
      "4474": "Contribution nationale de solidarité",
      "4478": "Autres impôts et contributions",
      "448":  "État, charges à payer et produits à recevoir",
      "4486": "Charges à payer",
      "4487": "Produits à recevoir",
      "449":  "État, créances et dettes diverses",
      "4491": "État, obligations cautionnées",
      "4492": "État, avances et acomptes versés sur impôts",
      "4493": "État, fonds de dotation à recevoir",
      "4494": "État, subventions d'équipement à recevoir",
      "4495": "État, subventions d'exploitation à recevoir",
      "4496": "État, subventions d'équilibre à recevoir",
      "4499": "État, fonds réglementé provisionné"
    },
    fonctionnement: {
      credit: [
        "Constatation des dettes d'impôts envers l'État, par le débit des comptes de charges concernés",
        "Règlement par l'État de sommes dues à l'entreprise, par le débit des comptes de trésorerie"
      ],
      debit: [
        "Versements à l'État lors du règlement des impôts et taxes, par le crédit des comptes de trésorerie",
        "Constatation de la dette de l'État envers l'entreprise (fonds de dotation, subventions), par le crédit des comptes des classes 1 et 4, ou des classes 7 et 8"
      ]
    },
    commentaires: "Les opérations d'achats et de ventes avec l'État et les collectivités publiques s'inscrivent aux comptes 40 – Fournisseurs et 41 – Clients, au même titre que les opérations avec les autres tiers.\n\nLe compte 442 comprend les impôts et taxes d'État et ceux perçus pour le compte des collectivités locales.\n\nMécanisme TVA :\n— 443 (TVA facturée) : TVA collectée sur les ventes → solde créditeur\n— 445 (TVA récupérable) : TVA déductible sur achats → solde débiteur\n— 444 (TVA due) : différence entre TVA collectée et TVA déductible à reverser à l'État",
    exclusions: {
      texte: "Ne doit pas enregistrer les opérations avec l'État en tant que fournisseur ou client, ni les droits de douane faisant partie intégrante du prix d'achat.",
      comptes: ["40 – Fournisseurs et comptes rattachés", "41 – Clients et comptes rattachés", "Comptes de la classe 2 ou 6 concernés"]
    },
    controle: ["Avis d'imposition", "Déclarations fiscales", "Relevés bancaires"],
    comptes_lies: ["441","442","443","444","445","446","447","448","449","64","89"],
    textes_ref: ["SC OHADA — Compte 44 État et collectivités publiques"],
    exemples_ecritures: [
        {
          libelle: "TVA collectée sur ventes",
          debit: "411 – Clients",
          credit: "443 – État, TVA facturée"
        },
        {
          libelle: "TVA déductible sur achats",
          debit: "4452 – TVA récupérable sur achats",
          credit: "401 – Fournisseurs"
        },
        {
          libelle: "Déclaration TVA — versement du solde dû",
          debit: "443 – État, TVA facturée",
          credit: "4452 – TVA récupérable (solde) + 52 – Banques (TVA nette)"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 7",
          titre: "Centralisation de la TVA — déclarations trimestrielles",
          enonce: "T1 : TVA récup. 44 (immob. 15 + achats 18 + transport 11), TVA collectée 60 (ventes 35 + livraisons SOI 6 + services 19). Dû = 16. T4 : récup. 40, collectée 35. Crédit TVA = 5.",
          ecritures: [
            {
              libelle: "T1 — Compensation TVA récupérable",
              debit: "4441 – État, TVA due : 44",
              credit: "4451 : 15 + 4452 : 18 + 4453 : 11"
            },
            {
              libelle: "T1 — Solde TVA collectée",
              debit: "4431 : 35 + 4434 : 6 + 4432 : 19",
              credit: "4441 – État, TVA due : 60"
            },
            {
              libelle: "T1 — Règlement du solde dû (60 – 44 = 16)",
              debit: "4441 – État, TVA due : 16",
              credit: "52 – Banques : 16"
            },
            {
              libelle: "T4 — Crédit de TVA à reporter (40 – 35 = 5)",
              debit: "4449 – État, crédit TVA à reporter : 5",
              credit: "4441 – État, TVA due : 5"
            },
          ],
          commentaire: "Crédit de TVA (compte 4449) = TVA récupérable > TVA collectée. Reportable sur la déclaration suivante ou remboursable sous conditions.",
        },
    ],
  },

  "45": {
    libelle: "Organismes internationaux",
    classe: "Classe 4 — Comptes de Tiers",
    nature: "Compte de bilan (Actif ou Passif selon solde)",
    sens: "Débiteur ou Créditeur",
    contenu: "Les opérations à inscrire à ce compte concernent les dettes et créances autres que celles liées à l'activité de l'entreprise.\n\nElles concernent exclusivement le montant des dépenses dont l'entreprise doit assumer la charge, les dettes des organismes internationaux vis-à-vis de l'entreprise et, d'autre part, les dettes de l'entreprise vis-àvis des organismes internationaux et le règlement par ces derniers des sommes dues à l'entreprise.",
    subdivisions: {
      "451":  "Opérations avec les organismes africains",
      "452":  "Opérations avec les autres organismes internationaux",
      "458":  "Organismes internationaux, fonds de dotation et subventions à recevoir",
      "4581": "Organismes internationaux, fonds de dotation à recevoir",
      "4582": "Organismes internationaux, subventions à recevoir"
    },
    fonctionnement: {
      credit: [
        "Constatation des dettes envers les organismes internationaux, par le débit des comptes de charges concernés",
        "Règlement par les organismes internationaux de sommes dues à l'entreprise, par le débit des comptes de trésorerie"
      ],
      debit: [
        "Dépenses dont l'entreprise assume la charge, par le crédit des comptes de trésorerie lors du règlement",
        "Constatation de la dette des organismes envers l'entreprise (fonds de dotation, subventions), par le crédit des comptes des classes 1 et 4, ou des classes 7 et 8"
      ]
    },
    commentaires: "Les opérations avec les organismes internationaux en tant que fournisseurs ou clients s'inscrivent aux comptes 40 et 41.",
    exclusions: {
      texte: "Ne doit pas enregistrer les opérations avec les organismes internationaux en tant que fournisseurs ou clients.",
      comptes: ["40 – Fournisseurs et comptes rattachés", "41 – Clients et comptes rattachés"]
    },
    controle: ["Relevés bancaires", "Avis de versement", "Avis d'octroi de subventions"],
    comptes_lies: ["451","452","458","40","41"],
    textes_ref: ["SC OHADA — Compte 45 Organismes internationaux"],
    exemples_ecritures: [
        {
          libelle: "Subvention d'équipement à recevoir d'un organisme international",
          debit: "4582 – Organismes internationaux, subventions à recevoir",
          credit: "14 – Subventions d'investissement"
        },
        {
          libelle: "Encaissement de la subvention",
          debit: "52 – Banques",
          credit: "4582 – Organismes internationaux, subventions à recevoir"
        },
      ]
  },

  "46": {
    libelle: "Associés et Groupe",
    classe: "Classe 4 — Comptes de Tiers",
    nature: "Compte de bilan (Actif ou Passif selon solde)",
    sens: "Débiteur ou Créditeur",
    contenu: "Le compte 46 enregistre :\n\nd'une part les créances/dettes envers les associés résultant des divers mouvements du capital social ;\nd'autre part les créances/dettes temporaires en \"comptes courants\".\nEn ce qui concerne ces derniers, le plan de comptes distingue les associés ordinaires et, dans le cas d'appartenance à un groupe, les autres sociétés du groupe.",
    subdivisions: {
      "461":  "Associés, opérations sur le capital",
      "4611": "Associés, apports en nature",
      "4612": "Associés, apports en numéraire",
      "4613": "Actionnaires, capital souscrit appelé non versé",
      "4614": "Associés, capital appelé non versé",
      "4615": "Associés, versements reçus sur augmentation de capital",
      "4616": "Associés, versements anticipés",
      "4617": "Actionnaires défaillants",
      "4618": "Associés, autres apports",
      "4619": "Associés, capital à rembourser",
      "462":  "Associés, comptes courants",
      "4621": "Principal",
      "4626": "Intérêts courus",
      "463":  "Associés, opérations faites en commun",
      "465":  "Associés, dividendes à payer",
      "466":  "Groupe, comptes courants",
      "467":  "Actionnaires, restant dû sur capital appelé"
    },
    fonctionnement: {
      credit: [
        "Sommes dues à titre de dividendes, par le débit des comptes Résultat",
        "Fonds mis ou laissés temporairement à la disposition de la société, par le débit des comptes de trésorerie (ou de charges)"
      ],
      debit: [
        "Sommes réglées au titre des dividendes, par le crédit des comptes de trésorerie (ou des comptes courants)",
        "Fonds prélevés par les associés ou règlements effectués pour leur compte, par le crédit des comptes de trésorerie (ou des comptes de charges)"
      ]
    },
    commentaires: "Sont réputés associés les membres des sociétés de capitaux, de personnes, de fait et en participation.\n\nLes créances/dettes envers les sociétés du groupe autres que celles du compte 466 sont comptabilisées :\n— Aux comptes 40/41 pour les opérations commerciales\n— Aux comptes 16, 18 et 27 pour les opérations financières",
    exclusions: {
      texte: "Ne doit pas enregistrer les emprunts et prêts des associés, ni la dette des associés représentative du capital souscrit non appelé.",
      comptes: ["16 – Emprunts et dettes assimilées", "27 – Autres immobilisations financières", "109 – Actionnaires, capital souscrit non appelé"]
    },
    controle: ["Décisions des Assemblées d'actionnaires"],
    comptes_lies: ["461","462","463","465","466","467","101","109","16","27"],
    textes_ref: ["SC OHADA — Compte 46 Associés et Groupe"],
    exemples_ecritures: [
        {
          libelle: "Dividendes mis en distribution",
          debit: "131 – Résultat net : Bénéfice",
          credit: "465 – Associés, dividendes à payer"
        },
        {
          libelle: "Règlement des dividendes aux associés",
          debit: "465 – Associés, dividendes à payer",
          credit: "52 – Banques"
        },
        {
          libelle: "Apport en compte courant d'un associé",
          debit: "52 – Banques",
          credit: "462 – Associés, comptes courants"
        },
      ]
  },

  "47": {
    libelle: "Débiteurs et créditeurs divers",
    classe: "Classe 4 — Comptes de Tiers",
    nature: "Compte de bilan (Actif ou Passif selon solde)",
    sens: "Débiteur ou Créditeur",
    contenu: "Ce compte enregistre les opérations en instance de régularisation et relatives aux créances et dettes liées à l'acquisition de titres, des charges non consommées, des produits constatés d'avance, des écarts sur opérations libellées en monnaies étrangères, et des créances sur travaux non encore facturables.",
    subdivisions: {
      "471":  "Comptes d'attente",
      "4711": "Débiteurs divers",
      "4712": "Créditeurs divers",
      "472":  "Versements restant à effectuer sur titres non libérés",
      "4726": "Titres de participation",
      "4727": "Titres immobilisés",
      "4728": "Titres de placement",
      "474":  "Répartition périodique des charges et des produits",
      "4746": "Charges",
      "4747": "Produits",
      "475":  "Créances sur travaux non encore facturables",
      "476":  "Charges constatées d'avance",
      "477":  "Produits constatés d'avance",
      "478":  "Écarts de conversion — Actif",
      "4781": "Diminution des créances",
      "4782": "Augmentation des dettes",
      "4788": "Différences compensées par couverture de change",
      "479":  "Écarts de conversion — Passif",
      "4791": "Augmentation des créances",
      "4792": "Diminution des dettes",
      "4798": "Différences compensées par couverture de change"
    },
    fonctionnement: {
      credit: [
        "Dettes contractées ou remboursements de créances, par le débit des comptes de trésorerie",
        "Apports temporaires de l'exploitant, par le débit des comptes de trésorerie",
        "Virements restant à effectuer sur titres non totalement libérés, par le débit du compte 26, 274 ou 50",
        "Clôture — produits constatés d'avance (perçus mais rattachés à l'exercice suivant), par le débit des comptes de produits concernés"
      ],
      debit: [
        "Créances sur les tiers ou remboursements de dettes, par le crédit de comptes de tiers ou de trésorerie",
        "Retraits de l'exploitant, par le crédit d'un compte de trésorerie",
        "Clôture — charges constatées d'avance (payées mais rattachées à l'exercice suivant), par le crédit des comptes de charges concernés"
      ]
    },
    commentaires: "471 – Comptes d'attente : utilisés pour les opérations ne pouvant être imputées immédiatement. Ils doivent être soldés au plus tard à la clôture (sauf impossibilité justifiée dans l'État annexé) et ne doivent pas figurer au bilan.\n\n472 – Titres non libérés : lors de l'acquisition de titres non entièrement libérés, la valeur globale est portée au compte d'actif immobilisé, y compris les montants non encore appelés, lesquels figurent au compte 472.\n\n475 – Créances sur travaux non encore facturables : produits nets partiels sur contrats pluriexercices.\n\n478/479 – Écarts de conversion : constatent, à la clôture, les écarts entre créances et dettes en devises converties en unités monétaires légales et leur évaluation à la date de clôture.",
    exclusions: {
      texte: "Ne doit pas enregistrer les charges imputables au compte Fournisseurs ni les produits imputables au compte Clients.",
      comptes: ["40 – Fournisseurs et comptes rattachés", "41 – Clients et comptes rattachés"]
    },
    controle: ["Contrats", "Conventions", "Décomptes de régularisation", "Chèques", "Relevés de banque"],
    comptes_lies: ["471","472","474","475","476","477","478","479","26","274","50"],
    textes_ref: ["SC OHADA — Compte 47 Débiteurs et créditeurs divers"],
    exemples_ecritures: [
        {
          libelle: "Charge constatée d'avance (assurance payée pour l'exercice suivant)",
          debit: "476 – Charges constatées d'avance",
          credit: "625 – Primes d'assurance"
        },
        {
          libelle: "Produit constaté d'avance (loyer encaissé d'avance)",
          debit: "7073 – Locations",
          credit: "477 – Produits constatés d'avance"
        },
        {
          libelle: "Écart de conversion-actif (perte latente sur créance en devise)",
          debit: "478 – Écarts de conversion-Actif",
          credit: "411 – Clients (en devise réévalué)"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 21",
          titre: "Charges constatées d'avance — fin d'exercice",
          enonce: "Produits entretien non consommés 5, fournitures bureau non consommées 6, prime assurance 4 mois restants = 12, abonnement revue 3 mois restants = 4, intérêts payés d'avance 2 mois = 1. Total CCA = 28.",
          ecritures: [
            {
              libelle: "Charges constatées d'avance (ensemble)",
              debit: "476 – Charges constatées d'avance : 28",
              credit: "6054 : 5 + 6055 : 6 + 6252 : 12 + 6265 : 4 + 6712 : 1"
            },
            {
              libelle: "Marchds facturées non livrées (compte de passage)",
              debit: "381 – Marchandises en cours de route : 20",
              credit: "6031 – Variations des stocks : 20"
            },
          ],
          commentaire: "Les achats facturés mais non livrés ne passent pas par 476 mais par les comptes de stocks en cours de route (381-388).",
        },
        {
          ref: "App. 22",
          titre: "Charges à payer — fin d'exercice",
          enonce: "Marchandises livrées sans facture, salaires et cotisations non encore enregistrés, intérêts courus sur emprunt, impôts estimés.",
          ecritures: [
            {
              libelle: "Factures non parvenues (marchds livrées)",
              debit: "601 – Achats + 4455 – TVA récup. FNP",
              credit: "408 – Fournisseurs, factures non parvenues"
            },
            {
              libelle: "Congés à payer",
              debit: "661 – Rémunérations directes",
              credit: "4281 – Personnel, dettes pour congés à payer"
            },
            {
              libelle: "Cotisations sociales sur congés",
              debit: "664 – Charges sociales",
              credit: "4382 – Organismes sociaux, charges sur congés"
            },
            {
              libelle: "Intérêts courus sur emprunt",
              debit: "671 – Intérêts des emprunts",
              credit: "166 – Intérêts courus"
            },
            {
              libelle: "Impôts estimés non encore connus",
              debit: "641 – Impôts et taxes directs",
              credit: "4486 – État, charges à payer"
            },
          ],
        },
        {
          ref: "App. 23",
          titre: "Produits constatés d'avance",
          enonce: "Loyer trimestriel encaissé le 1er novembre N (3 mois = 30 F). Part N+1 = 10 F (1 mois).",
          ecritures: [
            {
              libelle: "Encaissement du loyer trimestriel d'avance",
              debit: "52 – Banques : 30",
              credit: "7073 – Locations : 30"
            },
            {
              libelle: "31/12/N — Régularisation part N+1",
              debit: "7073 – Locations : 10",
              credit: "477 – Produits constatés d'avance : 10"
            },
          ],
        },
        {
          ref: "App. 24",
          titre: "Produits à recevoir — fin d'exercice",
          enonce: "Intérêts courus sur prêt personnel : 5 F. Prestation réalisée non encore facturée : 80 F.",
          ecritures: [
            {
              libelle: "Intérêts courus sur prêt (non échus)",
              debit: "2762 – Intérêts courus sur prêts personnel : 5",
              credit: "771 – Intérêts de prêts : 5"
            },
            {
              libelle: "Prestation réalisée — facture à établir",
              debit: "4181 – Clients, factures à établir : 80",
              credit: "706 – Services vendus : 80"
            },
          ],
        },
    ],
  },

  "48": {
    libelle: "Créances et dettes hors activités ordinaires",
    classe: "Classe 4 — Comptes de Tiers",
    nature: "Compte de bilan (Actif ou Passif selon solde)",
    sens: "Débiteur ou Créditeur",
    contenu: "Ce sont des créances et des dettes consécutives à des opérations effectuées par l'entreprise mais n'ayant pas de lien direct avec l'activité ordinaire de l'entreprise.",
    subdivisions: {
      "481":  "Fournisseurs d'investissements",
      "4811": "Immobilisations incorporelles",
      "4812": "Immobilisations corporelles",
      "4817": "Retenues de garantie",
      "4818": "Factures non parvenues",
      "482":  "Fournisseurs d'investissements, effets à payer",
      "483":  "Dettes sur acquisitions de titres de placement",
      "484":  "Autres dettes H.A.O.",
      "485":  "Créances sur cessions d'immobilisations",
      "4851": "En compte",
      "4852": "Effets à recevoir",
      "4857": "Retenues de garantie",
      "4858": "Factures à établir",
      "486":  "Créances sur cessions de titres de placement",
      "488":  "Autres créances H.A.O."
    },
    fonctionnement: {
      credit: [
        "Dettes H.A.O. contractées ou remboursements de créances H.A.O., par le débit des comptes de trésorerie ou des comptes de la classe 8"
      ],
      debit: [
        "Créances H.A.O. sur les tiers ou remboursements de dettes H.A.O., par le crédit des comptes de trésorerie ou des comptes de la classe 8"
      ]
    },
    commentaires: "La mise en évidence au bilan des créances et dettes H.A.O. via le compte 48 permet de mesurer directement le besoin ou la ressource de financement H.A.O., en parallèle avec le financement de l'exploitation.\n\nLes créances sur cessions d'immobilisations sont H.A.O. sauf si elles concernent des opérations courantes (→ compte 414 – Créances sur cessions courantes d'immobilisations, crédité par le compte 754 – Produits des cessions courantes d'immobilisations).",
    exclusions: {
      texte: "Ne doit pas enregistrer les dettes ou créances ayant pour origine les activités ordinaires.",
      comptes: ["40 – Fournisseurs et comptes rattachés", "41 – Clients et comptes rattachés"]
    },
    controle: ["Chèques", "Effets de commerce", "Contrats d'acquisition d'immobilisations", "Factures", "Ordres de mouvement en Bourse"],
    comptes_lies: ["481","482","483","484","485","486","488","40","41","8"],
    textes_ref: ["SC OHADA — Compte 48 Créances et dettes H.A.O."],
    exemples_ecritures: [
        {
          libelle: "Acquisition d'une immobilisation — facture non encore payée",
          debit: "23 – Bâtiments",
          credit: "481 – Fournisseurs d'investissements"
        },
        {
          libelle: "Règlement du fournisseur d'investissement",
          debit: "481 – Fournisseurs d'investissements",
          credit: "52 – Banques"
        },
        {
          libelle: "Cession d'une immobilisation — créance sur l'acheteur",
          debit: "485 – Créances sur cessions d'immobilisations",
          credit: "82 – Produits des cessions d'immobilisations"
        },
      ]
  },

  "49": {
    libelle: "Dépréciations et risques provisionnés (Tiers)",
    classe: "Classe 4 — Comptes de Tiers",
    nature: "Compte de bilan (Actif — valeur négative en déduction des créances / Passif — risques provisionnés)",
    sens: "Créditeur",
    contenu: "Ce sont des dépréciations subies par des comptes de tiers résultant de causes diverses dont les effets ne sont pas jugés irréversibles.",
    subdivisions: {
      "490":  "Dépréciations des comptes fournisseurs",
      "491":  "Dépréciations des comptes clients",
      "4911": "Créances litigieuses",
      "4912": "Créances douteuses",
      "492":  "Dépréciations des comptes personnel",
      "493":  "Dépréciations des comptes organismes sociaux",
      "494":  "Dépréciations des comptes État et collectivités publiques",
      "495":  "Dépréciations des comptes organismes internationaux",
      "496":  "Dépréciations des comptes associés et groupe",
      "4962": "Associés, comptes courants",
      "4963": "Associés, opérations faites en commun",
      "4966": "Groupe, comptes courants",
      "497":  "Dépréciations des comptes débiteurs divers",
      "498":  "Dépréciations des comptes de créances H.A.O.",
      "4981": "Créances sur cessions d'immobilisations",
      "4982": "Créances sur cessions de titres de placement",
      "4983": "Autres créances H.A.O.",
      "499":  "Risques provisionnés",
      "4991": "Sur opérations d'exploitation",
      "4998": "Sur opérations H.A.O."
    },
    fonctionnement: {
      credit: [
        "Clôture — dépréciations constatées sur les éléments d'actif de la classe 4 (comptes 41 à 48) ou provisions pour risques à court terme (compte 499), par le débit du compte 659 – Charges provisionnées d'exploitation",
        "Ou par le débit du compte 839 – Charges provisionnées H.A.O."
      ],
      debit: [
        "Clôture — reprise des dépréciations et provisions dont les raisons ont cessé d'exister, par le crédit du compte 759 – Reprises de charges provisionnées d'exploitation",
        "Ou par le crédit du compte 849 – Reprises de charges provisionnées H.A.O."
      ]
    },
    commentaires: "Pour constituer une provision, l'entreprise doit :\n— Préciser exactement la nature et l'objet des créances à déprécier\n— Justifier les motifs qui rendent les créances douteuses ou litigieuses\n\nLa provision doit être constituée même si son montant est incertain et même en l'absence de bénéfices (principe de prudence). Les événements générateurs survenus après la clôture ne sont pas pris en compte dans l'exercice.\n\nLe compte 499 – Risques provisionnés enregistre les pertes probables à moins d'un an d'origine exploitation ou H.A.O.",
    exclusions: {
      texte: "Ne doit pas enregistrer les provisions pour risques et charges à plus d'un an, ni les provisions pour dépréciation de l'actif immobilisé ou des comptes de trésorerie.",
      comptes: ["19 – Provisions financières pour risques et charges", "29 – Provisions pour dépréciation (actif immobilisé)", "59 – Dépréciations et risques provisionnés (Trésorerie)"]
    },
    controle: ["Courriers et protêts", "Justificatifs du caractère douteux ou litigieux de la créance"],
    comptes_lies: ["490","491","492","493","494","495","496","497","498","499","659","759","839","849"],
    textes_ref: ["SC OHADA — Compte 49 Dépréciations et risques provisionnés (Tiers)"],
    exemples_ecritures: [
        {
          libelle: "Provision pour dépréciation d'une créance douteuse",
          debit: "6594 – Charges provisionnées sur créances",
          credit: "4912 – Dépréciations des créances douteuses"
        },
        {
          libelle: "Reprise de provision sur créance recouvrée",
          debit: "4912 – Dépréciations des créances douteuses",
          credit: "7594 – Reprises de charges provisionnées sur créances"
        },
        {
          libelle: "Provision pour risque à court terme (exploitation)",
          debit: "6591 – Charges provisionnées sur risques à court terme",
          credit: "499 – Risques provisionnés"
        },
      ]
  },

  /* ═══════════════════════════════════════════════════════════════
     CLASSE 5 — COMPTES DE TRÉSORERIE
  ═══════════════════════════════════════════════════════════════ */

  "5": {
    libelle: "Trésorerie",
    classe: "Classe 5",
    nature: "Classe de comptes",
    sens: "Débiteur (en général)",
    contenu: "Les comptes de la classe 5 enregistrent les opérations relatives aux valeurs en espèces, aux chèques, aux effets de commerce, aux titres de placement, aux coupons ainsi qu'aux opérations faites avec les établissements de crédit. Aucune compensation ne doit être effectuée au bilan entre les soldes débiteurs et les soldes créditeurs des comptes de la classe 5.",
    fonctionnement: { debit: [], credit: [] },
    commentaires: "Les comptes de la classe 5 peuvent être assortis de comptes de provisions pour dépréciation (compte 59), notamment pour les titres de placement. Ces provisions résultent de l'évaluation comptable des moins-values constatées sur les éléments d'actif considérés.",
    comptes_lies: ["50","51","52","53","54","56","57","58","59"],
    textes_ref: ["Acte Uniforme OHADA — Classe 5 Trésorerie"],
    exemples_ecritures: []
  },

  "50": {
    libelle: "Titres de placement",
    classe: "Classe 5 — Trésorerie",
    nature: "Compte de bilan (Actif — trésorerie)",
    sens: "Débiteur",
    contenu: "Ce sont des titres cessibles, acquis en vue d'en retirer un revenu direct ou une plus-value à brève échéance.",
    subdivisions: {
      "501":  "Titres du Trésor et bons de caisse à court terme",
      "5011": "Titres du Trésor à court terme",
      "5012": "Titres d'organismes financiers",
      "5013": "Bons de caisse à court terme",
      "502":  "Actions",
      "5021": "Actions propres",
      "5022": "Actions cotées",
      "5023": "Actions non cotées",
      "5024": "Actions démembrées (certificats d'investissement ; droits de vote)",
      "5025": "Autres titres conférant un droit de propriété",
      "503":  "Obligations",
      "5031": "Obligations émises par la société et rachetées par elle",
      "5032": "Obligations cotées",
      "5033": "Obligations non cotées",
      "5035": "Autres titres conférant un droit de créance",
      "504":  "Bons de souscription",
      "5042": "Bons de souscription d'actions",
      "5043": "Bons de souscription d'obligations",
      "505":  "Titres négociables hors Région",
      "506":  "Intérêts courus",
      "5061": "Titres du Trésor et bons de caisse à court terme",
      "5062": "Actions",
      "5063": "Obligations",
      "508":  "Autres valeurs assimilées"
    },
    fonctionnement: {
      debit: [
        "Valeur d'apport ou d'acquisition des titres, par le crédit des comptes de tiers ou de trésorerie concernés"
      ],
      credit: [
        "En cas de cession : valeur d'entrée des titres, par le débit d'un compte de tiers ou de trésorerie pour le prix de cession",
        "Et par le débit du compte 677 – Pertes sur cessions de titres de placement (si cession avec perte)",
        "Ou par le crédit du compte 777 – Gains sur cessions de titres de placement (si cession avec bénéfice, ce compte est crédité en contrepartie de la trésorerie)"
      ]
    },
    commentaires: "Entrée en stock : les titres sont comptabilisés au prix d'achat, à l'exclusion des frais d'achat inscrits au compte 6311 – Frais sur titres.\n\nÀ l'inventaire : évaluation au cours en Bourse (titres cotés) ou à leur valeur probable de négociation (titres non cotés).\n\nEn cas de cession : la différence entre le prix de cession et la valeur d'entrée est enregistrée au compte 677 (perte) ou au compte 777 (gain).",
    exclusions: {
      texte: "Ne doit pas enregistrer les titres dont la cession n'est pas facilement réalisable, ni les frais accessoires d'achat des titres.",
      comptes: ["26 – Titres de participation", "274 – Titres immobilisés", "6311 – Frais sur achats de titres"]
    },
    controle: ["Ordres d'achat et de vente", "Bordereaux de banque", "Contrats", "Relevés de titres en portefeuille"],
    comptes_lies: ["501","502","503","504","505","506","508","590","677","777","6311"],
    textes_ref: ["SC OHADA — Compte 50 Titres de placement"],
    exemples_ecritures: [
        {
          libelle: "Acquisition de titres de placement (actions cotées)",
          debit: "502 – Actions",
          credit: "52 – Banques"
        },
        {
          libelle: "Cession de titres de placement avec bénéfice",
          debit: "52 – Banques (prix de cession)",
          credit: "502 – Actions (valeur d'entrée) + 777 – Gains sur cessions"
        },
        {
          libelle: "Provision pour dépréciation des titres de placement",
          debit: "679 – Charges provisionnées financières",
          credit: "590 – Dépréciations des titres de placement"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 51",
          titre: "Cession de titres de placement — méthode PEPS",
          enonce: "Portefeuille D : 1 000 t. x 12 000 (01/04/N-1) + 500 t. x 12 500 (01/09/N-1) + 1 200 t. x 11 000 (01/04/N) + 300 t. x 10 000 (01/07/N). Dépréciation N-1 : 175 000. Cession 2 500 titres au 01/09/N : 29 000 000 F.",
          ecritures: [
            {
              libelle: "31/12/N-1 — Dépréciation portefeuille",
              debit: "6795 – Charges provisionnées sur titres placement : 175 000",
              credit: "590 – Dépréciations titres de placement : 175 000"
            },
            {
              libelle: "01/09/N — Cession (PEPS : valeur entrée 29 250 000)",
              debit: "4721 – Créances sur cessions titres : 29 000 000 + 677 – Pertes sur cessions : 250 000",
              credit: "50 – Titres de placement : 29 250 000"
            },
          ],
          commentaire: "PEPS : 1 000x12 000 + 500x12 500 + 1 000x11 000 = 29 250 000 F. Perte = 29 250 000 – 29 000 000 = 250 000 F.",
        },
    ],
  },

  "51": {
    libelle: "Valeurs à encaisser",
    classe: "Classe 5 — Trésorerie",
    nature: "Compte de bilan (Actif — trésorerie)",
    sens: "Débiteur",
    contenu: "Les valeurs à encaisser sont les effets, chèques et autres valeurs transmis à la banque et dont l'entreprise attend l'encaissement à l'échéance.",
    subdivisions: {
      "511":  "Effets à encaisser",
      "512":  "Effets à l'encaissement",
      "513":  "Chèques à encaisser",
      "514":  "Chèques à l'encaissement",
      "515":  "Cartes de crédit à encaisser",
      "518":  "Autres valeurs à l'encaissement",
      "5181": "Warrants",
      "5182": "Billets de fonds",
      "5185": "Chèques de voyage",
      "5186": "Coupons échus",
      "5187": "Intérêts échus des obligations"
    },
    fonctionnement: {
      debit: [
        "Lors de la réception de l'effet, par le crédit des comptes de tiers concernés"
      ],
      credit: [
        "Du montant des effets pour solde, par le débit des comptes de trésorerie concernés"
      ]
    },
    commentaires: "Distinctions importantes :\n— Effets à encaisser (511) : effets en portefeuille autres que ceux des clients (compte 412)\n— Effets à l'encaissement (512) : effets transmis à la banque en vue de l'encaissement à l'échéance\n— Chèques à encaisser (513) : chèques reçus des clients non encore transmis à la banque\n— Chèques à l'encaissement (514) : chèques transmis à la banque non encore crédités\n— Cartes de crédit à encaisser (515) : paiements par cartes jusqu'à l'avis de crédit bancaire\n\nEn cours d'exercice, l'utilisation du compte 51 n'est pas obligatoire. À la clôture de l'exercice, il est obligatoire d'y inscrire : (1) les chèques non encore remis en banque ; (2) les coupons échus détenus par l'entreprise.",
    exclusions: {
      texte: "Ne doit pas enregistrer les effets à payer à plus d'un an d'échéance, ni les effets remis à l'escompte.",
      comptes: ["16 – Emprunts et dettes assimilées", "56 – Banques, crédits de trésorerie et d'escompte"]
    },
    controle: ["Effets", "Chèques", "Bordereaux de remise d'effets ou de chèques", "Relevés de banque"],
    comptes_lies: ["511","512","513","514","515","518","591","52","56"],
    textes_ref: ["SC OHADA — Compte 51 Valeurs à encaisser"],
    exemples_ecritures: [
        {
          libelle: "Réception d'un chèque client non encore remis en banque",
          debit: "513 – Chèques à encaisser",
          credit: "411 – Clients"
        },
        {
          libelle: "Remise du chèque en banque",
          debit: "52 – Banques",
          credit: "513 – Chèques à encaisser"
        },
        {
          libelle: "Clôture — coupon échu non encore encaissé",
          debit: "518 – Autres valeurs à l'encaissement",
          credit: "772 – Revenus de participations"
        },
      ]
  },

  "52": {
    libelle: "Banques",
    classe: "Classe 5 — Trésorerie",
    nature: "Compte de bilan (Actif — ou Passif si découvert)",
    sens: "Débiteur (créditeur si découvert)",
    contenu: "Ce compte enregistre les opérations financières effectuées entre l'entreprise, les banques agréées dans un Etat-partie et les autres banques.\n\nLa liste des banques agréées est tenue par l'organisme chargé de la surveillance bancaire.",
    subdivisions: {
      "521":  "Banques locales",
      "5211": "Banque X",
      "5212": "Banque Y",
      "522":  "Banques autres États Région",
      "523":  "Banques autres États zone monétaire",
      "524":  "Banques hors zone monétaire"
    },
    fonctionnement: {
      debit: [
        "Mouvements de fonds en faveur des comptes Banques, par le crédit des comptes concernés"
      ],
      credit: [
        "Mouvements de fonds en diminution des comptes Banques, par le débit des comptes concernés"
      ]
    },
    commentaires: "Le solde comptable doit être rapproché périodiquement du relevé bancaire (état de rapprochement). Les différences sont à rechercher et font l'objet d'écritures de redressement si elles ne proviennent pas d'un chevauchement de dates.\n\nÀ la clôture, les avoirs en monnaies étrangères sont évalués au dernier cours officiel de change connu.\n\nLes comptes bancaires présentant un solde créditeur sont inscrits au passif du bilan sous le poste « Banques, découverts », sans compensation possible avec les comptes bancaires à solde débiteur.",
    exclusions: {
      texte: "Ne doit pas enregistrer les mouvements relatifs aux Chèques postaux, au Trésor, ni aux représentations locales d'institutions financières internationales ou étrangères.",
      comptes: ["53 – Établissements financiers et assimilés", "538 – Autres organismes financiers"]
    },
    controle: ["Relevés bancaires", "États de rapprochement bancaire"],
    comptes_lies: ["521","522","523","524","592","51","56","57","58"],
    textes_ref: ["SC OHADA — Compte 52 Banques"],
    exemples_ecritures: [
        {
          libelle: "Encaissement d'un virement client",
          debit: "52 – Banques",
          credit: "411 – Clients"
        },
        {
          libelle: "Paiement d'un fournisseur par virement",
          debit: "401 – Fournisseurs",
          credit: "52 – Banques"
        },
        {
          libelle: "Découvert bancaire (solde créditeur en fin de période)",
          debit: "— (solde créditeur inscrit au passif)",
          credit: "56 – Banques, crédits de trésorerie et d'escompte"
        },
      ]
  },

  "53": {
    libelle: "Établissements financiers et assimilés",
    classe: "Classe 5 — Trésorerie",
    nature: "Compte de bilan (Actif — ou Passif si découvert)",
    sens: "Débiteur (créditeur si découvert)",
    contenu: "Ce compte enregistre les opérations entre l'entreprise et les Chèques postaux et le Trésor dans un Etat de la Région et les autres établissements financiers.",
    subdivisions: {
      "531": "Chèques postaux",
      "532": "Trésor",
      "533": "Sociétés de gestion et d'intermédiation (S.G.I.)",
      "536": "Établissements financiers, intérêts courus",
      "538": "Autres organismes financiers"
    },
    fonctionnement: {
      debit: [
        "Mouvements de fonds en faveur des établissements concernés, par le crédit des comptes concernés"
      ],
      credit: [
        "Mouvements de fonds diminuant les avoirs de l'entreprise, par le débit des comptes concernés"
      ]
    },
    commentaires: "Même règles que pour le compte 52 : rapprochement périodique avec les extraits de compte, évaluation des avoirs en devises au cours officiel à la clôture. Les comptes présentant un solde créditeur sont inscrits au passif sous le poste « Banques, découverts », sans compensation avec les comptes à solde débiteur.",
    exclusions: {
      texte: "Ne doit pas enregistrer les mouvements de fonds relatifs aux opérations avec les banques.",
      comptes: ["52 – Banques"]
    },
    controle: ["Relevés de chèques postaux", "Relevés du Trésor", "États de rapprochement"],
    comptes_lies: ["531","532","533","536","538","593","52"],
    textes_ref: ["SC OHADA — Compte 53 Établissements financiers et assimilés"],
    exemples_ecritures: [
        {
          libelle: "Dépôt de fonds aux chèques postaux",
          debit: "531 – Chèques postaux",
          credit: "57 – Caisse"
        },
        {
          libelle: "Règlement par chèque postal",
          debit: "401 – Fournisseurs",
          credit: "531 – Chèques postaux"
        },
      ]
  },

  "54": {
    libelle: "Instruments de trésorerie",
    classe: "Classe 5 — Trésorerie",
    nature: "Compte de bilan (Actif — trésorerie)",
    sens: "Débiteur",
    contenu: "Les \"Instruments de trésorerie\" appartiennent à la catégorie des \"instruments financiers\".\n\nIls comprennent :\n\nles options de taux ;\nles options de change ;\nles options sur actions ;\nles instruments de trésorerie à terme.\nLa qualification et la classification de ces différents instruments sont opérées en fonction de la motivation ou de l'intention de l'entreprise.",
    subdivisions: {
      "541": "Options de taux d'intérêt",
      "542": "Options de taux de change",
      "543": "Options de taux boursiers",
      "544": "Instruments de marchés à terme",
      "545": "Avoirs d'or et autres métaux précieux (acquis en vue d'une cession à court terme : pièces, barres, lingots, louis d'or, argent, diamant...)"
    },
    fonctionnement: {
      debit: [],
      credit: []
    },
    commentaires: "La qualification et la classification de ces instruments sont opérées en fonction de la motivation ou de l'intention de l'entreprise.\n\nRègles d'évaluation selon le marché :\n— Marchés organisés dotés d'une parfaite liquidité : évaluation au prix du marché (mark to market)\n— Autres marchés : évaluation au coût historique (règle de prudence)\n\nLe fonctionnement détaillé sera précisé en rapport avec le développement des marchés financiers.",
    exclusions: {
      texte: "Ne doit pas enregistrer les opérations de crédits de trésorerie.",
      comptes: ["56 – Banques, crédits de trésorerie et d'escompte"]
    },
    controle: ["Relevés et états de rapprochement bancaires"],
    comptes_lies: ["541","542","543","544","545","594","56"],
    textes_ref: ["SC OHADA — Compte 54 Instruments de trésorerie"],
    exemples_ecritures: [
        {
          libelle: "Acquisition d'une option de change",
          debit: "542 – Options de taux de change",
          credit: "52 – Banques (prime payée)"
        },
        {
          libelle: "Gain réalisé sur instrument de trésorerie",
          debit: "52 – Banques",
          credit: "7784 – Gains sur instruments de trésorerie"
        },
      ]
  },

  "56": {
    libelle: "Banques, crédits de trésorerie et d'escompte",
    classe: "Classe 5 — Trésorerie",
    nature: "Compte de bilan (Passif — dettes financières à court terme)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre, d'une part, le montant de crédits de trésorerie inscrit au compte courant de l'établissement dispensateur de ces concours avec lequel l'entreprise est en relation d'affaires et, d'autre part, le montant nominal des effets escomptés.",
    subdivisions: {
      "561": "Crédits de trésorerie",
      "564": "Escompte de crédits de campagne",
      "565": "Escompte de crédits ordinaires",
      "566": "Crédits de trésorerie, intérêts courus"
    },
    fonctionnement: {
      credit: [
        "Crédits de trésorerie effectivement portés au compte courant, par le débit du compte 52 – Banques",
        "Montant nominal des effets escomptés, par le débit du compte 52 – Banques et/ou du compte 675 – Escompte des effets de commerce"
      ],
      debit: [
        "Remboursements de crédits de trésorerie, par le crédit du compte 52 – Banques",
        "Montant nominal des effets dont l'échéance est passée et l'opération dénouée, par le crédit du compte 415 – Clients, effets escomptés non échus"
      ]
    },
    commentaires: "561 – Crédits de trésorerie : concours bancaires à court terme (≤ 2 ans) sous forme de prêt, avances en compte, facilités de caisse, découverts.\n\n564 – Escompte de crédits de campagne : effets représentatifs de la commercialisation de produits agricoles locaux sous contrôle d'État, dénouement ≤ 12 mois.\n\n565 – Escompte de crédits ordinaires : effets représentatifs de transactions commerciales (livraisons de biens, travaux, services).\n\nSchéma comptable de l'escompte :\n① Remise à l'escompte : Débit 415 / Crédit 412\n② Réception du décompte bancaire : Débit 52 (montant net) + Débit 675 (frais) / Crédit 565 (montant nominal)\n③ Après l'échéance et dénouement : Débit 565 / Crédit 415",
    exclusions: {
      texte: "Ne doit pas enregistrer les prêts bancaires à plus d'un an, les découverts n'ayant que le caractère d'un engagement, ni les effets remis à l'encaissement à leur échéance normale.",
      comptes: ["16 – Emprunts et dettes assimilées", "Comptes d'engagements hors bilan", "51 – Valeurs à encaisser"]
    },
    controle: ["Attestations de la banque sur les crédits de trésorerie", "Relevés bancaires", "Bordereaux de remise des effets à l'escompte"],
    comptes_lies: ["561","564","565","566","52","415","675"],
    textes_ref: ["SC OHADA — Compte 56 Crédits de trésorerie et d'escompte"],
    exemples_ecritures: [
        {
          libelle: "Mise en place d'un crédit de trésorerie",
          debit: "52 – Banques",
          credit: "561 – Crédits de trésorerie"
        },
        {
          libelle: "Remise d'un effet à l'escompte",
          debit: "415 – Clients, effets escomptés non échus",
          credit: "412 – Clients, effets à recevoir"
        },
        {
          libelle: "Réception du décompte d'escompte",
          debit: "52 – Banques (net) + 675 – Escompte des effets",
          credit: "565 – Escompte de crédits ordinaires (nominal)"
        },
      ]
  },

  "57": {
    libelle: "Caisse",
    classe: "Classe 5 — Trésorerie",
    nature: "Compte de bilan (Actif — trésorerie)",
    sens: "Débiteur (jamais créditeur)",
    contenu: "Le compte Caisse retrace opérations d'encaissement et les de paiement effectuées en espèces pour les besoins de l'entreprise.",
    subdivisions: {
      "571":  "Caisse siège social",
      "5711": "En unités monétaires légales du pays (UML)",
      "5712": "En devises",
      "572":  "Caisse succursale A",
      "5721": "En UML",
      "5722": "En devises",
      "573":  "Caisse succursale B",
      "5731": "En UML",
      "5732": "En devises"
    },
    fonctionnement: {
      debit: [
        "Versements effectués au profit de la caisse (encaissements en espèces), par le crédit des comptes concernés"
      ],
      credit: [
        "Règlements effectués par la caisse (décaissements en espèces), par le débit des comptes concernés"
      ]
    },
    commentaires: "Le solde du compte Caisse doit toujours correspondre exactement à la somme disponible réellement. Il ne peut être que débiteur ou nul.\n\nUn solde créditeur signifie que l'entreprise a déboursé davantage d'espèces qu'elle n'en a reçu — ce qui constitue une présomption d'irrégularité de la comptabilité.\n\nIl peut être ouvert autant de sous-comptes que nécessaire (par siège, par succursale, en UML, en devises).",
    exclusions: {
      texte: "Ne doit pas enregistrer les chèques de voyage, chèques de banque, timbres fiscaux, timbres postaux et figurines d'affranchissement, effets de commerce, ni les paiements par cartes de crédit.",
      comptes: ["518 – Autres valeurs à l'encaissement (chèques de voyage)", "513 ou 514 – Chèques à encaisser/à l'encaissement", "64 – Impôts et taxes (timbres fiscaux)", "616 – Transports de plis (affranchissement)", "515 – Cartes de crédit à encaisser"]
    },
    controle: ["Procès-verbaux de caisse", "États de reddition de la caisse", "Bordereaux de situation journalière"],
    comptes_lies: ["571","572","573","52","51"],
    textes_ref: ["SC OHADA — Compte 57 Caisse"],
    exemples_ecritures: [
        {
          libelle: "Encaissement d'un règlement en espèces",
          debit: "57 – Caisse",
          credit: "411 – Clients"
        },
        {
          libelle: "Paiement d'une dépense courante en espèces",
          debit: "605 – Autres achats / 61 – Transports…",
          credit: "57 – Caisse"
        },
        {
          libelle: "Versement d'espèces en banque",
          debit: "52 – Banques",
          credit: "57 – Caisse"
        },
      ]
  },

  "58": {
    libelle: "Régies d'avances, accréditifs et virements internes",
    classe: "Classe 5 — Trésorerie",
    nature: "Compte de bilan (Actif — comptes de passage)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre le montant des avances aux régisseurs, le montant des accréditifs ainsi que la régularisation desdites avances et le règlement des accréditifs.",
    subdivisions: {
      "581": "Régies d'avances",
      "582": "Accréditifs",
      "585": "Virements de fonds",
      "588": "Autres virements internes"
    },
    fonctionnement: {
      debit: [
        "Avances aux régisseurs et accréditifs (comptes 581 et 582), par le crédit des comptes de trésorerie",
        "Virements internes en cours d'exercice (comptes 585 et 588) : montant à porter au débit dans un journal auxiliaire, par le crédit des comptes de trésorerie"
      ],
      credit: [
        "Régularisation des avances et règlement définitif des accréditifs (comptes 581 et 582), par le débit des comptes concernés",
        "Virements internes en cours d'exercice (comptes 585 et 588) : montant à porter au crédit dans un journal auxiliaire, par le débit des comptes de trésorerie"
      ]
    },
    commentaires: "581 – Régies d'avances : fonds gérés par des régisseurs ou comptables subordonnés (chantier forestier, travaux publics, etc.).\n582 – Accréditifs : crédits ouverts par une banque dans une succursale locale pour couvrir les besoins de trésorerie d'un responsable local.\n\n585/588 – Virements internes : comptes de passage techniques utilisés dans les comptabilités organisées sur journaux auxiliaires, pour éviter les doubles emplois lors de la centralisation. Ces comptes doivent impérativement être soldés au terme de leur utilisation et ne doivent pas figurer au bilan.",
    exclusions: {
      texte: "Ne doit pas enregistrer les opérations internes de trésorerie lorsque l'entreprise utilise un journal unique.",
      comptes: ["Autres comptes de la classe 5 concernés"]
    },
    controle: ["Relevés bancaires", "Vérification que les comptes 585 et 588 sont soldés à la clôture de l'exercice"],
    comptes_lies: ["581","582","585","588","52","57"],
    textes_ref: ["SC OHADA — Compte 58 Régies d'avances et virements internes"],
    exemples_ecritures: [
        {
          libelle: "Avance à un régisseur de chantier",
          debit: "581 – Régies d'avances",
          credit: "52 – Banques"
        },
        {
          libelle: "Régularisation de l'avance sur justificatifs",
          debit: "Comptes de charges concernés",
          credit: "581 – Régies d'avances"
        },
        {
          libelle: "Virement interne entre deux journaux auxiliaires",
          debit: "585 – Virements de fonds (journal 1)",
          credit: "585 – Virements de fonds (journal 2)"
        },
      ]
  },

  "59": {
    libelle: "Dépréciations et risques provisionnés (Trésorerie)",
    classe: "Classe 5 — Trésorerie",
    nature: "Compte de bilan (Actif — valeur négative en déduction / Passif — risques financiers)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre l'amoindrissement de la valeur des titres et valeurs liquides, des avoirs en banque, et autres éléments financiers résultant de causes précises quant à leur nature, mais dont les effets ne sont pas jugés irréversibles ainsi que les reprises de charges provisionnées s'y rapportant.\n\nIl enregistre également les provisions de caractère financier pour risques à moins d'un an.",
    subdivisions: {
      "590": "Dépréciations des titres de placement",
      "591": "Dépréciations des titres et valeurs à encaisser",
      "592": "Dépréciations des comptes banques",
      "593": "Dépréciations des comptes établissements financiers et assimilés",
      "594": "Dépréciations des comptes d'instruments de trésorerie",
      "599": "Risques provisionnés à caractère financier"
    },
    fonctionnement: {
      credit: [
        "Clôture — dépréciations constatées sur les éléments d'actif de la classe 5 et pertes probables financières à moins d'un an (compte 599), par le débit du compte 679 – Charges provisionnées financières"
      ],
      debit: [
        "Ouverture de l'exercice — reprise des dépréciations et provisions existant à la clôture précédente, par le crédit du compte 779 – Reprises de charges provisionnées financières"
      ]
    },
    commentaires: "Pour les titres de placement (compte 590) : la provision s'appuie sur la valeur en Bourse à la clôture (titres cotés) ou la valeur de négociation potentielle (titres non cotés).\n\nCompte 599 – Risques provisionnés à caractère financier : pertes probables à moins d'un an d'origine financière (exemple : provisions pour pertes de change).\n\nMêmes règles que pour les dépréciations des classes 3 et 4 : provision obligatoire même en l'absence de bénéfices (principe de prudence), et uniquement pour des dépréciations subies à la clôture de l'exercice.",
    exclusions: {
      texte: "Ne doit pas enregistrer les provisions pour dépréciations d'éléments d'autres classes du bilan.",
      comptes: ["19 – Provisions financières pour risques et charges (classe 1)", "29 – Provisions pour dépréciation (classe 2)", "39 – Dépréciations des stocks (classe 3)", "49 – Dépréciations et risques provisionnés (Tiers, classe 4)"]
    },
    controle: ["Cours de Bourse à la clôture", "Évaluations de titres", "Cours du change"],
    comptes_lies: ["590","591","592","593","594","599","679","779","50","51","52"],
    textes_ref: ["SC OHADA — Compte 59 Dépréciations et risques provisionnés (Trésorerie)"],
    exemples_ecritures: [
        {
          libelle: "Provision pour dépréciation d'un compte bancaire (devise)",
          debit: "679 – Charges provisionnées financières",
          credit: "592 – Dépréciations des comptes banques"
        },
        {
          libelle: "Reprise de dépréciation des titres de placement",
          debit: "590 – Dépréciations des titres de placement",
          credit: "779 – Reprises de charges provisionnées financières"
        },
      ]
  },

  /* ═══════════════════════════════════════════════════════════════
     CLASSE 6 — COMPTES DE CHARGES DES ACTIVITÉS ORDINAIRES
  ═══════════════════════════════════════════════════════════════ */

  "6": {
    libelle: "Charges des activités ordinaires",
    classe: "Classe 6",
    nature: "Classe de comptes",
    sens: "Débiteur",
    contenu: "La classe 6 est destinée à enregistrer les charges liées à l'activité ordinaire de l'entreprise. Ces charges entrent dans la composition des coûts des produits de l'entreprise. Les charges doivent être comptabilisées dans l'exercice au cours duquel elles ont pris naissance et donnent éventuellement lieu à abonnement ou régularisation à la clôture.",
    fonctionnement: { debit: [], credit: [] },
    commentaires: "À la clôture de l'exercice, tous les comptes de charges de la classe 6 sont virés pour solde au débit du compte 13 – Résultat net de l'exercice.",
    comptes_lies: ["60","603","61","62","63","64","65","659","66","67","68","69"],
    textes_ref: ["Acte Uniforme OHADA — Classe 6 Charges des activités ordinaires"],
    exemples_ecritures: []
  },

  "60": {
    libelle: "Achats",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre, le montant des factures d'achat et la valeur des retours de matières, fournitures et marchandises aux fournisseurs ainsi que les rabais, remises et ristournes hors factures obtenus des fournisseurs de biens.",
    subdivisions: {
      "601":  "Achats de marchandises",
      "6011": "Dans la Région",
      "6012": "Hors Région",
      "6013": "Aux entreprises du groupe dans la Région",
      "6014": "Aux entreprises du groupe hors Région",
      "6019": "Rabais, remises et ristournes obtenus (non ventilés)",
      "602":  "Achats de matières premières et fournitures liées",
      "6021": "Dans la Région",
      "6022": "Hors Région",
      "6023": "Aux entreprises du groupe dans la Région",
      "6024": "Aux entreprises du groupe hors Région",
      "6029": "Rabais, remises et ristournes obtenus (non ventilés)",
      "604":  "Achats stockés de matières et fournitures consommables",
      "6041": "Matières consommables",
      "6042": "Matières combustibles",
      "6043": "Produits d'entretien",
      "6044": "Fournitures d'atelier et d'usine",
      "6046": "Fournitures de magasin",
      "6047": "Fournitures de bureau",
      "6049": "Rabais, remises et ristournes obtenus (non ventilés)",
      "605":  "Autres achats",
      "6051": "Fournitures non stockables — eau",
      "6052": "Fournitures non stockables — électricité",
      "6053": "Fournitures non stockables — autres énergies",
      "6054": "Fournitures d'entretien non stockables",
      "6055": "Fournitures de bureau non stockables",
      "6056": "Achats de petit matériel et outillage",
      "6057": "Achats d'études et prestations de service",
      "6058": "Achats de travaux, matériels et équipements",
      "6059": "Rabais, remises et ristournes obtenus (non ventilés)",
      "608":  "Achats d'emballages",
      "6081": "Emballages perdus",
      "6082": "Emballages récupérables non identifiables",
      "6083": "Emballages à usage mixte",
      "6089": "Rabais, remises et ristournes obtenus (non ventilés)"
    },
    fonctionnement: {
      debit: [
        "Montant des factures d'achat, par le crédit du compte fournisseur (40) ou d'un compte de trésorerie"
      ],
      credit: [
        "Retours de matières, fournitures et marchandises aux fournisseurs et rabais/remises/ristournes obtenus par avoir, par le débit des comptes fournisseurs ou tiers concernés",
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Le montant à inscrire s'entend net de taxes récupérables, augmenté des droits de douane afférents aux biens acquis (prix rendu frontière).\n\nLes achats sont comptabilisés déduction faite des rabais et remises déduits sur facture. Les escomptes de règlement, même déduits sur facture, sont portés au compte 773 – Escomptes obtenus.\n\nÀ la clôture, les biens reçus avant réception de la facture sont néanmoins inscrits dans les achats par le crédit du compte 408 – Factures non parvenues.\n\nLes rabais, remises et ristournes connus postérieurement à la facturation initiale sont enregistrés aux comptes d'achats concernés.",
    exclusions: {
      texte: "Ne doit pas enregistrer les frais accessoires d'achats.",
      comptes: ["Comptes de la classe 6 correspondant à leur nature"]
    },
    controle: ["Factures et avoirs fournisseurs", "Bons de commande", "États d'inventaire"],
    comptes_lies: ["601","602","604","605","608","40","408","773","603"],
    textes_ref: ["SC OHADA — Compte 60 Achats"],
    exemples_ecritures: [
        {
          libelle: "Achat de marchandises à crédit (HT)",
          debit: "601 – Achats de marchandises",
          credit: "401 – Fournisseurs"
        },
        {
          libelle: "Retour de marchandises au fournisseur (avoir)",
          debit: "401 – Fournisseurs",
          credit: "601 – Achats de marchandises"
        },
        {
          libelle: "Achat de matières premières au comptant",
          debit: "602 – Achats de matières premières",
          credit: "52 – Banques"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 1",
          titre: "Acquisition de matériels et fournitures de bureau",
          enonce: "Facture A : caisse enregistreuse 300 (immob.), ordinateurs 2 000 (marchds), papier 500 (90 marchds + 10 non stockées). Transport 10 %, TVA 10 % récupérable.",
          ecritures: [
            {
              libelle: "Matériel bureautique (caisse + transport = 330)",
              debit: "2443 – Matériel bureautique : 330",
              credit: ""
            },
            {
              libelle: "Achats marchds ordinateurs (2 000 + transport = 2 200)",
              debit: "6011.26 – Achats de marchandises : 2 200",
              credit: ""
            },
            {
              libelle: "Achats marchds papier (450 + transport = 495)",
              debit: "6011.17 – Achats de marchandises : 495",
              credit: ""
            },
            {
              libelle: "Fournitures bureau non stockables (50 + transport = 55)",
              debit: "6055 – Fournitures non stockables : 55",
              credit: ""
            },
            {
              libelle: "TVA récup. sur immobilisations (330 x 10 %)",
              debit: "4451 – TVA récup. sur immob. : 33",
              credit: ""
            },
            {
              libelle: "TVA récup. sur achats [(2 200+495+55) x 10 %]",
              debit: "4452 – TVA récup. sur achats : 275",
              credit: ""
            },
            {
              libelle: "Fournisseur d'investissement (330 + 33)",
              debit: "",
              credit: "4812 – Fournisseurs d'investissements : 363"
            },
            {
              libelle: "Fournisseur exploitation (marchandises + services)",
              debit: "",
              credit: "4011 – Fournisseurs : 3 025"
            },
          ],
          commentaire: "SYSCOHADA recommande 4812 pour les immobilisations et 4011 pour les autres achats afin de faciliter le tableau des flux de trésorerie.",
        },
        {
          ref: "App. 6",
          titre: "Remise et retour de marchandises",
          enonce: "Facture initiale (caisse 290, ordinateurs 2 000, papier avec remise 20 % = 400). Avoir : remise 10 % caisse (29) + reprise ordinateur défectueux (200).",
          ecritures: [
            {
              libelle: "Chez fournisseur — facture de vente initiale",
              debit: "4111 – Clients : 2 690",
              credit: "7011.26 : 290 + 7021.26 : 2 000 + 7011.17 : 400"
            },
            {
              libelle: "Chez fournisseur — avoir (remise + retour)",
              debit: "7011.26 : 29 + 7021.26 : 200",
              credit: "4111 – Clients : 229"
            },
            {
              libelle: "Chez client — facture initiale",
              debit: "2442 : 290 + 6011.26 : 2 000 + 6011.17 : 360 + 6055 : 40",
              credit: "4812 : 290 + 4011 : 2 400"
            },
          ],
          commentaire: "Les réductions incluses dans la facture initiale ne sont pas enregistrées séparément. Seules les factures d'AVOIR génèrent une écriture distincte.",
        },
    ],
  },

  "603": {
    libelle: "Variations des stocks de biens achetés",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges ou produit selon solde)",
    sens: "Débiteur ou Créditeur",
    contenu: "Ce compte enregistre les variations de stocks de biens et de marchandises achetés en retraçant les opérations relatives aux entrées en stocks, aux sorties de stocks, et aux différences constatées entre l'inventaire comptable permanent et l'inventaire physique.\n\nLes variations de stocks sont évaluées différemment selon le système d'inventaire utilisé.",
    subdivisions: {
      "6031": "Variations des stocks de marchandises",
      "6032": "Variations des stocks de matières premières et fournitures liées",
      "6033": "Variations des stocks d'autres approvisionnements"
    },
    fonctionnement: {
      debit: [
        "Inventaire intermittent — clôture : valeur du stock initial, par le crédit des comptes de stocks concernés (solde des stocks initiaux)",
        "Inventaire permanent — en cours : sorties de stocks, par le crédit des comptes de stocks concernés",
        "Inventaire permanent — clôture : différences en moins entre inventaire comptable et inventaire physique, par le crédit des stocks concernés"
      ],
      credit: [
        "Inventaire intermittent — clôture : valeur du stock final (inventaire physique), par le débit des comptes de stocks concernés",
        "Inventaire permanent — en cours : entrées en stocks, par le débit des comptes de stocks concernés",
        "Inventaire permanent — clôture : différences en plus entre inventaire comptable et inventaire physique, par le débit des comptes de stocks concernés"
      ]
    },
    commentaires: "Le solde des sous-comptes du compte 603 mesure la différence entre la valeur brute des stocks de biens achetés à la clôture et leur valeur brute à l'ouverture de l'exercice.\n\nSolde débiteur = diminution des stocks (déstockage) → aggrave les charges.\nSolde créditeur = augmentation des stocks → réduit les charges nettes.\n\nÀ la clôture, le compte 603 est viré pour solde au compte 13 – Résultat net de l'exercice.",
    exclusions: {
      texte: "Ne doit pas enregistrer les variations de stocks d'en-cours ou de produits fabriqués.",
      comptes: ["73 – Variations des stocks de biens et de services produits"]
    },
    controle: ["Inventaire physique", "Décompte physique et évaluation des stocks"],
    comptes_lies: ["6031","6032","6033","31","32","33","38","13"],
    textes_ref: ["SC OHADA — Compte 603 Variations des stocks de biens achetés"],
    exemples_ecritures: [
        {
          libelle: "Solde du stock initial (inventaire intermittent)",
          debit: "6031 – Variations des stocks de marchandises",
          credit: "31 – Marchandises (stock initial)"
        },
        {
          libelle: "Constatation du stock final (inventaire intermittent)",
          debit: "31 – Marchandises (stock final)",
          credit: "6031 – Variations des stocks de marchandises"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 3",
          titre: "Inventaire intermittent — stock de marchandises (stockage +1)",
          enonce: "Stock début d'exercice = 10, stock fin d'exercice = 11. Variation = +1 (stockage).",
          ecritures: [
            {
              libelle: "Annulation stock initial",
              debit: "6031 – Variations des stocks de marchandises : 10",
              credit: "31 – Marchandises : 10"
            },
            {
              libelle: "Constatation stock final",
              debit: "31 – Marchandises : 11",
              credit: "6031 – Variations des stocks de marchandises : 11"
            },
            {
              libelle: "OU écriture unique de variation (+1)",
              debit: "31 – Marchandises : 1",
              credit: "6031 – Variations des stocks de marchandises : 1"
            },
          ],
          commentaire: "Solde créditeur 6031 = stockage → réduit les charges. Solde débiteur = déstockage → alourdit les charges. Figurent en soustraction dans le compte de résultat.",
        },
        {
          ref: "App. 4",
          titre: "Inventaire intermittent — stock de produits finis (déstockage -3)",
          enonce: "Stock début d'exercice = 15, stock fin d'exercice = 12. Variation = -3 (déstockage).",
          ecritures: [
            {
              libelle: "Annulation stock initial",
              debit: "736 – Variations des stocks de produits finis : 15",
              credit: "36 – Produits finis : 15"
            },
            {
              libelle: "Constatation stock final",
              debit: "36 – Produits finis : 12",
              credit: "736 – Variations des stocks de produits finis : 12"
            },
            {
              libelle: "OU écriture unique de déstockage (-3)",
              debit: "736 – Variations des stocks de produits finis : 3",
              credit: "36 – Produits finis : 3"
            },
          ],
        },
        {
          ref: "App. 5",
          titre: "Achat fournitures — régularisation fin d'exercice",
          enonce: "Fournitures achetées 27/06/N pour 15 F (non stockées). Au 31/12/N il reste 3 F à consommer.",
          ecritures: [
            {
              libelle: "27/06/N — Achat fournitures non stockables",
              debit: "6055 – Fournitures de bureau non stockables : 15",
              credit: "4011 – Fournisseurs : 15"
            },
            {
              libelle: "31/12/N — Régularisation (stock résiduel)",
              debit: "476 – Charges constatées d'avance : 3",
              credit: "6055 – Fournitures de bureau non stockables : 3"
            },
          ],
          commentaire: "Les biens physiquement non stockables (eau, électricité) ne peuvent pas être régularisés — leur consommation est nécessairement immédiate.",
        },
    ],
  },

  "61": {
    libelle: "Transports",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges)",
    sens: "Débiteur",
    contenu: "Les frais de transport comprennent le montant des charges de port ou transports engagés par l'entreprise, à 611 TRANSPORTS SUR ACHATS (1) l'occasion des achats, des ventes, des déplacements de son personnel ou de l'expédition de plis.",
    subdivisions: {
      "611":  "Transports sur achats",
      "612":  "Transports sur ventes",
      "613":  "Transports pour le compte de tiers",
      "614":  "Transports du personnel",
      "616":  "Transport de plis",
      "618":  "Autres frais de transport",
      "6181": "Voyages et déplacements",
      "6182": "Transports entre établissements ou chantiers",
      "6183": "Autres transports entre établissements"
    },
    fonctionnement: {
      debit: [
        "Charges de port ou transports engagées, par le crédit des comptes de tiers ou de trésorerie concernés"
      ],
      credit: [
        "Factures d'avoir représentant des réductions commerciales ou annulations de factures, par le débit des comptes fournisseurs concernés",
        "Régularisation à la clôture : par le débit du compte 476 – Charges constatées d'avance",
        "Pour solde à la clôture : par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Le compte 616 – Transports de plis peut être débité à l'occasion du paiement d'un affranchissement, ou lors de l'achat à l'avance de figurines d'affranchissement ou bons de courses par coursier.",
    exclusions: {
      texte: "Ne doit pas enregistrer les consommations intermédiaires de biens et services lorsque l'entreprise effectue des transports pour son propre compte (carburants, réparations de véhicules, etc.).",
      comptes: ["Comptes de charges appropriés"]
    },
    controle: ["Factures et avoirs fournisseurs", "Documents de transport (connaissements, lettres de voiture)", "Inventaire des figurines d'affranchissement", "Bons de course"],
    comptes_lies: ["611","612","613","614","616","618","40","476","13"],
    textes_ref: ["SC OHADA — Compte 61 Transports"],
    exemples_ecritures: [
        {
          libelle: "Facture de transporteur pour livraison",
          debit: "612 – Transports sur ventes",
          credit: "401 – Fournisseurs"
        },
        {
          libelle: "Affranchissement du courrier",
          debit: "616 – Transport de plis",
          credit: "57 – Caisse"
        },
      ]
  },

  "62": {
    libelle: "Services extérieurs A",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre le montant des factures, paiements et rémunérations versés aux prestataires extérieurs à l'entreprise pour les services consommés, ainsi que les rabais, remises et ristournes obtenus hors factures.",
    subdivisions: {
      "621":  "Sous-traitance générale",
      "622":  "Locations et charges locatives",
      "6221": "Locations de terrains",
      "6222": "Locations de bâtiments",
      "6223": "Locations de matériels et outillages",
      "6224": "Malis sur emballages",
      "6225": "Locations d'emballages",
      "6228": "Locations et charges locatives diverses",
      "623":  "Redevances de crédit-bail et contrats assimilés",
      "6232": "Crédit-bail immobilier",
      "6233": "Crédit-bail mobilier",
      "6235": "Contrats assimilés",
      "624":  "Entretien, réparations et maintenance",
      "6241": "Entretien et réparations des biens immobiliers",
      "6242": "Entretien et réparations des biens mobiliers",
      "6243": "Maintenance",
      "6248": "Autres entretiens et réparations",
      "625":  "Primes d'assurance",
      "6251": "Assurances multirisques",
      "6252": "Assurances matériel de transport",
      "6253": "Assurances risques d'exploitation",
      "6254": "Assurances responsabilité du producteur",
      "6255": "Assurances insolvabilité clients",
      "6256": "Assurances transports sur achats",
      "6257": "Assurances transports sur ventes",
      "6258": "Autres primes d'assurances",
      "626":  "Études, recherches et documentation",
      "6261": "Études et recherches",
      "6265": "Documentation générale",
      "6266": "Documentation technique",
      "627":  "Publicité, publications, relations publiques",
      "6271": "Annonces, insertions",
      "6272": "Catalogues, imprimés publicitaires",
      "6273": "Échantillons",
      "6274": "Foires et expositions",
      "6275": "Publications",
      "6276": "Cadeaux à la clientèle",
      "6277": "Frais de colloques, séminaires, conférences",
      "6278": "Autres charges de publicité et relations publiques",
      "628":  "Frais de télécommunications",
      "6281": "Frais de téléphone",
      "6282": "Frais de télex",
      "6283": "Frais de télécopie",
      "6288": "Autres frais de télécommunications"
    },
    fonctionnement: {
      debit: [
        "Montant des factures de services, par le crédit d'un compte de tiers ou de trésorerie"
      ],
      credit: [
        "Rabais, remises et ristournes éventuellement obtenus hors factures, par le débit des comptes fournisseurs",
        "Régularisation : par le débit du compte 476 – Charges constatées d'avance",
        "Pour solde à la clôture : par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Les services sont classés par nature. La consommation de services est rapportée à la période comptable par le jeu de comptes d'abonnements ou de régularisation.\n\nNe sont pas considérés comme services consommés (classés avec les produits dans la fabrication desquels ils sont incorporés) :\n— Les travaux à façon\n— Les sous-traitances industrielles\n— Les frais de réparation effectués par le fabricant du produit",
    exclusions: {
      texte: "Ne doit pas enregistrer les frais d'acquisition directement rattachables aux immobilisations.",
      comptes: ["Comptes de la classe 2"]
    },
    controle: ["Factures et avoirs fournisseurs", "Dispositions des contrats"],
    comptes_lies: ["621","622","623","624","625","626","627","628","40","476","13"],
    textes_ref: ["SC OHADA — Compte 62 Services extérieurs A"]
  },

  "63": {
    libelle: "Services extérieurs B",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges)",
    sens: "Débiteur",
    contenu: "Ces deux comptes enregistrent le montant des factures, paiements et rémunérations versés aux prestataires extérieurs à l'entreprise et les éventuels rabais, remises et ristournes obtenus hors factures sur les services extérieurs consommés.",
    subdivisions: {
      "631":  "Frais bancaires",
      "6311": "Frais sur titres (achat, vente, garde)",
      "6312": "Frais sur effets",
      "6313": "Location de coffres",
      "6315": "Commissions sur cartes de crédit",
      "6316": "Frais d'émission d'emprunts",
      "6318": "Autres frais bancaires",
      "632":  "Rémunérations d'intermédiaires et de conseils",
      "6321": "Commissions et courtages sur achats",
      "6322": "Commissions et courtages sur ventes",
      "6323": "Rémunérations des transitaires",
      "6324": "Honoraires",
      "6325": "Frais d'actes et de contentieux",
      "6328": "Divers frais",
      "633":  "Frais de formation du personnel",
      "634":  "Redevances pour brevets, licences, logiciels et droits similaires",
      "6342": "Redevances pour brevets, licences, concessions et droits similaires",
      "6343": "Redevances pour logiciels",
      "6344": "Redevances pour marques",
      "635":  "Cotisations",
      "6351": "Cotisations",
      "6358": "Concours divers",
      "637":  "Rémunérations de personnel extérieur à l'entreprise",
      "6371": "Personnel intérimaire",
      "6372": "Personnel détaché ou prêté à l'entreprise",
      "638":  "Autres charges externes",
      "6381": "Frais de recrutement du personnel",
      "6382": "Frais de déménagement",
      "6383": "Réceptions",
      "6384": "Missions"
    },
    fonctionnement: {
      debit: [
        "Montant des factures de services, par le crédit d'un compte de tiers ou de trésorerie"
      ],
      credit: [
        "Rabais, remises et ristournes éventuellement obtenus hors factures, par le débit des comptes fournisseurs",
        "Régularisation : par le débit du compte 476 – Charges constatées d'avance",
        "Pour solde à la clôture : par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Fonctionnement rigoureusement identique au compte 62. La distinction 62/63 est purement pratique pour répartir la diversité des services extérieurs.\n\nLe compte 637 – Rémunérations de personnel extérieur est soldé en fin d'exercice par virement au compte 667 – Rémunération transférée de personnel extérieur.",
    exclusions: {
      texte: "Ne doit pas enregistrer les frais d'acquisition directement rattachables aux immobilisations.",
      comptes: ["Comptes de la classe 2"]
    },
    controle: ["Factures et avoirs fournisseurs", "Dispositions des contrats"],
    comptes_lies: ["631","632","633","634","635","637","638","40","476","667","13"],
    textes_ref: ["SC OHADA — Compte 63 Services extérieurs B"],
    exemples_ecritures: [
        {
          libelle: "Facture d'honoraires d'un avocat",
          debit: "6324 – Honoraires",
          credit: "401 – Fournisseurs"
        },
        {
          libelle: "Formation du personnel",
          debit: "633 – Frais de formation du personnel",
          credit: "401 – Fournisseurs"
        },
        {
          libelle: "Redevance pour brevet",
          debit: "6342 – Redevances pour brevets, licences",
          credit: "401 – Fournisseurs"
        },
      ]
  },

  "64": {
    libelle: "Impôts et taxes",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre le montant des charges correspondant à des versements obligatoires à l'Etat et aux collectivités publiques pour subvenir à des dépenses publiques, ou encore des versements institués par les autorités pour le financement d'actions d'intérêt général.",
    subdivisions: {
      "641":  "Impôts et taxes directs",
      "6411": "Impôts fonciers et taxes annexes",
      "6412": "Patentes, licences et taxes annexes",
      "6413": "Taxes sur appointements et salaires",
      "6414": "Taxes d'apprentissage",
      "6415": "Formation professionnelle continue",
      "6418": "Autres impôts et taxes directs",
      "645":  "Impôts et taxes indirects",
      "646":  "Droits d'enregistrement",
      "6461": "Droits de mutation",
      "6462": "Droits de timbre",
      "6463": "Taxes sur les véhicules de société",
      "6464": "Vignettes",
      "6468": "Autres droits",
      "647":  "Pénalités et amendes fiscales",
      "6471": "Pénalités d'assiette, impôts directs",
      "6472": "Pénalités d'assiette, impôts indirects",
      "6473": "Pénalités de recouvrement, impôts directs",
      "6474": "Pénalités de recouvrement, impôts indirects",
      "6478": "Autres amendes pénales et fiscales",
      "648":  "Autres impôts et taxes"
    },
    fonctionnement: {
      debit: [
        "Montant de l'impôt dû, par le crédit du compte 44 – État et collectivités publiques ou par le crédit des comptes de trésorerie"
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Le compte 64 enregistre tous les impôts et taxes à la charge de l'entreprise, à l'exception de ceux assis sur les résultats (compte 89 – Impôts sur le résultat).\n\nLes impôts récupérables sur des tiers ou sur le Trésor sont enregistrés aux comptes de la classe 4.\n\nLes droits de douane affectables de façon certaine à des achats sont compris dans le prix d'achat rendu frontière (compte 60).\n\n6412 – Patentes/licences : versements au titre de l'exercice d'un commerce, industrie, profession, ou de l'exploitation d'un brevet.\n6413 – Taxes sur appointements et salaires : versements à la charge de l'employeur.\n646 – Droits d'enregistrement : actes juridiques, timbres, taxes sur véhicules.\n647 – Pénalités fiscales : pénalités d'assiette (inexactitudes, retards de déclaration) et pénalités de recouvrement (versements tardifs).",
    exclusions: {
      texte: "Ne doit pas enregistrer les annuités de remboursement d'emprunts d'État, les droits de douane sur immobilisations ou incorporés dans le prix d'achat, ni l'impôt sur les bénéfices.",
      comptes: ["16 – Emprunts et dettes assimilées", "Classe 2 (droits de douane sur immobilisations)", "60 – Achats (droits de douane incorporés au prix)", "89 – Impôts sur le résultat"]
    },
    controle: ["Déclarations fiscales", "Avis d'imposition", "Règlements à l'ordre du Trésor"],
    comptes_lies: ["641","645","646","647","648","44","89","13"],
    textes_ref: ["SC OHADA — Compte 64 Impôts et taxes"],
    exemples_ecritures: [
        {
          libelle: "Paiement de la patente annuelle",
          debit: "6412 – Patentes, licences et taxes annexes",
          credit: "52 – Banques"
        },
        {
          libelle: "Constatation de l'impôt foncier dû",
          debit: "6411 – Impôts fonciers",
          credit: "442 – État, autres impôts et taxes"
        },
        {
          libelle: "Taxe sur appointements et salaires",
          debit: "6413 – Taxes sur appointements et salaires",
          credit: "44 – État et collectivités publiques"
        },
      ]
  },

  "65": {
    libelle: "Autres charges",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre le montant des charges, souvent accessoires, qui entrent dans les consommations de l'exercice en provenance de tiers pour le calcul de la valeur ajoutée de gestion.",
    subdivisions: {
      "651":  "Pertes sur créances clients et autres débiteurs",
      "6511": "Clients",
      "6515": "Autres débiteurs",
      "652":  "Quote-part de résultat sur opérations faites en commun",
      "6521": "Quote-part transférée de bénéfices (comptabilité du gérant)",
      "6525": "Pertes imputées par transfert (comptabilité des associés non gérants)",
      "653":  "Quote-part de résultat annulée sur exécution partielle de contrats pluri-exercices",
      "654":  "Valeurs comptables des cessions courantes d'immobilisations",
      "658":  "Charges diverses",
      "6581": "Jetons de présence et autres rémunérations d'administrateurs",
      "6582": "Dons",
      "6583": "Mécénat"
    },
    fonctionnement: {
      debit: [
        "Montant de la charge, par le crédit d'un compte de tiers ou de trésorerie, ou par le crédit d'un compte d'immobilisations (pour le compte 654)"
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "653 – Quote-part de résultat annulée sur contrats pluri-exercices : correspond à une partie du bénéfice global d'un contrat non encore achevé, inscrite dans les résultats antérieurs et annulée en raison d'une révision à la baisse du bénéfice prévisionnel final.",
    exclusions: {
      texte: "Ne doit pas enregistrer les charges H.A.O. constatées.",
      comptes: ["831 – Charges H.A.O. constatées"]
    },
    controle: ["Factures", "Notifications de cessation de paiement", "Calculs de comptabilité analytique (compte 653)"],
    comptes_lies: ["651","652","653","654","658","831","13"],
    textes_ref: ["SC OHADA — Compte 65 Autres charges"]
  },

  "659": {
    libelle: "Charges provisionnées d'exploitation",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre les dotations pour dépréciation des éléments de l'actif circulant ainsi que les dotations aux provisions pour risques à court terme.",
    subdivisions: {
      "6591": "Sur risques à court terme",
      "6593": "Sur stocks",
      "6594": "Sur créances",
      "6598": "Autres charges provisionnées"
    },
    fonctionnement: {
      debit: [
        "Dépréciations de l'actif circulant, par le crédit des comptes 39 et 49 (sauf 499) — actifs soustractifs",
        "Risques provisionnés à court terme, par le crédit du compte 499 – Risques provisionnés (passif)"
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Le SC OHADA considère ces dotations comme des décaissements probables à brève échéance. Elles figurent dans le compte de résultat comme des charges externes.\n\nContrairement aux dotations aux provisions (compte 69) qui concernent l'actif immobilisé, les charges provisionnées d'exploitation (compte 659) concernent l'actif circulant (stocks et créances à court terme).",
    exclusions: {
      texte: "Ne doit pas enregistrer les charges provisionnées H.A.O.",
      comptes: ["839 – Charges H.A.O. provisionnées"]
    },
    controle: ["Factures", "Notifications de cessation de paiements", "Relevés"],
    comptes_lies: ["6591","6593","6594","6598","39","49","499","839","13"],
    textes_ref: ["SC OHADA — Compte 659 Charges provisionnées d'exploitation"]
  },

  "66": {
    libelle: "Charges de personnel",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre l'ensemble des rémunérations du personnel de l'entreprise, qu'il s'agisse d'appointements et salaires, de commissions, de congés payés, de primes, de gratifications, d'indemnités de logement ou d'indemnités diverses, et, le cas échéant, les rémunérations de l'exploitant individuel, en contrepartie du travail fourni. Il enregistre aussi les charges sociales payées par l'entreprise au titre des salaires, ainsi que les avantages en nature.\n\nPar ailleurs il est débité en fin d'exercice des montants facturés à l'entreprise au titre du \"Personnel\" extérieur, intérimaire, détaché ou prêté.",
    subdivisions: {
      "661":  "Rémunérations directes versées au personnel national",
      "6611": "Appointements, salaires et commissions",
      "6612": "Primes et gratifications",
      "6613": "Congés payés",
      "6614": "Indemnités de préavis, de licenciement et de recherche d'embauche",
      "6615": "Indemnités de maladie versées aux travailleurs",
      "6616": "Supplément familial",
      "6617": "Avantages en nature",
      "6618": "Autres rémunérations directes",
      "662":  "Rémunérations directes versées au personnel non national",
      "6621": "Appointements, salaires et commissions",
      "6622": "Primes et gratifications",
      "6623": "Congés payés",
      "6624": "Indemnités de préavis, de licenciement et de recherche d'embauche",
      "6625": "Indemnités de maladie versées aux travailleurs",
      "6626": "Supplément familial",
      "6627": "Avantages en nature",
      "6628": "Autres rémunérations directes",
      "663":  "Indemnités forfaitaires versées au personnel",
      "6631": "Indemnités de logement",
      "6632": "Indemnités de représentation",
      "6633": "Indemnités d'expatriation",
      "6638": "Autres indemnités et avantages divers",
      "664":  "Charges sociales",
      "6641": "Charges sociales sur rémunération du personnel national",
      "6642": "Charges sociales sur rémunération du personnel non national",
      "666":  "Rémunération et charges sociales de l'exploitant individuel",
      "6661": "Rémunération du travail de l'exploitant",
      "6662": "Charges sociales",
      "667":  "Rémunération transférée de personnel extérieur",
      "6671": "Personnel intérimaire",
      "6672": "Personnel détaché ou prêté à l'entreprise",
      "668":  "Autres charges sociales",
      "6681": "Versements aux syndicats et comités d'entreprise, d'établissement",
      "6682": "Versements aux comités d'hygiène et de sécurité",
      "6683": "Versements aux autres œuvres sociales",
      "6684": "Médecine du travail et pharmacie"
    },
    fonctionnement: {
      debit: [
        "Rémunération brute versée au personnel, par le crédit du compte 422 – Personnel, rémunérations dues",
        "Ou par le crédit du compte 781 – Transferts de charges d'exploitation (avantages en nature)",
        "Charges sociales patronales, par le crédit du compte 43 – Organismes sociaux ou du compte 44 – État et collectivités publiques",
        "Charges de personnel extérieur (compte 667) : transfert en fin d'exercice du compte 637 – Rémunérations de personnel extérieur (virement soldant le 637)"
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Le compte 66 (sauf 667) est débité de la rémunération brute. Les cotisations salariales sont débitées au compte 42 – Personnel par le crédit du compte 43 – Organismes sociaux.\n\nLes avantages en nature sont d'abord enregistrés dans les comptes de charges par nature concernés, puis transférés dans les frais de personnel via le compte 78 – Transferts de charges.\n\nLes frais de voyage, réception et dépenses exposées par le personnel pour l'entreprise sont enregistrés en 62 ou 63.",
    exclusions: {
      texte: "Ne doit pas enregistrer les impôts assis sur les rémunérations, les charges considérées comme consommations intermédiaires, les rémunérations de tiers non salariés, ni les honoraires.",
      comptes: ["6413 – Taxes sur appointements et salaires", "Comptes appropriés classe 6", "632 – Rémunérations d'intermédiaires et de conseils"]
    },
    controle: ["Livres de paie", "Fiches de paie", "Déclarations sociales et fiscales"],
    comptes_lies: ["661","662","663","664","666","667","668","422","43","44","637","781","13"],
    textes_ref: ["SC OHADA — Compte 66 Charges de personnel"],
    exemples_ecritures: [
        {
          libelle: "Comptabilisation des salaires bruts du mois",
          debit: "661 – Rémunérations directes",
          credit: "422 – Personnel, rémunérations dues"
        },
        {
          libelle: "Charges sociales patronales",
          debit: "664 – Charges sociales (part patronale)",
          credit: "431 – Sécurité sociale"
        },
        {
          libelle: "Avantages en nature accordés au personnel",
          debit: "66 – Charges de personnel",
          credit: "78 – Transferts de charges d'exploitation"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 10",
          titre: "Charges de personnel — bulletin de paie complet",
          enonce: "Cadre national : appointements 110, prime 10, brut 120. Cot. salariales SS 12 + retraite 7 = 19. Impôt 5, saisie 20, acompte 40. Remboursement frais 2. Net 38. Cot. patronales SS 18 + retraite 11 = 29. Avantage en nature : loyer 8.",
          ecritures: [
            {
              libelle: "Salaire brut (appointements + prime)",
              debit: "6611 – Appointements : 110 + 6612 – Primes : 10",
              credit: "422 – Personnel, rémunérations dues : 120"
            },
            {
              libelle: "Cotisations salariales retenues",
              debit: "422 – Personnel, rémunérations dues : 19",
              credit: "431 – Sécurité sociale : 12 + 432 – Retraite complémentaire : 7"
            },
            {
              libelle: "Retenues diverses (impôt + saisie + acompte)",
              debit: "422 – Personnel, rémunérations dues : 65",
              credit: "4212 – Acomptes : 40 + 4232 – Saisies-arrêts : 20 + 447 – Impôt retenu : 5"
            },
            {
              libelle: "Remboursement de frais (fournitures justifiées)",
              debit: "6055 – Fournitures non stockables : 2",
              credit: "422 – Personnel, rémunérations dues : 2"
            },
            {
              libelle: "Versement net à payer",
              debit: "422 – Personnel, rémunérations dues : 36",
              credit: "52 – Banques : 36"
            },
            {
              libelle: "Charges patronales",
              debit: "6641 – Charges sociales personnel national : 29",
              credit: "431 – Sécurité sociale : 18 + 432 – Retraite complémentaire : 11"
            },
            {
              libelle: "Avantage en nature — réception facture loyer",
              debit: "622 – Locations et charges locatives : 8",
              credit: "401 – Fournisseurs : 8"
            },
            {
              libelle: "Avantage en nature — transfert en charges de personnel (clôture)",
              debit: "6617 – Avantages en nature : 8",
              credit: "781 – Transferts de charges d'exploitation : 8"
            },
          ],
          commentaire: "Avantages en nature : d'abord comptabilisés dans leur compte par nature (622), puis transférés en charges personnel (6617) via 781 en fin d'exercice.",
        },
    ],
  },

  "67": {
    libelle: "Frais financiers et charges assimilées",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre l'ensemble des charges financières dues à différents tiers intervenant dans le financement de l'entreprise (à l'exclusion de la rémunération des capitaux propres et à celle des services bancaires).",
    subdivisions: {
      "671":  "Intérêts des emprunts",
      "6711": "Emprunts obligataires",
      "6712": "Emprunts auprès des établissements de crédit",
      "6713": "Dettes liées à des participations",
      "672":  "Intérêts dans loyers de crédit-bail et contrats assimilés",
      "6721": "Intérêts dans loyers de crédit-bail immobilier",
      "6722": "Intérêts dans loyers de crédit-bail mobilier",
      "6723": "Intérêts dans loyers d'autres contrats",
      "673":  "Escomptes accordés",
      "674":  "Autres intérêts",
      "6741": "Avances reçues et dépôts créditeurs",
      "6742": "Comptes courants bloqués",
      "6743": "Intérêts sur obligations cautionnées",
      "6744": "Intérêts sur dettes commerciales",
      "6745": "Intérêts bancaires et sur opérations de trésorerie et d'escompte",
      "6748": "Intérêts sur dettes diverses",
      "675":  "Escompte des effets de commerce",
      "676":  "Pertes de change",
      "677":  "Pertes sur cessions de titres de placement",
      "678":  "Pertes sur risques financiers",
      "6781": "Sur rentes viagères",
      "6782": "Sur opérations financières",
      "6784": "Sur instruments de trésorerie",
      "679":  "Charges provisionnées financières",
      "6791": "Sur risques financiers",
      "6795": "Sur titres de placement",
      "6798": "Autres charges provisionnées financières"
    },
    fonctionnement: {
      debit: [
        "Frais dus et pertes financières constatées, par le crédit des comptes de tiers concernés ou de trésorerie",
        "Dépréciations à court terme des titres de placement, par le crédit du compte 59 – Dépréciations et risques provisionnés (Trésorerie)"
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "671 – Intérêts des emprunts : charges en rémunération des capitaux consentis par des tiers.\n672 – Intérêts dans loyers de crédit-bail : quote-part financière des redevances versées.\n673 – Escomptes accordés : réductions consenties aux clients pour règlement anticipé.\n675 – Escompte des effets de commerce : frais bancaires prélevés lors de l'escompte.\n676 – Pertes de change : pertes réalisées et écarts de conversion négatifs sur disponibilités en devises à la clôture. À ne pas confondre avec le compte 478 – Écarts de conversion-Actif (pertes probables).\n677 – Pertes sur cessions de titres de placement : différence négative entre valeur d'entrée et prix de cession.\n679 – Charges provisionnées financières : charges financières potentielles évaluées à l'arrêté des comptes.\n\nIntérêts intercalaires : d'abord comptabilisés au compte 67, puis transférés au compte d'immobilisation par le crédit du compte 72 – Production immobilisée.",
    exclusions: {
      texte: "Ne doit pas enregistrer les remboursements d'emprunts, les intérêts intercalaires à immobiliser, les commissions bancaires de services, ni les primes de remboursement d'obligations.",
      comptes: ["16 – Emprunts et dettes assimilées", "Classe 2 (intérêts à immobiliser)", "631 – Frais bancaires", "206 – Primes de remboursement des obligations"]
    },
    controle: ["Relevés de banque", "Décomptes d'intérêt"],
    comptes_lies: ["671","672","673","674","675","676","677","678","679","59","72","16","13"],
    textes_ref: ["SC OHADA — Compte 67 Frais financiers et charges assimilées"],
    exemples_ecritures: [
        {
          libelle: "Intérêts sur emprunt bancaire courus à la clôture",
          debit: "671 – Intérêts des emprunts",
          credit: "166 – Intérêts courus"
        },
        {
          libelle: "Escompte accordé à un client pour paiement anticipé",
          debit: "673 – Escomptes accordés",
          credit: "411 – Clients"
        },
        {
          libelle: "Perte de change réalisée sur règlement en devises",
          debit: "676 – Pertes de change",
          credit: "52 – Banques (différence de cours)"
        },
      ]
  },

  "68": {
    libelle: "Dotations aux amortissements",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges calculées)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre, au titre de l'exercice, les dotations aux amortissements, d'exploitation et à caractère financier, dans leur conception économique et comptable (et non pas fiscale).",
    subdivisions: {
      "681":  "Dotations aux amortissements d'exploitation",
      "6811": "Dotations aux amortissements des charges immobilisées",
      "6812": "Dotations aux amortissements des immobilisations incorporelles",
      "6813": "Dotations aux amortissements des immobilisations corporelles",
      "687":  "Dotations aux amortissements à caractère financier",
      "6872": "Dotations aux amortissements des primes de remboursement des obligations",
      "6878": "Autres dotations aux amortissements à caractère financier"
    },
    fonctionnement: {
      debit: [
        "Montant des dotations de la période, par le crédit des comptes d'amortissements (28) pour la dépréciation économique, ou pour la répartition de charges immobilisées"
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Le compte 68 enregistre à la clôture les charges 'calculées' de la période : amortissements des charges immobilisées, des immobilisations incorporelles et corporelles, et le complément éventuel d'amortissement des immobilisations cédées, mises hors service ou au rebut.\n\nLes dotations aux amortissements des charges immobilisées sont imputées directement au crédit des comptes concernés sans transiter par un compte 'Amortissements'.\n\nSi les dispositions fiscales autorisent des amortissements accélérés, l'amortissement technique normal figure au compte 68 et le complément fiscal figure au débit du compte 85 – Dotations H.A.O. par le crédit du compte 151 – Amortissements dérogatoires.",
    exclusions: {
      texte: "Ne doit pas enregistrer les dotations aux provisions, les charges provisionnées, ni les dotations aux amortissements H.A.O.",
      comptes: ["69 – Dotations aux provisions", "659 – Charges provisionnées d'exploitation", "852 – Dotations aux amortissements H.A.O."]
    },
    controle: ["Plans et tableaux d'amortissement"],
    comptes_lies: ["681","687","28","85","151","13"],
    textes_ref: ["SC OHADA — Compte 68 Dotations aux amortissements"],
    exemples_ecritures: [
        {
          libelle: "Amortissement d'un bâtiment en fin d'exercice (4 %)",
          debit: "6813 – Dotations aux amortissements des immob. corporelles",
          credit: "283 – Amortissements des bâtiments"
        },
        {
          libelle: "Amortissement d'un logiciel (33 %)",
          debit: "6812 – Dotations aux amortissements des immob. incorporelles",
          credit: "2813 – Amortissements des logiciels"
        },
        {
          libelle: "Amortissement des primes de remboursement d'obligations",
          debit: "6872 – Dotations aux amortissements des primes de remboursement",
          credit: "206 – Primes de remboursement des obligations"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 17",
          titre: "Dotations aux amortissements — schéma de clôture",
          enonce: "En fin d'exercice, constater les dotations économiques et, si applicable, le complément dérogatoire fiscal.",
          ecritures: [
            {
              libelle: "Dotation économique — immob. incorporelles",
              debit: "6812 – Dotations amortissements immob. incorporelles",
              credit: "281 – Amortissements des immob. incorporelles"
            },
            {
              libelle: "Dotation économique — immob. corporelles",
              debit: "6813 – Dotations amortissements immob. corporelles",
              credit: "283/284 – Amortissements des immob. corporelles"
            },
            {
              libelle: "Dotation économique — charges immobilisées (amort. direct)",
              debit: "6811 – Dotations amortissements charges immobilisées",
              credit: "201/202 – Charges immobilisées"
            },
            {
              libelle: "Complément dérogatoire (surplus fiscal)",
              debit: "851 – Dotations H.A.O. aux provisions réglementées",
              credit: "151 – Amortissements dérogatoires"
            },
            {
              libelle: "Reprise dérogatoire en fin de vie du bien",
              debit: "151 – Amortissements dérogatoires",
              credit: "861 – Reprises de provisions réglementées"
            },
            {
              libelle: "Reprise sur révision de plan d'amortissement",
              debit: "28 – Amortissements",
              credit: "798 – Reprises d'amortissements"
            },
          ],
          commentaire: "Compte 68 = dépréciation économique uniquement. Amortissements dérogatoires (surplus fiscal) : toujours via 851/151/861, jamais via 681.",
        },
    ],
  },

  "69": {
    libelle: "Dotations aux provisions",
    classe: "Classe 6 — Charges",
    nature: "Compte de gestion (Charges calculées)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre, au titre de l'exercice, les dotations aux provisions d'exploitation et à caractère financier, en couverture de dépréciations, risques, charges ou pertes à prévoir.",
    subdivisions: {
      "691":  "Dotations aux provisions d'exploitation",
      "6911": "Pour risques et charges",
      "6912": "Pour grosses réparations",
      "6913": "Pour dépréciation des immobilisations incorporelles",
      "6914": "Pour dépréciation des immobilisations corporelles",
      "697":  "Dotations aux provisions financières",
      "6971": "Pour risques et charges",
      "6972": "Pour dépréciation des immobilisations financières"
    },
    fonctionnement: {
      debit: [
        "Montant des dotations de l'exercice (création ou ajustement en hausse), par le crédit des comptes de provisions 19 ou 29"
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Règles de comptabilisation des provisions :\n— Création ou ajustement en hausse : débit 69 / crédit 19 ou 29\n— Ajustement en baisse ou annulation : débit 19 ou 29 / crédit 79 – Reprises de provisions\n— Lorsqu'un risque ou une charge provisionnée se réalise : comptabilisation dans un compte approprié de la classe 6 ou 8, puis reprise intégrale de la provision (débit 19 ou 29 / crédit 79)\n\nLe compte 69 concerne exclusivement les provisions pour dépréciation de l'actif immobilisé et les provisions pour risques et charges à plus d'un an.",
    exclusions: {
      texte: "Ne doit pas enregistrer les dotations aux provisions H.A.O., les charges provisionnées sur actif circulant (stocks, créances), ni les dépréciations sur éléments de trésorerie.",
      comptes: ["85 – Dotations H.A.O.", "659 – Charges provisionnées d'exploitation", "679 – Charges provisionnées financières"]
    },
    controle: ["Documents justifiant les charges à prévoir", "Dépréciations d'éléments d'actif", "Risques sur opérations de l'exercice"],
    comptes_lies: ["691","697","19","29","79","85","659","679","13"],
    textes_ref: ["SC OHADA — Compte 69 Dotations aux provisions"],
    exemples_ecritures: [
        {
          libelle: "Dotation aux provisions pour dépréciation d'immobilisations",
          debit: "691 – Dotations aux provisions d'exploitation",
          credit: "291 – Provisions pour dépréciation des immob. incorporelles"
        },
        {
          libelle: "Dotation aux provisions pour grosses réparations",
          debit: "691 – Dotations aux provisions d'exploitation",
          credit: "197 – Provisions pour charges à répartir"
        },
        {
          libelle: "Dotation aux provisions pour dépréciation d'immob. financières",
          debit: "697 – Dotations aux provisions financières",
          credit: "296 – Provisions pour dépréciation des titres de participation"
        },
      ]
  },

  /* ═══════════════════════════════════════════════════════════════
     CLASSE 7 — COMPTES DE PRODUITS DES ACTIVITÉS ORDINAIRES
  ═══════════════════════════════════════════════════════════════ */

  "7": {
    libelle: "Produits des activités ordinaires",
    classe: "Classe 7",
    nature: "Classe de comptes",
    sens: "Créditeur",
    contenu: "Les comptes de la classe 7 enregistrent les produits liés à l'activité ordinaire de l'entreprise, résultant de la vente de biens ou de services, de la production de biens ou de services non encore vendus, ou livrés à soi-même. Doivent être rattachés à l'exercice tous les produits le concernant effectivement.",
    fonctionnement: { debit: [], credit: [] },
    commentaires: "À la clôture de l'exercice, tous les comptes de produits de la classe 7 sont virés pour solde au crédit du compte 13 – Résultat net de l'exercice.",
    comptes_lies: ["70","71","72","73","75","759","77","78","79"],
    textes_ref: ["Acte Uniforme OHADA — Classe 7 Produits des activités ordinaires"],
    exemples_ecritures: []
  },

  "70": {
    libelle: "Ventes",
    classe: "Classe 7 — Produits",
    nature: "Compte de gestion (Produits)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre les ressources de l'entreprise provenant de la vente des marchandises, des travaux effectués et des services rendus à des tiers.",
    subdivisions: {
      "701":  "Ventes de marchandises",
      "7011": "Dans la Région",
      "7012": "Hors Région",
      "7013": "Aux entreprises du groupe dans la Région",
      "7014": "Aux entreprises du groupe hors Région",
      "702":  "Ventes de produits finis",
      "7021": "Dans la Région",
      "7022": "Hors Région",
      "7023": "Aux entreprises du groupe dans la Région",
      "7024": "Aux entreprises du groupe hors Région",
      "703":  "Ventes de produits intermédiaires",
      "7031": "Dans la Région",
      "7032": "Hors Région",
      "7033": "Aux entreprises du groupe dans la Région",
      "7034": "Aux entreprises du groupe hors Région",
      "704":  "Ventes de produits résiduels",
      "7041": "Dans la Région",
      "7042": "Hors Région",
      "7043": "Aux entreprises du groupe dans la Région",
      "7044": "Aux entreprises du groupe hors Région",
      "705":  "Travaux facturés",
      "7051": "Dans la Région",
      "7052": "Hors Région",
      "7053": "Aux entreprises du groupe dans la Région",
      "7054": "Aux entreprises du groupe hors Région",
      "706":  "Services vendus",
      "7061": "Dans la Région",
      "7062": "Hors Région",
      "7063": "Aux entreprises du groupe dans la Région",
      "7064": "Aux entreprises du groupe hors Région",
      "707":  "Produits accessoires",
      "7071": "Ports, emballages perdus et autres frais facturés",
      "7072": "Commissions et courtages",
      "7073": "Locations",
      "7074": "Bonis sur reprises et cessions d'emballage",
      "7075": "Mise à disposition de personnel",
      "7076": "Redevances pour brevets, logiciels, marques et droits similaires",
      "7077": "Services exploités dans l'intérêt du personnel",
      "7078": "Autres produits accessoires"
    },
    fonctionnement: {
      credit: [
        "Montant des facturations (prix net de taxes collectées, déduction faite des rabais/remises déduits sur facture), par le débit du compte 41 – Clients et comptes rattachés ou d'un compte de trésorerie"
      ],
      debit: [
        "Retours sur ventes et rabais, remises, ristournes accordés hors factures, par le crédit du compte 41 – Clients et comptes rattachés",
        "Pour solde à la clôture : par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "701 – Ventes de marchandises : entreprises commerciales.\n702 à 705 – Entreprises industrielles.\n706 – Services vendus : entreprises de services.\n\nLes escomptes de règlement, même déduits sur la facture, sont comptabilisés au débit du compte 673 – Escomptes accordés (et non au compte 70).",
    exclusions: {
      texte: "Ne doit pas enregistrer les subventions d'exploitation compensatrices d'insuffisances de tarifs.",
      comptes: ["71 – Subventions d'exploitation"]
    },
    controle: ["Factures de ventes", "Factures d'avoirs", "Vérification des marges"],
    comptes_lies: ["701","702","703","704","705","706","707","41","443","673","13"],
    textes_ref: ["SC OHADA — Compte 70 Ventes"],
    exemples_ecritures: [
        {
          libelle: "Vente de marchandises à crédit (HT + TVA)",
          debit: "411 – Clients",
          credit: "701 – Ventes de marchandises (HT) + 443 – TVA facturée"
        },
        {
          libelle: "Avoir accordé pour retour de marchandises",
          debit: "701 – Ventes de marchandises",
          credit: "411 – Clients"
        },
        {
          libelle: "Prestation de services facturée au comptant",
          debit: "57 – Caisse",
          credit: "706 – Services vendus"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 2",
          titre: "Ventes de marchandises et de produits finis",
          enonce: "Facture n°1 chez fournisseur A : caisse 300 (marchd), ordinateurs fabriqués 2 000 (prod. finis), papier 500 (marchd). Port facturé 280. TVA 10 % = 308. Net à payer = 3 388.",
          ecritures: [
            {
              libelle: "Émission de la facture de vente globale",
              debit: "4111 – Clients : 3 388",
              credit: "7011.26 – Ventes marchds caisse : 300 + 7021.26 – Ventes prod. finis : 2 000 + 7011.17 – Ventes marchds papier : 500 + 7071 – Ports facturés : 280 + 4431 – TVA facturée : 308"
            },
          ],
          commentaire: "Marchds vendues en l'état = 701. Produits fabriqués = 702 à 704. Escomptes de règlement : 673 (accordés) / 773 (obtenus), même s'ils figurent sur la facture.",
        },
    ],
  },

  "71": {
    libelle: "Subventions d'exploitation",
    classe: "Classe 7 — Produits",
    nature: "Compte de gestion (Produits)",
    sens: "Créditeur",
    contenu: "Ce sont des aides financières accordées par l'Etat, des collectivités publiques ou des tiers, qui ne sont ni des fonds de dotation, ni des subventions d'investissement. Elles sont destinées à compenser l'insuffisance du prix de vente administré, ou à faire face à des charges d'exploitation.",
    subdivisions: {
      "711":  "Sur produits à l'exportation",
      "712":  "Sur produits à l'importation",
      "713":  "Sur produits de péréquation",
      "718":  "Autres subventions d'exploitation",
      "7181": "Versées par l'État et les collectivités publiques",
      "7182": "Versées par les organismes internationaux",
      "7183": "Versées par des tiers"
    },
    fonctionnement: {
      credit: [
        "Subventions acquises, par le débit du compte 4495 – État, subventions d'exploitation à recevoir, ou du compte 4582 – Organismes internationaux, subventions à recevoir",
        "Et par le débit des comptes de trésorerie à la date d'encaissement"
      ],
      debit: [
        "Pour solde à la clôture : par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Les subventions d'exploitation peuvent être accordées sous des formes variées : primes d'embauche, primes de création d'emplois. Les abandons de créances à caractère commercial consentis en faveur de l'entreprise sont assimilés à des subventions d'exploitation.",
    exclusions: {
      texte: "Ne doit pas enregistrer les fonds de dotation ni les subventions accordées pour acquérir, créer ou remettre en état des immobilisations.",
      comptes: ["102 – Capital par dotation", "14 – Subventions d'investissement"]
    },
    controle: ["Courriers d'octroi des subventions"],
    comptes_lies: ["711","712","713","718","4495","4582","13"],
    textes_ref: ["SC OHADA — Compte 71 Subventions d'exploitation"],
    exemples_ecritures: [
        {
          libelle: "Subvention d'exploitation acquise (notification)",
          debit: "4495 – État, subventions d'exploitation à recevoir",
          credit: "71 – Subventions d'exploitation"
        },
        {
          libelle: "Encaissement de la subvention d'exploitation",
          debit: "52 – Banques",
          credit: "4495 – État, subventions d'exploitation à recevoir"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 9",
          titre: "Subventions d'exploitation et d'équilibre",
          enonce: "a) Aide Fonds de soutien exports : 80. b) Prime d'embauche État : 15. c) Subvention d'équilibre pour perte exceptionnelle : 50.",
          ecritures: [
            {
              libelle: "Subvention sur exportations (droit acquis)",
              debit: "4495 – État, subventions d'exploitation à recevoir : 80",
              credit: "711 – Subventions sur produits à l'exportation : 80"
            },
            {
              libelle: "Prime d'embauche (droit acquis)",
              debit: "4495 – État, subventions d'exploitation à recevoir : 15",
              credit: "718 – Autres subventions d'exploitation : 15"
            },
            {
              libelle: "Encaissement des subventions d'exploitation",
              debit: "52 – Banques",
              credit: "4495 – État, subventions d'exploitation à recevoir"
            },
            {
              libelle: "Subvention d'équilibre H.A.O. encaissée",
              debit: "52 – Banques : 50",
              credit: "881 – Subventions d'équilibre — État : 50"
            },
          ],
          commentaire: "Subvention d'équilibre → compte 88, pas 71. Analyser l'acte d'octroi pour choisir entre 14, 71 et 88.",
        },
    ],
  },

  "72": {
    libelle: "Production immobilisée",
    classe: "Classe 7 — Produits",
    nature: "Compte de gestion (Produits)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre le coût de production des travaux faits par l'entreprise pour elle même.",
    subdivisions: {
      "721": "Immobilisations incorporelles",
      "722": "Immobilisations corporelles",
      "726": "Immobilisations financières"
    },
    fonctionnement: {
      credit: [
        "Coût de production des travaux effectués pour soi-même, par le débit du compte 21 – Immobilisations incorporelles, ou du compte 23 – Bâtiments / installations, ou du compte 24 – Matériel"
      ],
      debit: [
        "Pour solde à la clôture : par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Le coût de production est déterminé par la comptabilité analytique de gestion ou par des calculs extra-comptables intégrant :\n— Le coût d'acquisition des matériaux consommés\n— Les charges directes de production et les charges indirectes rattachables\n— Les frais financiers sur emprunts exclusivement affectés au financement de la fabrication (période de fabrication)\n\nSert également à transférer les intérêts intercalaires d'emprunts (initialement comptabilisés au compte 67) vers le compte d'immobilisation concerné.",
    exclusions: {
      texte: "Ne doit pas enregistrer les frais d'établissement et les charges à répartir.",
      comptes: ["78 – Transferts de charges", "848 – Transferts de charges H.A.O."]
    },
    controle: ["Immobilisations portées à l'actif", "Charges saisies par la comptabilité analytique"],
    comptes_lies: ["721","722","726","21","23","24","67","13"],
    textes_ref: ["SC OHADA — Compte 72 Production immobilisée"],
    exemples_ecritures: [
        {
          libelle: "Production immobilisée — travaux réalisés pour soi-même",
          debit: "23 – Bâtiments / 24 – Matériel",
          credit: "72 – Production immobilisée"
        },
        {
          libelle: "Transfert des intérêts intercalaires à l'actif",
          debit: "23 – Bâtiments (en cours)",
          credit: "72 – Production immobilisée (intérêts transférés)"
        },
      ]
  },

  "73": {
    libelle: "Variations des stocks de biens et services produits",
    classe: "Classe 7 — Produits",
    nature: "Compte de gestion (Produits ou charge selon solde)",
    sens: "Créditeur (ou débiteur si déstockage)",
    contenu: "Ce compte enregistre les variations de stocks de biens et de services produits en retraçant les opérations relatives aux entrées en stocks, aux sorties de stocks et aux différences constatées à la clôture de l'exercice entre l'inventaire comptable permanent et l'inventaire physique et, dans le cas de l'inventaire intermittent, le stock initial et le stock final, ou leur différence.",
    subdivisions: {
      "734":  "Variations des stocks de produits en cours",
      "7341": "Produits en cours",
      "7342": "Travaux en cours",
      "735":  "Variations des encours de services",
      "7351": "Études en cours",
      "7352": "Prestations de services en cours",
      "736":  "Variations des stocks de produits finis",
      "737":  "Variations des stocks de produits intermédiaires et résiduels",
      "7371": "Produits intermédiaires",
      "7372": "Produits résiduels"
    },
    fonctionnement: {
      credit: [
        "Inventaire intermittent — clôture : valeur du stock final, par le débit des comptes de stocks concernés",
        "Inventaire permanent — en cours : entrées en stocks (en-cours, produits fabriqués), par le débit des comptes de stocks concernés",
        "Inventaire permanent — clôture : différences en plus entre inventaire comptable et inventaire physique, par le débit des comptes de stocks"
      ],
      debit: [
        "Inventaire intermittent — clôture : valeur du stock initial (pour solde), par le crédit des comptes de stocks concernés",
        "Inventaire permanent — en cours : sorties de stocks (virements d'en-cours ou ventes), par le crédit des comptes de stocks concernés",
        "Inventaire permanent — clôture : différences en moins entre inventaire comptable et inventaire physique, par le crédit des comptes de stocks"
      ]
    },
    commentaires: "Solde créditeur = augmentation des stocks (stockage) → production de la période supérieure aux ventes.\nSolde débiteur = diminution des stocks (déstockage) → il est porté en négatif du côté des produits dans le Compte de résultat.\n\nÀ la clôture, le compte 73 est viré pour solde au compte 13 – Résultat net de l'exercice.",
    exclusions: {
      texte: "Ne doit pas enregistrer la variation des stocks de marchandises, matières, fournitures et emballages commerciaux.",
      comptes: ["603 – Variations des stocks de biens achetés"]
    },
    controle: ["Fiches d'inventaire", "Évaluation des stocks", "Comptabilité analytique"],
    comptes_lies: ["734","735","736","737","34","35","36","37","603","13"],
    textes_ref: ["SC OHADA — Compte 73 Variations des stocks de biens et services produits"],
    exemples_ecritures: [
        {
          libelle: "Stock final de produits finis > stock initial (stockage)",
          debit: "36 – Produits finis",
          credit: "736 – Variations des stocks de produits finis"
        },
        {
          libelle: "Stock final de produits finis < stock initial (déstockage)",
          debit: "736 – Variations des stocks de produits finis",
          credit: "36 – Produits finis"
        },
      ]
  },

  "75": {
    libelle: "Autres produits",
    classe: "Classe 7 — Produits",
    nature: "Compte de gestion (Produits)",
    sens: "Créditeur",
    contenu: "Ce sont tous les produits divers qui ne proviennent pas directement de l'activité productrice ou commerciale de l'entreprise, ni de son activité financière ou de ses relations avec l'Etat (subventions) mais qui relèvent néanmoins de ses activités ordinaires.",
    subdivisions: {
      "752":  "Quote-part de résultat sur opérations faites en commun",
      "7521": "Quote-part transférée de pertes (comptabilité du gérant)",
      "7525": "Bénéfices attribués par transfert (comptabilité des associés non gérants)",
      "753":  "Quote-part de résultat sur exécution partielle de contrats pluri-exercices",
      "754":  "Produits des cessions courantes d'immobilisations",
      "758":  "Produits divers",
      "7581": "Jetons de présence et autres rémunérations d'administrateurs",
      "7582": "Indemnités d'assurances reçues"
    },
    fonctionnement: {
      credit: [
        "Montant des produits, par le débit des comptes de tiers concernés ou des comptes de trésorerie"
      ],
      debit: [
        "Pour solde à la clôture : par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "752 – Quote-part sur opérations en commun : reprise dans la comptabilité de l'entreprise du résultat obtenu dans une structure juridiquement transparente (société en participation). Pour l'entreprise non gérante : participation aux bénéfices ; pour le gérant : montant des pertes mises à la charge des associés non gérants.\n\n753 – Quote-part sur contrats pluri-exercices : produit net déterminé à la clôture de chaque exercice d'exécution, selon les méthodes du SC OHADA.\n\n754 – Produits des cessions courantes d'immobilisations : prix de cession lorsque les cessions présentent un caractère ordinaire (politique de désinvestissement/renouvellement).",
    exclusions: {
      texte: "Ne doit pas enregistrer les rabais, remises et ristournes accordés hors factures aux clients.",
      comptes: ["70 – Ventes"]
    },
    controle: ["Factures", "Avis bancaires", "Correspondances échangées"],
    comptes_lies: ["752","753","754","758","41","13"],
    textes_ref: ["SC OHADA — Compte 75 Autres produits"],
    exemples_ecritures: [
        {
          libelle: "Produit de cession courante d'une immobilisation",
          debit: "414 – Créances sur cessions courantes d'immobilisations",
          credit: "754 – Produits des cessions courantes d'immobilisations"
        },
        {
          libelle: "Indemnité d'assurance reçue",
          debit: "52 – Banques",
          credit: "7582 – Indemnités d'assurances reçues"
        },
      ]
  },

  "759": {
    libelle: "Reprises de charges provisionnées d'exploitation",
    classe: "Classe 7 — Produits",
    nature: "Compte de gestion (Produits)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre les annulations ou les régularisations en baisse des provisions à court terme sur éléments de l'actif circulant et des risques provisionnés",
    subdivisions: {
      "7591": "Sur risques à court terme",
      "7593": "Sur les stocks",
      "7594": "Sur les créances",
      "7598": "Sur les autres charges provisionnées"
    },
    fonctionnement: {
      credit: [
        "Montant des dépréciations d'actif circulant et des risques provisionnés existant à l'ouverture, par le débit du compte 39 – Dépréciations des stocks et en-cours ou du compte 49 – Dépréciations et risques provisionnés (Tiers)"
      ],
      debit: [
        "Pour solde à la clôture : par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Le compte 759 reprend en fin d'exercice tout ou partie des provisions à court terme devenues sans objet ou pour toute autre cause justifiant la régularisation en baisse.\n\nSymétriquement aux charges provisionnées (659) correspondant à des décaissements probables, les reprises (759) sont traitées comme des encaissements probables.",
    exclusions: {
      texte: "Ne doit pas enregistrer les reprises sur provisions pour dépréciation de l'actif immobilisé ni les reprises à caractère financier.",
      comptes: ["791 – Reprises de provisions d'exploitation", "797 – Reprises de provisions financières"]
    },
    controle: ["Relevé des décisions de gestion des organes compétents"],
    comptes_lies: ["7591","7593","7594","7598","39","49","659","13"],
    textes_ref: ["SC OHADA — Compte 759 Reprises de charges provisionnées d'exploitation"],
    exemples_ecritures: [
        {
          libelle: "Reprise de provision pour dépréciation de stock",
          debit: "391 – Dépréciations des stocks",
          credit: "7593 – Reprises de charges provisionnées sur stocks"
        },
        {
          libelle: "Reprise de provision pour dépréciation de créances",
          debit: "4912 – Dépréciations des créances douteuses",
          credit: "7594 – Reprises de charges provisionnées sur créances"
        },
      ]
  },

  "77": {
    libelle: "Revenus financiers et produits assimilés",
    classe: "Classe 7 — Produits",
    nature: "Compte de gestion (Produits financiers)",
    sens: "Créditeur",
    contenu: "Ce sont les ressources que tire l'entreprise de ses activités financières.",
    subdivisions: {
      "771":  "Intérêts de prêts",
      "772":  "Revenus de participations",
      "773":  "Escomptes obtenus",
      "774":  "Revenus de titres de placement",
      "776":  "Gains de change",
      "777":  "Gains sur cessions de titres de placement",
      "778":  "Gains sur risques financiers",
      "7781": "Sur rentes viagères",
      "7782": "Sur opérations financières",
      "7784": "Sur instruments de trésorerie",
      "779":  "Reprises de charges provisionnées financières",
      "7791": "Sur risques financiers",
      "7795": "Sur titres de placement",
      "7798": "Autres reprises de charges provisionnées financières"
    },
    fonctionnement: {
      credit: [
        "Produits financiers acquis, par le débit des comptes de tiers concernés ou des comptes de trésorerie",
        "Compte 779 — reprise des dépréciations des comptes de trésorerie et des risques provisionnés financiers existant en début d'exercice, par le débit du compte 59 – Dépréciations et risques provisionnés (Trésorerie)"
      ],
      debit: [
        "Pour solde à la clôture : par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "773 – Escomptes obtenus : réductions accordées par les fournisseurs pour règlement anticipé (à comptabiliser ici même quand déduits sur la facture d'achat).\n774 – Revenus de titres de placement : dividendes et intérêts courus sur titres du compte 50.\n776 – Gains de change : gains réalisés et écarts de conversion positifs sur disponibilités en devises.\n777 – Gains sur cessions de titres de placement : différence positive entre prix de cession et valeur d'entrée.\n779 – Reprises de charges provisionnées financières : reprises symétriques aux dotations du compte 679.\n\nLes intérêts et dividendes reçus de l'étranger sont comptabilisés distinctement de ceux acquis dans l'État.",
    exclusions: {
      texte: "Ne doit pas enregistrer les récupérations de prêts ou d'avances consenties.",
      comptes: ["27 – Autres immobilisations financières"]
    },
    controle: ["Virements bancaires", "Décomptes d'intérêts", "Factures avec escompte", "Bordereaux de cession de titres", "Encaissement des coupons"],
    comptes_lies: ["771","772","773","774","776","777","778","779","59","50","27","13"],
    textes_ref: ["SC OHADA — Compte 77 Revenus financiers et produits assimilés"],
    exemples_ecritures: [
        {
          libelle: "Intérêts sur prêt accordé au personnel",
          debit: "2762 – Intérêts courus sur prêts au personnel",
          credit: "771 – Intérêts de prêts"
        },
        {
          libelle: "Dividendes reçus d'une filiale",
          debit: "52 – Banques",
          credit: "772 – Revenus de participations"
        },
        {
          libelle: "Gain de change réalisé",
          debit: "52 – Banques",
          credit: "776 – Gains de change"
        },
      ]
  },

  "78": {
    libelle: "Transferts de charges",
    classe: "Classe 7 — Produits",
    nature: "Compte de gestion (Produits — compte de liaison)",
    sens: "Créditeur",
    contenu: "Ce compte sert à l'imputation de charges d'exploitation ou financières qui doivent être, en raison de leur nature, affectées à un compte de bilan (à l'exception des immobilisations pour lesquelles le compte 72 est utilisé) ou à un autre compte de charges.",
    subdivisions: {
      "781": "Transferts de charges d'exploitation",
      "787": "Transferts de charges financières"
    },
    fonctionnement: {
      credit: [
        "Charges d'exploitation ou financières à transférer, par le débit des comptes de bilan concernés (autres que les immobilisations)",
        "Ou par le débit des comptes de charges concernés (transfert de charges à charges — ex : avantages en nature accordés au personnel)"
      ],
      debit: [
        "Pour solde à la clôture : par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Les transferts en charges immobilisées concernent les frais d'établissement (compte 201) et les charges à répartir sur plusieurs exercices (compte 202).\n\nLes transferts de charges couvrent aussi les dépenses de l'entreprise mises à la charge de tiers (remboursements de débours) et les transferts entre comptes de charges (exemple : avantages en nature accordés au personnel, d'abord comptabilisés dans la nature de la charge, puis transférés au compte 66).\n\nLes transferts de charges doivent être mentionnés dans l'État annexé.",
    exclusions: {
      texte: "Ne doit pas enregistrer les transferts en actif immobilisé autres qu'en charges immobilisées, ni les transferts H.A.O.",
      comptes: ["72 – Production immobilisée", "848 – Transferts de charges H.A.O."]
    },
    controle: ["Relevé des décisions de gestion des organes compétents"],
    comptes_lies: ["781","787","201","202","66","72","848","13"],
    textes_ref: ["SC OHADA — Compte 78 Transferts de charges"]
  },

  "79": {
    libelle: "Reprises de provisions",
    classe: "Classe 7 — Produits",
    nature: "Compte de gestion (Produits)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre les annulations et les rajustements en baisse des provisions financières pour risques et charges, ainsi que des provisions pour dépréciation des éléments de l'actif immobilisé.",
    subdivisions: {
      "791":  "Reprises de provisions d'exploitation",
      "7911": "Pour risques et charges",
      "7912": "Pour grosses réparations",
      "7913": "Pour dépréciation des immobilisations incorporelles",
      "7914": "Pour dépréciation des immobilisations corporelles",
      "797":  "Reprises de provisions à caractère financier",
      "7971": "Pour risques et charges",
      "7972": "Pour dépréciation des immobilisations financières",
      "798":  "Reprises d'amortissements (cas de révision de plan d'amortissement)"
    },
    fonctionnement: {
      credit: [
        "Diminution des provisions (annulation ou réduction), par le débit des comptes 19 ou 29 pour le montant des diminutions"
      ],
      debit: [
        "Pour solde à la clôture : par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Les reprises de provisions constatent soit la diminution de la provision ramenée à un montant inférieur, soit l'intégration dans les résultats de la provision existante par suite de la réalisation ou de l'annulation de la charge, ou de la disparition du risque.\n\n798 – Reprises d'amortissements : dans le cas exceptionnel d'une révision rétroactive du plan d'amortissement initial, la réduction du cumul des amortissements est opérée par le crédit du compte 798.",
    exclusions: {
      texte: "Ne doit pas enregistrer les reprises H.A.O. ni les reprises de charges provisionnées.",
      comptes: ["86 – Reprises H.A.O.", "759 – Reprises de charges provisionnées d'exploitation", "779 – Reprises de charges provisionnées financières", "849 – Reprises de charges provisionnées H.A.O."]
    },
    controle: ["Relevé des décisions des organes compétents"],
    comptes_lies: ["791","797","798","19","29","69","86","759","779","849","13"],
    textes_ref: ["SC OHADA — Compte 79 Reprises de provisions"],
    exemples_ecritures: [
        {
          libelle: "Reprise de provision pour litiges (procès gagné)",
          debit: "191 – Provisions pour litiges",
          credit: "791 – Reprises de provisions d'exploitation"
        },
        {
          libelle: "Reprise de provision pour dépréciation de titres de participation",
          debit: "296 – Provisions pour dépréciation des titres de participation",
          credit: "797 – Reprises de provisions financières"
        },
      ]
  },

  /* ═══════════════════════════════════════════════════════════════
     CLASSE 8 — COMPTES DES AUTRES CHARGES ET DES AUTRES PRODUITS
  ═══════════════════════════════════════════════════════════════ */

  "8": {
    libelle: "Autres charges et autres produits",
    classe: "Classe 8",
    nature: "Classe de comptes",
    sens: "Débiteur ou Créditeur",
    contenu: "La classe 8 enregistre les charges et produits correspondant à des opérations qui ne se rapportent pas à l'activité ordinaire de l'entreprise (H.A.O. — Hors Activités Ordinaires). Figurent également dans cette classe la participation des travailleurs aux bénéfices et l'impôt sur le résultat.",
    fonctionnement: { debit: [], credit: [] },
    commentaires: "La notion H.A.O. doit être appréhendée de façon restrictive : restructurations d'entreprises, catastrophes naturelles, événements extraordinaires par essence non prévisibles et dépourvus de caractère récurrent. Toute autre charge ou produit est ordinaire, y compris les amendes fiscales et les charges sur exercices antérieurs liées aux activités courantes.",
    comptes_lies: ["81","82","83","84","85","86","87","88","89"],
    textes_ref: ["Acte Uniforme OHADA — Classe 8 Autres charges et autres produits"],
    exemples_ecritures: []
  },

  "81": {
    libelle: "Valeurs comptables des cessions d'immobilisations",
    classe: "Classe 8 — H.A.O.",
    nature: "Compte de gestion (Charges H.A.O.)",
    sens: "Débiteur",
    contenu: "Ce compte sert à déterminer la valeur comptable nette des éléments de l'actif immobilisé cédés. Pour les biens non amortissables, cette valeur est la valeur d'entrée, sans déduction des éventuelles provisions pour dépréciation. Pour les biens amortissables, elle est la différence entre la valeur d'entrée brute des immobilisations cédées et le cumul des amortissements pratiqués depuis l'entrée du bien dans le patrimoine de l'entreprise jusqu'à la date de sa cession.",
    subdivisions: {
      "811": "Immobilisations incorporelles",
      "812": "Immobilisations corporelles",
      "816": "Immobilisations financières"
    },
    fonctionnement: {
      debit: [
        "Valeur d'entrée des éléments sortis sous déduction des amortissements pratiqués, par le crédit du compte d'immobilisation concerné (classe 2)"
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Par cession, il faut entendre : vente, échange, mise au rebut ou destruction.\n\nLa sortie d'une immobilisation donne lieu à :\n① Constatation de l'amortissement complémentaire pour la période courant de l'ouverture de l'exercice à la date de cession\n② Enregistrement de la sortie au compte 81 : débit pour la valeur d'entrée brute, crédit pour le cumul des amortissements\n③ Enregistrement du prix de cession au compte 82 – Produits des cessions d'immobilisations\n\nLes cessions courantes (fréquentes et récurrentes) ne sont pas enregistrées ici mais aux comptes 654 (valeur comptable) et 754 (prix de cession).",
    exclusions: {
      texte: "Ne doit pas enregistrer les provisions pour dépréciation afférentes aux éléments cédés, ni les cessions courantes.",
      comptes: ["29 – Provisions pour dépréciation", "654 – Valeurs comptables des cessions courantes d'immobilisations"]
    },
    controle: ["Procès-verbal de mise au rebut", "Factures de vente", "Procès-verbal de destruction", "Tableaux d'amortissement"],
    comptes_lies: ["811","812","816","82","2","28","654","754","13"],
    textes_ref: ["SC OHADA — Compte 81 Valeurs comptables des cessions d'immobilisations"],
    exemples_ecritures: [
        {
          libelle: "Cession d'un véhicule (valeur brute 5 M, amort. 3 M)",
          debit: "2845 – Amortissements (3 M) + 812 – V.C.N. (2 M)",
          credit: "2451 – Matériel automobile (5 M)"
        },
        {
          libelle: "Mise au rebut d'un matériel totalement amorti",
          debit: "284 – Amortissements (solde complet)",
          credit: "24 – Matériel (valeur brute)"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 15",
          titre: "Décomptabilisation d'un matériel informatique",
          enonce: "Matériel : valeur brute 4 000 000 F, amortissements cumulés 3 200 000 F (dont complément exercice en cours 400 000 F). Prix de cession : 1 200 000 F.",
          ecritures: [
            {
              libelle: "Amortissement complémentaire (01/01 → date cession)",
              debit: "6813 – Dotations aux amortissements : 400 000",
              credit: "284 – Amortissements du matériel : 400 000"
            },
            {
              libelle: "Sortie valeur comptable nette (VCN = 4 M – 3,2 M = 800 000)",
              debit: "284 – Amortissements : 3 200 000 + 812 – VCN cessions corporelles : 800 000",
              credit: "244 – Matériel informatique : 4 000 000"
            },
            {
              libelle: "Enregistrement du prix de cession",
              debit: "485 – Créances sur cessions d'immob. : 1 200 000",
              credit: "822 – Produits des cessions corporelles : 1 200 000"
            },
            {
              libelle: "Encaissement",
              debit: "52 – Banques : 1 200 000",
              credit: "485 – Créances sur cessions d'immob. : 1 200 000"
            },
          ],
          commentaire: "Résultat de cession = 822 (1 200 000) – 812 (800 000) = +400 000 F (plus-value). Cessions récurrentes → 654/754 au lieu de 81/82.",
        },
    ],
  },

  "82": {
    libelle: "Produits des cessions d'immobilisations",
    classe: "Classe 8 — H.A.O.",
    nature: "Compte de gestion (Produits H.A.O.)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre le produit net de la cession : dans le cas de vente, prix résultant de l'accord entre les cocontractants et figurant sur l'acte de vente diminué des commissions et des frais de vente ; dans le cas d'apport, montant contractuel, etc.",
    subdivisions: {
      "821": "Immobilisations incorporelles",
      "822": "Immobilisations corporelles",
      "826": "Immobilisations financières"
    },
    fonctionnement: {
      credit: [
        "Produits de cession d'actif nets de commissions et frais de vente, par le débit du compte 485 – Créances sur cessions d'immobilisations ou d'un compte de trésorerie",
        "Indemnité d'assurance perçue pour indemnisation d'une destruction d'immobilisation, par le débit du compte 485 ou d'un compte de trésorerie"
      ],
      debit: [
        "Pour solde à la clôture de l'exercice, par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "En cas de versement d'indemnité d'assurance pour réparation, elle figure au crédit du compte 82 même si l'entreprise décide de ne pas effectuer de réparation et de mettre l'immobilisation au rebut ou de la céder en l'état (le prix de vente net viendrait en complément au crédit du compte 82).\n\nL'indemnité d'assurance perçue en cas de destruction du bien est assimilée au prix de cession.",
    exclusions: {
      texte: "Ne doit pas enregistrer les indemnités d'assurances autres que celles représentatives du bien détruit, ni les produits des cessions courantes.",
      comptes: ["7582 – Indemnités d'assurances reçues", "754 – Produits des cessions courantes d'immobilisations"]
    },
    controle: ["Factures de cession d'immobilisations", "Commissions et frais de vente"],
    comptes_lies: ["821","822","826","81","485","654","754","13"],
    textes_ref: ["SC OHADA — Compte 82 Produits des cessions d'immobilisations"],
    exemples_ecritures: [
        {
          libelle: "Prix de cession d'un véhicule",
          debit: "485 – Créances sur cessions d'immobilisations",
          credit: "822 – Produits des cessions d'immobilisations corporelles"
        },
        {
          libelle: "Encaissement du prix de cession",
          debit: "52 – Banques",
          credit: "485 – Créances sur cessions d'immobilisations"
        },
      ]
  },

  "83": {
    libelle: "Charges hors activités ordinaires",
    classe: "Classe 8 — H.A.O.",
    nature: "Compte de gestion (Charges H.A.O.)",
    sens: "Débiteur",
    contenu: "Ce sont les charges qui ne sont pas liées à l'activité ordinaire de l'entreprise et qui, de ce fait, n'ont généralement pas de caractère récurrent. Elles comprennent des charges constatées et des charges provisionnées.",
    subdivisions: {
      "831": "Charges H.A.O. constatées",
      "834": "Pertes sur créances H.A.O.",
      "835": "Dons et libéralités accordés",
      "836": "Abandons de créances consentis",
      "839": "Charges provisionnées H.A.O."
    },
    fonctionnement: {
      debit: [
        "Charges constatées ne concernant pas l'activité ordinaire, par le crédit d'un compte de tiers ou de trésorerie",
        "Charges H.A.O. non encore engagées mais dont la survenance à moins d'un an est probable et mesurable, par le crédit du compte 48 – Créances et dettes H.A.O."
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Seules les charges liées à la restructuration de l'entreprise ou à des événements extraordinaires (phénomènes naturels : tempêtes, raz-de-marée, tremblements de terre, invasions acridiennes...) relèvent du H.A.O.\n\nToute autre charge est ordinaire — y compris les amendes fiscales ou pénales, et les charges sur exercices antérieurs liées aux activités courantes.\n\nLorsque la charge H.A.O. probable est envisagée à court terme (< 1 an) → charge provisionnée (compte 839).\nLorsque la charge H.A.O. probable est envisagée à plus d'un an → dotation aux provisions (compte 854).",
    exclusions: {
      texte: "Ne doit pas enregistrer les provisions pour risques et charges H.A.O. à plus d'un an.",
      comptes: ["854 – Dotations aux provisions pour risques et charges H.A.O."]
    },
    controle: ["Factures", "Évaluations", "Tableaux d'amortissements", "Calculs de plus-values"],
    comptes_lies: ["831","834","835","836","839","48","854","13"],
    textes_ref: ["SC OHADA — Compte 83 Charges hors activités ordinaires"],
    exemples_ecritures: [
        {
          libelle: "Charge H.A.O. constatée (restructuration)",
          debit: "831 – Charges H.A.O. constatées",
          credit: "401 – Fournisseurs / 52 – Banques"
        },
        {
          libelle: "Don accordé à une association",
          debit: "835 – Dons et libéralités accordés",
          credit: "52 – Banques"
        },
      ]
  },

  "84": {
    libelle: "Produits hors activités ordinaires",
    classe: "Classe 8 — H.A.O.",
    nature: "Compte de gestion (Produits H.A.O.)",
    sens: "Créditeur",
    contenu: "Ce sont des produits qui ne sont pas liés à l'activité ordinaire de l'entreprise et sont donc dépourvus de caractère récurrent.\n\nIls comprennent des produits constatés, des reprises de charges provisionnées et des transferts de charges.",
    subdivisions: {
      "841": "Produits H.A.O. constatés",
      "845": "Dons et libéralités obtenus",
      "846": "Abandons de créances obtenus",
      "848": "Transferts de charges H.A.O.",
      "849": "Reprises de charges provisionnées H.A.O."
    },
    fonctionnement: {
      credit: [
        "Produits constatés H.A.O., par le débit d'un compte de tiers ou de trésorerie",
        "Reprises de charges provisionnées H.A.O., par le débit du compte 4998 – Risques provisionnés sur opérations H.A.O.",
        "Charges dont l'inscription à l'actif a été décidée (transferts de charges), par le débit du compte 20 – Charges immobilisées"
      ],
      debit: [
        "Pour solde à la clôture de l'exercice, par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Les produits sont considérés comme H.A.O. lorsqu'ils relèvent d'événements extraordinaires (phénomènes naturels, modifications de structure de l'entreprise).",
    exclusions: {
      texte: "Ne doit pas enregistrer les reprises de provisions H.A.O. antérieurement constituées.",
      comptes: ["86 – Reprises H.A.O."]
    },
    controle: ["Analyse des charges immobilisées", "Factures", "Évaluations", "Tableaux de provisions"],
    comptes_lies: ["841","845","846","848","849","4998","20","86","13"],
    textes_ref: ["SC OHADA — Compte 84 Produits hors activités ordinaires"],
    exemples_ecritures: [
        {
          libelle: "Produit H.A.O. — indemnité exceptionnelle reçue",
          debit: "52 – Banques",
          credit: "841 – Produits H.A.O. constatés"
        },
        {
          libelle: "Reprise de charge provisionnée H.A.O.",
          debit: "4998 – Risques provisionnés H.A.O.",
          credit: "849 – Reprises de charges provisionnées H.A.O."
        },
      ]
  },

  "85": {
    libelle: "Dotations hors activités ordinaires",
    classe: "Classe 8 — H.A.O.",
    nature: "Compte de gestion (Charges calculées H.A.O.)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre les dotations aux amortissements et aux provisions qui ne concernent pas l'activité ordinaire de l'entreprise.",
    subdivisions: {
      "851": "Dotations aux provisions réglementées",
      "852": "Dotations aux amortissements H.A.O.",
      "853": "Dotations aux provisions pour dépréciation H.A.O.",
      "854": "Dotations aux provisions pour risques et charges H.A.O.",
      "858": "Autres dotations H.A.O."
    },
    fonctionnement: {
      debit: [
        "Montant des provisions pour risques ou charges H.A.O. ou des amortissements, par le crédit du compte 15 – Provisions réglementées et fonds assimilés",
        "Ou par le crédit du compte 19 – Provisions financières pour risques et charges ou du compte 29 – Provisions pour dépréciation",
        "Ou par le crédit du compte 28 – Amortissements"
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Le compte 85 est utilisé dans les États-parties pour enregistrer les opérations liées à l'application de dispositions fiscales (provisions réglementées, amortissements dérogatoires, etc.).\n\n851 – Provisions réglementées : provisions dont la constitution est imposée ou autorisée par des dispositions fiscales ou légales (ex : provision pour investissement, provision pour hausse des prix).\n852 – Amortissements H.A.O. : complément d'amortissement fiscal autorisé au-delà de l'amortissement économique normal (déjà enregistré au compte 68).",
    exclusions: {
      texte: "Ne doit pas enregistrer les charges calculées H.A.O. à moins d'un an.",
      comptes: ["839 – Charges provisionnées H.A.O."]
    },
    controle: ["Évaluation de la provision", "Tableaux d'amortissement fiscal"],
    comptes_lies: ["851","852","853","854","858","15","19","29","28","86","13"],
    textes_ref: ["SC OHADA — Compte 85 Dotations hors activités ordinaires"],
    exemples_ecritures: [
        {
          libelle: "Dotation aux amortissements dérogatoires (complément fiscal)",
          debit: "852 – Dotations aux amortissements H.A.O.",
          credit: "151 – Amortissements dérogatoires"
        },
        {
          libelle: "Dotation à une provision réglementée (plus-value à réinvestir)",
          debit: "851 – Dotations aux provisions réglementées",
          credit: "152 – Plus-values de cession à réinvestir"
        },
      ]
  },

  "86": {
    libelle: "Reprises hors activités ordinaires",
    classe: "Classe 8 — H.A.O.",
    nature: "Compte de gestion (Produits H.A.O.)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre les annulations et rajustements en baisse des provisions, amortissements et subventions qui ne sont pas liés à l'activité ordinaire de l'entreprise.",
    subdivisions: {
      "861": "Reprises de provisions réglementées",
      "862": "Reprises d'amortissements H.A.O.",
      "863": "Reprises de provisions pour dépréciation H.A.O.",
      "864": "Reprises de provisions pour risques et charges H.A.O.",
      "865": "Reprises de subventions d'investissement",
      "868": "Autres reprises H.A.O."
    },
    fonctionnement: {
      credit: [
        "Annulation ou réduction de la provision concernée, par le débit du compte 15 – Provisions réglementées, du compte 19 – Provisions financières, ou du compte 29 – Provisions pour dépréciation",
        "Montant de la subvention d'investissement reprise au résultat (compte 865), par le débit du compte 14 – Subventions d'investissement"
      ],
      debit: [
        "Pour solde à la clôture de l'exercice, par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Toute provision constituée via le compte 85 doit être reprise au cours d'un exercice ultérieur par le compte 86, l'année de survenance de la charge ou l'année où l'appréciation est modifiée.\n\n865 – Reprises de subventions d'investissement : le montant repris chaque exercice correspond :\n— Pour les immobilisations amortissables : dotation aux amortissements × (montant subvention / montant investissement)\n— Pour les immobilisations non amortissables : 1/10 du montant de la subvention par an (ou durée d'inaliénabilité contractuelle)",
    exclusions: {
      texte: "Ne doit pas enregistrer les reprises de charges provisionnées, les reprises de provisions d'exploitation ou financières, ni les dotations aux provisions d'exploitation.",
      comptes: ["759 – Reprises de charges provisionnées d'exploitation", "791 – Reprises de provisions d'exploitation", "797 – Reprises de provisions financières", "691 / 697 – Dotations aux provisions d'exploitation / financières"]
    },
    controle: ["Tableaux d'amortissements", "Décisions de subventions", "Tableaux de reprises de subvention", "Tableaux de reprises des écarts de réévaluation", "Tableaux de reprises de la plus-value de cession à réinvestir"],
    comptes_lies: ["861","862","863","864","865","868","15","19","29","14","85","13"],
    textes_ref: ["SC OHADA — Compte 86 Reprises hors activités ordinaires"],
    exemples_ecritures: [
        {
          libelle: "Reprise d'amortissements dérogatoires",
          debit: "151 – Amortissements dérogatoires",
          credit: "861 – Reprises de provisions réglementées"
        },
        {
          libelle: "Reprise annuelle de la subvention d'investissement",
          debit: "14 – Subventions d'investissement",
          credit: "865 – Reprises de subventions d'investissement"
        },
      ]
  },

  "87": {
    libelle: "Participation des travailleurs",
    classe: "Classe 8 — H.A.O.",
    nature: "Compte de gestion (Répartition du résultat)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre les montants prélevés sur les bénéfices réalisés et affectés par l'entreprise à un fonds légal ou contractuel à l'avantage des travailleurs.",
    subdivisions: {
      "871": "Participation légale aux bénéfices",
      "872": "Participation contractuelle aux bénéfices",
      "878": "Autres participations"
    },
    fonctionnement: {
      debit: [
        "Part de bénéfices affectée aux salariés au titre de la participation, par le crédit du compte 426 – Personnel, participation aux bénéfices"
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "En raison de son assiette de calcul (le bénéfice), la participation n'est pas considérée comme une charge de personnel mais comme un élément de répartition du résultat.",
    exclusions: {
      texte: "Ne doit pas enregistrer la participation du personnel au capital de l'entreprise, ni les rémunérations diverses versées au personnel (intéressement).",
      comptes: ["10 – Capital", "66 – Charges de personnel"]
    },
    controle: ["Conventions d'entreprise", "Accords d'entreprise"],
    comptes_lies: ["871","872","878","426","13"],
    textes_ref: ["SC OHADA — Compte 87 Participation des travailleurs"],
    exemples_ecritures: [
        {
          libelle: "Participation des travailleurs aux bénéfices",
          debit: "871 – Participation légale aux bénéfices",
          credit: "426 – Personnel, participation aux bénéfices"
        },
        {
          libelle: "Versement de la participation aux salariés",
          debit: "426 – Personnel, participation aux bénéfices",
          credit: "52 – Banques"
        },
      ]
  },

  "88": {
    libelle: "Subventions d'équilibre",
    classe: "Classe 8 — H.A.O.",
    nature: "Compte de gestion (Produits)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre le montant des subventions allouées par l'Etat ou l'un de ses démembrements à l'entreprise, pour lui permettre de compenser, en totalité ou partiellement, des pertes survenues dans des circonstances exceptionnelles.",
    subdivisions: {
      "881": "État",
      "884": "Collectivités publiques",
      "886": "Groupe",
      "888": "Autres"
    },
    fonctionnement: {
      credit: [
        "Montant des subventions d'équilibre allouées à l'entreprise, par le débit d'un compte de tiers ou de trésorerie"
      ],
      debit: [
        "Pour solde à la clôture de l'exercice, par le crédit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Les subventions d'équilibre se distinguent des subventions d'exploitation : elles ne sont pas directement liées à une insuffisance des prix de vente imposés, mais visent à compenser des pertes exceptionnelles.\n\nAvant tout enregistrement, analyser la subvention pour en définir la finalité : aide à l'investissement (→ 14), à l'exploitation (→ 71) ou à l'équilibre (→ 88).",
    exclusions: {
      texte: "Ne doit pas enregistrer les subventions d'investissement ni les subventions d'exploitation.",
      comptes: ["14 – Subventions d'investissement", "71 – Subventions d'exploitation"]
    },
    controle: ["Décrets ou arrêtés ministériels", "Décisions de collectivités publiques accordant la subvention"],
    comptes_lies: ["881","884","886","888","14","71","13"],
    textes_ref: ["SC OHADA — Compte 88 Subventions d'équilibre"],
    exemples_ecritures: [
        {
          libelle: "Subvention d'équilibre accordée par l'État",
          debit: "52 – Banques",
          credit: "881 – Subventions d'équilibre — État"
        },
      ]
  },

  "89": {
    libelle: "Impôts sur le résultat",
    classe: "Classe 8 — H.A.O.",
    nature: "Compte de gestion (Prélèvement obligatoire sur résultat)",
    sens: "Débiteur",
    contenu: "C'est la part de bénéfice affectée obligatoirement à l'Etat au titre de l'impôt sur le résultat.",
    subdivisions: {
      "891":  "Impôts sur les bénéfices de l'exercice",
      "8911": "Activités exercées dans l'État",
      "8912": "Activités exercées dans les autres États de la Région",
      "8913": "Activités exercées hors Région",
      "892":  "Rappels d'impôts sur résultats antérieurs",
      "895":  "Impôt minimum forfaitaire (I.M.F.)",
      "899":  "Dégrèvements et annulations d'impôts sur résultats antérieurs",
      "8991": "Dégrèvements",
      "8994": "Annulations pour pertes rétroactives"
    },
    fonctionnement: {
      debit: [
        "Impôt exigible de l'exercice, par le crédit du compte 441 – État, impôt sur les bénéfices"
      ],
      credit: [
        "Pour solde à la clôture de l'exercice, par le débit du compte 13 – Résultat net de l'exercice"
      ]
    },
    commentaires: "Le montant de l'impôt sur le résultat doit être calculé sur la base du résultat comptable retraité selon les règles fiscales.\n\nLe compte 891 doit correspondre au montant total de l'impôt dû de l'exercice, éventuellement augmenté des rappels d'impôts (compte 892) et diminué des dégrèvements et annulations sur exercices antérieurs (compte 899).",
    exclusions: {
      texte: "Ne doit pas enregistrer les impôts et taxes ordinaires.",
      comptes: ["64 – Impôts et taxes"]
    },
    controle: ["Liasse fiscale", "Notifications et rappels d'impôt de la Direction Générale des Impôts (D.G.I.)"],
    comptes_lies: ["891","892","895","899","441","64","13"],
    textes_ref: ["SC OHADA — Compte 89 Impôts sur le résultat"],
    exemples_ecritures: [
        {
          libelle: "Constatation de l'impôt sur les bénéfices dû",
          debit: "891 – Impôts sur les bénéfices de l'exercice",
          credit: "441 – État, impôt sur les bénéfices"
        },
        {
          libelle: "Paiement de l'impôt (acompte)",
          debit: "4492 – État, avances et acomptes versés sur impôts",
          credit: "52 – Banques"
        },
        {
          libelle: "Solde de l'impôt à payer",
          debit: "441 – État, impôt sur les bénéfices",
          credit: "52 – Banques"
        },
      ],
    applications_pratiques: [
        {
          ref: "App. 8",
          titre: "Impôt sur le bénéfice — acomptes et solde",
          enonce: "4 acomptes : fév. 35, mai 45, sept. 40, nov. 40. Impôt dû au 31/12/N : 180. Solde = 180 – 160 = 20 F.",
          ecritures: [
            {
              libelle: "Versement de chaque acompte",
              debit: "441.n – État, impôt sur les bénéfices : montant",
              credit: "52 – Banques : montant"
            },
            {
              libelle: "Constatation de l'impôt dû au 31/12/N",
              debit: "891 – Impôts sur les bénéfices de l'exercice : 180",
              credit: "441.n – État, impôt sur les bénéfices : 180"
            },
            {
              libelle: "Versement du solde (20 F)",
              debit: "441.n – État, impôt sur les bénéfices : 20",
              credit: "52 – Banques : 20"
            },
          ],
          commentaire: "Le solde de 441 doit être nul après règlement du solde. Le compte 891 est viré en clôture au compte 13 – Résultat net de l'exercice.",
        },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     CLASSE 9 — ENGAGEMENTS HORS BILAN ET COMPTABILITÉ ANALYTIQUE
  ═══════════════════════════════════════════════════════════════ */

  "9": {
    libelle: "Engagements hors bilan et comptabilité analytique de gestion",
    classe: "Classe 9",
    nature: "Classe de comptes (usage facultatif)",
    sens: "Débiteur ou Créditeur selon convention",
    contenu: "La classe 9 permet d'enregistrer les engagements hors bilan (comptes 90-91) et les opérations de comptabilité analytique de gestion (comptes 92-99). Son usage est facultatif, mais facilite la confection de l'État annexé.",
    fonctionnement: { debit: [], credit: [] },
    commentaires: "Engagements hors bilan : droits et obligations dont les effets chiffrables sur le patrimoine sont subordonnés à des conditions ou événements ultérieurs. Ils doivent faire l'objet d'une convention écrite pour être enregistrés.\n\nDeux rubriques :\n— Engagements obtenus (droits) : enregistrés par convention au débit des comptes 901 à 904\n— Engagements accordés (obligations) : enregistrés par convention au crédit des comptes 905 à 908\nLeurs contreparties figurent aux comptes 911 à 918.\n\nComptabilité analytique (92-99) : usage laissé à l'initiative des entreprises selon leur structure, politique des coûts et organisation.",
    comptes_lies: ["901","902","903","904","905","906","907","908","911","92","93","94","95","96","97","98","99"],
    textes_ref: ["Acte Uniforme OHADA — Classe 9 Engagements hors bilan et comptabilité analytique"],
    exemples_ecritures: []
  },

  "9011": {
    libelle: "Crédits confirmés obtenus",
    classe: "Classe 9 — Engagements hors bilan (obtenus)",
    nature: "Compte hors bilan (Engagement de financement obtenu)",
    sens: "Débiteur",
    contenu: "Le solde débiteur de ce compte représente la partie non utilisée des crédits qu'une banque s'est engagée, d'une façon irrévocable, à accorder à l'entreprise, y compris les crédits documentaires import-export confirmés.",
    fonctionnement: {
      debit: ["À la notification du crédit confirmé, par le crédit du compte de contrepartie 9111"],
      credit: ["Lors de l'utilisation partielle ou totale du crédit confirmé, par le débit du compte de contrepartie 9111"]
    },
    commentaires: "Le crédit documentaire est un instrument financier de court terme pour le financement des transactions commerciales internationales. L'acheteur donne ordre à son banquier de verser au vendeur la valeur des marchandises en cours de route, contre remise de documents prouvant l'expédition et la conformité.",
    exclusions: { texte: "Ne doit pas enregistrer les dépôts de garantie (dépôt) sur CREDOC.", comptes: ["275 – Dépôts et cautionnements versés"] },
    controle: ["Lettres de notification de la banque"],
    comptes_lies: ["9111"],
    textes_ref: ["SC OHADA — Compte 9011 Crédits confirmés obtenus"],
    exemples_ecritures: [
        {
          libelle: "Notification d'un crédit documentaire confirmé",
          debit: "9011 – Crédits confirmés obtenus",
          credit: "9111 – Contrepartie des crédits confirmés"
        },
        {
          libelle: "Utilisation partielle du crédit documentaire",
          debit: "9111 – Contrepartie",
          credit: "9011 – Crédits confirmés obtenus (portion utilisée)"
        },
      ]
  },

  "9012": {
    libelle: "Emprunts restant à encaisser",
    classe: "Classe 9 — Engagements hors bilan (obtenus)",
    nature: "Compte hors bilan (Engagement de financement obtenu)",
    sens: "Débiteur",
    contenu: "Ce compte enregistre la partie non encore encaissée des emprunts contractés par l'entreprise auprès des tiers autres que les établissements bancaires, notamment les filiales et les sociétés - mères.",
    fonctionnement: {
      debit: ["À la signature de la convention, par le crédit du compte de contrepartie 9112"],
      credit: ["Lors de la mobilisation partielle ou totale de l'emprunt, par le débit du compte de contrepartie 9112"]
    },
    commentaires: "",
    exclusions: { texte: "Ne doit pas enregistrer les crédits bancaires notifiés non encore encaissés.", comptes: ["9011 – Crédits confirmés obtenus"] },
    controle: ["Conventions de prêts"],
    comptes_lies: ["9112"],
    textes_ref: ["SC OHADA — Compte 9012 Emprunts restant à encaisser"],
    exemples_ecritures: [
        {
          libelle: "Convention d'emprunt signée avec une société mère",
          debit: "9012 – Emprunts restant à encaisser",
          credit: "9112 – Contrepartie des emprunts"
        },
        {
          libelle: "Mobilisation partielle de l'emprunt",
          debit: "9112 – Contrepartie",
          credit: "9012 – Emprunts restant à encaisser"
        },
      ]
  },

  "9021": {
    libelle: "Avals obtenus",
    classe: "Classe 9 — Engagements hors bilan (obtenus)",
    nature: "Compte hors bilan (Engagement de garantie obtenu)",
    sens: "Débiteur",
    contenu: "L'avaliseur prend l'engagement de payer au créancier, à l'échéance, tout ou partie du nominal d'une lettre de change, d'un billet à ordre ou d'un chèque, à la place du tiré ou du souscripteur, en cas de défaillance éventuelle de celui-ci.",
    fonctionnement: {
      debit: ["À la conclusion de la transaction, par le crédit du compte de contrepartie 9121"],
      credit: ["À l'échéance ou au dénouement de la transaction, par le débit du compte de contrepartie 9121"]
    },
    commentaires: "L'avaliseur peut être un établissement bancaire ou un autre tiers.",
    exclusions: { texte: "", comptes: [] },
    controle: ["Effets avalisés"],
    comptes_lies: ["9121"],
    textes_ref: ["SC OHADA — Compte 9021 Avals obtenus"],
    exemples_ecritures: [
        {
          libelle: "Obtention d'un aval bancaire sur un effet",
          debit: "9021 – Avals obtenus",
          credit: "9121 – Contrepartie des avals obtenus"
        },
        {
          libelle: "Dénouement à l'échéance",
          debit: "9121 – Contrepartie",
          credit: "9021 – Avals obtenus"
        },
      ]
  },

  "9022": {
    libelle: "Cautions, garanties obtenues",
    classe: "Classe 9 — Engagements hors bilan (obtenus)",
    nature: "Compte hors bilan (Engagement de garantie obtenu)",
    sens: "Débiteur",
    contenu: "La caution s'engage à payer l'entreprise créancière au cas où le débiteur de cette dernière n'exécuterait pas son obligation.",
    fonctionnement: {
      debit: ["À la conclusion du contrat, par le crédit du compte de contrepartie 9122"],
      credit: ["À l'échéance et au dénouement de la transaction, par le débit du compte de contrepartie 9122"]
    },
    commentaires: "Principales formes de cautions bancaires : cautions fiscales et en douane (admissions temporaires, transit, entrepôts...), cautions sur marchés (soumission, bonne fin des travaux, retenue de garantie, remboursement d'acomptes, avances de démarrage).\n\nLes lettres d'intention ou lettres de confort assimilables à un cautionnement contiennent de véritables obligations pour le garant.",
    exclusions: { texte: "Ne doit pas enregistrer les gages, nantissements et antichrèses.", comptes: ["9028 – Autres garanties obtenues"] },
    controle: ["Conventions de prêts", "Acte constitutif de la caution"],
    comptes_lies: ["9122","9028"],
    textes_ref: ["SC OHADA — Compte 9022 Cautions, garanties obtenues"],
    exemples_ecritures: [
        {
          libelle: "Caution bancaire obtenue pour marché public",
          debit: "9022 – Cautions, garanties obtenues",
          credit: "9122 – Contrepartie des cautions obtenues"
        },
      ]
  },

  "9023": {
    libelle: "Hypothèques obtenues",
    classe: "Classe 9 — Engagements hors bilan (obtenus)",
    nature: "Compte hors bilan (Engagement de garantie obtenu)",
    sens: "Débiteur",
    contenu: "Lorsque l'entreprise reçoit de son débiteur un immeuble en hypothèque, cette dernière lui confère le droit de faire saisir et vendre l'immeuble en quelques mains qu'il se trouve et de se faire payer par préférence sur le prix de la vente.",
    fonctionnement: {
      debit: ["À l'inscription de l'hypothèque, pour la valeur de l'immeuble fixée au début de la transaction, par le crédit du compte de contrepartie 9123"],
      credit: ["Au dénouement de la créance ou à la réalisation de l'hypothèque, par le débit du compte de contrepartie 9123"]
    },
    commentaires: "La validité de l'hypothèque est assurée par son inscription sur un registre légal (cadastre, domaine, registre foncier, etc.).",
    exclusions: { texte: "Ne doit pas enregistrer les promesses d'hypothèques, gages, nantissements et antichrèses.", comptes: ["9028 – Autres garanties obtenues"] },
    controle: ["Conventions de prêts", "Récépissés d'inscription de l'hypothèque", "Rapports d'expertise immobilière"],
    comptes_lies: ["9123","9028"],
    textes_ref: ["SC OHADA — Compte 9023 Hypothèques obtenues"],
    exemples_ecritures: [
        {
          libelle: "Inscription d'une hypothèque reçue en garantie",
          debit: "9023 – Hypothèques obtenues",
          credit: "9123 – Contrepartie des hypothèques obtenues"
        },
      ]
  },

  "9028": {
    libelle: "Autres garanties obtenues",
    classe: "Classe 9 — Engagements hors bilan (obtenus)",
    nature: "Compte hors bilan (Engagement de garantie obtenu)",
    sens: "Débiteur",
    contenu: "Les autres garanties obtenues comprennent notamment le gage, le nantissement et l'antichrèse pour lesquels l'engagement porte spécialement sur un ou plusieurs biens affectés à l'entreprise créancière en vue de garantir ses droits.",
    fonctionnement: {
      debit: ["À la constitution de la garantie, pour la valeur des biens reçus en garantie, par le crédit du compte de contrepartie 9128"],
      credit: ["Au dénouement de la créance ou à la réalisation de la garantie, par le débit du compte de contrepartie 9128"]
    },
    commentaires: "L'antichrèse représente le nantissement sur un immeuble permettant uniquement d'en percevoir les fruits.",
    exclusions: { texte: "Ne doit pas enregistrer les avals, cautions et hypothèques.", comptes: ["9021 – Avals obtenus", "9022 – Cautions, garanties obtenues", "9023 – Hypothèques obtenues"] },
    controle: ["Conventions de prêt", "Acte constitutif de la garantie", "Chèques et actions"],
    comptes_lies: ["9128","9021","9022","9023"],
    textes_ref: ["SC OHADA — Compte 9028 Autres garanties obtenues"],
    exemples_ecritures: [
        {
          libelle: "Nantissement de fonds de commerce reçu en garantie",
          debit: "9028 – Autres garanties obtenues",
          credit: "9128 – Contrepartie"
        },
      ]
  },

  "9031": {
    libelle: "Achats de marchandises à terme",
    classe: "Classe 9 — Engagements hors bilan (réciproques obtenus)",
    nature: "Compte hors bilan (Engagement réciproque)",
    sens: "Débiteur",
    contenu: "Pour deux partenaires, les engagements réciproques se décomposent en un engagement donné par l'entreprise à son cocontractant en contrepartie d'un engagement reçu de ce dernier. A ce titre, dans le cadre des achats de marchandises à terme, le fournisseur de l'entreprise s'engage à livrer des marchandises et l'entreprise s'engage à en prendre livraison et à en payer le prix convenu à la date de livraison.",
    fonctionnement: {
      debit: ["À la signature de la transaction, par le crédit du compte de contrepartie 9131"],
      credit: ["À la livraison du marché, par le débit du compte de contrepartie 9131"]
    },
    commentaires: "",
    exclusions: { texte: "", comptes: [] },
    controle: ["Demandes d'achat", "Bons de commande", "Bons de livraison", "Factures"],
    comptes_lies: ["9131"],
    textes_ref: ["SC OHADA — Compte 9031 Achats de marchandises à terme"],
    exemples_ecritures: [
        {
          libelle: "Bon de commande ferme reçu d'un fournisseur",
          debit: "9031 – Achats de marchandises à terme",
          credit: "9131 – Contrepartie"
        },
      ]
  },

  "9033": {
    libelle: "Commandes fermes des clients",
    classe: "Classe 9 — Engagements hors bilan (réciproques obtenus)",
    nature: "Compte hors bilan (Engagement réciproque)",
    sens: "Débiteur",
    contenu: "Engagements irrévocables pris par un client de régler le prix des travaux exécutés pour son compte conformément à ses spécifications et aux conditions de vente indiquées par l'entreprise.",
    fonctionnement: {
      debit: ["À la réception de la commande, par le crédit du compte de contrepartie 9133"],
      credit: ["À l'exécution de la commande, par le débit du compte de contrepartie 9133"]
    },
    commentaires: "",
    exclusions: { texte: "", comptes: [] },
    controle: ["Bons de commande", "Bons de livraison", "Factures"],
    comptes_lies: ["9133"],
    textes_ref: ["SC OHADA — Compte 9033 Commandes fermes des clients"],
    exemples_ecritures: [
        {
          libelle: "Réception d'une commande ferme d'un client",
          debit: "9033 – Commandes fermes des clients",
          credit: "9133 – Contrepartie"
        },
      ]
  },

  "9041": {
    libelle: "Abandons de créances conditionnels",
    classe: "Classe 9 — Engagements hors bilan (autres obtenus)",
    nature: "Compte hors bilan (Autre engagement obtenu)",
    sens: "Débiteur",
    contenu: "La convention d'abandon de créances assortie d'une clause de retour à meilleure fortune est caractérisée par l'extinction de la créance de l'entreprise sous condition résolutoire : l'entreprise débitrice retrouve des moyens (gains) financiers suffisants qui rétablissent sa dette originelle.",
    fonctionnement: {
      debit: ["À la conclusion des conventions, par le crédit du compte de contrepartie 9141"],
      credit: ["À la réalisation de l'éventualité (retour à bonne fortune), par le débit du compte de contrepartie 9141"]
    },
    commentaires: "Chez l'entreprise qui consent l'abandon, la créance abandonnée sous condition disparaît du bilan et est suivie en tant qu'engagement hors bilan reçu.",
    exclusions: { texte: "", comptes: [] },
    controle: ["Grosses du jugement", "Conventions"],
    comptes_lies: ["9141"],
    textes_ref: ["SC OHADA — Compte 9041 Abandons de créances conditionnels"],
    exemples_ecritures: [
        {
          libelle: "Abandon de créances conditionnel consenti à une filiale",
          debit: "9041 – Abandons de créances conditionnels",
          credit: "9141 – Contrepartie"
        },
      ]
  },

  "9061": {
    libelle: "Avals accordés",
    classe: "Classe 9 — Engagements hors bilan (accordés)",
    nature: "Compte hors bilan (Engagement de garantie accordé)",
    sens: "Créditeur",
    contenu: "Par l'aval, l'entreprise prend l'engagement de payer au bénéficiaire, et à l'échéance, tout ou partie du nominal d'une lettre de change, d'un billet à ordre ou d'un chèque, à la place du tiré ou du souscripteur éventuellement défaillant.",
    fonctionnement: {
      credit: ["À la conclusion de la transaction, par le débit du compte de contrepartie 9161"],
      debit: ["À l'échéance ou au dénouement de la transaction, par le crédit du compte de contrepartie 9161"]
    },
    commentaires: "",
    exclusions: { texte: "", comptes: [] },
    controle: ["Effets avalisés", "Décisions des organes compétents"],
    comptes_lies: ["9161"],
    textes_ref: ["SC OHADA — Compte 9061 Avals accordés"],
    exemples_ecritures: [
        {
          libelle: "Aval accordé sur une lettre de change d'un client",
          debit: "9161 – Contrepartie des avals accordés",
          credit: "9061 – Avals accordés"
        },
      ]
  },

  "9062": {
    libelle: "Cautions, garanties accordées",
    classe: "Classe 9 — Engagements hors bilan (accordés)",
    nature: "Compte hors bilan (Engagement de garantie accordé)",
    sens: "Créditeur",
    contenu: "L'entreprise, en tant que caution, promet à un créancier de le payer si le débiteur de ce dernier n'exécute pas son obligation.",
    fonctionnement: {
      credit: ["À la conclusion de la caution, par le débit du compte de contrepartie 9162"],
      debit: ["À l'échéance ou au dénouement de la transaction, par le crédit du compte de contrepartie 9162"]
    },
    commentaires: "",
    exclusions: { texte: "Ne doit pas enregistrer les gages, nantissements et antichrèses.", comptes: ["9068 – Autres garanties accordées"] },
    controle: ["Conventions de prêts", "Actes constitutifs de la caution", "Lettres d'intention ou lettres de confort", "Décisions des organes compétents"],
    comptes_lies: ["9162","9068"],
    textes_ref: ["SC OHADA — Compte 9062 Cautions, garanties accordées"],
    exemples_ecritures: [
        {
          libelle: "Caution accordée à un fournisseur pour marché",
          debit: "9162 – Contrepartie",
          credit: "9062 – Cautions, garanties accordées"
        },
      ]
  },

  "9063": {
    libelle: "Hypothèques accordées",
    classe: "Classe 9 — Engagements hors bilan (accordés)",
    nature: "Compte hors bilan (Engagement de garantie accordé)",
    sens: "Créditeur",
    contenu: "Lorsque l'entreprise donne à son créancier un immeuble en hypothèque, cette hypothèque confère à ce créancier le droit de faire saisir et vendre l'immeuble en quelques mains qu'il se trouve et de se faire payer par préférence sur le prix de la vente.",
    fonctionnement: {
      credit: ["À l'inscription de l'hypothèque, pour la valeur de l'immeuble, par le débit du compte de contrepartie 9163"],
      debit: ["Au dénouement de la créance ou à la réalisation de l'hypothèque, par le crédit du compte de contrepartie 9163"]
    },
    commentaires: "La validité de l'hypothèque est assurée par son inscription sur un registre légal.",
    exclusions: { texte: "Ne doit pas enregistrer les promesses d'hypothèques, gages, nantissements et antichrèses.", comptes: ["9068 – Autres garanties accordées"] },
    controle: ["Conventions de prêts", "Récépissés d'inscription de l'hypothèque", "Rapports d'expertise immobilière"],
    comptes_lies: ["9163","9068"],
    textes_ref: ["SC OHADA — Compte 9063 Hypothèques accordées"],
    exemples_ecritures: [
        {
          libelle: "Hypothèque accordée à la banque sur le bâtiment",
          debit: "9163 – Contrepartie",
          credit: "9063 – Hypothèques accordées"
        },
      ]
  },

  "9068": {
    libelle: "Autres garanties accordées",
    classe: "Classe 9 — Engagements hors bilan (accordés)",
    nature: "Compte hors bilan (Engagement de garantie accordé)",
    sens: "Créditeur",
    contenu: "Les autres garanties accordées comprennent notamment le gage, le nantissement et l'antichrèse pour lesquels l'engagement porte spécialement sur un ou plusieurs biens affectés par l'entreprise à l'acquittement de ses obligations.",
    fonctionnement: {
      credit: ["À la constitution de la garantie, pour la valeur des biens donnés en garantie, par le débit du compte de contrepartie 9168"],
      debit: ["Au dénouement de la créance ou à la réalisation de la garantie, par le crédit du compte de contrepartie 9168"]
    },
    commentaires: "",
    exclusions: { texte: "Ne doit pas enregistrer les avals, cautions et hypothèques.", comptes: ["9061 – Avals accordés", "9062 – Cautions, garanties accordées", "9063 – Hypothèques accordées"] },
    controle: ["Conventions de prêt", "Acte constitutif de la garantie"],
    comptes_lies: ["9168","9061","9062","9063"],
    textes_ref: ["SC OHADA — Compte 9068 Autres garanties accordées"],
    exemples_ecritures: [
        {
          libelle: "Nantissement accordé sur le matériel",
          debit: "9168 – Contrepartie",
          credit: "9068 – Autres garanties accordées"
        },
      ]
  },

  "9071": {
    libelle: "Ventes de marchandises à terme",
    classe: "Classe 9 — Engagements hors bilan (réciproques accordés)",
    nature: "Compte hors bilan (Engagement réciproque accordé)",
    sens: "Créditeur",
    contenu: "Pour deux partenaires, les engagements réciproques se décomposent en un engagement donné par l'entreprise à son cocontractant en contrepartie d'un engagement reçu de ce dernier. A ce titre, dans le cadre des ventes de marchandises à terme, l'entreprise s'engage à livrer des marchandises et son client s'engage à en prendre livraison et à en payer le prix à la date de livraison.",
    fonctionnement: {
      credit: ["À la signature de la transaction, par le débit du compte de contrepartie 9171"],
      debit: ["À l'exécution du marché, par le crédit du compte de contrepartie 9171"]
    },
    commentaires: "",
    exclusions: { texte: "", comptes: [] },
    controle: ["Bons de commande", "Bons de livraison", "Factures"],
    comptes_lies: ["9171"],
    textes_ref: ["SC OHADA — Compte 9071 Ventes de marchandises à terme"],
    exemples_ecritures: [
        {
          libelle: "Engagement de livraison de marchandises à un client",
          debit: "9171 – Contrepartie",
          credit: "9071 – Ventes de marchandises à terme"
        },
      ]
  },

  "9073": {
    libelle: "Commandes fermes aux fournisseurs",
    classe: "Classe 9 — Engagements hors bilan (réciproques accordés)",
    nature: "Compte hors bilan (Engagement réciproque accordé)",
    sens: "Créditeur",
    contenu: "Dans le cadre d'une commande ferme, l'entreprise s'engage de façon irrévocable à payer le prix des travaux exécutés pour son compte conformément aux spécifications contenues dans sa commande.",
    fonctionnement: {
      credit: ["À l'émission du bon de commande, par le débit du compte de contrepartie 9173"],
      debit: ["À la réception des travaux, par le crédit du compte de contrepartie 9173"]
    },
    commentaires: "",
    exclusions: { texte: "", comptes: [] },
    controle: ["Bons de commande", "Factures"],
    comptes_lies: ["9173"],
    textes_ref: ["SC OHADA — Compte 9073 Commandes fermes aux fournisseurs"],
    exemples_ecritures: [
        {
          libelle: "Commande ferme passée à un fournisseur",
          debit: "9173 – Contrepartie",
          credit: "9073 – Commandes fermes aux fournisseurs"
        },
      ]
  },

  "9081": {
    libelle: "Annulations conditionnelles de dettes",
    classe: "Classe 9 — Engagements hors bilan (autres accordés)",
    nature: "Compte hors bilan (Autre engagement accordé)",
    sens: "Créditeur",
    contenu: "La convention d'annulation de dettes assortie d'une clause de retour à meilleure fortune est caractérisée par l'extinction de la dette de l'entreprise sous condition résolutoire : l'entreprise retrouve des moyens (gains) financiers suffisants qui rétablissent sa dette originelle.",
    fonctionnement: {
      credit: ["À la conclusion de la convention, par le débit du compte de contrepartie 9181"],
      debit: ["À la réalisation de l'éventualité (retour à bonne fortune), par le crédit du compte de contrepartie 9181"]
    },
    commentaires: "Chez l'entreprise qui bénéficie de l'annulation, la dette annulée sous condition disparaît du bilan et est suivie en tant qu'engagement hors bilan donné.",
    exclusions: { texte: "", comptes: [] },
    controle: ["Grosses du jugement", "Conventions", "Décisions des organes compétents"],
    comptes_lies: ["9181"],
    textes_ref: ["SC OHADA — Compte 9081 Annulations conditionnelles de dettes"],
    exemples_ecritures: [
        {
          libelle: "Annulation conditionnelle d'une dette fournisseur",
          debit: "9181 – Contrepartie",
          credit: "9081 – Annulations conditionnelles de dettes"
        },
      ]
  },

  "9082": {
    libelle: "Engagements de retraite",
    classe: "Classe 9 — Engagements hors bilan (autres accordés)",
    nature: "Compte hors bilan (Autre engagement accordé)",
    sens: "Créditeur",
    contenu: "Ce compte enregistre les sommes que l'entreprise s'est engagée à verser à ses salariés et/ou à ses dirigeants, lorsque ces derniers feront valoir leurs droits à la retraite sous forme : d'indemnités de départ (versement d'un capital) ou de complément de pension (versé tout au long de leur retraite et même au- delà s'il existe une clause de réversion en faveur du conjoint ou des enfants à charge).",
    fonctionnement: {
      credit: ["À la première constatation et à chaque fin d'exercice lors d'augmentation des engagements, par le débit du compte de contrepartie 9182"],
      debit: ["Au départ à la retraite et à chaque fin d'exercice lors d'une diminution des engagements, par le crédit du compte de contrepartie 9182"]
    },
    commentaires: "Méthodes actuarielles d'évaluation possibles :\n— Méthode rétrospective avec salaire de fin d'exercice\n— Méthode rétrospective avec salaire de fin de carrière\n— Méthode prospective",
    exclusions: { texte: "", comptes: [] },
    controle: ["Conventions collectives", "Décisions des organes compétents"],
    comptes_lies: ["9182"],
    textes_ref: ["SC OHADA — Compte 9082 Engagements de retraite"],
    exemples_ecritures: [
        {
          libelle: "Constatation d'un engagement de retraite en fin d'exercice",
          debit: "9182 – Contrepartie",
          credit: "9082 – Engagements de retraite"
        },
      ]
  },

  "92-99": {
    libelle: "Comptabilité analytique de gestion",
    classe: "Classe 9 — Comptabilité analytique",
    nature: "Comptes de gestion interne (usage facultatif)",
    sens: "Débiteur ou Créditeur",
    contenu: "Les comptes 92 à 99 sont réservés à la comptabilité analytique de gestion, laissée à l'initiative de chaque entreprise selon sa structure, sa politique des coûts et son organisation.",
    fonctionnement: { debit: [], credit: [] },
    commentaires: "Structure proposée :\n— 92 : Comptes réfléchis (miroir des charges de la classe 6)\n— 93 : Comptes de reclassements\n— 94 : Comptes de coûts\n— 95 : Comptes de stocks\n— 96 : Comptes d'écarts sur coûts préétablis\n— 97 : Comptes de différences de traitement comptable\n— 98 : Comptes de résultats\n— 99 : Comptes de liaisons internes\n\nLes comptes à deux chiffres 92 à 99 sont de caractère suffisamment général pour répondre aux besoins de toute entreprise, qui les subdivise à sa convenance.",
    exclusions: { texte: "", comptes: [] },
    controle: [],
    comptes_lies: ["92","93","94","95","96","97","98","99"],
    textes_ref: ["SC OHADA — Comptes 92-99 Comptabilité analytique de gestion"],
    exemples_ecritures: []
  }

};
