// ═══════════════════════════════════════════════════════════════
//  chat-widget.js — InfoCompta (version 4.0)
//
//  Fonctions (sans IA, réponses issues des données du site) :
//   • Quel compte utiliser ?     → recherche dans comptes-data.js
//   • Trouver un document        → catalogue Supabase (documents_public)
//   • Fiches fiscales + calendrier → Docs-context.js (CGI Bénin 2026)
//   • Calculateurs ITS / TVA / AIB
//   • Mes téléchargements        → achats de l’utilisateur connecté
//  Fonction avec IA (optionnelle) : explications, uniquement à partir
//  des données ci-dessus, via /api/chat.
//
//  INSTALLATION (inchangée) — dans chaque page, avant </body> :
//    <script src="comptes-data.js"></script>
//    <script src="Docs-context.js"></script>
//    <script src="chat-widget.js"></script>
//
//  RÉGLAGES (facultatif) — avant chat-widget.js :
//    <script>window.IC_CHAT_CONFIG = { aiMode: 'connected' };</script>
//    aiMode : 'off' (pas d’IA) | 'connected' (utilisateurs connectés) | 'all'
// ═══════════════════════════════════════════════════════════════

(function () {
'use strict';

const CFG = Object.assign({
  aiMode: 'connected',
  aiEndpoint: '/api/chat',
  aiMaxPerSession: 15,
  supabaseUrl: 'https://lmivfisdmuqbspvmvdzh.supabase.co',
  supabaseKey: 'sb_publishable_kCfhrFPVec2MkCl0xe4N-w_QXHgc0Gp',
  authStorageKey: 'sb-lmivfisdmuqbspvmvdzh-auth-token'
}, window.IC_CHAT_CONFIG || {});

// ── Données du site ────────────────────────────────────────────
const ACC = () => (typeof comptesData !== 'undefined' ? comptesData : {});
const CGI = () => (typeof DOCS_CONTEXT !== 'undefined' && DOCS_CONTEXT.cgi ? DOCS_CONTEXT.cgi : {});

// Barèmes utilisés par les calculateurs (CGI Bénin 2026)
const TVA_RATE = 0.18;
const VPS_RATE = 0.04;
const ITS_BAREME = [            // [de, à, taux] — art. 119 à 129
  [0, 60000, 0],
  [60000, 150000, 0.10],
  [150000, 250000, 0.15],
  [250000, 500000, 0.19],
  [500000, Infinity, 0.30]
];
const AIB_RATES = {
  std:   { rate: 0.01, label: 'Importations, achats et fournitures (fournisseur immatriculé à l’IFU)' },
  serv:  { rate: 0.03, label: 'Prestations de services (fournisseur immatriculé à l’IFU)' },
  noifu: { rate: 0.05, label: 'Fournisseur non immatriculé à l’IFU' }
};

// ── Style (palette InfoCompta : bleu nuit, bleu royal, gris bleuté) ──
const STYLE = `
  #ic-fab, #ic-panel, #ic-toast {
    --ic-navy: #00085B;
    --ic-dark: #0b0e34;
    --ic-accent: #1039E2;
    --ic-accent-dk: #0612b3;
    --ic-accent-pale: #E7EBFC;
    --ic-border: #A2B5CB;
    --ic-border-lt: #D5DEE9;
    --ic-cream: #F5F7FB;
    --ic-text: #00085B;
    --ic-text-md: #1A237A;
    --ic-muted: #6B7A96;
    --ic-ok: #2d7a4f;
    font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
  }

  #ic-fab {
    position: fixed; bottom: 24px; right: 24px; z-index: 9998;
    height: 56px; padding: 0 18px 0 12px; gap: 8px; border-radius: 28px;
    background: #fff; border: 2px solid var(--ic-accent);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 28px rgba(0,8,91,.35);
    transition: transform .2s, box-shadow .2s, background .2s;
  }
  #ic-fab:hover { transform: translateY(-2px); background: var(--ic-accent-pale); box-shadow: 0 12px 34px rgba(0,8,91,.45); }
  #ic-fab:focus-visible, .ic-hbtn:focus-visible, .ic-chip:focus-visible, .ic-qr:focus-visible,
  #ic-send:focus-visible, #ic-input:focus-visible, .ic-copy-btn:focus-visible {
    outline: 2px solid var(--ic-accent); outline-offset: 2px;
  }
  #ic-fab svg { width: 24px; height: 24px; fill: #fff; }
  #ic-fab img { width: 32px; height: auto; }
  .ic-fab-label { font-size: 14px; font-weight: 600; color: var(--ic-navy); white-space: nowrap; }
    #ic-notif { animation: ic-pulse 1.8s infinite; }
    @keyframes ic-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(255,20,20,.6); }
  70%  { box-shadow: 0 0 0 8px rgba(255,20,20,0); }
  100% { box-shadow: 0 0 0 0 rgba(255,20,20,0); }
}
  #ic-notif {
    position: absolute; top: -2px; right: -2px; width: 13px; height: 13px;
    border-radius: 50%; background: #FF1414; border: 2px solid #fff; display: none;
  }

  #ic-panel {
    position: fixed; bottom: 92px; right: 24px; z-index: 9997;
    width: min(400px, calc(100vw - 32px));
    height: min(620px, calc(100vh - 116px));
    background: #fff; border: 1px solid var(--ic-border-lt); border-radius: 12px;
    box-shadow: 0 18px 60px rgba(0,8,91,.28);
    display: flex; flex-direction: column; overflow: hidden;
    opacity: 0; pointer-events: none; transform: translateY(12px);
    transition: opacity .2s, transform .2s;
  }
  #ic-panel.open { opacity: 1; pointer-events: all; transform: translateY(0); }

  .ic-header {
    position: relative; background: var(--ic-dark); padding: 13px 14px;
    display: flex; align-items: center; gap: 11px; flex-shrink: 0;
  }
  .ic-header::after {
    content: ''; position: absolute; left: 0; right: 0; top: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--ic-accent) 30%, #0815b3 60%, transparent);
  }
  .ic-header-logo {
    width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
    background: rgba(16,57,226,.18); border: 1px solid rgba(16,57,226,.45);
    display: flex; align-items: center; justify-content: center;
  }
  .ic-header-logo {
  width: 40px; height: 40px; border-radius: 9px; flex-shrink: 0;
  background: #fff; border: 1px solid var(--ic-border-lt);
  display: flex; align-items: center; justify-content: center;
}
  .ic-header-info { flex: 1; min-width: 0; }
  .ic-header-info h3 { font-family: 'Outfit', 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; color: #fff; line-height: 1.2; margin: 0; }
  .ic-header-info p { font-size: 11px; color: rgba(255,255,255,.68); margin: 2px 0 0; }
  .ic-header-btns { display: flex; gap: 6px; }
  .ic-hbtn {
    background: rgba(255,255,255,.1); border: none; color: rgba(255,255,255,.8);
    cursor: pointer; width: 30px; height: 30px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center; transition: background .18s;
  }
  .ic-hbtn:hover { background: rgba(255,255,255,.22); color: #fff; }

  .ic-chips {
    padding: 9px 12px; background: var(--ic-cream); border-bottom: 1px solid var(--ic-border-lt);
    display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; flex-shrink: 0;
  }
  .ic-chips::-webkit-scrollbar { display: none; }
  .ic-chip {
    flex-shrink: 0; padding: 5px 12px; background: #fff; border: 1px solid var(--ic-border);
    border-radius: 20px; font-size: 12px; font-weight: 500; color: var(--ic-navy);
    cursor: pointer; white-space: nowrap; font-family: inherit;
    transition: background .18s, color .18s, border-color .18s;
  }
  .ic-chip:hover { background: var(--ic-navy); color: #fff; border-color: var(--ic-navy); }

  .ic-messages {
    flex: 1; overflow-y: auto; padding: 14px 13px; display: flex; flex-direction: column;
    gap: 12px; scroll-behavior: smooth; background: var(--ic-cream);
  }
  .ic-messages::-webkit-scrollbar { width: 4px; }
  .ic-messages::-webkit-scrollbar-thumb { background: var(--ic-border); border-radius: 4px; }

  .ic-msg { display: flex; gap: 8px; }
  .ic-msg.user { flex-direction: row-reverse; }
  .ic-avatar {
    width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0; align-self: flex-end;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Outfit', 'DM Sans', sans-serif; font-size: 13px; font-weight: 700;
  }
  .ic-msg.ai .ic-avatar { background: var(--ic-dark); color: #fff; }
  .ic-msg.user .ic-avatar { background: var(--ic-accent); color: #fff; }
  .ic-msg-body { display: flex; flex-direction: column; gap: 5px; max-width: 90%; min-width: 0; }
  .ic-msg.user .ic-msg-body { align-items: flex-end; max-width: 82%; }

  .ic-bubble { padding: 10px 13px; border-radius: 10px; font-size: 13.5px; line-height: 1.6; word-break: break-word; }
  .ic-msg.ai .ic-bubble { background: #fff; color: var(--ic-text); border: 1px solid var(--ic-border-lt); border-bottom-left-radius: 3px; }
  .ic-msg.user .ic-bubble { background: var(--ic-navy); color: #fff; border-bottom-right-radius: 3px; }
  .ic-bubble p { margin: 0 0 6px; }
  .ic-bubble p:last-child { margin-bottom: 0; }
  .ic-bubble strong { font-weight: 700; }
  .ic-bubble ul { padding-left: 17px; margin: 5px 0; }
  .ic-bubble li { margin-bottom: 3px; }
  .ic-bubble pre { background: var(--ic-dark); color: #e2e8f0; border-radius: 7px; padding: 10px 12px; margin: 7px 0; overflow-x: auto; font-size: 12px; line-height: 1.6; }

  .ic-ctag {
    display: inline-block; font-family: 'Courier New', monospace; font-size: 12px; font-weight: 700;
    padding: 1px 7px; background: var(--ic-accent-pale); border: 1px solid rgba(16,57,226,.28);
    border-radius: 4px; color: var(--ic-accent); text-decoration: none;
  }
  .ic-ctag:hover { background: var(--ic-accent); color: #fff; }
  .ic-link { color: var(--ic-accent); font-weight: 600; font-size: 12.5px; text-decoration: none; }
  .ic-link:hover { text-decoration: underline; }

  .ic-card {
    background: var(--ic-cream); border: 1px solid var(--ic-border-lt); border-left: 3px solid var(--ic-accent);
    border-radius: 8px; padding: 10px 12px; margin: 8px 0 0;
  }
  .ic-card:first-child { margin-top: 0; }
  .ic-card-head { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .ic-card-head strong { font-family: 'Outfit', 'DM Sans', sans-serif; font-size: 14px; color: var(--ic-navy); }
  .ic-card-sub { font-size: 12px; color: var(--ic-muted); margin: 2px 0 6px; }
  .ic-price { font-weight: 700; color: var(--ic-navy); margin-bottom: 4px; }
  .ic-ecr { background: #fff; border: 1px solid var(--ic-border-lt); border-radius: 6px; padding: 7px 9px; margin: 6px 0; font-size: 12.5px; }
  .ic-ecr > span { display: block; font-weight: 600; margin-bottom: 3px; }
  .ic-ecr b { display: inline-block; width: 16px; color: var(--ic-accent); }
  .ic-ul { padding-left: 16px; margin: 4px 0 2px; }
  .ic-ul li { margin-bottom: 3px; font-size: 12.8px; }
  .ic-muted { color: var(--ic-muted); }

  .ic-card details { margin: 6px 0 0; }
  .ic-card summary { cursor: pointer; font-weight: 600; font-size: 12.8px; color: var(--ic-text-md); }
  .ic-card summary:hover { color: var(--ic-accent); }

  .ic-tbl { width: 100%; border-collapse: collapse; font-size: 12.5px; margin: 6px 0; }
  .ic-tbl th, .ic-tbl td { padding: 4px 6px; border-bottom: 1px solid var(--ic-border-lt); text-align: right; }
  .ic-tbl th:first-child, .ic-tbl td:first-child { text-align: left; }
  .ic-tbl th { font-weight: 600; color: var(--ic-text-md); }
  .ic-tbl tr.ic-total td { font-weight: 700; color: var(--ic-navy); border-bottom: 2px solid var(--ic-navy); }
  .ic-note { font-size: 11.5px; color: var(--ic-muted); margin-top: 6px; line-height: 1.5; }
  .ic-md-wrap { overflow-x: auto; margin: 6px 0; }
  .ic-md-tbl { border-collapse: collapse; font-size: 12.5px; width: 100%; }
  .ic-md-tbl th, .ic-md-tbl td { border: 1px solid var(--ic-border-lt); padding: 5px 7px; text-align: left; vertical-align: top; }
  .ic-md-tbl th { background: var(--ic-accent-pale); color: var(--ic-text-md); font-weight: 600; }

  .ic-qrs { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }
  .ic-qr {
    background: #fff; border: 1px solid var(--ic-accent); color: var(--ic-accent);
    border-radius: 18px; padding: 5px 12px; font-size: 12.5px; font-weight: 500;
    cursor: pointer; font-family: inherit; transition: background .18s, color .18s;
  }
  .ic-qr:hover { background: var(--ic-accent); color: #fff; }

  .ic-copy-btn {
    display: inline-flex; align-items: center; background: none; border: none;
    color: var(--ic-muted); cursor: pointer; font-size: 11.5px; padding: 2px 3px;
    border-radius: 5px; font-family: inherit; align-self: flex-start;
  }
  .ic-copy-btn svg { width: 13px; height: 13px; fill: currentColor; }
  .ic-copy-btn .ic-copy-label { max-width: 0; overflow: hidden; white-space: nowrap; transition: max-width .2s, margin-left .2s; }
  .ic-copy-btn:hover, .ic-copy-btn:focus-visible { color: var(--ic-accent); }
  .ic-copy-btn:hover .ic-copy-label, .ic-copy-btn:focus-visible .ic-copy-label, .ic-copy-btn.copied .ic-copy-label { max-width: 50px; margin-left: 4px; }
  .ic-copy-btn.copied { color: var(--ic-ok) !important; }

  .ic-typing { display: flex; gap: 4px; padding: 11px 13px; background: #fff; border: 1px solid var(--ic-border-lt); border-radius: 10px; border-bottom-left-radius: 3px; width: fit-content; }
  .ic-typing span { width: 6px; height: 6px; background: var(--ic-accent); border-radius: 50%; animation: ic-bounce .9s infinite; }
  .ic-typing span:nth-child(2) { animation-delay: .15s; }
  .ic-typing span:nth-child(3) { animation-delay: .3s; }
  @keyframes ic-bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }

  .ic-input-area { padding: 10px 12px; background: #fff; border-top: 1px solid var(--ic-border-lt); display: flex; align-items: flex-end; gap: 8px; flex-shrink: 0; }
  #ic-input {
    flex: 1; border: 1.5px solid var(--ic-border); border-radius: 6px; padding: 9px 12px;
    font-family: inherit; font-size: 13.5px; color: var(--ic-text); resize: none; outline: none;
    max-height: 100px; line-height: 1.5; background: #fff; transition: border-color .18s, box-shadow .18s;
  }
  #ic-input:focus { border-color: var(--ic-accent); box-shadow: 0 0 0 3px rgba(16,57,226,.12); }
  #ic-input::placeholder { color: var(--ic-muted); }
  #ic-send {
    width: 40px; height: 40px; flex-shrink: 0; border-radius: 6px; background: var(--ic-accent-dk);
    border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background .18s, transform .18s;
  }
  #ic-send:hover { background: var(--ic-accent); transform: translateY(-1px); }
  #ic-send:disabled { opacity: .45; cursor: not-allowed; transform: none; }
  #ic-send svg { width: 16px; height: 16px; fill: #fff; }

  .ic-footer { text-align: center; font-size: 10.5px; color: var(--ic-muted); padding: 5px 8px 7px; background: #fff; flex-shrink: 0; }

  #ic-toast {
    position: fixed; bottom: 96px; right: 28px; z-index: 99999; background: var(--ic-navy); color: #fff;
    padding: 8px 14px; border-radius: 6px; font-size: 12.5px;
    opacity: 0; pointer-events: none; transition: opacity .2s;
  }
  #ic-toast.show { opacity: 1; }

  @media (max-width: 480px) {
    #ic-panel { right: 8px; left: 8px; width: auto; bottom: 80px; height: calc(100dvh - 100px); }
    #ic-fab { bottom: 16px; right: 16px; }
  }
  @media (prefers-reduced-motion: reduce) {
    #ic-panel, #ic-fab, .ic-copy-btn .ic-copy-label { transition: none; }
    .ic-typing span { animation: none; }
    #ic-notif { animation: none; }
  }
`;

const SVG = {
  send:  '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',
  copy:  '<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
  bot:   '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h10v2H7V9zm6 5H7v-2h6v2zm4-6H7V6h10v2z"/></svg>',
  logo:  '<svg viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9 12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>'
};
  // Logo InfoCompta (iC) en image data-URI : pas de conflit d'identifiants de dégradés
const LOGO_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 385.75 344"><defs>' +
'<linearGradient id="a" gradientUnits="userSpaceOnUse" x1="31.37" y1="22.42" x2="63.03" y2="73.14"><stop offset="0" stop-color="#FFD004"/><stop offset="1" stop-color="#EE8C02"/></linearGradient>' +
'<linearGradient id="b" gradientUnits="userSpaceOnUse" x1="-9.23" y1="142.85" x2="95.65" y2="233.41"><stop offset="0" stop-color="#013DA5"/><stop offset="1" stop-color="#000F32"/></linearGradient>' +
'<linearGradient id="c" gradientUnits="userSpaceOnUse" x1="149.61" y1="45.46" x2="237.64" y2="160.32"><stop offset="0" stop-color="#013289"/><stop offset="1" stop-color="#000E2E"/></linearGradient>' +
'<linearGradient id="d" gradientUnits="userSpaceOnUse" x1="219.37" y1="216.73" x2="309.24" y2="297.92"><stop offset="0" stop-color="#012A75"/><stop offset="1" stop-color="#00133C"/></linearGradient>' +
'<linearGradient id="e" gradientUnits="userSpaceOnUse" x1="190.66" y1="168.07" x2="205.77" y2="209.7"><stop offset="0" stop-color="#6BCF2E"/><stop offset="1" stop-color="#51A41F"/></linearGradient>' +
'<linearGradient id="f" gradientUnits="userSpaceOnUse" x1="228.76" y1="141.36" x2="251.44" y2="192.15"><stop offset="0" stop-color="#72D432"/><stop offset="1" stop-color="#50A31E"/></linearGradient>' +
'<linearGradient id="g" gradientUnits="userSpaceOnUse" x1="268.55" y1="113.24" x2="296.14" y2="176.27"><stop offset="0" stop-color="#FFC803"/><stop offset="1" stop-color="#EC8C02"/></linearGradient>' +
'<linearGradient id="h" gradientUnits="userSpaceOnUse" x1="128.43" y1="199.48" x2="137.82" y2="330.2"><stop offset="0" stop-color="#FECB01"/><stop offset="1" stop-color="#FEAA04"/></linearGradient></defs>' +
'<circle fill="url(#a)" cx="47.2" cy="47.79" r="34.49"/>' +
'<path fill="url(#b)" d="M8.39 105.51C7.41 119.32 8.25 133.56 8.25 147.5C8.25 176.33 8.25 205.17 8.25 234C8.25 256.37 7.18 281.12 21.75 299.45C38.68 286.85 51.15 278.44 70 268.48C76.88 264.84 84.23 261.71 90.89 257.99C74.45 231.56 77.5 213.89 77.5 184.25C77.5 150.21 78.38 115.82 77.36 81.95C63.63 84.89 21.53 99.55 8.39 105.51Z"/>' +
'<path fill="url(#c)" d="M114.5 248.4C127.79 243.73 163.98 229.77 175.39 223.74C161.09 204.31 152.05 190.96 150.58 165.75C147.41 111.6 193.3 63.65 247.5 64.89C280.13 65.64 297.63 78.29 321 98.73C334.72 90.4 356.48 74.85 368.7 64.49C357.94 49.45 342.51 37.44 326.25 28.53C269.58 -2.52 195.56 1.53 144 41.12C97.17 77.07 75.05 140.23 89.84 197.5C94.57 215.82 102.36 233.86 114.5 248.4Z"/>' +
'<path fill="url(#d)" d="M147.33 279.49C158.15 287.85 171.56 293.74 184.75 297.81C237.06 313.92 298.34 302.43 340.75 267.54C355 255.82 370.22 240.88 377.4 223.82C363.78 217.11 339.3 206.63 325 201.82C319.5 207.95 314.31 214.67 308.25 220.45C291.23 236.7 268.72 246.01 245.5 248.32C236.96 249.16 216.34 244.87 213 245.66C205.76 247.37 198.68 252.44 192 255.66C177.02 262.88 160.82 270.13 147.33 279.49Z"/>' +
'<path fill="url(#e)" d="M182.5 165.5L216.25 165.5L216.25 209.25L182.5 221Z"/>' +
'<path fill="url(#f)" d="M224.25 137L258 137L258 194.25L224.25 205.25Z"/>' +
'<path fill="url(#g)" d="M266.25 107.5L300.5 107.5L300.5 179.75L266.25 190.25Z"/>' +
'<path fill="url(#h)" d="M172.14 327.58C151.45 328.23 130.83 330.02 110 327.04C103.94 326.18 91.51 324.24 90.63 316.5C89.87 309.82 98.73 303.27 103.25 299.66C118.46 287.53 136.15 278.32 153.25 269.17C200.3 244 248.59 221.09 296.75 198.12C313.28 190.24 329.8 182.35 346.25 174.32C354.01 170.53 362.51 166.91 369.64 162.58C358.05 165.49 346.07 170.26 334.5 174.24C314.4 181.15 294.27 187.96 274.25 195.09C222.71 213.44 171.02 231.89 121 254.14C100.05 263.46 79.41 273.36 59.75 285.21C49.92 291.14 38.61 297.77 32.11 307.5C20.06 325.53 48.25 331.55 60.5 333.5C86.48 337.61 148.07 335.52 172.14 327.58Z"/></svg>';
const LOGO_IMG = '<img src="data:image/svg+xml;charset=utf-8,' + encodeURIComponent(LOGO_SVG) + '" alt="InfoCompta" width="28" height="25" style="display:block">';

// ── Outils texte ───────────────────────────────────────────────
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const STOP = new Set(['le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'ou', 'au', 'aux', 'en', 'ai', 'pour', 'par', 'sur', 'dans', 'que', 'qui', 'quoi', 'est', 'sont', 'ce', 'cet', 'cette', 'mon', 'ma', 'mes', 'quel', 'quelle', 'quels', 'quelles', 'comment', 'faire', 'utiliser', 'compte', 'comptes', 'comptabiliser', 'enregistrer', 'ecriture', 'ecritures', 'passer', 'dois', 'doit', 'peut', 'puis', 'vous', 'nous', 'son', 'ses', 'avec', 'sans', 'cherche', 'trouver', 'besoin']);
const words = s => norm(s).split(' ').filter(w => w.length > 2 && !STOP.has(w));
const stem = w => (w.length > 4 ? w.replace(/(es|s|x)$/, '') : w);
const stems = s => words(s).map(stem);
const short = (s, n) => { const t = String(s || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t; };
const NB = '\u00a0';
const fmt = n => Math.round(n).toLocaleString('fr-FR').replace(/[\u202f\u00a0\s]/g, NB) + NB + 'FCFA';
const pageName = () => (location.pathname.split('/').pop() || 'index.html') + location.search;
const loginUrl = () => 'auth.html?redirect=' + encodeURIComponent(pageName());

// Synonymes pour la recherche de comptes
const SYN = {
  loyer: ['location', 'locatif', 'bail'], loyers: ['location', 'locatif', 'bail'],
  salaire: ['remuneration', 'appointement', 'personnel'], salaires: ['remuneration', 'appointement', 'personnel'],
  paie: ['personnel', 'remuneration'], employe: ['personnel'], personnel: ['personnel'],
  vehicule: ['transport', 'automobile', 'materiel'], voiture: ['transport', 'automobile', 'materiel'],
  carburant: ['combustible', 'carburant'], electricite: ['electricite', 'energie'],
  telephone: ['telephone', 'telecommunication'], internet: ['telecommunication'],
  assurance: ['assurance', 'prime'], publicite: ['publicite', 'annonce'],
  pret: ['pret', 'emprunt'], emprunt: ['emprunt', 'pret'],
  banque: ['banque'], caisse: ['caisse', 'espece'], especes: ['caisse', 'espece'],
  dividende: ['dividende', 'associe'], dividendes: ['dividende', 'associe'],
  amortissement: ['amortissement', 'dotation'], honoraires: ['honoraire', 'conseil'],
  voyage: ['transport', 'deplacement', 'mission'], reparation: ['entretien', 'reparation'],
  cnss: ['organisme social', 'securite sociale'], cotisation: ['cotisation', 'organisme social'],
  impot: ['impot', 'taxe'], taxe: ['impot', 'taxe'], creance: ['creance', 'client'],
  provision: ['provision', 'depreciation'], stock: ['stock', 'marchandise']
};

// Montants : « 350 000 », « 350.000 », « 1,5 million », « 200k »
function parseAmount(text) {
  const t = String(text).toLowerCase().replace(/[\u00a0\u202f]/g, ' ');
  const m = t.match(/(\d[\d\s.,]*\d|\d)\s*(millions?|milliards?|mille|k)?(?![a-z])/);
  if (!m) return null;
  let num = m[1].replace(/\s/g, '');
  if (/^\d{1,3}(\.\d{3})+$/.test(num)) num = num.replace(/\./g, '');
  else num = num.replace(/,/g, '.');
  let v = parseFloat(num);
  if (isNaN(v)) return null;
  const u = m[2] || '';
  if (/^milliard/.test(u)) v *= 1e9; else if (/^million/.test(u)) v *= 1e6; else if (/^(mille|k)$/.test(u)) v *= 1e3;
  return v;
}

// Mise en forme des réponses de l’IA (texte échappé avant tout)
// Mise en forme des réponses de l’IA (texte échappé avant tout)
function md(raw) {
  const pres = [];
  // <br> écrits par l'IA → marqueur, restauré en vrai <br> à la fin
  const src = String(raw).replace(/<br\s*\/?>/gi, '\u0001');
  const t0 = esc(src).replace(/```[\w]*\n?([\s\S]*?)```/g, (_, c) => { pres.push(c.trim()); return '\u0000' + (pres.length - 1) + '\u0000'; });

  const isRow = l => /^\s*\|.*\|\s*$/.test(l);
  const isSep = l => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l);
  const cells = l => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());

  const lines = t0.split('\n'), out = [];
  let inUl = false;
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];

    // Tableau Markdown
    if (isRow(ln)) {
      if (inUl) { out.push('</ul>'); inUl = false; }
      const block = [];
      while (i < lines.length && isRow(lines[i])) block.push(lines[i++]);
      i--;
      let head = null, body = block.filter(l => !isSep(l));
      if (block.length > 1 && isSep(block[1])) { head = cells(block[0]); body = block.slice(2).filter(l => !isSep(l)); }
      let h = '<div class="ic-md-wrap"><table class="ic-md-tbl">';
      if (head) h += '<tr>' + head.map(c => '<th>' + c + '</th>').join('') + '</tr>';
      body.forEach(l => { h += '<tr>' + cells(l).map(c => '<td>' + c + '</td>').join('') + '</tr>'; });
      out.push(h + '</table></div>');
      continue;
    }

    const m = ln.match(/^\s*(?:[-•*]|\d+\.)\s+(.*)$/);
    if (m) { if (!inUl) { out.push('<ul>'); inUl = true; } out.push('<li>' + m[1] + '</li>'); }
    else { if (inUl) { out.push('</ul>'); inUl = false; } out.push(ln + '<br>'); }
  }
  if (inUl) out.push('</ul>');

  return out.join('')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)([^*]+?)\*/g, '$1<em>$2</em>')
    .replace(/(<br>)+$/, '')
    .replace(/\u0001/g, '<br>')
    .replace(/\[(\d+[a-zA-Z0-9-]*)\]/g, (m, c) => ACC()[c] ? accTag(c) : m)
    .replace(/\u0000(\d+)\u0000/g, (_, i) => '<pre>' + pres[i] + '</pre>');
}

