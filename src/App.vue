<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLogo from './assets/AppLogo.vue'
</script>

<template>
  <header>
    <AppLogo class="logo" />
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-width: 1024px;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  height: 5rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 2rem 0;
  }
}
</style>
