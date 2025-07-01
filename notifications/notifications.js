// Notifications mockées (à remplacer par API)
const notifications = [
  {
    icon: "bx bx-message-rounded-dots",
    title: "Nouveau commentaire",
    text: "Sophie M. a commenté votre conte « Le lion et le lièvre ».",
    time: "il y a 2 min",
    unread: true
  },
  {
    icon: "bx bx-user-plus",
    title: "Nouveau follower",
    text: "Patrick K. a commencé à vous suivre.",
    time: "il y a 1 h",
    unread: false
  },
  {
    icon: "bx bx-like",
    title: "Nouvel avis",
    text: "Votre proverbe a reçu un nouveau like.",
    time: "il y a 3 h",
    unread: false
  }
];

function renderNotifications() {
  const list = document.getElementById('notifications-list');
  list.innerHTML = notifications.map(n => `
    <div class="flex items-start gap-4 p-4 rounded-xl shadow bg-white border-l-4 ${n.unread ? 'border-orange-500' : 'border-gray-200'}">
      <div class="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 text-2xl">
        <i class="${n.icon}"></i>
      </div>
      <div class="flex-1">
        <div class="font-semibold text-gray-900">${n.title}</div>
        <div class="text-gray-600 text-sm">${n.text}</div>
        <div class="text-xs text-gray-400 mt-1">${n.time}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderNotifications);
