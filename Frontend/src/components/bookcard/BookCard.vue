<script setup>
defineProps({
  id: Number,
  title: String,
  rating: Number,
  image: String,

  // Optional slots / flags
  showActions: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="book-card">
    <!-- OPTIONAL action buttons -->
    <div v-if="showActions" class="card-actions">
      <router-link :to="`/books/${id}/editbook`" title="Modifier" class="action-btn">
        ⚙️
      </router-link>

      <router-link :to="`/books/${id}/deletebook`" title="Supprimer" class="action-btn delete">
        🗑️
      </router-link>
    </div>

    <!-- Image -->
    <img :src="image" alt="Couverture" />

    <!-- Title -->
    <h2>{{ title }}</h2>

    <!-- Stars -->
    <div class="stars">
      <span v-for="n in rating" :key="n">★</span>
    </div>

    <!-- View button -->
    <router-link :to="`/books/${id}`" class="view-btn"> Voir l'évaluation ➜ </router-link>
  </div>
</template>

<style scoped>
/* You can move the card styles from CatalogueView here */
</style>
