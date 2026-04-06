<script setup lang="ts">
import type { GitHubRepo } from '@/types'

defineProps<{
  repo: GitHubRepo
}>()

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <a
    :href="repo.html_url"
    target="_blank"
    rel="noopener noreferrer"
    class="block bg-surface-2 rounded-xl border border-white/10 p-5 hover:border-brand-500/30 hover:bg-surface-3 transition group"
  >
    <div class="flex items-start justify-between gap-3 mb-2">
      <h3 class="text-brand-400 font-semibold group-hover:text-brand-300 transition truncate">
        {{ repo.name }}
      </h3>
      <span
        v-if="repo.fork"
        class="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-400 shrink-0"
      >
        Fork
      </span>
    </div>

    <p v-if="repo.description" class="text-gray-400 text-sm mb-3 line-clamp-2">
      {{ repo.description }}
    </p>

    <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500">
      <span v-if="repo.language" class="flex items-center gap-1">
        <span class="w-3 h-3 rounded-full bg-brand-500 inline-block"></span>
        {{ repo.language }}
      </span>
      <span v-if="repo.stargazers_count > 0" class="flex items-center gap-1">
        ⭐ {{ repo.stargazers_count }}
      </span>
      <span v-if="repo.forks_count > 0" class="flex items-center gap-1">
        🍴 {{ repo.forks_count }}
      </span>
      <span class="ml-auto">
        Updated {{ formatDate(repo.updated_at) }}
      </span>
    </div>
  </a>
</template>
