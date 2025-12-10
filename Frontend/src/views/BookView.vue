<!-- Livre Unique | Détails d’un livre -->

<script setup>
// LOCAL DATA : A UNIQUE BOOK 
const book = {
    id: 1,
    title: 'Kid Paddle',
    description: 'some text',
    comment: 'This film is interesting',
    global_rating: 5,
    total_comments : 134,
    image: '/public/covers/kidpaddle.jpg',
    publication: '15.05.2004',
    author: 'Nicolas Dupont',
    author_book: '',
    pages: 500,
    category: 'BD / Humour'
}
</script>

<template>
    <div class="page-body">

        <div class="book-overview">

            <!-- Image -->
            <div class="book-intro card">
                <img :src="book.image" alt="Couverture" class="book-img" />
            </div>

            <!-- Détails -->
            <div class="book-details card">
                <h1>{{ book.title }}</h1>
                <p>📅 {{ book.publication }}</p>
                <p>📚 {{ book.category }}</p>
                <p>✍️ {{ book.author }}</p>
                <p>📄 {{ book.pages }} pages</p>

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
                <p>{{ book.description }}</p>

                <router-link :to="`/books/${book.id}`" class="view-btn">
                    E-book
                </router-link>
            </div>

            <!-- Notation -->
            <div class="book-notation card">
                <h3>Note générale</h3>
                <p>⭐ {{ book.global_rating }} / 5  </p>
                <p>     {{ book.total_comments }} avis </p>
            </div>

        </div>
    </div>
</template>

<style scoped>
.page-body {
  min-height: 100vh;
  width: 100%;
}

/* BOOK OVERVIEW NOW TAKES EXACTLY 50% OF SCREEN HEIGHT */
.book-overview {
    height: 50vh;              /* ← The important part */
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;       /* Center vertically inside 50% zone */
    flex-wrap: wrap;           /* Makes layout responsive */
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

