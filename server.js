// Backend minimal pour Arvest (Node.js + Express, sans base de données)

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Pour __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/components', express.static(path.join(__dirname, 'components')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Exemple d'API mock pour les œuvres
app.get('/api/works', (req, res) => {
  // À remplacer par une vraie base de données plus tard
  res.json([
    {
      id: 1,
      title: "Le lion et le lièvre",
      author: "Anonyme",
      type: "Conte",
      theme: "Ruse",
      year: 2023,
      rating: 4,
      language: "fr",
      img: "assets/Explorer/conte1.jpg",
      content: "<p>Un conte du Kasaï sur la ruse et la sagesse face à la force brute.</p>",
      likes: 12,
      comments: [
        { user: "Sophie M.", img: "assets/profile/profile2.jpg", text: "Magnifique histoire !" }
      ]
    }
    // ...autres œuvres mockées
  ]);
});

// Exemple d'API mock pour l'authentification
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Authentification très basique (à remplacer par une vraie vérification)
  if (username === 'demo' && password === 'demo') {
    res.json({ success: true, user: { username } });
  } else {
    res.status(401).json({ success: false, message: 'Identifiants incorrects' });
  }
});

// Fallback : renvoyer index.html pour toute route inconnue (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur Arvest lancé sur http://localhost:${PORT}`);
});
