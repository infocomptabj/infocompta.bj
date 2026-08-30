// ════════════════════════════════════════════════════════════════
//  generate-fiches.mjs — Régénère les 53 pages /fiches/*.html
//  à partir de CGI-data-v2.js, avec un convertisseur Markdown→HTML
//  qui corrige deux bugs de l'ancien générateur :
//    1. Listes à puces fragmentées (chaque <li> dans son propre <ul>)
//    2. Numéros de liste échappés affichés littéralement ("1\. Texte")
// ════════════════════════════════════════════════════════════════

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import CGI_BENIN from './CGI-data-v2.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FICHES_DIR = path.join(__dirname, 'fiches');

// ── Mapping chapitre (position 1-53) → nom de fichier, tel que déjà
//    référencé dans le menu fiscalite-cgi-benin.html (JSON-LD + cartes) ──
const posToFile = {
  "1": "is.html", "2": "iba.html", "3": "ircm.html", "4": "irf.html",
  "5": "tpvi.html", "6": "its.html", "7": "retenues-a-la-source.html",
  "8": "regimes-incitatifs.html", "9": "tfu.html", "10": "tvm.html",
  "11": "taxe-sur-les-armes-a-feu.html", "12": "taxe-sur-les-pirogues-et-barques-motorisees.html",
  "13": "taxe-sur-les-taxis-de-ville.html", "14": "tps.html", "15": "vps.html",
  "16": "contribution-des-patentes-et-des-licences.html", "17": "taxe-de-developpement-du-sport.html",
  "18": "teom.html", "19": "tva.html", "20": "tafa.html",
  "21": "taxe-sur-les-jeux-de-hasard.html", "22": "contribution-sur-la-vente-de-services-de.html",
  "23": "taxe-sur-les-produits-specifiques.html", "24": "tsupp.html",
  "25": "taxe-sur-les-vehicules-de-tourisme.html", "26": "taxe-de-sejour.html",
  "27": "cdl.html", "28": "prelevement-forfaitaire-sur-les-vehicules-d.html",
  "29": "taxe-de-pacage.html", "30": "taxe-sur-les-spectacles-jeux-et.html",
  "31": "taxe-sur-la-vente-des-boissons-fermentees.html", "32": "taxe-sur-la-publicite.html",
  "33": "taxe-sur-la-consommation-d-electricite-et-d.html", "34": "droits-d-enregistrement.html",
  "35": "droits-d-enregistrement-2.html", "36": "fixation-des-droits-d-enregistrement.html",
  "37": "declarations-et-paiement-des-droits-d.html", "38": "obligations-des-officiers-publics-et.html",
  "39": "dispositions-particulieres-aux-mutations-a.html", "40": "droit-de-timbre.html",
  "41": "ifu.html", "42": "identification-des-beneficiaires-effectifs.html",
  "43": "obligations-declaratives-annuelles.html", "44": "obligations-comptables-et-de-facturation.html",
  "45": "sanctions-fiscales-penalites-d-assiette-et.html", "46": "sanctions-de-facturation-et-sanctions.html",
  "47": "moyens-de-controle-de-l-administration.html", "48": "formes-de-controle.html",
  "49": "procedures-de-rectification-et-taxation-d.html", "50": "garanties-prescription-et-contentieux.html",
  "51": "recouvrement-et-poursuites-phase-1.html", "52": "poursuites-phase-2-et-garanties-de.html",
  "53": "livre-6.html"
};

const LIVRE_META = {
  1: { id: 'livre-1', label: 'LIVRE 1', titre: 'Les impôts directs' },
  2: { id: 'livre-2', label: 'LIVRE 2', titre: 'Les impôts indirects' },
  3: { id: 'livre-3', label: 'LIVRE 3', titre: 'Enregistrement & timbre' },
  4: { id: 'livre-4', label: 'LIVRE 4', titre: 'Dispositions générales' },
  5: { id: 'livre-5', label: 'LIVRE 5', titre: 'Procédures fiscales' },
  6: { id: 'livre-6', label: 'LIVRE 6', titre: 'Dispositions finales' },
};

