import { githubFetch } from './api'
import { sessionCache } from '@/composables/useUtils'
import type { GitHubUser, GitHubRepo, RepoLanguages, RepoQueryParams, GitHubEvent } from '@/types'

/**
 * Fetch a GitHub user profile by username.
 */
export async function getUser(username: string): Promise<GitHubUser> {
  return sessionCache(`user:${username}`, () =>
    githubFetch<GitHubUser>(`/users/${encodeURIComponent(username)}`),
  )
}

/**
 * Fetch repositories for a given user.
 * Supports pagination and sorting.
 */
export async function getRepos(
  username: string,
  params: RepoQueryParams = {},
): Promise<GitHubRepo[]> {
  const { page = 1, per_page = 30, sort = 'updated', direction = 'desc' } = params
  const query = new URLSearchParams({
    page: String(page),
    per_page: String(per_page),
    sort,
    direction,
  })
  const cacheKey = `repos:${username}:${query}`
  return sessionCache(cacheKey, () =>
    githubFetch<GitHubRepo[]>(
      `/users/${encodeURIComponent(username)}/repos?${query}`,
    ),
  )
}

/**
 * Fetch language breakdown (in bytes) for a specific repo.
 */
export async function getRepoLanguages(
  owner: string,
  repo: string,
): Promise<RepoLanguages> {
  return sessionCache(`langs:${owner}/${repo}`, () =>
    githubFetch<RepoLanguages>(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
    ),
  )
}

/**
 * Fetch the last 15 public events for a user.
 */
export async function getActivity(username: string): Promise<GitHubEvent[]> {
  return sessionCache(`activity:${username}`, () =>
    githubFetch<GitHubEvent[]>(
      `/users/${encodeURIComponent(username)}/events/public?per_page=15`,
    ),
  )
}

/**
 * Fetch the README.md content from a user's profile repo ({username}/{username})
 * Returns markdown string or null if no README found
 */
export async function getProfileReadme(username: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(username)}/readme`,
      {
        headers: {
          Accept: 'application/vnd.github.v3.raw',
        },
      },
    )

    if (!response.ok) {
      return null
    }

    return await response.text()
  } catch {
    return null
  }
}
