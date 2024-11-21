<script setup lang="ts">
import Quill from 'quill'
import { onMounted, useTemplateRef } from 'vue'
import 'quill/dist/quill.snow.css'

const model = defineModel()

const quillEditor = useTemplateRef('quill-editor')

const toolbarOptions = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline'], // toggled buttons
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  ['clean'], // remove formatting button
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

  quill.on('text-change', () => (model.value = quill.getContents()))
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
/*
.ql-snow .ql-picker {
  color: var(--vt-c-text-light-1);
}

@media (prefers-color-scheme: dark) {
  .ql-toolbar.ql-snow,
  .ql-container.ql-snow {
    border-color: var(--vt-c-divider-dark-2);
  }

  .ql-snow .ql-picker {
    color: var(--vt-c-text-dark-1);
  }

  .ql-container.ql-snow {
    background-color: var(--vt-c-white-soft);
  }
} */
</style>
