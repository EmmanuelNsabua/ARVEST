import { fetchWorks, addWork } from './api.js';

// Suggestions mock
const suggestions = [
  {
    img: "../assets/profile/profile2.jpg",
    name: "Sophie M.",
    desc: "Collectrice de proverbes",
  },
  {
    img: "../assets/profile/profile3.jpg",
    name: "Lucas B.",
    desc: "Développeur React",
  },
  {
    img: "../assets/profile/profile4.jpg",
    name: "Nadia K.",
    desc: "Photographe",
  }
];

let page = 1;
const pageSize = 6;
let allWorks = [];
let myWorks = [];

function renderPublications(works) {
  const container = document.getElementById('profile-publications-list');
  const loadMoreContainer = document.getElementById('profile-load-more-container');
  if (!container) return;
  container.innerHTML = works.map(work => `
    <div class="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-md transition">
      <img src="${work.img || '../assets/posts/wall-painting.jpg'}" alt="${work.title}" class="w-full h-40 object-cover">
      <div class="p-3">
        <h3 class="text-sm font-semibold text-gray-800">${work.title}</h3>
        <p class="text-xs text-gray-500">${work.author || 'anonyme'}</p>
      </div>
    </div>
  `).join('');
  // Affiche le bouton charger plus seulement si il y a plus à afficher
  if (loadMoreContainer) {
    if (myWorks.length > works.length) {
      loadMoreContainer.style.display = '';
    } else {
      loadMoreContainer.style.display = 'none';
    }
  }
}

function renderSuggestions() {
  const container = document.getElementById('profile-suggestions-list');
  if (!container) return;
  container.innerHTML = suggestions.map(s => `
    <li class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="${s.img}" alt="Profil" class="w-10 h-10 rounded-full object-cover">
        <div>
          <p class="text-sm font-semibold text-gray-800">${s.name}</p>
          <p class="text-xs text-gray-500">${s.desc}</p>
        </div>
      </div>
      <button class="text-sm text-blue-600 hover:underline">Suivre</button>
    </li>
  `).join('');
}

async function loadPublications() {
  if (!allWorks.length) {
    allWorks = await fetchWorks();
    // Simule que les œuvres de l'utilisateur sont celles dont author = Emmanuel Nsabua
    myWorks = allWorks.filter(w => w.author === "Emmanuel Nsabua" || w.author === "Emmanuel" || !w.author);
  }
  const start = 0;
  const end = page * pageSize;
  renderPublications(myWorks.slice(start, end));
}

function showModal(show) {
  document.getElementById('publication-modal').classList.toggle('hidden', !show);
}

function resetModal() {
  document.getElementById('publication-form').reset();
}

document.addEventListener('DOMContentLoaded', () => {
  loadPublications();
  renderSuggestions();

  // Publication modal
  document.getElementById('add-publication-btn').onclick = () => showModal(true);
  document.getElementById('close-publication-modal').onclick = () => showModal(false);

  document.getElementById('publication-form').onsubmit = async (e) => {
    e.preventDefault();
    const type = document.getElementById('publication-type').value;
    const title = document.getElementById('publication-title').value;
    const description = document.getElementById('publication-description').value;
    const imgInput = document.getElementById('publication-img');
    let img = "";
    if (imgInput.files && imgInput.files[0]) {
      img = URL.createObjectURL(imgInput.files[0]);
    }
    const newWork = {
      id: Date.now(),
      title,
      author: "Emmanuel Nsabua",
      type,
      description,
      img,
      year: new Date().getFullYear()
    };
    await addWork(newWork);
    myWorks.unshift(newWork);
    renderPublications(myWorks.slice(0, page * pageSize));
    showModal(false);
    resetModal();
  };

  // Load more
  const btn = document.getElementById('profile-load-more');
  if (btn) {
    btn.addEventListener('click', () => {
      page++;
      renderPublications(myWorks.slice(0, page * pageSize));
    });
  }

  // Menu navigation
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('bg-blue-100', 'text-blue-500', 'border-blue-500'));
      btn.classList.add('bg-blue-100', 'text-blue-500', 'border-blue-500');
      document.getElementById('overview-section').classList.add('hidden');
      document.getElementById('dashboard-section').classList.add('hidden');
      document.getElementById('help-section').classList.add('hidden');
      if (btn.id === 'menu-overview') document.getElementById('overview-section').classList.remove('hidden');
      if (btn.id === 'menu-dashboard') document.getElementById('dashboard-section').classList.remove('hidden');
      if (btn.id === 'menu-help') document.getElementById('help-section').classList.remove('hidden');
    });
  });

  // Changement photo de profil
  document.getElementById('change-avatar-btn').onclick = () => document.getElementById('avatar-input').click();
  document.getElementById('avatar-input').onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      document.getElementById('profile-avatar-img').src = url;
    }
  };

  // Changement photo de couverture (haut et bas)
  document.getElementById('change-cover-btn').onclick =
    document.getElementById('change-cover-btn-bottom').onclick =
      () => document.getElementById('cover-input').click();
  document.getElementById('cover-input').onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      document.getElementById('profile-cover-img').src = url;
    }
  };
});
