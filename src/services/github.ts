import { githubFetch } from './api'
import type { GitHubUser, GitHubRepo, RepoLanguages, RepoQueryParams } from '@/types'

/**
 * Fetch a GitHub user profile by username.
 */
export async function getUser(username: string): Promise<GitHubUser> {
  return githubFetch<GitHubUser>(`/users/${encodeURIComponent(username)}`)
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
  return githubFetch<GitHubRepo[]>(
    `/users/${encodeURIComponent(username)}/repos?${query}`,
  )
}

/**
 * Fetch language breakdown (in bytes) for a specific repo.
 */
export async function getRepoLanguages(
  owner: string,
  repo: string,
): Promise<RepoLanguages> {
  return githubFetch<RepoLanguages>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
  )
}
