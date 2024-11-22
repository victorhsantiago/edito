import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { usePosts } from '@/composables/usePosts'
import { BASE_URL_POSTS } from '@/constants'

global.fetch = vi.fn()

describe('usePosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should fetch posts and update postsList', async () => {
    const { getPosts, postsList, loadingPosts } = usePosts()
    const mockPosts = [
      { id: 1, userId: 1, title: 'Post 1' },
      { id: 2, userId: 2, title: 'Post 2' },
    ]

    ;(fetch as Mock).mockResolvedValueOnce({
      json: async () => mockPosts,
    })

    expect(loadingPosts.value).toBe(false)
    await getPosts()
    expect(loadingPosts.value).toBe(false)
    expect(postsList.value).toEqual(mockPosts)
    expect(fetch).toHaveBeenCalledWith(BASE_URL_POSTS)
  })

  it('should handle fetch posts error', async () => {
    const { getPosts, postsList, loadingPosts } = usePosts()

    ;(fetch as Mock).mockRejectedValueOnce(new Error('Fetch error'))

    expect(loadingPosts.value).toBe(false)
    await getPosts()
    expect(loadingPosts.value).toBe(false)
    expect(postsList.value).toBeUndefined()
    expect(console.error).toHaveBeenCalledWith('Failed to fetch posts', expect.any(Error))
  })

  it('should fetch a single post and update post', async () => {
    const { getSinglePost, post, loadingSinglePost } = usePosts()
    const mockPost = { id: 1, userId: 1, title: 'Post 1' }

    ;(fetch as Mock).mockResolvedValueOnce({
      json: async () => mockPost,
    })

    expect(loadingSinglePost.value).toBe(false)
    await getSinglePost(1)
    expect(loadingSinglePost.value).toBe(false)
    expect(post.value).toEqual(mockPost)
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL_POSTS}/1`)
  })

  it('should handle fetch single post error', async () => {
    const { getSinglePost, post, loadingSinglePost } = usePosts()

    ;(fetch as Mock).mockRejectedValueOnce(new Error('Fetch error'))

    expect(loadingSinglePost.value).toBe(false)
    await getSinglePost(1)
    expect(loadingSinglePost.value).toBe(false)
    expect(post.value).toBeUndefined()
    expect(console.error).toHaveBeenCalledWith('Failed to fetch post', expect.any(Error))
  })

  it('should delete a post and return true', async () => {
    const { deletePost } = usePosts()

    ;(fetch as Mock).mockResolvedValueOnce({ ok: true })

    const result = await deletePost(1)
    expect(result).toBe(true)
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL_POSTS}/1`, { method: 'DELETE' })
  })

  it('should handle delete post error and return false', async () => {
    const { deletePost } = usePosts()

    ;(fetch as Mock).mockRejectedValueOnce(new Error('Delete error'))

    const result = await deletePost(1)
    expect(result).toBe(false)
    expect(console.error).toHaveBeenCalledWith('Failed to delete post', expect.any(Error))
  })

  it('should publish a post and return created post', async () => {
    const { publishPost, loadingPublishPost } = usePosts()
    const newPost = { userId: 1, title: 'New Post', body: 'Content' }
    const createdPost = { id: 1, ...newPost }

    ;(fetch as Mock).mockResolvedValueOnce({
      json: async () => createdPost,
    })

    expect(loadingPublishPost.value).toBe(false)
    const result = await publishPost(newPost)
    expect(loadingPublishPost.value).toBe(false)
    expect(result).toEqual(createdPost)
    expect(fetch).toHaveBeenCalledWith(BASE_URL_POSTS, {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
  })

  it('should handle publish post error and return null', async () => {
    const { publishPost, loadingPublishPost } = usePosts()
    const newPost = { userId: 1, title: 'New Post', body: 'Content' }

    ;(fetch as Mock).mockRejectedValueOnce(new Error('Publish error'))

    expect(loadingPublishPost.value).toBe(false)
    const result = await publishPost(newPost)
    expect(loadingPublishPost.value).toBe(false)
    expect(result).toBeNull()
    expect(console.error).toHaveBeenCalledWith('Failed to publish post', expect.any(Error))
  })
})
