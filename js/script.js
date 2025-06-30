import { isAuthenticated, getCurrentUser, logout } from './auth.js';
import { fetchWorks } from './api.js'; 
import { searchWorks } from './search.js';

// Navbar: gestion du scroll (ajoute un fond sur scroll)
document.addEventListener('navbarLoaded', async () => {
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
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Recherche dynamique dans la navbar (si présente)
  const searchInput = document.querySelector('header input[type="text"]');
  // Ajoute ici ta logique de recherche si besoin

  // Affichage du nom d'utilisateur ou bouton connexion (si tu veux l'adapter)
  // const user = getCurrentUser();
  // if (user) { ... }
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

// (Optionnel) Affichage dynamique des œuvres (exemple tailwind)
document.addEventListener('DOMContentLoaded', async () => {
  const works = await fetchWorks();
  const container = document.querySelector('.most-viewed-cards');
  if (container) {
    container.innerHTML = works.map(work => `
      <div class="bg-white rounded-xl shadow p-5 flex flex-col gap-3 hover:shadow-lg transition">
        <img src="../assets/about/index/conte1.jpg" alt="${work.title}" class="rounded-lg h-40 w-full object-cover mb-2">
        <h3 class="font-semibold text-lg text-[#1b263b]">${work.title}</h3>
        <div class="text-gray-700 text-sm">${work.type} • ${work.year}</div>
      </div>
    `).join('');
  }
});
          <div class="mv-card-meta">${work.type} • ${work.year}</div>
        </div>
      `).join('');
    });
  }
});

// Carousel scroll dynamique (pour les carrousels horizontaux)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const btnLeft = carousel.parentElement.querySelector('.carousel-btn.left');
    const btnRight = carousel.parentElement.querySelector('.carousel-btn.right');
    if (btnLeft && btnRight) {
      btnLeft.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
      });
      btnRight.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  });
});

// Filtre catégories (section filtres)
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Ici tu peux ajouter le code pour filtrer les éléments de la catégorie
    });
  });
});

// Afficher les œuvres les plus vues dans la section "Most Viewed"
document.addEventListener('DOMContentLoaded', async () => {
  const works = await fetchWorks();
  const container = document.querySelector('.most-viewed-cards');
  if (container) {
    container.innerHTML = works.map(work => `
      <div class="mv-card">
        <img src="../assets/about/index/conte1.jpg" alt="${work.title}">
        <div class="mv-card-title">${work.title}</div>
        <div class="mv-card-meta">${work.type} • ${work.year}</div>
      </div>
    `).join('');
  }
});
