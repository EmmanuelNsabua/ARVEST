import { isAuthenticated, getCurrentUser, logout } from './auth.js';
import { fetchWorks } from './api.js';
import { searchWorks } from './search.js';

// Navbar: gestion du scroll (ajoute un fond sur scroll)
document.addEventListener('navbarLoaded', () => {
  const navbar = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow', 'bg-white', 'backdrop-blur');
    } else {
      navbar.classList.remove('shadow', 'bg-white', 'backdrop-blur');
    }
  });

  // Burger menu mobile (affiche/masque le menu mobile)
  const burger = document.getElementById('burger-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.onclick = () => {
      mobileMenu.classList.toggle('hidden');
    };
  }

  // Recherche dynamique dans la navbar (si présente)
  const searchInput = document.querySelector('header input[type="text"]');
  if (searchInput) {
    searchInput.addEventListener('input', async e => {
      // Optionnel : recherche instantanée sur les œuvres
      // const works = await fetchWorks();
      // const results = searchWorks(e.target.value, works);
      // Affiche les résultats dans un dropdown ou autre
    });
  }
});

// Correction burger menu si navbar chargée dynamiquement
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('navbarLoaded', () => {
    const burger = document.getElementById('burger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    if (burger && mobileMenu) {
      burger.onclick = () => {
        mobileMenu.classList.toggle('hidden');
      };
    }
  });
});

// Carrousel horizontal (scroll avec boutons, tailwind)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel-nouveautes, .carousel-suggestions').forEach(carousel => {
    carousel.addEventListener('wheel', e => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        carousel.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  });
});

// Filtres catégories (boutons tailwind)
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('bg-orange-100', 'text-orange-600'));
      btn.classList.add('bg-orange-100', 'text-orange-600');
      // Ajoute ici le filtrage des éléments selon la catégorie
    });
  });
});

// Affichage dynamique des œuvres (exemple pour section "most-viewed-cards")
document.addEventListener('DOMContentLoaded', async () => {
  const works = await fetchWorks();
  const container = document.querySelector('.most-viewed-cards');
  if (container) {
    container.innerHTML = works.map(work => `
      <div class="bg-white dark:bg-[#23232b] rounded-xl shadow p-5 flex flex-col gap-3 hover:shadow-lg transition">
        <img src="../assets/about/index/conte1.jpg" alt="${work.title}" class="rounded-lg h-40 w-full object-cover mb-2">
        <h3 class="font-semibold text-lg text-[#1b263b]">${work.title}</h3>
        <div class="text-gray-700 text-sm">${work.type} • ${work.year}</div>
      </div>
    `).join('');
  }
});

// Dark mode toggle (si bouton déjà présent dans le DOM)
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('darkmode-toggle');
  if (btn) {
    btn.onclick = () => {
      document.documentElement.classList.toggle('dark');
      document.body.classList.toggle('dark');
      btn.innerHTML = document.documentElement.classList.contains('dark')
        ? '<i class="bx bx-sun text-xl"></i>'
        : '<i class="bx bx-moon text-xl"></i>';
      document.body.classList.toggle('text-gray-100', document.documentElement.classList.contains('dark'));
      document.body.classList.toggle('text-gray-800', !document.documentElement.classList.contains('dark'));
    };
  }
});

// Redirection après connexion (mock, à placer dans la logique de login)
window.addEventListener('arvest:login-success', () => {
  window.location.href = 'explore.html';
});

// Correction des liens de la bannière (explore.html)
document.addEventListener('DOMContentLoaded', () => {
  // Bouton principal de la bannière explore.html
  const bannerBtn = document.querySelector('a[href="#feed"], a[href="#publications"], a[href="#contes"]');
  if (bannerBtn) {
    bannerBtn.onclick = (e) => {
      e.preventDefault();
      const target = document.getElementById('feed') || document.getElementById('publications') || document.getElementById('contes');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }
  // Boutons "Explorer" sur index.html
  document.querySelectorAll('a[href="bibliotheque.html"], a[href="explore.html"]').forEach(btn => {
    btn.onclick = (e) => {
      // Laisse le lien fonctionner normalement
    };
  });
});
