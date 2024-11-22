<script setup lang="ts">
import Quill from 'quill'
import { onMounted, useTemplateRef } from 'vue'
import { useField } from 'vee-validate'
import 'quill/dist/quill.snow.css'

const props = defineProps<{ name: string; label: string }>()
const model = defineModel<string>()

const { errorMessage } = useField(() => props.name, {}, { syncVModel: model.value })
const quillEditor = useTemplateRef('quill-editor')

const toolbarOptions = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['clean'],
]

const options = {
  modules: {
    toolbar: toolbarOptions,
  },
  placeholder: 'Compose an epic...',
  theme: 'snow',
}

onMounted(() => {
  const quill = new Quill(quillEditor.value || 'quill-editor', options)

  quill.on('text-change', () => (model.value = quill.getSemanticHTML()))

  if (model.value) quill.insertText(0, model.value)
})
</script>

<template>
  <div class="text-editor__wrapper">
    <label class="text-editor__label">{{ props.label }}</label>
    <div>
      <div id="quill-editor" ref="quill-editor"></div>
    </div>
    <small v-if="errorMessage" class="text-editor__error">{{ errorMessage }}</small>
  </div>
</template>

<style lang="css">
.text-editor__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  position: relative;
}

.text-editor__label {
  font-size: var(--font-size-sm);
}

.text-editor__error {
  font-size: var(--font-size-xs);
  color: var(--bole);
  position: absolute;
  bottom: -1.1rem;
}

.ql-toolbar.ql-snow,
.ql-container.ql-snow {
  border-color: var(--vt-c-divider-light-2);
  color: var(--vt-c-text-light-1);
  background-color: var(--vt-c-white-soft);
}

@media (prefers-color-scheme: dark) {
  .text-editor__error {
    color: var(--sandy-brown);
  }
}
</style>
