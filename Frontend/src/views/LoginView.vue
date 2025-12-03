<template>
  <div class="login-container">
    <header-component />
    <!-- Ton header -->

    <main class="login-content">
      <div class="login-card">
        <h2 class="login-title">Connexion</h2>
        <SimpleTextForm :fields="fields" @submit="handleSubmit" />
      </div>
    </main>

    <footer-component />
    <!-- Ton footer -->
  </div>
</template>

<script setup>
import SimpleTextForm from '@/components/formulaire/Forms.vue'
import HeaderComponent from '@/components/partials/Header.vue'
import FooterComponent from '@/components/partials/Footer.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const fields = [
  {
    name: 'username',
    label: "Nom d'utilisateur",
    type: 'input',
    placeholder: "Entrez votre nom d'utilisateur",
  },
  {
    name: 'password',
    label: 'Mot de passe',
    type: 'password',
    placeholder: 'Entrez votre mot de passe',
  },
]

const LOGIN_URL = 'http://localhost:3333/user/login'

async function handleSubmit(data) {
  try {
    const res = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    // Parser la réponse AVANT d’utiliser result
    const result = await res.json()

    if (!res.ok) {
      const message = result.messages?.join('\n') || result.message || 'Erreur inconnue'
      throw new Error(message)
    }

    // Stockage token / user
    localStorage.setItem('authToken', result.token)
    localStorage.setItem('currentUser', JSON.stringify(result))

    router.push('/')
  } catch (err) {
    console.error('Erreur login complète :', err)
    alert(`Erreur : ${err.message}\nType : ${err.name}`)
  }
}

</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  min-height: 75vh;
}

.login-content {
  flex: 1;
  background: #d8e9ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 15px;
}

.login-card {
  background: #fff;
  width: 100%;
  max-width: 420px;
  padding: 36px 40px;
  border-radius: 18px;
  border: 1px solid #d8e9ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: fadeUp 0.4s ease-out;
}

.login-title {
  text-align: center;
  margin-bottom: 22px;
  color: #005a91;
  font-size: 24px;
  font-weight: 700;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
