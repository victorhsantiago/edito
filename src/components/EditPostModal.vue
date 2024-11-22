<script setup lang="ts">
import { computed, onBeforeMount, ref, unref, useTemplateRef } from 'vue'
import * as yup from 'yup'
import { useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import { usePosts, useUsers } from '@/composables'
import AppButton from './common/AppButton.vue'
import AppInput from './common/AppInput.vue'
import AppModal from './common/AppModal.vue'
import AppSelect from './common/AppSelect.vue'
import AppTextEditor from './common/AppTextEditor.vue'

const route = useRoute()
const { defineField, handleSubmit, setValues } = useForm({
  validationSchema: yup.object({
    title: yup.string().required(),
    author: yup.number().required(),
    body: yup.string().required(),
  }),
})
const { getSinglePost, publishPost, post } = usePosts()
const { usersList } = useUsers()

const [title] = defineField<string>('title')
const [userId] = defineField<string>('author')
const [body] = defineField<string>('body')

const loadingPost = ref(false)

const appModal = useTemplateRef('app-modal')

const modalHeader = computed(() => (route.params?.id ? 'Edit post' : 'Create new post'))

const selectOption = computed(() =>
  usersList.value?.map((user) => ({
    label: user.name,
    value: user.id,
  })),
)

const sendPost = handleSubmit(async (values) => {
  await publishPost({ title: values.title, userId: values.userId, body: values.body })

  appModal.value?.navigateBack()
})

onBeforeMount(async () => {
  const postId = route.params.id
  if (!postId || typeof postId !== 'string') return

  loadingPost.value = true

  await getSinglePost(Number(postId))

  setValues({
    title: post.value?.title,
    body: post.value?.body,
    author: post.value?.userId,
  })

  loadingPost.value = false
})
</script>

<template>
  <AppModal ref="app-modal">
    <template #header>
      {{ modalHeader }}
    </template>
    <template #main>
      <form id="post-form" @submit.prevent="sendPost">
        <AppInput v-model="title" label="Title" name="title" />
        <AppSelect
          v-model="userId"
          label="Author"
          autofocus
          :options="unref(selectOption)!"
          name="author"
        />
        <AppTextEditor v-if="!loadingPost" v-model="body" label="Body" name="body" />
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
