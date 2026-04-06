import { ref } from 'vue'
import { getProfileReadme } from '@/services/github'

export function useProfileReadme() {
  const readme = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchReadme(username: string) {
    loading.value = true
    error.value = null
    readme.value = null

    try {
      readme.value = await getProfileReadme(username)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load profile README'
    } finally {
      loading.value = false
    }
  }

  return {
    readme,
    loading,
    error,
    fetchReadme,
  }
}
