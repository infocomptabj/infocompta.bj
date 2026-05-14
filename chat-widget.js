// ═══════════════════════════════════════════════════════════════
//  chat-widget.js — InfoCompta  (version 3.0)
//
//  Basé sur le widget original de compte-detail.html
//  Améliorations v3 :
//  ✔ Bouton "Copier" sur chaque réponse de l'assistant (1 clic)
//  ✔ Toast de confirmation après copie
//  ✔ Compatible avec toutes les pages du site (pas seulement compte-detail)
//  ✔ Détection automatique du compte affiché (URL ?code=XXX)
//  ✔ Chips adaptées selon la page
//  ✔ Historique localStorage par page
//  ✔ Formatage : **gras**, [comptes] → liens cliquables
//
//  INSTALLATION (dans chaque page HTML, avant </body>) :
//  <script src="comptes-data.js"></script>
//  <script src="Docs-context.js"></script>
//  <script src="chat-widget.js"></script>
//
//  SUPPRIMEZ l'ancien bloc WIDGET IA de vos fichiers HTML
//  (le <button id="ic-fab">, le <div id="ic-panel"> et le <script>)
// ═══════════════════════════════════════════════════════════════

(function () {
'use strict';

// ── Variables CSS reprises de la charte InfoCompta ───────────────
const STYLE = `
  :root {
    --ic-navy:    #0f1f35;
    --ic-navy-lt: #1a3450;
    --ic-gold:    #c4933a;
    --ic-gold-lt: #e8c97a;
    --ic-gold-xs: rgba(196,147,58,.10);
    --ic-cream:   #faf9f6;
    --ic-surface: #ffffff;
    --ic-border:  #e4e0d8;
    --ic-text:    #1a1a2e;
    --ic-muted:   #7a7565;
  }

  #ic-fab {
    position: fixed; bottom: 24px; right: 24px; z-index: 9998;
    width: 54px; height: 54px; border-radius: 50%;
    background: var(--ic-navy); border: 2px solid var(--ic-gold);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px rgba(15,31,53,.35);
    transition: transform .2s, box-shadow .2s;
  }
  #ic-fab:hover { transform: scale(1.07); box-shadow: 0 8px 30px rgba(15,31,53,.45); }
  #ic-fab svg { width: 22px; height: 22px; fill: var(--ic-gold-lt); }
  #ic-notif {
    position: absolute; top: -3px; right: -3px;
    width: 13px; height: 13px; border-radius: 50%;
    background: #e53e3e; border: 2px solid #fff; display: none;
    animation: ic-pulse 2s infinite;
  }
  @keyframes ic-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }

  #ic-panel {
    position: fixed; bottom: 88px; right: 24px; z-index: 9997;
    width: 370px; height: 580px;
    background: var(--ic-surface);
    border: 1px solid var(--ic-border); border-radius: 14px;
    box-shadow: 0 12px 48px rgba(15,31,53,.22);
    display: flex; flex-direction: column; overflow: hidden;
    opacity: 0; pointer-events: none;
    transform: translateY(14px) scale(0.97);
    transition: opacity .22s, transform .22s;
    font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
  }
  #ic-panel.open { opacity: 1; pointer-events: all; transform: translateY(0) scale(1); }

  .ic-header {
    background: var(--ic-navy); padding: 12px 14px;
    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }
  .ic-header-logo svg { width: 18px; height: 18px; fill: var(--ic-gold-lt); flex-shrink: 0; }
  .ic-header-info { flex: 1; min-width: 0; }
  .ic-header-info h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 15px; font-weight: 700; color: #fff; line-height: 1.2;
  }
  .ic-header-info p { font-size: 10.5px; color: var(--ic-gold-lt); display: flex; align-items: center; gap: 5px; margin-top: 2px; }
  .ic-online { width: 6px; height: 6px; background: #5c9e5c; border-radius: 50%; animation: ic-blink 2s infinite; }
  @keyframes ic-blink { 0%,100%{opacity:1} 50%{opacity:.35} }
  .ic-header-btns { display: flex; gap: 6px; }
  .ic-hbtn {
    background: rgba(255,255,255,.10); border: none; color: rgba(255,255,255,.75);
    cursor: pointer; width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; transition: background .18s; flex-shrink: 0;
  }
  .ic-hbtn:hover { background: rgba(255,255,255,.22); color: #fff; }

  .ic-chips {
    padding: 8px 12px; background: var(--ic-cream);
    border-bottom: 1px solid var(--ic-border);
    display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; flex-shrink: 0;
  }
  .ic-chips::-webkit-scrollbar { display: none; }
  .ic-chip {
    flex-shrink: 0; padding: 4px 11px;
    background: var(--ic-surface); border: 1px solid var(--ic-border);
    border-radius: 20px; font-size: 11px; font-weight: 500;
    color: var(--ic-navy); cursor: pointer; white-space: nowrap;
    transition: background .18s, color .18s, border-color .18s;
  }
  .ic-chip:hover, .ic-chip-current {
    background: var(--ic-navy) !important;
    color: var(--ic-gold-lt) !important;
    border-color: var(--ic-navy) !important;
  }

  .ic-messages {
    flex: 1; overflow-y: auto; padding: 14px 13px;
    display: flex; flex-direction: column; gap: 11px;
    scroll-behavior: smooth; background: #faf9f6;
  }
  .ic-messages::-webkit-scrollbar { width: 3px; }
  .ic-messages::-webkit-scrollbar-thumb { background: var(--ic-border); border-radius: 3px; }

  .ic-msg { display: flex; gap: 8px; animation: ic-up .25s ease; }
  @keyframes ic-up { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:none} }
  .ic-msg.user { flex-direction: row-reverse; }

  .ic-avatar {
    width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; align-self: flex-end;
  }
  .ic-msg.ai   .ic-avatar { background: var(--ic-navy); color: var(--ic-gold-lt); font-family: 'Cormorant Garamond', Georgia, serif; font-size: 14px; }
  .ic-msg.user .ic-avatar { background: var(--ic-gold); color: #fff; font-size: 13px; }

  .ic-msg-body { display: flex; flex-direction: column; gap: 4px; max-width: 82%; }
  .ic-msg.user .ic-msg-body { align-items: flex-end; }

  .ic-bubble { padding: 9px 13px; border-radius: 12px; font-size: 13px; line-height: 1.65; word-break: break-word; }
  .ic-msg.ai   .ic-bubble { background: var(--ic-surface); color: var(--ic-text); border: 1px solid var(--ic-border); border-bottom-left-radius: 3px; box-shadow: 0 1px 4px rgba(15,31,53,.06); }
  .ic-msg.user .ic-bubble { background: var(--ic-navy); color: rgba(255,255,255,.92); border-bottom-right-radius: 3px; }

  .ic-ctag {
    display: inline-block; font-family: 'Courier New', monospace;
    font-size: 11px; font-weight: 700; padding: 1px 6px;
    background: var(--ic-gold-xs); border: 1px solid rgba(196,147,58,.3);
    border-radius: 3px; color: var(--ic-gold); text-decoration: none;
  }
  .ic-ctag:hover { background: rgba(196,147,58,.2); }

  .ic-bubble strong { font-weight: 700; }
  .ic-bubble em     { font-style: italic; }
  .ic-bubble ul, .ic-bubble ol { padding-left: 16px; margin: 5px 0; }
  .ic-bubble li { margin-bottom: 3px; }
  .ic-bubble h3 { font-size: 13px; font-weight: 700; margin: 7px 0 3px; color: var(--ic-navy); }
  .ic-bubble hr { border: none; border-top: 1px solid var(--ic-border); margin: 7px 0; }
  .ic-bubble code:not(pre code) { font-family: 'Courier New', monospace; font-size: 11.5px; background: rgba(0,0,0,.06); padding: 1px 5px; border-radius: 3px; }
  .ic-bubble pre { background: #1e2530; color: #e2e8f0; border-radius: 7px; padding: 10px 12px; margin: 7px 0; overflow-x: auto; font-size: 12px; line-height: 1.6; font-family: 'Courier New', monospace; white-space: pre; }

  .ic-source { font-size: 10px; color: var(--ic-muted); display: flex; align-items: center; gap: 4px; }
  .ic-source-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--ic-gold); flex-shrink: 0; }
  .ic-source a { color: var(--ic-gold); text-decoration: none; }

  /* ════ BOUTON COPIER ════ */
  .ic-copy-btn {
    display: inline-flex; align-items: center; gap: 4px;
    background: none; border: 1px solid var(--ic-border);
    color: var(--ic-muted); cursor: pointer;
    font-size: 11px; padding: 3px 10px; border-radius: 20px;
    transition: all .15s; font-family: inherit; margin-top: 2px;
  }
  .ic-copy-btn:hover { background: var(--ic-gold-xs); border-color: var(--ic-gold); color: var(--ic-gold); }
  .ic-copy-btn.copied { background: #d4edda; border-color: #5c9e5c; color: #2d6a35; }
  .ic-copy-btn svg { width: 11px; height: 11px; fill: currentColor; flex-shrink: 0; }

  .ic-typing { display: flex; gap: 4px; padding: 10px 13px; background: var(--ic-surface); border: 1px solid var(--ic-border); border-radius: 12px; border-bottom-left-radius: 3px; width: fit-content; }
  .ic-typing span { width: 6px; height: 6px; background: var(--ic-gold); border-radius: 50%; animation: ic-bounce .9s infinite; }
  .ic-typing span:nth-child(2) { animation-delay: .15s; }
  .ic-typing span:nth-child(3) { animation-delay: .30s; }
  @keyframes ic-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-7px)} }

  .ic-input-area { padding: 10px 13px; background: var(--ic-surface); border-top: 1px solid var(--ic-border); display: flex; align-items: flex-end; gap: 8px; flex-shrink: 0; }
  #ic-input {
    flex: 1; border: 1.5px solid var(--ic-border); border-radius: 6px;
    padding: 9px 12px; font-family: 'DM Sans', 'Segoe UI', sans-serif; font-size: 13px;
    color: var(--ic-text); resize: none; outline: none; max-height: 100px;
    line-height: 1.5; background: var(--ic-cream); transition: border-color .18s;
  }
  #ic-input:focus { border-color: var(--ic-gold); }
  #ic-input::placeholder { color: var(--ic-muted); }
  #ic-send {
    width: 38px; height: 38px; flex-shrink: 0; border-radius: 6px;
    background: var(--ic-navy); border: 1px solid var(--ic-gold);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: transform .18s, background .18s;
  }
  #ic-send:hover    { background: var(--ic-navy-lt); transform: scale(1.06); }
  #ic-send:disabled { opacity: .45; cursor: not-allowed; transform: none; }
  #ic-send svg { width: 15px; height: 15px; fill: var(--ic-gold-lt); }

  .ic-footer { text-align: center; font-size: 9.5px; color: var(--ic-muted); padding: 5px 0 7px; background: var(--ic-surface); border-top: 1px solid rgba(0,0,0,.04); flex-shrink: 0; }
  .ic-footer span { color: var(--ic-gold); font-weight: 600; }

  /* Toast */
  #ic-toast {
    position: fixed; bottom: 96px; right: 28px; z-index: 99999;
    background: var(--ic-navy); color: #fff;
    padding: 7px 15px; border-radius: 7px; font-size: 12px;
    font-family: 'DM Sans', sans-serif; border: 1px solid var(--ic-gold);
    opacity: 0; pointer-events: none; transition: opacity .2s;
  }
  #ic-toast.show { opacity: 1; }

  @media (max-width: 430px) {
    #ic-panel { width: calc(100vw - 20px); right: 10px; height: 80vh; bottom: 80px; }
    #ic-fab   { bottom: 16px; right: 16px; }
  }
`;

// ── SVG Icons ──────────────────────────────────────────────────
const SVG = {
  send:  `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`,
  close: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`,
  copy:  `<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`,
  check: `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
  bot:   `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/></svg>`,
  logo:  `<svg viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9 12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>`,
};

// ── État ───────────────────────────────────────────────────────
const _code          = new URLSearchParams(window.location.search).get('code') || '';
const IC_STORAGE_KEY = 'infocompta_chat_' + window.location.pathname + (_code ? '_' + _code : '');
const IC_MAX_STORED  = 20;
const IC_HISTORY_MAX = 14;
let icOpen = false, icBusy = false, icRestored = false;
let icHist = icLoadHistory();

// ── Persistance ────────────────────────────────────────────────
function icSaveHistory(h) { try { localStorage.setItem(IC_STORAGE_KEY, JSON.stringify(h.slice(-IC_MAX_STORED))); } catch(_) {} }
function icLoadHistory()  { try { const r = localStorage.getItem(IC_STORAGE_KEY); return r ? JSON.parse(r) : []; } catch(_) { return []; } }

// ── Formatage ──────────────────────────────────────────────────
function icFormat(text) {
  let h = text
    .replace(/```[\w]*\n?([\s\S]*?)```/g, (_, c) => `<pre>${c.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>`)
    .replace(/\n/g, '<br>')
    .replace(/\[(\d+[a-zA-Z0-9\-]*)\]/g, (_, c) => `<a href="compte-detail.html?code=${c}" class="ic-ctag" target="_blank">[${c}]</a>`)
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g,     '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,         '<em>$1</em>')
    .replace(/^### (.+?)(<br>|$)/gm,'<h3>$1</h3>')
    .replace(/^---(<br>)?/gm,      '<hr>');
  return h;
}

// ── Copier ─────────────────────────────────────────────────────
function icCopy(text, btn) {
  const plain = text.replace(/```[\w]*\n?([\s\S]*?)```/g,'$1').replace(/\*\*/g,'').replace(/\*/g,'');
  const done = () => {
    btn.classList.add('copied');
    btn.innerHTML = SVG.check + ' Copié !';
    showToast('✓ Réponse copiée');
    setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = SVG.copy + ' Copier'; }, 2200);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(plain).then(done).catch(() => fallbackCopy(plain, done));
  } else {
    fallbackCopy(plain, done);
  }
}
function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta); ta.focus(); ta.select();
  try { document.execCommand('copy'); cb(); } catch(_) {}
  document.body.removeChild(ta);
}
function showToast(msg) {
  const t = document.getElementById('ic-toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

// ── Contextes OHADA + fiscal ───────────────────────────────────
function icBuildContext() {
  const data = (typeof comptesData !== 'undefined') ? comptesData : {};
  const lines = [];
  for (const [c, d] of Object.entries(data)) {
    let line = `[${c}] ${d.libelle}`;
    if (d.nature) line += ` | Nature: ${d.nature}`;
    if (d.sens)   line += ` | Sens: ${d.sens}`;
    if (d.subdivisions) line += ` | Subdivisions: ` + Object.entries(d.subdivisions).map(([sc,sl])=>`${sc}:${sl}`).join(', ');
    lines.push(line);
  }
  const full = lines.join('\n');
  return full.length > 3000 ? full.slice(0,3000) + '\n...[suite sur le site]' : full;
}

function icFindRelevant(question) {
  const data = (typeof comptesData !== 'undefined') ? comptesData : {};
  const q    = question.toLowerCase().replace(/comptes?\s*/gi,'').replace(/\b(la|le|les|de|du|des)\b/gi,'').trim();
  const scores = [];
  if (_code && data[_code]) scores.push({ code:_code, score:200, c:data[_code] });
  for (const [code,c] of Object.entries(data)) {
    if (code === _code) continue;
    let score = 0;
    const hay = (code+' '+c.libelle+' '+JSON.stringify(c.subdivisions||'')+' '+(c.contenu||'')).toLowerCase();
    if (q.includes(code))                    score += 100;
    if (c.libelle.toLowerCase().includes(q)) score += 50;
    q.split(/\s+/).forEach(w => { if (w.length > 2 && hay.includes(w)) score += 10; });
    if (score > 0) scores.push({ code, score, c });
  }
  scores.sort((a,b) => b.score - a.score);
  return scores.slice(0,4);
}

function icBuildDocsContext() {
  if (typeof DOCS_CONTEXT === 'undefined') return '(données fiscales non chargées)';
  try {
    const cgi = DOCS_CONTEXT.cgi || {};
    let ctx = '';
    for (const key of Object.keys(cgi)) {
      if (key === 'meta') continue;
      const item = cgi[key];
      if (typeof item !== 'object') continue;
      const def  = item.definition || item.description || '';
      const taux = item.taux || item.taux_normal || item.taux_unique || '';
      ctx += `**${key}**\n`;
      if (def)  ctx += `${String(def).slice(0,200)}\n`;
      if (taux) ctx += `Taux : ${Array.isArray(taux) ? taux.map(t=>`${t.cas||''} → ${t.taux}`).join(' | ') : taux}\n`;
      ctx += '\n';
    }
    return ctx.slice(0,7000);
  } catch(_) { return '(erreur données fiscales)'; }
}

function icSystem() {
  const label = _code && (typeof comptesData !== 'undefined') && comptesData[_code]
    ? `\n\n## Contexte : l'utilisateur consulte la fiche du compte [${_code}] — ${comptesData[_code].libelle}`
    : '';
  return `Tu es l'assistant comptable officiel du site InfoCompta, spécialisé OHADA et fiscalité béninoise.${label}

## Devise : FCFA exclusivement. Jamais €, $ ou autre devise.

### 1. Plan comptable OHADA (PRIORITÉ ABSOLUE)
${icBuildContext()}

### 2. Fiscalité Bénin — CGI 2026 + SYSCOHADA (PRIORITÉ HAUTE)
${icBuildDocsContext()}

### 3. Connaissances générales (SECONDAIRE — signaler si utilisé)

## Règles
1. Répondre en français, ton professionnel.
2. Citer les comptes entre crochets : [401], [521], etc.
3. Rester concis et structuré.
4. Terminer par : "📂 Source : plan OHADA InfoCompta" ou "📋 Source : CGI Bénin 2026" ou "🌐 Source : connaissances générales".`;
}

// ── Construction du DOM ────────────────────────────────────────
function buildWidget() {
  const style = document.createElement('style');
  style.textContent = STYLE;
  document.head.appendChild(style);

  const chipsHTML = _code
    ? `<div class="ic-chip ic-chip-current" data-action="chip-code">📊 Compte ${_code}</div>
       <div class="ic-chip" data-action="chip">🔁 Fonctionnement</div>
       <div class="ic-chip" data-action="chip">📝 Exemples d'écritures</div>
       <div class="ic-chip" data-action="chip">🔗 Comptes liés</div>
       <div class="ic-chip" data-action="chip">📋 TVA OHADA</div>`
    : `<div class="ic-chip" data-action="chip">🧾 AIB Bénin</div>
       <div class="ic-chip" data-action="chip">💰 Déclaration TVA</div>
       <div class="ic-chip" data-action="chip">👷 Paie DGI/CNSS</div>
       <div class="ic-chip" data-action="chip">📊 IS / IBA</div>
       <div class="ic-chip" data-action="chip">🏠 IRF — loyers</div>`;

  const msgBienvenue = _code
    ? `Bonjour 👋 Je suis l'assistant comptable d'<strong>InfoCompta</strong>.<br><br>Vous consultez la fiche du compte <strong>${_code}</strong>. Je peux vous expliquer son fonctionnement, donner des exemples d'écritures ou répondre à toute question comptable.`
    : `Bonjour 👋 Je suis l'assistant comptable d'<strong>InfoCompta</strong>.<br><br>Je connais le plan comptable OHADA et la fiscalité béninoise (CGI 2026). Posez-moi vos questions !`;

  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button id="ic-fab" aria-label="Ouvrir l'assistant comptable">
      <div id="ic-notif"></div>${SVG.bot}
    </button>

    <div id="ic-panel">
      <div class="ic-header">
        <div class="ic-header-logo">${SVG.logo}</div>
        <div class="ic-header-info">
          <h3>Assistant InfoCompta</h3>
          <p><span class="ic-online"></span> Plan OHADA · Recherche web</p>
        </div>
        <div class="ic-header-btns">
          <button class="ic-hbtn" id="ic-clear-btn" title="Effacer la conversation">${SVG.trash}</button>
          <button class="ic-hbtn" id="ic-close-btn" title="Fermer">${SVG.close}</button>
        </div>
      </div>
      <div class="ic-chips" id="ic-chips">${chipsHTML}</div>
      <div class="ic-messages" id="ic-messages">
        <div class="ic-msg ai">
          <div class="ic-avatar">I</div>
          <div class="ic-msg-body">
            <div class="ic-bubble">${msgBienvenue}</div>
            <div class="ic-source"><span class="ic-source-dot"></span> InfoCompta · Plan OHADA intégré</div>
          </div>
        </div>
      </div>
      <div class="ic-input-area">
        <textarea id="ic-input" rows="1"
          placeholder="${_code ? `Posez votre question sur le compte ${_code}…` : 'Posez votre question comptable ou fiscale…'}"
          maxlength="1000"></textarea>
        <button id="ic-send" aria-label="Envoyer">${SVG.send}</button>
      </div>
      <div class="ic-footer">Propulsé par <span>Groq · Llama 3.3</span> · Données OHADA <span>InfoCompta</span></div>
    </div>

    <div id="ic-toast"></div>
  `;
  document.body.appendChild(wrap);

  document.getElementById('ic-fab').addEventListener('click', icToggle);
  document.getElementById('ic-close-btn').addEventListener('click', () => setOpen(false));
  document.getElementById('ic-clear-btn').addEventListener('click', icClearHistory);
  document.getElementById('ic-send').addEventListener('click', icSend);
  document.getElementById('ic-input').addEventListener('keydown', e => { if (e.key==='Enter'&&!e.shiftKey){e.preventDefault();icSend();} });
  document.getElementById('ic-input').addEventListener('input', function() { this.style.height='auto'; this.style.height=Math.min(this.scrollHeight,100)+'px'; });
  document.getElementById('ic-chips').addEventListener('click', e => {
    const chip = e.target.closest('.ic-chip'); if (!chip) return;
    const inp = document.getElementById('ic-input');
    inp.value = chip.dataset.action === 'chip-code'
      ? `Expliquez-moi en détail le compte ${_code} : son rôle, son fonctionnement et des exemples d'écritures.`
      : 'Expliquez-moi : ' + chip.textContent.trim().replace(/^[\p{Emoji}\s]+/u,'') + (_code ? ` pour le compte ${_code}` : '');
    icSend();
  });

  setTimeout(() => { if (!icOpen) document.getElementById('ic-notif').style.display='block'; }, 3000);
}

