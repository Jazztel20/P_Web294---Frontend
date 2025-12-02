<template>
  <form @submit.prevent="onSubmit">
    <div 
      v-for="(field, idx) in fields" 
      :key="idx"
      class="form-group"
    >
      <label :for="field.name">{{ field.label }}</label>

      <!-- input texte -->
      <input
        v-if="field.type !== 'textarea'"
        type="text"
        :id="field.name"
        v-model="formData[field.name]"
        :placeholder="field.placeholder || ''"
      />
    </div>

    <button type="submit">Envoyer</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  fields: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['submit'])

const formData = reactive({})

// Initialisation
props.fields.forEach(field => {
  formData[field.name] = ''
})

function onSubmit() {
  emit('submit', { ...formData })
}
</script>

<style scoped>
.form-group {
  margin-bottom: 12px;
}

input, textarea {
  width: 100%;
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}
</style>
