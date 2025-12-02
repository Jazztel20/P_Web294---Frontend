<template>
  <SimpleTextForm 
    :fields="fields"
    @submit="handleSubmit"
  />
</template>

<script setup>
import SimpleTextForm from '@/components/formulaire/Forms.vue'

const fields = [
  { name: 'nom', label: 'Nom' },
  { name: 'prenom', label: 'Prénom' },
]

function handleSubmit(data) {
  console.log('Formulaire envoyé :', data)
}
</script>
