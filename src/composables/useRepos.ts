import { ref, computed } from 'vue'
import type { GitHubRepo, ApiError, RepoQueryParams } from '@/types'
import { getRepos } from '@/services'

export function useRepos(username: () => string) {
  const repos = ref<GitHubRepo[]>([])
  const loading = ref(false)
  const error = ref<ApiError | null>(null)
  const page = ref(1)
  const perPage = ref(30)
  const hasMore = ref(true)
  const sort = ref<RepoQueryParams['sort']>('updated')
  const direction = ref<RepoQueryParams['direction']>('desc')
  const searchQuery = ref('')

  const filteredRepos = computed(() => {
    if (!searchQuery.value.trim()) return repos.value
    const q = searchQuery.value.toLowerCase()
    return repos.value.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q)),
    )
  })

  async function fetchRepos(reset = false) {
    if (reset) {
      page.value = 1
      repos.value = []
      hasMore.value = true
    }

    error.value = null
    loading.value = true

    try {
      const data = await getRepos(username(), {
        page: page.value,
        per_page: perPage.value,
        sort: sort.value,
        direction: direction.value,
      })
      if (reset) {
        repos.value = data
      } else {
        repos.value = [...repos.value, ...data]
      }
      hasMore.value = data.length === perPage.value
    } catch (e) {
      error.value = e as ApiError
    } finally {
      loading.value = false
    }
  }

  async function loadMore() {
    page.value++
    await fetchRepos()
  }

  async function changeSort(newSort: RepoQueryParams['sort']) {
    sort.value = newSort
    direction.value = newSort === 'full_name' ? 'asc' : 'desc'
    await fetchRepos(true)
  }

  return {
    repos,
    filteredRepos,
    loading,
    error,
    page,
    hasMore,
    sort,
    searchQuery,
    fetchRepos,
    loadMore,
    changeSort,
  }
}
