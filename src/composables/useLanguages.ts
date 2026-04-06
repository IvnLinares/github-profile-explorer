import { ref, computed } from 'vue'
import type { GitHubRepo, LanguageStat } from '@/types'

// GitHub-ish colors for common languages
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Shell: '#89e051',
  Lua: '#000080',
  Scala: '#c22d40',
}

const FALLBACK_COLORS = [
  '#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6',
  '#ef4444', '#10b981', '#f97316', '#06b6d4', '#84cc16',
]

function getColor(lang: string, index: number): string {
  return LANGUAGE_COLORS[lang] || FALLBACK_COLORS[index % FALLBACK_COLORS.length]
}

export function useLanguages() {
  const loading = ref(false)
  const languageStats = ref<LanguageStat[]>([])

  /**
   * Fast strategy: aggregate from repo.language field.
   * Less precise but no extra API calls.
   */
  function computeFromRepos(repos: GitHubRepo[]) {
    loading.value = true

    const counts: Record<string, number> = {}
    for (const repo of repos) {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1
      }
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0)
    const sorted = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)

    // Top 7 + "Others"
    const topN = 7
    const top = sorted.slice(0, topN)
    const othersCount = sorted.slice(topN).reduce((acc, [, c]) => acc + c, 0)

    const stats: LanguageStat[] = top.map(([name, count], i) => ({
      name,
      bytes: count,
      percentage: Math.round((count / total) * 100),
      color: getColor(name, i),
    }))

    if (othersCount > 0) {
      stats.push({
        name: 'Others',
        bytes: othersCount,
        percentage: Math.round((othersCount / total) * 100),
        color: '#6b7280',
      })
    }

    languageStats.value = stats
    loading.value = false
  }

  return { languageStats, loading, computeFromRepos }
}
