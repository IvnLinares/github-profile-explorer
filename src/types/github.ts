/** GitHub User profile from GET /users/{username} */
export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

/** GitHub Repository from GET /users/{username}/repos */
export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  fork: boolean
  language: string | null
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
}

/** Language bytes map from GET /repos/{owner}/{repo}/languages */
export type RepoLanguages = Record<string, number>

/** Aggregated language stats for the donut chart */
export interface LanguageStat {
  name: string
  bytes: number
  percentage: number
  color: string
}

/** Standard API error shape */
export interface ApiError {
  status: number
  message: string
  isRateLimit: boolean
  isNotFound: boolean
}

/** Repo list query params */
export interface RepoQueryParams {
  page?: number
  per_page?: number
  sort?: 'stars' | 'forks' | 'updated' | 'full_name'
  direction?: 'asc' | 'desc'
}

/** A single public event from GET /users/{username}/events/public */
export interface GitHubEvent {
  id: string
  type: string
  created_at: string
  repo: {
    id: number
    name: string
    url: string
  }
  payload: {
    action?: string
    ref?: string
    ref_type?: string
    commits?: Array<{ message: string; sha: string }>
    pull_request?: { title: string; html_url: string; state: string; merged: boolean }
    issue?: { title: string; html_url: string; state: string }
    release?: { tag_name: string; html_url: string; name: string | null }
    forkee?: { full_name: string; html_url: string }
  }
}
