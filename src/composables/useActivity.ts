import { ref } from 'vue'
import { getActivity } from '@/services'
import type { GitHubEvent, ApiError } from '@/types'

export function useActivity() {
  const events = ref<GitHubEvent[]>([])
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  async function fetchActivity(username: string) {
    loading.value = true
    error.value = null
    try {
      events.value = await getActivity(username)
    } catch (e) {
      error.value = e as ApiError
    } finally {
      loading.value = false
    }
  }

  return { events, loading, error, fetchActivity }
}
