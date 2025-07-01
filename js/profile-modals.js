// Gestion des popups Modifier le profil et Paramètres

document.addEventListener('DOMContentLoaded', () => {
  // Modifier le profil
  const editBtn = document.getElementById('edit-profile-btn');
  const editModal = document.getElementById('edit-profile-modal');
  const closeEdit = document.getElementById('close-edit-profile-modal');
  const editForm = document.getElementById('edit-profile-form');
  const nameInput = document.getElementById('edit-profile-name');
  const bioInput = document.getElementById('edit-profile-bio');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');

  editBtn.onclick = () => {
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
    editModal.classList.remove('hidden');
  };
  closeEdit.onclick = () => editModal.classList.add('hidden');
  editForm.onsubmit = e => {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    editModal.classList.add('hidden');
  };

  // Paramètres
  const settingsBtn = document.getElementById('settings-btn');
  const settingsModal = document.getElementById('settings-modal');
  const closeSettings = document.getElementById('close-settings-modal');
  const settingsForm = document.getElementById('settings-form');

  settingsBtn.onclick = () => settingsModal.classList.remove('hidden');
  closeSettings.onclick = () => settingsModal.classList.add('hidden');
  settingsForm.onsubmit = e => {
    e.preventDefault();
    // Ici tu pourrais sauvegarder les paramètres utilisateur
    settingsModal.classList.add('hidden');
  };
});
