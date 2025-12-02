<script setup>
import Header from '@/components/partials/Header.vue'
import Footer from '@/components/partials/Footer.vue'
</script>

<template>
  <Header />
  <div class="page-body">
    <div class="page-wrapper">
      <!-- HEADER -->

      <!-- INTRO -->
      <section class="intro">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel iaculis nisl.
          Aenean commodo tortor a dignissim pulvinar. Nulla consectetur vestibulum dolor, ac porta
          orci lobortis blandit. Donec fringilla quam neque, et lacinia tortor condimentum id.
          Praesent posuere, augue a varius scelerisque, nibh nisl posuere ligula, non ultrices nisi
          ligula rutrum ante. Nunc tincidunt arcu lorem, in faucibus tellus porttitor vitae.
          Suspendisse non dolor at lectus lobortis auctor. Vivamus at ligula enim. Donec orci
          lectus, blandit vitae euismod et, gravida a…
        </p>
      </section>

      <!-- LIVRES -->
      <section class="books-section">
        <!-- CARTES D’ÉVALUATION -->
        <div class="book-cards">
          <div class="book-card">
            <figure class="book-cover">
              <img src="@/assets/nicolas_sarkozy.jpg" alt="Kid Paddle" />
            </figure>
            <div class="book-title">Kid Paddle</div>
            <div class="stars">★★★★★</div>
            <button class="evaluation-btn">Voir l’évaluation</button>
            <button class="play-btn">▶</button>
          </div>

          <div class="book-card">
            <figure class="book-cover">
              <img src="@/assets/nicolas_sarkozy.jpg" alt="Kid Paddle" />
            </figure>
            <div class="book-title">Sarko 5 ans</div>
            <div class="stars">★★★★★</div>
            <button class="evaluation-btn">Voir l’évaluation</button>
            <button class="play-btn">▶</button>
          </div>

          <div class="book-card">
            <figure class="book-cover">
              <img src="@/assets/nicolas_sarkozy.jpg" alt="Kid Paddle" />
            </figure>
            <div class="book-title">Pour Maël</div>
            <div class="stars">★★★★★</div>
            <button class="evaluation-btn">Voir l’évaluation</button>
            <button class="play-btn">▶</button>
          </div>

          <div class="book-card">
            <figure class="book-cover">
              <img src="@/assets/nicolas_sarkozy.jpg" alt="Kid Paddle" />
            </figure>
            <div class="book-title">Frappe atomique</div>
            <div class="stars">★★★★★</div>
            <button class="evaluation-btn">Voir l’évaluation</button>
            <button class="play-btn">▶</button>
          </div>

          <div class="book-card">
            <figure class="book-cover">
              <img src="@/assets/nicolas_sarkozy.jpg" alt="Kid Paddle" />
            </figure>
            <div class="book-title">Pour l’ETML</div>
            <div class="stars">★★★★★</div>
            <button class="evaluation-btn">Voir l’évaluation</button>
            <button class="play-btn">▶</button>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <Footer />
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
  font-family: Arial, Helvetica, sans-serif;
  background: #ffffff;
  display: flex;
  justify-content: center;
  padding: 20px;
}

/* INTRO */
.intro {
  margin-bottom: 25px;
  line-height: 1.5;
  font-size: 14px;
  text-align: justify;
}

/* SECTION LIVRES */
.books-section {
  border-top: 3px solid #0172c5;
  padding-top: 15px;
  margin-bottom: 20px;
}

.book-covers {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  margin-bottom: 15px;
  overflow-x: auto;
}

.book-cover img {
  width: 160px;
  height: 230px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.book-cards {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.book-card {
  flex: 1;
  min-width: 180px;
  background: #ffffff;
  border-radius: 10px;
  border: 2px solid #5cb5ff;
  padding: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.book-title {
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 14px;
}

.stars {
  color: #0098ff;
  margin-bottom: 8px;
  font-size: 14px;
}

.evaluation-btn {
  margin-top: 4px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 2px solid #0172c5;
  background: #e9f4ff;
  font-size: 12px;
  cursor: pointer;
}

.play-btn {
  margin-top: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #007fd6;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
}

/* RESPONSIVE */
@media (max-width: 800px) {
  .books-section {
    padding-top: 10px;
  }

  .book-covers,
  .book-cards {
    flex-wrap: nowrap;
  }
}
</style>
