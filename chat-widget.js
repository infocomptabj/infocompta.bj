// ═══════════════════════════════════════════════════════════════
//  chat-widget.js — InfoCompta (version 4.0)
//
//  Assistant qui répond à partir des données du site :
//   • Quel compte utiliser ? (plan comptable OHADA, comptes-data.js)
//   • Fiche d'un compte : fonctionnement, écritures, comptes liés
//   • Taux, échéances, pénalités du CGI Bénin (Docs-context.js)
//   • Calculs : ITS, TVA, AIB, IRF, TPS
//   • Recherche de documents (catalogue Supabase)
//   • Téléchargements restants de l'utilisateur connecté
//
//  Aucune IA n'est appelée par défaut (CONFIG.useAI = false).
//
//  INSTALLATION (avant </body>, dans cet ordre) :
//  <script src="comptes-data.js"></script>
//  <script src="Docs-context.js"></script>
//  <script src="chat-widget.js"></script>
// ═══════════════════════════════════════════════════════════════

(function () {
'use strict';

/* ───────── Réglages ───────── */
const CONFIG = {
  useAI: false,            // true : les questions sans réponse locale vont à /api/chat
  aiEndpoint: '/api/chat'
};
const SUPABASE_URL = 'https://lmivfisdmuqbspvmvdzh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_kCfhrFPVec2MkCl0xe4N-w_QXHgc0Gp';
const TOKEN_KEY    = 'sb-lmivfisdmuqbspvmvdzh-auth-token';

const PAGE       = location.pathname.split('/').pop() || 'index.html';
const _code      = new URLSearchParams(location.search).get('code') || '';
const STORE_KEY  = 'icw_chat_' + location.pathname + (_code ? '_' + _code : '');
const MAX_STORED = 30;

/* ───────── Style ───────── */
const STYLE = `
.icw-root {
  --icw-night:#0b0e34; --icw-navy:#00085B; --icw-royal:#1039E2; --icw-royal-dk:#0815b3;
  --icw-pale:#E7EBFC;  --icw-steel:#A2B5CB; --icw-line:#D5DEE9; --icw-mist:#F5F7FB;
  --icw-muted:#6B7A96; --icw-ok:#2f7a2a;
  font-family:'DM Sans','Segoe UI',system-ui,sans-serif;
}
.icw-root *, .icw-root *::before, .icw-root *::after { box-sizing:border-box; }

/* Bouton d'ouverture */
#icw-fab {
  position:fixed; right:24px; bottom:24px; z-index:9998;
  width:56px; height:56px; border-radius:50%;
  background:var(--icw-night); border:2px solid var(--icw-royal);
  display:flex; align-items:center; justify-content:center; cursor:pointer;
  box-shadow:0 6px 24px rgba(0,8,91,.35);
  transition:transform .2s ease, box-shadow .2s ease;
}
#icw-fab:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(0,8,91,.45); }
#icw-fab svg { width:24px; height:24px; fill:#fff; }
#icw-dot {
  position:absolute; top:-2px; right:-2px; width:12px; height:12px; border-radius:50%;
  background:#FF1414; border:2px solid #fff; display:none;
}

/* Fenêtre */
#icw-panel {
  position:fixed; right:24px; bottom:92px; z-index:9997;
  width:min(392px, calc(100vw - 32px));
  height:min(590px, calc(100vh - 116px));
  display:flex; flex-direction:column; overflow:hidden;
  background:#fff; border:1px solid var(--icw-line); border-radius:16px;
  box-shadow:0 18px 56px rgba(0,8,91,.28);
  opacity:0; pointer-events:none; transform:translateY(12px);
  transition:opacity .2s ease, transform .2s ease;
}
#icw-panel.open { opacity:1; pointer-events:auto; transform:none; }

.icw-head {
  position:relative; flex-shrink:0;
  background:var(--icw-night); padding:13px 14px;
  display:flex; align-items:center; gap:11px;
}
.icw-head::after {
  content:''; position:absolute; left:0; right:0; top:0; height:2px;
  background:linear-gradient(90deg, transparent, var(--icw-royal) 30%, #3d6bff 60%, transparent);
}
.icw-badge {
  width:34px; height:34px; border-radius:9px; flex-shrink:0;
  background:var(--icw-royal); color:#fff;
  display:flex; align-items:center; justify-content:center;
  font-family:'Outfit','DM Sans',sans-serif; font-weight:800; font-size:14px; letter-spacing:.02em;
}
.icw-title { flex:1; min-width:0; }
.icw-title strong { display:block; font-family:'Outfit','DM Sans',sans-serif; font-size:15.5px; font-weight:700; color:#fff; line-height:1.2; }
.icw-title span   { display:block; font-size:11.5px; color:rgba(255,255,255,.62); margin-top:2px; }
.icw-hbtn {
  width:30px; height:30px; border-radius:8px; border:none; cursor:pointer;
  background:rgba(255,255,255,.1); color:rgba(255,255,255,.8);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
  transition:background .15s ease;
}
.icw-hbtn:hover { background:rgba(255,255,255,.22); color:#fff; }
.icw-hbtn svg { width:15px; height:15px; fill:currentColor; }

/* Raccourcis */
.icw-chips {
  flex-shrink:0; display:flex; gap:6px; overflow-x:auto; scrollbar-width:none;
  padding:9px 12px; background:var(--icw-mist); border-bottom:1px solid var(--icw-line);
}
.icw-chips::-webkit-scrollbar { display:none; }
.icw-chip {
  flex-shrink:0; white-space:nowrap; cursor:pointer;
  padding:5px 12px; border-radius:20px; font:inherit; font-size:12px; font-weight:500;
  color:var(--icw-navy); background:#fff; border:1px solid var(--icw-steel);
  transition:background .15s ease, color .15s ease, border-color .15s ease;
}
.icw-chip:hover { background:var(--icw-navy); border-color:var(--icw-navy); color:#fff; }
.icw-chip.is-current { background:var(--icw-pale); border-color:var(--icw-royal); color:var(--icw-royal-dk); }

/* Messages */
#icw-messages {
  flex:1; overflow-y:auto; padding:14px 13px; background:var(--icw-mist);
  display:flex; flex-direction:column; gap:12px; scroll-behavior:smooth;
}
#icw-messages::-webkit-scrollbar { width:4px; }
#icw-messages::-webkit-scrollbar-thumb { background:var(--icw-steel); border-radius:4px; }
.icw-msg { display:flex; flex-direction:column; gap:5px; max-width:90%; }
.icw-msg.user { align-self:flex-end; align-items:flex-end; }
.icw-msg.bot  { align-self:flex-start; }
.icw-bubble { padding:10px 13px; border-radius:12px; font-size:13.5px; line-height:1.6; word-break:break-word; }
.icw-msg.bot  .icw-bubble { background:#fff; color:#10163f; border:1px solid var(--icw-line); border-top-left-radius:4px; }
.icw-msg.user .icw-bubble { background:var(--icw-navy); color:#fff; border-top-right-radius:4px; }
.icw-bubble p { margin:0; }
.icw-bubble p + p, .icw-bubble p + ul, .icw-bubble ul + p, .icw-bubble .icw-ledger + p, .icw-bubble p + .icw-ledger { margin-top:8px; }
.icw-bubble strong { font-weight:700; color:var(--icw-navy); }
.icw-msg.user .icw-bubble strong { color:#fff; }
.icw-list { margin:6px 0 0; padding-left:17px; }
.icw-list li { margin-bottom:3px; }
.icw-h { font-family:'Outfit','DM Sans',sans-serif; font-weight:700; color:var(--icw-navy); }
.icw-pre { margin:7px 0; padding:9px 11px; background:#10163f; color:#e6eaff; border-radius:8px; overflow-x:auto; font-size:12px; line-height:1.55; }

/* Numéros de compte */
.icw-code {
  display:inline-block; padding:0 6px; border-radius:4px; text-decoration:none;
  font-family:'Courier New',monospace; font-size:12px; font-weight:700;
  color:var(--icw-royal-dk); background:var(--icw-pale); border:1px solid rgba(16,57,226,.22);
}
.icw-code:hover { background:var(--icw-royal); border-color:var(--icw-royal); color:#fff; }

/* Écriture en T */
.icw-ledger { margin:8px 0 0; background:#fff; border:1px solid var(--icw-steel); border-radius:8px; overflow:hidden; }
.icw-ledger + .icw-ledger { margin-top:7px; }
.icw-ledger-title { padding:7px 10px; font-size:12.5px; font-weight:600; color:var(--icw-navy); background:var(--icw-mist); border-bottom:1px solid var(--icw-steel); }
.icw-ledger-t { display:grid; grid-template-columns:1fr 1fr; }
.icw-ledger-col { padding:7px 10px 8px; font-size:12.5px; line-height:1.5; min-width:0; }
.icw-ledger-col + .icw-ledger-col { border-left:1px solid var(--icw-steel); }
.icw-ledger-h { font-family:'Outfit','DM Sans',sans-serif; font-size:11.5px; font-weight:600; color:var(--icw-muted); margin-bottom:2px; }
.icw-ledger-v { margin-top:2px; }

/* Suites proposées et liens */
.icw-follow { display:flex; flex-wrap:wrap; gap:6px; }
.icw-pill, .icw-act {
  font:inherit; font-size:12px; font-weight:500; cursor:pointer; text-decoration:none;
  padding:4px 11px; border-radius:16px;
  transition:background .15s ease, color .15s ease;
}
.icw-pill { color:var(--icw-royal-dk); background:#fff; border:1px solid var(--icw-royal); }
.icw-pill:hover { background:var(--icw-pale); }
.icw-act  { color:#fff; background:var(--icw-royal); border:1px solid var(--icw-royal); }
.icw-act:hover { background:var(--icw-royal-dk); }

.icw-meta { display:flex; align-items:center; gap:8px; font-size:11px; color:var(--icw-muted); }
.icw-copy {
  display:inline-flex; align-items:center; gap:4px; padding:2px 4px; border:none; border-radius:5px;
  background:none; color:var(--icw-muted); font:inherit; font-size:11px; cursor:pointer;
}
.icw-copy svg { width:13px; height:13px; fill:currentColor; }
.icw-copy:hover { color:var(--icw-royal); }
.icw-copy.copied { color:var(--icw-ok); }

.icw-typing { display:flex; gap:4px; width:fit-content; padding:11px 13px; background:#fff; border:1px solid var(--icw-line); border-radius:12px; border-top-left-radius:4px; }
.icw-typing span { width:6px; height:6px; border-radius:50%; background:var(--icw-royal); animation:icw-bounce .9s infinite; }
.icw-typing span:nth-child(2) { animation-delay:.15s; }
.icw-typing span:nth-child(3) { animation-delay:.3s; }
@keyframes icw-bounce { 0%,80%,100%{ transform:translateY(0); opacity:.55 } 40%{ transform:translateY(-6px); opacity:1 } }

/* Saisie */
.icw-input-area { flex-shrink:0; display:flex; align-items:flex-end; gap:8px; padding:10px 12px; background:#fff; border-top:1px solid var(--icw-line); }
#icw-input {
  flex:1; resize:none; max-height:100px; padding:9px 12px; border-radius:10px;
  border:1.5px solid var(--icw-steel); background:var(--icw-mist); color:#10163f;
  font:inherit; font-size:13.5px; line-height:1.45; outline:none;
  transition:border-color .15s ease, box-shadow .15s ease;
}
#icw-input:focus { border-color:var(--icw-royal); box-shadow:0 0 0 3px rgba(16,57,226,.12); background:#fff; }
#icw-input::placeholder { color:var(--icw-muted); }
#icw-send {
  width:40px; height:40px; flex-shrink:0; border:none; border-radius:10px; cursor:pointer;
  background:var(--icw-navy); display:flex; align-items:center; justify-content:center;
  transition:background .15s ease;
}
#icw-send:hover { background:var(--icw-royal); }
#icw-send:disabled { opacity:.45; cursor:not-allowed; }
#icw-send svg { width:16px; height:16px; fill:#fff; }
.icw-foot { flex-shrink:0; padding:0 12px 8px; background:#fff; text-align:center; font-size:10.5px; color:var(--icw-muted); }

#icw-toast {
  position:fixed; right:28px; bottom:100px; z-index:99999; padding:7px 14px; border-radius:8px;
  background:var(--icw-navy); color:#fff; font-size:12px; opacity:0; pointer-events:none; transition:opacity .2s ease;
}
#icw-toast.show { opacity:1; }

.icw-root :focus-visible { outline:2px solid var(--icw-royal); outline-offset:2px; }

@media (max-width:480px) {
  #icw-panel { right:8px; left:8px; width:auto; bottom:80px; height:min(78vh, calc(100vh - 100px)); }
  #icw-fab { right:16px; bottom:16px; }
}
@media (prefers-reduced-motion:reduce) {
  #icw-panel, #icw-fab, .icw-chip, .icw-pill, .icw-act { transition:none; }
  .icw-typing span { animation:none; }
  #icw-messages { scroll-behavior:auto; }
}
`;

const SVG = {
  chat:  '<svg viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 9h10v2H7V9zm0 4h7v2H7v-2zm0-6h10v2H7V7z"/></svg>',
  send:  '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',
  copy:  '<svg viewBox="0 0 24 24"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
};

/* ───────── Outils de texte ───────── */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
  });
}
function norm(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9%\s-]/g, ' ')
    .replace(/(?<!\d)-|-(?!\d)/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
function stem(w) { return w.length > 3 ? w.replace(/(es|s|x|e)$/, '') : w; }
function oneLine(s, n) {
  const t = String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
  return n && t.length > n ? t.slice(0, n - 1).trim() + '…' : t;
}
function money(n) {
  return Math.round(n).toLocaleString('fr-FR').replace(/[\u202f\u00a0]/g, '\u00a0') + '\u00a0FCFA';
}
function pct(n) { return (Math.round(n * 1000) / 10).toString().replace('.', ',') + '\u00a0%'; }
function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

const STOP = new Set(('le la les de du des un une et ou pour sur en au aux a je j jai ai dans par mon ma mes quel quelle quels ' +
  'quelles compte comptes quoi que qui est ce cest cette comment faut il utiliser utilise enregistrer comptabiliser passer ' +
  'ecriture y ne pas se sa son ses avec sans plus vous nous dois doit peut puis d l s n c qu faire quand ou').split(' '));
const DOC_STOP = new Set('document documents modele modeles fichier fichiers telecharger telechargement cherche chercher trouver trouve besoin veux voudrais avoir lien existe'.split(' '));

const SYNRAW = {
  loyer:['location','locatif'], salaire:['remuneration','personnel'], paie:['remuneration','personnel'],
  carburant:['combustible','achat'], electricite:['energie','achat'], eau:['achat'], telephone:['telecommunication'],
  internet:['telecommunication'], voyage:['deplacement','transport'], virement:['banque'], espece:['caisse'],
  dette:['fournisseur','emprunt'], pret:['emprunt'], vehicule:['materiel','transport'], ordinateur:['materiel','informatique'],
  creance:['client'], impaye:['douteux','client'], honoraire:['conseil'], impot:['taxe'], taxe:['impot'],
  dividende:['associe'], avance:['acompte'], acompte:['avance'], marchandise:['achat','vente'], cotisation:['social']
};
const SYN = {};
Object.keys(SYNRAW).forEach(function (k) { SYN[stem(k)] = SYNRAW[k].map(stem); });

function tokensOf(q, extraStop) {
  return norm(q).split(' ').filter(function (w) {
    return w && w.length > 1 && !STOP.has(w) && !(extraStop && extraStop.has(w)) && !/^\d+$/.test(w);
  }).map(stem);
}
function expandTokens(tokens) {
  const out = new Set(tokens);
  tokens.forEach(function (t) { (SYN[t] || []).forEach(function (x) { out.add(x); }); });
  return Array.from(out);
}

/* ───────── Données du site ───────── */
let DATA = {}, FISC = {}, INDEX = [], SUBPARENT = {}, SUBLABEL = {};

function mkItem(code, parent, label, kind, extra) {
  const text = norm(label);
  return { code: code, parent: parent, label: label, kind: kind, text: text, extra: extra,
           words: text.split(' ').filter(Boolean).map(stem) };
}
function prepareData() {
  DATA = (typeof comptesData !== 'undefined' && comptesData) ? comptesData : {};
  FISC = (typeof DOCS_CONTEXT !== 'undefined' && DOCS_CONTEXT && DOCS_CONTEXT.cgi) ? DOCS_CONTEXT.cgi : {};
  INDEX = []; SUBPARENT = {}; SUBLABEL = {};
  Object.keys(DATA).forEach(function (code) {
    const d = DATA[code];
    const extra = norm((d.contenu || '').slice(0, 500) + ' ' +
      (d.exemples_ecritures || []).map(function (e) { return e.libelle; }).join(' '));
    INDEX.push(mkItem(code, code, d.libelle, 'account', extra));
    Object.keys(d.subdivisions || {}).forEach(function (sc) {
      if (DATA[sc] || SUBPARENT[sc]) return;
      SUBPARENT[sc] = code; SUBLABEL[sc] = d.subdivisions[sc];
      INDEX.push(mkItem(sc, code, d.subdivisions[sc], 'sub', ''));
    });
  });
}
function resolveCode(c) {
  c = String(c || '').trim();
  if (!c) return null;
  if (DATA[c]) return c;
  if (SUBPARENT[c]) return SUBPARENT[c];
  for (let n = c.length - 1; n >= 1; n--) { if (DATA[c.slice(0, n)]) return c.slice(0, n); }
  return null;
}
function labelFor(c) { return (DATA[c] && DATA[c].libelle) || SUBLABEL[c] || ''; }

/* ───────── Mise en forme des réponses ───────── */
function inline(s) {
  let h = esc(s);
  h = h.replace(/\[(\d[\d-]*[a-zA-Z]?)\]/g, function (m, c) {
    const t = resolveCode(c);
    return t ? '<a class="icw-code" href="compte-detail.html?code=' + encodeURIComponent(t) + '" target="_blank" rel="noopener">' + c + '</a>' : m;
  });
  return h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
function ledgerValues(v) {
  return String(v).split(' + ').map(function (part) {
    const m = part.match(/^(\d[\d-]*)\s[–-]\s(.*)$/);
    const t = m && resolveCode(m[1]);
    const html = t
      ? '<a class="icw-code" href="compte-detail.html?code=' + encodeURIComponent(t) + '" target="_blank" rel="noopener">' + esc(m[1]) + '</a> ' + esc(m[2])
      : esc(part);
    return '<div class="icw-ledger-v">' + html + '</div>';
  }).join('');
}
function ledger(entries) {
  return entries.map(function (line) {
    const p = line.split(' | ');
    return '<div class="icw-ledger"><div class="icw-ledger-title">' + esc(p[0] || '') + '</div>' +
      '<div class="icw-ledger-t">' +
        '<div class="icw-ledger-col"><div class="icw-ledger-h">Débit</div>' + ledgerValues(p[1] || '') + '</div>' +
        '<div class="icw-ledger-col"><div class="icw-ledger-h">Crédit</div>' + ledgerValues(p[2] || '') + '</div>' +
      '</div></div>';
  }).join('');
}
function format(raw) {
  const L = String(raw).split('\n'); const out = []; let i = 0;
  const isBlock = function (s) { return /^(```|::ecr |[•-] |#{1,3} )/.test(s); };
  while (i < L.length) {
    const line = L[i];
    if (/^```/.test(line)) {
      const buf = []; i++;
      while (i < L.length && !/^```/.test(L[i])) { buf.push(L[i]); i++; }
      i++; out.push('<pre class="icw-pre">' + esc(buf.join('\n')) + '</pre>'); continue;
    }
    if (/^::ecr /.test(line)) {
      const ent = [];
      while (i < L.length && /^::ecr /.test(L[i])) { ent.push(L[i].slice(6)); i++; }
      out.push(ledger(ent)); continue;
    }
    if (/^[•-] /.test(line)) {
      const it = [];
      while (i < L.length && /^[•-] /.test(L[i])) { it.push(L[i].slice(2)); i++; }
      out.push('<ul class="icw-list">' + it.map(function (x) { return '<li>' + inline(x) + '</li>'; }).join('') + '</ul>'); continue;
    }
    if (/^#{1,3} /.test(line)) { out.push('<p class="icw-h">' + inline(line.replace(/^#+ /, '')) + '</p>'); i++; continue; }
    if (!line.trim()) { i++; continue; }
    const p = [];
    while (i < L.length && L[i].trim() && !isBlock(L[i])) { p.push(inline(L[i])); i++; }
    out.push('<p>' + p.join('<br>') + '</p>');
  }
  return out.join('');
}
function plain(raw) {
  return String(raw)
    .replace(/^::ecr (.*)$/gm, function (m, e) { const p = e.split(' | '); return p[0] + '\n  Débit : ' + (p[1] || '') + '\n  Crédit : ' + (p[2] || ''); })
    .replace(/```[\w]*\n?/g, '').replace(/\*\*/g, '').replace(/\[(\d[\d-]*[a-zA-Z]?)\]/g, '$1');
}
function A(text, o) {
  o = o || {};
  return { text: text, src: o.src || '', actions: o.actions || [], suggestions: o.suggestions || [] };
}

/* ───────── Plan comptable : recherche et fiches ───────── */
function wordScore(words, t) {
  let best = 0;
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (w === t) return 6;
    if (t.length >= 5 && w.length >= 5 && w.slice(0, 5) === t.slice(0, 5)) best = 5;
  }
  return best;
}
function searchAccounts(q, limit) {
  const toks = expandTokens(tokensOf(q));
  if (!toks.length) return [];
  const res = [];
  INDEX.forEach(function (it) {
    let s = 0;
    toks.forEach(function (t) {
      const w = wordScore(it.words, t);
      if (w) s += w;
      else if (t.length > 3 && it.text.indexOf(t) !== -1) s += 3;
      else if (t.length > 3 && it.extra.indexOf(t) !== -1) s += 1;
    });
    if (s > 0) res.push({ it: it, s: s + (it.kind === 'account' ? 1 : 0) });
  });
  res.sort(function (a, b) { return b.s - a.s; });
  if (!res.length || res[0].s < 6) return [];
  const min = res[0].s * 0.6;
  return res.filter(function (r) { return r.s >= min; }).slice(0, limit || 4);
}
function accountSuggestions(code) {
  return [
    { label: 'Fonctionnement',      ask: 'fonctionnement du compte ' + code },
    { label: 'Exemples d’écritures', ask: 'exemples d’écritures du compte ' + code },
    { label: 'Comptes liés',        ask: 'comptes liés au compte ' + code }
  ];
}
function ficheLink(code) { return { label: 'Ouvrir la fiche', href: 'compte-detail.html?code=' + encodeURIComponent(code) }; }

function answerAccounts(q) {
  const hits = searchAccounts(q, 4);
  if (!hits.length) return null;
  const lines = ['**Comptes possibles**'];
  hits.forEach(function (h) {
    const it = h.it;
    lines.push('• [' + it.code + '] ' + it.label + (it.kind === 'sub' ? ' (dans [' + it.parent + '] ' + DATA[it.parent].libelle + ')' : ''));
  });
  const top = hits[0].it, acc = DATA[top.parent];
  const ex = acc && acc.exemples_ecritures && acc.exemples_ecritures[0];
  if (ex) {
    lines.push('', 'Exemple avec le compte [' + top.parent + '] :');
    lines.push('::ecr ' + String(ex.libelle).replace(/\|/g, '/') + ' | ' + String(ex.debit).replace(/\|/g, '/') + ' | ' + String(ex.credit).replace(/\|/g, '/'));
  }
  return A(lines.join('\n'), { src: 'Plan comptable OHADA', actions: [ficheLink(top.parent)], suggestions: accountSuggestions(top.parent) });
}
function accountSummary(raw) {
  const code = resolveCode(raw); if (!code) return null;
  const d = DATA[code];
  const lines = ['**[' + code + '] ' + d.libelle + '**'];
  if (code !== raw && labelFor(raw)) lines.unshift('[' + raw + '] ' + labelFor(raw) + ' est une subdivision du compte [' + code + '].');
  const meta = [];
  if (d.nature) meta.push('Nature : ' + d.nature);
  if (d.sens)   meta.push('Sens normal : ' + d.sens);
  if (meta.length) lines.push(meta.join('\n'));
  if (d.contenu) lines.push(oneLine(d.contenu, 380));
  return A(lines.join('\n\n'), { src: 'Plan comptable OHADA', actions: [ficheLink(code)], suggestions: accountSuggestions(code) });
}
function accountFacet(raw, facet) {
  const code = resolveCode(raw); if (!code) return null;
  const d = DATA[code];
  const head = '**[' + code + '] ' + d.libelle + '**';
  let body = '';
  if (facet === 'fonct') {
    const f = d.fonctionnement || {};
    const deb = (f.debit || []).slice(0, 4), cre = (f.credit || []).slice(0, 4);
    if (!deb.length && !cre.length) body = 'Ce compte est un compte de regroupement : le détail du fonctionnement se trouve dans ses subdivisions.';
    else {
      if (deb.length) body += '**Le compte est débité**\n' + deb.map(function (x) { return '• ' + oneLine(x, 220); }).join('\n');
      if (cre.length) body += (body ? '\n\n' : '') + '**Le compte est crédité**\n' + cre.map(function (x) { return '• ' + oneLine(x, 220); }).join('\n');
      if ((f.debit || []).length > 4 || (f.credit || []).length > 4) body += '\n\nLa suite est dans la fiche.';
    }
  } else if (facet === 'ecr') {
    const ex = (d.exemples_ecritures || []).slice(0, 4);
    body = ex.length
      ? ex.map(function (e) { return '::ecr ' + String(e.libelle).replace(/\|/g, '/') + ' | ' + String(e.debit).replace(/\|/g, '/') + ' | ' + String(e.credit).replace(/\|/g, '/'); }).join('\n')
      : 'Aucun exemple d’écriture n’est encore enregistré pour ce compte.';
  } else if (facet === 'lies') {
    const l = (d.comptes_lies || []).slice(0, 12);
    body = l.length ? l.map(function (c) { return '• [' + c + '] ' + (labelFor(c) || ''); }).join('\n') : 'Aucun compte lié n’est indiqué.';
  } else if (facet === 'excl') {
    const e = d.exclusions;
    if (e && (e.texte || (e.comptes || []).length)) {
      body = (e.texte ? e.texte : '') + ((e.comptes || []).length ? '\n\n**À utiliser à la place**\n' + e.comptes.slice(0, 6).map(function (x) { return '• ' + x; }).join('\n') : '');
    } else body = 'Aucune exclusion n’est indiquée pour ce compte.';
  }
  const prefix = (code !== raw && labelFor(raw)) ? '[' + raw + '] ' + labelFor(raw) + ' relève du compte [' + code + '].\n\n' : '';
  return A(prefix + head + '\n\n' + body, { src: 'Plan comptable OHADA', actions: [ficheLink(code)], suggestions: accountSuggestions(code) });
}
function detectFacet(n) {
  if (/fonctionnement|fonctionne|mouvement|\bdebit|\bcredit/.test(n)) return 'fonct';
  if (/ecriture|exemple|journal/.test(n)) return 'ecr';
  if (/\blies?\b|associes?/.test(n)) return 'lies';
  if (/exclu|a eviter|confond/.test(n)) return 'excl';
  if (/explique|explication|\brole\b|definition|presente|decris/.test(n)) return 'fiche';
  return null;
}

/* ───────── Fiscalité Bénin ───────── */
const TOPICS = [
  ['retenues_source',      /\baib\b|acompte sur impot|retenue a la source/],
  ['TPVI',                 /plus value immobiliere|\btpvi\b/],
  ['IRCM',                 /\bircm\b|dividende|capitaux mobiliers/],
  ['IRF',                  /\birf\b|revenus? fonciers?|(impot|taxe|retenue).*loyer|loyer.*(impot|taxe|retenue)/],
  ['TFU',                  /\btfu\b|taxe fonciere/],
  ['TVM',                  /\btvm\b|vehicules? a moteur|vignette/],
  ['TPS',                  /\btps\b|taxe professionnelle synthetique/],
  ['VPS',                  /\bvps\b|versement patronal/],
  ['ITS',                  /\bits\b|traitements? et salaires|impot sur (le |les )?salaires?/],
  ['IBA',                  /\biba\b|benefices? d affaires/],
  ['IS',                   /\bis\b|impot sur (les )?societes/],
  ['TAFA',                 /\btafa\b|activites financieres/],
  ['TVA',                  /\btva\b|taxe sur la valeur ajoutee/],
  ['patentes_licences',    /patente|licence/],
  ['droits_accises',       /accise/],
  ['droits_enregistrement',/droits? d enregistrement/],
  ['droits_timbre',        /timbre/],
  ['obligations_generales',/\bifu\b|mecef|facture normalisee|facturation|enseigne/],
  ['controle_impot',       /controle fiscal|verification de comptabilite|flagrance|ecsfp/],
  ['recours',              /recours|reclamation|contentieux|gracieux/],
  ['regimes_incitatifs',   /incitatif|start ?up|\bcga\b|centre de gestion|entreprise nouvelle/],
  ['calendrier_fiscal',    /calendrier|echeancier|agenda fiscal/],
  ['sanctions_generales',  /sanction|penalite|amende|majoration/]
];
const TOPIC_TITLE = {
  IS:'Impôt sur les sociétés (IS)', IBA:'Impôt sur les bénéfices d’affaires (IBA)', IRCM:'Revenus des capitaux mobiliers (IRCM)',
  IRF:'Impôt sur les revenus fonciers (IRF)', TPVI:'Taxe sur les plus-values immobilières', ITS:'Impôt sur les traitements et salaires (ITS)',
  retenues_source:'Retenues à la source (AIB)', TFU:'Taxe foncière unique (TFU)', TVM:'Taxe sur les véhicules à moteur',
  TPS:'Taxe professionnelle synthétique (TPS)', VPS:'Versement patronal sur salaires (VPS)', patentes_licences:'Patentes et licences',
  TVA:'Taxe sur la valeur ajoutée (TVA)', TAFA:'Taxe sur les activités financières (TAFA)', droits_accises:'Droits d’accises',
  droits_enregistrement:'Droits d’enregistrement', droits_timbre:'Droits de timbre', obligations_generales:'Obligations des contribuables',
  sanctions_generales:'Sanctions fiscales', controle_impot:'Contrôle de l’impôt', recours:'Recours du contribuable',
  calendrier_fiscal:'Calendrier fiscal', regimes_incitatifs:'Régimes incitatifs'
};
const TOPIC_ASK = {
  IS:'IS', IBA:'IBA', IRCM:'IRCM', IRF:'IRF', TPVI:'plus-value immobilière', ITS:'ITS', retenues_source:'AIB', TFU:'TFU', TVM:'TVM',
  TPS:'TPS', VPS:'VPS', patentes_licences:'patente', TVA:'TVA', TAFA:'TAFA', droits_accises:'accises', droits_enregistrement:'droits d’enregistrement',
  droits_timbre:'timbre', obligations_generales:'IFU et facturation', sanctions_generales:'sanctions fiscales', controle_impot:'contrôle fiscal',
  recours:'recours fiscal', calendrier_fiscal:'calendrier fiscal', regimes_incitatifs:'régimes incitatifs'
};
const FACET_KEYS = {
  taux:        /^(taux|bareme|minimum|calcul|montants|droits_fixes|tarifs|abattements|base_imposable)/,
  echeance:    /(declaration|paiement|versement|acomptes)/,
  penalite:    /(penalite|sanction)/,
  exoneration: /exoneration/,
  definition:  /^(definition|description|base_imposable|nature)/
};
const DEFAULT_KEYS = /^(definition|description|nom|base_imposable|taux|bareme|minimum|montants|declaration|paiement|versement|penalite|sanction|calcul|mecanisme|types|voie|dispositif|prescription|champ|reduction)/;
const FACET_LABEL = { taux:'Taux', echeance:'Échéances', penalite:'Pénalités', exoneration:'Exonérations', definition:'Définition' };

function detectTopic(n) {
  for (let i = 0; i < TOPICS.length; i++) { if (TOPICS[i][1].test(n)) return TOPICS[i][0]; }
  return null;
}
function detectTaxFacet(n) {
  if (/exonere|exoneration|dispense/.test(n)) return 'exoneration';
  if (/penalite|sanction|amende|majoration|retard/.test(n)) return 'penalite';
  if (/echeance|declar|paiement|payer|verser|delai|quand|date limite/.test(n)) return 'echeance';
  if (/\btaux\b|bareme|pourcentage|tarif|combien/.test(n)) return 'taux';
  if (/c est quoi|definition|qu est ce|explique/.test(n)) return 'definition';
  return null;
}
function prettyKey(k) { return k.replace(/_/g, ' ').replace(/^./, function (c) { return c.toUpperCase(); }); }
function itemText(it) {
  if (it == null) return '';
  if (typeof it !== 'object') return oneLine(it, 240);
  if (it.mois && it.obligation) return '**' + it.mois + '** : ' + oneLine(it.obligation, 220);
  const ent = Object.keys(it).map(function (k) {
    const v = oneLine(it[k], 200);
    return /taux|montant|sanction|echeance|droit$|tarif|avantage/.test(k) ? '**' + v + '**' : v;
  });
  return ent.length === 2 ? ent[0] + ' : ' + ent[1] : ent.join(' — ');
}
function renderArray(arr, max) {
  const shown = arr.slice(0, max).map(function (x) { return '• ' + itemText(x); });
  if (arr.length > max) shown.push('• … ' + (arr.length - max) + ' autre(s) dans le CGI');
  return shown.join('\n');
}
function renderObj(obj, facet, depth) {
  const out = [];
  Object.keys(obj).forEach(function (k) {
    const v = obj[k];
    if (v == null) return;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if (depth < 3) {
        const inner = renderObj(v, facet, depth + 1);
        if (inner) out.push((v.nom ? '**' + v.nom + '**\n' : '**' + prettyKey(k) + '**\n') + inner);
      }
      return;
    }
    const ok = facet ? FACET_KEYS[facet].test(k) : DEFAULT_KEYS.test(k);
    if (!ok || k === 'nom') return;
    const label = prettyKey(k);
    if (typeof v === 'string') out.push('**' + label + '** : ' + oneLine(v, 260));
    else if (Array.isArray(v)) out.push('**' + label + '**\n' + renderArray(v, depth ? 5 : 6));
  });
  return out.join('\n\n');
}
function renderSection(topic, facet) {
  const sec = FISC[topic];
  if (!sec) return '';
  let body = Array.isArray(sec) ? renderArray(sec, 12) : renderObj(sec, facet, 0);
  if (!body && facet) body = 'Cette rubrique n’a pas d’élément « ' + FACET_LABEL[facet].toLowerCase() + ' » dans la base.';
  return body;
}
function cutLong(text, max) {
  if (text.length <= max) return { text: text, cut: false };
  const part = text.slice(0, max); const i = part.lastIndexOf('\n');
  return { text: (i > max * 0.5 ? part.slice(0, i) : part).trim(), cut: true };
}
function answerTopic(topic, facet) {
  if (!FISC[topic]) return null;
  const body = renderSection(topic, facet);
  const head = '**' + TOPIC_TITLE[topic] + '**' + (facet ? ' : ' + FACET_LABEL[facet].toLowerCase() : '');
  const c = cutLong(head + '\n\n' + body, 2600);
  const sug = [];
  ['taux', 'echeance', 'penalite', 'exoneration'].forEach(function (f) {
    if (f !== facet && topic !== 'calendrier_fiscal') sug.push({ label: FACET_LABEL[f], ask: TOPIC_ASK[topic] + ' ' + FACET_LABEL[f].toLowerCase() });
  });
  return A(c.text + (c.cut ? '\n\nLa suite est dans le CGI.' : ''), {
    src: 'CGI Bénin 2026', suggestions: sug.slice(0, 3),
    actions: [{ label: 'Voir la fiscalité CGI', href: 'fiscalite-cgi-benin.html' }]
  });
}

/* ───────── Calculs ───────── */
const ITS_TR = [[0, 60000, 0], [60000, 150000, 0.10], [150000, 250000, 0.15], [250000, 500000, 0.19], [500000, Infinity, 0.30]];
function parseAmount(text) {
  const t = String(text).replace(/[\u00a0\u202f]/g, ' ').replace(/\d+(?:[.,]\d+)?\s*%/g, ' ');
  const re = /(\d{1,3}(?:[ .]\d{3})+|\d+)(?:[.,](\d+))?\s*(millions?|mille|k\b)?/gi;
  const vals = []; let m;
  while ((m = re.exec(t))) {
    let n = parseFloat(m[1].replace(/[ .]/g, '') + (m[2] ? '.' + m[2] : ''));
    const u = (m[3] || '').toLowerCase();
    if (/^million/.test(u)) n *= 1e6; else if (u === 'mille' || u === 'k') n *= 1e3;
    vals.push(n);
  }
  const big = vals.filter(function (v) { return v >= 100; });
  const noYear = big.filter(function (v) { return !(v >= 1990 && v <= 2100); });
  return noYear.length ? noYear[0] : (big.length ? big[0] : null);
}
function detectTool(n) {
  if (/\bits\b|impot sur (le |les )?salaires?/.test(n)) return 'its';
  if (/\btva\b/.test(n)) return 'tva';
  if (/\baib\b/.test(n)) return 'aib';
  if (/\birf\b|impot sur (les )?loyers?|revenus? fonciers?/.test(n)) return 'irf';
  if (/\btps\b/.test(n)) return 'tps';
  return null;
}
const TOOL_PROMPT = {
  its: 'Indiquez la base imposable mensuelle en FCFA, par exemple 350 000.',
  tva: 'Indiquez le montant en FCFA, par exemple « TVA sur 100 000 HT » ou « 118 000 TTC ».',
  aib: 'Indiquez le montant de la facture en FCFA, par exemple 250 000.',
  irf: 'Indiquez le loyer brut en FCFA, par exemple 150 000.',
  tps: 'Indiquez les recettes annuelles en FCFA, par exemple 8 000 000.'
};
function runTool(tool, amt, n) {
  const sug = function (t) { return [{ label: 'Taux', ask: t + ' taux' }, { label: 'Échéances', ask: t + ' échéances' }]; };
  const note = 'Calcul indicatif d’après le CGI 2026 : vérifiez les textes en vigueur.';
  if (tool === 'tva') {
    const ttc = /ttc/.test(n) && !/\bht\b/.test(n);
    const ht = ttc ? amt / 1.18 : amt, tva = ht * 0.18;
    return A('**TVA à 18 %**\n• Montant HT : ' + money(ht) + '\n• TVA : ' + money(tva) + '\n• Montant TTC : ' + money(ht + tva) +
      '\n\nTaux normal. Les exportations sont à 0 %. ' + note, { src: 'Calcul indicatif', suggestions: sug('TVA') });
  }
  if (tool === 'its') {
    let total = 0; const rows = [];
    ITS_TR.forEach(function (t) {
      if (amt > t[0]) {
        const part = Math.min(amt, t[1]) - t[0], tax = part * t[2]; total += tax;
        const lo = t[0] ? (t[0] + 1).toLocaleString('fr-FR') : '0';
        const hi = t[1] === Infinity ? 'plus' : t[1].toLocaleString('fr-FR');
        rows.push('• ' + (t[1] === Infinity ? 'Au-delà de ' + t[0].toLocaleString('fr-FR') : lo + ' à ' + hi) + ' : ' + money(part) + ' × ' + pct(t[2]) + ' = **' + money(tax) + '**');
      }
    });
    return A('**ITS sur une base mensuelle de ' + money(amt) + '**\n' + rows.join('\n') +
      '\n\n**ITS mensuel : ' + money(total) + '** (taux moyen ' + pct(total / amt) + ')\nVersement patronal (VPS, 4 %) : ' + money(amt * 0.04) +
      '\n\nLa redevance ORTB n’est pas incluse. ' + note, { src: 'Calcul indicatif', suggestions: sug('ITS') });
  }
  if (tool === 'aib') {
    return A('**AIB sur ' + money(amt) + '**\n• 1 % (importations, achats et travaux, fournisseurs avec IFU) : ' + money(amt * 0.01) +
      '\n• 3 % (prestations de services, prestataires avec IFU) : ' + money(amt * 0.03) +
      '\n• 5 % (fournisseurs sans IFU, factures normalisées pour la TPS) : ' + money(amt * 0.05) +
      '\n\nChoisissez le taux selon la nature de l’opération. ' + note, { src: 'Calcul indicatif', suggestions: sug('AIB') });
  }
  if (tool === 'irf') {
    return A('**IRF sur un loyer brut de ' + money(amt) + '**\n• Taux normal 12 % : ' + money(amt * 0.12) +
      '\n• Retenue à 10 % si le bailleur relève de l’IBA ou de l’IS : ' + money(amt * 0.10) +
      '\n\nLa redevance ORTB de 4\u00a0000\u00a0FCFA s’ajoute à l’impôt dû. ' + note, { src: 'Calcul indicatif', suggestions: sug('IRF') });
  }
  if (tool === 'tps') {
    const brut = amt * 0.05, du = Math.max(brut, 10000);
    return A('**TPS sur des recettes annuelles de ' + money(amt) + '**\n• 5 % des recettes : ' + money(brut) +
      '\n• Minimum de perception : ' + money(10000) + '\n• **TPS due : ' + money(du) + '**\n\nLa redevance ORTB de 4\u00a0000\u00a0FCFA s’ajoute. ' + note,
      { src: 'Calcul indicatif', suggestions: sug('TPS') });
  }
  return null;
}

/* ───────── Documents et compte utilisateur ───────── */
let CATALOG = null;
async function loadCatalog() {
  if (CATALOG) return CATALOG;
  try { const c = sessionStorage.getItem('icw_catalog'); if (c) { CATALOG = JSON.parse(c); return CATALOG; } } catch (e) {}
  const r = await fetch(SUPABASE_URL + '/rest/v1/documents_public?select=id,titre,categorie,extension,prix&limit=1000', { headers: { apikey: SUPABASE_KEY } });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  CATALOG = await r.json();
  try { sessionStorage.setItem('icw_catalog', JSON.stringify(CATALOG)); } catch (e) {}
  return CATALOG;
}
async function answerDocs(q) {
  const docsLink = function (term) { return { label: 'Ouvrir les documents', href: 'documents.html' + (term ? '?q=' + encodeURIComponent(term) : '') }; };
  let cat;
  try { cat = await loadCatalog(); }
  catch (e) { return A('Le catalogue est momentanément indisponible. Vous pouvez parcourir la page Documents.', { src: 'Catalogue InfoCompta', actions: [docsLink('')] }); }
  const toks = tokensOf(q, DOC_STOP);
  if (!toks.length) {
    const cnt = {};
    cat.forEach(function (d) { cnt[d.categorie] = (cnt[d.categorie] || 0) + 1; });
    const names = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; }).slice(0, 6);
    return A('Le catalogue compte **' + cat.length + ' modèles** à télécharger, classés par thème. Dites-moi ce que vous cherchez, par exemple « contrat de bail » ou « procès-verbal ».',
      { src: 'Catalogue InfoCompta', actions: [docsLink('')], suggestions: names.map(function (c) { return { label: c, ask: 'document ' + c }; }) });
  }
  const scored = cat.map(function (d) {
    const tw = norm(d.titre).split(' ').map(stem), cw = norm(d.categorie).split(' ').map(stem);
    let s = 0; toks.forEach(function (t) { s += wordScore(tw, t) ? 5 : 0; s += wordScore(cw, t) ? 2 : 0; });
    return { d: d, s: s };
  }).filter(function (x) { return x.s >= 5; }).sort(function (a, b) { return b.s - a.s; });
  const term = q.replace(/[?!.]/g, '').trim();
  if (!scored.length) {
    return A('Je n’ai trouvé aucun modèle pour « ' + oneLine(term, 60) + ' ». Essayez un mot plus court, ou parcourez la page Documents.', { src: 'Catalogue InfoCompta', actions: [docsLink('')] });
  }
  const top = scored.slice(0, 5);
  const lines = ['**' + scored.length + ' modèle' + (scored.length > 1 ? 's' : '') + ' trouvé' + (scored.length > 1 ? 's' : '') + '**'];
  top.forEach(function (x) { lines.push('• ' + x.d.titre + ' : ' + money(x.d.prix) + (x.d.extension ? ' (' + String(x.d.extension).replace('.', '').toUpperCase() + ')' : '')); });
  if (scored.length > top.length) lines.push('• … et ' + (scored.length - top.length) + ' autre(s)');
  return A(lines.join('\n'), { src: 'Catalogue InfoCompta', actions: [docsLink(toks.join(' '))] });
}
function getSession() {
  try {
    const raw = localStorage.getItem(TOKEN_KEY); if (!raw) return null;
    const p = JSON.parse(raw);
    if (p.expires_at && p.expires_at * 1000 < Date.now()) return null;
    return (p.access_token && p.user && p.user.id) ? { token: p.access_token, uid: p.user.id } : null;
  } catch (e) { return null; }
}
async function answerDownloads() {
  const s = getSession();
  if (!s) return A('Connectez-vous pour voir les téléchargements qu’il vous reste.', { src: 'Votre compte', actions: [{ label: 'Se connecter', href: 'auth.html?redirect=' + encodeURIComponent(PAGE) }] });
  let rows;
  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/document_purchases?select=document_id,downloads_remaining&downloads_remaining=gt.0&user_id=eq.' + encodeURIComponent(s.uid),
      { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + s.token } });
    if (r.status === 401) return A('Votre session a expiré. Reconnectez-vous pour consulter vos téléchargements.', { src: 'Votre compte', actions: [{ label: 'Se connecter', href: 'auth.html?redirect=' + encodeURIComponent(PAGE) }] });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    rows = await r.json();
  } catch (e) {
    return A('Je n’ai pas pu lire vos achats pour le moment. Réessayez dans un instant.', { src: 'Votre compte' });
  }
  const docsLink = { label: 'Ouvrir les documents', href: 'documents.html' };
  if (!rows.length) return A('Il ne vous reste aucun téléchargement. Chaque achat donne 2 téléchargements du document.', { src: 'Votre compte', actions: [docsLink] });
  const tot = {}; rows.forEach(function (r) { tot[r.document_id] = (tot[r.document_id] || 0) + r.downloads_remaining; });
  let titles = {};
  try { (await loadCatalog()).forEach(function (d) { titles[d.id] = d.titre; }); } catch (e) {}
  const lines = ['**Vos téléchargements restants**'];
  Object.keys(tot).forEach(function (id) { lines.push('• ' + (titles[id] || id) + ' : ' + tot[id]); });
  return A(lines.join('\n'), { src: 'Votre compte', actions: [docsLink] });
}