// Texte avec **gras** (pour mes propres messages)
const bold = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const accTag = c => '<a class="ic-ctag" href="compte-detail.html?code=' + encodeURIComponent(c) + '" target="_blank" rel="noopener">' + esc(c) + '</a>';

// ── État ───────────────────────────────────────────────────────
const PAGE_CODE = (new URLSearchParams(window.location.search).get('code') || '').trim();
const STORE_KEY = 'infocompta_chat_v4_' + window.location.pathname + (PAGE_CODE ? '_' + PAGE_CODE : '');
const MAX_STORED = 20;
const HIST_MAX = 6;
let icOpen = false, icBusy = false, icRestored = false;
let hist = loadHist();
let flow = null;
let catalogPromise = null;

function loadHist() { try { const r = localStorage.getItem(STORE_KEY); return r ? JSON.parse(r) : []; } catch (_) { return []; } }
function saveHist() { try { localStorage.setItem(STORE_KEY, JSON.stringify(hist.slice(-MAX_STORED))); } catch (_) {} }
const pageCode = () => (/compte-detail/.test(location.pathname) && ACC()[PAGE_CODE]) ? PAGE_CODE : '';

function getSession() {
  try {
    const raw = localStorage.getItem(CFG.authStorageKey);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (!p || !p.user || !p.access_token) return null;
    if (p.expires_at && p.expires_at * 1000 < Date.now()) return null;
    return p;
  } catch (_) { return null; }
}
const aiAvailable = () => CFG.aiMode === 'all' || (CFG.aiMode === 'connected' && !!getSession());

