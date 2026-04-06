<script setup lang="ts">
import type { GitHubRepo, RepoQueryParams } from '@/types'
import RepoCard from './RepoCard.vue'

defineProps<{
  repos: GitHubRepo[]
  loading: boolean
  hasMore: boolean
  sort: RepoQueryParams['sort']
  searchQuery: string
}>()

const emit = defineEmits<{
  loadMore: []
  changeSort: [sort: RepoQueryParams['sort']]
  'update:searchQuery': [value: string]
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
    <!-- Toolbar: search + sort -->
    <div class="flex flex-col sm:flex-row gap-3">
      <input
        :value="searchQuery"
        @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        type="text"
        placeholder="Search repositories..."
        aria-label="Search repositories"
        class="flex-1 px-4 py-2 rounded-lg bg-surface-2 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
      />
      <div class="flex gap-2">
        <button
          v-for="opt in sortOptions"
          :key="opt.value"
          @click="emit('changeSort', opt.value)"
          class="px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer"
          :class="sort === opt.value
            ? 'bg-brand-600 text-white'
            : 'bg-surface-2 text-gray-400 hover:bg-surface-3 border border-white/10'"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- Repo list -->
    <div v-if="repos.length" class="grid gap-3">
      <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
    </div>

    <p v-else-if="!loading" class="text-gray-500 text-center py-8">
      {{ searchQuery ? 'No repositories match your search.' : 'No repositories found.' }}
    </p>

    <!-- Load more -->
    <div v-if="hasMore && repos.length && !searchQuery" class="text-center pt-4">
      <button
        @click="emit('loadMore')"
        :disabled="loading"
        class="px-6 py-2 rounded-xl bg-surface-2 border border-white/10 text-gray-300 hover:bg-surface-3 transition text-sm cursor-pointer disabled:opacity-50"
      >
        {{ loading ? 'Loading...' : 'Load more repositories' }}
      </button>
    </div>
  </div>
</template>