/* ───────── Moteur de réponse ───────── */
let pending = null;
const HIST = (function () { try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); } catch (e) { return []; } })();

async function answer(text) {
  const n = norm(text);

  if (pending) {
    const amt = parseAmount(text);
    if (amt != null) { const t = pending; pending = null; const r = runTool(t, amt, n); if (r) return r; }
    else if (/^(non|annule|stop|laisse)/.test(n)) { pending = null; return A('D’accord, j’annule ce calcul.'); }
    else pending = null;
  }

  if (/^(bonjour|bonsoir|salut|hello|coucou|bjr)\b/.test(n) && n.split(' ').length <= 3) {
    return A('Bonjour. Que cherchez-vous : un compte, un taux, une échéance fiscale ou un document ?', { suggestions: starterSuggestions() });
  }
  if (/^(merci|ok merci|super merci|parfait)/.test(n)) return A('Avec plaisir. N’hésitez pas si vous avez une autre question.');
  if (/^(aide|menu|que sais tu faire|que peux tu faire|fonctions?)/.test(n)) {
    return A('Voici ce que je sais faire :\n• Trouver le compte à utiliser pour une opération\n• Expliquer un compte, son fonctionnement et ses écritures\n• Donner les taux, échéances et pénalités du CGI Bénin\n• Calculer l’ITS, la TVA, l’AIB, l’IRF et la TPS\n• Chercher un modèle de document\n• Indiquer vos téléchargements restants', { suggestions: starterSuggestions() });
  }

  if (/telechargements? restants?|mes telechargements|mes achats|combien de telechargements/.test(n)) return answerDownloads();

  const tool = detectTool(n);
  if (tool) {
    const amt = parseAmount(text);
    const infoFacet = /\btaux\b|bareme|echeance|penalite|exonere|definition|c est quoi/.test(n);
    if (amt != null && !infoFacet) { const r = runTool(tool, amt, n); if (r) return r; }
    if (!infoFacet && /calcul|simul|combien/.test(n)) {
      pending = tool; return A(TOOL_PROMPT[tool]);
    }
  }

  const explicit = n.match(/compte\s*(?:n\s*)?(\d{1,4}(?:-\d{2})?)\b/) || n.match(/^(\d{1,4})$/);
  const facet = detectFacet(n);
  if (explicit) {
    const r = facet && facet !== 'fiche' ? accountFacet(explicit[1], facet) : accountSummary(explicit[1]);
    if (r) return r;
    return A('Je ne trouve pas le compte ' + explicit[1] + ' dans le plan comptable. Vérifiez le numéro ou décrivez l’opération.', { src: 'Plan comptable OHADA', suggestions: starterSuggestions() });
  }
  if (_code && /\bce compte\b/.test(n)) {
    const r = facet && facet !== 'fiche' ? accountFacet(_code, facet) : accountSummary(_code);
    if (r) return r;
  }

  if (/(document|modele|fichier|telecharg|contrat|statut|convention|kit|logiciel|procuration|proces verbal)/.test(n) && !/telechargements? restants?/.test(n)) {
    return answerDocs(text);
  }

  const topic = detectTopic(n);
  const taxFacet = detectTaxFacet(n);
  const cueAccount = /compte|ecriture|debit|credit|comptabilis|enregistr|passer|imputer|journal/.test(n);

  if (/calendrier|echeancier|agenda fiscal|date limite|quand (declarer|payer|verser)|echeances?\b/.test(n) && !topic) {
    return answerTopic('calendrier_fiscal', null);
  }
  if (cueAccount) {
    const r = answerAccounts(text); if (r) return r;
  }
  if (topic) {
    const r = answerTopic(topic, topic === 'calendrier_fiscal' ? null : taxFacet); if (r) return r;
  }
  const r2 = answerAccounts(text); if (r2) return r2;

  if (CONFIG.useAI) { const ai = await askAI(text); if (ai) return ai; }

  return A('Je n’ai pas trouvé de réponse à « ' + oneLine(text, 70) + ' » dans le plan comptable ni dans les fiches fiscales. Reformulez avec le nom du compte, de l’impôt ou du document.',
    { suggestions: starterSuggestions(), actions: [{ label: 'Nous écrire', href: 'contact.html' }] });
}