// ── Ouvrir / fermer ────────────────────────────────────────────
function icToggle() { setOpen(!icOpen); }
function setOpen(open) {
  icOpen = open;
  document.getElementById('ic-panel').classList.toggle('open', open);
  document.getElementById('ic-notif').style.display = 'none';
  if (open && !icRestored) {
    icRestored = true;
    if (icHist.length > 0) {
      document.getElementById('ic-messages').innerHTML = '';
      icHist.forEach(m => {
        if (m.role === 'user') icAppend('user', m.content.replace(/</g,'&lt;').replace(/>/g,'&gt;'));
        else                   icAppendBot(icFormat(m.content), '📂 Source : plan OHADA InfoCompta', m.content);
      });
    }
  }
  if (open) setTimeout(() => document.getElementById('ic-input').focus(), 300);
}

function icClearHistory() {
  try { localStorage.removeItem(IC_STORAGE_KEY); } catch(_) {}
  icHist = []; icRestored = true;
  document.getElementById('ic-messages').innerHTML = '';
  icAppend('ai', 'Conversation effacée. Comment puis-je vous aider ?', 'InfoCompta · Plan OHADA intégré');
}

// ── Affichage messages ─────────────────────────────────────────
function icAppend(role, html, source) {
  const cont = document.getElementById('ic-messages');
  const isAI = role === 'ai';
  const div  = document.createElement('div');
  div.className = `ic-msg ${role}`;
  div.innerHTML = `
    <div class="ic-avatar">${isAI ? 'I' : '👤'}</div>
    <div class="ic-msg-body">
      <div class="ic-bubble">${html}</div>
      ${source ? `<div class="ic-source"><span class="ic-source-dot"></span>${source}</div>` : ''}
    </div>`;
  cont.appendChild(div);
  cont.scrollTop = cont.scrollHeight;
}

