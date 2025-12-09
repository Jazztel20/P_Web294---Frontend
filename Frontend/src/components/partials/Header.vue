
<script setup>
import { auth } from '@/stores/auth'


const LOGOUT_URL = 'http://localhost:3333/user/logout'

async function handleLogout() {
  try {
    const token = localStorage.getItem('authToken')

    await fetch(LOGOUT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  } catch (err) {
    console.error(err)
  } finally {
    auth.logout()          // 👈 met à jour le store + localStorage
    router.push('/')
  }
}



</script>

<template>
  <header class="top-bar">
    <div class="logo">
      <div class="logo-icon">📚</div>
      <div class="logo-text">Lecture Passion</div>
    </div>

    <nav class="main-nav">
      <ul>
        <li><router-link :to="{ name: 'home' }">Accueil</router-link></li>
        <li><router-link :to="{ name: 'books' }">Livres</router-link></li>
      </ul>
    </nav>
    
    <div v-if='auth.user' class="auth-buttons">
      <button @click="handleLogout">Se déconnecter</button>
    </div>
    <div v-else class="auth-buttons">
      <router-link :to="{ name: 'register' }" class="auth-link">
        S’enregistrer
      </router-link>

      <router-link :to="{ name: 'login' }" class="auth-button">
        Connexion
      </router-link>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #8ad6ff;
  padding: 30px 20px;
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
  gap: 25px;
  padding: 0;
  margin: 0;
}

.main-nav a {
  text-decoration: none;
  color: #0172c5;
  font-weight: 500;
  font-size: x-large;
  padding: 5px 10px;
  border-radius: 14px;
  transition: background 0.3s;
}

.main-nav a:hover {
  background-color: #ffffff;
  box-shadow: inset 0 0 0 1px #0172c5; /* Creates the inner border */
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
