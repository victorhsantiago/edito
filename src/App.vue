<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLogo from './assets/AppLogo.vue'
import { useUsers } from './composables'
import { onBeforeMount } from 'vue'

const { getUsers } = useUsers()

onBeforeMount(async () => await getUsers())
</script>

<template>
  <header>
    <AppLogo class="logo" />
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: var(-line-height-md);
  max-width: 1024px;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 0 auto var(--space-xl);
  height: 5rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: var(--space-xl) 0;
  }
}
</style>
