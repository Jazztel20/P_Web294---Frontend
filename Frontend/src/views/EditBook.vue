<script lang="ts" setup>
import type { Book } from '@/api/books';
import { onMounted, ref } from 'vue';
import { EditBook } from '@/api/books'
import { useRoute } from 'vue-router';

const book = ref<Book>({
  id: 0,
  title: '',
  abstract: '',
  editor: '',
  editionYear: 0,
  writer: { name: '' },
  category: { name: '' },
  user: { username: '' },
  pdfLink: ''
});
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
        <input type="text" id="titre" name="titre" v-model="book.title" />

        <label for="categorie">Catégorie</label><br />
        <input type="text" id="categorie" name="categorie" v-model="book.category.name" />

        <label for="pages">Nombre de pages</label><br />
        <input type="number" id="pages" name="pages" v-model.number="book.numberOfPages" />

        <label for="extrait">Extrait</label><br />
        <input type="text" id="extrait" name="extrait" v-model="book.pdfLink" />

        <label for="resume">Résumé</label><br />
        <input type="textarea" id="resume" name="resume" v-model="book.abstract" />

        <label for="auteur">Auteur</label><br />
        <input type="text" id="auteur" name="auteur" v-model="book.writer.name" />

        <label for="editeur">Éditeur</label><br />
        <input type="text" id="editeur" name="editeur" v-model="book.editor" />

        <label for="date_publication">Date de publication</label><br />
        <input type="date" id="date_publication" name="date_publication" v-model="book.editionYear" />
        

<input type="submit" value="Submit">
    </form>
    </div>
  </div>
</template>
<style scoped="">

</style>
