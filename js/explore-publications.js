import { fetchWorks } from './api.js';

// Mock pour la bannière et suggestions (à remplacer par API)
const heroSlides = [
  {
    img: "../assets/Explorer/explorer-hero.jpg",
    badge: "Nouveautés",
    title: "Découvrez les <span class='text-orange-400'>dernières publications</span>",
    desc: "Plongez dans les nouveaux contes, proverbes et récits partagés par la communauté."
  },
  {
    img: "../assets/Explorer/offer-conte.jpg",
    badge: "Contes populaires",
    title: "Les <span class='text-orange-400'>contes populaires</span> à l'honneur",
    desc: "Des histoires inspirantes et éducatives pour petits et grands."
  },
  {
    img: "../assets/Explorer/offer-proverbe.jpg",
    badge: "Sagesse africaine",
    title: "La <span class='text-orange-400'>sagesse africaine</span> à portée de main",
    desc: "Explorez les proverbes et dictons qui traversent les générations."
  }
];

const nouveautes = [
  {
    img: "../assets/Explorer/offer-conte.jpg",
    title: "Le lion et le lièvre",
    subtitle: "Conte traditionnel • 4.8 ★",
    desc: "Un conte populaire du Katanga sur la ruse et le courage."
  },
  {
    img: "../assets/Explorer/offer-proverbe.jpg",
    title: "La patience est une vertu",
    subtitle: "Proverbe • 4.7 ★",
    desc: "Un proverbe qui enseigne la sagesse et la persévérance."
  },
  {
    img: "../assets/Explorer/offer-theme.jpg",
    title: "Thème : Animaux",
    subtitle: "+120 histoires",
    desc: "Découvrez les contes et proverbes mettant en scène les animaux."
  },
  {
    img: "../assets/Explorer/offer-auteur.jpg",
    title: "Auteur : M. Kalaba",
    subtitle: "Conteur • 4.9 ★",
    desc: "Un des plus grands conteurs du Katanga, gardien de la tradition orale."
  }
];

const suggestions = [
  {
    img: "../assets/profile/profile.jpg",
    name: "Emmanuel N.",
    followers: "1.2k followers",
    desc: "Conteur, passionné de traditions orales."
  },
  {
    img: "../assets/profile/profile2.jpg",
    name: "Sophie M.",
    followers: "2.1k followers",
    desc: "Collectrice de proverbes et récits populaires."
  },
  {
    img: "../assets/profile/profile3.jpg",
    name: "Patrick K.",
    followers: "1.8k followers",
    desc: "Gardien des coutumes et traditions locales."
  }
];

// HERO BANNER dynamique
function renderHeroBanner() {
  const bg = document.getElementById('explore-hero-bg');
  const badge = document.getElementById('explore-hero-badge');
  const title = document.getElementById('explore-hero-title');
  const desc = document.getElementById('explore-hero-desc');
  const dots = document.getElementById('explore-hero-dots');
  let idx = 0;

  function update(idx) {
    bg.src = heroSlides[idx].img;
    badge.textContent = heroSlides[idx].badge;
    title.innerHTML = heroSlides[idx].title;
    desc.textContent = heroSlides[idx].desc;
    Array.from(dots.children).forEach((dot, i) => {
      dot.className = `explore-dot w-3 h-3 rounded-full ${i === idx ? 'bg-orange-400 opacity-80' : 'bg-white opacity-60'}`;
    });
  }

  // Dots
  dots.innerHTML = heroSlides.map((_, i) =>
    `<button class="explore-dot w-3 h-3 rounded-full ${i === 0 ? 'bg-orange-400 opacity-80' : 'bg-white opacity-60'}"></button>`
  ).join('');
  Array.from(dots.children).forEach((dot, i) => {
    dot.addEventListener('click', () => {
      idx = i;
      update(idx);
    });
  });

  update(idx);
  setInterval(() => {
    idx = (idx + 1) % heroSlides.length;
    update(idx);
  }, 6000);
}

