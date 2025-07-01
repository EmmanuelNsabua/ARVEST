// Recherche simple sur les œuvres.
// (aucune modification nécessaire pour la logique actuelle)

export function searchWorks(query, works) {
  if (!query) return works;
  const q = query.toLowerCase();
  return works.filter(work =>
    (work.title && work.title.toLowerCase().includes(q)) ||
    (work.author && work.author.toLowerCase().includes(q)) ||
    (work.type && work.type.toLowerCase().includes(q)) ||
    (work.theme && work.theme.toLowerCase().includes(q))
  );
}

// Exemple d'utilisation :
// import { searchWorks } from './search.js';
// const results = searchWorks('lion', allWorks);