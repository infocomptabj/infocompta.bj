/* ══════════════════════════════════════════════════
   auth-guard.js — Protection des pages InfoCompta
   À inclure dans toutes les pages SAUF index.html
   Corrige le FOUC (flash du header) au chargement
══════════════════════════════════════════════════ */

(function() {
  const SUPABASE_URL = 'https://lmivfisdmuqbspvmvdzh.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_kCfhrFPVec2MkCl0xe4N-w_QXHgc0Gp';

  // Masquer immédiatement le header et le body
  // pour éviter le flash visuel
  const hideStyle = document.createElement('style');
  hideStyle.id = 'auth-guard-hide';
  hideStyle.textContent = 'header, nav, main, footer { opacity: 0 !important; }';
  document.head.appendChild(hideStyle);

  function reveal() {
    const s = document.getElementById('auth-guard-hide');
    if (!s) return;
    // Transition douce à l'affichage
    s.textContent = 'header, nav, main, footer { opacity: 1 !important; transition: opacity 0.15s ease; }';
    setTimeout(() => { if (s.parentNode) s.parentNode.removeChild(s); }, 200);
  }

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
  script.onload = async function() {
    const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: { session } } = await sb.auth.getSession();
    if (!session) {
      window.location.href = 'auth.html';
    } else {
      reveal();
    }
  };
  script.onerror = function() {
    // En cas d'erreur réseau, on révèle quand même la page
    reveal();
  };
  document.head.appendChild(script);
})();
