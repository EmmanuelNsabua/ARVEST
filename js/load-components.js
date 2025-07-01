async function loadComponent(id, url) {
  const res = await fetch(url);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
  if (id === 'navbar-placeholder') {
    document.dispatchEvent(new Event('navbarLoaded'));
  }
}

// Correction : n'utilise pas getComponentPath pour charger la navbar/footer
// car le chemin relatif doit TOUJOURS être ../components/ depuis views/ et ./components/ depuis la racine.
// Utilise un chemin absolu depuis la racine du projet pour éviter les erreurs de chemin lors du fetch.

function getComponentPath(file) {
  // Toujours charger depuis /components/ à la racine du serveur
  return '/components/' + file;
}

// Charge la navbar et le footer (toujours présents dans views/)
if (document.getElementById('navbar-placeholder')) {
  loadComponent('navbar-placeholder', getComponentPath('navbar.html'));
}
if (document.getElementById('footer-placeholder')) {
  loadComponent('footer-placeholder', getComponentPath('footer.html'));
}

// Dark mode toggle (ajoute un bouton si besoin)
if (!document.getElementById('darkmode-toggle')) {
  const btn = document.createElement('button');
  btn.id = 'darkmode-toggle';
  btn.className = 'fixed bottom-4 right-4 z-50 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition';
  btn.innerHTML = document.documentElement.classList.contains('dark')
    ? '<i class="bx bx-sun text-xl"></i>'
    : '<i class="bx bx-moon text-xl"></i>';
  btn.title = 'Activer/désactiver le mode sombre';
  btn.onclick = () => {
    document.documentElement.classList.toggle('dark');
    document.body.classList.toggle('dark');
    btn.innerHTML = document.documentElement.classList.contains('dark')
      ? '<i class="bx bx-sun text-xl"></i>'
      : '<i class="bx bx-moon text-xl"></i>';
    // Force la couleur du texte principale
    document.body.classList.toggle('text-gray-100', document.documentElement.classList.contains('dark'));
    document.body.classList.toggle('text-gray-800', !document.documentElement.classList.contains('dark'));
  };
  document.body.appendChild(btn);
  // Applique la couleur du texte au chargement
  if (document.documentElement.classList.contains('dark')) {
    document.body.classList.add('text-gray-100');
    document.body.classList.remove('text-gray-800');
  } else {
    document.body.classList.remove('text-gray-100');
    document.body.classList.add('text-gray-800');
  }
}