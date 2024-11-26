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
  <div class="app-modal" role="dialog" @click.self="navigateBack">
    <section class="app-modal__content">
      <header class="app-modal__header">
        <h3 id="modal-title"><slot name="header" /></h3>
        <span
          class="material-icons-sharp app-modal__close-button"
          @click.self="navigateBack"
          aria-label="Close dialog"
        >
          close
        </span>
      </header>
      <main class="app-modal__main">
        <slot name="main" />
      </main>
      <footer class="app-modal__footer">
        <slot name="footer" />
      </footer>
    </section>
  </div>
</template>

<style lang="css" scoped>
.app-modal {
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

.app-modal__content {
  flex-basis: 900px;
  background-color: var(--color-background-soft);
}

.app-modal__header {
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-modal__main {
  max-height: 75vh;
  overflow: auto;
  padding: var(--space-lg) var(--space-md);
}

.app-modal__footer {
  display: flex;
  gap: var(--space-md);
  justify-content: flex-end;
  padding: var(--space-md);
  border-top: 1px solid var(--color-border);
}

.app-modal__close-button {
  cursor: pointer;
}

h3 {
  font-size: var(--font-size-lg);
  font-weight: 500;
  margin-bottom: var(--space-xs);
  color: var(--color-heading);
}
</style>
