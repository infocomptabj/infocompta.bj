/* ══════════════════════════════════════════════════
   auth-guard.js — Protection des pages InfoCompta
   À inclure dans toutes les pages SAUF index.html
   Redirige vers auth.html si l'utilisateur n'est pas connecté
══════════════════════════════════════════════════ */

(function() {
  const SUPABASE_URL = 'https://lmivfisdmuqbspvmvdzh.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_kCfhrFPVec2MkCl0xe4N-w_QXHgc0Gp';

  // Charger le SDK Supabase puis vérifier la session
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
  script.onload = async function() {
    const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: { session } } = await sb.auth.getSession();
    if (!session) {
      // Pas connecté → redirection vers la page de connexion
      window.location.href = 'auth.html';
    }
  };
  document.head.appendChild(script);
})();
