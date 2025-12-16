<script lang="ts">
import type { Book } from '@/api/books';
import type { Writer } from '@/models/Writer'
import type { Category } from '@/models/Category'
import { onMounted, ref } from 'vue';
import { EditBook } from '@/api/books'
import { useRoute } from 'vue-router';

const book = ref<Book | null>(null)
const route = useRoute()
const bookId = Number(route.params.id)

const loading = ref(true)  // Un "ref" pour gérer l'état de chargement
const error = ref<string | null>(null)  // Un "ref" pour stocker le message d'erreur

async function updateBook(updatedBook: Partial<Book>): Promise<Book> {
    loading.value = true
    error.value = null

    try {
        const response = await fetch(`http://localhost:3333/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)  // données à mettre à jour
        })

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`)
        }

        const data = await response.json()

        const bookWithDefaults: Book = {
          id: data.id ?? '',
          title: data.title ?? 'Titre non disponible',
          numberOfPages: data.numberOfPages ?? 0,
          pdfLink: data.pdfLink ?? '',
          abstract: data.abstract ?? 'Résumé non disponible',
          editor: data.editor ?? 'Éditeur inconnu',
          editionYear: data.editionYear ?? 0,
          imagePath: data.imagePath ?? '/default-cover.jpg',
          comment: data.comment ?? '',
          categoryId: data.categoryId ?? 0,
          writerId: data.writerId ?? 0,
          userId: data.userId ?? 0,
          global_rating: data.global_rating ?? 0,
          total_comments: data.total_comments ?? 0,
          writer: {
              id: data.writer?.id ?? 0,
              firstname: data.writer?.firstname ?? 'Prénom inconnu',
              lastname: data.writer?.lastname ?? 'Nom inconnu',
              createdAt: data.writer?.createdAt,
              updatedAt: data.writer?.updatedAt
          },
          category: {
              id: data.category?.id ?? 0,
              label: data.category?.label ?? 'Catégorie inconnue',
              createdAt: data.category?.createdAt,
              updatedAt: data.category?.updatedAt
          }
        }




        // Mettre à jour la ref pour le template
        book.value = bookWithDefaults

        return bookWithDefaults

    } catch (err: any) {
        err.value = err.message || 'Erreur inconnue'
        console.error(err)
        throw err
    } finally {
        loading.value = false
    }
}

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
