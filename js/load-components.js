async function loadComponent(id, url) {
  const res = await fetch(url);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
  if (id === 'navbar-placeholder') {
    document.dispatchEvent(new Event('navbarLoaded'));
  }
}

// Charge la navbar et le footer
loadComponent('navbar-placeholder', '../components/navbar.html');
loadComponent('footer-placeholder', '../components/footer.html');