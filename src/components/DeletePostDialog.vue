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
      <h4 class="delete-dialog__title">Delete Post</h4>
    </template>
    <template #main>
      <p class="delete-dialog__message">
        Are you sure you want to delete "<em>{{ post.title }}</em
        >"? This action is irreversible.
      </p>
    </template>
    <template #footer="{ closeDialog }">
      <div class="delete-dialog__actions">
        <AppButton
          autofocus
          variant="secondary"
          aria-label="Cancel deletion"
          @click="() => closeDialog()"
        >
          No
        </AppButton>
        <AppButton
          aria-label="Confirm deletion"
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
      <AppButton
        variant="tertiary"
        left-icon="delete"
        aria-label="Open delete confirmation dialog"
        @click="() => openDialog()"
      />
    </template>
  </AppDialog>
</template>

<style lang="css" scoped>
.delete-dialog__title {
  font-size: var(--font-size-xl);
}

.delete-dialog__message {
  white-space: wrap;
}

.delete-dialog__actions {
  display: flex;
  gap: var(--space-md);
  justify-content: flex-end;
}
</style>
