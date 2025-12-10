<template>
  <div class="login-container">
    
    <main class="login-content">
      <div class="login-card">
        <h2 class="login-title">Connexion</h2>
        <SimpleTextForm 
          :fields="fields"
          @submit="handleSubmit"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import SimpleTextForm from '@/components/formulaire/LoginForm.vue'
import { useRouter } from 'vue-router'
import { auth } from '@/stores/auth'   // 👈 on importe le store

const router = useRouter()

const fields = [
  { 
    name: 'username',
    label: "Nom d'utilisateur",
    type: 'text',
    placeholder: "Entrez votre nom d'utilisateur"
  },
  { 
    name: 'password',
    label: 'Mot de passe',
    type: 'password',
    placeholder: 'Entrez votre mot de passe'
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

    if (!res.ok) throw new Error('Identifiants incorrects')

    const result = await res.json()

    // 👉 adapte si ton backend renvoie { token, user }
    const token = result.token
    const user = result.user ?? result   // au cas où ce soit directement l’utilisateur

    // ⚠️ PAS de JSON.stringify sur le token, sinon tu as `"token"` et pas `token`
    localStorage.setItem('authToken', token)

    // On met à jour le store (et ça mettra aussi à jour le Header)
    auth.login(user)

    router.push('/')
  } catch (err) {
    alert(err.message)
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
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
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
  from { opacity: 0; transform: translateY(15px);}
  to { opacity: 1; transform: translateY(0);}
}
</style>
