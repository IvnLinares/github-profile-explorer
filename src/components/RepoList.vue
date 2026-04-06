<script setup lang="ts">
import type { GitHubRepo, RepoQueryParams } from '@/types'
import RepoCard from './RepoCard.vue'

defineProps<{
  repos: GitHubRepo[]
  loading: boolean
  hasMore: boolean
  sort: RepoQueryParams['sort']
  searchQuery: string
  languageFilter: string
  availableLanguages: string[]
}>()

const emit = defineEmits<{
  loadMore: []
  changeSort: [sort: RepoQueryParams['sort']]
  'update:searchQuery': [value: string]
  'update:languageFilter': [value: string]
}>()

const sortOptions: { value: RepoQueryParams['sort']; label: string }[] = [
  { value: 'updated', label: 'Recently updated' },
  { value: 'stars', label: 'Most stars' },
  { value: 'forks', label: 'Most forks' },
  { value: 'full_name', label: 'Name (A-Z)' },
]
</script>

<template>
  <div class="space-y-4">
    <!-- Toolbar: search + language + sort -->
    <div class="flex flex-col gap-3">
      <div class="flex gap-2">
        <input
          :value="searchQuery"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Search repositories..."
          aria-label="Search repositories"
          class="flex-1 px-4 py-2 rounded-xl glass-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition text-sm"
        />
        <select
          v-if="availableLanguages.length"
          :value="languageFilter"
          @change="emit('update:languageFilter', ($event.target as HTMLSelectElement).value)"
          class="px-3 py-2 rounded-xl glass-sm text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition cursor-pointer"
          aria-label="Filter by language"
        >
          <option value="">All languages</option>
          <option v-for="lang in availableLanguages" :key="lang" :value="lang">{{ lang }}</option>
        </select>
      </div>
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="opt in sortOptions"
          :key="opt.value"
          @click="emit('changeSort', opt.value)"
          class="px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer"
          :class="sort === opt.value
            ? 'bg-[#0071e3] text-white shadow-[0_2px_8px_rgba(0,113,227,0.25)]'
            : 'bg-black/[0.06] dark:bg-white/[0.08] text-gray-700 dark:text-gray-300 hover:bg-black/[0.1]'"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- Repo list -->
    <div v-if="repos.length" class="grid gap-3">
      <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
    </div>

    <p v-else-if="!loading" class="text-gray-400 text-center py-8 text-sm">
      {{ searchQuery || languageFilter ? 'No repositories match your filters.' : 'No repositories found.' }}
    </p>

    <!-- Load more -->
    <div v-if="hasMore && repos.length && !searchQuery && !languageFilter" class="text-center pt-4">
      <button
        @click="emit('loadMore')"
        :disabled="loading"
        class="px-6 py-2 rounded-xl glass-sm text-gray-600 dark:text-gray-300 hover:shadow-sm transition text-sm cursor-pointer disabled:opacity-50"
      >
        {{ loading ? 'Loading...' : 'Load more repositories' }}
      </button>
    </div>
  </div>
</template>