/** Message bot + bouton COPIER */
function icAppendBot(html, source, rawText) {
  const cont  = document.getElementById('ic-messages');
  const div   = document.createElement('div');
  const btnId = 'icopy_' + Date.now() + '_' + Math.random().toString(36).slice(2,6);
  div.className = 'ic-msg ai';
  div.innerHTML = `
    <div class="ic-avatar">I</div>
    <div class="ic-msg-body">
      <div class="ic-bubble">${html}</div>
      ${source ? `<div class="ic-source"><span class="ic-source-dot"></span>${source}</div>` : ''}
      <button class="ic-copy-btn" id="${btnId}">${SVG.copy} Copier</button>
    </div>`;
  cont.appendChild(div);
  cont.scrollTop = cont.scrollHeight;
  document.getElementById(btnId).addEventListener('click', function() { icCopy(rawText, this); });
}

function icShowTyping() {
  const cont = document.getElementById('ic-messages');
  const d = document.createElement('div');
  d.className = 'ic-msg ai'; d.id = 'ic-typing-row';
  d.innerHTML = `<div class="ic-avatar">I</div><div class="ic-typing"><span></span><span></span><span></span></div>`;
  cont.appendChild(d); cont.scrollTop = cont.scrollHeight;
}
function icRemoveTyping() { const el = document.getElementById('ic-typing-row'); if (el) el.remove(); }

