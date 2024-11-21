<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePosts, useUsers } from '@/composables'
import type { User } from '@/models'
import AppModal from './common/AppModal.vue'
import { computed, ref, unref, useTemplateRef } from 'vue'
import AppInput from './common/AppInput.vue'
import AppSelect from './common/AppSelect.vue'
import AppTextEditor from './common/AppTextEditor.vue'
import AppButton from './common/AppButton.vue'

const route = useRoute()
const { publishPost } = usePosts()
const { usersList } = useUsers()

const title = ref<string>()
const author = ref<User>()
const body = ref<string>()

const appModal = useTemplateRef('app-modal')

const disableSaveButton = computed(
  () => !Boolean(title.value) || !Boolean(author.value) || !Boolean(body.value?.length),
)

const modalHeader = computed(() => (route.params?.id ? 'Edit post' : 'Create new post'))

const selectOption = computed(() =>
  usersList.value?.map((user) => ({
    label: user.name,
    value: user,
  })),
)

async function sendPost() {
  if (!title.value || !author.value?.id || !body.value) return

  await publishPost({ title: title.value, userId: author.value?.id, body: body.value })

  appModal.value?.navigateBack()
}
</script>

<template>
  <AppModal ref="app-modal">
    <template #header>
      {{ modalHeader }}
    </template>
    <template #main>
      <form id="post-form" @submit.prevent="sendPost">
        <AppInput label="Title" v-model="title" />
        <AppSelect label="Author" :options="unref(selectOption)!" v-model="author" />
        <AppTextEditor v-model="body" />
      </form>
    </template>
    <template #footer>
      <AppButton variant="secondary" @click="appModal?.navigateBack"> Close </AppButton>
      <AppButton type="submit" form="post-form" :disabled="disableSaveButton">
        Save Changes
      </AppButton>
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
