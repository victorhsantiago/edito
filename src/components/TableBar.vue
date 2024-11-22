<script setup lang="ts">
import { ref } from 'vue'
import AppButton from './common/AppButton.vue'
import AppInput from './common/AppInput.vue'
import { useRouter } from 'vue-router'

const emit = defineEmits<{
  update: [value: string]
}>()

const router = useRouter()

const inputValue = ref('')

function createNewPost() {
  router.push({ name: 'newPost' })
}
</script>

<template>
  <section>
    <AppInput
      v-model="inputValue"
      name="search-bar"
      type="search"
      placeholder="Search for post..."
      left-icon="search"
      @update:model-value="emit('update', $event)"
    />
    <AppButton type="button" right-icon="add" @click="createNewPost"> Create new post </AppButton>
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
