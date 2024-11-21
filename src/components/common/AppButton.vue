<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

type Props = {
  leftIcon?: string
  rightIcon?: string
  type?: ButtonHTMLAttributes['type']
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
})
</script>

<template>
  <button :type="props.type" :class="['app-button', `app-button--${props.variant}`]">
    <span v-if="props.leftIcon" class="app-button__icon material-icons-sharp">{{
      props.leftIcon
    }}</span>
    <slot />
    <span v-if="props.rightIcon" class="app-button__icon material-icons-sharp">{{
      props.rightIcon
    }}</span>
  </button>
</template>

<style lang="css" scoped>
.app-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  outline: none;
  padding: 0 0.5rem;
  height: 2rem;
  transition: 0.2s;
  cursor: pointer;
}

.app-button--primary:hover {
  background-color: var(--tea-green-100);
}

.app-button--primary {
  background-color: var(--tea-green-80);
}

.app-button--secondary {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
}

.app-button--secondary:hover {
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-border-hover);
}

.app-button__icon {
  font-size: 1rem;
}

@media (prefers-color-scheme: dark) {
  .app-button--secondary {
    color: var(--color-tex);
  }
}
</style>
