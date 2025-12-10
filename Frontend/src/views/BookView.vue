<!-- Livre Unique | Détails d'un livre -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

type Book = {
    id: string,
    title: string,
    abstract: string,
    comment: string,
    editor: string,
    global_rating: number,  // Corrigé : singular pour correspondre au template
    total_comments: number,
    imagePath: string,
    writer: {
        firstname: string,
        lastname: string
    },
    editionYear: Date,
    numberOfPages: number,
    category: string,
}

// Variables réactives pour la gestion des états
const loading = ref(true)
const error = ref<string | null>(null)
// book reste réactif pour l'affichage dans le template
const book = ref<Book | null>(null)  

// Récupération de l'ID du book depuis l'URL
const route = useRoute()
const bookId = route.params.id as string

// Vérification de l'ID
if (!bookId) {
    error.value = "ID du livre manquant"
    loading.value = false
}

// Fonction de récupération des données
async function fetchBook(): Promise<void> {
    loading.value = true
    
    try {
        const response = await fetch(`http://localhost:3333/books/${bookId}`)
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`)
        }
        
        const body = await response.json()
        book.value = body
        console.log("book:", book.value)
        
    } catch (err) {
        error.value = err instanceof Error ? err.message : "Erreur lors de la récupération du livre"
        console.error(error.value)
        
    } finally {
        loading.value = false
    }
}

// Appel au montage du composant
onMounted(() => {
    if (bookId) {
        fetchBook()
    }
})
</script>

<template>
    <div class="page-body">
        <!-- État de chargement -->
        <div v-if="loading" class="loading-state">
            <p>Chargement du livre...</p>
        </div>

        <!-- État d'erreur -->
        <div v-else-if="error" class="error-state">
            <p>❌ {{ error }}</p>
            <router-link to="/" class="back-btn">Retour à l'accueil</router-link>
        </div>

        <!-- Affichage du livre -->
        <div v-else-if="book" class="book-overview">
            <!-- Image -->
            <div class="book-intro card">
                <img :src="book.imagePath" alt="Couverture" class="book-img" />
            </div>

            <!-- Détails -->
            <div class="book-details card">
                <h1>{{ book.title }}</h1>
                <p>📅 {{ book.editionYear }}</p>
                <p>📚 {{ book.category }}</p>
                <p>✍️ {{ book.writer.firstname }} {{ book.writer.lastname }}</p>
                <p>📄 {{ book.numberOfPages }} pages</p>

                <div class="card-actions">
                    <router-link to="/add-star" class="add-btn">
                        ➕ Ajouter une notation
                    </router-link>
                    <router-link to="/add-comment" class="add-btn">
                        ➕ Ajouter un commentaire
                    </router-link>
                </div>
            </div>

            <!-- Description -->
            <div class="book-description card">
                <p>{{ book.abstract }}</p>

                <router-link :to="`/books/${book.title}.pdf`" class="view-btn">
                    E-book
                </router-link>
            </div>

            <!-- Notation -->
            <div class="book-notation card">
                <h3>Note générale</h3>
                <p>⭐ {{ book.global_rating }} / 5</p>
                <p>{{ book.total_comments }} avis</p>
            </div>
        </div>

        <!-- Aucune donnée -->
        <div v-else class="no-data">
            <p>Aucun livre trouvé</p>
        </div>
    </div>
</template>

<style scoped>
.page-body {
  min-height: 100vh;
  width: 100%;
}

.loading-state,
.error-state,
.no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    font-size: 1.2rem;
}

.back-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 8px;
}

.book-overview {
    height: 50vh;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
}

.card {
    height: 100%;
    padding: 40px;
    background: #f4f4f4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    border-radius: 14px;
}

.book-intro {
    position: relative;
    justify-content: center;
    text-align: center;
    background: white;
    width: 25%;
}

.book-img {
    width: 80%;
    align-self: center;
}
</style>