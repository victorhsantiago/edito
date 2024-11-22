<script setup lang="ts">
import { useTemplateRef } from 'vue'

const appDialog = useTemplateRef('app-dialog')

function openDialog() {
  appDialog.value?.showModal()
}

function closeDialog() {
  appDialog.value?.close()
}
</script>

<template>
  <dialog ref="app-dialog" role="dialog" aria-modal="true" class="app-dialog">
    <div class="app-dialog__wrapper">
      <header>
        <slot name="header" />
      </header>
      <main>
        <slot name="main" />
      </main>
      <footer>
        <slot name="footer" :close-dialog="closeDialog" />
      </footer>
    </div>
  </dialog>

  <slot :open-dialog="openDialog" />
</template>

<style lang="css" scoped>
.app-dialog {
  border: 0;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.app-dialog__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  min-width: 300px;
  max-width: 400px;
}

::backdrop {
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px) grayscale(100%);
}
</style>
