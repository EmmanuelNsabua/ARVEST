import { fetchWorkById } from './api.js';

const urlParams = new URLSearchParams(window.location.search);
const workId = parseInt(urlParams.get('id'), 10) || 1;

let workData = null;
let comments = [
  { user: "Sophie M.", img: "../assets/profile/profile2.jpg", text: "Magnifique histoire !" },
  { user: "Patrick K.", img: "../assets/profile/profile3.jpg", text: "Merci pour ce partage." }
];

function renderWork(work) {
  document.getElementById('lecture-img').src = work.img || "../assets/Explorer/conte1.jpg";
  document.getElementById('lecture-type').textContent = work.type || "Conte";
  document.getElementById('lecture-theme').textContent = work.theme || "";
  document.getElementById('lecture-title').textContent = work.title || "";
  document.getElementById('lecture-author').innerHTML = `<i class="bx bx-user"></i> ${work.author || "Auteur inconnu"}`;
  document.getElementById('lecture-author2').textContent = work.author || "Auteur inconnu";
  document.getElementById('lecture-year').innerHTML = `<i class="bx bx-calendar"></i> ${work.year || "2024"}`;
  document.getElementById('lecture-lang').innerHTML = `<i class="bx bx-globe"></i> ${work.language || "Français"}`;
  document.getElementById('lecture-content').innerHTML = work.content || "<p>Aucun contenu disponible.</p>";
  // Rating
  const rating = work.rating || 3;
  const stars = Array.from({length: 5}, (_, i) =>
    `<i class="bx ${i < rating ? 'bxs-star' : 'bx-star'}"></i>`
  ).join('');
  document.getElementById('lecture-rating').innerHTML = stars;
  document.getElementById('lecture-rating-value').textContent = rating.toFixed(1);
  // Like count (mock)
  document.getElementById('like-count').textContent = work.likes || 0;
}

function renderComments() {
  const list = document.getElementById('comments-list');
  list.innerHTML = comments.map(c => `
    <div class="flex items-start gap-3">
      <img src="${c.img}" class="w-10 h-10 rounded-full object-cover" alt="${c.user}">
      <div>
        <div class="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-800 shadow">${c.text}</div>
        <div class="text-xs text-gray-500 mt-1">${c.user}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
  workData = await fetchWorkById(workId);
  if (!workData) {
    document.getElementById('lecture-content').innerHTML = "<p>Œuvre introuvable.</p>";
    return;
  }
  renderWork(workData);
  renderComments();

  // Like (mock)
  let liked = false;
  document.getElementById('like-btn').addEventListener('click', () => {
    liked = !liked;
    const likeBtn = document.getElementById('like-btn');
    const likeCount = document.getElementById('like-count');
    let count = parseInt(likeCount.textContent, 10) || 0;
    if (liked) {
      likeBtn.querySelector('i').classList.replace('bx-heart', 'bxs-heart');
      likeCount.textContent = count + 1;
    } else {
      likeBtn.querySelector('i').classList.replace('bxs-heart', 'bx-heart');
      likeCount.textContent = Math.max(0, count - 1);
    }
  });

  // Partage (mock)
  document.getElementById('share-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Lien de la publication copié !');
  });

  // Commentaires
  document.getElementById('comment-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('comment-input');
    const val = input.value.trim();
    if (!val) return;
    comments.push({
      user: "Vous",
      img: "../assets/profile/profile.jpg",
      text: val
    });
    renderComments();
    input.value = '';
  });
});
