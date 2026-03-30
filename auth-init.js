/* ══════════════════════════════════════════════════
   auth-init.js — InfoCompta
   Remplace auth-guard.js + user-menu.js
   Un seul fichier : protection + menu profil
   Sans aucun flash visuel (FOUC)
══════════════════════════════════════════════════ */
(function () {
  // Lire les credentials depuis les meta-tags (injectées par le serveur / Vercel)
  // Si les meta-tags sont absentes, on utilise les valeurs de fallback (développement local).
  function getMeta(name, fallback) {
    const el = document.querySelector('meta[name="' + name + '"]');
    return (el && el.content) ? el.content : fallback;
  }
  const SUPABASE_URL = getMeta('supabase-url', 'https://lmivfisdmuqbspvmvdzh.supabase.co');
  const SUPABASE_KEY = getMeta('supabase-key', 'sb_publishable_kCfhrFPVec2MkCl0xe4N-w_QXHgc0Gp');

  /* ── 1. Masquer la page immédiatement ── */
  const mask = document.createElement('style');
  mask.id = 'ic-mask';
  mask.textContent = 'body{opacity:0!important}';
  document.head.appendChild(mask);

  function reveal() {
    const m = document.getElementById('ic-mask');
    if (!m) return;
    m.textContent = 'body{opacity:1!important;transition:opacity 0.18s ease}';
    setTimeout(() => m.remove(), 250);
  }

  /* ── 2. Styles du menu profil (injectés une seule fois) ── */
  const style = document.createElement('style');
  style.textContent = `
    nav a[href="auth.html"]{display:none!important}
    .ic-avatar{position:relative;margin-left:.75rem;flex-shrink:0}
    .ic-avatar-btn{width:36px;height:36px;border-radius:50%;background:rgba(184,150,62,0.2);border:1.5px solid #d4af6a;color:#d4af6a;font-family:'Cormorant Garamond',serif;font-size:.95rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;outline:none;flex-shrink:0;transition:background .2s,border-color .2s}
    .ic-avatar-btn:hover{background:rgba(184,150,62,0.35);border-color:#fff;color:#fff}
    .ic-drop{position:absolute;top:calc(100% + 10px);right:0;background:#fff;border:1px solid #e2ddd6;border-radius:6px;box-shadow:0 8px 32px rgba(26,46,74,0.16);min-width:220px;z-index:9999;opacity:0;pointer-events:none;transform:translateY(6px);transition:opacity .18s ease,transform .18s ease}
    .ic-drop.open{opacity:1;pointer-events:all;transform:translateY(0)}
    .ic-drop-info{padding:.9rem 1rem .7rem;border-bottom:1px solid #e2ddd6}
    .ic-drop-name{font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:700;color:#1a2e4a;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ic-drop-email{font-size:.75rem;color:#7a7a7a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ic-drop-links{padding:.4rem 0}
    .ic-drop-link{display:flex;align-items:center;gap:.6rem;padding:.55rem 1rem;font-size:.83rem;color:#1e1e1e;text-decoration:none;cursor:pointer;transition:background .15s;border:none;background:none;width:100%;text-align:left;font-family:'DM Sans',sans-serif}
    .ic-drop-link:hover{background:#f7f6f2}
    .ic-drop-link.danger{color:#8b2020}
    .ic-drop-link.danger:hover{background:#fdecea}
    .ic-drop-hr{border:none;border-top:1px solid #e2ddd6;margin:.3rem 0}
    .ic-drop-link svg{width:15px;height:15px;flex-shrink:0;opacity:.7}
  `;
  document.head.appendChild(style);

  /* ── 3. Charger Supabase ── */
  const sdk = document.createElement('script');
  sdk.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';

  sdk.onerror = function () { reveal(); };

  sdk.onload = async function () {
    const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: { session } } = await sb.auth.getSession();

    if (!session) {
      window.location.href = 'auth.html';
      return;
    }

    /* ── 4. Construire le menu profil ── */
    const user    = session.user;
    const name    = user.user_metadata?.full_name || '';
    const email   = user.email || '';
    const initials = (function () {
      if (name.trim()) {
        const p = name.trim().split(/\s+/);
        return p.length >= 2
          ? (p[0][0] + p[p.length - 1][0]).toUpperCase()
          : p[0].slice(0, 2).toUpperCase();
      }
      return (email).slice(0, 2).toUpperCase();
    })();

    const wrap = document.createElement('div');
    wrap.className = 'ic-avatar';
    wrap.innerHTML = `
      <button class="ic-avatar-btn" id="icAvatarBtn" title="Mon profil">${initials}</button>
      <div class="ic-drop" id="icDrop">
        <div class="ic-drop-info">
          <div class="ic-drop-name">${name || 'Mon compte'}</div>
          <div class="ic-drop-email">${email}</div>
        </div>
        <div class="ic-drop-links">
          <a class="ic-drop-link" href="confidentialite.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Politique de confidentialité
          </a>
          <hr class="ic-drop-hr">
          <button class="ic-drop-link danger" id="icLogout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Se déconnecter
          </button>
        </div>
      </div>`;

    const header = document.querySelector('header');
    if (header) header.appendChild(wrap);

    /* Toggle dropdown */
    const btn  = document.getElementById('icAvatarBtn');
    const drop = document.getElementById('icDrop');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      drop.classList.toggle('open');
    });
    document.addEventListener('click', function () {
      drop.classList.remove('open');
    });

    /* Déconnexion */
    document.getElementById('icLogout').addEventListener('click', async function () {
      await sb.auth.signOut();
      window.location.href = 'auth.html';
    });

    /* ── 5. Révéler la page une fois tout prêt ── */
    reveal();
  };

  document.head.appendChild(sdk);
})();
