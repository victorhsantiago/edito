import { computed, onBeforeMount, ref } from 'vue'
import { BASE_URL_POSTS } from '@/constants'
import type { PostsList } from '@/models'
import { useUsers } from './useUsers'

export function usePosts() {
  const { getUsers, usersList } = useUsers()
  const postsList = ref<PostsList>()

  const postsListWithAuthor = computed(() =>
    postsList.value?.map((post) => ({
      ...post,
      author: usersList.value?.find((user) => user.id === post.userId),
    })),
  )

  async function getPosts(): Promise<void> {
    const response = await fetch(BASE_URL_POSTS)
    const json = await response.json()

    postsList.value = json
  }

  onBeforeMount(async () => await getUsers())

  return {
    getPosts,
    postsList,
    postsListWithAuthor,
  }
}
