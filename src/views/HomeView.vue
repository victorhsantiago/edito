<script setup lang="ts">
import PostTable from '@/components/PostsTable.vue'
import { usePosts } from '@/composables'
import { onMounted } from 'vue'

const { getPosts, postsListWithAuthor } = usePosts()

onMounted(async () => {
  await getPosts()
})
</script>

<template>
  <main>
    <PostTable :posts-list="postsListWithAuthor" />
  </main>
</template>

<style lang="css" scoped>
main {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