// ── Supabase (lecture seule, clé publique) ─────────────────────
async function sbGet(path, token) {
  const headers = { apikey: CFG.supabaseKey };
  if (token) headers.Authorization = 'Bearer ' + token;
  const r = await fetch(CFG.supabaseUrl + '/rest/v1/' + path, { headers });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}
function loadCatalog() {
  if (catalogPromise) return catalogPromise;
  catalogPromise = (async () => {
    try { const c = sessionStorage.getItem('ic_catalog_v1'); if (c) return JSON.parse(c); } catch (_) {}
    const data = await sbGet('documents_public?select=id,titre,categorie,prix,extension&order=titre&limit=1000');
    try { sessionStorage.setItem('ic_catalog_v1', JSON.stringify(data)); } catch (_) {}
    return data;
  })();
  catalogPromise.catch(() => { catalogPromise = null; });
  return catalogPromise;
}

// ═══ RECHERCHE DE COMPTES ══════════════════════════════════════
let _idx = null;
function buildIndex() {
  if (_idx) return _idx;
  _idx = Object.entries(ACC()).map(([code, d]) => ({
    code, d,
    label: new Set(stems(d.libelle)),
    subs: Object.entries(d.subdivisions || {}).map(([c, l]) => ({ code: c, st: new Set(stems(l)) })),
    ex: new Set(stems((d.exemples_ecritures || []).map(e => e.libelle).join(' '))),
    body: new Set(stems((d.contenu || '').slice(0, 600)))
  }));
  return _idx;
}
const hasAny = (set, group) => group.some(g => set.has(g));

