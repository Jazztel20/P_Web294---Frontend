<script setup></script>

<template>
  <header class="top-bar">
    <div class="logo">
      <div class="logo-icon">📚</div>
      <div class="logo-text">Lecture Passion</div>
    </div>

    <nav class="main-nav">
      <ul>
        <li><a href="#">Accueil</a></li>
        <li><a href="#">Livres</a></li>
      </ul>
    </nav>

    <div class="auth-buttons">
      <!-- À remplacer plus tard par <router-link> -->
      <span class="auth-link">S’enregistrer</span>
      <button class="auth-button">Connexion</button>
    </div>
  </header>
</template>

<style scoped>

header {
  background-color: #4ac0ff;
}
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4ac0ff, #ff6fb5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.logo-text {
  font-weight: bold;
  font-size: 18px;
}

/* Navigation */
.main-nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

.main-nav a {
  text-decoration: none;
  color: #0172c5;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 6px;
  transition: background 0.3s;
}

.main-nav a:hover {
  background-color: #e9f4ff;
}

/* Auth Buttons */
.auth-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.auth-link {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 999px;
  border: 2px solid #0172c5;
  background: #e9f4ff;
}

.auth-button {
  cursor: pointer;
  padding: 5px 14px;
  border-radius: 999px;
  border: 2px solid #0172c5;
  background: #ffffff;
}

/* Responsive */
@media (max-width: 800px) {
  .top-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .main-nav ul {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
