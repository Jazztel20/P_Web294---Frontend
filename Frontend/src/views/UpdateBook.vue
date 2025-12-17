<script lang="ts" setup>
import type { Book } from '@/models/book'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchBook, updateBook } from '@/api/books'

const route = useRoute()
const router = useRouter()

const bookId = Number(route.params.id)

const loading = ref(true)
const saving = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

// Livre original (optionnel, utile pour comparaison / reset)
const book = ref<Book | null>(null)

// État du formulaire (copie modifiable)
const form = reactive<Book>({
  id: bookId,
  title: '',
  numberOfPages: 0,
  pdfLink: '',
  abstract: '',
  editor: '',
  editionYear: '',
  category: { name: '' } as any,
  writer: { name: '' } as any,
} as Book)

function hydrateForm(b: Book) {
  // évite les crashs si certains sous-objets sont absents
  const safe = {
    ...b,
    category: b.category ?? { name: '' },
    writer: b.writer ?? { name: '' },
  }

  // copie dans reactive(form)
  Object.assign(form, safe)
}

async function loadBook() {
  loading.value = true
  error.value = null
  success.value = null

  try {
    const data = await fetchBook(bookId)
    book.value = data
    hydrateForm(data)
    console.log('Livre:', data)
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to load book'
    console.log(error.value)
  } finally {
    loading.value = false
  }
}

async function onSubmit() {
  if (!bookId || Number.isNaN(bookId)) {
    error.value = "ID de livre invalide dans l'URL"
    return
  }

  saving.value = true
  error.value = null
  success.value = null

  try {
    // Payload : ici je renvoie l'objet form complet.
    // Si ton API attend seulement certains champs, construis un payload minimal.
    const updated = await updateBook(bookId, form)

    book.value = updated
    hydrateForm(updated)

    success.value = 'Livre mis à jour.'
    // optionnel : rediriger après succès
    // router.push({ name: 'book', params: { id: bookId } })
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to update book'
  } finally {
    saving.value = false
  }
}

onMounted(loadBook)
</script>

<template>
  <div class="page">
    <main class="content">
      <h2 class="headline">Veuillez remplir les champs pour modifier un ouvrage</h2>

      <p v-if="loading" class="state">Chargement…</p>
      <p v-else-if="error" class="alert alert--error">{{ error }}</p>
      <p v-else-if="success" class="alert alert--success">{{ success }}</p>

      <form v-if="!loading" class="form-card" @submit.prevent="onSubmit">
        <div class="form-grid">
          <!-- Colonne gauche -->
          <section class="col">
            <div class="field">
              <label for="titre">Titre</label>
              <input id="titre" type="text" v-model="form.title" />
            </div>

            <div class="field">
              <label for="categorie">Catégorie</label>
              <input id="categorie" type="text" v-model="form.category.name" />
            </div>

            <div class="field">
              <label for="pages">Nombre de pages</label>
              <input id="pages" type="number" v-model.number="form.numberOfPages" />
            </div>

            <div class="field">
              <label for="extrait">Extrait (pdf)</label>
              <input id="extrait" type="url" v-model="form.pdfLink" />
            </div>
          </section>

          <!-- Colonne centrale -->
          <section class="col">
            <div class="field field--textarea">
              <label for="resume">Résumé</label>
              <textarea id="resume" v-model="form.abstract"></textarea>
            </div>

            <div class="field">
              <label for="auteur">Prénom et nom de l’écrivain</label>
              <input id="auteur" type="text" v-model="form.writer.name" />
            </div>
          </section>

          <!-- Colonne droite -->
          <section class="col">
            <div class="field">
              <label for="editeur">Éditeur</label>
              <input id="editeur" type="text" v-model="form.editor" />
            </div>

            <div class="field">
              <label for="date_publication">Année d’édition</label>
              <input id="date_publication" type="date" v-model="form.editionYear" />
            </div>

            <div class="field">
              <label>Image de couverture</label>
              <button class="btn btn--ghost" type="button">Importer une image</button>
            </div>
          </section>
        </div>

        <!-- Actions -->
        <div class="actions">
          <button class="btn btn--link" type="button" @click="router.back()">Annuler</button>

          <button class="btn btn--primary" type="submit" :disabled="saving">
            {{ saving ? 'Enregistrement…' : 'Enregistrer l’ouvrage' }}
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
/* Page */
.page {
  min-height: 70vh;
  background: #ffffff;
  display: grid;
  place-items: center;
  padding: 32px 24px;
}

/* Content */
.content {
  width: 100%;
}

.headline {
  text-align: center;
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 26px;
}

/* States */
.state {
  text-align: center;
}

/* Alerts */
.alert {
  margin: 0 auto 16px;
  width: min(1050px, 100%);
  padding: 10px 12px;
  border-radius: 12px;
}
.alert--error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}
.alert--success {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
}

/* Card */
.form-card {
  width: min(1050px, 100%);
  margin: 0 auto;
}

/* Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  gap: 34px;
}

/* Fields */
.field {
  display: grid;
  gap: 10px;
  margin-bottom: 24px;
}

.field label {
  font-size: 20px;
  font-weight: 800;
}

.field input,
.field textarea {
  background: #dff0ff;
  border: 2px solid #2f6fcf;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 16px;
}

.field textarea {
  min-height: 260px;
  resize: vertical;
}

/* Actions */
.actions {
  display: flex;
  justify-content: center;
  gap: 28px;
  margin-top: 18px;
}

/* Buttons */
.btn {
  border: none;
  cursor: pointer;
  font-size: 18px;
  border-radius: 14px;
  padding: 10px 20px;
}

.btn--primary {
  background: #7fc16b;
}

.btn--link {
  background: transparent;
}

.btn--ghost {
  background: #e5e7eb;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 980px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .actions {
    flex-direction: column;
  }
}
</style>
