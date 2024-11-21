<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { usePosts, useUsers } from '@/composables'
import AppModal from './common/AppModal.vue'
import { computed, unref, useTemplateRef } from 'vue'
import AppInput from './common/AppInput.vue'
import AppSelect from './common/AppSelect.vue'
import AppTextEditor from './common/AppTextEditor.vue'
import AppButton from './common/AppButton.vue'

const route = useRoute()
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    title: yup.string().required(),
    author: yup.object().required(),
    body: yup.string().required(),
  }),
})
const { publishPost } = usePosts()
const { usersList } = useUsers()

const appModal = useTemplateRef('app-modal')

const modalHeader = computed(() => (route.params?.id ? 'Edit post' : 'Create new post'))

const selectOption = computed(() =>
  usersList.value?.map((user) => ({
    label: user.name,
    value: user,
  })),
)

const sendPost = handleSubmit(async (values) => {
  await publishPost({ title: values.title, userId: values.author.id, body: values.body })

  appModal.value?.navigateBack()
})
</script>

<template>
  <AppModal ref="app-modal">
    <template #header>
      {{ modalHeader }}
    </template>
    <template #main>
      <form id="post-form" @submit.prevent="sendPost">
        <AppInput label="Title" name="title" />
        <AppSelect label="Author" :options="unref(selectOption)!" name="author" />
        <AppTextEditor label="Body" name="body" />
      </form>
    </template>
    <template #footer>
      <AppButton variant="secondary" @click="appModal?.navigateBack"> Close </AppButton>
      <AppButton type="submit" form="post-form"> Save Changes </AppButton>
    </template>
  </AppModal>
</template>

<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
