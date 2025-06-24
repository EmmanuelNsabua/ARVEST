<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Arvest - Accueil</title>

  <!-- Google Fonts: Poppins -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />

  <!-- Boxicons -->
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />

  <!-- CSS -->
  <link rel="stylesheet" href="style/main.css" />
</head>
<body>

  <!-- NAVBAR -->
  <header class="navbar">
  <!-- Logo image -->
      <div class="logo">
        <img src="assets/logo.png" alt="Logo Arvest" />
      </div>

      <nav class="nav-links">
        <a href="#">Accueil</a>
        <a href="#">Catégories</a>
        <a href="#">À propos</a>
      </nav>

      <div class="nav-actions">
        <div class="search-box">
          <input type="text" placeholder="Rechercher..." />
          <i class="bx bx-search"></i>
        </div>
        <button class="login-btn"><i class="bx bx-log-in"></i> Connexion</button>
      </div>
      <div class="nav-icons">
      <div class="search-icon" id="search-toggle">
        <i class="bx bx-search"></i>
      </div>
      <div class="burger-menu" id="burger-menu">
        <i class="bx bx-menu" id="burger-icon"></i>
      </div>
    </div>


    </header>


  <!-- HERO BANNER -->
    <!-- HERO SECTION -->

  <section class="hero">
  <img src="assets/hero.jpg" alt="Image de conte" class="hero-img">
  <div class="hero-overlay">
    <div class="hero-text">
      <h1>Redonnons vie à nos traditions</h1>
      <p>
        Découvrez les contes et proverbes ancestraux qui ont bercé des générations,
        et contribuez à préserver notre héritage oral.
      </p>
      <div class="hero-buttons">
        <a href="#" class="btn primary-btn"><i class="bx bx-book-open"></i> Explorer</a>
        <a href="#" class="btn secondary-btn"><i class="bx bx-edit-alt"></i> Contribuer</a>
      </div>
    </div>
  </div>
</section>

<script src="js/script.js"></script>

</body>
</html>
