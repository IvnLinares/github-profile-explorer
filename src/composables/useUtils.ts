import { onUnmounted } from 'vue'

export function useDebounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }

  onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId)
  })

  return debounced
}

/**
 * Simple session cache for API responses.
 * Data lives only for the current browser session.
 */
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export function sessionCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return Promise.resolve(cached.data as T)
  }

  return fetcher().then((data) => {
    cache.set(key, { data, timestamp: Date.now() })
    return data
  })
}

export function clearSessionCache() {
  cache.clear()
}
