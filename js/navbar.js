import { isAuthenticated, getCurrentUser, logout } from './auth.js';

// Génère les actions selon l'état de connexion
function renderNavbarActions() {
  const actions = document.getElementById('navbar-actions');
  const mobileActions = document.getElementById('mobile-navbar-actions');
  if (!actions) return;

  let html = '';
  let mobileHtml = '';
  if (isAuthenticated()) {
    const user = getCurrentUser();
    html = `
      <a href="notifications.html" class="relative p-2 rounded-full hover:bg-orange-100 transition">
        <i class="bx bx-bell text-2xl text-orange-500"></i>
      </a>
      <a href="messages.html" class="relative p-2 rounded-full hover:bg-orange-100 transition">
        <i class="bx bx-message-rounded text-2xl text-orange-500"></i>
      </a>
      <a href="communaute.html" class="relative p-2 rounded-full hover:bg-orange-100 transition">
        <i class="bx bx-group text-2xl text-orange-500"></i>
      </a>
      <a href="profile.html" class="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
        <i class="bx bx-user"></i> ${user.username || 'Profil'}
      </a>
      <button id="logout-btn" class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-400 transition">
        <i class="bx bx-log-out"></i> Déconnexion
      </button>
    `;
    mobileHtml = `
      <a href="notifications.html" class="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold hover:bg-orange-200 transition">
        <i class="bx bx-bell"></i> Notifications
      </a>
      <a href="messages.html" class="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold hover:bg-orange-200 transition">
        <i class="bx bx-message-rounded"></i> Messages
      </a>
      <a href="communaute.html" class="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold hover:bg-orange-200 transition">
        <i class="bx bx-group"></i> Communauté
      </a>
      <a href="profile.html" class="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
        <i class="bx bx-user"></i> ${user.username || 'Profil'}
      </a>
      <button id="logout-btn-mobile" class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-400 transition">
        <i class="bx bx-log-out"></i> Déconnexion
      </button>
    `;
  } else {
    html = `
      <form action="register.html" method="get">
        <button class="flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
          <i class="bx bx-user-plus"></i> Inscription
        </button>
      </form>
      <form action="login.html" method="get">
        <button class="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-400 transition">
          <i class="bx bx-log-in"></i> Connexion
        </button>
      </form>
    `;
    mobileHtml = `
      <form action="register.html" method="get">
        <button class="w-full flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
          <i class="bx bx-user-plus"></i> Inscription
        </button>
      </form>
      <form action="login.html" method="get">
        <button class="w-full flex items-center gap-2 px-5 py-2 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-400 transition">
          <i class="bx bx-log-in"></i> Connexion
        </button>
      </form>
    `;
  }
  actions.innerHTML = html;
  if (mobileActions) mobileActions.innerHTML = mobileHtml;

  // Déconnexion
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      logout();
      window.location.href = 'index.html';
    };
  }
  const logoutBtnMobile = document.getElementById('logout-btn-mobile');
  if (logoutBtnMobile) {
    logoutBtnMobile.onclick = () => {
      logout();
      window.location.href = 'index.html';
    };
  }
}

document.addEventListener('DOMContentLoaded', renderNavbarActions);
document.addEventListener('navbarLoaded', renderNavbarActions);
