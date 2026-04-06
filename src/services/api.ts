import type { ApiError } from '@/types'

const BASE_URL = 'https://api.github.com'

/**
 * Normalized fetch wrapper for GitHub API.
 * Handles rate limit detection, 404s, and general errors.
 */
export async function githubFetch<T>(
  endpoint: string,
  options?: { headers?: Record<string, string> },
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`

  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      ...options?.headers,
    },
  })

  if (!res.ok) {
    const isRateLimit = res.status === 403 || res.status === 429
    const isNotFound = res.status === 404

    let message = 'An unexpected error occurred'

    if (isRateLimit) {
      const resetHeader = res.headers.get('X-RateLimit-Reset')
      const resetTime = resetHeader
        ? new Date(Number(resetHeader) * 1000).toLocaleTimeString()
        : 'a few minutes'
      message = `GitHub API rate limit exceeded. Try again after ${resetTime}.`
    } else if (isNotFound) {
      message = 'User not found.'
    } else {
      try {
        const body = await res.json()
        message = body.message || message
      } catch {
        // ignore parse errors
      }
    }

    const error: ApiError = {
      status: res.status,
      message,
      isRateLimit,
      isNotFound,
    }
    throw error
  }

  return res.json() as Promise<T>
}