function livreNumeroFromTitre(titreLivre) {
  const m = titreLivre.match(/Livre (\d+)/);
  return m ? parseInt(m[1], 10) : 1;
}

// ── Échappement HTML minimal (avant insertion des balises **gras**) ──
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Rendu inline : gras **texte** → <strong>texte</strong> ──
function renderInline(raw) {
  const escaped = escapeHtml(raw);
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

// ── Convertit le contenu Markdown d'une section en HTML propre ──
function renderContent(md) {
  const blocks = md.trim().split(/\n\s*\n/);
  const html = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    const firstLine = block.split('\n')[0];

    if (/^-\s+/.test(firstLine)) {
      // Liste à puces : chaque puce est SOUVENT son propre bloc (séparé par une
      // ligne vide) dans les données sources — on regroupe donc tous les blocs
      // consécutifs qui commencent par "-" dans UNE SEULE balise <ul>, avant
      // de traiter, à l'intérieur de chacun, les lignes de continuation.
      const items = [];
      while (i < blocks.length && /^-\s+/.test(blocks[i].split('\n')[0])) {
        const lines = blocks[i].split('\n');
        let current = null;
        for (const line of lines) {
          const bulletMatch = line.match(/^-\s+(.*)/);
          if (bulletMatch) {
            if (current !== null) items.push(current);
            current = bulletMatch[1];
          } else if (current !== null) {
            current += ' ' + line.trim();
          }
        }
        if (current !== null) items.push(current);
        i++;
      }
      html.push('<ul>' + items.map(it => `<li>${renderInline(it)}</li>`).join('') + '</ul>');
      continue;

    } else if (/^\d+\\?\.\s+/.test(firstLine)) {
      // Liste numérotée : même logique de regroupement des blocs consécutifs
      const items = [];
      while (i < blocks.length && /^\d+\\?\.\s+/.test(blocks[i].split('\n')[0])) {
        const lines = blocks[i].split('\n');
        let current = null;
        for (const line of lines) {
          const numMatch = line.match(/^\d+\\?\.\s+(.*)/);
          if (numMatch) {
            if (current !== null) items.push(current);
            current = numMatch[1];
          } else if (current !== null) {
            current += ' ' + line.trim();
          }
        }
        if (current !== null) items.push(current);
        i++;
      }
      html.push('<ol>' + items.map(it => `<li>${renderInline(it)}</li>`).join('') + '</ol>');
      continue;

    } else {
      // Paragraphe normal (les retours à la ligne internes = simples retours à la ligne du texte source, on les fusionne)
      const text = block.split('\n').map(l => l.trim()).join(' ');
      html.push(`<p>${renderInline(text)}</p>`);
      i++;
    }
  }

  return html.join('\n');
}

