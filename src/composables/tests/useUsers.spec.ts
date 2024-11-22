import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { useUsers } from '@/composables/useUsers'
import { BASE_URL_USERS } from '@/constants'

global.fetch = vi.fn()

describe('useUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should handle fetch users error', async () => {
    const { getUsers, usersList, loadingUsers } = useUsers()

    ;(fetch as Mock).mockRejectedValueOnce(new Error('Fetch error'))

    expect(loadingUsers.value).toBe(false)
    await getUsers()
    expect(loadingUsers.value).toBe(false)
    expect(usersList.value).toBeUndefined()

    // Check if console.error was called with the correct error
    expect(console.error).toHaveBeenCalledWith(
      'An error occurred while fetching users',
      expect.any(Error),
    )
  })

  it('should fetch users and update usersList', async () => {
    const { getUsers, usersList, loadingUsers } = useUsers()
    const mockUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ]

    ;(fetch as Mock).mockResolvedValueOnce({
      json: async () => mockUsers,
    })

    expect(loadingUsers.value).toBe(false)
    await getUsers()
    expect(loadingUsers.value).toBe(false)
    expect(usersList.value).toEqual(mockUsers)
    expect(fetch).toHaveBeenCalledWith(BASE_URL_USERS)
  })
})
