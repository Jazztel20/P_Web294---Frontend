<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function goToCategory(cat) {
  router.push(`/categories/${cat.id}/books`)
}

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

const selectedCategory = ref('Fiction')

// Temporary static books
const books = [
  { title: "L'Étranger", cover: '/covers/nicolas_sarkozy.jpg', stars: '★★★★★' },
  { title: 'The Communist Manifesto', cover: '/covers/nicolas_sarkozy.jpg', stars: '★★★★★' },
  { title: 'Fidel Castro: My Life', cover: '/covers/nicolas_sarkozy.jpg', stars: '★★★★☆' },
  { title: 'Operation Gladio', cover: '/covers/nicolas_sarkozy.jpg', stars: '★★★★★' },
  { title: 'Astérion et le Minotaure', cover: '/covers/nicolas_sarkozy.jpg', stars: '★★★★☆' },
  { title: 'kid paddle', cover: '/covers/nicolas_sarkozy.jpg', stars: '★★★★★' },
  {
    title: 'sartre et la pétition 23/01/77 Le Monde.',
    cover: '/covers/nicolas_sarkozy.jpg',
    stars: '★★★★☆',
  },
  { title: 'The Prince', cover: '/covers/nicolas_sarkozy.jpg', stars: '★★★★★' },
  {
    title: 'maoism and life expectenca in china',
    cover: '/covers/nicolas_sarkozy.jpg',
    stars: '★★★★★',
  },
  { title: 'Capital Vol. 1', cover: '/covers/nicolas_sarkozy.jpg', stars: '★★★★★' },
  { title: 'The Art of War', cover: '/covers/nicolas_sarkozy.jpg', stars: '★★★★☆' },
]
</script>

<template>
  <div class="page-body">
    <div class="page-wrapper">
      <div class="layout">
        <!-- LEFT CATEGORY COLUMN -->
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

        <!-- BOOKS SECTION -->
        <section class="books-section">
          <h2>{{ selectedCategory }}</h2>

          <div class="book-cards">
            <div class="book-card" v-for="(book, i) in books" :key="i">
              <figure class="book-cover">
                <img :src="book.cover" :alt="book.title" />
              </figure>
              <div class="book-title">{{ book.title }}</div>
              <div class="stars">{{ book.stars }}</div>
              <button class="evaluation-btn">Voir l’évaluation</button>
              <button class="play-btn">▶</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* RESET */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page-body {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.page-wrapper {
  width: 90%;
  max-width: 1300px;
}

/* LAYOUT */
.layout {
  display: flex;
  gap: 20px;
}

/* LEFT CATEGORY COLUMN */
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

.category-item.active {
  background: #0172c5;
  color: #fff;
}

/* BOOKS SECTION */
.books-section {
  flex: 1;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.books-section h2 {
  margin-bottom: 15px;
  border-bottom: 3px solid #0172c5;
  padding-bottom: 10px;
}

.book-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.book-card {
  background: #ffffff;
  border-radius: 10px;
  border: 2px solid #5cb5ff;
  padding: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.book-cover img {
  width: 160px;
  height: 230px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.book-title {
  font-weight: 600;
  margin: 8px 0;
}

.stars {
  color: #0098ff;
  margin-bottom: 8px;
}

.evaluation-btn {
  padding: 6px 12px;
  border-radius: 999px;
  border: 2px solid #0172c5;
  background: #e9f4ff;
  font-size: 12px;
  cursor: pointer;
}

.play-btn {
  margin-top: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #007fd6;
  color: white;
  font-size: 18px;
  cursor: pointer;
}
</style>
