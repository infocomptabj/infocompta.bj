/* auth-display.js — Affiche le menu profil SANS bloquer le rendu de la page.
   Ne redirige jamais. Ne masque jamais le body. */
(function () {
  function getMeta(name, fallback) {
    const el = document.querySelector('meta[name="' + name + '"]');
    return (el && el.content) ? el.content : fallback;
  }
  const SUPABASE_URL = getMeta('supabase-url', 'https://lmivfisdmuqbspvmvdzh.supabase.co');
  const SUPABASE_KEY = getMeta('supabase-key', 'sb_publishable_kCfhrFPVec2MkCl0xe4N-w_QXHgc0Gp');

  function getCachedSession() {
    try {
      const ref = new URL(SUPABASE_URL).hostname.split('.')[0];
      const raw = localStorage.getItem('sb-' + ref + '-auth-token');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed?.expires_at && parsed.expires_at * 1000 < Date.now()) return null;
      return parsed;
    } catch { return null; }
  }

  const session = getCachedSession();
  if (!session) return;

  const style = document.createElement('style');
  style.textContent = `
    .ic-profile-wrap{position:relative;margin-left:.75rem;flex-shrink:0}
    .ic-avatar-btn{width:36px;height:36px;border-radius:50%;background:rgba(16,57,226,0.14);border:1.5px solid #1039E2;color:#1039E2;font-family:'Outfit',sans-serif;font-size:.95rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;outline:none;flex-shrink:0;transition:background .2s,border-color .2s}
    .ic-avatar-btn:hover{background:rgba(16,57,226,0.28);border-color:#fff;color:#fff}
    .ic-drop{position:absolute;top:calc(100% + 10px);right:0;background:#fff;border:1px solid #D5DEE9;border-radius:6px;box-shadow:0 8px 32px rgba(0,8,91,0.16);min-width:220px;z-index:9999;opacity:0;pointer-events:none;transform:translateY(6px);transition:opacity .18s ease,transform .18s ease}
    .ic-drop.open{opacity:1;pointer-events:all;transform:translateY(0)}
    .ic-drop-info{padding:.9rem 1rem .7rem;border-bottom:1px solid #D5DEE9}
    .ic-drop-name{font-family:'Outfit',sans-serif;font-size:1rem;font-weight:700;color:#00085B;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ic-drop-email{font-size:.75rem;color:#6B7A96;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ic-drop-links{padding:.4rem 0}
    .ic-drop-link{display:flex;align-items:center;gap:.6rem;padding:.55rem 1rem;font-size:.83rem;color:#1e1e1e;text-decoration:none;cursor:pointer;transition:background .15s;border:none;background:none;width:100%;text-align:left;font-family:'DM Sans',sans-serif}
    .ic-drop-link:hover{background:#F5F7FB}
    .ic-drop-link.danger{color:#8b2020}
    .ic-drop-link.danger:hover{background:#fdecea}
    .ic-drop-hr{border:none;border-top:1px solid #D5DEE9;margin:.3rem 0}
  `;
  document.head.appendChild(style);

  function buildMenu() {
    const user = session.user || {};
    const name = user.user_metadata?.full_name || '';
    const email = user.email || '';
    const initials = name.trim()
      ? name.trim().split(/\s+/).map(p => p[0]).join('').slice(0, 2).toUpperCase()
      : (email || '??').slice(0, 2).toUpperCase();
     
const slot = document.getElementById('icAuthSlot');
if (!slot) return;
slot.innerHTML = `
  <button class="ic-avatar-btn" id="icAvatarBtn" title="Mon profil">${initials}</button>
  <div class="ic-drop" id="icDrop">
    <div class="ic-drop-info">
      <div class="ic-drop-name">${name || 'Mon compte'}</div>
      <div class="ic-drop-email">${email}</div>
    </div>
    <div class="ic-drop-links">
      <a class="ic-drop-link" href="confidentialite.html">Politique de confidentialité</a>
      <hr class="ic-drop-hr">
      <button class="ic-drop-link danger" id="icLogout">Se déconnecter</button>
    </div>
  </div>`;

    const btn = document.getElementById('icAvatarBtn');
    const drop = document.getElementById('icDrop');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      drop.classList.toggle('open');
    });
    document.addEventListener('click', function () {
      drop.classList.remove('open');
    });

    document.getElementById('icLogout').addEventListener('click', async function () {
      const sdk = document.createElement('script');
      sdk.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
      sdk.onload = async function () {
        const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        await sb.auth.signOut();
        window.location.href = 'auth.html';
      };
      document.head.appendChild(sdk);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildMenu, { once: true });
  } else {
    buildMenu();
  }
})();
