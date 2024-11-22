<script setup lang="ts">
import { usePosts } from '@/composables'
import AppButton from './common/AppButton.vue'
import AppDialog from './common/AppDialog.vue'
import type { PostItemWithAuthor } from '@/models'

const { post } = defineProps<{
  post: PostItemWithAuthor
}>()

const { deletePost } = usePosts()
</script>

<template>
  <AppDialog>
    <template #header>
      <h4>Delete Post</h4>
    </template>
    <template #main>
      <p>
        Are you sure you want to delete "<em>{{ post.title }}</em
        >"? This action is irreversibel.
      </p>
    </template>
    <template #footer="{ closeDialog }">
      <div>
        <AppButton autofocus variant="secondary" @click="() => closeDialog()"> No </AppButton>
        <AppButton
          @click="
            () => {
              deletePost(post.id)
              closeDialog()
            }
          "
        >
          Yes, delete it
        </AppButton>
      </div>
    </template>
    <template v-slot="{ openDialog }">
      <AppButton variant="tertiary" left-icon="delete" @click="() => openDialog()" />
    </template>
  </AppDialog>
</template>

<style lang="css" scoped>
h4 {
  font-size: 1.2rem;
}

p {
  white-space: wrap;
}

div {
  display: flex;
  gap: 1rem;
  justify-content: end;
}
</style>
