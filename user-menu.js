/* ══════════════════════════════════════════════════════
   user-menu.js — Menu profil InfoCompta
   À inclure dans toutes les pages protégées
   Remplace automatiquement le lien "Connexion" par
   un avatar avec les initiales + menu déroulant
══════════════════════════════════════════════════════ */

(function () {
  const SUPABASE_URL = 'https://lmivfisdmuqbspvmvdzh.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_kCfhrFPVec2MkCl0xe4N-w_QXHgc0Gp';

  /* ── Styles injectés dynamiquement ── */
  const style = document.createElement('style');
  style.textContent = `
    /* Cacher le lien Connexion dans le nav */
    nav a[href="auth.html"] { display: none !important; }

    /* Avatar initiales */
    .user-avatar {
      position: relative;
      margin-left: 0.75rem;
      flex-shrink: 0;
    }
    .user-avatar-btn {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: rgba(184,150,62,0.2);
      border: 1.5px solid #d4af6a;
      color: #d4af6a;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, border-color 0.2s;
      outline: none;
      flex-shrink: 0;
    }
    .user-avatar-btn:hover { background: rgba(184,150,62,0.35); border-color: #fff; color: #fff; }

    /* Menu déroulant */
    .user-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      background: #fff;
      border: 1px solid #e2ddd6;
      border-radius: 6px;
      box-shadow: 0 8px 32px rgba(26,46,74,0.16);
      min-width: 220px;
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
      transform: translateY(6px);
      transition: opacity 0.18s ease, transform 0.18s ease;
    }
    .user-dropdown.open {
      opacity: 1;
      pointer-events: all;
      transform: translateY(0);
    }

    /* Infos utilisateur */
    .user-dropdown-info {
      padding: 0.9rem 1rem 0.7rem;
      border-bottom: 1px solid #e2ddd6;
    }
    .user-dropdown-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1rem;
      font-weight: 700;
      color: #1a2e4a;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .user-dropdown-email {
      font-size: 0.75rem;
      color: #7a7a7a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Liens du menu */
    .user-dropdown-links {
      padding: 0.4rem 0;
    }
    .user-dropdown-link {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.55rem 1rem;
      font-size: 0.83rem;
      color: #1e1e1e;
      text-decoration: none;
      cursor: pointer;
      transition: background 0.15s;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-family: 'DM Sans', sans-serif;
    }
    .user-dropdown-link:hover { background: #f7f6f2; }
    .user-dropdown-link.danger { color: #8b2020; }
    .user-dropdown-link.danger:hover { background: #fdecea; }
    .user-dropdown-divider { border: none; border-top: 1px solid #e2ddd6; margin: 0.3rem 0; }

    /* Icônes SVG inline */
    .udl-icon { width: 15px; height: 15px; flex-shrink: 0; opacity: 0.7; }
  `;
  document.head.appendChild(style);

  /* ── Charger Supabase puis initialiser ── */
  function loadSupabase(cb) {
    if (window.supabase) return cb();
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  function getInitials(name, email) {
    if (name && name.trim()) {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (email || '??').slice(0, 2).toUpperCase();
  }

  function buildMenu(user) {
    const name  = user.user_metadata?.full_name || '';
    const email = user.email || '';
    const initials = getInitials(name, email);

    /* Avatar bouton */
    const avatar = document.createElement('div');
    avatar.className = 'user-avatar';
    avatar.innerHTML = `
      <button class="user-avatar-btn" id="userAvatarBtn" title="Mon profil">${initials}</button>
      <div class="user-dropdown" id="userDropdown">
        <div class="user-dropdown-info">
          <div class="user-dropdown-name">${name || 'Mon compte'}</div>
          <div class="user-dropdown-email">${email}</div>
        </div>
        <div class="user-dropdown-links">
          <a class="user-dropdown-link" href="confidentialite.html">
            <svg class="udl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Politique de confidentialité
          </a>
          <hr class="user-dropdown-divider">
          <button class="user-dropdown-link danger" id="logoutBtn">
            <svg class="udl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Se déconnecter
          </button>
        </div>
      </div>
    `;

    /* Insérer dans le header après le hamburger */
    const header = document.querySelector('header');
    if (header) header.appendChild(avatar);

    /* Toggle dropdown */
    const btn      = document.getElementById('userAvatarBtn');
    const dropdown = document.getElementById('userDropdown');

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', function () {
      dropdown.classList.remove('open');
    });

    /* Déconnexion */
    document.getElementById('logoutBtn').addEventListener('click', async function () {
      const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      await sb.auth.signOut();
      window.location.href = 'auth.html';
    });
  }

  loadSupabase(async function () {
    const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: { session } } = await sb.auth.getSession();
    if (session && session.user) buildMenu(session.user);
  });
})();
