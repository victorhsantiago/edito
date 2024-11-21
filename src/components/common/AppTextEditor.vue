<script setup lang="ts">
import Quill from 'quill'
import { onMounted, useTemplateRef } from 'vue'
import 'quill/dist/quill.snow.css'

const model = defineModel()

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
})
</script>

<template>
  <div>
    <div id="quill-editor" ref="quill-editor"></div>
  </div>
</template>

<style lang="css">
.ql-toolbar.ql-snow,
.ql-container.ql-snow {
  border-color: var(--vt-c-divider-light-2);
  color: var(--vt-c-text-light-1);
  background-color: var(--vt-c-white-soft);
}
</style>
