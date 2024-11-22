<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateBack() {
  router.go(-1)
}

defineExpose({
  navigateBack,
})
</script>

<template>
  <div @click.self="navigateBack">
    <section>
      <header>
        <h3><slot name="header" /></h3>
        <span class="material-icons-sharp close-button" @click.self="navigateBack">close</span>
      </header>
      <main>
        <slot name="main" />
      </main>
      <footer>
        <slot name="footer" />
      </footer>
    </section>
  </div>
</template>

<style lang="css" scoped>
div {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px) grayscale(100%);
}

section {
  flex-basis: 900px;
  background-color: var(--color-background-soft);
}

header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

footer {
  padding: 1rem;
}

main {
  max-height: 75vh;
  overflow: auto;
  padding: 1.5rem 1rem;
}

footer {
  display: flex;
  gap: 1rem;
  justify-content: end;
  border-top: 1px solid var(--color-border);
}

.close-button {
  cursor: pointer;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}
</style>
