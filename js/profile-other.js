import { fetchWorks } from './api.js';

let page = 1;
const pageSize = 6;
let allWorks = [];
let userWorks = [];

function renderPublications(works) {
  const container = document.getElementById('other-profile-publications-list');
  const loadMoreContainer = document.getElementById('other-profile-load-more-container');
  if (!container) return;
  container.innerHTML = works.map(work => `
    <div class="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-md transition">
      <img src="${work.img || '../assets/Explorer/conte1.jpg'}" alt="${work.title}" class="w-full h-40 object-cover">
      <div class="p-3">
        <h3 class="text-sm font-semibold text-gray-800">
          ${work.type === 'Proverbe' ? `« ${work.title} »` : work.title}
        </h3>
        <p class="text-xs text-gray-500">${work.type}</p>
        ${work.type === 'Conte' || work.type === 'Coutume'
          ? `<p class="text-xs text-gray-600 mt-1">${(work.description || '').length > 80 ? work.description.slice(0, 80) + '...' : work.description || ''}</p>
             ${(work.description || '').length > 80 ? `<a href="#" class="text-orange-600 text-xs font-semibold hover:underline">Lire la suite</a>` : ''}`
          : ''}
      </div>
    </div>
  `).join('');
  // Affiche le bouton charger plus seulement si il y a plus à afficher
  if (loadMoreContainer) {
    if (userWorks.length > works.length) {
      loadMoreContainer.style.display = '';
    } else {
      loadMoreContainer.style.display = 'none';
    }
  }
}

async function loadPublications() {
  if (!allWorks.length) {
    allWorks = await fetchWorks();
    // Simule que les œuvres de l'utilisateur sont celles dont author = Sophie M.
    userWorks = allWorks.filter(w => w.author === "Sophie M." || w.author === "Sophie" || !w.author);
  }
  const start = 0;
  const end = page * pageSize;
  renderPublications(userWorks.slice(start, end));
}

document.addEventListener('DOMContentLoaded', () => {
  loadPublications();
  const btn = document.getElementById('other-profile-load-more');
  if (btn) {
    btn.addEventListener('click', () => {
      page++;
      renderPublications(userWorks.slice(0, page * pageSize));
    });
  }
});