function searchAccounts(q, max) {
  const raw = [...new Set(words(q))];
  if (!raw.length) return [];
  const groups = raw.map(w => [...new Set([stem(w)].concat((SYN[w] || []).flatMap(stems)))]);
  const phrase = norm(q);
  const out = [];
  buildIndex().forEach(e => {
    let score = 0, hit = 0;
    groups.forEach(g => {
      let h = 0;
      if (hasAny(e.label, g)) { score += 6; h = 1; }
      if (e.subs.some(s => hasAny(s.st, g))) { score += 4; h = 1; }
      if (hasAny(e.ex, g)) { score += 3; h = 1; }
      if (hasAny(e.body, g)) { score += 1; h = 1; }
      hit += h;
    });
    if (!hit) return;
    if (groups.length > 1 && hit / groups.length < 0.6) return;
    if (norm(e.d.libelle).includes(phrase)) score += 10;
    if (e.code.length === 1) score -= 3;
    out.push({ code: e.code, score });
  });
  out.sort((a, b) => b.score - a.score || a.code.length - b.code.length);
  return out.filter(r => r.score >= 4).slice(0, max || 3).map(r => r.code);
}

function exactCode(t) {
  const nums = t.match(/\b\d{1,4}\b/g) || [];
  return nums.find(n => ACC()[n]) || '';
}

function ecrHtml(ex) {
  return '<div class="ic-ecr"><span>' + esc(ex.libelle) + '</span><div><b>D</b>' + esc(ex.debit) + '</div><div><b>C</b>' + esc(ex.credit) + '</div></div>';
}
function accountCard(code, opts) {
  const d = ACC()[code]; if (!d) return '';
  const ex = !(opts && opts.noEx) && (d.exemples_ecritures || [])[0];
  return '<div class="ic-card"><div class="ic-card-head">' + accTag(code) + '<strong>' + esc(d.libelle) + '</strong></div>' +
    '<div class="ic-card-sub">' + esc([d.nature, d.sens].filter(Boolean).join(' · ')) + '</div>' +
    (opts && opts.resume && d.contenu ? '<p>' + esc(short(d.contenu, 520)) + '</p>' : '') +
    (ex ? ecrHtml(ex) : '') +
    '<a class="ic-link" href="compte-detail.html?code=' + encodeURIComponent(code) + '" target="_blank" rel="noopener">Voir la fiche complète</a></div>';
}
function aiQr(q) { return CFG.aiMode === 'off' ? [] : [{ label: '💡 Expliquer en détail', ai: q }]; }

function accountsReply(codes, text) {
  return { html: '<p>Voici les comptes les plus proches de votre question :</p>' + codes.map(c => accountCard(c)).join(''), qr: aiQr(text) };
}

