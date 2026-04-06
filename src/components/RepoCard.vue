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
    class="block glass rounded-2xl p-5 hover:shadow-lg hover:shadow-[#0071e3]/10 transition-shadow duration-300 group border border-white/30 dark:border-white/10 hover:border-[#0071e3]/30"
  >
    <div class="flex items-start justify-between gap-3 mb-3">
      <h3 class="text-lg font-semibold text-[#0071e3] group-hover:text-[#0077ed] transition-colors truncate">
        {{ repo.name }}
      </h3>
      <span
        v-if="repo.fork"
        class="text-xs px-2 py-0.5 rounded-full bg-black/[0.06] text-gray-500 shrink-0"
      >
        Fork
      </span>
    </div>

    <p v-if="repo.description" class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
      {{ repo.description }}
    </p>

    <div class="flex flex-wrap items-center gap-4 text-xs text-gray-400">
      <span v-if="repo.language" class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#0071e3] inline-block opacity-80"></span>
        <span class="text-gray-700 dark:text-gray-300">{{ repo.language }}</span>
      </span>
      <span v-if="repo.stargazers_count > 0" class="flex items-center gap-1">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        {{ repo.stargazers_count.toLocaleString() }}
      </span>
      <span v-if="repo.forks_count > 0" class="flex items-center gap-1">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 3a3 3 0 0 0-1 5.83V10a5 5 0 0 0 5 5h1v1.17a3 3 0 1 0 2 0V15h1a5 5 0 0 0 5-5V8.83A3 3 0 0 0 18 3a3 3 0 0 0-1 5.83V10a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V8.83A3 3 0 0 0 6 3z"/></svg>
        {{ repo.forks_count.toLocaleString() }}
      </span>
      <span class="ml-auto">
        Updated {{ formatDate(repo.updated_at) }}
      </span>
    </div>

    <!-- Topics -->
    <div v-if="repo.topics && repo.topics.length" class="flex flex-wrap gap-1.5 mt-3">
      <span
        v-for="topic in repo.topics.slice(0, 5)"
        :key="topic"
        class="text-[10px] px-2 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-medium"
      >
        {{ topic }}
      </span>
      <span
        v-if="repo.topics.length > 5"
        class="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.06] text-gray-500"
      >
        +{{ repo.topics.length - 5 }}
      </span>
    </div>
  </a>
</template>
