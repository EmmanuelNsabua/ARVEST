// Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Burger menu toggle + icône change
const burger = document.getElementById('burger-menu');
const burgerIcon = document.getElementById('burger-icon');
const navbar = document.querySelector('.navbar');

burger.addEventListener('click', () => {
  navbar.classList.toggle('open');

  // Change icon
  if (navbar.classList.contains('open')) {
    burgerIcon.classList.replace('bx-menu', 'bx-x');
  } else {
    burgerIcon.classList.replace('bx-x', 'bx-menu');
  }
});

// Search toggle
const searchToggle = document.getElementById('search-toggle');
const searchBoxFloat = document.getElementById('search-box-float');

searchToggle.addEventListener('click', () => {
  searchBoxFloat.classList.toggle('active');
});

// smooth scrolling
let lastScroll = 0;
const navBar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 80) {
    navBar.classList.add('hide'); // Scroll vers le bas : cache la navbar
  } else {
    navBar.classList.remove('hide'); // Scroll vers le haut : affiche la navbar
  }
  lastScroll = currentScroll;
  navBar.classList.toggle('scrolled', currentScroll > 50);
});
