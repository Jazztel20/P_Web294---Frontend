<script lang="ts">
import type { Book } from '@/api/books';
import { onMounted, ref } from 'vue';
import { EditBook } from '@/api/books'
import { useRoute } from 'vue-router';

const book = ref<Book | null>(null)
const route = useRoute()
const bookId = Number(route.params.id)

onMounted(async () => {
  book.value = await EditBook(bookId) 
})

</script>
<template>
  <div class="grid-parent">
    <div class="grid-child">
      <form action="POST">
        
        <label for="titre">Titre</label><br />
        <input type="text" id="titre" name="titre" placeholder="{{ book.title }}"/><br />

        <label for="categorie">Catégorie</label><br />
        <input type="text" id="categorie" name="categorie" placeholder="{{ book.categories }}"/><br />

        <label for="pages">Nombre de pages</label><br />
        <input type="number" id="pages" name="pages" placeholder="{{ book.numberOfPages }}"/><br />

        <label for="extrait">Extrait</label><br />
        <input type="text" id="extrait" name="extrait" placeholder="{{ book.pdfLink }}"/><br />

        <label for="resume">Résumé</label><br />
        <textarea id="resume" name="resume" placeholder="{{ book.abstract }}"></textarea><br />

        <label for="auteur">Auteur</label><br />
        <input type="text" id="auteur" name="auteur" placeholder="{{ book.title }}"/><br />

        <label for="editeur">Éditeur</label><br />
        <input type="text" id="editeur" name="editeur" placeholder="{{ book.editor }}"/><br />

        <label for="date_publication">Date de publication</label><br />
        <input type="date" id="date_publication" name="date_publication" placeholder="{{ book.editionYear }}"/>

        <input type="submit" value="Submit">
    </form>
    </div>
  </div>
</template>
<style scoped="">

</style>
