// Script pour la page communauté (affichage membres, activités, etc.)

const members = [
  { name: "Emmanuel Nsabua", img: "../assets/profile/profile.jpg", role: "Conteur", desc: "Partage des contes du Kasaï." },
  { name: "Sophie M.", img: "../assets/profile/profile2.jpg", role: "Collectrice de proverbes", desc: "Publie des proverbes chaque semaine." },
  { name: "Patrick K.", img: "../assets/profile/profile3.jpg", role: "Gardien des coutumes", desc: "Explique les traditions Mongo." },
  { name: "Isabelle T.", img: "../assets/profile/profile4.jpg", role: "Auteure", desc: "Écrit sur la solidarité africaine." }
];
const activities = [
  { user: "Sophie M.", img: "../assets/profile/profile2.jpg", action: "a publié un nouveau proverbe", time: "il y a 2 min" },
  { user: "Emmanuel Nsabua", img: "../assets/profile/profile.jpg", action: "a partagé un conte", time: "il y a 10 min" },
  { user: "Patrick K.", img: "../assets/profile/profile3.jpg", action: "a rejoint un événement", time: "il y a 1 h" },
  { user: "Isabelle T.", img: "../assets/profile/profile4.jpg", action: "a commenté une histoire", time: "il y a 2 h" }
];

export function renderMembers(listId = 'communaute-members-list') {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = members.map(m => `
    <div class="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center hover:shadow-lg transition">
      <img src="${m.img}" alt="${m.name}" class="w-20 h-20 rounded-full object-cover border-2 border-orange-400 mb-3">
      <h3 class="font-semibold text-lg text-[#1b263b]">${m.name}</h3>
      <span class="text-xs text-orange-600 font-semibold mb-1">${m.role}</span>
      <p class="text-gray-600 text-sm">${m.desc}</p>
    </div>
  `).join('');
}

export function renderActivities(listId = 'communaute-activity-list') {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = activities.map(a => `
    <div class="flex items-center gap-4 bg-white rounded-xl shadow p-4">
      <img src="${a.img}" alt="${a.user}" class="w-12 h-12 rounded-full object-cover">
      <div>
        <span class="font-semibold text-orange-600">${a.user}</span> ${a.action}
        <div class="text-xs text-gray-400">${a.time}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('communaute-members-list')) renderMembers();
  if (document.getElementById('communaute-activity-list')) renderActivities();
});
