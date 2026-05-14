// ═══════════════════════════════════════════════════════════════
//  chat-widget.js — InfoCompta
//  Widget chat complet avec :
//  ✔ Interface fidèle à la charte InfoCompta
//  ✔ Bouton "Copier" sur chaque réponse de l'assistant
//  ✔ Rendu Markdown (gras, listes, blocs de code)
//  ✔ Suggestions de questions rapides
//  ✔ Indicateur de frappe animé
//  ✔ Historique de conversation (14 derniers messages)
//  ✔ Responsive mobile/desktop
//
//  INSTALLATION :
//  1. Copiez ce fichier dans votre projet (ex: /public/chat-widget.js)
//  2. Ajoutez dans votre page HTML :
//     <script src="/chat-widget.js"></script>
//  3. Le widget s'initialise automatiquement au chargement de la page.
//
//  CONFIGURATION (ligne ~30) :
//  - API_URL    : URL de votre API backend
//  - SITE_NAME  : Nom affiché dans le header
//  - ACCENT     : Couleur principale
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────────────────
  const CONFIG = {
    API_URL:    '/api/chat',
    SITE_NAME:  'Assistant InfoCompta',
    SUBTITLE:   '📋 Plan OHADA · Recherche web',
    ACCENT:     '#1a6b3a',       // vert InfoCompta
    ACCENT_L:   '#e8f5ee',       // vert clair
    ACCENT_D:   '#124d29',       // vert foncé
    BOT_AVATAR: '🧾',
    MAX_HIST:   14,
    SUGGESTIONS: [
      'À quoi sert le compte 401 ?',
      'Qu\'est-ce que l\'AIB ?',
      'Comment déclarer la TVA ?',
      'Écritures de paie DGI/CNSS',
      'Qu\'est-ce que l\'IRF ?',
      'Taux de l\'IS au Bénin ?',
    ],
  };

  // ── État global ────────────────────────────────────────────────
  let isOpen    = false;
  let isLoading = false;
  let history   = [];   // { role: 'user'|'assistant', content: string }[]

  // ── Injection du CSS ───────────────────────────────────────────
  const CSS = `
    /* ── Reset & variables ── */
    #ic-widget * { box-sizing: border-box; margin: 0; padding: 0; }
    #ic-widget {
      --ic-accent:   ${CONFIG.ACCENT};
      --ic-accent-l: ${CONFIG.ACCENT_L};
      --ic-accent-d: ${CONFIG.ACCENT_D};
      --ic-radius:   16px;
      --ic-shadow:   0 8px 40px rgba(0,0,0,0.18);
      --ic-font:     'Segoe UI', system-ui, sans-serif;
      font-family: var(--ic-font);
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
    }

    /* ── Bouton flottant ── */
    #ic-fab {
      width: 58px; height: 58px;
      border-radius: 50%;
      background: var(--ic-accent);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 26px;
      box-shadow: var(--ic-shadow);
      transition: transform .2s, box-shadow .2s;
      position: relative;
    }
    #ic-fab:hover { transform: scale(1.08); box-shadow: 0 12px 48px rgba(0,0,0,0.25); }
    #ic-fab:active { transform: scale(0.96); }
    #ic-fab-badge {
      position: absolute; top: -3px; right: -3px;
      width: 18px; height: 18px; border-radius: 50%;
      background: #e53e3e; color: #fff;
      font-size: 10px; font-weight: 700;
      display: none; align-items: center; justify-content: center;
      border: 2px solid #fff;
    }

    /* ── Panel principal ── */
    #ic-panel {
      position: absolute;
      bottom: 70px; right: 0;
      width: 380px; height: 600px;
      background: #fff;
      border-radius: var(--ic-radius);
      box-shadow: var(--ic-shadow);
      display: flex; flex-direction: column;
      overflow: hidden;
      opacity: 0; pointer-events: none;
      transform: translateY(16px) scale(0.97);
      transition: opacity .25s, transform .25s;
    }
    #ic-panel.open {
      opacity: 1; pointer-events: all;
      transform: translateY(0) scale(1);
    }

    /* ── Header ── */
    #ic-header {
      background: var(--ic-accent);
      color: #fff;
      padding: 14px 16px 12px;
      display: flex; align-items: center; gap: 10px;
      flex-shrink: 0;
    }
    #ic-header-avatar {
      width: 38px; height: 38px; border-radius: 50%;
      background: rgba(255,255,255,.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
    }
    #ic-header-info { flex: 1; min-width: 0; }
    #ic-header-title { font-size: 14px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #ic-header-sub { font-size: 11px; opacity: .8; margin-top: 1px; }
    #ic-header-actions { display: flex; gap: 6px; }
    .ic-hbtn {
      background: rgba(255,255,255,.15);
      border: none; color: #fff; cursor: pointer;
      width: 30px; height: 30px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-size: 15px; transition: background .15s;
    }
    .ic-hbtn:hover { background: rgba(255,255,255,.3); }

    /* ── Zone messages ── */
    #ic-messages {
      flex: 1; overflow-y: auto;
      padding: 16px 14px;
      display: flex; flex-direction: column; gap: 12px;
      scroll-behavior: smooth;
    }
    #ic-messages::-webkit-scrollbar { width: 4px; }
    #ic-messages::-webkit-scrollbar-thumb { background: #d0d0d0; border-radius: 4px; }

    /* ── Message bulle ── */
    .ic-msg { display: flex; gap: 8px; animation: ic-slide-in .2s ease; }
    .ic-msg.user { flex-direction: row-reverse; }
    @keyframes ic-slide-in {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .ic-msg-avatar {
      width: 30px; height: 30px; border-radius: 50%;
      background: var(--ic-accent-l);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; flex-shrink: 0; align-self: flex-end;
    }
    .ic-msg.user .ic-msg-avatar { background: #e2e8f0; }
    .ic-msg-body { max-width: 82%; display: flex; flex-direction: column; gap: 4px; }
    .ic-msg.user .ic-msg-body { align-items: flex-end; }

    .ic-bubble {
      padding: 10px 13px;
      border-radius: 16px;
      font-size: 13.5px; line-height: 1.55;
      word-break: break-word;
    }
    .ic-msg.bot .ic-bubble {
      background: #f4f6f8;
      border-bottom-left-radius: 4px;
      color: #1a202c;
    }
    .ic-msg.user .ic-bubble {
      background: var(--ic-accent);
      color: #fff;
      border-bottom-right-radius: 4px;
    }

    /* ── Markdown dans les bulles bot ── */
    .ic-bubble strong { font-weight: 700; }
    .ic-bubble em { font-style: italic; }
    .ic-bubble ul, .ic-bubble ol { padding-left: 18px; margin: 6px 0; }
    .ic-bubble li { margin-bottom: 3px; }
    .ic-bubble h3 { font-size: 13.5px; font-weight: 700; margin: 8px 0 4px; color: var(--ic-accent-d); }
    .ic-bubble h4 { font-size: 13px; font-weight: 700; margin: 6px 0 3px; }
    .ic-bubble hr { border: none; border-top: 1px solid #ddd; margin: 8px 0; }
    .ic-bubble a  { color: var(--ic-accent); text-decoration: underline; }
    .ic-bubble p  { margin-bottom: 6px; }
    .ic-bubble p:last-child { margin-bottom: 0; }

    /* ── Blocs de code ── */
    .ic-code-block {
      background: #1e2530;
      border-radius: 8px;
      margin: 8px 0;
      overflow: hidden;
    }
    .ic-code-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 6px 10px;
      background: #2d3748;
    }
    .ic-code-lang { font-size: 10px; color: #a0aec0; font-family: monospace; text-transform: uppercase; letter-spacing: .5px; }
    .ic-code-copy-btn {
      background: rgba(255,255,255,.1);
      border: none; color: #cbd5e0; cursor: pointer;
      font-size: 11px; padding: 2px 8px; border-radius: 4px;
      display: flex; align-items: center; gap: 4px;
      transition: background .15s;
    }
    .ic-code-copy-btn:hover { background: rgba(255,255,255,.2); }
    .ic-code-copy-btn.copied { color: #68d391; }
    .ic-bubble pre {
      margin: 0; padding: 10px 12px;
      overflow-x: auto; font-size: 12px; line-height: 1.6;
      color: #e2e8f0; font-family: 'Courier New', monospace;
    }
    .ic-bubble code:not(pre code) {
      background: rgba(0,0,0,.08);
      padding: 1px 5px; border-radius: 4px;
      font-size: 12px; font-family: 'Courier New', monospace;
    }

    /* ── Barre d'actions sous chaque message bot ── */
    .ic-msg-actions {
      display: flex; gap: 6px; padding: 0 2px;
    }
    .ic-action-btn {
      background: none; border: 1px solid #e2e8f0;
      color: #718096; cursor: pointer;
      font-size: 11px; padding: 3px 9px; border-radius: 20px;
      display: flex; align-items: center; gap: 4px;
      transition: all .15s;
    }
    .ic-action-btn:hover { background: var(--ic-accent-l); border-color: var(--ic-accent); color: var(--ic-accent); }
    .ic-action-btn.copied { background: #c6f6d5; border-color: #38a169; color: #276749; }
    .ic-action-btn svg { width: 12px; height: 12px; }

    /* ── Indicateur de frappe ── */
    #ic-typing {
      display: none;
      align-items: center; gap: 8px;
      animation: ic-slide-in .2s ease;
    }
    #ic-typing.show { display: flex; }
    .ic-typing-dots {
      background: #f4f6f8; padding: 10px 14px; border-radius: 16px; border-bottom-left-radius: 4px;
      display: flex; gap: 4px; align-items: center;
    }
    .ic-typing-dots span {
      width: 6px; height: 6px; border-radius: 50%; background: #a0aec0;
      animation: ic-dot 1.2s infinite;
    }
    .ic-typing-dots span:nth-child(2) { animation-delay: .2s; }
    .ic-typing-dots span:nth-child(3) { animation-delay: .4s; }
    @keyframes ic-dot {
      0%, 80%, 100% { transform: scale(1); opacity: .5; }
      40%            { transform: scale(1.3); opacity: 1; }
    }

    /* ── Suggestions ── */
    #ic-suggestions {
      padding: 0 14px 10px;
      display: flex; flex-wrap: wrap; gap: 6px;
      flex-shrink: 0;
    }
    .ic-sugg {
      background: var(--ic-accent-l);
      color: var(--ic-accent-d);
      border: 1px solid rgba(26,107,58,.2);
      border-radius: 20px;
      padding: 5px 11px;
      font-size: 11.5px; cursor: pointer;
      transition: all .15s; white-space: nowrap;
    }
    .ic-sugg:hover { background: var(--ic-accent); color: #fff; border-color: var(--ic-accent); }

    /* ── Zone de saisie ── */
    #ic-input-area {
      padding: 10px 14px 14px;
      border-top: 1px solid #edf2f7;
      flex-shrink: 0;
    }
    #ic-input-row {
      display: flex; gap: 8px; align-items: flex-end;
    }
    #ic-input {
      flex: 1;
      border: 1.5px solid #e2e8f0;
      border-radius: 12px;
      padding: 9px 13px;
      font-size: 13.5px; font-family: var(--ic-font);
      resize: none; min-height: 40px; max-height: 120px;
      outline: none; transition: border-color .15s;
      line-height: 1.4;
      color: #2d3748;
    }
    #ic-input:focus { border-color: var(--ic-accent); }
    #ic-input::placeholder { color: #a0aec0; }
    #ic-send {
      width: 40px; height: 40px; border-radius: 12px;
      background: var(--ic-accent); border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: background .15s, transform .1s;
    }
    #ic-send:hover { background: var(--ic-accent-d); }
    #ic-send:active { transform: scale(0.94); }
    #ic-send:disabled { background: #cbd5e0; cursor: not-allowed; }
    #ic-send svg { width: 18px; height: 18px; fill: #fff; }

    /* ── Message de bienvenue ── */
    #ic-welcome {
      background: var(--ic-accent-l);
      border: 1px solid rgba(26,107,58,.15);
      border-radius: 12px; padding: 12px 14px;
      text-align: center; font-size: 13px; color: #276749;
      line-height: 1.5;
    }
    #ic-welcome strong { display: block; font-size: 14px; margin-bottom: 4px; }

    /* ── Toast copie ── */
    #ic-toast {
      position: fixed; bottom: 100px; right: 24px;
      background: #2d3748; color: #fff;
      padding: 8px 16px; border-radius: 8px;
      font-size: 13px; font-family: var(--ic-font);
      opacity: 0; pointer-events: none;
      transition: opacity .2s;
      z-index: 100000;
    }
    #ic-toast.show { opacity: 1; }

    /* ── Source badge ── */
    .ic-source {
      font-size: 11px; color: #718096;
      margin-top: 4px; display: flex; align-items: center; gap: 4px;
    }
    .ic-source a { color: var(--ic-accent); }

    /* ── Responsive mobile ── */
    @media (max-width: 440px) {
      #ic-panel { width: calc(100vw - 24px); right: -12px; height: 85vh; bottom: 64px; }
    }
  `;

  // ── Utilitaires ────────────────────────────────────────────────

  /** Convertit le Markdown simplifié en HTML sûr */
  function markdownToHtml(text) {
    let html = text
      // Échapper le HTML
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      // Blocs de code (``` ... ```)
      .replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
        const id = 'iccode_' + Math.random().toString(36).slice(2, 8);
        const langLabel = lang || 'code';
        return `<div class="ic-code-block">
          <div class="ic-code-header">
            <span class="ic-code-lang">${langLabel}</span>
            <button class="ic-code-copy-btn" onclick="icCopyCode('${id}',this)">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              Copier
            </button>
          </div>
          <pre id="${id}">${code.trim()}</pre>
        </div>`;
      })
      // Code inline
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Gras + italique
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Titres
      .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
      .replace(/^### (.+)$/gm,  '<h3>$1</h3>')
      // Séparateur
      .replace(/^---+$/gm, '<hr>')
      // Listes à puces
      .replace(/^[\*\-•▸] (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>[\s\S]+?<\/li>)/g, m => `<ul>${m}</ul>`)
      // Listes numérotées
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      // Liens [texte](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Sauts de ligne → paragraphes
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/\n/g, '<br>');

    return `<p>${html}</p>`;
  }

  /** Copie du texte brut d'un message */
  function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      btn.innerHTML = svgCheck() + ' Copié !';
      showToast('Réponse copiée ✓');
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = svgCopy() + ' Copier';
      }, 2000);
    }).catch(() => {
      // Fallback ancien navigateur
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Réponse copiée ✓');
    });
  }

  /** Copie d'un bloc de code */
  window.icCopyCode = function(id, btn) {
    const el = document.getElementById(id);
    if (!el) return;
    navigator.clipboard.writeText(el.innerText).then(() => {
      btn.classList.add('copied');
      btn.innerHTML = '✓ Copié !';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> Copier';
      }, 2000);
    });
  };

  function showToast(msg) {
    const t = document.getElementById('ic-toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  // ── Icônes SVG ────────────────────────────────────────────────
  function svgCopy() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`;
  }
  function svgCheck() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
  }
  function svgSend() {
    return `<svg viewBox="0 0 24 24" fill="#fff"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;
  }
  function svgClose() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
  }
  function svgClear() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;
  }

  // ── Construction du DOM ────────────────────────────────────────
  function buildWidget() {
    // Style
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Conteneur principal
    const widget = document.createElement('div');
    widget.id = 'ic-widget';
    widget.innerHTML = `
      <!-- Bouton flottant -->
      <button id="ic-fab" title="Assistant InfoCompta" aria-label="Ouvrir le chat">
        ${CONFIG.BOT_AVATAR}
        <span id="ic-fab-badge">1</span>
      </button>

      <!-- Panel -->
      <div id="ic-panel" role="dialog" aria-label="Assistant InfoCompta">

        <!-- Header -->
        <div id="ic-header">
          <div id="ic-header-avatar">${CONFIG.BOT_AVATAR}</div>
          <div id="ic-header-info">
            <div id="ic-header-title">${CONFIG.SITE_NAME}</div>
            <div id="ic-header-sub">${CONFIG.SUBTITLE}</div>
          </div>
          <div id="ic-header-actions">
            <button class="ic-hbtn" id="ic-clear-btn" title="Effacer la conversation">${svgClear()}</button>
            <button class="ic-hbtn" id="ic-close-btn" title="Fermer">${svgClose()}</button>
          </div>
        </div>

        <!-- Messages -->
        <div id="ic-messages">
          <div id="ic-welcome">
            <strong>👋 Bonjour, je suis COMPTA !</strong>
            Posez-moi vos questions en comptabilité OHADA et fiscalité béninoise.
            Je consulte d'abord les données officielles du site avant de répondre.
          </div>
          <div id="ic-typing" class="ic-msg">
            <div class="ic-msg-avatar">${CONFIG.BOT_AVATAR}</div>
            <div class="ic-typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <!-- Suggestions -->
        <div id="ic-suggestions"></div>

        <!-- Saisie -->
        <div id="ic-input-area">
          <div id="ic-input-row">
            <textarea id="ic-input" rows="1"
              placeholder="Ex: À quoi sert le compte 401 ?"
              aria-label="Votre question"
              maxlength="1000"></textarea>
            <button id="ic-send" title="Envoyer" aria-label="Envoyer">${svgSend()}</button>
          </div>
        </div>
      </div>

      <!-- Toast -->
      <div id="ic-toast"></div>
    `;
    document.body.appendChild(widget);

    // Suggestions
    renderSuggestions();

    // Événements
    document.getElementById('ic-fab').addEventListener('click', togglePanel);
    document.getElementById('ic-close-btn').addEventListener('click', () => setOpen(false));
    document.getElementById('ic-clear-btn').addEventListener('click', clearConversation);
    document.getElementById('ic-send').addEventListener('click', sendMessage);
    document.getElementById('ic-input').addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    document.getElementById('ic-input').addEventListener('input', autoResizeInput);

    // Badge initial (invite à ouvrir)
    setTimeout(() => {
      const badge = document.getElementById('ic-fab-badge');
      badge.style.display = 'flex';
    }, 3000);
  }

  function renderSuggestions() {
    const container = document.getElementById('ic-suggestions');
    container.innerHTML = '';
    CONFIG.SUGGESTIONS.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'ic-sugg';
      btn.textContent = s;
      btn.addEventListener('click', () => {
        document.getElementById('ic-input').value = s;
        sendMessage();
      });
      container.appendChild(btn);
    });
  }

  function togglePanel() {
    setOpen(!isOpen);
  }

  function setOpen(open) {
    isOpen = open;
    const panel = document.getElementById('ic-panel');
    const badge = document.getElementById('ic-fab-badge');
    if (open) {
      panel.classList.add('open');
      badge.style.display = 'none';
      setTimeout(() => document.getElementById('ic-input').focus(), 250);
    } else {
      panel.classList.remove('open');
    }
  }

  function autoResizeInput() {
    const el = document.getElementById('ic-input');
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }

  function clearConversation() {
    history = [];
    const msgs = document.getElementById('ic-messages');
    msgs.innerHTML = `
      <div id="ic-welcome">
        <strong>👋 Bonjour, je suis COMPTA !</strong>
        Posez-moi vos questions en comptabilité OHADA et fiscalité béninoise.
        Je consulte d'abord les données officielles du site avant de répondre.
      </div>
      <div id="ic-typing" class="ic-msg">
        <div class="ic-msg-avatar">${CONFIG.BOT_AVATAR}</div>
        <div class="ic-typing-dots"><span></span><span></span><span></span></div>
      </div>
    `;
    renderSuggestions();
  }

  // ── Affichage des messages ─────────────────────────────────────

  function appendUserMessage(text) {
    hideSuggestions();
    const msgs = document.getElementById('ic-messages');
    const div = document.createElement('div');
    div.className = 'ic-msg user';
    div.innerHTML = `
      <div class="ic-msg-avatar">👤</div>
      <div class="ic-msg-body">
        <div class="ic-bubble">${escapeHtml(text)}</div>
      </div>
    `;
    msgs.insertBefore(div, document.getElementById('ic-typing'));
    scrollToBottom();
  }

  function appendBotMessage(text) {
    const msgs   = document.getElementById('ic-messages');
    const typing = document.getElementById('ic-typing');

    // Extraire et formater la source si présente
    let displayText = text;
    let sourceHtml  = '';
    const sourceMatch = text.match(/\n\n📌 Source.*$/s);
    if (sourceMatch) {
      displayText = text.slice(0, sourceMatch.index);
      const srcLine = sourceMatch[0].replace('📌 Source web : ', '').trim();
      // Transformer [Titre](url) en lien cliquable
      const linkMatch = srcLine.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        sourceHtml = `<div class="ic-source">📌 Source : <a href="${linkMatch[2]}" target="_blank" rel="noopener">${linkMatch[1]}</a></div>`;
      } else {
        sourceHtml = `<div class="ic-source">${srcLine}</div>`;
      }
    }

    const msgId  = 'icmsg_' + Date.now();
    const div    = document.createElement('div');
    div.className = 'ic-msg bot';
    div.innerHTML = `
      <div class="ic-msg-avatar">${CONFIG.BOT_AVATAR}</div>
      <div class="ic-msg-body">
        <div class="ic-bubble" id="${msgId}">${markdownToHtml(displayText)}</div>
        ${sourceHtml}
        <div class="ic-msg-actions">
          <button class="ic-action-btn" id="copy_${msgId}" onclick="">
            ${svgCopy()} Copier
          </button>
        </div>
      </div>
    `;
    msgs.insertBefore(div, typing);

    // Attacher l'événement copier APRÈS insertion dans le DOM
    const copyBtn = div.querySelector(`#copy_${msgId}`);
    copyBtn.addEventListener('click', () => copyText(text, copyBtn));

    scrollToBottom();
  }

  function hideSuggestions() {
    document.getElementById('ic-suggestions').innerHTML = '';
  }

  function showTyping() {
    document.getElementById('ic-typing').classList.add('show');
    scrollToBottom();
  }

  function hideTyping() {
    document.getElementById('ic-typing').classList.remove('show');
  }

  function scrollToBottom() {
    const msgs = document.getElementById('ic-messages');
    setTimeout(() => msgs.scrollTop = msgs.scrollHeight, 50);
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Envoi du message ───────────────────────────────────────────
  async function sendMessage() {
    if (isLoading) return;
    const input = document.getElementById('ic-input');
    const text  = input.value.trim();
    if (!text) return;

    // Reset input
    input.value = '';
    input.style.height = 'auto';
    document.getElementById('ic-send').disabled = true;

    // Ajouter à l'historique et afficher
    history.push({ role: 'user', content: text });
    appendUserMessage(text);
    showTyping();
    isLoading = true;

    try {
      const response = await fetch(CONFIG.API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.slice(-CONFIG.MAX_HIST),
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`);
      }

      const data = await response.json();

      // Extraction du texte de réponse
      let reponse = '';
      if (data?.content && Array.isArray(data.content)) {
        reponse = data.content.filter(b => b.type === 'text').map(b => b.text).join('\n');
      } else if (typeof data?.content === 'string') {
        reponse = data.content;
      } else if (data?.choices?.[0]?.message?.content) {
        reponse = data.choices[0].message.content;
      } else if (typeof data === 'string') {
        reponse = data;
      }

      if (!reponse.trim()) {
        reponse = "Je n'ai pas pu générer de réponse. Veuillez réessayer.";
      }

      history.push({ role: 'assistant', content: reponse });
      hideTyping();
      appendBotMessage(reponse);

    } catch (err) {
      hideTyping();
      const errMsg = err.message.includes('Failed to fetch')
        ? '⚠️ Impossible de joindre le serveur. Vérifiez votre connexion.'
        : `⚠️ Erreur : ${err.message}`;
      appendBotMessage(errMsg);
    } finally {
      isLoading = false;
      document.getElementById('ic-send').disabled = false;
      document.getElementById('ic-input').focus();
    }
  }

  // ── Initialisation ─────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }

})();