// CAROUSEL NOUVEAUTÉS dynamique
function renderNouveautes() {
  const el = document.getElementById('carousel-nouveautes');
  el.innerHTML = nouveautes.map(n =>
    `<div class="min-w-[340px] max-w-[340px] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden snap-center hover:shadow-xl transition">
      <img src="${n.img}" alt="Nouveauté" class="w-full h-48 object-cover">
      <div class="flex flex-col p-6 flex-1">
        <div class="font-bold text-xl text-[#1b263b] mb-1">${n.title}</div>
        <div class="text-sm text-orange-600 mb-2">${n.subtitle}</div>
        <div class="text-gray-600 text-sm">${n.desc}</div>
      </div>
    </div>`
  ).join('');
}

// SUGGESTIONS AUTEURS dynamique
function renderSuggestions() {
  const el = document.getElementById('carousel-suggestions');
  el.innerHTML = suggestions.map(s =>
    `<div class="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 hover:shadow-xl transition snap-center">
      <img src="${s.img}" alt="Auteur" class="w-24 h-24 rounded-full object-cover border-2 border-orange-200 mb-3">
      <div class="font-bold text-lg text-orange-600 mb-1">${s.name}</div>
      <div class="text-xs text-gray-500 mb-2">${s.followers}</div>
      <div class="text-gray-700 text-sm mb-2">${s.desc}</div>
      <button class="px-4 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition text-sm">Suivre</button>
    </div>`
  ).join('');
}

// PUBLICATIONS FEED dynamique
function publicationCard(work, idx) {
  // Type: conte, proverbe, coutume
  let content = '';
  let btn = '';
  if (work.type === 'Conte') {
    content = `<div class="text-xl font-bold text-[#1b263b] mb-1">${work.title}</div>
      <div class="text-gray-600 text-sm mb-2 line-clamp-4">${work.description || ''}</div>`;
    btn = `<a href="#" class="text-orange-600 text-xs font-semibold hover:underline">Lire</a>`;
  } else if (work.type === 'Proverbe') {
    content = `<div class="text-xl font-bold text-[#1b263b] mb-1">« ${work.title} »</div>`;
    btn = '';
  } else if (work.type === 'Coutume') {
    const desc = (work.description || '').length > 120
      ? `${work.description.slice(0, 120)}... <button class="text-orange-600 text-xs font-semibold hover:underline lire-suite-btn" data-id="${work.id}">Lire la suite</button>`
      : work.description || '';
    content = `<div class="text-xl font-bold text-[#1b263b] mb-1">${work.title}</div>
      <div class="text-gray-600 text-sm mb-2 line-clamp-4">${desc}</div>`;
    btn = '';
  }
  return `
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch publication mb-8" data-id="${work.id}">
    <div class="bg-white rounded-2xl shadow-lg flex flex-col p-8 gap-4 relative h-full">
      <div class="flex items-center gap-4 mb-2">
        <img src="${work.authorImg || '../assets/profile/profile.jpg'}" alt="Auteur" class="w-16 h-16 rounded-2xl object-cover border-2 border-orange-200 shadow">
        <div>
          <div class="font-bold text-lg text-orange-600">${work.author || 'Auteur inconnu'}</div>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold hover:bg-orange-200 transition suivre-btn">Suivre</button>
            <span class="text-xs text-gray-500 ml-2">${work.followers || '---'} followers</span>
          </div>
          <div class="text-xs text-gray-400 mt-1">${work.worksCount || '---'} œuvres</div>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div class="flex-1">
          ${content}
          ${btn}
        </div>
        <img src="${work.img || '../assets/Explorer/conte1.jpg'}" alt="${work.type}" class="w-32 h-32 object-cover rounded-xl border border-orange-100">
      </div>
      <div class="flex items-center gap-8 mt-4">
        <button class="pub-like-btn flex items-center gap-2 text-orange-500 font-semibold hover:scale-110 transition" data-liked="false">
          <i class="bx bx-heart text-2xl"></i>
          <span class="like-count">${work.likes || 0}</span>
        </button>
        <button class="pub-comment-btn flex items-center gap-2 text-orange-500 font-semibold hover:scale-110 transition">
          <i class="bx bx-message-rounded text-2xl"></i>
          <span class="comment-count">${(work.comments || []).length}</span>
        </button>
        <button class="pub-share-btn flex items-center gap-2 text-orange-500 font-semibold hover:scale-110 transition">
          <i class="bx bx-share-alt text-2xl"></i>
          <span>Partager</span>
        </button>
      </div>
    </div>
    <div class="bg-orange-50 rounded-2xl shadow flex flex-col p-8 gap-4 h-full pub-comments-block relative min-h-[320px]">
      <div class="font-semibold text-orange-600 mb-2">Commentaires</div>
      <div class="flex flex-col gap-3 pub-comments flex-1">
        ${(work.comments || []).map(c =>
          `<div class="flex items-start gap-3">
            <img src="${c.img || '../assets/profile/profile2.jpg'}" class="w-10 h-10 rounded-full object-cover" alt="User">
            <div class="bg-white rounded-xl px-4 py-2 text-sm text-gray-800 shadow">${c.text}</div>
          </div>`
        ).join('')}
      </div>
      <form class="flex items-center gap-2 mt-2 pub-comment-form absolute bottom-8 left-8 right-8">
        <input type="text" placeholder="Ajouter un commentaire..." class="flex-1 px-3 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        <button type="submit" class="text-orange-600 font-bold">Envoyer</button>
      </form>
    </div>
  </div>
  `;
}

