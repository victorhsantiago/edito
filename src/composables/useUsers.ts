import { ref } from 'vue'
import { BASE_URL_USERS } from '@/constants'
import type { UsersList } from '@/models'

export function useUsers() {
  const usersList = ref<UsersList>()

  async function getUsers(): Promise<void> {
    const response = await fetch(BASE_URL_USERS)
    const json = await response.json()

    usersList.value = json
  }

  return {
    getUsers,
    usersList,
  }
}
