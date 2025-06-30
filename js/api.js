// Simule des appels API pour les œuvres, utilisateurs, etc.

const MOCK_WORKS = [
  {
    id: 1,
    title: "Le lion et le lièvre",
    author: "Anonyme",
    type: "Conte",
    theme: "Ruse",
    year: 2023,
    rating: 4,
    language: "fr",
  },
  // ... autres œuvres mockées
];

export async function fetchWorks() {
  // Simule un appel réseau
  return new Promise(resolve => setTimeout(() => resolve(MOCK_WORKS), 300));
}

export async function fetchWorkById(id) {
  return new Promise(resolve =>
    setTimeout(() => resolve(MOCK_WORKS.find(w => w.id === id)), 200)
  );
}

export async function addWork(work) {
  // Simule l'ajout d'une œuvre (à remplacer par POST API)
  MOCK_WORKS.push({ ...work, id: Date.now() });
  return Promise.resolve({ success: true });
}

// Ajoute d'autres fonctions selon tes besoins (fetchUsers, addUser, etc.)