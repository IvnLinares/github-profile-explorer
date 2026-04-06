import { ref } from 'vue'
import type { GitHubUser, ApiError } from '@/types'
import { getUser } from '@/services'

export function useProfile() {
  const user = ref<GitHubUser | null>(null)
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  async function fetchUser(username: string) {
    user.value = null
    error.value = null
    loading.value = true

    try {
      user.value = await getUser(username)
    } catch (e) {
      error.value = e as ApiError
    } finally {
      loading.value = false
    }
  }

  return { user, loading, error, fetchUser }
}