// ── Slug d'ancre (même logique que l'existant, gardée pour compatibilité) ──
function slugAnchor(titre) {
  return titre
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

// ── Construction d'une page fiche complète ──
function buildPage(key, fiche, chapNum, filename) {
  const livreNum = livreNumeroFromTitre(fiche.livre);
  const livreMeta = LIVRE_META[livreNum];
  const titre = fiche.titre;
  const articlesLabel = fiche.articles_cgi ? `Articles ${fiche.articles_cgi} du CGI` : 'Articles divers du CGI';

  const tocItems = fiche.sections.map(s => {
    const anchor = slugAnchor(s.titre);
    return `          <li><a href="#${anchor}">${escapeHtml(s.titre)}</a></li>`;
  }).join('\n');

  const sectionsHtml = fiche.sections.map(s => {
    const anchor = slugAnchor(s.titre);
    return `        <div class="fiche-section" id="${anchor}">
          <h2>${escapeHtml(s.titre)}</h2>
${renderContent(s.contenu)}
        </div>`;
  }).join('\n\n');

  const firstSectionText = fiche.sections[0]?.contenu.split('\n')[0].replace(/\*\*/g, '').slice(0, 155) || '';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<script>
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
</script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="../auth-display.js" defer></script>
<title>${escapeHtml(titre)} — CGI Bénin 2026 | InfoCompta</title>
<meta name="description" content="${escapeAttr(firstSectionText)}…">
<link rel="canonical" href="https://www.infocompta.bj/fiches/${filename}">
<link rel="icon" type="image/svg+xml" href="../favicon.svg">
<link rel="stylesheet" href="../infocompta-shared.css">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": ${JSON.stringify(titre)},
  "articleSection": ${JSON.stringify(fiche.livre)},
  "about": ${JSON.stringify('Code Général des Impôts du Bénin — ' + titre)},
  "url": "https://www.infocompta.bj/fiches/${filename}",
  "isPartOf": {
    "@type": "WebPage",
    "url": "https://www.infocompta.bj/fiscalite-cgi-benin.html"
  }
}
</script>
<style>
.fiche-hero { padding: 2.6rem 0 2.2rem; }
.fiche-breadcrumb {
  font-size: 0.76rem;
  color: var(--text-on-dark-dim);
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}
.fiche-breadcrumb a { color: var(--text-on-dark-muted); transition: color var(--transition); }
.fiche-breadcrumb a:hover { color: var(--orange-lt); }
.fiche-breadcrumb span.sep { opacity: 0.5; }
.fiche-hero h1 { font-size: clamp(1.7rem, 3.2vw, 2.5rem); margin-bottom: 0.7rem; }
.fiche-meta { display: flex; gap: 0.7rem; flex-wrap: wrap; }
.fiche-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(16,57,226,0.14);
  border: 1px solid rgba(16,57,226,0.30);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 30px;
}

.fiche-body { padding: 3rem 0 1rem; }
.fiche-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 3rem;
  align-items: start;
}
.fiche-toc {
  position: sticky;
  top: 90px;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.2rem 1.3rem;
}
.fiche-toc-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 0.7rem;
}
.fiche-toc ul { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
.fiche-toc a {
  font-size: 0.82rem;
  color: var(--muted);
  line-height: 1.4;
  transition: color var(--transition);
  display: block;
}
.fiche-toc a:hover { color: var(--orange); }

.fiche-content { max-width: 720px; }
.fiche-section { margin-bottom: 2.6rem; scroll-margin-top: 90px; }
.fiche-section h2 {
  font-size: 1.25rem;
  color: var(--navy);
  margin-bottom: 0.9rem;
  padding-bottom: 0.6rem;
  border-bottom: 1.5px solid var(--border-lt);
}
.fiche-section p { margin-bottom: 0.9rem; font-size: 0.94rem; }
.fiche-section ul, .fiche-section ol { margin: 0 0 0.9rem 1.3rem; }
.fiche-section li { font-size: 0.94rem; color: var(--text-md); margin-bottom: 0.4rem; line-height: 1.6; }
.fiche-section strong { color: var(--navy); }

.fiche-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 3rem 0 3.5rem;
  border-top: 1px solid var(--border);
  padding-top: 2rem;
}
.fiche-nav-link {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem 1.2rem;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
}
.fiche-nav-link:hover { border-color: var(--orange-line); transform: translateY(-2px); box-shadow: var(--shadow); }
.fiche-nav-next { text-align: right; align-items: flex-end; }
.fiche-nav-dir { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--orange); }
.fiche-nav-title { font-size: 0.86rem; color: var(--navy); font-weight: 600; }
.fiche-nav-disabled { opacity: 0.35; pointer-events: none; padding: 1rem 1.2rem; border: 1.5px dashed var(--border); border-radius: var(--radius-md); }

