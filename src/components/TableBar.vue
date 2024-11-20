<script setup lang="ts">
import { ref } from 'vue'
import AppButton from './AppButton.vue'
import AppInput from './AppInput.vue'

const emit = defineEmits<{
  update: [value: string]
}>()

const inputValue = ref('')
</script>

<template>
  <section>
    <AppInput
      v-model="inputValue"
      placeholder="Search for post..."
      left-icon="search"
      @update:model-value="emit('update', $event)"
    />
    <AppButton type="submit" right-icon="edit"> Create new post </AppButton>
  </section>
</template>

<style lang="css" scoped>
section {
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 0 1rem;
  margin: 1rem 0;
}

@media (min-width: 1024px) {
  section {
    padding: 0;
  }
}
</style>
