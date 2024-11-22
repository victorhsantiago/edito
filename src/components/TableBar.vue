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
  <section class="search-bar">
    <AppInput
      v-model="inputValue"
      name="search-bar"
      type="search"
      placeholder="Search for post..."
      left-icon="search"
      aria-label="Search for posts"
      @update:model-value="(value) => emit('update', value)"
    />
    <AppButton type="button" right-icon="add" @click="createNewPost">Create new post</AppButton>
  </section>
</template>

<style lang="css" scoped>
.search-bar {
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 0 1rem;
  margin: 1rem 0;
}

@media (min-width: 1024px) {
  .search-bar {
    padding: 0;
  }
}
</style>
