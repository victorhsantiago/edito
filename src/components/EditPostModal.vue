<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUsers } from '@/composables'
import type { Delta } from 'quill/core'
import type { User } from '@/models'
import AppModal from './common/AppModal.vue'
import { computed, ref, unref, useTemplateRef } from 'vue'
import AppInput from './common/AppInput.vue'
import AppSelect from './common/AppSelect.vue'
import AppTextEditor from './common/AppTextEditor.vue'
import AppButton from './common/AppButton.vue'

const route = useRoute()
const { usersList } = useUsers()

const title = ref<string>()
const author = ref<User>()
const body = ref<Delta>()

const appModal = useTemplateRef('app-modal')

const modalHeader = computed(() => (route.params?.id ? 'Edit post' : 'Create new post'))

const selectOption = computed(() =>
  usersList.value?.map((user) => ({
    label: user.name,
    value: user,
  })),
)
</script>

<template>
  <AppModal ref="app-modal">
    <template #header>
      {{ modalHeader }}
    </template>
    <template #main>
      <form>
        <AppInput label="Title" v-model="title" />
        <AppSelect label="Author" :options="unref(selectOption)!" v-model="author" />
        <AppTextEditor v-model="body" />
      </form>
    </template>
    <template #footer>
      <AppButton variant="secondary" @click="appModal?.navigateBack()"> Close </AppButton>
      <AppButton type="submit"> Save Changes</AppButton>
    </template>
  </AppModal>
</template>

<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