function accountSection(code, kind) {
  const d = ACC()[code]; if (!d) return notFound();
  const none = m => ({ html: '<p>' + esc(m) + '</p>' });
  if (kind === 'resume') return { html: accountCard(code, { resume: true, noEx: true }) };
  if (kind === 'fonct') {
    const f = d.fonctionnement || {};
    const lst = a => '<ul class="ic-ul">' + a.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>';
    if (!(f.debit || []).length && !(f.credit || []).length) return none('Ce compte est un compte de regroupement : il n’a pas de fonctionnement propre. Consultez ses subdivisions.');
    return { html: '<div class="ic-card"><div class="ic-card-head">' + accTag(code) + '<strong>Fonctionnement</strong></div>' +
      ((f.debit || []).length ? '<p><strong>Au débit</strong></p>' + lst(f.debit) : '') +
      ((f.credit || []).length ? '<p><strong>Au crédit</strong></p>' + lst(f.credit) : '') + '</div>' };
  }
  if (kind === 'ex') {
    const ex = d.exemples_ecritures || [];
    if (!ex.length) return none('Aucun exemple d’écriture n’est encore renseigné pour ce compte.');
    return { html: '<div class="ic-card"><div class="ic-card-head">' + accTag(code) + '<strong>Exemples d’écritures</strong></div>' + ex.map(ecrHtml).join('') + '</div>' };
  }
  if (kind === 'lies') {
    const l = d.comptes_lies || [];
    if (!l.length) return none('Aucun compte lié n’est renseigné.');
    return { html: '<div class="ic-card"><div class="ic-card-head"><strong>Comptes liés</strong></div><ul class="ic-ul">' +
      l.map(c => '<li>' + accTag(c) + (ACC()[c] ? ' ' + esc(ACC()[c].libelle) : '') + '</li>').join('') + '</ul></div>' };
  }
  if (kind === 'excl') {
    const e = d.exclusions;
    if (!e || (!e.texte && !(e.comptes || []).length)) return none('Aucune exclusion n’est renseignée pour ce compte.');
    return { html: '<div class="ic-card"><div class="ic-card-head"><strong>Exclusions</strong></div>' + (e.texte ? '<p>' + esc(e.texte) + '</p>' : '') +
      ((e.comptes || []).length ? '<p><strong>À utiliser à la place :</strong></p><ul class="ic-ul">' + e.comptes.map(c => '<li>' + esc(c) + '</li>').join('') + '</ul>' : '') + '</div>' };
  }
  if (kind === 'subs') {
    const s = Object.entries(d.subdivisions || {});
    if (!s.length) return none('Ce compte n’a pas de subdivisions.');
    return { html: '<div class="ic-card"><div class="ic-card-head"><strong>Subdivisions</strong></div><ul class="ic-ul">' +
      s.map(([c, l]) => '<li>' + (ACC()[c] ? accTag(c) : '<span class="ic-ctag">' + esc(c) + '</span>') + ' ' + esc(l) + '</li>').join('') + '</ul></div>' };
  }
  if (kind === 'ctrl') {
    const c = d.controle || [];
    if (!c.length) return none('Aucun élément de contrôle n’est renseigné.');
    return { html: '<div class="ic-card"><div class="ic-card-head"><strong>Éléments de contrôle</strong></div><ul class="ic-ul">' + c.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></div>' };
  }
  return notFound();
}
function sectionIntent(t) {
  if (/\b(fonctionnement|mouvements?|debit|credit)\b/.test(t)) return 'fonct';
  if (/\b(exemples?|ecritures?)\b/.test(t)) return 'ex';
  if (/\b(lies|lie|comptes? associes?)\b/.test(t)) return 'lies';
  if (/\b(exclusions?|exclu\w*)\b/.test(t)) return 'excl';
  if (/\b(subdivisions?|sous comptes?)\b/.test(t)) return 'subs';
  if (/\b(controles?|justificatifs?)\b/.test(t)) return 'ctrl';
  if (/\b(resume|definition|role|c est quoi|explique\w*)\b/.test(t)) return 'resume';
  return '';
}

// ═══ FISCALITÉ (Docs-context.js) ═══════════════════════════════
const TAXES = [
  { id: 'tva', title: 'TVA', re: /\b(tva|taxe sur la valeur ajoutee)\b/, get: () => CGI().TVA },
  { id: 'is', title: 'Impôt sur les sociétés (IS)', re: /\b(is|impot sur les societes)\b/, get: () => CGI().IS },
  { id: 'iba', title: 'Impôt sur les bénéfices d’affaires (IBA)', re: /\b(iba|benefices d affaires)\b/, get: () => CGI().IBA },
  { id: 'ircm', title: 'Impôt sur le revenu des capitaux mobiliers (IRCM)', re: /\b(ircm|capitaux mobiliers)\b/, get: () => CGI().IRCM },
  { id: 'irf', title: 'Impôt sur les revenus fonciers (IRF)', re: /\b(irf|revenus fonciers)\b/, get: () => CGI().IRF },
  { id: 'tpvi', title: 'Taxe sur les plus-values immobilières (TPVI)', re: /\b(tpvi|plus values? immobilieres?)\b/, get: () => CGI().TPVI },
  { id: 'its', title: 'Impôt sur les traitements et salaires (ITS)', re: /\b(its|traitements? et salaires?)\b/, get: () => CGI().ITS },
  { id: 'aib', title: 'Acompte sur impôt assis sur les bénéfices (AIB)', re: /\b(aib|acompte sur impot)\b/, get: () => (CGI().retenues_source || {}).AIB },
  { id: 'tfu', title: 'Taxe foncière unique (TFU)', re: /\b(tfu|taxe fonciere)\b/, get: () => CGI().TFU },
  { id: 'tvm', title: 'Taxe sur les véhicules à moteur (TVM)', re: /\b(tvm|vehicules? a moteur)\b/, get: () => CGI().TVM },
  { id: 'tps', title: 'Taxe professionnelle synthétique (TPS)', re: /\b(tps|taxe professionnelle synthetique)\b/, get: () => CGI().TPS },
  { id: 'vps', title: 'Versement patronal sur salaires (VPS)', re: /\b(vps|versement patronal)\b/, get: () => CGI().VPS },
  { id: 'patente', title: 'Contribution des patentes', re: /\bpatentes?\b/, get: () => (CGI().patentes_licences || {}).patentes },
  { id: 'licence', title: 'Contribution des licences', re: /\blicences?\b/, get: () => (CGI().patentes_licences || {}).licences },
  { id: 'tafa', title: 'Taxe sur les activités financières et assurances (TAFA)', re: /\b(tafa|activites financieres)\b/, get: () => CGI().TAFA },
  { id: 'accises', title: 'Droits d’accises', re: /\baccises?\b/, get: () => CGI().droits_accises },
  { id: 'enreg', title: 'Droits d’enregistrement', re: /\b(droits? d enregistrement|enregistrement des actes)\b/, get: () => CGI().droits_enregistrement },
  { id: 'timbre', title: 'Droits de timbre', re: /\btimbres?\b/, get: () => CGI().droits_timbre },
  { id: 'retenue', title: 'Retenues à la source', re: /\bretenues? a la source\b/, get: () => CGI().retenues_source }
];
const detectFiscal = t => TAXES.filter(x => x.re.test(t) && x.get());

const SECTIONS = [
  ['taux', 'Taux'], ['bareme_mensuel', 'Barème mensuel'], ['montants_annuels', 'Montants annuels'], ['tarifs', 'Tarifs'],
  ['calcul', 'Calcul'], ['base_imposable', 'Base imposable'], ['minimum_perception', 'Minimum de perception'],
  ['droits_fixes', 'Droits fixes'], ['droit_proportionnel', 'Droit proportionnel'],
  ['declaration_paiement', 'Déclaration et paiement'], ['versement', 'Versement'], ['paiement', 'Paiement'],
  ['penalites', 'Pénalités'], ['exonerations', 'Exonérations']
];
function rowHtml(x) {
  if (x == null) return '';
  if (typeof x !== 'object') return esc(x);
  const v = Object.values(x).filter(a => a !== '' && a != null).map(a => String(a).replace(/\s+/g, ' '));
  if (!v.length) return '';
  return v.length > 1 ? '<strong>' + esc(v[0]) + '</strong> : ' + esc(v.slice(1).join(' — ')) : esc(v[0]);
}
function listHtml(v) {
  if (v == null) return '';
  if (typeof v === 'string') return '<p>' + esc(short(v, 420)) + '</p>';
  if (Array.isArray(v)) return '<ul class="ic-ul">' + v.map(x => '<li>' + rowHtml(x) + '</li>').join('') + '</ul>';
  return '';
}
function sectionsHtml(o, onlyEch) {
  let h = '', first = true;
  SECTIONS.forEach(([k, label]) => {
    if (o[k] == null || typeof o[k] === 'object' && !Array.isArray(o[k])) return;
    if (onlyEch && !/declaration_paiement|versement|paiement/.test(k)) return;
    const n = Array.isArray(o[k]) ? ' (' + o[k].length + ')' : '';
    h += '<details' + (first ? ' open' : '') + '><summary>' + esc(label + n) + '</summary>' + listHtml(o[k]) + '</details>';
    first = false;
  });
  return h;
}
function taxCard(tax, echeancesOnly) {
  const o = tax.get() || {};
  let h = '<div class="ic-card"><div class="ic-card-head"><strong>' + esc(tax.title) + '</strong></div>';
  const intro = o.definition || o.description || o.nom;
  if (intro && !echeancesOnly) h += '<p>' + esc(short(intro, 330)) + '</p>';
  let body = sectionsHtml(o, echeancesOnly);
  if (!body) {   // objets composés (accises, retenues à la source…)
    Object.entries(o).forEach(([k, v]) => {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        const inner = sectionsHtml(v);
        if (inner || v.nom || v.description) h += '<p><strong>' + esc(v.nom || k.replace(/_/g, ' ')) + '</strong></p>' + (v.description && !v.nom ? '<p class="ic-muted">' + esc(short(v.description, 200)) + '</p>' : '') + (v.taux && typeof v.taux === 'string' ? '<p>' + esc(v.taux) + '</p>' : '') + inner;
      }
    });
  }
  h += body;
  if (echeancesOnly && !body) h += '<p>Pas d’échéance détaillée pour cet impôt dans les données du site.</p>';
  h += '<p class="ic-note">Source : CGI Bénin 2026. <a class="ic-link" href="fiscalite-cgi-benin.html" target="_blank" rel="noopener">Consulter les fiches CGI</a></p></div>';
  return { html: h, qr: aiQr(tax.title) };
}
function listCard(title, arr) {
  if (!arr || !arr.length) return notFound();
  return { html: '<div class="ic-card"><div class="ic-card-head"><strong>' + esc(title) + '</strong></div>' + listHtml(arr) + '<p class="ic-note">Source : CGI Bénin 2026.</p></div>' };
}
function calendarCard() {
  const rows = CGI().calendrier_fiscal;
  if (!rows || !rows.length) return notFound();
  return { html: '<div class="ic-card"><div class="ic-card-head"><strong>Calendrier fiscal annuel</strong></div><ul class="ic-ul">' +
    rows.map(r => '<li><strong>' + esc(r.mois) + '</strong> : ' + esc(short(r.obligation, 230)) + (r.impots ? ' <span class="ic-muted">(' + esc(r.impots) + ')</span>' : '') + '</li>').join('') +
    '</ul><p class="ic-note">Source : CGI Bénin 2026. Vérifiez les dates sur le site de la DGI avant toute déclaration.</p></div>',
    qr: [{ label: 'TVA', say: 'échéances TVA' }, { label: 'IS / IBA', say: 'échéances IS' }, { label: 'ITS', say: 'échéances ITS' }] };
}

// ═══ CALCULATEURS ══════════════════════════════════════════════
const rangeLabel = (lo, hi) => hi === Infinity ? 'Au-delà de ' + lo.toLocaleString('fr-FR').replace(/[\u202f\u00a0\s]/g, NB) : (lo === 0 ? '0' : (lo + 1).toLocaleString('fr-FR').replace(/[\u202f\u00a0\s]/g, NB)) + ' à ' + hi.toLocaleString('fr-FR').replace(/[\u202f\u00a0\s]/g, NB);
function itsResult(base) {
  let total = 0; const rows = [];
  ITS_BAREME.forEach(([lo, hi, r]) => {
    const part = Math.max(0, Math.min(base, hi) - lo);
    if (part > 0) { const tx = part * r; total += tx; rows.push('<tr><td>' + rangeLabel(lo, hi) + '</td><td>' + Math.round(r * 100) + ' %</td><td>' + fmt(part) + '</td><td>' + fmt(tx) + '</td></tr>'); }
  });
  return { html: '<div class="ic-card"><div class="ic-card-head"><strong>ITS mensuel</strong></div><p>Base imposable : <strong>' + fmt(base) + '</strong></p>' +
    '<table class="ic-tbl"><tr><th>Tranche</th><th>Taux</th><th>Part</th><th>ITS</th></tr>' + rows.join('') +
    '<tr class="ic-total"><td colspan="3">ITS à retenir</td><td>' + fmt(total) + '</td></tr></table>' +
    '<p>Versement patronal (VPS, 4 %) : <strong>' + fmt(base * VPS_RATE) + '</strong></p>' +
    '<p class="ic-note">Calcul indicatif selon le barème progressif du CGI Bénin 2026 (art. 119 à 129). La base est le salaire imposable du mois après déduction des cotisations sociales. La redevance ORTB, le taux réduit de VPS de l’enseignement privé et les cas particuliers ne sont pas inclus.</p></div>',
    qr: [{ label: 'Autre calcul ITS', act: 'its' }, { label: 'Fiche ITS', say: 'fiche ITS' }] };
}
function tvaResult(amount, ttc) {
  let ht, tva, total;
  if (ttc) { total = amount; ht = amount / (1 + TVA_RATE); tva = total - ht; } else { ht = amount; tva = ht * TVA_RATE; total = ht + tva; }
  return { html: '<div class="ic-card"><div class="ic-card-head"><strong>TVA au taux normal (18 %)</strong></div>' +
    '<table class="ic-tbl"><tr><td>Montant HT</td><td>' + fmt(ht) + '</td></tr><tr><td>TVA (18 %)</td><td>' + fmt(tva) + '</td></tr><tr class="ic-total"><td>Montant TTC</td><td>' + fmt(total) + '</td></tr></table>' +
    '<p class="ic-note">Les exportations sont à 0 % et certaines opérations sont exonérées : voir la fiche TVA.</p></div>',
    qr: [{ label: 'Autre calcul de TVA', act: 'tva' }, { label: 'Fiche TVA', say: 'fiche TVA' }] };
}
function aibKind(t) {
  if (/\bifu\b/.test(t) && /\b(sans|non|pas)\b/.test(t)) return 'noifu';
  if (/\b(service|services|prestations?)\b/.test(t)) return 'serv';
  if (/\b(import\w*|achats?|marchandises?|fournitures?|travaux)\b/.test(t)) return 'std';
  return '';
}
function aibResult(amount, kind) {
  const k = AIB_RATES[kind];
  return { html: '<div class="ic-card"><div class="ic-card-head"><strong>AIB</strong></div><p class="ic-muted">' + esc(k.label) + '</p>' +
    '<table class="ic-tbl"><tr><td>Montant HT de l’opération</td><td>' + fmt(amount) + '</td></tr><tr><td>Taux</td><td>' + Math.round(k.rate * 100) + ' %</td></tr><tr class="ic-total"><td>AIB à retenir</td><td>' + fmt(amount * k.rate) + '</td></tr></table>' +
    '<p class="ic-note">À reverser au plus tard le 10 du mois suivant ; imputable sur l’IS, l’IBA ou la TPS.</p></div>',
    qr: [{ label: 'Autre calcul AIB', act: 'aib' }, { label: 'Fiche AIB', say: 'fiche AIB' }] };
}
const aibQr = () => [{ label: 'Importation ou achats (1 %)', say: 'importation ou achats' }, { label: 'Prestations de services (3 %)', say: 'prestations de services' }, { label: 'Fournisseur sans IFU (5 %)', say: 'fournisseur sans IFU' }];

