<script setup lang="ts">
const props = defineProps<{
  leftIcon?: string
  rightIcon?: string
  placeholder?: string
}>()

const model = defineModel()
</script>

<template>
  <div>
    <span v-if="leftIcon" class="material-icons-sharp">{{ props.leftIcon }}</span>
    <input type="text" :placeholder="props.placeholder" v-model="model" />
    <span v-if="rightIcon" class="material-icons-sharp">{{ props.rightIcon }}</span>
  </div>
</template>

<style lang="css" scoped>
div {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 0.5rem;
  gap: 0.5rem;
  border: 1px solid var(--vt-c-divider-light-2);
}

span {
  display: flex;
  align-items: center;
}

input {
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  color: var(--vt-c-text-light-2);
  height: 2rem;
}

@media (prefers-color-scheme: dark) {
  div {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 0.5rem;
    gap: 0.5rem;
    border: 1px solid var(--vt-c-divider-dark-2);
  }

  input {
    color: var(--vt-c-text-dark-2);
  }
}
</style>
