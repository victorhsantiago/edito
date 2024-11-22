<script setup lang="ts">
import { onMounted, useTemplateRef, type InputHTMLAttributes } from 'vue'
import { useField } from 'vee-validate'

type Props = {
  autofocus?: boolean
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

const inputRef = useTemplateRef('input-ref')

const { errorMessage } = useField(() => props.name, {}, { syncVModel: model.value })

const inputId = crypto.randomUUID().split('-')[0]

onMounted(() => {
  if (props.autofocus) inputRef.value?.focus()
})
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
        ref="input-ref"
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
  gap: var(--space-xs);
  position: relative;
}

.app-input__wrapper:has(.app-input__field:focus) {
  box-shadow: var(--focus-shadow);
}

.app-input__label {
  font-size: var(--font-size-sm);
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
  padding: 0 var(--space-xs);
  font-size: var(--font-size-md);
}

.app-input__field {
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: var(--font-size-md);
  color: var(--vt-c-text-light-2);
  height: 2rem;
}

.app-input__error {
  font-size: var(--font-size-xs);
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
