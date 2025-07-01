// Script pour la validation des contenus (modération)

const toValidate = [
  {
    id: 1,
    title: "Le lion et le lièvre",
    author: "Anonyme",
    type: "Conte",
    submitted: "il y a 2h"
  },
  {
    id: 2,
    title: "« La patience est une vertu »",
    author: "Sophie M.",
    type: "Proverbe",
    submitted: "il y a 1h"
  }
];

export function renderValidation(listId = 'validation-list') {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = toValidate.map(item => `
    <div class="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center gap-4">
      <div class="flex-1">
        <div class="font-bold text-lg text-orange-600">${item.title}</div>
        <div class="text-sm text-gray-500">${item.type} • ${item.author}</div>
        <div class="text-xs text-gray-400 mt-1">${item.submitted}</div>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Valider</button>
        <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Refuser</button>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('validation-list')) {
    renderValidation();
  }
});