function starterSuggestions() {
  return [
    { label: 'Quel compte pour un loyer ?', ask: 'Quel compte pour un loyer ?' },
    { label: 'Taux de TVA',                 ask: 'taux de TVA' },
    { label: 'Calculer l’ITS de 350 000',   ask: 'calculer ITS 350000' }
  ];
}

/* IA facultative : réponses limitées aux données du site */
async function askAI(text) {
  try {
    const ctx = [];
    searchAccounts(text, 3).forEach(function (h) {
      const d = DATA[h.it.parent]; if (!d) return;
      ctx.push('Compte ' + h.it.parent + ' — ' + d.libelle + '\n' + oneLine(d.contenu || '', 400));
    });
    const topic = detectTopic(norm(text));
    if (topic) ctx.push(TOPIC_TITLE[topic] + '\n' + renderSection(topic, null));
    if (!ctx.length) return null;
    const system = 'Tu es l’assistant du site InfoCompta (plan comptable OHADA et fiscalité du Bénin). Réponds uniquement à partir du CONTEXTE ci-dessous. ' +
      'Si l’information n’y figure pas, réponds exactement : « Je n’ai pas cette information dans la base InfoCompta. » N’invente aucun taux, montant ni article. ' +
      'Devise : FCFA. Réponds en français, de façon concise, et cite les comptes entre crochets, par exemple [401].\n\nCONTEXTE\n' + ctx.join('\n\n');
    const msgs = HIST.slice(-6).map(function (m) { return { role: m.r === 'u' ? 'user' : 'assistant', content: m.t }; });
    const resp = await fetch(CONFIG.aiEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ system: system, messages: msgs }) });
    if (!resp.ok) return null;
    const data = await resp.json();
    let out = '';
    if (Array.isArray(data.content)) data.content.forEach(function (b) { if (b.type === 'text') out += b.text; });
    else if (typeof data.content === 'string') out = data.content;
    return out ? A(out, { src: 'Base InfoCompta et assistant IA' }) : null;
  } catch (e) { return null; }
}

