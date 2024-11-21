import { ref } from 'vue'
import { BASE_URL_USERS } from '@/constants'
import type { UsersList } from '@/models'

const usersList = ref<UsersList>()

export function useUsers() {
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
