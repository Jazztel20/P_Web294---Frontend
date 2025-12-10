<script setup>
// ---------------------------------------------------
// Imports
// ---------------------------------------------------
import BookCard from '@/components/bookcard/BookCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

// ---------------------------------------------------
// Featured books for the homepage
// (formatted for BookCard)
// ---------------------------------------------------
const books = ref([])
// ------------------------------
// Fetch categories on page load
// ------------------------------
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3333/books/home')
    books.value = res.data
  } catch (err) {
    console.error('Failed to load books:', err)
  }
})

</script>

<template>
  <div class="page-body">
    <div class="page-wrapper">
      <!-- ---------------------------------------
           INTRO TEXT
      ---------------------------------------- -->
      <section class="intro">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel iaculis nisl.
          Aenean commodo tortor a dignissim pulvinar. Nulla consectetur vestibulum dolor, ac porta
          orci lobortis blandit. Donec fringilla quam neque, et lacinia tortor condimentum id.
          Praesent posuere, augue a varius scelerisque, nibh nisl posuere ligula, non ultrices nisi
          ligula rutrum ante. Nunc tincidunt arcu lorem, in faucibus tellus…
        </p>
      </section>

      <!-- ---------------------------------------
           FEATURED BOOKS
      ---------------------------------------- -->
      <section class="books-section">
        <h2 class="section-title">Livres</h2>

        <div class="book-cards">
          <!-- Replaces all your old hardcoded cards -->
          <BookCard
            v-for="book in books"
            :key="book.id"
            :book="book"
            :showActions="false"
          />
        </div>
      </section>
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

.page-body {
  font-family: Arial, Helvetica, sans-serif;
  background: #ffffff;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin: 70px 0;
}

.page-wrapper {
  width: 90%;
  max-width: 1300px;
}

/* ---------------------------------------
   INTRO SECTION
---------------------------------------- */
.intro {
  margin-bottom: 25px;
  line-height: 1.5;
  font-size: 14px;
  text-align: justify;
}

/* ---------------------------------------
   BOOK SECTION
---------------------------------------- */
.books-section {
  border-top: 3px solid #0172c5;
  padding-top: 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}

/* Grid of BookCard items */
.book-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 25px; /* space between cards */
  margin-top: 10px;
}

/* ---------------------------------------
   RESPONSIVE
---------------------------------------- */
@media (max-width: 800px) {
  .book-cards {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