/* ───────── Interface ───────── */
let open = false, busy = false, restored = false;
const $ = function (id) { return document.getElementById(id); };

function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(HIST.slice(-MAX_STORED))); } catch (e) {} }

function addUser(text, persist) {
  const box = $('icw-messages');
  const d = document.createElement('div');
  d.className = 'icw-msg user';
  d.innerHTML = '<div class="icw-bubble"><p>' + esc(text) + '</p></div>';
  box.appendChild(d); box.scrollTop = box.scrollHeight;
  if (persist) { HIST.push({ r: 'u', t: text }); save(); }
}
function addBot(ans, persist) {
  const box = $('icw-messages');
  const d = document.createElement('div');
  d.className = 'icw-msg bot';
  let html = '<div class="icw-bubble">' + format(ans.text) + '</div>';
  if (ans.suggestions && ans.suggestions.length) {
    html += '<div class="icw-follow">' + ans.suggestions.map(function (s) { return '<button type="button" class="icw-pill" data-ask="' + esc(s.ask) + '">' + esc(s.label) + '</button>'; }).join('') + '</div>';
  }
  if (ans.actions && ans.actions.length) {
    html += '<div class="icw-follow">' + ans.actions.map(function (a) { return '<a class="icw-act" href="' + esc(a.href) + '"' + (/^compte-detail/.test(a.href) ? ' target="_blank" rel="noopener"' : '') + '>' + esc(a.label) + '</a>'; }).join('') + '</div>';
  }
  html += '<div class="icw-meta">' + (ans.src ? '<span>Source : ' + esc(ans.src) + '</span>' : '') +
          '<button type="button" class="icw-copy" data-copy>' + SVG.copy + '<span>Copier</span></button></div>';
  d.innerHTML = html;
  d._plain = plain(ans.text);
  box.appendChild(d); box.scrollTop = box.scrollHeight;
  if (persist) { HIST.push({ r: 'b', t: ans.text, s: ans.src, a: ans.actions, g: ans.suggestions }); save(); }
}
function showTyping() {
  const box = $('icw-messages'); const d = document.createElement('div');
  d.id = 'icw-typing'; d.className = 'icw-msg bot';
  d.innerHTML = '<div class="icw-typing"><span></span><span></span><span></span></div>';
  box.appendChild(d); box.scrollTop = box.scrollHeight;
}
function hideTyping() { const t = $('icw-typing'); if (t) t.remove(); }
function toast(msg) {
  const t = $('icw-toast'); if (!t) return;
  t.textContent = msg; t.classList.add('show'); setTimeout(function () { t.classList.remove('show'); }, 1800);
}
function copyText(text, btn) {
  const done = function () {
    btn.classList.add('copied'); btn.innerHTML = SVG.check + '<span>Copié</span>'; toast('Réponse copiée');
    setTimeout(function () { btn.classList.remove('copied'); btn.innerHTML = SVG.copy + '<span>Copier</span>'; }, 2000);
  };
  if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); }); }
  else fallbackCopy(text, done);
}
function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta); ta.focus(); ta.select();
  try { document.execCommand('copy'); cb(); } catch (e) {}
  document.body.removeChild(ta);
}