async function renderPublications() {
  const container = document.getElementById('publications-list');
  const works = await fetchWorks();
  if (container && works && works.length) {
    container.innerHTML = works.map((work, idx) => publicationCard(work, idx)).join('');
  }
  bindPublicationEvents();
}

function bindPublicationEvents() {
  // Like
  document.querySelectorAll('.pub-like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const liked = btn.getAttribute('data-liked') === 'true';
      const countSpan = btn.querySelector('.like-count');
      let count = parseInt(countSpan.textContent, 10) || 0;
      if (liked) {
        btn.setAttribute('data-liked', 'false');
        btn.querySelector('i').classList.replace('bxs-heart', 'bx-heart');
        countSpan.textContent = count - 1;
      } else {
        btn.setAttribute('data-liked', 'true');
        btn.querySelector('i').classList.replace('bx-heart', 'bxs-heart');
        countSpan.textContent = count + 1;
      }
    });
  });

  // Commentaires
  document.querySelectorAll('.pub-comment-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="text"]');
      const val = input.value.trim();
      if (!val) return;
      const commentsBlock = form.closest('.pub-comments-block').querySelector('.pub-comments');
      // Ajoute le commentaire en bas de la liste
      const userImg = "../assets/profile/profile.jpg"; // À remplacer par l'utilisateur courant
      const commentDiv = document.createElement('div');
      commentDiv.className = "flex items-start gap-3";
      commentDiv.innerHTML = `
        <img src="${userImg}" class="w-10 h-10 rounded-full object-cover" alt="User">
        <div class="bg-white rounded-xl px-4 py-2 text-sm text-gray-800 shadow">${val}</div>
      `;
      commentsBlock.appendChild(commentDiv);
      input.value = '';
      // Incrémente le compteur de commentaires
      const countSpan = form.closest('.publication').querySelector('.comment-count');
      if (countSpan) countSpan.textContent = parseInt(countSpan.textContent, 10) + 1;
    });
  });

  // Partage
  document.querySelectorAll('.pub-share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Lien de la publication copié ! (fonctionnalité à améliorer)');
    });
  });

  // Suivre un auteur
  document.querySelectorAll('.suivre-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = btn.textContent === 'Suivre' ? 'Suivi' : 'Suivre';
      btn.classList.toggle('bg-orange-200');
      btn.classList.toggle('text-orange-800');
    });
  });

  // Lire la suite pour coutumes
  document.querySelectorAll('.lire-suite-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const pub = btn.closest('.publication');
      const workId = btn.getAttribute('data-id');
      // Ici tu pourrais charger le texte complet via API ou afficher un modal
      alert("Texte complet de la coutume #" + workId);
    });
  });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  renderHeroBanner();
  renderNouveautes();
  renderSuggestions();
  renderPublications();
});
