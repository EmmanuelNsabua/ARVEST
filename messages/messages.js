// Mock conversations/messages
const conversations = [
  {
    id: 1,
    name: "Sophie M.",
    img: "../assets/profile/profile2.jpg",
    last: "Merci pour ton conte !",
    unread: true,
    messages: [
      { from: "Sophie M.", img: "../assets/profile/profile2.jpg", text: "Merci pour ton conte !" },
      { from: "Vous", img: "../assets/profile/profile.jpg", text: "Avec plaisir !" }
    ]
  },
  {
    id: 2,
    name: "Patrick K.",
    img: "../assets/profile/profile3.jpg",
    last: "On échange sur les proverbes ?",
    unread: false,
    messages: [
      { from: "Vous", img: "../assets/profile/profile.jpg", text: "Salut Patrick !" },
      { from: "Patrick K.", img: "../assets/profile/profile3.jpg", text: "On échange sur les proverbes ?" }
    ]
  }
];
let currentConv = conversations[0];

function renderConversations() {
  const list = document.getElementById('conversations-list');
  list.innerHTML = conversations.map(conv => `
    <li class="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-orange-50 transition ${conv.unread ? 'bg-orange-100' : ''}" data-id="${conv.id}">
      <img src="${conv.img}" class="w-8 h-8 rounded-full object-cover" alt="${conv.name}">
      <div class="flex-1">
        <div class="font-semibold text-gray-800 text-sm">${conv.name}</div>
        <div class="text-xs text-gray-500 truncate">${conv.last}</div>
      </div>
      ${conv.unread ? '<span class="w-2 h-2 rounded-full bg-orange-500"></span>' : ''}
    </li>
  `).join('');
}

function renderMessages(conv) {
  document.getElementById('chat-user-img').src = conv.img;
  document.getElementById('chat-user-name').textContent = conv.name;
  const list = document.getElementById('messages-list');
  list.innerHTML = conv.messages.map(m => `
    <div class="flex ${m.from === 'Vous' ? 'justify-end' : 'justify-start'}">
      <div class="flex items-end gap-2">
        ${m.from !== 'Vous' ? `<img src="${m.img}" class="w-8 h-8 rounded-full object-cover" alt="${m.from}">` : ''}
        <div class="px-4 py-2 rounded-2xl ${m.from === 'Vous' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-800'} shadow text-sm max-w-xs">${m.text}</div>
        ${m.from === 'Vous' ? `<img src="${m.img}" class="w-8 h-8 rounded-full object-cover" alt="${m.from}">` : ''}
      </div>
    </div>
  `).join('');
  list.scrollTop = list.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
  renderConversations();
  renderMessages(currentConv);

  // Switch conversation
  document.getElementById('conversations-list').addEventListener('click', e => {
    const li = e.target.closest('li[data-id]');
    if (!li) return;
    const id = parseInt(li.getAttribute('data-id'), 10);
    currentConv = conversations.find(c => c.id === id);
    renderConversations();
    renderMessages(currentConv);
  });

  // Send message
  document.getElementById('message-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('message-input');
    const val = input.value.trim();
    if (!val) return;
    currentConv.messages.push({ from: "Vous", img: "../assets/profile/profile.jpg", text: val });
    renderMessages(currentConv);
    input.value = '';
  });
});