async function send(forced) {
  if (busy) return;
  const input = $('icw-input');
  const text = (forced != null ? forced : input.value).trim();
  if (!text) return;
  input.value = ''; input.style.height = 'auto';
  addUser(text, true);
  busy = true; $('icw-send').disabled = true; showTyping();
  let ans;
  try { const t0 = Date.now(); ans = await answer(text); const wait = 260 - (Date.now() - t0); if (wait > 0) await sleep(wait); }
  catch (e) { ans = A('Une erreur est survenue. Réessayez dans un instant.'); }
  hideTyping(); addBot(ans, true);
  busy = false; $('icw-send').disabled = false; input.focus();
}

function setOpen(v) {
  open = v;
  $('icw-panel').classList.toggle('open', v);
  $('icw-fab').setAttribute('aria-expanded', String(v));
  $('icw-dot').style.display = 'none';
  try { sessionStorage.setItem('icw_seen', '1'); } catch (e) {}
  if (v && !restored) {
    restored = true;
    HIST.forEach(function (m) {
      if (m.r === 'u') addUser(m.t, false);
      else addBot({ text: m.t, src: m.s, actions: m.a, suggestions: m.g }, false);
    });
  }
  if (v) setTimeout(function () { $('icw-input').focus(); }, 220);
}
function clearAll() {
  try { localStorage.removeItem(STORE_KEY); } catch (e) {}
  HIST.length = 0; pending = null; restored = true;
  $('icw-messages').innerHTML = '';
  addBot(welcome(), false);
}
function welcome() {
  if (_code && DATA[_code]) {
    return A('Vous consultez le compte [' + _code + '] ' + DATA[_code].libelle + '. Je peux détailler son fonctionnement, donner des exemples d’écritures ou chercher un autre compte.');
  }
  return A('Je retrouve un compte du plan OHADA, un taux ou une échéance fiscale du Bénin, un modèle de document, et je calcule l’ITS, la TVA, l’AIB, l’IRF et la TPS.', { suggestions: starterSuggestions() });
}
function chipsHtml() {
  const c = function (label, attr, val, cur) { return '<button type="button" class="icw-chip' + (cur ? ' is-current' : '') + '" data-' + attr + '="' + esc(val) + '">' + esc(label) + '</button>'; };
  const common = c('Quel compte ?', 'fill', 'Quel compte pour ') + c('Document', 'fill', 'Je cherche un modèle de ') +
    c('Calendrier fiscal', 'ask', 'calendrier fiscal') + c('Calculer l’ITS', 'ask', 'calculer ITS') +
    c('Calculer la TVA', 'ask', 'calculer TVA') + c('Mes téléchargements', 'ask', 'mes téléchargements');
  if (_code && DATA[_code]) {
    return c('Ce compte', 'ask', 'explique le compte ' + _code, true) + c('Fonctionnement', 'ask', 'fonctionnement du compte ' + _code) +
      c('Écritures', 'ask', 'exemples d’écritures du compte ' + _code) + c('Comptes liés', 'ask', 'comptes liés au compte ' + _code) +
      c('Exclusions', 'ask', 'exclusions du compte ' + _code) + common;
  }
  return common;
}

