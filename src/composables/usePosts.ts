import { computed, ref } from 'vue'
import { BASE_URL_POSTS } from '@/constants'
import type { PostInput, PostItem, PostsList } from '@/models'
import { useUsers } from './useUsers'

export function usePosts() {
  const { usersList } = useUsers()
  const postsList = ref<PostsList>()
  const post = ref<PostItem>()
  const loadingPosts = ref(false)
  const loadingSinglePost = ref(false)
  const loadingPublishPost = ref(false)

  const postsListWithAuthor = computed(() =>
    postsList.value?.map((post) => ({
      ...post,
      author: usersList.value?.find((user) => user.id === post.userId),
    })),
  )

  async function deletePost(id: number): Promise<boolean> {
    try {
      await fetch(`${BASE_URL_POSTS}/${id}`, { method: 'DELETE' })
      return true
    } catch (err) {
      console.error('Failed to delete post', err)
      return false
    }
  }

  async function getPosts(): Promise<void> {
    loadingPosts.value = true

    try {
      const response = await fetch(BASE_URL_POSTS)
      postsList.value = await response.json()
    } catch (err) {
      console.error('Failed to fetch posts', err)
    } finally {
      loadingPosts.value = false
    }
  }

  async function getSinglePost(id: number): Promise<void> {
    loadingSinglePost.value = true

    try {
      const response = await fetch(`${BASE_URL_POSTS}/${id}`)
      post.value = await response.json()
    } catch (err) {
      console.error('Failed to fetch post', err)
    } finally {
      loadingSinglePost.value = false
    }
  }

  async function publishPost(post: PostInput): Promise<PostItem | null> {
    loadingPublishPost.value = true

    try {
      const response = await fetch(BASE_URL_POSTS, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      return await response.json()
    } catch (err) {
      console.error('Failed to publish post', err)
      return null
    } finally {
      loadingPublishPost.value = false
    }
  }

  return {
    deletePost,
    getPosts,
    getSinglePost,
    post,
    postsList,
    postsListWithAuthor,
    publishPost,
    loadingPosts,
    loadingSinglePost,
    loadingPublishPost,
  }
}
