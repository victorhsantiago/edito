<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

const props = defineProps<{
  leftIcon?: string
  rightIcon?: string
  type: ButtonHTMLAttributes['type']
}>()
</script>

<template>
  <button :type="props.type">
    <span v-if="props.leftIcon" class="material-icons-sharp">{{ props.leftIcon }}</span>
    <slot />
    <span v-if="props.rightIcon" class="material-icons-sharp">{{ props.rightIcon }}</span>
  </button>
</template>

<style lang="css" scoped>
button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  outline: none;
  padding: 0 0.5rem;
  height: 2rem;
  background-color: var(--tea-green-80);
  transition: 0.2s;
  cursor: pointer;
}

button:hover {
  background-color: var(--tea-green-100);
}

span {
  font-size: 1rem;
}
</style>