function build() {
  prepareData();
  const st = document.createElement('style'); st.textContent = STYLE; document.head.appendChild(st);

  const root = document.createElement('div'); root.className = 'icw-root';
  root.innerHTML =
    '<button id="icw-fab" type="button" aria-label="Ouvrir l’assistant InfoCompta" aria-expanded="false">' + SVG.chat + '<span id="icw-dot"></span></button>' +
    '<div id="icw-panel" role="dialog" aria-label="Assistant InfoCompta">' +
      '<div class="icw-head">' +
        '<div class="icw-badge">IC</div>' +
        '<div class="icw-title"><strong>Assistant InfoCompta</strong><span>Plan comptable et fiscalité du Bénin</span></div>' +
        '<button type="button" class="icw-hbtn" id="icw-clear" title="Effacer la conversation" aria-label="Effacer la conversation">' + SVG.trash + '</button>' +
        '<button type="button" class="icw-hbtn" id="icw-close" title="Fermer" aria-label="Fermer">' + SVG.close + '</button>' +
      '</div>' +
      '<div class="icw-chips" id="icw-chips">' + chipsHtml() + '</div>' +
      '<div id="icw-messages" aria-live="polite"></div>' +
      '<div class="icw-input-area">' +
        '<textarea id="icw-input" rows="1" maxlength="600" placeholder="' + (_code ? 'Posez une question sur le compte ' + esc(_code) : 'Décrivez une opération, un impôt ou un document') + '"></textarea>' +
        '<button type="button" id="icw-send" aria-label="Envoyer">' + SVG.send + '</button>' +
      '</div>' +
      '<div class="icw-foot">Informations indicatives. Vérifiez dans le CGI officiel.</div>' +
    '</div>' +
    '<div id="icw-toast"></div>';
  document.body.appendChild(root);

  addBot(welcome(), false);

  $('icw-fab').addEventListener('click', function () { setOpen(!open); });
  $('icw-close').addEventListener('click', function () { setOpen(false); });
  $('icw-clear').addEventListener('click', clearAll);
  $('icw-send').addEventListener('click', function () { send(); });
  const input = $('icw-input');
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
  input.addEventListener('input', function () { this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 100) + 'px'; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) setOpen(false); });

  const onPick = function (e) {
    const b = e.target.closest('[data-ask],[data-fill],[data-copy]'); if (!b) return;
    if (b.hasAttribute('data-copy')) { const msg = b.closest('.icw-msg'); if (msg && msg._plain != null) copyText(msg._plain, b); return; }
    if (b.hasAttribute('data-ask')) { send(b.getAttribute('data-ask')); return; }
    const inp = $('icw-input'); inp.value = b.getAttribute('data-fill'); inp.focus();
  };
  $('icw-chips').addEventListener('click', onPick);
  $('icw-messages').addEventListener('click', onPick);

  let seen = false; try { seen = sessionStorage.getItem('icw_seen') === '1'; } catch (e) {}
  if (!seen) setTimeout(function () { if (!open) $('icw-dot').style.display = 'block'; }, 3000);

  if (window.__ICW_TEST__) window.__ICW_TEST__.answer = answer;
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
else build();

})();
