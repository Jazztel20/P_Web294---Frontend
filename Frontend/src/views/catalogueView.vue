<script setup>
import BookCard from '@/components/bookcard/BookCard.vue' // ✅ IMPORT COMPONENT

const books = [
  {
    id: 1,
    title: 'Kid Paddle',
    rating: 5,
    image: '/public/covers/kidpaddle.jpg',
  },
  {
    id: 2,
    title: 'Fidel Castro My life',
    rating: 4,
    image: '/public/covers/castromylife.jpg',
  },
]
</script>

<template>
  <div class="page-body">
    <!-- Top bar -->
    <div class="top-bar">
      <h1>Votre catalogue</h1>

      <router-link to="/addbook" class="add-btn"> ➕ Ajouter un ouvrage </router-link>
    </div>

    <!-- ✅ Grid -->
    <div class="catalogue-grid">
      <BookCard v-for="book in books" :key="book.id" :book="book" :showActions="true" />
    </div>
  </div>
</template>

<style scoped>
/* Page layout */
.page-body {
  padding: 40px;
  min-height: 100vh;
}

/* Top bar */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.top-bar h1 {
  font-size: 28px;
  font-weight: bold;
}

/* Add button */
.add-btn {
  background: #22c55e;
  padding: 10px 18px;
  border-radius: 20px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s;
}

.add-btn:hover {
  background: #16a34a;
}

/* ✅ Grid layout stays here */
.catalogue-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 40px;
  justify-items: center;
}
</style>
