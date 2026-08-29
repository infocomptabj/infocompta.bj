// ════════════════════════════════════════════════════════════════
//  CGI-data.js — Code Général des Impôts Bénin 2026
//  Source : Résumé structuré du CGI (Loi n° 2021-15 du 23 décembre 2021,
//           mise à jour Loi n°2025-22 du 08 décembre 2025 / LF 2026)
//  Version 2 — généré à partir du document "Résumé_code_général_des_impôts.docx"
//  Structure : chaque entrée = un chapitre du CGI, découpé en sections
//  (Champ d'application, Exonérations, Base, Taux, Déclaration, Sanctions...)
//  53 chapitres couvrant les Livres 1 à 6 du CGI.
// ════════════════════════════════════════════════════════════════

const CGI_BENIN = {

  meta: {
    titre: "Code Général des Impôts de la République du Bénin",
    loi: "Loi n° 2021-15 du 23 décembre 2021",
    mise_a_jour: "Loi n°2025-22 du 08 décembre 2025 (LF 2026)",
    source: "Résumé structuré CGI 2026 — MATAX/InfoCompta",
    nombre_chapitres: 53,
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 1 — L'Impôt sur les Sociétés (IS)
  // ────────────────────────────────────────────────────────────
  IS: {
    titre: `L'Impôt sur les Sociétés (IS)`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 1,
    articles_cgi: `2-53`,
    sections: [
      {
        titre: `Introduction et Définition`,
        contenu: `**Définition :** L'IS est un impôt annuel sur l'ensemble des bénéfices
réalisés par les sociétés et autres personnes morales.

**Période d'imposition** : Il est établi chaque année sur les bénéfices
réalisés l'année précédente.

**Date de clôture** : Les comptes doivent être clôturés au 31 décembre
de chaque année (exception pour les établissements d'enseignement au 31
août).`,
      },
      {
        titre: `Champ d'application -- Personnes imposables`,
        contenu: `Sont obligatoirement passibles de l'IS :

**Selon la forme** : SA, SAS, SARL, Sociétés en commandite simple,
sociétés coopératives.

**Selon l'activité** : Entreprises publiques à caractère industriel ou
commercial, banques, établissements financiers, compagnies d'assurances,
sociétés civiles immobilières (si lucratif), entreprises minières et
pétrolières.

**Sur option** : Les SNC, les GIE, les sociétés en participation et les
sociétés civiles. L'option est irrévocable.`,
      },
      {
        titre: `Exonérations`,
        contenu: `Principales entités exonérées (sous conditions) :

-   Les syndicats de communes et régies de services publics.

-   Les associations sans but lucratif à gestion désintéressée (ex :
    rémunération des dirigeants plafonnée à 10 fois le SMIG).

-   Les systèmes financiers décentralisés (uniquement pour la collecte
    de l'épargne et distribution de crédit).

-   Les sociétés d'exploitation agricole, de pêche et d'élevage.

-   La Caisse des Dépôts et Consignations du Bénin.`,
      },
      {
        titre: `Territorialité et Établissement Stable`,
        contenu: `**Principe **: L'impôt est dû sur les bénéfices réalisés par les
entreprises exploitées au Bénin.

**Résidence** : Sont concernées les sociétés ayant leur siège social ou
lieu de direction effective au Bénin.

**Établissement Stable (ES)** : Comprend les sièges de direction,
succursales, usines, mines, ou chantiers de construction d'une durée
supérieure à 3 mois.

**Services** : La fourniture de services par du personnel présent plus
de 183 jours sur 12 mois constitue un ES.`,
      },
      {
        titre: `Détermination du Bénéfice Imposable`,
        contenu: `**Bénéfice net** : C'est la différence entre les valeurs de l'actif net
à la clôture et à l'ouverture de l'exercice.

**Produits imposables** : Ventes, produits financiers, plus-values de
cession d'actifs, revenus de location, gains de change, etc.

**Règle de rattachement** : Les produits sont rattachés à l'exercice de
livraison des biens ou de l'avancement des services.`,
      },
      {
        titre: `Charges déductibles (Conditions générales)`,
        contenu: `Pour être déductible, une charge doit :

1\\. Être engagée dans l'intérêt direct de l'exploitation.

2\\. Correspondre à une charge effective et être appuyée de justificatifs
(factures normalisées).

3\\. Se traduire par une diminution de l'actif net.

4\\. Engager un produit non exonéré.

**Note** : Les dépenses ≥ 100 000 FCFA ne peuvent être payées en espèces
sous peine de sanctions.`,
      },
      {
        titre: `Charges déductibles (Limites spécifiques)`,
        contenu: `**Intérêts des comptes courants d'associés** : Déductibles si le capital
est libéré et dans la limite du taux directeur de la BCEAO + 3 points.

**Frais de siège et assistance technique** : Plafonnés à 10% du bénéfice
imposable (si versés à une société non résidente).

**Dons et libéralités** : Limités à 1 ‰ du chiffre d'affaires (hors dons
spécifiques à l'État plafonnés à 25 millions).

**Amortissements** : Linéaire (droit commun), accéléré (matériel neuf
d'industrie/transport) ou dégressif (si valeur > 10 millions).`,
      },
      {
        titre: `Calcul de l'impôt (Taux et Minimum)`,
        contenu: `**Taux de droit commun** :

**25%** pour les activités industrielles et les écoles privées.

**30%** pour toutes les autres personnes morales.

**Minimum de perception (Impôt Minimum)** : L'impôt ne peut être
inférieur à :

**10%** des produits encaissables pour les sociétés à prépondérance
immobilière.

**3%** pour les entreprises de BTP.

**1%** pour les autres cas.

**Minimum absolu** : 250 000 FCFA.`,
      },
      {
        titre: `Obligations déclaratives et Paiement`,
        contenu: `**Déclaration annuelle **: À souscrire au plus tard le 30 avril de
chaque année.

**Acomptes provisionnels** : Payables en 4 termes (25% chacun) au plus
tard le 10 mars, 10 juin, 10 septembre et 10 décembre.

**Solde** : À régler lors du dépôt de la déclaration annuelle.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 2 — L'Impôt sur les Bénéfices d'Affaires (IBA)
  // ────────────────────────────────────────────────────────────
  IBA: {
    titre: `L'Impôt sur les Bénéfices d'Affaires (IBA)`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 2,
    articles_cgi: `54-67`,
    sections: [
      {
        titre: `Diapositive** 1 : Introduction et Définition`,
        contenu: `**Définition :** L'IBA est un impôt annuel frappant les bénéfices
réalisés par les personnes physiques qui exercent habituellement une
activité lucrative pour leur propre compte.

**Différence clé :** Contrairement à l'IS (pour les sociétés), l'IBA
concerne l'entrepreneur individuel.

**Période d'imposition :** Comme pour l'IS, il est établi sur les
bénéfices de l'année précédente.`,
      },
      {
        titre: `Champ d'application -- Activités imposables`,
        contenu: `Sont concernés les bénéfices provenant de :

-   Activités commerciales, industrielles et artisanales.

\`\`\`{=html}
<!-- -->
\`\`\`
-   Professions libérales, charges et offices (notaires, avocats, etc.).

-   Exploitations agricoles, d'élevage et de pêche.

-   Droits de propriété intellectuelle ou industrielle.

-   Toute opération lucrative ne relevant pas des salaires (ITS), des
    revenus fonciers (IRF) ou des capitaux mobiliers (IRCM).`,
      },
      {
        titre: `Champ d'application -- Cas spécifiques`,
        contenu: `Sont également soumis à l'IBA :

-   La location d'établissements commerciaux/industriels munis de leur
    mobilier et matériel.

-   Les intermédiaires pour l'achat ou la vente d'immeubles ou de fonds
    de commerce.

-   Le lotissement et la vente de terrains.

-   Sociétés de personnes : Les associés des sociétés non soumises à
    l'IS (SNC, GIE, etc.) sont personnellement imposables à l'IBA pour
    leur part de bénéfices.`,
      },
      {
        titre: `Exonérations`,
        contenu: `Sont exclus de l'IBA :

-   Les activités agricoles, d'élevage et de pêche.

-   Les artistes (peintres, sculpteurs, musiciens, comédiens) ne vendant
    que le produit de leur art ou leur prestation.

-   Les revenus de fonds gérés par des entreprises de capital-risque (si
    durée > 3 ans).

-   Les gains issus des jeux de hasard.

-   Les contribuables relevant de la Taxe Professionnelle Synthétique
    (TPS).`,
      },
      {
        titre: `Détermination du Bénéfice Imposable`,
        contenu: `**Principe :** Les règles de détermination sont globalement les mêmes
que pour l'IS (Art. 60).

**Exceptions majeures :**

**Amortissements :** Exclusivement selon le mode linéaire.

**Report déficitaire :** Limité à 3 ans (contre 5 ans pour l'IS).

**Territorialité :** L'impôt est dû sur les bénéfices réalisés au Bénin.`,
      },
      {
        titre: `Charges déductibles (Spécificités individuelles)`,
        contenu: `Outre les charges communes, sont déductibles sous conditions :

**Salaire du conjoint :** S'il participe effectivement à l'exploitation
et que le salaire n'est pas excessif.

**Membres de la famille :** Rémunérations normales pour un travail
effectif.

**Retraite et Assurance-vie :** Versements volontaires de l'exploitant
limités à 5% du bénéfice.

**Dépenses mixtes :** À défaut de justificatifs précis pour la part
professionnelle, elle est évaluée forfaitairement à 30%.`,
      },
      {
        titre: `Charges NON déductibles`,
        contenu: `Ne peuvent être déduits du bénéfice :

-   Les prélèvements personnels (rémunération du travail de l'exploitant
    lui-même).

-   Les dépenses à caractère personnel ou intéressant l'intérêt privé de
    l'exploitant.

-   Les intérêts des capitaux engagés par l'exploitant ou la
    rémunération de ses fonds propres.`,
      },
      {
        titre: `Calcul de l'impôt (Taux et Minimum)`,
        contenu: `**Taux de droit commun :** 30% du bénéfice imposable.

**Taux réduit :** **25%** pour les établissements d'enseignement privé.

**Minimum de perception :** L'impôt ne peut être inférieur à :

**1,5%** des produits encaissables (règle générale).

**3%** pour le secteur BTP.

**10%** pour les entreprises à prépondérance immobilière.

**Minimum absolu :** 250 000 FCFA.

**ORTB :** Une redevance de 4 000 FCFA s'ajoute au montant de l'impôt.`,
      },
      {
        titre: `Obligations et Paiement`,
        contenu: `**Comptabilité :** Tenue obligatoire d'une comptabilité d'engagement.

**Option :** Les professions libérales et non-commerciales peuvent opter
pour une comptabilité de caisse.

**Déclaration et Paiement :** Se font selon les mêmes modalités et
délais que l'IS (Acomptes trimestriels et solde au 30 avril).`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 3 — L'Impôt sur le Revenu des Capitaux Mobiliers (IRCM)
  // ────────────────────────────────────────────────────────────
  IRCM: {
    titre: `L'Impôt sur le Revenu des Capitaux Mobiliers (IRCM)`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 3,
    articles_cgi: `68-100`,
    sections: [
      {
        titre: `Introduction et Définition`,
        contenu: `**Définition :** L'IRCM est un impôt qui frappe les revenus issus des
placements financiers et du patrimoine mobilier.

Trois catégories de revenus visés :

1.  Les revenus des valeurs mobilières (actions, parts sociales).

2.  Les revenus des créances, dépôts, cautionnements et comptes
    courants.

3.  Les plus-values de cessions de valeurs mobilières.`,
      },
      {
        titre: `Champ d'application -- Valeurs Mobilières`,
        contenu: `Sont notamment imposables :

-   Dividendes et intérêts des actions et parts d'intérêts distribués
    par les sociétés soumises à l'IS.

-   Jetons de présence et autres rémunérations versées aux
    administrateurs de sociétés anonymes.

-   Avances et prêts consentis aux associés (directement ou par personne
    interposée).

-   Rémunérations occultes (dont l'identité du bénéficiaire n'est pas
    révélée).

-   Bénéfices des établissements stables de sociétés étrangères, réputés
    distribués chaque année.`,
      },
      {
        titre: `Champ d'application -- Créances et Dépôts`,
        contenu: `Sont visés les intérêts et produits issus de :

-   Créances hypothécaires ou ordinaires (hors opérations purement
    commerciales).

-   Dépôts d'argent à vue ou à échéance fixe.

-   Cautionnements en numéraire et comptes courants.

-   Bons de caisse et obligations d'emprunts émis par des personnes
    morales.`,
      },
      {
        titre: `Exonérations -- Titres Publics et Épargne`,
        contenu: `**Titres d'État :** Produits des titres émis par la République du Bénin
et ses démembrements.

**Épargne populaire :** Intérêts des livrets de caisse d'épargne.

**Plus-values professionnelles :** Cessions de titres inscrits à l'actif
d'une entreprise déjà soumise à l'IBA ou à l'IS.`,
      },
      {
        titre: `Exonérations -- Régimes Spécifiques`,
        contenu: `**Sociétés Mères et Filiales :** Les dividendes reçus d'une filiale sont
exonérés chez la société mère si celle-ci détient au moins 20% du
capital depuis au moins 2 ans.

**Organismes de placement (OPCVM) :** Revenus et plus-values distribués
par des placements collectifs agréés.

**Caisse des Dépôts et Consignations du Bénin :** Exonération sur les
revenus et plus-values de ses titres de participation.`,
      },
      {
        titre: `Territorialité et Assiette`,
        contenu: `**Territorialité :** L'impôt est dû si les revenus sont versés par une
entreprise exploitée au Bénin, ou perçus par une personne (physique ou
morale) domiciliée au Bénin.

**Base d'imposition :**

**Dividendes :** Montant brut fixé par l'Assemblée Générale.

**Plus-values :** Différence entre le prix de cession réel et le prix
d'acquisition.

**Créances/Dépôts :** Montant brut des intérêts perçus ou inscrits en
compte.`,
      },
      {
        titre: `Taux de l'Impôt (Revenus mobiliers)`,
        contenu: `**5% :** Dividendes de sociétés cotées (BRVM), dividendes aux
non-résidents (sauf convention plus favorable), et plus-values de
particuliers.

**10% :** Autres dividendes et bénéfices réputés distribués des
succursales.

**15% :** Tous les autres revenus mobiliers (ex : jetons de présence,
rémunérations occultes).`,
      },
      {
        titre: `Taux de l'Impôt (Obligations et Créances)`,
        contenu: `**6% :** Revenus des obligations classiques.

**3% :** Obligations des États de l'UEMOA ou collectivités publiques
(durée entre 5 et 10 ans).

**0% :** Obligations publiques d'une durée supérieure à 10 ans.

**15% :** Revenus des créances, dépôts et cautionnements.`,
      },
      {
        titre: `Déclaration et Paiement`,
        contenu: `**Mode de perception :** Retenue à la source obligatoire par celui qui
paie le revenu.

**Échéance :** Versement au plus tard le 10 du mois suivant la mise en
paiement.

**Caractère libératoire :** Pour les personnes non soumises à l'IS ou
l'IBA, la retenue libère définitivement de tout autre impôt sur ces
revenus.

**Obligation annuelle :** Déclaration récapitulative des paiements à
souscrire avant le 30 avril.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 4 — L'Impôt sur les Revenus Fonciers (IRF)
  // ────────────────────────────────────────────────────────────
  IRF: {
    titre: `L'Impôt sur les Revenus Fonciers (IRF)`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 4,
    articles_cgi: `101-107`,
    sections: [
      {
        titre: `Introduction et Définition`,
        contenu: `**Définition :** L'IRF est un impôt frappant les revenus issus de la
location de propriétés immobilières.

**Redevables :** Les personnes physiques et assimilées (associations,
ONG, État, communes) percevant des revenus fonciers.

**Cas des sociétés :** Les associés des sociétés à prépondérance
immobilière (plus de 50% du CA issu du foncier) non soumises à l'IS y
sont également assujettis.`,
      },
      {
        titre: `Champ d'application -- Propriétés visées`,
        contenu: `Sont compris dans la base imposable :

**Propriétés bâties :** Maisons, usines, outillage industriel fixé au
sol, ainsi que les locations meublées.

**Propriétés non bâties :** Terrains nus, carrières, mines, étangs,
salines.

**Revenus accessoires :** Location de droits d'affiche, concession de
droits d'exploitation.`,
      },
      {
        titre: `Exonérations`,
        contenu: `**Jouissance personnelle :** Les revenus en nature correspondant au
logement dont le propriétaire se réserve la jouissance (résidence
principale ou secondaire non louée) ne sont pas soumis à l'IRF.

**Inclusion professionnelle :** Si les revenus sont déjà inclus dans les
bénéfices d'une entreprise (IBA ou IS), ils ne sont pas imposés
séparément à l'IRF.`,
      },
      {
        titre: `Base d'imposition (Assiette)`,
        contenu: `**Principe :** Le revenu imposable est constitué par le montant brut des
loyers.

**Ajustements :**

**Augmenté :** Des dépenses incombant normalement au propriétaire mais
payées par le locataire.

**Diminué :** Des dépenses supportées par le propriétaire pour le compte
du locataire.

**Mise à disposition gratuite :** Si le logement est prêté gratuitement
à un tiers (hors obligation légale), la valeur locative réelle est
comprise dans la base d'imposition.`,
      },
      {
        titre: `Calcul de l'impôt (Taux et Redevance)`,
        contenu: `**Taux :** Le taux de l'impôt sur les revenus fonciers est fixé à 12%.

**Redevance ORTB :** L'impôt est majoré d'une redevance de 4 000 FCFA au
profit de l'Office de Radiodiffusion et Télévision du Bénin.

**Lien avec la TFU :** L'IRF et la redevance sont portés sur le même
titre de perception que la Taxe Foncière Unique (TFU).`,
      },
      {
        titre: `La Retenue à la source`,
        contenu: `**Principe :** Le locataire doit opérer une retenue à la source lors du
paiement du loyer.

**Taux de retenue :**

**12%** en règle générale.

**10%** si le bailleur est soumis à l'IBA ou à l'IS.

**Dispense :** Les locataires personnes physiques (particuliers) sont
exemptés de cette retenue, sauf s'ils louent via une entité soumise à
l'impôt sur les bénéfices.

**Délai de Reversement :** Au plus tard le 10 du mois suivant le
paiement du loyer.`,
      },
      {
        titre: `Obligations déclaratives et Paiement`,
        contenu: `**État annuel :** Tout redevable doit remettre avant le 10 février de
chaque année un état nominatif de ses locataires et des loyers perçus
l'année précédente.

**Acomptes :** L'IRF est payé en 4 acomptes trimestriels, selon les
mêmes modalités que l'IBA.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 5 — La Taxe sur les Plus-Values Immobilières (TPVI)
  // ────────────────────────────────────────────────────────────
  TPVI: {
    titre: `La Taxe sur les Plus-Values Immobilières (TPVI)`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 5,
    articles_cgi: `108-118`,
    sections: [
      {
        titre: `Introduction et Définition`,
        contenu: `**Définition :** La TPVI est une taxe assise sur les plus-values
réalisées par des personnes physiques ou morales lors de la cession de
biens immobiliers ou de droits assimilés.

**Nature de l'opération :** Elle frappe le gain réalisé entre le prix
d'acquisition et le prix de revente d'un bien.`,
      },
      {
        titre: `Champ d'application -- Biens visés`,
        contenu: `La taxe s'applique lors de la cession de :

1.  Immeubles bâtis ou non bâtis (terrains, maisons, etc.).

2.  Droits réels immobiliers.

3.  Titres de sociétés à prépondérance immobilière (sociétés dont
    l'actif est constitué à plus de 50% d'immeubles).

4.  Titres miniers (droits d'exploration ou d'exploitation).`,
      },
      {
        titre: `Définition de la « Cession »`,
        contenu: `Sont considérés comme des cessions imposables :

-   La vente et l'échange.

-   L'apport en société.

-   La distribution de dividendes en nature (sous forme d'immeuble).

-   L'expropriation pour cause d'utilité publique.

-   Les donations (mutations à titre gratuit entre vifs).`,
      },
      {
        titre: `Exonérations`,
        contenu: `Sont exemptés de la TPVI :

-   La vente d'immeubles appartenant à l'État, aux collectivités locales
    ou aux établissements publics administratifs.

-   Les plus-values sur les immeubles inscrits à l'actif d'une
    entreprise déjà soumise à l'IBA ou à l'IS (car ces plus-values sont
    déjà incluses dans le bénéfice professionnel).`,
      },
      {
        titre: `Détermination de la Plus-Value (Assiette)`,
        contenu: `**Calcul de base :** Plus-value = Prix de cession (ou estimation) --
Prix d'acquisition.

**Prix d'acquisition :** C'est la somme réellement déboursée par le
cédant pour obtenir la propriété, justifiée par des actes ayant date
certaine.

**Valeur vénale :** Pour les biens acquis gratuitement
(succession/donation), on retient la valeur vénale au jour de la
mutation.`,
      },
      {
        titre: `Cas particuliers d'évaluation`,
        contenu: `**Constructions :** Pour les immeubles construits par le cédant
lui-même, la plus-value est fixée forfaitairement à 10% du prix de
cession de la construction.

**Valeur de référence :** À défaut de documents ou en cas de prix
manifestement minoré, l'administration utilise une valeur d'acquisition
de référence actualisée et fixée par arrêté ministériel.`,
      },
      {
        titre: `Calcul de la Taxe (Taux et Minimum)`,
        contenu: `**Taux de la taxe :** Le taux est fixé à 5% de la plus-value imposable.

**Minimum de perception :** La taxe ne peut être inférieure à 1% du prix
de cession global du bien.

**Affectation :** Une part du produit est affectée au budget de la
collectivité locale où se situe le bien.`,
      },
      {
        titre: `Obligations et Paiement`,
        contenu: `**Moment du paiement :** La taxe est payée lors des formalités
d'enregistrement de l'acte de vente ou de la déclaration de mutation.

**Redevable :** La taxe est due par le cédant (le vendeur), malgré toute
convention contraire.

**Cas des titres miniers :** La taxe est retenue et reversée par
l'acquéreur (le cessionnaire).

**Condition de mutation :** Aucun transfert de propriété foncière ne
peut être effectué sans la preuve préalable du paiement de la TPVI.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 6 — L'Impôt sur les Traitements et Salaires (ITS)
  // ────────────────────────────────────────────────────────────
  ITS: {
    titre: `L'Impôt sur les Traitements et Salaires (ITS)`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 6,
    articles_cgi: `119-129`,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `**Définition :** L'ITS est un impôt qui frappe les revenus perçus par
les salariés et les dirigeants de sociétés.

**Revenus imposables :**

-   Traitements, émoluments et salaires publics ou privés.

-   Rétributions accessoires de toute nature.

-   Indemnités de fin de carrière (IFC) versées par l'employeur ou un
    assureur.

-   Rémunérations versées aux dirigeants de sociétés soumises à l'IS.`,
      },
      {
        titre: `Exonérations et Affranchissements`,
        contenu: `Sont exclus du champ de l'impôt :

-   Les indemnités de licenciement (selon les textes légaux, hors congés
    payés et préavis).

-   Les allocations familiales et prestations de sécurité sociale (dans
    les limites des montants payables par la CNSS).

-   Les cotisations patronales de prévoyance et retraite complémentaire
    (limite : 1,5 fois la part patronale CNSS).

-   Les gratifications de stage (durée ≤ 3 mois, stagiaires < 30 ans,
    rémunération ≤ 3 fois le SMIG).`,
      },
      {
        titre: `Territorialité et Domicile Fiscal`,
        contenu: `L'impôt est dû au Bénin dans deux cas :

1.  Bénéficiaire domicilié au Bénin : Même si l'activité s'exerce à
    l'étranger ou que l'employeur est hors du Bénin.

2.  Activité au Bénin ou Employeur au Bénin : Même si le bénéficiaire
    réside à l'étranger.

**Définition du domicile fiscal :** Foyer permanent au Bénin, centre des
intérêts vitaux au Bénin, ou séjour d'au moins 183 jours sur 12 mois.`,
      },
      {
        titre: `Détermination de la Base d'Imposition`,
        contenu: `Le salaire mensuel imposable inclut les montants bruts de :

-   Traitements, salaires et pécules ;

-   Gratifications et heures supplémentaires ;

-   Avantages professionnels en argent ou en nature ;

-   Indemnités de toute sorte (y compris le transport) ;

-   Indemnités de maladie versées aux salariés.`,
      },
      {
        titre: `Les Avantages en Nature (Évaluation)`,
        contenu: `Ils sont retenus chaque mois pour leur valeur réelle (voyages, frais
médicaux, scolarité) ou selon un barème forfaitaire :

**Logement :** 15% du salaire de base.

**Domesticité :** 15% du salaire de base (sous conditions de cotisations
CNSS).

**Électricité :** 50 000 FCFA (Dirigeants) / 20 000 FCFA (Employés).

**Eau :** 10 000 FCFA (Dirigeants) / 5 000 FCFA (Employés).

**Véhicules (4 roues) :** 30 000 FCFA (Dirigeants) / 15 000 FCFA
(Employés).`,
      },
      {
        titre: `Éléments exclus de la base imposable`,
        contenu: `Ne sont pas compris dans l'assiette de l'ITS :

-   Les frais de formation engagés par l'entreprise ;

-   Les primes d'assurance maladie (contrat collectif) ;

-   Les primes d'assurance maladie (contrat individuel) dans la limite
    de 80% de la prime ;

-   Les revenus des sportifs et artistes professionnels dans la limite
    de 4 fois le SMIG.`,
      },
      {
        titre: `Calcul de l'impôt (Le Barème Progressif)`,
        contenu: `L'impôt est calculé par tranches sur le revenu mensuel :

**0% :** de 0 à 60 000 FCFA.

**10% :** de 60 001 à 150 000 FCFA.

**15% :** de 150 001 à 250 000 FCFA.

**19% :** de 250 001 à 500 000 FCFA.

**30% :** au-dessus de 500 000 FCFA.`,
      },
      {
        titre: `Redevance ORTB et Revenus Exceptionnels`,
        contenu: `Redevance ORTB :

-   1 000 FCFA sur le salaire de mars ;

-   3 000 FCFA sur le salaire de juin (sauf pour la tranche à 0%).

Rémunérations exceptionnelles (13è mois, IFC, etc.) : Bénéficient d'un
mécanisme d'atténuation basé sur le salaire moyen des 12 derniers mois
pour éviter une imposition trop forte sur un seul mois.`,
      },
      {
        titre: `Déclaration et Paiement`,
        contenu: `Retenue à la source : L'employeur est tenu d'opérer la retenue pour le
compte du Trésor Public.

**Échéance :** Le reversement des retenues doit être effectué au plus
tard le 10 du mois suivant le paiement des salaires.

**Caractère libératoire :** Les retenues opérées sont libératoires pour
le salarié.

**État annuel :** Un état global des salaires payés doit être remis
avant le 30 avril de chaque année.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 7 — Les Retenues à la Source
  // ────────────────────────────────────────────────────────────
  RETENUES_A_LA_SOURCE: {
    titre: `Les Retenues à la Source`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 7,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Panorama`,
        contenu: `**Définition :** Ce chapitre regroupe les mécanismes où l'impôt est
prélevé directement par celui qui paie le revenu pour le reverser à
l'État.

Quatre types de prélèvements :

1.  AIB (Acompte sur Impôt assis sur les Bénéfices).

2.  Prélèvement sur les personnes non connues du fichier fiscal.

3.  Retenue sur les prestataires non-résidents.

4.  Prélèvement sur les ventes d'hydrocarbures par des non-domiciliés.`,
      },
      {
        titre: `L'Acompte sur Impôt assis sur les Bénéfices (AIB)`,
        contenu: `**Nature :** C'est une avance (acompte) sur l'impôt final (IS, IBA ou
TPS).

**Opérations visées :**

-   Importations de marchandises (sauf transit).

-   Achats commerciaux à l'intérieur auprès d'importateurs, producteurs
    ou revendeurs.

-   Paiements par l'État, les collectivités, les entreprises publiques,
    les ONG et les sociétés soumises à l'IS/IBA à leurs fournisseurs.`,
      },
      {
        titre: `AIB -- Taux et Base de Calcul`,
        contenu: `**Base d'imposition :** Valeur en douane (import) ou prix TTC
(intérieur), hors TVA.

**Taux applicables :**

**1% :** Importations et achats par des entreprises immatriculées (IFU),
fournitures à l'État.

**3% :** Prestations de services par des personnes immatriculées (IFU).

**5% :** Achats et services par des personnes non immatriculées (sans
IFU).`,
      },
      {
        titre: `AIB -- Mécanisme d'Imputation`,
        contenu: `**Utilisation :** L'AIB payé lors des achats est déductible de l'AIB que
l'entreprise doit elle-même collecter sur ses propres ventes.

**Solde annuel :** Si les acomptes payés durant l'année dépassent
l'impôt réel dû (IS ou IBA), l'excédent constitue un crédit d'impôt
imputable sur les échéances futures.

**Cas de la TPS :** L'AIB payé est déductible de la part nationale de la
taxe professionnelle synthétique.`,
      },
      {
        titre: `Prélèvement sur les Personnes Non Connues (DGI)`,
        contenu: `**Cible :** Personnes physiques ou morales réalisant des opérations sans
être enregistrées au fichier des contribuables de la DGI.

**Champ :** Importations, exportations, ventes et prestations.

**Taux :** 10% de la base imposable.

Caractère définitif : Contrairement à l'AIB, ce prélèvement est
libératoire et définitif (non imputable sur d'autres impôts).`,
      },
      {
        titre: `Retenue sur les Prestataires Non-Résidents`,
        contenu: `**Champ d'application :** Sommes payées à des personnes (physiques ou
morales) n'ayant pas d'établissement stable au Bénin pour des
prestations fournies ou utilisées au Bénin.

**Services visés :** Activités non commerciales, droits d'auteur,
brevets, marques, et travaux immobiliers.

**Taux :** **20%** sur le montant brut des sommes dues.

Dispense : Rémunérations pour prestations artistiques et culturelles.`,
      },
      {
        titre: `Retenue Prestataires -- Conventions et Responsabilité`,
        contenu: `**Conventions fiscales :** Le taux de **20%** peut être réduit ou annulé
si une convention internationale de non-double imposition a été signée
avec le pays du prestataire.

**Responsabilité :** Le débiteur béninois est tenu d'opérer la retenue.
Il est solidairement responsable avec le prestataire étranger du
reversement de l'impôt.`,
      },
      {
        titre: `Prélèvement sur les Ventes d'Hydrocarbures`,
        contenu: `**Redevables :** Entreprises non domiciliées fiscalement au Bénin
vendant des hydrocarbures à des importateurs agréés locaux.

**Taux :** 0,3 franc CFA par litre vendu.

**Reversement :** Opéré par les dépositaires des stocks d'hydrocarbures
au Bénin au plus tard le 10 du mois suivant le prélèvement.`,
      },
      {
        titre: `Obligations et Sanctions`,
        contenu: `**Déclaration :** Doit être faite mensuellement au plus tard le 10 du
mois suivant, même en l'absence de prélèvement (déclaration néant).

**Sanctions pour non-retenue :** Celui qui devait retenir l'impôt
devient personnellement redevable du montant non prélevé.

**Pénalités de retard :** 20% des sommes non reversées (porté à 40%
après 2 mois de retard).

**Amende AIB :** 100% de la retenue non effectuée (50% au premier
manquement).`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 8 — Les Régimes Incitatifs
  // ────────────────────────────────────────────────────────────
  REGIMES_INCITATIFS: {
    titre: `Les Régimes Incitatifs`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 8,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Projets Prioritaires`,
        contenu: `Objectif : Encourager l'investissement, la création d'emplois et la
formalisation des entreprises.

Négoce d'œuvres d'art :

Taux de l'IS/IBA réduit à 20% du bénéfice.

Minimum de perception réduit à 0,5% des produits encaissables.

Secteurs prioritaires : Des régimes fiscaux dérogatoires spécifiques
peuvent être définis en Conseil des Ministres pour les projets
d'investissement jugés stratégiques.`,
      },
      {
        titre: `Incitation à la Création d'Entreprise Nouvelle`,
        contenu: `Avantage : Réduction progressive de l'impôt (IS ou IBA) pour les
entreprises régulièrement créées.

Barème des réductions :

-   25% au titre du 1er exercice ;

-   25% au titre du 2e exercice ;

-   50% au titre du 3e exercice.

Exclusions : Les entreprises de BTP, les activités préexistantes
reprises, les entreprises avec un CA >= 1 milliard FCFA,
et les succursales d'entreprises non-résidentes.`,
      },
      {
        titre: `Incitation à la Création de Startups`,
        contenu: `Éligibilité : Entreprises innovantes dans le domaine des TIC,
labellisées « startup » et ayant un CA annuel ≤ 100 millions
FCFA.

Exonérations (pendant 2 ans) :

Impôt sur les Sociétés (IS).

Versement Patronal sur Salaires (VPS).

Réduction (3e année) : 50% de réduction sur ces mêmes impôts.`,
      },
      {
        titre: `Incitation à la Formalisation (Centres de Gestion Agréés -- CGA)`,
        contenu: `Cible : Nouveaux contribuables (commerçants, artisans, agriculteurs)
non-inscrits à la DGI avec un CA ≤ 50 millions FCFA.

Avantages fiscaux :

Réduction de 40% de l'impôt (IS, IBA ou TPS) de la 1ère à la 4e
année d'adhésion.

Dispense de contrôles fiscaux pendant les 2 premiers exercices (sauf cas
de fraude avérée ou défaut de facture normalisée).

Condition : L'avantage est perdu et l'impôt régularisé si l'adhérent
quitte volontairement le CGA dans les 2 ans.`,
      },
      {
        titre: `Incitation à la Création d'Emplois Salariés`,
        contenu: `Mécanisme : Crédit d'impôt annuel non renouvelable pour le recrutement
de Béninois en premier emploi (CDI).

Montant du crédit d'impôt :

1 à 5 emplois : 100 000 FCFA.

6 à 10 emplois : 200 000 FCFA.

11 à 20 emplois : 350 000 FCFA.

Plus de 20 emplois : 500 000 FCFA.

Conditions : Salarié ayant accompli au moins 1 an de service. Demande à
introduire au 1er trimestre de l'année suivant le recrutement.`,
      },
      {
        titre: `Sociétés Conventionnées ou Agréées`,
        contenu: `Champ d'application : Entreprises agréées au titre du Code des
investissements, du Code minier ou du Code pétrolier.

Régime fiscal : Exonérations prévues selon les termes de leur agrément
ou cahier des charges.

Sanctions : Tout manquement aux obligations de l'agrément entraîne la
perte du régime de faveur et l'application du droit commun.

Contrôles : Aucune autorité ne peut dispenser un titulaire d'agrément
des contrôles fiscaux réglementaires.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 9 — La Taxe Foncière Unique (TFU)
  // ────────────────────────────────────────────────────────────
  TFU: {
    titre: `La Taxe Foncière Unique (TFU)`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 9,
    articles_cgi: `151-165`,
    sections: [
      {
        titre: `Introduction et Définition`,
        contenu: `**Définition :** La TFU est une contribution annuelle assise sur les
propriétés foncières situées en République du Bénin.

Nature : C'est un impôt local dont le produit est affecté au budget de
la commune où se situe l'immeuble (sous déduction de 10% pour frais
d'administration).`,
      },
      {
        titre: `Champ d'application -- Propriétés imposables`,
        contenu: `La taxe frappe deux catégories de biens :

1\\. Propriétés bâties : Constructions fixées au sol à demeure (maisons,
usines, manufactures) et terrains non cultivés à usage commercial ou
industriel (chantiers, dépôts)

2\\. Propriétés non bâties : Terrains nus de toute nature.

Note : Les constructions légères (kiosques, cases en paille) sont
assimilées aux propriétés non bâties, sauf si elles sont productives de
revenus ou à usage commercial.`,
      },
      {
        titre: `Exonérations Permanentes`,
        contenu: `Sont notamment exemptés de la TFU :

Les immeubles appartenant à l'État et aux collectivités locales (si
improductifs de revenus).

Les immeubles des missions diplomatiques et organismes internationaux
(sous réserve d'accord de siège).

Les terrains agricoles, pépinières et jardins d'essais.

Les immeubles à usage scolaire, universitaire ou sportif (si
l'établissement est propriétaire).

Les édifices servant à l'exercice des cultes.

Les terrains boisés ou ensemencés en bois.`,
      },
      {
        titre: `Exonération Temporaire (Résidence Principale)`,
        contenu: `Avantage : Les constructions nouvelles ou reconstructions destinées à
l'habitation du propriétaire et de sa famille bénéficient d'une dispense
de TFU.

Durée : L'exonération s'arrête la quatrième année suivant l'achèvement
ou la première utilisation.

Conditions :

S'applique uniquement à la résidence principale.

Accordée une seule fois par personne.

Le propriétaire doit être à jour de la TFU sur l'immeuble préexistant.`,
      },
      {
        titre: `Personnes Imposables (Débiteurs)`,
        contenu: `Principe : La taxe est due pour l'année entière par le propriétaire au
1er janvier de l'année d'imposition.

Cas particuliers :

Usufruitier (en cas d'usufruit).

Emphytéote (en cas de bail emphytéotique).

Locataire (en cas de bail à construction, à compter de l'année suivant
l'achèvement).

Solidarité : Les fermiers ou locataires sont tenus de payer la taxe en
l'acquit des propriétaires (montant à valoir sur le loyer).`,
      },
      {
        titre: `Base d'imposition (Assiette)`,
        contenu: `La méthode de calcul diffère selon la nature du bien :

Pour les propriétés bâties : La base est la valeur locative de
l'immeuble.

Pour les propriétés non bâties : La base est l'évaluation administrative
(valeur vénale) fixée par les conseils municipaux et révisable tous les
5 ans.`,
      },
      {
        titre: `Taux de la Taxe`,
        contenu: `Les taux sont fixés annuellement par les conseils municipaux dans les
limites suivantes :

Propriétés non bâties : Entre 3% et 7%.

Propriétés bâties : Entre 4% et 8%.

Taux par défaut (si aucun taux n'est adopté) : 5% pour le non bâti et 6%
pour le bâti.`,
      },
      {
        titre: `Obligations Déclaratives`,
        contenu: `Délai initial : Déclaration de la propriété par simple lettre dans les
30 jours suivant l'acquisition ou l'achèvement.

Signalétique : Obligation de poser une plaque ou une mention à l'entrée
comportant l'adresse complète (numéro « Rue entrée parcelle »).

État annuel : Les propriétaires ou gérants doivent fournir au plus tard
le 10 décembre un état de leurs locataires et occupants.`,
      },
      {
        titre: `Modalités de Paiement`,
        contenu: `La TFU est payée en deux acomptes :

1\\. 1er acompte (50%) : Au plus tard le 10 février (basé sur la taxe
de l'année précédente).

2\\. Solde (50%) : Au plus tard le 30 avril.

Preuve de paiement : Le paiement régulier crée une présomption de
propriété. Aucun acte foncier (titre foncier, permis de construire)
n'est valide sans la mention certifiée que le propriétaire est à jour de
sa TFU.

Nous continuons la série avec le Chapitre 2 du Titre 2 (Livre 1) du Code
Général des Impôts 2026. Ce chapitre traite de la Taxe sur les Véhicules
à Moteur (TVM).`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 10 — La Taxe sur les Véhicules à Moteur (TVM)
  // ────────────────────────────────────────────────────────────
  TVM: {
    titre: `La Taxe sur les Véhicules à Moteur (TVM)`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 10,
    articles_cgi: `166-171`,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `**Définition :** La TVM est une taxe annuelle frappant les véhicules à
moteur d'au moins trois roues immatriculés en République du Bénin.

Usage visé : Elle concerne les véhicules utilisés pour le transport
public ou privé de personnes ou de marchandises.

Nature : C'est un impôt direct sur le patrimoine automobile.`,
      },
      {
        titre: `Exonérations`,
        contenu: `Sont exemptés du paiement de la TVM :

Les véhicules immatriculés au nom du corps diplomatique et consulaire.

Les véhicules des organisations internationales relevant du système de
l'ONU.

Les véhicules des organismes inter-États et des ONG internationales
ayant signé un accord de siège avec le Bénin.`,
      },
      {
        titre: `Tarifs pour le Transport Privé (Particuliers)`,
        contenu: `Le tarif est fixé selon la puissance fiscale du véhicule :

≤ 7 chevaux : 20 000 FCFA.

8 à 10 chevaux : 30 000 FCFA.

11 à 15 chevaux : 40 000 FCFA.

Au-dessus de 15 chevaux : 60 000 FCFA.

Véhicules à moteur à trois roues : 15 000 FCFA.`,
      },
      {
        titre: `Tarifs pour le Transport Public (Voyageurs)`,
        contenu: `0 à 9 places : 38 000 FCFA.

10 à 20 places : 57 000 FCFA.

Plus de 20 places : 86 800 FCFA.`,
      },
      {
        titre: `Tarifs pour le Transport Public (Marchandises)`,
        contenu: `0 à 2,5 tonnes : 49 500 FCFA.

2,6 à 5 tonnes : 57 000 FCFA.

5,01 à 10 tonnes : 86 800 FCFA.

Plus de 10 tonnes : 136 400 FCFA.

Note : Pour les véhicules attelés, la taxe est calculée sur le cumul des
charges utiles de l'ensemble (tracteur et remorques).`,
      },
      {
        titre: `Tarifs Spécifiques aux Entreprises`,
        contenu: `Pour les véhicules de transport privé de personnes possédés ou utilisés
par des sociétés ou entreprises (publiques ou privées) :

Puissance ≤ 7 CV : 150 000 FCFA.

Puissance > 7 CV : 200 000 FCFA.

Principe : La taxe est due même si les véhicules sont affectés
exclusivement à l'objet social de l'entreprise.`,
      },
      {
        titre: `Redevable et Période d'imposition`,
        contenu: `Le Débiteur : La taxe est due par le propriétaire du véhicule dont le
nom figure sur la carte grise.

Période : Elle est due pour l'année entière pour les véhicules possédés
au 1er janvier.

Mise en circulation en cours d'année : La taxe est calculée prorata
temporis et doit être payée dans les 10 premiers jours du mois suivant
l'immatriculation.`,
      },
      {
        titre: `Modalités de Paiement et Sanctions`,
        contenu: `Échéance : La taxe doit être acquittée au plus tard le 30 avril de
chaque année.

Pénalités : Tout retard est sanctionné par une majoration de 20%.

Défaut de paiement : Entraîne l'immobilisation du véhicule par les
forces de l'ordre.`,
      },
      {
        titre: `Caractère Fiscal de la TVM`,
        contenu: `Pour les contribuables à la TPS : Le paiement a un caractère définitif.

Pour les contribuables à l'IBA ou l'IS : La TVM constitue un acompte
d'impôt (imputable sur l'impôt sur les bénéfices).

Contrôle technique : La preuve du paiement de la TVM est obligatoire
pour passer la visite technique automobile.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 11 — La Taxe sur les Armes à Feu
  // ────────────────────────────────────────────────────────────
  TAXE_SUR_LES_ARMES_A_FEU: {
    titre: `La Taxe sur les Armes à Feu`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 11,
    articles_cgi: `172-175`,
    sections: [
      {
        titre: `Introduction et Définition`,
        contenu: `Nature de la taxe : La taxe sur les armes à feu comprend un droit fixe
(à la délivrance de l'autorisation) et une taxe annuelle.

Bénéficiaire : Le produit de cette taxe est perçu au profit des
communes.`,
      },
      {
        titre: `Exonérations`,
        contenu: `Sont exemptées du paiement de la taxe :

Les armes à feu à usage de la troupe, de la police ou de toute autre
force de défense et de sécurité.

Les armes réglementaires des officiers et sous-officiers en activité ou
de réserve.

Les armes d'honneur.

Les armes en stock dans les magasins de commerce tant qu'elles n'ont pas
été mises en usage.`,
      },
      {
        titre: `Le Droit Fixe (Autorisation de détention)`,
        contenu: `La délivrance de l'autorisation (ou d'un duplicata) donne lieu au
paiement préalable d'un droit fixe :

Armes perfectionnées rayées : 15 000 FCFA.

Revolvers et pistolets : 20 000 FCFA.

Armes de traite : 2 000 FCFA.

Autres armes (perfectionnées non rayées, armes de salon ≤ 6
mm) : 6 000 FCFA.`,
      },
      {
        titre: `La Taxe Annuelle (Tarifs)`,
        contenu: `Tout détenteur d'une arme à feu doit payer chaque année :

Armes perfectionnées rayées : 30 000 FCFA.

Revolvers et pistolets : 30 000 FCFA.

Armes perfectionnées non rayées : 20 000 FCFA.

Armes de traite : 8 000 FCFA.

Armes de jardin ou de salon ( ≤ 6 mm) : 8 000 FCFA.`,
      },
      {
        titre: `Dispositions spécifiques (Armes de traite et Permis)`,
        contenu: `Confusion de droits : Pour les armes de traite, la taxe annuelle se
confond avec le droit de permis de chasse (permis sportif ordinaire).

Dispense : Le permis de chasse n'est pas exigé des détenteurs autorisés
d'un fusil de traite.`,
      },
      {
        titre: `Obligations, Paiement et Fin de taxation`,
        contenu: `Échéance : La taxe doit être déclarée et payée au plus tard le 10
février de chaque année.

Armes hors d'usage : Elles continuent d'être taxées jusqu'à ce qu'elles
soient officiellement remises aux autorités administratives habilitées.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 12 — La Taxe sur les Pirogues et Barques Motorisées
  // ────────────────────────────────────────────────────────────
  TAXE_SUR_LES_PIROGUES_ET_BARQUES_MOTORISEES: {
    titre: `La Taxe sur les Pirogues et Barques Motorisées`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 12,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Institution`,
        contenu: `Nature de la taxe : Il s'agit d'une taxe facultative que chaque commune
peut instituer par délibération de son conseil.

Bénéficiaire : Le produit de cette taxe est perçu au profit exclusif du
budget de la commune concernée.`,
      },
      {
        titre: `Champ d'application`,
        contenu: `Personnes visées : Tout possesseur de pirogues et barques motorisées.

Zones de navigation : Véhicules utilisés en mer, sur les lagunes ou sur
les fleuves.

Usages visés : Activités de pêche ou de transport.

Exclusion majeure : Les pirogues et barques non motorisées ne sont pas
soumises à cette taxe.`,
      },
      {
        titre: `Tarification`,
        contenu: `Taux journalier : Le tarif est fixé par la commune entre 300 et 500 FCFA
par jour d'exploitation.

Calcul annuel : Bien que le tarif soit journalier, la taxe est due
annuellement.`,
      },
      {
        titre: `Modalités de Paiement et Échéance`,
        contenu: `Délai de paiement : La taxe doit être acquittée obligatoirement avant le
1er avril de chaque année.

Acquisition en cours d'année :

Si l'élément est acquis après le 31 mars, la taxe doit être payée le
jour même de l'acquisition.

À défaut, un double droit est dû à compter du lendemain de
l'acquisition.`,
      },
      {
        titre: `Sanctions pour retard`,
        contenu: `-   Amende de retard : Tout paiement effectué après le 31 mars entraîne
    l'application d'une amende égale au montant de la taxe due (soit un
    paiement total de 100% de majoration).`,
      },
      {
        titre: `Preuve de paiement`,
        contenu: `Justificatif : Le paiement est constaté par la délivrance d'une plaque
de taille variable selon la catégorie de l'embarcation.

Obligation d'affichage : Cette plaque doit être apposée de façon
apparente sur la partie extérieure de la pirogue ou de la barque.

Nous abordons le Chapitre 5 du Titre 2 (Livre 1) du Code Général des
Impôts 2026, qui traite de la Taxe sur les Taxis de Ville de deux à
quatre roues.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 13 — La Taxe sur les Taxis de Ville
  // ────────────────────────────────────────────────────────────
  TAXE_SUR_LES_TAXIS_DE_VILLE: {
    titre: `La Taxe sur les Taxis de Ville`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 13,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Institution`,
        contenu: `Nature de la taxe : Il s'agit d'une taxe facultative que chaque commune
peut choisir d'établir par délibération de son conseil.

Objectif : Contribuer aux ressources de la collectivité locale où
l'activité de transport urbain est exercée.`,
      },
      {
        titre: `Champ d'application`,
        contenu: `Véhicules visés : La taxe s'applique aux taxis de ville.

Catégories : Concerne les véhicules de deux à quatre roues.

Redevable : La taxe est due par le propriétaire du taxi.`,
      },
      {
        titre: `Tarification`,
        contenu: `Montant : Le tarif est fixé par la commune dans une fourchette allant de
0 à 5 000 FCFA par taxi.

Périodicité : Le tarif s'applique par mois.`,
      },
      {
        titre: `Modalités de Paiement`,
        contenu: `Organisme percepteur : La taxe est payée auprès du receveur des impôts.

Échéance : Le paiement doit être effectué au plus tard le 10 du mois
suivant celui au titre duquel la taxe est due.`,
      },
      {
        titre: `Règle du mois entamé`,
        contenu: `Principe de calcul : Pour la perception de cette taxe, tout mois
commencé est compté pour un mois entier.

Conséquence : Aucune réduction au prorata n'est applicable si l'activité
ne couvre qu'une partie du mois.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 14 — La Taxe Professionnelle Synthétique (TPS)
  // ────────────────────────────────────────────────────────────
  TPS: {
    titre: `La Taxe Professionnelle Synthétique (TPS)`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 14,
    articles_cgi: `178-190`,
    sections: [
      {
        titre: `Introduction et Définition`,
        contenu: `**Définition :** La TPS est une contribution unique qui remplace quatre
impôts et taxes pour les petites entreprises.

Impôts remplacés :

1\\. L'Impôt sur les Bénéfices d'Affaires (IBA).

2\\. La contribution des patentes.

3\\. La contribution des licences.

4\\. Le versement patronal sur les salaires (VPS).

Objectif : Simplifier la fiscalité pour les contribuables dont le
chiffre d'affaires est inférieur à un seuil fixé par arrêté ministériel.`,
      },
      {
        titre: `Champ d'application`,
        contenu: `Sont assujettis : Les contribuables relevant de l'IBA (personnes
physiques) dont le chiffre d'affaires est inférieur ou égal au seuil
légal.

Sont exclus : Quel que soit leur chiffre d'affaires, les contribuables
passibles de l'Impôt sur les Sociétés (IS), que ce soit de plein droit
ou sur option.`,
      },
      {
        titre: `Exonérations`,
        contenu: `Sont exonérés de la TPS :

Les artistes (peintres, sculpteurs, etc.) ne vendant que le produit de
leur art.

Les entreprises et sociétés d'exploitation agricole, de pêche et
d'élevage.

Les entreprises nouvelles régulièrement créées, pendant leurs douze (12)
premiers mois d'activité.`,
      },
      {
        titre: `Droit d'option pour l'IBA`,
        contenu: `Principe : Les entreprises soumises à la TPS peuvent choisir d'être
imposées au régime de l'IBA (bénéfice réel).

Modalités : Demande écrite au service des impôts ; l'option prend effet
le mois suivant l'acceptation.

Caractère : L'option est irrévocable.`,
      },
      {
        titre: `Changement de régime (Dépassement du seuil)`,
        contenu: `Dépassement du seuil : Le passage au régime de l'IBA est obligatoire dès
le premier jour du mois suivant la constatation du dépassement.

Abaissement du CA : Un contribuable à l'IBA ne revient à la TPS que si
son chiffre d'affaires reste inférieur au seuil pendant deux exercices
consécutifs.

Imputation : La TPS payée avant le changement est considérée comme un
acompte sur les nouveaux impôts (50% État, 50% Impôts locaux).`,
      },
      {
        titre: `Calcul de l'impôt (Taux et Minimum)`,
        contenu: `**Taux :** 5% du montant des recettes annuelles.

Minimum de perception : 10 000 FCFA.

Redevance ORTB : Une redevance de 4 000 FCFA s'ajoute à l'impôt au
profit de la société nationale de radiodiffusion et télévision.

Territorialité : La taxe est due par commune et par établissement.`,
      },
      {
        titre: `Obligations déclaratives`,
        contenu: `Échéance : Déclaration annuelle à souscrire au plus tard le 30 avril de
chaque année pour l'exercice précédent.

Contenu : Identité, IFU, localisation, liste des 5 principaux
clients/fournisseurs, montant des achats et des recettes annuelles.`,
      },
      {
        titre: `Modalités de Paiement`,
        contenu: `La TPS est payée en trois temps :

1\\. 1er acompte : Dans les 10 premiers jours de février (sur la base
de l'impôt de l'année précédente).

2\\. 2e acompte : Dans les 10 premiers jours de juin.

3\\. Le solde : Au plus tard le 30 avril lors du dépôt de la déclaration.

Note : Les acomptes AIB payés sont imputables sur le solde dû.`,
      },
      {
        titre: `Cas particulier des Marchands Forains`,
        contenu: `**Définition :** Commerçants vendant en étalage, sur les marchés ou
transportant des marchandises de commune en commune.

Paiement : Doivent payer par anticipation en une seule fois avant le
1er mars.

Preuve : Une quittance ou formule annuelle leur est remise et doit être
présentée à toute réquisition sous peine de saisie des marchandises.`,
      },
      {
        titre: `Affectation du produit de la TPS`,
        contenu: `Répartition : Le produit est affecté à raison de :

50% au budget de l'État.

50% au budget de la collectivité locale (commune) où l'activité est
exercée.

Exception : Le produit de la TPS foraine est affecté en intégralité à la
commune où a eu lieu le recouvrement.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 15 — Le Versement Patronal sur Salaires (VPS)
  // ────────────────────────────────────────────────────────────
  VPS: {
    titre: `Le Versement Patronal sur Salaires (VPS)`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 15,
    articles_cgi: `191-195`,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `**Définition :** Le VPS est un impôt dû par les employeurs, personnes
physiques ou morales, qui versent des traitements, émoluments, salaires
et rétributions accessoires.

Nature : C'est une contribution à la charge exclusive de l'employeur,
calculée sur la base des rémunérations versées à son personnel.`,
      },
      {
        titre: `Exonérations liées au statut de l'employeur`,
        contenu: `Sont affranchis du versement patronal sur salaires :

Les contribuables assujettis à la Taxe Professionnelle Synthétique (TPS)
(pour qui le VPS est déjà inclus dans la contribution unique).`,
      },
      {
        titre: `Exonérations liées à l'emploi et à l'insertion`,
        contenu: `Sont également exonérés :

Les entreprises nouvelles régulièrement créées, au titre de leur premier
exercice, pour l'emploi de salariés de nationalité béninoise.

Les employeurs, pendant deux ans, sur les rémunérations versées au titre
du premier emploi d'un salarié béninois (sous réserve de déclaration à
la CNSS).

Les rémunérations versées aux stagiaires (sous les conditions de durée
et d'âge prévues à l'article 120).`,
      },
      {
        titre: `Autres exonérations spécifiques`,
        contenu: `L'exonération s'applique aussi :

Aux promoteurs d'activités sportives ou artistiques pour les
rémunérations des sportifs et artistes professionnels (dans la limite de
4 fois le SMIG).

Aux employeurs domestiques pour les salaires versés à leur personnel de
maison (sous réserve de paiement des cotisations CNSS).`,
      },
      {
        titre: `Détermination de la Base d'imposition`,
        contenu: `Principe d'alignement : La base d'imposition du VPS est strictement
identique à celle de l'Impôt sur les Traitements et Salaires (ITS).

Éléments inclus : Elle comprend les montants bruts des salaires,
indemnités, primes et les avantages en nature évalués selon le barème
légal.`,
      },
      {
        titre: `Calcul de l'impôt (Taux)`,
        contenu: `Taux de droit commun : Le taux normal est fixé à 4% de la base
imposable.

Taux réduit : Il est ramené à 2% pour les établissements d'enseignement
privé.`,
      },
      {
        titre: `Déclaration et Paiement`,
        contenu: `Modalités : Le VPS est liquidé sur la même déclaration mensuelle que
l'ITS.

Échéance : Il doit être payé à la recette des impôts au plus tard le 10
du mois suivant le paiement des salaires.

Lien procédural : Les conditions de contrôle et les sanctions
applicables sont les mêmes que pour les retenues à la source sur
salaires.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 16 — Contribution des Patentes et des Licences
  // ────────────────────────────────────────────────────────────
  CONTRIBUTION_DES_PATENTES_ET_DES_LICENCES: {
    titre: `Contribution des Patentes et des Licences`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 16,
    articles_cgi: `196-217`,
    sections: [
      {
        titre: `La Patente -- Introduction et Champ d'application`,
        contenu: `**Définition :** La patente est une contribution annuelle et personnelle
due par toute personne (physique ou morale, béninoise ou étrangère) qui
exerce au Bénin un commerce, une industrie ou une profession non
expressément exemptée.

Établissements multiples : Le droit fixe est dû pour chaque
établissement distinct (atelier, magasin, succursale).

Principe de l'exercice habituel : Seul le fait d'exercer habituellement
une activité lucrative rend passible de la patente.`,
      },
      {
        titre: `La Patente -- Principales Exemptions`,
        contenu: `Sont notamment affranchis de la patente :

L'État, les communes et les établissements publics (pour les services
d'utilité générale).

Les salariés (fonctionnaires ou employés privés) dans l'exercice de
leurs fonctions.

Les agriculteurs, éleveurs et pêcheurs pour la vente de leurs propres
récoltes ou produits.

Les établissements d'enseignement (publics ou privés).

Les artistes (peintres, sculpteurs, musiciens) ne vendant que le produit
de leur art.

Les contribuables assujettis à la Taxe Professionnelle Synthétique
(TPS).

Les entreprises nouvelles, pendant leurs 12 premiers mois d'activité.`,
      },
      {
        titre: `Calcul de la Patente -- Le Droit Fixe`,
        contenu: `La contribution se compose d'un droit fixe et d'un droit proportionnel.

Tarif Général : Basé sur le chiffre d'affaires (CA) de l'exercice
précédent et la zone géographique.

Zone 1 (Atlantique, Littoral, Ouémé, etc.) : 70 000 FCFA si CA
≤ 1 milliard.

Zone 2 (Borgou, Alibori, etc.) : 60 000 FCFA si CA ≤ 1
milliard.

Au-delà d'un milliard : + 10 000 FCFA par milliard supplémentaire.

Tarif Spécifique (Import/Export) : Basé sur le volume des
importations/exportations (de 150 000 FCFA à plus de 1 125 000 FCFA).`,
      },
      {
        titre: `Calcul de la Patente -- Le Droit Proportionnel`,
        contenu: `Assiette : Établi sur la valeur locative des locaux servant à l'exercice
de la profession (bureaux, usines, magasins, terrains de dépôts).

Taux par localité :

Cotonou et Porto-Novo : 17%.

Parakou : 25%.

Autres communes : entre 12% et 18% selon le département.

Minimum de perception : Le droit proportionnel ne peut être inférieur au
tiers du droit fixe.`,
      },
      {
        titre: `La Patente Complémentaire (Marchés Publics)`,
        contenu: `Cible : Les attributaires de marchés ou d'adjudications de travaux
publics.

**Taux :** 0,5% du montant hors taxes du marché (ou de l'avenant).

Paiement : Doit être déclaré et payé au plus tard la fin du mois suivant
l'attribution du marché.

Note : Un fractionnement du paiement est possible si le droit excède 10
millions FCFA.`,
      },
      {
        titre: `La Patente -- Déclaration et Paiement`,
        contenu: `Déclaration annuelle : À souscrire au plus tard le 30 avril pour
l'ensemble des établissements de l'entreprise.

Modalités de paiement :

Acompte de 50% au plus tard le 10 février (sur la base de l'année
précédente).

Solde au plus tard le 30 avril.

Affectation : Le produit est perçu au profit des communes (après
déduction de 10% pour frais d'administration par l'État).`,
      },
      {
        titre: `La Licence -- Champ d'application`,
        contenu: `**Définition :** Droit annuel dû par toute personne se livrant à la
vente au détail de boissons alcooliques ou fermentées (consommation sur
place ou à emporter).

Boissons visées : Vins de liqueur, vermouths, bières, et toute boisson
titrant plus de 12° d'alcool.

Indépendance : La licence est due indépendamment de la patente ; le
paiement de l'une ne dispense pas de l'autre.`,
      },
      {
        titre: `La Licence -- Tarification`,
        contenu: `Le tarif est fixé selon le chiffre d'affaires et la zone géographique :

CA ≤ 500 millions : 50 000 FCFA (Zone 1) / 30 000 FCFA (Zone 2).

CA entre 500M et 1 milliard : 80 000 FCFA (Zone 1) / 60 000 FCFA (Zone
2).

CA > 1 milliard : 100 000 FCFA pour toutes les zones.`,
      },
      {
        titre: `La Licence -- Obligations et Sanctions`,
        contenu: `Alignement sur la patente : Les règles d'assiette, de déclaration et de
paiement sont les mêmes que pour la patente (acompte en février, solde
en avril).

Sanctions :

Majoration de 10% en cas de retard de paiement.

L'autorité administrative peut ordonner la fermeture immédiate de
l'établissement en cas de non-paiement.

Affectation : Comme pour la patente, le produit revient au budget de la
commune d'exploitation.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 17 — La Taxe de Développement du Sport
  // ────────────────────────────────────────────────────────────
  TAXE_DE_DEVELOPPEMENT_DU_SPORT: {
    titre: `La Taxe de Développement du Sport`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 17,
    articles_cgi: `218-220`,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `**Définition :** Il s'agit d'une taxe annuelle destinée à alimenter un
fonds dédié au développement des activités sportives au Bénin.

Entreprises concernées : Sont soumises à cette taxe les entreprises dont
le chiffre d'affaires est supérieur ou égal à un milliard
(1 000 000 000) de francs CFA.

Affectation : Le produit de la taxe est reversé à un fonds spécial dont
la gestion est encadrée par un arrêté conjoint des Ministres chargés des
sports et des finances.`,
      },
      {
        titre: `Exonérations`,
        contenu: `Sont exemptées du paiement de cette taxe :

Les entreprises qui sont propriétaires ou copropriétaires d'un club
professionnel de sport engagé dans un championnat national, à condition
qu'elles réalisent des dépenses de fonctionnement ou d'investissement au
profit de ce club.

Les entreprises finançant des classes sportives sous les mêmes
conditions.`,
      },
      {
        titre: `Base d'imposition et Taux`,
        contenu: `Assiette : La taxe est calculée sur la base du chiffre d'affaires hors
taxes de l'année précédente.

**Taux :** Le taux de la taxe est fixé à 0,1 %.

Cas particulier : Si une entreprise réalise des investissements sportifs
(éligibles à l'exonération) mais que leur montant est inférieur au
montant théorique de la taxe, elle reste redevable du solde.`,
      },
      {
        titre: `Modalités de Paiement et Déductibilité`,
        contenu: `Paiement : La taxe est acquittée selon les mêmes conditions et délais
que l'Impôt sur les Sociétés (IS) ou l'Impôt sur les Bénéfices
d'Affaires (IBA), c'est-à-dire par le système des acomptes trimestriels.

Traitement comptable : Cette taxe est expressément déductible de
l'assiette de l'impôt sur les bénéfices (IS ou IBA).`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 18 — La Taxe d'Enlèvement des Ordures Ménagères (TEOM)
  // ────────────────────────────────────────────────────────────
  TEOM: {
    titre: `La Taxe d'Enlèvement des Ordures Ménagères (TEOM)`,
    livre: `Livre 1 : Les Impôts Directs (IS, IBA, IRCM, IRF, ITS, TFU, etc.)`,
    chapitre_numero: 18,
    articles_cgi: `221-222`,
    sections: [
      {
        titre: `Introduction et Institution`,
        contenu: `**Définition :** La TEOM est une taxe instituée pour couvrir les charges
d'enlèvement et de traitement des déchets ménagers.

Base légale : Articles 221 et 222 du CGI 2026.`,
      },
      {
        titre: `Champ d'application et Redevables`,
        contenu: `Personnes visées : La taxe est due par les occupants des immeubles et
propriétés.

Lien avec la Taxe Foncière : Elle concerne les propriétés :

Soumises à la Taxe Foncière Unique (TFU).

Ou expressément exonérées de la TFU en application de l'article 153 du
Code (immeubles de l'État, des communes, lieux de culte, pépinières,
etc.).`,
      },
      {
        titre: `Paramètres d'application (Renvoi réglementaire)`,
        contenu: `Conformément à la loi, les points suivants ne sont pas fixés directement
par le Code, mais sont précisés par voie réglementaire (décrets ou
arrêtés) :

Le Tarif : Le montant ou le taux applicable.

Les Modalités de recouvrement : Comment et quand la taxe est collectée.

L'Affectation : La destination précise du produit de cette taxe.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 19 — La Taxe sur la Valeur Ajoutée (TVA)
  // ────────────────────────────────────────────────────────────
  TVA: {
    titre: `La Taxe sur la Valeur Ajoutée (TVA)`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 19,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Principes`,
        contenu: `**Définition :** La TVA est un impôt général sur la consommation qui
frappe les livraisons de biens et les prestations de services réalisées
au Bénin par des personnes indépendantes.

Neutralité : Pour l'entreprise, elle est neutre grâce au mécanisme de
déduction de la TVA payée sur les achats (TVA d'amont) de la TVA
collectée sur les ventes (TVA d'aval).

Charge finale : Elle est supportée par le consommateur final.`,
      },
      {
        titre: `Champ d'application -- Opérations imposables`,
        contenu: `Sont soumises à la TVA :

Les importations : Franchissement du cordon douanier pour mise à la
consommation.

Les livraisons de biens : Transfert du pouvoir de disposer d'un bien
(inclut eau, électricité, gaz, télécoms).

Les prestations de services : Locations, travaux immobiliers,
hôtellerie, transports, professions libérales, e-commerce.

Les livraisons à soi-même : Biens ou services prélevés pour les besoins
de l'entreprise ou des tiers.`,
      },
      {
        titre: `Les Assujettis (Redevables)`,
        contenu: `Critère d'activité : Personnes physiques ou morales réalisant des
opérations imposables de manière indépendante et à titre onéreux.

Critère de seuil : Seuls sont redevables ceux dont le chiffre d'affaires
annuel atteint le seuil fixé par arrêté ministériel.

Droit d'option : Les entreprises sous le seuil peuvent opter pour la TVA
si elles tiennent une comptabilité régulière (système normal).`,
      },
      {
        titre: `Exonérations (Principales catégories)`,
        contenu: `Sont notamment exonérés de TVA :

Produits médicaux : Iode, oxygène, médicaments, fauteuils roulants,
lunettes médicales.

Produits alimentaires de base : Pain, céréales locales (riz béninois,
maïs), tubercules, viande fraîche, lait non transformé.

Services sociaux : Enseignement, consultations médicales et soins
hospitaliers.

Éléments culturels : Journaux, périodiques et livres.

Logement : Locations d'immeubles nus à usage d'habitation.

Autres : Gaz domestique et dispositifs solaires (photovoltaïques).`,
      },
      {
        titre: `Territorialité`,
        contenu: `Livraisons de biens : Imposables au Bénin si le bien s'y trouve au
moment de la livraison ou du départ de l'expédition.

Prestations de services :

Matérielles : Imposables si exécutées au Bénin (ex : travaux,
hébergement).

Immatérielles : Imposables si le preneur (client) réside fiscalement au
Bénin (ex : publicité, conseil, brevets).`,
      },
      {
        titre: `Fait Générateur et Exigibilité`,
        contenu: `Fait générateur (événement qui crée la dette fiscale) :

Ventes : Livraison du bien.

Services et travaux : Accomplissement du service ou exécution des
travaux.

Exigibilité (moment où le Trésor peut réclamer la taxe) :

Ventes : Livraison.

Services et Marchés Publics : Encaissement du prix ou des acomptes.`,
      },
      {
        titre: `Base d'imposition (Assiette)`,
        contenu: `Composition : Le prix total, y compris les frais accessoires (transport,
emballage), les impôts et taxes (sauf TVA) et les compléments de prix.

Cas particuliers :

Importations : Valeur en douane + droits de douane + accises.

Agences de voyage : Imposition sur la marge (Prix client -- Prix
prestataires).`,
      },
      {
        titre: `Le Taux de la TVA`,
        contenu: `Taux de droit commun : 18%.

Taux zéro : Applicable exclusivement aux exportations de produits et de
marchandises (permet de déduire la TVA d'amont sans collecter d'aval).`,
      },
      {
        titre: `Régime des Déductions`,
        contenu: `Principe : La TVA ayant grevé les éléments du prix d'une opération
imposable est déductible.

Conditions :

Doit figurer sur une facture normalisée.

Bien/service nécessaire à l'exploitation.

Achat >= 100 000 FCFA payé par chèque, virement ou carte.

Exclusions : TVA non déductible sur les véhicules de tourisme, le
carburant (sauf industriels et transporteurs), les frais de réception et
de logement du personnel.`,
      },
      {
        titre: `Prorata et Régularisations`,
        contenu: `Prorata de déduction : Pour les entreprises réalisant des opérations
mixtes (imposables et exonérées), la TVA n'est déductible qu'à hauteur
d'un pourcentage (Chiffre d'affaires imposable / Chiffre d'affaires
total).

Régularisations : En cas de disparition de marchandise (sauf vol/casse
justifié) ou de cession d'immobilisation avant 5 ans, une partie de la
TVA initialement déduite doit être reversée.`,
      },
      {
        titre: `Remboursement des Crédits de TVA`,
        contenu: `Principe : Si les déductions sont supérieures à la taxe collectée,
l'excédent forme un crédit d'impôt imputable sur les mois suivants.

Remboursement possible pour : Les exportateurs (plus de 50% du CA), les
producteurs, en cas d'investissement > 40 millions FCFA TTC, ou en cas
de cessation d'activité.`,
      },
      {
        titre: `Obligations et Paiement`,
        contenu: `**Déclaration :** Mensuelle, au plus tard le 10 du mois suivant.

Paiement : Spontané lors de la déclaration.

Facturation : Obligation de délivrer une facture normalisée (via machine
MECeF) mentionnant distinctement la TVA.`,
      },
      {
        titre: `La Retenue à la source de TVA`,
        contenu: `Cible : Opérations avec l'État, les collectivités locales et les
organismes publics.

Taux de retenue :

100% pour les fournisseurs non-assujettis.

40% pour les autres redevables.

Déduction : Le montant retenu par le service public est mentionné comme
déduction sur la déclaration mensuelle de l'entreprise.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 20 — La Taxe sur les Activités Financières et Assurances (TAFA)
  // ────────────────────────────────────────────────────────────
  TAFA: {
    titre: `La Taxe sur les Activités Financières et Assurances (TAFA)`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 20,
    articles_cgi: `264-271`,
    sections: [
      {
        titre: `Introduction et Définition`,
        contenu: `**Définition :** La TAFA est un impôt indirect qui frappe les opérations
réalisées par les banques, les établissements financiers et les
compagnies d'assurances.

Nature : Elle s'applique aux rémunérations perçues sur les opérations
financières et sur les contrats d'assurance.`,
      },
      {
        titre: `Champ d'application -- Secteur Bancaire`,
        contenu: `Sont imposables les opérations et rémunérations suivantes :

Activités bancaires : Négociation, transfert et nantissement de titres,
ingénierie financière, conseil en placement.

Commissions : Tenue de compte, encaissement d'effets, opérations sur
valeurs mobilières, profits de change.

Intérêts sur crédits : Prêts aux entreprises, financement du commerce
extérieur, crédits immobiliers et aux particuliers.

Transferts : Transferts bancaires de fonds (hors transferts rapides de
type Western Union/MoneyGram).`,
      },
      {
        titre: `Champ d'application -- Assurances`,
        contenu: `Contrats visés : La taxe s'applique à tous les contrats d'assurance.

Critère de territorialité : Le contrat est taxable si le risque est
situé au Bénin ou se rapporte à un établissement béninois.

Présomption de situation : À défaut de localisation certaine, le risque
est réputé situé au domicile ou au siège du souscripteur.`,
      },
      {
        titre: `Principales Exonérations`,
        contenu: `Sont affranchis de la TAFA :

Les opérations de la BCEAO.

Les prêts et crédits consentis au Trésor Public et aux collectivités
locales.

Les opérations entre banques et établissements financiers (marché
interbancaire).

Les contrats d'assurance-vie et maladie.

Les opérations de crédit-bail et les transferts rapides d'argent, car
ils sont déjà soumis à la TVA.

Les opérations de collecte de l'épargne des Systèmes Financiers
Décentralisés (SFD).`,
      },
      {
        titre: `Fait Générateur et Exigibilité`,
        contenu: `La taxe devient due au moment de :

1\\. L'inscription des intérêts au crédit du compte du bénéficiaire pour
les prêts et avances.

2\\. L'accomplissement de la prestation pour les services financiers.

3\\. Le paiement de la prime pour les contrats d'assurance.`,
      },
      {
        titre: `Base d'imposition (Assiette)`,
        contenu: `Banques : Le montant brut hors taxe des intérêts, commissions et autres
rémunérations perçues.

Assurances : Le montant des sommes stipulées au profit de l'assureur
(primes) et de tous les accessoires à la charge de l'assuré.`,
      },
      {
        titre: `Taux de la TAFA`,
        contenu: `Le taux est différencié selon la nature de l'assurance ou de
l'opération :

20% pour les assurances contre l'incendie.

5% pour les assurances de transport.

10% pour tous les autres cas (opérations bancaires et autres
assurances).`,
      },
      {
        titre: `Déclaration, Paiement et Restitution`,
        contenu: `Règles de gestion : Les modalités de déclaration, de contrôle et les
sanctions sont identiques à celles de la TVA.

**Redevables :** Chaque établissement ou succursale d'une société
d'assurance est considéré comme un redevable distinct.

Restitution : En matière d'assurance, la taxe peut être restituée en cas
de résiliation ou d'annulation judiciaire du contrat.

Prescription : L'action en restitution se prescrit par un an après la
décision judiciaire définitive (et max 5 ans après paiement).

Ce module est basé sur l'article 272 du Code.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 21 — La Taxe sur les Jeux de Hasard
  // ────────────────────────────────────────────────────────────
  TAXE_SUR_LES_JEUX_DE_HASARD: {
    titre: `La Taxe sur les Jeux de Hasard`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 21,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `Institution : Les jeux de hasard sont soumis à une taxe spécifique
dénommée « taxe sur les jeux de hasard ».

Cible : Elle frappe les activités de jeux proposées au public, qu'elles
soient physiques (billetterie) ou dématérialisées (en ligne).

Redevable : La taxe est collectée et reversée par l'entreprise qui
organise les jeux.`,
      },
      {
        titre: `Assiette de la Taxe (Régime Général)`,
        contenu: `Base d'imposition : Pour les jeux classiques, la taxe est assise sur le
prix de vente des tickets ou billets mis à la disposition du public.

**Taux :** Le taux applicable est de 10 %.`,
      },
      {
        titre: `Régime Spécifique (Jeux en ligne et Casinos)`,
        contenu: `Base d'imposition : Pour les jeux en ligne et les casinos, la taxe est
assise sur le produit brut des jeux.

Définition du produit brut : Il s'agit de la différence entre le montant
total des sommes misées par les joueurs et les gains/bonus qu'ils
reçoivent.

Taux différenciés :

25 % pour les jeux en ligne.

15 % pour les casinos.`,
      },
      {
        titre: `Obligations et Procédures`,
        contenu: `Alignement sur la TVA : Les modalités de déclaration, de contrôle et de
recouvrement, ainsi que les obligations et sanctions, sont identiques à
celles prévues en matière de TVA.

Paiement : Versement spontané selon la périodicité mensuelle habituelle
des impôts indirects.

Ce module est basé sur l'article 273 du Code.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 22 — Contribution sur la vente de services de communications électroniques
  // ────────────────────────────────────────────────────────────
  CONTRIBUTION_SUR_LA_VENTE_DE_SERVICES_DE: {
    titre: `Contribution sur la vente de services de communications électroniques`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 22,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `Nature : Institution d'une contribution spécifique sur les services de
communications.

Services visés : Vente de services de communications électroniques sur
les réseaux ouverts au public, que la vente soit effectuée à titre
onéreux ou à titre gratuit.`,
      },
      {
        titre: `Opérations assimilées (Transferts et Retraits)`,
        contenu: `Sont également passibles de cette contribution :

Transferts d'argent : Réalisés par tout moyen technique laissant trace
(électronique, téléphonie mobile, télégraphique, télex ou télécopie).

Exceptions : Sont exclus les virements bancaires et les transferts
destinés au règlement des impôts, droits et taxes.

Retraits en numéraire : Consécutifs à un transfert d'argent effectué
auprès d'établissements financiers, d'entreprises de téléphonie ou
d'entités spécialisées.`,
      },
      {
        titre: `Base d'imposition (Assiette)`,
        contenu: `Principe : La base est constituée par le prix de vente hors taxe (HT) du
service.

Lien avec la TVA : Cette contribution n'entre pas dans la base
d'imposition de la taxe sur la valeur ajoutée.

Bases minimales : Pour les transferts et retraits, la base imposable ne
peut être inférieure à des montants fixes, même si le service est rendu
gratuitement.`,
      },
      {
        titre: `Barème des bases minimales (Exemples)`,
        contenu: `Le Code fixe des planchers pour le calcul (extraits) :

Retraits : De 400 FCFA (retrait ≤ 50 000) à 10 000 FCFA (retrait >
1 000 000).

Transferts nationaux : De 100 FCFA (transfert ≤ 500 000) à 500 FCFA
(transfert > 1 500 000).

Transferts hors du Bénin : De 500 FCFA (transfert ≤ 50 000) à 12 500
FCFA (transfert > 1 000 000).`,
      },
      {
        titre: `Taux et Modalités de Perception`,
        contenu: `**Taux :** Le taux de la contribution est fixé à 5 % du prix de vente HT
du service.

Redevable : La contribution est collectée et reversée à l'État par
l'opérateur ou le fournisseur ayant délivré le service.`,
      },
      {
        titre: `Obligations et Procédures`,
        contenu: `-   Alignement sur la TVA : Pour tout ce qui concerne la déclaration, le
    contrôle, le recouvrement, ainsi que les obligations et sanctions,
    les règles applicables sont identiques à celles prévues en matière
    de TVA.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 23 — La Taxe sur les Produits Spécifiques
  // ────────────────────────────────────────────────────────────
  TAXE_SUR_LES_PRODUITS_SPECIFIQUES: {
    titre: `La Taxe sur les Produits Spécifiques`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 23,
    articles_cgi: `274-280`,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `**Définition :** Taxe applicable sur certains produits, qu'ils soient
importés ou fabriqués au Bénin et livrés à la consommation intérieure.

Opérations visées :

Toutes importations ou cessions des produits listés, à titre onéreux ou
gratuit.

Les prélèvements effectués par le producteur pour ses propres besoins
sont assimilés à des cessions.`,
      },
      {
        titre: `Fait Générateur`,
        contenu: `La taxe est due au moment de :

1\\. L'importation : lors de la mise à la consommation au sens douanier.

2\\. La production locale : lors de la première cession des produits.`,
      },
      {
        titre: `Base d'imposition (Assiette)`,
        contenu: `À l'importation : Valeur en douane augmentée de tous les droits et taxes
perçus à l'entrée (sauf la TVA).

En régime intérieur : Prix de vente sortie-usine (hors TVA).

Cas de dépendance : Si le vendeur et l'acheteur sont liés, la taxe est
assise sur le prix de vente pratiqué par l'acheteur.

Exclusion : Les sommes perçues pour la consignation d'emballages
récupérables sont exclues de la base.`,
      },
      {
        titre: `Tarification -- Tabacs et Boissons`,
        contenu: `Les taux sont fixés comme suit :

Tabacs : Cigarettes, cigares, cigarillos et tabac à fumer : 40 %.

Boissons alcoolisées : 15 %.

Boissons énergisantes (non alcoolisées) : 20 %.

Eaux minérales et jus de fruits importés : 20 %.

Autres boissons non alcoolisées : 7 % (sauf eau non gazéifiée).`,
      },
      {
        titre: `Tarification -- Produits Alimentaires`,
        contenu: `Farine de blé : 1 %.

Pâtes alimentaires importées : 5 %.

Huiles et corps gras alimentaires : 1 %.

Bouillons et préparations pour soupes : 10 %.

Café et Thé : 10 %.`,
      },
      {
        titre: `Tarification -- Autres Produits de Consommation`,
        contenu: `Parfumerie et cosmétiques : 15 %.

Sachets en matière plastique : 5 %.

Marbre, lingots d'or et pierres précieuses : 10 %.`,
      },
      {
        titre: `Affectation Spécifique (Tabacs)`,
        contenu: `Le produit de la taxe perçu sur les tabacs et cigarettes est réparti
ainsi :

80 % pour le Trésor Public.

20 % pour la promotion du sport.`,
      },
      {
        titre: `Déclaration et Paiement`,
        contenu: `Au cordon douanier : Perçue par la Douane pour le compte de la Direction
Générale des Impôts.

À l'intérieur : Collectée et reversée par le producteur.

Procédures : Les modalités de déclaration, de recouvrement et les
sanctions sont identiques à celles prévues pour la TVA.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 24 — La Taxe Spécifique Unique sur les Produits Pétroliers (TSUPP)
  // ────────────────────────────────────────────────────────────
  TSUPP: {
    titre: `La Taxe Spécifique Unique sur les Produits Pétroliers (TSUPP)`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 24,
    articles_cgi: `281-284`,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `**Définition :** Il s'agit d'une taxe unique frappant les produits
pétroliers mis à la consommation au Bénin.

Opérations visées :

1\\. Les importations de produits pétroliers.

2\\. La première cession de produits pétroliers par les raffineries
installées au Bénin.

3\\. Les prélèvements effectués par les raffineries pour leurs besoins
propres.`,
      },
      {
        titre: `Fait Générateur`,
        contenu: `Principe : La taxe devient due lors de la réalisation de l'un des
événements suivants :

Le franchissement du cordon douanier (importation).

La livraison (cession locale).

Le prélèvement (autoconsommation par la raffinerie).`,
      },
      {
        titre: `Base d'imposition (Assiette)`,
        contenu: `Méthode de calcul : Contrairement à d'autres taxes ad valorem, la TSUPP
est une taxe spécifique.

Unité de mesure : Elle est déterminée en fonction du nombre de litres ou
du nombre de kilogrammes de produits cédés ou prélevés.`,
      },
      {
        titre: `Tarification (Extraits du Barème)`,
        contenu: `Les tarifs fixes par unité sont les suivants :

Super carburant : 65 FCFA / litre.

Essence ordinaire : 55 FCFA / litre.

Gas-oil : 20 FCFA / litre.

Lubrifiants (huiles) : 17 FCFA / litre.

Graisses : 23 FCFA / kg.

Produits à taux zéro (0 FCFA) : Pétrole lampant, Fuel-oil et Gaz butane.

Note : Le gouvernement peut modifier ces tarifs par voie réglementaire
selon les cours mondiaux.`,
      },
      {
        titre: `Déclaration et Paiement`,
        contenu: `À l'importation : La taxe est perçue par la Direction Générale des
Douanes lors de la mise à la consommation, pour le compte de la DGI.

En régime intérieur : Elle est collectée et reversée directement par le
producteur (raffinerie).

Procédures : Les modalités de déclaration, de recouvrement et les
sanctions sont identiques à celles prévues pour la TVA.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 25 — La Taxe sur les Véhicules de Tourisme
  // ────────────────────────────────────────────────────────────
  TAXE_SUR_LES_VEHICULES_DE_TOURISME: {
    titre: `La Taxe sur les Véhicules de Tourisme`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 25,
    articles_cgi: `285-290`,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `Institution : Il est instauré une taxe spécifique sur les véhicules de
tourisme de forte puissance.

Véhicules visés : La taxe s'applique aux véhicules dont la puissance est
égale ou supérieure à 13 chevaux (CV).

Opérations imposables :

1\\. Les importations de ces véhicules.

2\\. La première cession (vente) de véhicules de cette catégorie produits
au Bénin, qu'elle soit à titre onéreux ou gratuit.

3\\. Les prélèvements effectués par l'importateur pour ses besoins
propres (autoconsommation).`,
      },
      {
        titre: `Exonérations`,
        contenu: `Sont expressément exemptés de cette taxe les véhicules imposables acquis
par :

Les missions diplomatiques et consulaires.

Les organisations internationales.`,
      },
      {
        titre: `Fait Générateur`,
        contenu: `La taxe est due au moment de :

1\\. L'importation : lors de la mise à la consommation au sens douanier
du terme.

2\\. La production locale : lors de la première cession réalisée aux
conditions de livraison au Bénin.`,
      },
      {
        titre: `Base d'imposition (Assiette)`,
        contenu: `À l'importation : La base est la valeur en douane augmentée des droits
et taxes perçus à l'entrée, à l'exclusion de la TVA.

En régime intérieur : La base est le prix de vente sortie-usine, hors
TVA.

Cas de dépendance : Si le vendeur et l'acheteur sont liés, la taxe est
assise sur le prix de vente pratiqué par l'acheteur final.`,
      },
      {
        titre: `Taux et Paiement`,
        contenu: `Taux de la taxe : Il est fixé à 10 % de la base d'imposition.

Modalités de perception :

Au cordon douanier : La taxe est perçue par la Douane pour le compte de
la DGI.

À l'intérieur : Elle est collectée et reversée par le producteur.

Procédures : Les règles de déclaration, de recouvrement et les sanctions
sont identiques à celles prévues pour la TVA.

Nous abordons le Titre 3 du Livre 2 du Code Général des Impôts 2026,
intitulé « Autres Impôts Indirects ». Ce titre regroupe diverses taxes
spécifiques, souvent perçues au profit des collectivités locales ou pour
des objectifs de développement précis.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 26 — La Taxe de Séjour
  // ────────────────────────────────────────────────────────────
  TAXE_DE_SEJOUR: {
    titre: `La Taxe de Séjour`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 26,
    articles_cgi: `291-295`,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `**Définition :** Taxe due par toute personne séjournant dans un
établissement d'hébergement au Bénin.

Établissements visés :

Hôtels.

Établissements assimilés.

Résidences meublées.

Condition : La taxe est due quelle que soit la durée du séjour.`,
      },
      {
        titre: `Tarification`,
        contenu: `Le montant est fixé par jour ou par nuitée, selon le prix de la chambre
pratiqué par l'établissement :

Prix ≤ 20 000 FCFA : 500 FCFA.

Prix entre 20 001 et 100 000 FCFA : 1 500 FCFA.

Prix > 100 000 FCFA : 2 500 FCFA.`,
      },
      {
        titre: `Collecte et Facturation`,
        contenu: `Collecteur : La taxe est collectée par l'hôtelier ou le gestionnaire de
la résidence meublée.

Modalité : Elle doit être obligatoirement incorporée à la facture remise
au client.

Lien avec la TVA : La taxe de séjour n'entre pas dans la base
d'imposition de la TVA.`,
      },
      {
        titre: `Obligations des Hôteliers (Tenue de documents)`,
        contenu: `Les établissements sont tenus de tenir les documents suivants :

1\\. Le registre de police (obligatoire pour la sécurité).

2\\. La main courante ou le tableau d'occupation des chambres.

3\\. Le brouillard journalier et mensuel de caisse et de banque.

Note : Si la gestion est informatisée, le système doit être homologué et
garantir l'accès permanent aux données pour l'administration.`,
      },
      {
        titre: `Déclaration et Sanctions`,
        contenu: `Procédures : Les modalités de déclaration, de contrôle et de
recouvrement sont identiques à celles de la TVA.

Sanctions : Le non-respect des obligations déclaratives ou de
reversement entraîne les mêmes pénalités que celles prévues en matière
de taxes sur le chiffre d'affaires.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 27 — La Contribution au Développement Local (CDL)
  // ────────────────────────────────────────────────────────────
  CDL: {
    titre: `La Contribution au Développement Local (CDL)`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 27,
    articles_cgi: `296-303`,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `**Définition :** Taxe frappant les ressources naturelles et les produits
issus de l'exploitation locale.

Produits visés : Produits agricoles, forestiers, animaux, halieutiques,
miniers, ainsi que les eaux (surface et souterraine) et les recettes des
sites touristiques.

Assujettis : Producteurs de coton, acheteurs grossistes (noix
d'anacarde, vivriers, volaille, charbon), exploitants forestiers et
miniers, éleveurs en transhumance, exploitants de parcs ou musées, et
producteurs d'eau minérale.`,
      },
      {
        titre: `Mécanisme de Collecte et Fait Générateur`,
        contenu: `Mode de collecte : Les assujettis doivent obligatoirement incorporer la
contribution à leurs prix et la collecter sur leurs clients.

Fait générateur :

La vente : pour le coton, les produits vivriers, le bétail, les produits
halieutiques et l'eau minérale.

La traversée du territoire : pour les troupeaux en transhumance.

Le transport : pour les noix d'anacarde, les produits miniers
(carrières) et forestiers (bois).

L'encaissement : pour les recettes des sites touristiques.

Le prélèvement : pour l'eau de surface.`,
      },
      {
        titre: `Tarification (Extraits du barème)`,
        contenu: `Les tarifs sont fixés annuellement par délibération des élus locaux dans
les limites suivantes :

Riz : 1 à 2 FCFA par kg.

Coton, céréales et anacarde : 1 à 5 FCFA par kg.

Bétail : De 100 FCFA (porc, petit ruminant) à 1 000 FCFA (gros ruminant)
par tête.

Bois : 500 à 2 000 FCFA par bille ou madrier transporté.

Tourisme : 5 % à 10 % des recettes brutes.

Eau : 1 à 5 FCFA par litre (minérale) ou 10 à 20 FCFA par m³ (eau
prélevée).`,
      },
      {
        titre: `Déclaration, Paiement et Territorialité`,
        contenu: `Procédures : Les règles de déclaration, de contrôle et de recouvrement
sont identiques à celles de la TVA.

Lieu de perception : La taxe est perçue une seule fois par la commune
dans le ressort de laquelle est située la matière taxée.

Responsabilité : Les clients des assujettis sont solidairement
responsables du paiement de la contribution.`,
      },
      {
        titre: `Lutte contre la fraude et Retenue à la source`,
        contenu: `Appréhension des fraudeurs : Tout assujetti n'ayant pas payé la CDL dans
sa commune peut être imposé par n'importe quelle autre commune ; la taxe
est alors reversée à la commune compétente.

Retenue à la source : Le Code prévoit que la CDL peut faire l'objet
d'une retenue à la source dans des conditions fixées par voie
réglementaire.

Ce module est basé sur l'article 304 du Code.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 28 — Le Prélèvement Forfaitaire sur les Véhicules d'Occasion
  // ────────────────────────────────────────────────────────────
  PRELEVEMENT_FORFAITAIRE_SUR_LES_VEHICULES_D: {
    titre: `Le Prélèvement Forfaitaire sur les Véhicules d'Occasion`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 28,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Nature du prélèvement`,
        contenu: `Institution : Il est instauré un prélèvement forfaitaire spécial sur
l'importation de véhicules d'occasion.

Objectif : Ce prélèvement s'ajoute aux autres droits et taxes exigibles
à l'importation.`,
      },
      {
        titre: `Champ d'application (Véhicules visés)`,
        contenu: `Définition du « véhicule d'occasion » : Au sens de la loi fiscale, il
s'agit des véhicules ayant reçu une première immatriculation
préalablement à leur importation en République du Bénin.

Cible : Tout véhicule d'occasion importé sur le territoire national.`,
      },
      {
        titre: `Montant et Fait Générateur`,
        contenu: `Montant unique : Le prélèvement est fixé forfaitairement à cinquante
mille (50 000) francs CFA par véhicule.

Fait générateur : La taxe est due au moment du débarquement (voie
maritime) ou du franchissement des frontières terrestres.`,
      },
      {
        titre: `Modalités de Recouvrement`,
        contenu: `Organisme percepteur : Le prélèvement est perçu au cordon douanier par
la Direction Générale des Douanes.

Bénéficiaire : Les fonds sont collectés pour le compte de la Direction
Générale des Impôts.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 29 — La Taxe de Pacage
  // ────────────────────────────────────────────────────────────
  TAXE_DE_PACAGE: {
    titre: `La Taxe de Pacage`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 29,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Institution`,
        contenu: `Nature de la taxe : Il s'agit d'une taxe que les communes peuvent
instituer par délibération de leur conseil.

Objet : Elle est établie par animal venant pâturer sur le territoire de
la République du Bénin.

Redevable : La taxe est établie au nom du possesseur des animaux.`,
      },
      {
        titre: `Tarification`,
        contenu: `Montant : Le tarif est fixé dans une fourchette allant de cent (100) à
cinq cents (500) francs CFA.

Périodicité : Le tarif s'applique par animal et par an.`,
      },
      {
        titre: `Modalités de Paiement et Justificatifs`,
        contenu: `Paiement : La taxe est acquittée entre les mains du receveur des impôts.

Preuve de paiement (Récépissé) : Un récépissé est délivré indiquant :

Au recto : le montant total versé.

Au verso : le nombre et la nature des animaux ainsi que le droit
appliqué par espèce.

Cas particulier : Si la perception a lieu hors du chef-lieu par un
préposé habilité, il est délivré un laissez-passer extrait d'un registre
à souches.`,
      },
      {
        titre: `Validité et Sanctions`,
        contenu: `Durée de validité : Le récépissé ou le laissez-passer est valable pour
la période de pacage comprise dans l'année de délivrance.

Sanction pour fraude : En cas de fraude constatée par procès-verbal, les
contrevenants sont astreints au paiement d'une taxe supplémentaire égale
au double des droits fraudés (soit une majoration de 100 %).

Ce module est basé sur l'article 307 du Code.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 30 — La Taxe sur les Spectacles, Jeux et Divertissements
  // ────────────────────────────────────────────────────────────
  TAXE_SUR_LES_SPECTACLES_JEUX_ET: {
    titre: `La Taxe sur les Spectacles, Jeux et Divertissements`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 30,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Institution`,
        contenu: `Nature de la taxe : Il s'agit d'une taxe facultative que chaque commune
peut choisir d'instituer par délibération de son conseil.

Cible : Elle s'applique aux spectacles, jeux et divertissements réalisés
dans des établissements ou par des personnes qui ne sont pas déjà
assujettis à :

La Taxe sur la Valeur Ajoutée (TVA).

La Taxe sur les Jeux de Hasard.`,
      },
      {
        titre: `Champ d'application (Événements et Activités)`,
        contenu: `La taxe frappe une large gamme d'activités, notamment :

Les dancings et établissements de nuit.

Les attractions, jeux d'adresse divers et spectacles forains.

Les appareils automatiques placés dans les lieux publics.

Autorisations spécifiques : bals, réjouissances collectives, et même
l'autorisation de battre le tam-tam lors de cérémonies (familiales,
coutumières ou religieuses).`,
      },
      {
        titre: `Tarification`,
        contenu: `**Taux :** Le tarif est fixé par la commune dans une fourchette allant
de 1 % à 5 % des recettes.

Modes d'application : La taxe peut être assise :

Par établissement.

Par appareil exploité.

Par jour de manifestation.`,
      },
      {
        titre: `Modalités de Paiement`,
        contenu: `Les délais de paiement varient selon la nature de l'activité :

1\\. Établissements stables : Paiement mensuel au plus tard le 10 du mois
suivant.

3\\. Montant fixe (Délivrance d'autorisation) : Paiement obligatoire
avant la délivrance de l'autorisation si la taxe n'est pas calculée au
pourcentage sur les recettes.`,
      },
      {
        titre: `Sanctions pour retard ou fraude`,
        contenu: `En cas de défaut de paiement spontané, des pénalités sont appliquées sur
le montant de la taxe :

Pénalité de droit commun : 20 %.

En cas de mauvaise foi : 40 %.

En cas de manœuvres frauduleuses ou fausse **Déclaration :** 80 %.

Note : Le recouvrement est poursuivi via un ordre de recettes établi par
l'ordonnateur du budget communal.

Ce module est basé sur l'article 308 du Code.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 31 — Taxe sur la vente des boissons fermentées artisanales
  // ────────────────────────────────────────────────────────────
  TAXE_SUR_LA_VENTE_DES_BOISSONS_FERMENTEES: {
    titre: `Taxe sur la vente des boissons fermentées artisanales`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 31,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `Institution : Taxe facultative pouvant être instaurée par délibération
du conseil communal.

Personnes visées : Tout commerçant vendant des boissons fermentées de
préparation artisanale.

Lieux de vente : S'applique que la vente ait lieu dans des
établissements fixes ou sur les marchés.`,
      },
      {
        titre: `Tarification`,
        contenu: `Le tarif est fixé par la commune dans les limites suivantes :

Vente sur les marchés : entre 5 et 100 FCFA par jour.

Vente par contenant : entre 100 et 1 000 FCFA par bouteille
(calebasse/dame-jeanne) de 20 litres.

Vente par établissement : entre 1 500 et 6 000 FCFA par an et par
établissement.`,
      },
      {
        titre: `Modalités de Paiement`,
        contenu: `Périodicité : La taxe est due une seule fois pour l'année entière.

Échéance : Le paiement doit obligatoirement être effectué avant le 1er
avril de chaque année.`,
      },
      {
        titre: `Sanctions pour retard`,
        contenu: `En cas de non-paiement dans le délai prescrit, des pénalités sont
appliquées sur le montant de la taxe :

Pénalité de droit commun (bonne foi) : 20 %.

En cas de mauvaise foi : 40 %.

En cas de manœuvres frauduleuses : 80 %.`,
      },
      {
        titre: `La Carte Fiscale de Vendeur`,
        contenu: `Délivrance : Une carte fiscale de vendeur est remise par les autorités
administratives compétentes.

Valeur légale : Cette carte vaut autorisation de vendre et doit être
présentée à toute réquisition.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 32 — La Taxe sur la Publicité
  // ────────────────────────────────────────────────────────────
  TAXE_SUR_LA_PUBLICITE: {
    titre: `La Taxe sur la Publicité`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 32,
    articles_cgi: `309-315`,
    sections: [
      {
        titre: `Introduction et Institution`,
        contenu: `Nature : Taxe facultative instituée par délibération du conseil
communal.

Supports visés : Publicité réalisée par affiches (papier, peintes,
panneaux), enseignes lumineuses ou appareils sonores.`,
      },
      {
        titre: `Champ d'application`,
        contenu: `La taxe frappe les supports suivants dans les lieux publics :

1\\. Affiches sur papier ordinaire : Imprimées ou manuscrites, apposées
sur les murs ou tout lieu public.

2\\. Affiches peintes et panneaux-réclame : Tout support autre que le
papier (murs, constructions ou isolés).

3\\. Appareils sonores : Haut-parleurs ou électrophones, fixes ou montés
sur véhicules (sans préjudice des règlements d'ordre public).`,
      },
      {
        titre: `Exonérations`,
        contenu: `-   Bénéficiaires exclus : La publicité effectuée pour le compte de
    l'État, des établissements publics et des collectivités locales est
    exonérée.`,
      },
      {
        titre: `Tarification (Limites annuelles ou journalières)`,
        contenu: `Les tarifs sont fixés par la commune dans les fourchettes suivantes :

Affiche papier ordinaire : 750 à 3 000 FCFA / m² / an.

Affiche peinte : 3 000 à 18 000 FCFA / m² / an.

Panneau-réclame : 50 000 à 225 000 FCFA / panneau / an.

Panneau lumineux : 75 000 à 375 000 FCFA / panneau / an.

Appareil sonore : 5 000 à 50 000 FCFA / appareil / jour.

Note : Chaque face d'une affiche est considérée comme une affiche
distincte et taxée individuellement.`,
      },
      {
        titre: `Modalités de Déclaration et de Perception`,
        contenu: `Affiches papier : La taxe est perçue préalablement à l'affichage par
apposition de timbres mobiles.

Autres supports (peints, panneaux, sonores) :

Déclaration préalable obligatoire auprès du maire (précisant la nature,
le texte et l'identité du bénéficiaire).

Perception sur ordre de recettes émis par l'ordonnateur communal et
acquittée au receveur des impôts.`,
      },
      {
        titre: `Sanctions`,
        contenu: `Le défaut de déclaration pour les panneaux ou appareils sonores entraîne
une pénalité sur le montant dû :

Cas général : 20 %.

Mauvaise foi : 40 %.

Manœuvres frauduleuses : 80 %.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 33 — La Taxe sur la consommation d'électricité et d'eau
  // ────────────────────────────────────────────────────────────
  TAXE_SUR_LA_CONSOMMATION_D_ELECTRICITE_ET_D: {
    titre: `La Taxe sur la consommation d'électricité et d'eau`,
    livre: `Livre 2 : Les Impôts Indirects (TVA, TAFA, Accises, etc.)`,
    chapitre_numero: 33,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Assiette`,
        contenu: `Institution : Une taxe est établie sur la consommation d'énergie
électrique et d'eau sur le territoire national.

Base de calcul : La taxe est perçue en fonction de la quantité réelle
consommée par l'usager (kWh pour l'électricité, m³ pour l'eau).`,
      },
      {
        titre: `Exonération spécifique`,
        contenu: `-   Éclairage public : Les abonnements souscrits pour l'éclairage des
    voies et places publiques sont expressément exonérés du paiement de
    cette taxe.`,
      },
      {
        titre: `Tarification de l'Électricité`,
        contenu: `Le tarif varie selon la tension et, pour la basse tension, selon la
localisation géographique :

1\\. Basse tension :

2 FCFA / kWh pour les départements de l'Atlantique, du Littoral, de
l'Ouémé, du Plateau, du Mono et du Couffo.

3 FCFA / kWh pour les départements du Zou, des Collines, du Borgou, de
l'Alibori, de l'Atacora et de la Donga.

2\\. Moyenne tension : 1 FCFA / kWh sur toute l'étendue du territoire
national.`,
      },
      {
        titre: `Tarification de l'Eau`,
        contenu: `-   Régime tarifaire : Contrairement à l'électricité dont les tarifs
    sont fixés par le Code, le tarif applicable à la consommation d'eau
    est fixé par voie réglementaire.`,
      },
      {
        titre: `Recouvrement et Reversement`,
        contenu: `Organisme collecteur : La taxe est recouvrée par les sociétés
distributrices d'électricité et d'eau (SBEE, SONEB).

Modalité : Elle est prélevée directement sur la facture de l'usager,
sans frais de recouvrement pour l'État.

Échéance de **Reversement :** Les sociétés doivent reverser les sommes
collectées au receveur des impôts dans les dix (10) premiers jours du
mois suivant chaque trimestre.`,
      },
      {
        titre: `Affectation du produit`,
        contenu: `Le produit de la taxe est réparti équitablement pour soutenir les
budgets publics :

50 % affectés au budget de l'État.

50 % affectés au budget de la collectivité locale (commune).`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 34 — Les Droits d'Enregistrement -- Principes et Champ d'application
  // ────────────────────────────────────────────────────────────
  DROITS_D_ENREGISTREMENT: {
    titre: `Les Droits d'Enregistrement -- Principes et Champ d'application`,
    livre: `Livre 3 : Les formalités fiscales liées à la rédaction d'actes juridiques et à la certification de documents (Enregistrement et le Timbre)`,
    chapitre_numero: 34,
    articles_cgi: null,
    sections: [
      {
        titre: `Introduction et Définition`,
        contenu: `**Définition :** L'enregistrement est une formalité fiscale consistant
en l'analyse ou la mention d'un acte sur un registre public.

Nature : Elle donne lieu au paiement d'un droit perçu au profit du
budget de l'État.

Effet : Elle confère une date certaine aux actes sous seing privé et
assure la conservation des actes.`,
      },
      {
        titre: `Champ d'application -- Actes obligatoires (1/2)`,
        contenu: `Sont obligatoirement soumis à l'enregistrement :

Les mutations de propriété d'immeubles ou de droits réels immobiliers.

Les ventes publiques de meubles.

Les cessions de droit au bail, de fonds de commerce ou de clientèle.

Les cessions d'actions, de parts sociales, d'obligations ou de créances
négociables.`,
      },
      {
        titre: `Champ d'application -- Actes obligatoires (2/2)`,
        contenu: `Sont également visés :

Les actes de sociétés (constitution, prorogation, augmentation de
capital).

Les partages de sociétés, d'indivisions ou de communautés.

Les baux d'immeubles (y compris crédit-bail immobilier) et de meubles.

Les marchés et commandes publics (fournitures, travaux, services).

Les mutations à titre gratuit (donations et successions).

Les actes judiciaires (jugements et arrêts).`,
      },
      {
        titre: `Enregistrement volontaire et « Gratis »`,
        contenu: `Enregistrement « Gratis » : Certains actes, bien qu'exonérés du paiement
des droits par la loi ou des conventions internationales, restent soumis
à la formalité et sont enregistrés sans frais (mention « gratis »).

Principe d'ordre public : En dehors des cas prévus par la loi, aucun
droit ne peut être modéré ou suspendu.`,
      },
      {
        titre: `Territorialité`,
        contenu: `Actes faits au Bénin : Tous les actes obligatoires passés ou utilisés au
Bénin doivent y être enregistrés.

Actes faits à l'étranger : Ils sont obligatoirement soumis à
l'enregistrement au Bénin s'ils portent sur :

1\\. Des immeubles, fonds de commerce ou baux situés au Bénin.

2\\. Des titres de sociétés immatriculées au Bénin.`,
      },
      {
        titre: `Fait Générateur et Exigibilité`,
        contenu: `Les droits sont dus dès la survenance des événements suivants :

Cessions et mutations : Par le transfert de propriété, d'usufruit ou de
jouissance.

Marchés publics : Par la notification du marché.

Autres cas : Par la simple signature de l'acte.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 35 — Droits d'Enregistrement -- Principes Généraux d'Assiette
  // ────────────────────────────────────────────────────────────
  DROITS_D_ENREGISTREMENT_2: {
    titre: `Droits d'Enregistrement -- Principes Généraux d'Assiette`,
    livre: `Livre 3 : Les formalités fiscales liées à la rédaction d'actes juridiques et à la certification de documents (Enregistrement et le Timbre)`,
    chapitre_numero: 35,
    articles_cgi: `322-326`,
    sections: [
      {
        titre: `Base d'imposition et Droit de rectification`,
        contenu: `Principe de base : Les droits proportionnels sont assis sur la valeur
exprimée par les parties dans les actes et déclarations.

Pouvoir de l'administration : L'administration fiscale peut rectifier le
prix ou l'évaluation d'un bien si elle estime qu'ils sont inférieurs à
la valeur vénale réelle au jour de la transmission.

Désaccord : En cas de contestation sur les valeurs, la commission de
conciliation peut être saisie.`,
      },
      {
        titre: `Détermination de la valeur taxable`,
        contenu: `Substance sur la forme : La perception des droits est réglée d'après la
forme extérieure des actes ou la substance de leurs dispositions, sans
égard à leur validité ou aux causes de résolution ultérieures.

Omission de valeur : Si les sommes ne sont pas déterminées dans l'acte,
les parties doivent fournir une déclaration estimative détaillée avant
l'enregistrement.

Condition suspensive : Pour les conventions sous condition suspensive,
le tarif et la valeur sont déterminés à la date de réalisation de la
condition.`,
      },
      {
        titre: `Dispositions dépendantes ou indépendantes`,
        contenu: `Dispositions dépendantes (corrélées) : Lorsqu'un acte contient deux
dispositions liées, seule celle donnant lieu au taux le plus élevé sert
de base à la perception.

Dispositions indépendantes : Si l'acte contient plusieurs dispositions
ne dérivant pas l'une de l'autre, un droit particulier est dû pour
chacune d'elles selon son espèce.

Exception de cumul : Le droit fixe n'est pas perçu si l'acte contient
aussi des dispositions soumises au droit proportionnel (sauf si le droit
fixe est supérieur au montant proportionnel).`,
      },
      {
        titre: `Évaluation de l'Usufruit et de la Nue-propriété`,
        contenu: `La méthode d'évaluation varie selon la nature de la transaction :

1\\. Transmissions à titre onéreux : Basée sur le prix exprimé augmenté
des charges en capital.

2\\. Mutations à titre gratuit (Successions/Donations) : Évaluées selon
un barème basé sur l'âge de l'usufruitier au jour de la mutation.`,
      },
      {
        titre: `Barème légal pour les mutations à titre gratuit`,
        contenu: `Valeur proportionnelle par rapport à la pleine propriété :

Moins de 20 ans : Usufruit 7/10e \\| Nue-propriété 3/10e.

Moins de 40 ans : Usufruit 5/10e \\| Nue-propriété 5/10e.

Moins de 60 ans : Usufruit 3/10e \\| Nue-propriété 7/10e.

Plus de 70 ans : Usufruit 1/10e \\| Nue-propriété 9/10e.

Note : Pour un usufruit à durée fixe, il est estimé à 2/10e de la
pleine propriété pour chaque période de 10 ans.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 36 — Fixation des Droits d'Enregistrement
  // ────────────────────────────────────────────────────────────
  FIXATION_DES_DROITS_D_ENREGISTREMENT: {
    titre: `Fixation des Droits d'Enregistrement`,
    livre: `Livre 3 : Les formalités fiscales liées à la rédaction d'actes juridiques et à la certification de documents (Enregistrement et le Timbre)`,
    chapitre_numero: 36,
    articles_cgi: `327-354`,
    sections: [
      {
        titre: `Actes « Gratis » et Minimum de Perception`,
        contenu: `Enregistrement « Gratis » : Sont enregistrés sans frais les actes dont
les droits incombent à l'État, aux collectivités locales, aux
établissements publics et à la CNSS.

Minimum de perception : Pour tout acte ne bénéficiant pas de la
gratuité, le droit perçu ne peut être inférieur à 2 500 FCFA (même si le
calcul proportionnel donne un montant inférieur).

Actes présentés volontairement : Les actes exemptés de la formalité mais
présentés volontairement sont soumis au droit fixe de 2 500 FCFA.`,
      },
      {
        titre: `Mutations d'immeubles à titre onéreux`,
        contenu: `Taux de droit commun : 5 % sur le prix exprimé augmenté des charges
(ventes, adjudications, dations en paiement).

Cas des sociétés : Les mutations d'immeubles au nom de sociétés
commerciales sont gratis si la transaction est ≤ 50 millions FCFA (sous
condition de conservation du bien pendant 10 ans).

Échanges : Le taux est de 2 % sur la valeur d'une des parts (plus droit
de vente sur la soulte éventuelle).

Réméré : En cas de rachat sous 5 ans, le droit fixe est de 2 500 FCFA.`,
      },
      {
        titre: `Mutations de meubles (Fonds de commerce et Ventes)`,
        contenu: `Fonds de commerce : 5 % sur le prix de la clientèle, de l'achalandage et
du droit au bail.

Marchandises neuves : Exonérées si soumises à la TVA ; sinon, taxées à 2
% (si prix distinct stipulé).

Ventes publiques de meubles : 1 %.

Aéronefs et navires : Droit fixe de 5 000 FCFA (sauf yachts et bateaux
de plaisance entre particuliers : 1 %).`,
      },
      {
        titre: `Les Baux (Locations)`,
        contenu: `Baux à durée limitée (Immeubles) : 1 % sur le montant cumulé des loyers
et charges de la période.

Note : Le droit peut être fractionné par périodes triennales.

Baux à vie ou illimités : Taxés comme une mutation immobilière (5 %) sur
un capital de 10 ou 20 fois le prix annuel.

Crédit-bail immobilier : 1 % sur les loyers annuels.

Baux de meubles : 1 % (durée limitée) ou 5 % (durée illimitée). Exonérés
si soumis à la TVA.`,
      },
      {
        titre: `Partages, Rentes et Pensions`,
        contenu: `Partages : 0,5 % sur l'actif net partagé (les soultes sont taxées au
tarif des mutations).

Rentes et Pensions à titre onéreux : 1 % sur le capital constitué (ou 10
à 20 fois l'annuité).

Successions agricoles : Exonération de droits de soulte sous conditions
si la valeur est ≤ 20 millions FCFA.`,
      },
      {
        titre: `Marchés et Commandes Publics`,
        contenu: `Principe : Droits sur les bons de commande et marchés payés par l'État
ou les organismes publics.

**Taux :**

Tarif général : 1 %.

Marchés >= 20 milliards FCFA : 0,5 %.

Sous-traitance : Droit fixe de 10 000 FCFA si prévue au marché
principal.

Fractionnement : Le droit est fractionné d'office par périodes
(généralement triennales).`,
      },
      {
        titre: `Actes de Sociétés`,
        contenu: `Enregistrement « Gratis » : Actes de formation (sauf apports
d'immeubles/fonds de commerce), prorogation et augmentation de capital
des sociétés d'investissement.

Droit fixe de 10 000 FCFA :

Augmentations de capital.

Fusions, scissions et apports partiels d'actifs.

Cessions d'actions ou de parts sociales.

Dissolutions sans transmission de biens.`,
      },
      {
        titre: `Actes Judiciaires -- Droits Proportionnels`,
        contenu: `S'appliquent sur le montant des condamnations prononcées :

Tarif général : 5 %.

Matière sociale : 4 %.

Liquidation d'astreinte : 25 %.

Matière commerciale : Gratis si la condamnation est ≤ 5 millions FCFA.

Note : Les pensions alimentaires sont exonérées de droit proportionnel.`,
      },
      {
        titre: `Actes Judiciaires -- Droits Fixes`,
        contenu: `5 000 FCFA : Référés, ordonnances de nomination d'experts,
cautionnements.

15 000 FCFA : Jugements définitifs de première instance (sans droit
proportionnel), arrêts de Cour d'appel, Cour Suprême.

20 000 FCFA : Propriété foncière.

40 000 FCFA : Jugement de divorce (1ère instance).

70 000 FCFA : Arrêt de divorce (Appel).`,
      },
      {
        titre: `Actes Divers et Dispenses`,
        contenu: `Droit fixe de 2 500 FCFA : Certificats de propriété, inventaires,
testaments, acceptations de succession.

Gratis : Engagements directs ou par signature.

Exemptions de formalité :

Jugements d'état civil, droit du travail, accidents du travail.

Actes de procédure pénale (à la requête du ministère public).

Prêts de micro-crédit < 2 millions FCFA.

Contrats de mission d'enseignement dans les universités publiques.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 37 — Déclarations et Paiement des Droits d'Enregistrement
  // ────────────────────────────────────────────────────────────
  DECLARATIONS_ET_PAIEMENT_DES_DROITS_D: {
    titre: `Déclarations et Paiement des Droits d'Enregistrement`,
    livre: `Livre 3 : Les formalités fiscales liées à la rédaction d'actes juridiques et à la certification de documents (Enregistrement et le Timbre)`,
    chapitre_numero: 37,
    articles_cgi: `355-370`,
    sections: [
      {
        titre: `Délais pour enregistrer`,
        contenu: `Délai de principe : un mois à compter de la date de l'acte ou de la
notification du marché public.

Actes d'huissiers : 15 jours après leur signature.

Actes faits à l'étranger : 2 mois.

Testaments : 3 mois après le décès du testateur.

Mutations par décès (Successions) : 6 mois après le décès (porté à 1 an
si le décès a lieu hors du Bénin).

Absence d'acte : Pour les mutations ou baux verbaux, une déclaration
détaillée doit être faite dans le mois de l'entrée en possession.`,
      },
      {
        titre: `Service des Impôts compétent`,
        contenu: `Le lieu de l'enregistrement dépend de la nature de l'acte :

Règle générale : Au service dont dépend l'officier public (notaire,
greffier, huissier) qui a rédigé l'acte.

Immeubles et fonds de commerce : Obligatoirement au service de la
situation du bien.

Sociétés et Titres : Au service dont dépend le siège social de la
société.

Successions : Au service du domicile du défunt (quelle que soit la
situation des biens).

Actes étrangers : Peuvent être enregistrés dans n'importe quel service
des impôts au Bénin.`,
      },
      {
        titre: `Redevables des droits`,
        contenu: `Les personnes chargées d'acquitter les droits sont :

Les Officiers Publics : Notaires, huissiers et greffiers pour les actes
de leur ministère (ils peuvent ensuite en poursuivre le remboursement
auprès des parties).

Les nouveaux possesseurs : Pour les actes de transmission de propriété,
d'usufruit ou de jouissance.

Les héritiers, légataires et exécuteurs testamentaires : Pour les
successions.

Le donataire : Pour les donations entre vifs.

Solidarité : Les parties contractantes sont solidairement responsables
du paiement vis-à-vis du Trésor Public, sauf exceptions judiciaires.`,
      },
      {
        titre: `Modalités de Paiement et Mentions Électroniques`,
        contenu: `Principe : Les droits sont payés intégralement et préalablement à
l'enregistrement.

Contestation : Le paiement ne peut être différé sous prétexte de
désaccord sur le montant (sauf recours en restitution ultérieur).

Enregistrement électronique : La mention d'enregistrement peut être
octroyée de façon dématérialisée, produisant les mêmes effets juridiques
que sur support papier.

Exception de l'État : Si l'État est partie à l'acte, le Ministre peut
autoriser un paiement différé.`,
      },
      {
        titre: `Fractionnement des droits (Baux et Marchés)`,
        contenu: `Le Code autorise le paiement échelonné dans certains cas spécifiques :

Baux d'immeubles : Le droit proportionnel (1 %) peut être fractionné par
périodes triennales ou par périodes contractuelles.

Marchés Publics : Le fractionnement est automatique (généralement par
périodes de trois ans).

Règle : Seul le droit de la première période est payé lors de
l'enregistrement ; les suivants sont dus au début de chaque nouvelle
période.`,
      },
      {
        titre: `Cas particulier : Logements d'habitation`,
        contenu: `Cible : Vente d'un immeuble bâti dont au moins les 3/4 de la superficie
sont destinés à l'habitation.

Avantage : Le paiement du droit de mutation peut être divisé en 6
fractions égales sur une période maximale de 5 ans et 3 mois.

Garantie : Ce bénéfice impose la constitution d'une hypothèque au profit
de l'administration sur l'immeuble concerné.`,
      },
      {
        titre: `Restitution des droits`,
        contenu: `Principe d'irrépétibilité : Les droits régulièrement perçus ne sont pas
restituables, même si le contrat est ensuite résolu ou révoqué par les
parties.

Exceptions : La restitution est possible si l'annulation est prononcée
par un jugement définitif pour cause de lésion ou de vices cachés.

Cas d'État : Les droits sont remboursés en cas de résiliation
unilatérale du contrat par l'État.

Ce module détaille les responsabilités des notaires, huissiers,
greffiers et commissaires-priseurs, basées sur les articles 371 à 382.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 38 — Obligations des Officiers Publics et Ministériels
  // ────────────────────────────────────────────────────────────
  OBLIGATIONS_DES_OFFICIERS_PUBLICS_ET: {
    titre: `Obligations des Officiers Publics et Ministériels`,
    livre: `Livre 3 : Les formalités fiscales liées à la rédaction d'actes juridiques et à la certification de documents (Enregistrement et le Timbre)`,
    chapitre_numero: 38,
    articles_cgi: `371-382`,
    sections: [
      {
        titre: `Interdictions de rédaction et Exceptions`,
        contenu: `Principe de blocage : Les officiers publics et autorités administratives
ne peuvent rédiger un acte, l'annexer ou en délivrer copie si l'acte
original obligatoire n'a pas été préalablement enregistré.

Exceptions pour les parquets : Les greffiers peuvent délivrer aux
parquets des expéditions d'actes de police ou correctionnels avant
enregistrement, à charge pour le parquet de régulariser la formalité
avant utilisation.

Exception notariale : Un notaire peut rédiger un acte basé sur un
document non encore enregistré s'il l'annexe, le soumet simultanément à
la formalité et accepte la responsabilité personnelle des droits et
amendes.

Exploits : L'interdiction ne s'applique pas aux exploits signifiés par
affiches et proclamations.`,
      },
      {
        titre: `Formalités de dépôt et Mentions obligatoires`,
        contenu: `Dépôt d'actes : Il est interdit aux notaires et greffiers de recevoir un
acte en dépôt sans dresser un acte de dépôt, sauf pour les testaments
remis par les testateurs.

Transcription de quittance : Toutes les expéditions d'actes publics
doivent reproduire littéralement la quittance des droits
d'enregistrement payés.

Mentions spécifiques : Les originaux d'actes publics faits en vertu
d'actes sous seing privé ou étrangers doivent également comporter cette
mention de quittance.

Baux : Tout acte de cession de bail ou de sous-bail doit reproduire la
mention d'enregistrement du bail initial.`,
      },
      {
        titre: `Décisions judiciaires et Accès aux registres`,
        contenu: `Condamnations : Tout jugement rendu sur un acte enregistré doit
mentionner le montant des droits payés, la date et le service de
perception.

Omission : Si l'enregistrement n'est pas mentionné, l'inspecteur exige
le paiement immédiat, sauf restitution ultérieure sur preuve de la
formalité.

Extraits de registres : Le service des impôts ne peut délivrer
d'extraits de ses registres que sur ordonnance du président du tribunal
de première instance.

Archives : Cette restriction est levée pour les registres terminés
depuis plus de cent ans et versés aux archives nationales.`,
      },
      {
        titre: `Tenue des Répertoires`,
        contenu: `Obligation de tenue : Les notaires, huissiers, greffiers et
commissaires-priseurs doivent tenir un répertoire à colonnes inscrit
jour par jour.

Contenu par profession :

Notaires : actes et contrats reçus.

Huissiers : actes et exploits délivrés.

Greffiers : tous jugements et arrêts.

Commissaires-priseurs : procès-verbaux de ventes.`,
      },
      {
        titre: `Gestion et Visa des Répertoires`,
        contenu: `Mentions requises : Chaque entrée doit préciser le numéro, la date, la
nature de l'acte, l'identité des parties, la situation des biens et la
relation de l'enregistrement.

Colonnes pour huissiers : Leur répertoire doit détailler les frais
d'acte, de transport, le nombre de feuilles de papier et les droits de
timbre.

Paraphe et Visa : Les répertoires sont cotés et paraphés par un juge et
doivent être présentés au visa du service des impôts au plus tard le 10
des mois de janvier, avril, juillet et octobre.`,
      },
      {
        titre: `Ventes Publiques et Déclarations`,
        contenu: `Monopole : Les ventes publiques aux enchères d'objets mobiliers
requièrent obligatoirement l'intervention d'un officier public.

Déclaration préalable : L'officier doit déclarer la vente au service des
impôts au moins un jour franc avant l'opération.

Dispenses : Les ventes de mobilier de l'État ou dépendant de successions
gérées par la curatelle d'office sont dispensées de cette déclaration.

Procès-verbal : Chaque objet adjugé doit être inscrit immédiatement avec
son prix en toutes lettres et chiffres.`,
      },
      {
        titre: `Clôture des ventes et Inventaires`,
        contenu: `Signature : Chaque séance de vente est close et signée par l'officier
public.

Lien avec l'inventaire : Pour les ventes suite à un inventaire, le
procès-verbal doit mentionner la date de celui-ci, le nom du rédacteur
et la quittance d'enregistrement.

Ce module détaille les règles spécifiques aux donations et successions,
basées sur les articles 383 à 398.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 39 — Dispositions particulières aux mutations à titre gratuit
  // ────────────────────────────────────────────────────────────
  DISPOSITIONS_PARTICULIERES_AUX_MUTATIONS_A: {
    titre: `Dispositions particulières aux mutations à titre gratuit`,
    livre: `Livre 3 : Les formalités fiscales liées à la rédaction d'actes juridiques et à la certification de documents (Enregistrement et le Timbre)`,
    chapitre_numero: 39,
    articles_cgi: `383-398`,
    sections: [
      {
        titre: `Définition et Principes`,
        contenu: `Nature des mutations : Les mutations à titre gratuit comprennent les
donations, les legs et les successions.

Application : Elles sont soumises aux règles générales de
l'enregistrement, sous réserve des spécificités prévues par ce chapitre.

Base d'imposition : La valeur des biens est déterminée par une
déclaration détaillée et estimative des parties, sans déduction des
charges (sauf exceptions légales).`,
      },
      {
        titre: `Évaluation des biens meubles et immeubles`,
        contenu: `Valeurs mobilières (actions/obligations) : L'estimation ne peut être
inférieure au cours moyen de la bourse au jour de la transmission.

Immeubles : Si le bien a fait l'objet d'une adjudication publique dans
les 2 ans (avant ou après), le droit ne peut être calculé sur une somme
inférieure au prix d'adjudication.

Meubles meublants : La valeur imposable ne peut être inférieure à 5 % de
l'ensemble des autres valeurs de la succession.

Bijoux et objets d'art : La valeur ne peut être inférieure à 60 % de
l'évaluation figurant dans les contrats d'assurance contre le
vol/incendie datant de moins de 10 ans.`,
      },
      {
        titre: `Présomptions de propriété en matière de succession`,
        contenu: `Sont réputés faire partie de la succession (sauf preuve contraire) :

Biens en usufruit : Tout bien dont le défunt avait l'usufruit et dont la
nue-propriété appartient à ses héritiers ou personnes interposées (sauf
donation régulière faite plus de 3 mois avant le décès).

Titres et valeurs : Ceux dont le défunt a perçu les revenus ou fait des
opérations moins d'un an avant le décès.

Comptes joints : Les sommes et titres en comptes indivis ou collectifs
sont réputés appartenir aux déposants par parts égales.`,
      },
      {
        titre: `Déduction des dettes et charges`,
        contenu: `Sont déductibles de l'actif de la succession, sous réserve de
justifications :

Dettes du défunt : Justifiées par des titres ayant force de preuve
contre lui.

Frais de dernière maladie et funérailles : Déductibles dans la limite de
1 000 000 FCFA (maladie) et 500 000 FCFA (funérailles).

Dettes fiscales : Les impôts établis après le décès mais dus par le
défunt.

Exclusions : Ne sont pas déductibles les dettes échues depuis plus de 3
mois (sans attestation), les dettes consenties aux héritiers, ou les
dettes reconnues uniquement par testament.`,
      },
      {
        titre: `Tarifs et Liquidation des droits`,
        contenu: `Successions (Mutations par décès) : Elles sont enregistrées gratis.

Donations entre vifs : Elles sont soumises à un droit proportionnel de 5
%.

Croix-Rouge : Les dons et legs à la Croix-Rouge internationale ou ses
associations rattachées sont gratis.

Responsabilité : Les droits sont dus par les héritiers, donataires ou
légataires. Les cohéritiers sont solidaires pour le paiement.`,
      },
      {
        titre: `Obligations des héritiers et tiers`,
        contenu: `Déclaration de succession : Les héritiers doivent souscrire une
déclaration mentionnant l'état civil complet de tous les ayants droit.

Signalement par les tiers : Les banques et administrations dépositaires
de fonds ou titres appartenant à une succession ouverte doivent en
adresser la liste au service des impôts dans les 15 jours suivant les
opérations.`,
      },
      {
        titre: `Rôle des agents publics`,
        contenu: `État civil : Les agents publics doivent fournir trimestriellement au
service des impôts les relevés des actes de décès.

Ce module détaille les règles applicables aux différents types de
timbres, basées sur les articles 399 à 459.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 40 — Le Droit de Timbre
  // ────────────────────────────────────────────────────────────
  DROIT_DE_TIMBRE: {
    titre: `Le Droit de Timbre`,
    livre: `Livre 3 : Les formalités fiscales liées à la rédaction d'actes juridiques et à la certification de documents (Enregistrement et le Timbre)`,
    chapitre_numero: 40,
    articles_cgi: `399-459`,
    sections: [
      {
        titre: `Introduction et Champ d'application`,
        contenu: `**Définition :** Le droit de timbre est une taxe établie sur tous les
papiers destinés aux actes civils et judiciaires ainsi qu'aux écrits
pouvant faire foi en justice.

Actes étrangers : Tout acte passé à l'étranger doit être timbré avant
d'être utilisé au Bénin devant une autorité judiciaire ou
administrative.

**Redevables :** Pour les actes entre l'État et les citoyens, le timbre
est à la charge de ces derniers. Les signataires sont solidaires pour le
paiement.`,
      },
      {
        titre: `Principales Exemptions`,
        contenu: `Sont exonérés de timbre (liste non exhaustive) :

Les actes des autorités administratives (sauf exceptions).

Les pétitions adressées aux autorités.

Les contrats de travail ou d'apprentissage.

Les livrets d'épargne et les contrats d'assurance.

Les actions et obligations émises par les sociétés.

Les marchés publics payés par l'État ou les communes.`,
      },
      {
        titre: `Le Timbre de Dimension`,
        contenu: `Principe : S'applique aux actes notariés, exploits d'huissiers,
jugements des tribunaux, et registres de l'autorité judiciaire.

Tarif unique : Fixé à 1 200 FCFA, quelle que soit la dimension du
papier.

Mode de perception : Les timbres mobiles sont collés sur la première
page et obligatoirement oblitérés.`,
      },
      {
        titre: `Le Timbre Proportionnel sur les Effets`,
        contenu: `Titres visés : Billets à ordre, mandats, lettres de change, billets non
négociables et warrants.

Tarif : 1 pour mille (1 FCFA par tranche de 1 000 FCFA).

Sanction civile : Le porteur d'un effet non timbré ne peut exercer ses
recours contre le tireur ou les endosseurs tant que les droits et
amendes ne sont pas payés.`,
      },
      {
        titre: `Le Timbre-Quittance`,
        contenu: `Application générale : Reçus de sommes, titres de libération ou
déclarations de valeurs.

Tarif fixe : 100 FCFA par quittance.

Paiements en espèces : S'applique spécifiquement aux paiements en
espèces supérieurs à 100 000 FCFA.

Tarif proportionnel : 1 % du montant total du paiement.

Collecte : Le bénéficiaire du paiement est chargé de collecter et
reverser ce droit à l'État.`,
      },
      {
        titre: `Timbres d'Actes (Passeports et Cartes)`,
        contenu: `Carte d'identité : 300 FCFA.

Passeport ordinaire : 600 FCFA.

Visas de séjour : de 2 000 FCFA (jusqu'à 1 mois) à 20 000 FCFA (jusqu'à
1 an).

Cartes de résident :

Temporaire (1 an) : 20 000 FCFA.

Ordinaire (3 ans) : 30 000 FCFA.

Privilégié (10 ans) : 50 000 FCFA.`,
      },
      {
        titre: `Timbres des Transports et Véhicules`,
        contenu: `Contrats de transport : 1 000 FCFA (air) et 3 000 FCFA
(mer/connaissements).

Cartes Grises : de 1 000 FCFA (motocyclettes) à 15 000 FCFA (véhicules
> 15 CV).

Visites techniques : 2 000 FCFA.

Permis de conduire : 2 000 FCFA de droit de timbre (en sus des droits
d'examen).`,
      },
      {
        titre: `Modalités de Paiement et Oblitération`,
        contenu: `Timbre fiscal unique : Création d'une série de vignettes allant de 50
FCFA à 30 000 FCFA.

Oblitération : Elle doit être faite à l'encre, mentionner la date, le
lieu, et comporter la signature ou une griffe débordant sur le papier.

Machines à timbrer : L'usage de machines homologuées est autorisé pour
apposer des empreintes représentatives des droits.`,
      },
      {
        titre: `Obligations et Sanctions`,
        contenu: `Interdictions : Il est interdit aux officiers publics d'agir ou aux
administrations de rendre un arrêté sur un acte non timbré.

Amendes :

Insuffisance : 2 500 FCFA.

Défaut de paiement : 5 000 FCFA.

Fraude sur machines à timbrer : 20 % des droits éludés (minimum
1 000 000 FCFA).`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 41 — Identification des Contribuables (IFU)
  // ────────────────────────────────────────────────────────────
  IFU: {
    titre: `Identification des Contribuables (IFU)`,
    livre: `Livre 4 : Dispositions Générales`,
    chapitre_numero: 41,
    articles_cgi: null,
    sections: [
      {
        titre: `Immatriculation à l'Identifiant Fiscal Unique (IFU)`,
        contenu: `Obligation : Toute personne (physique ou morale) assujettie à un impôt
doit demander son immatriculation à l'IFU auprès de l'administration
fiscale.

Usage : Le numéro IFU doit obligatoirement figurer sur :

Toutes les déclarations fiscales et douanières.

Les factures, lettres, quittances et reçus.

Les enseignes professionnelles.`,
      },
      {
        titre: `L'IFU comme préalable aux actes de la vie civile`,
        contenu: `Ouverture d'un compte bancaire ou obtention de cartes de débit
prépayées.

Souscription d'un contrat d'assurance.

Abonnement aux réseaux d'eau (SONEB) ou d'électricité (SBEE).

Immatriculation foncière (titre foncier).

Agrément à une profession réglementée.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 42 — Identification des Bénéficiaires Effectifs
  // ────────────────────────────────────────────────────────────
  IDENTIFICATION_DES_BENEFICIAIRES_EFFECTIFS: {
    titre: `Identification des Bénéficiaires Effectifs`,
    livre: `Livre 4 : Dispositions Générales`,
    chapitre_numero: 42,
    articles_cgi: null,
    sections: [
      {
        titre: `Définition et Registre`,
        contenu: `Bénéficiaire effectif : Désigne la ou les personnes physiques qui
exercent, en dernier lieu, un contrôle effectif sur une personne morale
ou une construction juridique (fiducie, trust).

Obligation de tenue : Les entités doivent tenir un registre actualisé
précisant l'identité de ces bénéficiaires et la nature de leur contrôle.`,
      },
      {
        titre: `Obligations Déclaratives`,
        contenu: `Les renseignements sur les bénéficiaires effectifs doivent être déclarés
à l'administration fiscale :

1\\. Lors de l'immatriculation de l'entité.

2\\. Annuellement, au plus tard le 30 avril.

3\\. Dans les 30 jours suivant tout changement.

Conservation : Les pièces justificatives doivent être conservées pendant
au moins 10 ans.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 43 — Obligations Déclaratives Annuelles
  // ────────────────────────────────────────────────────────────
  OBLIGATIONS_DECLARATIVES_ANNUELLES: {
    titre: `Obligations Déclaratives Annuelles`,
    livre: `Livre 4 : Dispositions Générales`,
    chapitre_numero: 43,
    articles_cgi: null,
    sections: [
      {
        titre: `Sommes versées aux tiers et aux associés`,
        contenu: `Sommes versées aux tiers : Obligation de déclarer annuellement les
montants payés à des prestataires (non-salariés) dès qu'ils dépassent
50 000 FCFA par bénéficiaire.

Sommes versées aux associés : Les sociétés doivent déclarer les
bénéfices répartis et les rémunérations versées aux membres des conseils
d'administration.`,
      },
      {
        titre: `Prix de transfert et Reporting pays par pays`,
        contenu: `Prix de transfert : Les entreprises dépendant d'un groupe étranger ayant
un CA >= 1 milliard FCFA doivent souscrire une déclaration
annuelle électronique sur leur politique de prix.

Déclaration Pays par Pays (CbCR) : S'applique aux groupes dont le CA
consolidé est >= 492 milliards FCFA.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 44 — Obligations Comptables et de Facturation
  // ────────────────────────────────────────────────────────────
  OBLIGATIONS_COMPTABLES_ET_DE_FACTURATION: {
    titre: `Obligations Comptables et de Facturation`,
    livre: `Livre 4 : Dispositions Générales`,
    chapitre_numero: 44,
    articles_cgi: null,
    sections: [
      {
        titre: `Tenue et Conservation de la comptabilité`,
        contenu: `Normes : La comptabilité doit être tenue en français, selon les normes
OHADA (ou référentiels spécifiques pour banques/assurances).

Conservation : Tous les documents comptables et pièces justificatives
doivent être conservés au Bénin pendant 10 ans.`,
      },
      {
        titre: `La Facture Normalisée et les MECeF`,
        contenu: `Obligation : Toute opération (vente de bien ou service) doit faire
l'objet d'une facture normalisée.

MECeF : L'émission de ces factures doit se faire via une Machine
Électronique Certifiée de Facturation (MECeF) ou un système informatique
homologué par la DGI.

Incitations : L'État prévoit un remboursement forfaitaire des frais
d'acquisition de ces machines sous forme de crédit d'impôt.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 45 — Sanctions Fiscales (Pénalités d'Assiette et de Recouvrement)
  // ────────────────────────────────────────────────────────────
  SANCTIONS_FISCALES_PENALITES_D_ASSIETTE_ET: {
    titre: `Sanctions Fiscales (Pénalités d'Assiette et de Recouvrement)`,
    livre: `Livre 4 : Dispositions Générales`,
    chapitre_numero: 45,
    articles_cgi: null,
    sections: [
      {
        titre: `Défaut ou Retard de Déclaration`,
        contenu: `Pénalité de retard : 20 % des droits dus.

Après mise en demeure : La pénalité passe à 40 % si la régularisation
n'intervient pas sous 30 jours.`,
      },
      {
        titre: `Insuffisance de Déclaration`,
        contenu: `Manquements constatés : 20 % de pénalité sur les droits non déclarés.

Absence de bonne foi : Portée à 40 %.

Manœuvres frauduleuses : Portée à 80 %.`,
      },
      {
        titre: `Retard de Paiement`,
        contenu: `Pénalité de recouvrement : 10 % des sommes dues.

Intérêt de retard : 0,25 % par mois de retard.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 46 — Sanctions de Facturation et Sanctions Pénales
  // ────────────────────────────────────────────────────────────
  SANCTIONS_DE_FACTURATION_ET_SANCTIONS: {
    titre: `Sanctions de Facturation et Sanctions Pénales`,
    livre: `Livre 4 : Dispositions Générales`,
    chapitre_numero: 46,
    articles_cgi: null,
    sections: [
      {
        titre: `Non-respect des obligations MECeF`,
        contenu: `Défaut de facture normalisée : Amende égale à 5 fois le montant non
facturé (avec un minimum de 500 000 FCFA par facture).

Récidive : Amende portée à 10 fois le montant, pouvant aller jusqu'à une
fermeture administrative de 3 mois.`,
      },
      {
        titre: `Sanctions Pénales`,
        contenu: `Fraude fiscale caractérisée : Amende de 100 000 à 2 000 000 FCFA et
emprisonnement de 1 à 5 ans.

Exemples de délits : Dissimulation de sommes, organisation
d'insolvabilité, fausses quittances, comptabilité fictive.

Secret professionnel : Sa violation par un agent est punie de 1 à 6 mois
de prison.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 47 — Les Moyens de Contrôle de l'Administration
  // ────────────────────────────────────────────────────────────
  MOYENS_DE_CONTROLE_DE_L_ADMINISTRATION: {
    titre: `Les Moyens de Contrôle de l'Administration`,
    livre: `Livre 5 : Procédures Fiscales`,
    chapitre_numero: 47,
    articles_cgi: null,
    sections: [
      {
        titre: `Demandes de renseignements et Droit de communication`,
        contenu: `Renseignements : L'inspecteur peut demander par écrit des
éclaircissements ou justifications auxquels le contribuable doit
répondre sous 30 jours.

Droit de communication : Obligation pour les tiers (banques,
administrations, clients, fournisseurs) de fournir des documents sur la
situation d'un contribuable.

Secret professionnel : Il ne peut être opposé à l'administration fiscale
par les banques (relevés de comptes) ou les administrations publiques.`,
      },
      {
        titre: `Droit de Visite et Droit d'Enquête`,
        contenu: `Droit de visite : Autorisation d'investigation dans les locaux
professionnels ou d'habitation (avec assistance d'un officier de police
si besoin) pour saisir des pièces.

Droit d'enquête : Procédure inopinée pour contrôler le respect des
règles de facturation (TVA) et les flux physiques de marchandises.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 48 — Les Formes de Contrôle
  // ────────────────────────────────────────────────────────────
  FORMES_DE_CONTROLE: {
    titre: `Les Formes de Contrôle`,
    livre: `Livre 5 : Procédures Fiscales`,
    chapitre_numero: 48,
    articles_cgi: null,
    sections: [
      {
        titre: `Contrôle sur Pièces et Contrôle Ponctuel`,
        contenu: `Contrôle sur pièces : Examen des déclarations depuis les bureaux de
l'administration sans avis préalable.

Contrôle ponctuel : Intervention courte sur place (maximum 3
demi-journées) pour vérifier des impôts spécifiques ou des points
précis.`,
      },
      {
        titre: `Vérification de Comptabilité (Audit sur place)`,
        contenu: `Procédure : Envoi d'un avis de vérification 2 jours avant
l'intervention.

Durée maximale sur place :

3 mois pour les entreprises avec un CA < 500 millions FCFA.

6 mois pour les autres.

Comptabilité informatisée : Obligation de fournir le Fichier des
Écritures Comptables (FEC).`,
      },
      {
        titre: `Examen de la Situation Fiscale Personnelle (ECSFP)`,
        contenu: `Cible : Les personnes physiques.

Objet : Contrôle de la cohérence entre les revenus déclarés et le train
de vie (résidences, voitures, voyages, piscines).

Impôt de référence : Si disproportion marquée, l'impôt est calculé sur
une base forfaitaire selon les éléments du train de vie.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 49 — Procédures de Rectification et Taxation d'Office
  // ────────────────────────────────────────────────────────────
  PROCEDURES_DE_RECTIFICATION_ET_TAXATION_D: {
    titre: `Procédures de Rectification et Taxation d'Office`,
    livre: `Livre 5 : Procédures Fiscales`,
    chapitre_numero: 49,
    articles_cgi: null,
    sections: [
      {
        titre: `La Procédure Contradictoire`,
        contenu: `Proposition de rectification : Document motivé envoyé au contribuable
qui dispose de 30 jours pour répondre.

Commission des Impôts : En cas de désaccord persistant sur les faits, le
contribuable peut saisir cette commission paritaire.`,
      },
      {
        titre: `La Taxation d'Office`,
        contenu: `Cas d'application : Défaut de déclaration, refus de contrôle,
comptabilité non probante ou activité occulte.

Effet : L'administration fixe seule les bases d'imposition. La charge de
la preuve de l'exagération incombe alors au contribuable.`,
      },
      {
        titre: `La Flagrance Fiscale`,
        contenu: `**Définition :** Constat de fraudes évidentes en cours d'année (exercice
occulte, fausses factures, stocks sans factures).

Mesure : Permet au receveur de procéder immédiatement à des saisies
conservatoires avant même la fin de l'exercice.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 50 — Garanties, Prescription et Contentieux
  // ────────────────────────────────────────────────────────────
  GARANTIES_PRESCRIPTION_ET_CONTENTIEUX: {
    titre: `Garanties, Prescription et Contentieux`,
    livre: `Livre 5 : Procédures Fiscales`,
    chapitre_numero: 50,
    articles_cgi: null,
    sections: [
      {
        titre: `Garanties du Contribuable et Prescription`,
        contenu: `Garanties : Droit à l'assistance d'un conseil, non-rétroactivité des
prises de position de l'administration (Rescrit fiscal).

Prescription (Droit de reprise) :

3 ans en règle générale.

6 ans en cas d'agissements frauduleux ou activité occulte.

20 ans pour les successions non déclarées.`,
      },
      {
        titre: `Le Contentieux de l'Impôt`,
        contenu: `Réclamation préalable : Obligatoire devant le Ministre (ou DGI par
délégation) dans les 3 mois suivant l'avis de mise en recouvrement.

Sursis de paiement : Possible pour la partie contestée en versant une
caution de 25 %.

Recours juridictionnel : Devant le tribunal si la réponse de
l'administration ne satisfait pas le contribuable.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 51 — Recouvrement et Poursuites (Phase 1)
  // ────────────────────────────────────────────────────────────
  RECOUVREMENT_ET_POURSUITES_PHASE_1: {
    titre: `Recouvrement et Poursuites (Phase 1)`,
    livre: `Livre 5 : Procédures Fiscales`,
    chapitre_numero: 51,
    articles_cgi: null,
    sections: [
      {
        titre: `Exigibilité et Titres Exécutoires`,
        contenu: `Exigibilité : En principe, le dernier jour du mois suivant la
notification du titre.

Avis de Mise en Recouvrement (AMR) : Titre exécutoire nominatif qui
déclenche l'obligation de payer.

Prescription de l'action en recouvrement : 4 ans à compter de la
notification de l'AMR.`,
      },
      {
        titre: `Le Commandement et l'Avis à Tiers Détenteur (ATD)`,
        contenu: `Commandement : Premier acte de poursuite enjoignant de payer sous 5
jours.

ATD : Procédure permettant de saisir les fonds du contribuable détenus
par des tiers (banques, employeurs, locataires).

Blocage de comptes : Mesure spéciale en cas d'inefficacité des autres
poursuites.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 52 — Poursuites (Phase 2) et Garanties de Recouvrement
  // ────────────────────────────────────────────────────────────
  POURSUITES_PHASE_2_ET_GARANTIES_DE: {
    titre: `Poursuites (Phase 2) et Garanties de Recouvrement`,
    livre: `Livre 5 : Procédures Fiscales`,
    chapitre_numero: 52,
    articles_cgi: null,
    sections: [
      {
        titre: `Saisies et Ventes`,
        contenu: `Saisie administrative : Porte sur les meubles, véhicules ou immeubles
(inscription au livre foncier).

Vente : Autorisée par le DGI ou le Ministre, effectuée aux enchères
publiques.

Fermeture d'établissement : Mesure d'accompagnement possible dès le
premier degré de poursuites.`,
      },
      {
        titre: `Privilège et Hypothèque du Trésor`,
        contenu: `Privilège du Trésor : Priorité de paiement sur les biens meubles et
immeubles du débiteur.

Hypothèque légale : Garantie sur tous les immeubles des redevables dès
qu'il y a défaut de paiement.

Solidarité : Les conjoints (sauf séparation), les successeurs
(cessionnaires) et les dirigeants de sociétés peuvent être tenus
responsables du paiement.`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Chapitre 53 — Livre 6 -- Dispositions Finales
  // ────────────────────────────────────────────────────────────
  LIVRE_6: {
    titre: `Livre 6 -- Dispositions Finales`,
    livre: `Livre 6 : Dispositions Finales`,
    chapitre_numero: 53,
    articles_cgi: null,
    sections: [
      {
        titre: `Abrogation des dispositions antérieures (Art. 658)`,
        contenu: `La loi portant Code Général des Impôts abroge toutes les dispositions
antérieures qui lui sont contraires, notamment :

La loi n° 64-35 du 31 décembre 1964 (enregistrement, timbre, publicité
foncière et IRCM).

L'ordonnance n° 2 PR/MFE du 10 janvier 1966 (impôts directs et
indirects).

Le décret n° 2005-124 du 17 mars 2005 (procédures fiscales).`,
      },
      {
        titre: `Entrée en vigueur et Publication (Art. 659)`,
        contenu: `Date d'effet : Le présent Code est entré en vigueur le 1er janvier
2022.

Exécution : La loi est publiée au Journal Officiel et exécutée comme loi
de l'État.

Signataires : Le texte est promulgué par le Président de la République,
Patrice TALON, et contresigné par le Ministre de la Justice et le
Ministre de l'Économie et des Finances.

Ce dernier module clôture l'analyse détaillée du Code Général des Impôts
2026.

Nous avons parcouru l'intégralité des 6 livres et des 659 articles.`,
      },
    ],
  },

};

export default CGI_BENIN;
export { CGI_BENIN };
