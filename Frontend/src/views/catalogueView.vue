<script setup>
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

    <!-- Grid -->
    <div class="catalogue-grid">
      <div v-for="book in books" :key="book.id" class="book-card">
        <!-- Action buttons -->
        <div class="card-actions">
          <router-link :to="`/books/${book.id}/editbook`" title="Modifier" class="action-btn">
            ⚙️
          </router-link>

          <router-link
            :to="`/books/${book.id}/deletebook`"
            title="Supprimer"
            class="action-btn delete"
          >
            🗑️
          </router-link>
        </div>

        <!-- Image -->
        <img :src="book.image" alt="Couverture" />

        <!-- Title -->
        <h2>{{ book.title }}</h2>

        <!-- Stars -->
        <div class="stars">
          <span v-for="n in book.rating" :key="n">★</span>
        </div>

        <!-- Button -->
        <router-link :to="`/books/${book.id}`" class="view-btn"> Voir l'évaluation ➜ </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Page layout */
.page-body {
  padding: 40px;
  background: #f4f4f4;
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

/* Grid layout */
.catalogue-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 40px;
  justify-items: center;
}

/* Book card */
.book-card {
  background: white;
  width: 230px;
  padding: 16px;
  border-radius: 14px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: 0.2s;
}

.book-card:hover {
  transform: translateY(-5px);
}

/* Card buttons */
.card-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-actions button {
  border: none;
  background: white;
  cursor: pointer;
  font-size: 16px;
}

.action-btn {
  border: none;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  opacity: 0.85; /* slight fade by default */
}

.action-btn:hover {
  transform: scale(1.25);
  opacity: 1;
}

/* Book image */
.book-card img {
  width: 170px;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
}

/* Title */
.book-card h2 {
  font-size: 16px;
  margin-bottom: 6px;
  text-align: center;
}

/* Stars */
.stars {
  color: #2563eb;
  margin-bottom: 12px;
}

/* View button */
.view-btn {
  margin-top: auto;
  border: 1px solid #2563eb;
  color: #2563eb;
  padding: 8px 14px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 14px;
  transition: 0.2s;
}

.view-btn:hover {
  background: #e0e7ff;
}
</style>
