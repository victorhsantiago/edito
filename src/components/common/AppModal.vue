<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateBack() {
  router.go(-1)
}
</script>

<template>
  <div class="modal-wrapper" @click.stop="navigateBack">
    <section class="modal-content">
      <header class="modal-header">
        <h3><slot name="header" /></h3>
        <span class="material-icons-sharp close-button" @click.stop="navigateBack">close</span>
      </header>
      <main class="modal-main">
        <slot name="main" />
      </main>
      <footer class="modal-footer">
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
  background-color: rgba(0, 0, 0, 0.5);
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

main,
footer {
  padding: 1rem;
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