@media (max-width: 900px) {
  .fiche-layout { grid-template-columns: 1fr; }
  .fiche-toc { position: static; }
  .fiche-nav { grid-template-columns: 1fr; }
  .fiche-nav-next { text-align: left; align-items: flex-start; }
}
</style>
</head>
<body>

<header>
  <a href="../index.html" class="logo">Info<span>Compta</span></a>
  <button class="hamburger" id="hamburgerBtn" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <nav id="mainNav">
    <ul>
      <li><a href="../index.html">Accueil</a></li>
      <li><a href="../plan-comptable.html">Plan Comptable</a></li>
      <li><a href="../documents.html">Documents</a></li>
      <li><a href="../fiscalite-cgi-benin.html" class="active">Fiscalité CGI</a></li>
      <li><a href="../quiz.html">Quiz</a></li>
      <li><a href="../offres.html">Nos offres</a></li>
      <li><a href="../a-propos.html">À propos</a></li>
      <li><a href="../contact.html">Contact</a></li>
      <li><a href="../auth.html" class="nav-cta">Connexion</a></li>
    </ul>
  </nav>
  <div class="ic-profile-wrap" id="icAuthSlot"></div>
</header>

<main>

  <section class="hero-sm fiche-hero">
    <div class="container">
      <div class="fiche-breadcrumb">
        <a href="../index.html">Accueil</a>
        <span class="sep">/</span>
        <a href="../fiscalite-cgi-benin.html">Fiscalité CGI</a>
        <span class="sep">/</span>
        <a href="../fiscalite-cgi-benin.html#${livreMeta.id}">${escapeHtml(livreMeta.titre)}</a>
        <span class="sep">/</span>
        <span>${escapeHtml(titre)}</span>
      </div>
      <h1>${escapeHtml(titre)}</h1>
      <div class="fiche-meta">
        <span class="fiche-badge">${livreMeta.label} — ${escapeHtml(livreMeta.titre)}</span>
        <span class="fiche-badge">${escapeHtml(articlesLabel)}</span>
        <span class="fiche-badge">Chapitre ${String(chapNum).padStart(2, '0')} / 53</span>
      </div>
    </div>
  </section>

  <section class="fiche-body">
    <div class="container">
      <div class="fiche-layout">
        <nav class="fiche-toc" aria-label="Sommaire de la fiche">
          <div class="fiche-toc-label">Sur cette page</div>
          <ul>
${tocItems}
          </ul>
        </nav>

        <article class="fiche-content">

${sectionsHtml}

        </article>
      </div>
    </div>
  </section>

</main>

<footer>
  <div class="footer-inner">
    <div class="footer-logo">Info<span>Compta</span></div>
    <div class="footer-links">
      <a href="../confidentialite.html">Confidentialité</a>
      <a href="../contact.html">Contact</a>
      <a href="../a-propos.html">À propos</a>
    </div>
    <p class="footer-copy">&copy; 2026 InfoCompta</p>
  </div>
</footer>

<script>
(function () {
  var btn = document.getElementById('hamburgerBtn');
  var nav = document.getElementById('mainNav');
  if (btn && nav) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = nav.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', false);
      });
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        nav.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', false);
      }
    });
  }
})();
</script>
</body>
</html>
`;
}

// ── Génération de toutes les fiches ──
let count = 0;
for (const [key, fiche] of Object.entries(CGI_BENIN)) {
  if (key === 'meta') continue;
  const chapNum = fiche.chapitre_numero;
  const filename = posToFile[String(chapNum)];
  if (!filename) {
    console.warn(`⚠️  Pas de nom de fichier trouvé pour le chapitre ${chapNum} (${key})`);
    continue;
  }
  const html = buildPage(key, fiche, chapNum, filename);
  fs.writeFileSync(path.join(FICHES_DIR, filename), html, 'utf-8');
  count++;
}
console.log(`✅ ${count} fiches régénérées dans ${FICHES_DIR}`);