// ── Envoi ──────────────────────────────────────────────────────
async function icSend() {
  if (icBusy) return;
  const input = document.getElementById('ic-input');
  const text  = input.value.trim();
  if (!text) return;

  input.value = ''; input.style.height = 'auto';
  icAppend('user', text.replace(/</g,'&lt;').replace(/>/g,'&gt;'));
  icHist.push({ role:'user', content:text });
  icSaveHistory(icHist);

  // Enrichissement avec données OHADA locales
  const relevant = icFindRelevant(text);
  let enriched   = text;
  if (relevant.length > 0) {
    const detail = relevant.map(r => {
      const d = r.c;
      let info = `Compte ${r.code} — ${d.libelle}`;
      if (d.contenu) info += `\nContenu: ${d.contenu.slice(0,200)}`;
      if (d.sens)    info += `\nSens: ${d.sens}`;
      if (d.fonctionnement) {
        if (d.fonctionnement.debit?.length)  info += `\nDébit: ${d.fonctionnement.debit.slice(0,2).join('; ')}`;
        if (d.fonctionnement.credit?.length) info += `\nCrédit: ${d.fonctionnement.credit.slice(0,2).join('; ')}`;
      }
      return info;
    }).join('\n\n');
    enriched = `Question : ${text}\n\n[Données OHADA pertinentes du site]\n${detail}`;
  }

  icBusy = true;
  document.getElementById('ic-send').disabled = true;
  icShowTyping();

  const msgs = icHist.slice(-IC_HISTORY_MAX).map((m,i,arr) =>
    (i===arr.length-1 && m.role==='user') ? {role:'user', content:enriched} : m
  );

  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: icSystem(), messages: msgs }),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    icRemoveTyping();

    let replyText = '', usedWeb = false;
    if (data.content) {
      if (Array.isArray(data.content)) {
        for (const b of data.content) {
          if (b.type === 'text') replyText += b.text;
          if (b.type === 'tool_use' && b.name === 'web_search') usedWeb = true;
        }
      } else if (typeof data.content === 'string') {
        replyText = data.content;
      }
    }
    if (!replyText) replyText = "Désolé, je n'ai pas pu générer de réponse. Veuillez réessayer.";

    const src = usedWeb ? '🌐 Plan OHADA InfoCompta + recherche web' : '📂 Source : plan OHADA InfoCompta';
    icAppendBot(icFormat(replyText), src, replyText);
    icHist.push({ role:'assistant', content:replyText });
    if (icHist.length > IC_HISTORY_MAX) icHist.splice(0, icHist.length - IC_HISTORY_MAX);
    icSaveHistory(icHist);

  } catch(err) {
    icRemoveTyping();
    icAppendBot('⚠️ Impossible de joindre l\'assistant. Vérifiez votre connexion et réessayez.', null, '');
  }

  icBusy = false;
  document.getElementById('ic-send').disabled = false;
  document.getElementById('ic-input').focus();
}

// ── Init ───────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildWidget);
} else {
  buildWidget();
}

})();
