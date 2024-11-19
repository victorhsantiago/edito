import { ref } from 'vue'
import { BASE_URL_POSTS } from '@/constants'
import type { PostsList } from '@/models'

export function usePosts() {
  const postsList = ref<PostsList>()

  async function getPosts(): Promise<void> {
    const response = await fetch(BASE_URL_POSTS)
    const json = await response.json()

    postsList.value = json
  }

  return {
    getPosts,
    postsList,
  }
}
