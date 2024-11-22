<script setup lang="ts" generic="T">
import { useField } from 'vee-validate'

type Props = {
  name: string
  label?: string
  leftIcon?: string
  options: {
    label: string
    value: T
  }[]
  rightIcon?: string
  placeholder?: string
}

const props = defineProps<Props>()
const model = defineModel<string>()

const { errorMessage } = useField(() => props.name, {}, { syncVModel: model.value })

const selectId = crypto.randomUUID().split('-')[0]
</script>

<template>
  <div class="app-select">
    <label v-if="props.label" :for="selectId" class="app-select__label">{{ props.label }}</label>
    <div class="app-select__wrapper">
      <span v-if="leftIcon" class="app-select__icon--left material-icons-sharp" aria-hidden="true">
        {{ props.leftIcon }}
      </span>

      <select
        class="app-select__field"
        :id="selectId"
        :placeholder="props.placeholder"
        v-model="model"
      >
        <option v-for="(option, i) in props.options" :key="i" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <span
        v-if="rightIcon"
        class="app-select__icon--right material-icons-sharp"
        aria-hidden="true"
      >
        {{ props.rightIcon }}
      </span>

      <span class="app-select__icon--arrow material-icons-sharp" aria-hidden="true">
        keyboard_arrow_down
      </span>

      <small v-if="errorMessage" class="app-select__error">{{ errorMessage }}</small>
    </div>
  </div>
</template>

<style lang="css" scoped>
.app-select {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  position: relative;
}

.app-select__label {
  font-size: var(--font-size-sm);
}

.app-select__wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  border: 1px solid var(--vt-c-divider-light-2);
}

.app-select__icon--left,
.app-select__icon--right,
.app-select__icon--arrow {
  display: flex;
  align-items: center;
  padding: 0 var(--space-xs);
  font-size: var(--font-size-md);
  transition: transform 0.2s;
}

.app-select__field:focus-within ~ .app-select__icon--arrow {
  transform: rotate(-180deg);
}

.app-select__field {
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  border: none;
  outline: none;
  background-color: var(--color-background-soft);
  font-size: var(--font-size-md);
  color: var(--vt-c-text-light-2);
  height: 2rem;
}

.app-select__error {
  font-size: var(--font-size-xs);
  color: var(--bole);
  position: absolute;
  bottom: -1.1rem;
}

@media (prefers-color-scheme: dark) {
  .app-select__wrapper {
    border: 1px solid var(--vt-c-divider-dark-2);
  }

  .app-select__field {
    color: var(--vt-c-text-dark-2);
  }

  .app-select__error {
    color: var(--sandy-brown);
  }
}
</style>