function startFlow(id) {
  flow = { id, data: {} };
  if (id === 'its') return { html: '<p>Quelle est la <strong>base imposable mensuelle</strong> du salarié (en FCFA) ? Exemple : <em>350000</em>.</p>' };
  if (id === 'tva') return { html: '<p>Quel est le montant ? Écrivez <strong>TTC</strong> à la suite s’il est toutes taxes comprises, sinon je le prends hors taxe. Exemple : <em>250000</em> ou <em>118000 TTC</em>.</p>' };
  return { html: '<p>Quel est le <strong>montant HT</strong> de l’opération (en FCFA) ?</p>' };
}
function startCalc(kind, text) {
  const t = norm(text), amt = parseAmount(text);
  if (amt == null) return startFlow(kind);
  if (kind === 'its') return itsResult(amt);
  if (kind === 'tva') return tvaResult(amt, /\bttc\b/.test(t));
  const k = aibKind(t);
  if (k) return aibResult(amt, k);
  flow = { id: 'aib', data: { amount: amt } };
  return { html: '<p>Montant retenu : <strong>' + fmt(amt) + '</strong>. De quelle opération s’agit-il ?</p>', qr: aibQr() };
}
function flowStep(text) {
  const f = flow, t = norm(text), nw = t.split(' ').filter(Boolean).length;
  if (/^(annuler|stop|quitter|laisse tomber)\b/.test(t)) { flow = null; return { html: '<p>D’accord, j’annule.</p>', qr: mainQr() }; }
  if (f.id === 'acct') { flow = null; return accountReply(text); }
  if (f.id === 'doc') { flow = null; return docReply(text); }
  if (f.id === 'aib' && f.data.amount != null) {
    const k = aibKind(t);
    if (!k) { if (nw > 4) { flow = null; return null; } return { html: '<p>Choisissez le type d’opération :</p>', qr: aibQr() }; }
    flow = null; return aibResult(f.data.amount, k);
  }
  const n = parseAmount(text);
  if (n == null) {
    if (nw > 3) { flow = null; return null; }
    return { html: '<p>Je n’ai pas compris le montant. Écrivez par exemple <em>350000</em>, ou « annuler ».</p>' };
  }
  flow = null;
  if (f.id === 'its') return itsResult(n);
  if (f.id === 'tva') return tvaResult(n, /\bttc\b/.test(t));
  const k = aibKind(t);
  if (k) return aibResult(n, k);
  flow = { id: 'aib', data: { amount: n } };
  return { html: '<p>Montant retenu : <strong>' + fmt(n) + '</strong>. De quelle opération s’agit-il ?</p>', qr: aibQr() };
}
function detectCalc(t) {
  if (/\b(its|salaires?|traitements?)\b/.test(t)) return 'its';
  if (/\btva\b/.test(t)) return 'tva';
  if (/\baib\b/.test(t)) return 'aib';
  return '';
}
const wantsCalc = (t, amt) => (/\b(calcul\w*|simul\w*|combien)\b/.test(t) || (amt != null && amt >= 1000)) && !/\b(taux|quand|date|echeances?|declar\w*|penalites?|definition)\b/.test(t);

// ═══ DOCUMENTS ═════════════════════════════════════════════════
const DOC_STOP = new Set(['document', 'documents', 'modele', 'modeles', 'fichier', 'fichiers', 'telecharger', 'template', 'existe', 'avez', 'proposez', 'disponible', 'disponibles']);
function docCard(d) {
  const ext = String(d.extension || '').replace('.', '').toUpperCase();
  return '<div class="ic-card"><div class="ic-card-head"><strong>' + esc(d.titre) + '</strong></div>' +
    '<div class="ic-card-sub">' + esc([d.categorie, ext].filter(Boolean).join(' · ')) + '</div>' +
    (d.prix ? '<div class="ic-price">' + fmt(d.prix) + '</div>' : '') +
    '<a class="ic-link" href="documents.html?q=' + encodeURIComponent(d.titre) + '" target="_blank" rel="noopener">Voir dans la liste des documents</a></div>';
}
async function docPrompt() {
  let qr = [];
  try {
    const cat = await loadCatalog(), n = {};
    cat.forEach(d => { if (d.categorie) n[d.categorie] = (n[d.categorie] || 0) + 1; });
    qr = Object.keys(n).sort((a, b) => n[b] - n[a]).slice(0, 6).map(c => ({ label: c, say: 'document ' + c }));
  } catch (_) {}
  flow = { id: 'doc', data: {} };
  return { html: '<p>Quel document cherchez-vous ? Indiquez un mot-clé, par exemple <em>contrat de vente</em>, <em>bilan</em> ou <em>billet à ordre</em>.</p>', qr };
}
async function docReply(text) {
  const raw = [...new Set(words(text).filter(w => !DOC_STOP.has(w)))];
  if (!raw.length) return docPrompt();
  let cat;
  try { cat = await loadCatalog(); } catch (_) {
    return { html: '<p>Le catalogue est momentanément indisponible. Vous pouvez le consulter directement : <a class="ic-link" href="documents.html" target="_blank" rel="noopener">page Documents</a>.</p>' };
  }
  const groups = raw.map(w => [stem(w)]);
  const scored = cat.map(d => {
    const tt = new Set(stems(d.titre)), cc = new Set(stems(d.categorie || ''));
    let s = 0, hit = 0;
    groups.forEach(g => { let h = 0; if (hasAny(tt, g)) { s += 3; h = 1; } if (hasAny(cc, g)) { s += 2; h = 1; } hit += h; });
    return { d, s, hit };
  }).filter(x => x.hit && (groups.length === 1 || x.hit / groups.length >= 0.6)).sort((a, b) => b.s - a.s).slice(0, 5);
  if (!scored.length) return { html: '<p>Aucun modèle payant ne correspond à « ' + esc(raw.join(' ')) + ' ». Les textes officiels, guides et procédures gratuits sont dans la <a class="ic-link" href="documents.html" target="_blank" rel="noopener">page Documents</a>.</p>', qr: [{ label: 'Chercher autre chose', act: 'doc' }] };
  return { html: '<p>Voici ce que j’ai trouvé :</p>' + scored.map(x => docCard(x.d)).join('') +
    '<p><a class="ic-link" href="documents.html" target="_blank" rel="noopener">Parcourir tous les documents</a> (gratuits et payants)</p>' };
}

async function myDownloads() {
  const s = getSession();
  if (!s) return { html: '<p>Connectez-vous pour voir vos documents achetés et vos téléchargements restants.</p><p><a class="ic-link" href="' + esc(loginUrl()) + '">Se connecter</a></p>' };
  let rows, cat = [];
  try {
    rows = await sbGet('document_purchases?select=document_id,downloads_remaining&user_id=eq.' + encodeURIComponent(s.user.id), s.access_token);
    try { cat = await loadCatalog(); } catch (_) {}
  } catch (_) {
    return { html: '<p>Je ne peux pas lire vos achats pour le moment. Réessayez dans quelques minutes ou <a class="ic-link" href="contact.html" target="_blank" rel="noopener">contactez-nous</a>.</p>' };
  }
  const sum = {};
  rows.forEach(r => { sum[r.document_id] = (sum[r.document_id] || 0) + (r.downloads_remaining || 0); });
  const ids = Object.keys(sum);
  if (!ids.length) return { html: '<p>Vous n’avez pas encore acheté de document.</p>', qr: [{ label: 'Trouver un document', act: 'doc' }] };
  const title = id => (cat.find(d => d.id === id) || {}).titre || id;
  ids.sort((a, b) => sum[b] - sum[a]);
  return { html: '<div class="ic-card"><div class="ic-card-head"><strong>Vos documents achetés</strong></div><ul class="ic-ul">' +
    ids.map(id => '<li><strong>' + esc(title(id)) + '</strong> : ' + (sum[id] > 0 ? sum[id] + ' téléchargement' + (sum[id] > 1 ? 's' : '') + ' restant' + (sum[id] > 1 ? 's' : '') : 'téléchargements utilisés, nouveau paiement nécessaire') + '</li>').join('') + '</ul></div>' };
}

