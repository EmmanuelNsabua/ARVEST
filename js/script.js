// Scroll: change navbar color on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Smooth nav menu slide from top on burger-menu click

const burger = document.getElementById('burger-menu');
const body = document.body;
const navbar = document.querySelector('.navbar');
const mainContent = document.querySelector('.main-content'); // Assure-toi que ton main a cette classe

if (burger && navbar && mainContent) {
  burger.addEventListener('click', () => {
    body.classList.toggle('menu-open');
    navbar.classList.toggle('menu-open');
    mainContent.classList.toggle('menu-open');
    // Change burger icon
    const burgerIcon = document.getElementById('burger-icon');
    if (burgerIcon) {
      burgerIcon.classList.toggle('bx-menu');
      burgerIcon.classList.toggle('bx-x');
    }
  });
}

// Optional: close menu when clicking outside (mobile only)
document.addEventListener('click', (e) => {
  if (
    body.classList.contains('menu-open') &&
    !e.target.closest('.navbar') &&
    !e.target.closest('#burger-menu')
  ) {
    body.classList.remove('menu-open');
    if (navbar) navbar.classList.remove('menu-open');
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.classList.remove('menu-open');
    const burgerIcon = document.getElementById('burger-icon');
    if (burgerIcon) {
      burgerIcon.classList.add('bx-menu');
      burgerIcon.classList.remove('bx-x');
    }
  }
});

// Search toggle (if floating search box exists)
const searchToggle = document.getElementById('search-toggle');
const searchBoxFloat = document.getElementById('search-box-float');
if (searchToggle && searchBoxFloat) {
  searchToggle.addEventListener('click', () => {
    searchBoxFloat.classList.toggle('active');
  });
}

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
