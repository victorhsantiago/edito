<script setup lang="ts">
import { useField } from 'vee-validate'
import type { InputHTMLAttributes } from 'vue'

type Props = {
  name: string
  label?: string
  leftIcon?: string
  rightIcon?: string
  placeholder?: string
  type?: InputHTMLAttributes['type']
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})
const model = defineModel<string>()

const { errorMessage } = useField(() => props.name, {}, { syncVModel: model.value })

const inputId = crypto.randomUUID().split('-')[0]
</script>

<template>
  <div class="app-input">
    <label v-if="props.label" :for="inputId" class="app-input__label">{{ props.label }}</label>

    <div class="app-input__wrapper">
      <span v-if="leftIcon" class="app-input__icon--left material-icons-sharp" aria-hidden="true">
        {{ props.leftIcon }}
      </span>

      <input
        class="app-input__field"
        :type="props.type"
        :id="inputId"
        :placeholder="props.placeholder"
        v-model="model"
      />

      <span v-if="rightIcon" class="app-input__icon--right material-icons-sharp" aria-hidden="true">
        {{ props.rightIcon }}
      </span>
    </div>

    <small v-if="errorMessage" class="app-input__error">{{ errorMessage }}</small>
  </div>
</template>

<style lang="css" scoped>
.app-input {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.app-input__wrapper:has(.app-input__field:focus) {
  box-shadow: var(--focus-shadow);
}

.app-input__label {
  font-size: 0.875rem;
}

.app-input__wrapper {
  display: flex;
  align-items: center;
  border: 1px solid var(--vt-c-divider-light-2);
}

.app-input__icon--left,
.app-input__icon--right {
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  font-size: 1rem;
}

.app-input__field {
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  color: var(--vt-c-text-light-2);
  height: 2rem;
}

.app-input__error {
  font-size: 0.75rem;
  color: var(--bole);
  position: absolute;
  bottom: -1.1rem;
}

@media (prefers-color-scheme: dark) {
  .app-input__wrapper {
    border: 1px solid var(--vt-c-divider-dark-2);
  }

  .app-input__field {
    color: var(--vt-c-text-dark-2);
  }

  .app-input__error {
    color: var(--sandy-brown);
  }
}
</style>