// ═══ IA (limitée aux données du site) ══════════════════════════
const isExplain = t => /\b(pourquoi|comment|expliqu\w*|difference|que se passe|peut on|puis je|dois je|est ce que|cas particulier|exemple concret)\b/.test(t);
function aiContext(q) {
  const parts = [], seen = new Set();
  const codes = [pageCode()].concat(searchAccounts(q, 4)).filter(c => c && !seen.has(c) && seen.add(c));
  codes.forEach(c => {
    const d = ACC()[c]; const f = d.fonctionnement || {};
    let s = '[' + c + '] ' + d.libelle + ' | ' + (d.nature || '') + ' | sens : ' + (d.sens || '');
    if (d.contenu) s += '\nContenu : ' + short(d.contenu, 350);
    if ((f.debit || []).length) s += '\nDébit : ' + f.debit.slice(0, 3).join(' ; ');
    if ((f.credit || []).length) s += '\nCrédit : ' + f.credit.slice(0, 3).join(' ; ');
    (d.exemples_ecritures || []).slice(0, 2).forEach(e => { s += '\nEx. : ' + e.libelle + ' → Débit ' + e.debit + ' / Crédit ' + e.credit; });
    parts.push(s);
  });
  detectFiscal(norm(q)).slice(0, 2).forEach(x => parts.push('FISCALITÉ — ' + x.title + ' (CGI Bénin 2026) : ' + short(JSON.stringify(x.get()), 3200)));
  return parts.join('\n\n').slice(0, 9000);
}
function aiSystem(ctx) {
  return 'Tu es l’assistant du site InfoCompta (comptabilité OHADA et fiscalité du Bénin). Réponds en français, de façon concise et structurée, en FCFA uniquement.\n\n' +
    'RÈGLES STRICTES\n1. Réponds UNIQUEMENT à partir du CONTEXTE ci-dessous. N’invente aucun taux, date, article ni numéro de compte.\n' +
    '2. Si le contexte ne contient pas la réponse, écris exactement : « Je n’ai pas cette information dans les données d’InfoCompta. » puis oriente vers la page Contact ou la fiche concernée.\n' +
    '3. Cite les comptes entre crochets, par exemple [401], et la source (plan OHADA InfoCompta ou CGI Bénin 2026).\n' +
    '4. Termine par : « Information indicative : vérifiez dans le texte officiel. »\n' +
    '5. N’utilise ni tableau Markdown (|), ni balise HTML (<br>) : uniquement des paragraphes courts et des listes à puces.\n\nCONTEXTE\n' + ctx;
}
async function askAI(text) {
  if (CFG.aiMode === 'off') return notFound();
  if (!aiAvailable()) return { html: '<p>Les explications détaillées sont réservées aux utilisateurs connectés. <a class="ic-link" href="' + esc(loginUrl()) + '">Se connecter</a></p><p>En attendant, voici ce que je peux faire directement :</p>', qr: mainQr() };
  const used = Number(sessionStorage.getItem('ic_ai_n') || 0);
  if (used >= CFG.aiMaxPerSession) return { html: '<p>Vous avez atteint la limite de questions détaillées pour cette session. Les autres fonctions restent disponibles.</p>', qr: mainQr() };
  const ctx = aiContext(text);
  if (!ctx) return notFound();
  try { sessionStorage.setItem('ic_ai_n', String(used + 1)); } catch (_) {}
  const msgs = hist.slice(-HIST_MAX).map(m => ({ role: m.role, content: m.content }));
  if (!msgs.length || msgs[msgs.length - 1].role !== 'user') msgs.push({ role: 'user', content: text });
  const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 30000);
  try {
    const s = getSession();
    const resp = await fetch(CFG.aiEndpoint, {
      method: 'POST', signal: ctl.signal,
      headers: Object.assign({ 'Content-Type': 'application/json' }, s ? { Authorization: 'Bearer ' + s.access_token } : {}),
      body: JSON.stringify({ system: aiSystem(ctx), messages: msgs })
    });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();
    let reply = '';
    if (Array.isArray(data.content)) data.content.forEach(b => { if (b.type === 'text') reply += b.text; });
    else if (typeof data.content === 'string') reply = data.content;
    if (!reply) throw new Error('vide');
    return { html: md(reply) + '<p class="ic-note">Réponse rédigée à partir des données d’InfoCompta, à titre indicatif.</p>' };
  } catch (_) {
    return { html: '<p>L’assistant d’explication ne répond pas pour le moment. Voici les informations directement disponibles :</p>' + (searchAccounts(text, 2).map(c => accountCard(c)).join('') || ''), qr: mainQr() };
  } finally { clearTimeout(to); }
}

// ═══ ROUTEUR ═══════════════════════════════════════════════════
function mainQr() {
  return [{ label: '🔎 Quel compte ?', act: 'acct' }, { label: '📁 Un document', act: 'doc' }, { label: '📅 Calendrier fiscal', act: 'cal' }, { label: '🧮 Calculer l’ITS', act: 'its' }];
}
function helpReply() {
  return { html: '<p>Je peux vous aider à :</p><ul><li><strong>trouver un compte</strong> du plan OHADA pour une opération (« paiement du loyer »),</li><li><strong>trouver un document</strong> ou un modèle,</li><li>consulter les <strong>taux et échéances</strong> d’un impôt (TVA, IS, ITS…),</li><li><strong>calculer</strong> l’ITS, la TVA ou l’AIB,</li><li>voir vos <strong>téléchargements restants</strong>.</li></ul>', qr: mainQr() };
}
function notFound() {
  return { html: '<p>Je n’ai pas trouvé de réponse précise dans les données d’InfoCompta. Reformulez avec un mot-clé (« loyer », « TVA », « bilan ») ou choisissez une fonction :</p>', qr: mainQr().concat([{ label: 'Nous contacter', say: 'contact' }]) };
}
function accountReply(text) {
  const t = norm(text), ex = exactCode(t);
  if (ex) return { html: accountCard(ex, { resume: true }), qr: aiQr(text) };
  const res = searchAccounts(text, 3);
  if (res.length) return accountsReply(res, text);
  return { html: '<p>Je n’ai pas trouvé de compte correspondant. Essayez avec le nom de l’opération (« achat de marchandises », « salaire », « emprunt bancaire ») ou avec le numéro du compte.</p>', qr: mainQr() };
}

async function route(text) {
  const t = norm(text), nw = t.split(' ').filter(Boolean).length;
  if (flow) { const r = flowStep(text); if (r) return r; }

  if (nw <= 3 && /^(bonjour|bonsoir|salut|hello|coucou)/.test(t)) return { html: '<p>Bonjour ! Que puis-je faire pour vous ?</p>', qr: mainQr() };
  if (nw <= 4 && /^(merci|ok|super|parfait|d accord)/.test(t)) return { html: '<p>Avec plaisir ! N’hésitez pas si vous avez une autre question.</p>' };
  if (nw <= 6 && /\b(aide|menu|fonctions?|que sais tu faire|que peux tu faire)\b/.test(t)) return helpReply();
  if (/^(contact|nous contacter|support)$/.test(t)) return { html: '<p>Vous pouvez nous écrire depuis la <a class="ic-link" href="contact.html" target="_blank" rel="noopener">page Contact</a>.</p>' };

  if (pageCode()) { const sec = sectionIntent(t); if (sec) return accountSection(pageCode(), sec); }

  if (/\b(mes (achats|telechargements|documents|commandes)|telechargements? restants?|combien de telechargements?)\b/.test(t)) return myDownloads();

  const accountWords = /\b(compte|comptes|ecritures?|comptabilis\w*|enregistr\w*|journal|debiter|crediter|debit|credit)\b/.test(t);
  const amt = parseAmount(text);
  const calc = accountWords ? '' : detectCalc(t);
  if (calc && wantsCalc(t, amt)) return startCalc(calc, text);

  if (/\b(documents?|modeles?|fichiers?|telecharg\w*|templates?)\b/.test(t) && !/\bcompte\b/.test(t)) return docReply(text);

  const taxes = accountWords ? [] : detectFiscal(t);
  if (!accountWords && /\b(calendrier|echeances?|date limite|quand (payer|declarer|deposer)|delais?)\b/.test(t)) return taxes.length ? taxCard(taxes[0], true) : calendarCard();
  if (taxes.length) return (isExplain(t) && aiAvailable()) ? askAI(text) : taxCard(taxes[0]);
  if (!accountWords && /\b(penalites?|sanctions?|amendes?)\b/.test(t)) return listCard('Sanctions et pénalités', CGI().sanctions_generales);
  if (!accountWords && /\b(recours|reclamation|contentieux)\b/.test(t)) return listCard('Recours du contribuable', CGI().recours);
  if (!accountWords && /\b(controle fiscal|verification de comptabilite)\b/.test(t)) return listCard('Contrôle fiscal', (CGI().controle_impot || {}).types);

  const ex = exactCode(t);
  if (ex) return { html: accountCard(ex, { resume: true }), qr: aiQr(text) };
  const res = searchAccounts(text, 3);
  if (res.length && !(isExplain(t) && aiAvailable())) return accountsReply(res, text);
  if (isExplain(t)) return askAI(text);
  return notFound();
}

async function runAct(act) {
  flow = null;
  if (act === 'acct') { flow = { id: 'acct', data: {} }; return { html: '<p>Décrivez l’opération ou le compte recherché. Exemples : <em>paiement du loyer</em>, <em>achat de marchandises à crédit</em>, <em>avance au personnel</em>.</p>' }; }
  if (act === 'doc') return docPrompt();
  if (act === 'cal') return calendarCard();
  if (act === 'its' || act === 'tva' || act === 'aib') return startFlow(act);
  if (act === 'mine') return myDownloads();
  return accountSection(pageCode(), act);
}

