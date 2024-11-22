import { ref } from 'vue'
import { BASE_URL_USERS } from '@/constants'
import type { UsersList } from '@/models'

const usersList = ref<UsersList>()
const loadingUsers = ref(false)

export function useUsers() {
  async function getUsers(): Promise<void> {
    loadingUsers.value = true

    try {
      const response = await fetch(BASE_URL_USERS)
      usersList.value = await response.json()
    } catch (err) {
      console.error('An error occurred while fetching users', err)
    } finally {
      loadingUsers.value = false
    }
  }

  return {
    getUsers,
    usersList,
    loadingUsers,
  }
}
