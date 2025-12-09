<script setup>
// -------------------------------------------
// Imports
// -------------------------------------------
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BookCard from '@/components/bookcard/BookCard.vue'

// Router instance (for navigation)
const router = useRouter()

// -------------------------------------------
// Navigate to a category page
// -------------------------------------------
function goToCategory(cat) {
  router.push(`/categories/${cat.id}/books`)
}

// -------------------------------------------
// Category list (static demo data)
// -------------------------------------------
const categories = [
  { id: 1, name: 'Fiction' },
  { id: 2, name: 'Biographies' },
  { id: 3, name: 'Science' },
  { id: 4, name: 'History' },
  { id: 5, name: 'Art' },
  { id: 6, name: 'German Literature' },
  { id: 7, name: 'Philosophy' },
  { id: 8, name: 'Political Theory' },
  { id: 9, name: 'Revolutionary Texts' },
  { id: 10, name: 'Mythology' },
  { id: 11, name: 'Children' },
  { id: 12, name: 'Mystery' },
  { id: 13, name: 'Sociology' },
  { id: 14, name: 'Economics' },
  { id: 15, name: 'Psychology' },
  { id: 16, name: 'Religion' },
]

// Current category (you can update this dynamically later)
const selectedCategory = ref('Fiction')

// -------------------------------------------
// Books list formatted for <BookCard>
// -------------------------------------------
const books = [
  { id: 1, title: "L'Étranger", image: '/covers/nicolas_sarkozy.jpg', rating: 5 },
  { id: 2, title: 'The Communist Manifesto', image: '/covers/nicolas_sarkozy.jpg', rating: 5 },
  { id: 3, title: 'Fidel Castro: My Life', image: '/covers/nicolas_sarkozy.jpg', rating: 4 },
  { id: 4, title: 'Operation Gladio', image: '/covers/nicolas_sarkozy.jpg', rating: 5 },
  { id: 5, title: 'Astérion et le Minotaure', image: '/covers/nicolas_sarkozy.jpg', rating: 4 },
  { id: 6, title: 'Kid Paddle', image: '/covers/nicolas_sarkozy.jpg', rating: 5 },
  { id: 7, title: 'Sartre — pétition 23/01/77', image: '/covers/nicolas_sarkozy.jpg', rating: 4 },
  { id: 8, title: 'The Prince', image: '/covers/nicolas_sarkozy.jpg', rating: 5 },
  {
    id: 9,
    title: 'Maoism & Life Expectancy in China',
    image: '/covers/nicolas_sarkozy.jpg',
    rating: 5,
  },
  { id: 10, title: 'Capital Vol. 1', image: '/covers/nicolas_sarkozy.jpg', rating: 5 },
  { id: 11, title: 'The Art of War', image: '/covers/nicolas_sarkozy.jpg', rating: 4 },
]
</script>

<template>
  <div class="page-body">
    <div class="page-wrapper">
      <div class="layout">
        <!-- ---------------------------------------
             LEFT CATEGORY COLUMN
        ---------------------------------------- -->
        <aside class="category-column">
          <h2>Catégories</h2>

          <div class="category-list">
            <div
              class="category-item"
              v-for="cat in categories"
              :key="cat.id"
              @click="goToCategory(cat)"
            >
              {{ cat.name }}
            </div>
          </div>
        </aside>

        <!-- ---------------------------------------
             BOOKS SECTION
        ---------------------------------------- -->
        <section class="books-section">
          <h2>{{ selectedCategory }}</h2>

          <div class="book-cards">
            <BookCard v-for="book in books" :key="book.id" :book="book" :showActions="false" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* GLOBAL RESET */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* PAGE WRAPPER */
.page-body {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.page-wrapper {
  width: 90%;
  max-width: 1300px;
}

/* MAIN LAYOUT */
.layout {
  display: flex;
  gap: 20px;
}

/* LEFT COLUMN */
.category-column {
  width: 250px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
}

.category-column h2 {
  margin-bottom: 15px;
  color: #333;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-item {
  padding: 12px;
  background: #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  transition: 0.3s;
  color: #555;
}

.category-item:hover {
  background: #ccc;
}

/* BOOKS SECTION */
.books-section {
  flex: 1;
  background: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.books-section h2 {
  margin-bottom: 20px;
  border-bottom: 3px solid #0172c5;
  padding-bottom: 8px;
}

/* CARD GRID */
.book-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 30px; /* more spacing between cards */
  padding-top: 10px;
}
</style>