// ── Copier ─────────────────────────────────────────────────────
function icCopy(text, btn) {
  const done = () => {
    btn.classList.add('copied'); btn.innerHTML = SVG.check + '<span class="ic-copy-label">Copié</span>'; showToast('Réponse copiée');
    setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = SVG.copy + '<span class="ic-copy-label">Copier</span>'; }, 2200);
  };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  else fallbackCopy(text, done);
}
function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta); ta.focus(); ta.select();
  try { document.execCommand('copy'); cb(); } catch (_) {}
  document.body.removeChild(ta);
}
function showToast(msg) {
  const t = document.getElementById('ic-toast'); if (!t) return;
  t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2000);
}

// ── Construction du DOM ────────────────────────────────────────
function buildWidget() {
  const style = document.createElement('style'); style.textContent = STYLE; document.head.appendChild(style);
  const code = pageCode(), d = code ? ACC()[code] : null;

  const chips = code
    ? [['resume', '📊 Résumé'], ['fonct', '🔁 Fonctionnement'], ['ex', '📝 Exemples d’écritures'], ['lies', '🔗 Comptes liés'], ['excl', '🚫 Exclusions'], ['subs', '🗂 Subdivisions'], ['ctrl', '✅ Contrôles'], ['acct', '🔎 Autre compte']]
    : [['acct', '🔎 Quel compte ?'], ['doc', '📁 Trouver un document'], ['cal', '📅 Calendrier fiscal'], ['its', '🧮 Calculer l’ITS'], ['tva', '🧾 Calculer la TVA'], ['aib', '💼 Calculer l’AIB'], ['mine', '📥 Mes téléchargements']];
  const chipsHTML = chips.map(c => '<button type="button" class="ic-chip" data-act="' + c[0] + '">' + c[1] + '</button>').join('');

  const welcome = code
    ? '<p>Bonjour ! Vous consultez la fiche du compte <strong>' + esc(code) + ' · ' + esc(d.libelle) + '</strong>.</p><p>Utilisez les boutons ci-dessus ou posez votre question.</p>'
    : '<p>Bonjour ! Je connais le plan comptable OHADA, le CGI Bénin 2026 et le catalogue de documents InfoCompta.</p><p>Choisissez une fonction ci-dessus ou posez votre question.</p>';

  const wrap = document.createElement('div');
  wrap.innerHTML =
    '<button id="ic-fab" type="button" aria-label="Ouvrir l’assistant InfoCompta"><div id="ic-notif"></div>' + LOGO_IMG + '<span class="ic-fab-label">Assistant</span></button>' +
    '<div id="ic-panel" role="dialog" aria-label="Assistant InfoCompta">' +
      '<div class="ic-header"><div class="ic-header-logo">' + LOGO_IMG + '</div>' +
        '<div class="ic-header-info"><h3>Assistant InfoCompta</h3><p>Plan OHADA · CGI Bénin 2026</p></div>' +
        '<div class="ic-header-btns"><button type="button" class="ic-hbtn" id="ic-clear-btn" title="Effacer la conversation" aria-label="Effacer la conversation">' + SVG.trash + '</button>' +
        '<button type="button" class="ic-hbtn" id="ic-close-btn" title="Fermer" aria-label="Fermer">' + SVG.close + '</button></div></div>' +
      '<div class="ic-chips" id="ic-chips">' + chipsHTML + '</div>' +
      '<div class="ic-messages" id="ic-messages" aria-live="polite"><div class="ic-msg ai"><div class="ic-avatar">I</div><div class="ic-msg-body"><div class="ic-bubble">' + welcome + '</div></div></div></div>' +
      '<div class="ic-input-area"><textarea id="ic-input" rows="1" maxlength="1000" aria-label="Votre question" placeholder="' + (code ? 'Une question sur le compte ' + esc(code) + ' ?' : 'Posez votre question comptable ou fiscale…') + '"></textarea>' +
        '<button type="button" id="ic-send" aria-label="Envoyer">' + SVG.send + '</button></div>' +
      '<div class="ic-footer">Réponses issues des données d’InfoCompta · à titre indicatif</div>' +
    '</div><div id="ic-toast" role="status"></div>';
  document.body.appendChild(wrap);

  const $ = id => document.getElementById(id);
  $('ic-fab').addEventListener('click', () => setOpen(!icOpen));
  $('ic-close-btn').addEventListener('click', () => setOpen(false));
  $('ic-clear-btn').addEventListener('click', clearHistory);
  $('ic-send').addEventListener('click', () => sendText());
  $('ic-input').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(); } });
  $('ic-input').addEventListener('input', function () { this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 100) + 'px'; });
  $('ic-chips').addEventListener('click', e => { const c = e.target.closest('.ic-chip'); if (c) sendAct(c.dataset.act, c.textContent.trim()); });
  $('ic-messages').addEventListener('click', e => {
    const b = e.target.closest('.ic-qr'); if (!b) return;
    const box = b.closest('.ic-qrs'); if (box) box.remove();
    if (b.dataset.act) sendAct(b.dataset.act, b.textContent.trim());
    else if (b.dataset.ai) sendAI(b.dataset.ai);
    else if (b.dataset.say) sendText(b.dataset.say);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && icOpen) setOpen(false); });
  setTimeout(() => { if (!icOpen) $('ic-notif').style.display = 'block'; }, 3000);
}

function setOpen(open) {
  icOpen = open;
  document.getElementById('ic-panel').classList.toggle('open', open);
  document.getElementById('ic-notif').style.display = 'none';
  if (open && !icRestored) {
    icRestored = true;
    if (hist.length) {
      document.getElementById('ic-messages').innerHTML = '';
      hist.forEach(m => { if (m.role === 'user') appendUser(m.content); else appendBot({ html: m.html || esc(m.content) }, true); });
    }
  }
  if (open) setTimeout(() => document.getElementById('ic-input').focus(), 250);
}
function clearHistory() {
  try { localStorage.removeItem(STORE_KEY); } catch (_) {}
  hist = []; icRestored = true; flow = null;
  document.getElementById('ic-messages').innerHTML = '';
  appendBot({ html: '<p>Conversation effacée. Comment puis-je vous aider ?</p>', qr: mainQr() }, true);
}

// ── Messages ───────────────────────────────────────────────────
function scrollDown() { const c = document.getElementById('ic-messages'); c.scrollTop = c.scrollHeight; }
function appendUser(text) {
  const d = document.createElement('div'); d.className = 'ic-msg user';
  d.innerHTML = '<div class="ic-avatar">V</div><div class="ic-msg-body"><div class="ic-bubble">' + esc(text) + '</div></div>';
  document.getElementById('ic-messages').appendChild(d); scrollDown();
}
function appendBot(reply, restoring) {
  const d = document.createElement('div'); d.className = 'ic-msg ai';
  const qr = reply.qr && !restoring ? '<div class="ic-qrs">' + reply.qr.map(q =>
    '<button type="button" class="ic-qr"' + (q.act ? ' data-act="' + esc(q.act) + '"' : '') + (q.ai ? ' data-ai="' + esc(q.ai) + '"' : '') + (q.say ? ' data-say="' + esc(q.say) + '"' : '') + '>' + esc(q.label) + '</button>').join('') + '</div>' : '';
  d.innerHTML = '<div class="ic-avatar">I</div><div class="ic-msg-body"><div class="ic-bubble">' + reply.html + '</div>' +
    '<button type="button" class="ic-copy-btn" aria-label="Copier la réponse">' + SVG.copy + '<span class="ic-copy-label">Copier</span></button>' + qr + '</div>';
  document.getElementById('ic-messages').appendChild(d);
  const bubble = d.querySelector('.ic-bubble');
  d.querySelector('.ic-copy-btn').addEventListener('click', function () { icCopy(bubble.innerText, this); });
  scrollDown();
  return bubble;
}
function showTyping() {
  const d = document.createElement('div'); d.className = 'ic-msg ai'; d.id = 'ic-typing-row';
  d.innerHTML = '<div class="ic-avatar">I</div><div class="ic-typing"><span></span><span></span><span></span></div>';
  document.getElementById('ic-messages').appendChild(d); scrollDown();
}
const removeTyping = () => { const e = document.getElementById('ic-typing-row'); if (e) e.remove(); };

// ── Envoi ──────────────────────────────────────────────────────
async function process(userLabel, producer) {
  if (icBusy) return;
  icBusy = true;
  const send = document.getElementById('ic-send'); send.disabled = true;
  appendUser(userLabel);
  hist.push({ role: 'user', content: userLabel });
  showTyping();
  let reply;
  try { reply = await producer(); } catch (err) { console.error(err); reply = { html: '<p>Une erreur est survenue. Réessayez ou reformulez votre demande.</p>', qr: mainQr() }; }
  removeTyping();
  const bubble = appendBot(reply);
  hist.push({ role: 'assistant', content: short(bubble.innerText, 700), html: reply.html });
  if (hist.length > MAX_STORED) hist.splice(0, hist.length - MAX_STORED);
  saveHist();
  icBusy = false; send.disabled = false;
  document.getElementById('ic-input').focus();
}
function sendText(preset) {
  const input = document.getElementById('ic-input');
  const text = (preset != null ? preset : input.value).trim();
  if (!text) return;
  if (preset == null) { input.value = ''; input.style.height = 'auto'; }
  process(text, () => route(text));
}
function sendAct(act, label) { process(label, () => runAct(act)); }
function sendAI(q) { process('Expliquer en détail', () => askAI(q)); }

// ── Init ───────────────────────────────────────────────────────
if (window.IC_TEST) { window.__ic = { route, runAct, parseAmount, norm, searchAccounts, flowStep, getFlow: () => flow, setFlow: f => { flow = f; } }; return; }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildWidget);
else buildWidget();

})();
