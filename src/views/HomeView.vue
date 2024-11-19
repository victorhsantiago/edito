<script setup lang="ts">
import PostTable from '@/components/PostsTable.vue'
import TableBar from '@/components/TableBar.vue'
import { usePosts } from '@/composables'
import { computed, onMounted, ref } from 'vue'

const { getPosts, postsListWithAuthor } = usePosts()

const searchQuery = ref('')

const filteredPostList = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return postsListWithAuthor.value

  return postsListWithAuthor.value?.filter((post) =>
    [post.body, post.title, post.author?.name].some((field) =>
      field?.toLowerCase().includes(query),
    ),
  )
})

function updateSearchQuery(query: string) {
  searchQuery.value = query
}

onMounted(async () => {
  await getPosts()
})
</script>

<template>
  <main>
    <TableBar @update="updateSearchQuery" />
    <PostTable :posts-list="filteredPostList" />
  </main>
</template>

<style lang="css" scoped>
main {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
