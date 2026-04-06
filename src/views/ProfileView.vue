<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProfile } from '@/composables/useProfile'
import { useRepos } from '@/composables/useRepos'
import { useLanguages } from '@/composables/useLanguages'
import { useActivity } from '@/composables/useActivity'
import { useSearchHistory } from '@/composables/useSearchHistory'
import ProfileCard from '@/components/ProfileCard.vue'
import ProfileSkeleton from '@/components/ProfileSkeleton.vue'
import ErrorState from '@/components/ErrorState.vue'
import SearchBar from '@/components/SearchBar.vue'
import RepoList from '@/components/RepoList.vue'
import LanguageChart from '@/components/LanguageChart.vue'
import ActivityFeed from '@/components/ActivityFeed.vue'

const route = useRoute()
const router = useRouter()
const { addSearch } = useSearchHistory()
const { user, loading, error, fetchUser } = useProfile()

const currentUsername = ref(route.params.username as string)
const searchInput = ref(currentUsername.value)

const {
  filteredRepos,
  availableLanguages,
  totalStars,
  loading: reposLoading,
  hasMore,
  sort,
  searchQuery,
  languageFilter,
  fetchRepos,
  loadMore,
  changeSort,
} = useRepos(() => currentUsername.value)

const { languageStats, computeFromRepos } = useLanguages()
const { events, loading: activityLoading, fetchActivity } = useActivity()

// Fetch on route param change
watch(
  () => route.params.username,
  async (username) => {
    if (username && typeof username === 'string') {
      currentUsername.value = username
      searchInput.value = username
      await fetchUser(username)
      await fetchRepos(true)
      computeFromRepos(filteredRepos.value)
      fetchActivity(username)
    }
  },
  { immediate: true },
)

function handleSearch(username: string) {
  addSearch(username)
  router.push({ name: 'profile', params: { username } })
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
    <!-- Search bar at top -->
    <div class="flex justify-center">
      <SearchBar v-model="searchInput" :username="searchInput" @search="handleSearch" />
    </div>

    <!-- Loading state -->
    <ProfileSkeleton v-if="loading" />

    <!-- Error state -->
    <ErrorState v-else-if="error" :error="error" />

    <!-- Profile + Repos -->
    <template v-else-if="user">
      <ProfileCard :user="user" :total-stars="totalStars" />

      <!-- Two-column layout for chart + activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LanguageChart :stats="languageStats" />
        <ActivityFeed :events="events" :loading="activityLoading" />
      </div>

      <section>
        <div class="flex items-baseline justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Repositories
            <span class="text-gray-400 text-base font-normal ml-1">({{ user.public_repos }})</span>
          </h2>
          <a
            :href="`https://github.com/${user.login}?tab=repositories`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs text-[#0071e3] hover:underline"
          >
            View on GitHub →
          </a>
        </div>
        <RepoList
          :repos="filteredRepos"
          :loading="reposLoading"
          :has-more="hasMore"
          :sort="sort"
          :search-query="searchQuery"
          :language-filter="languageFilter"
          :available-languages="availableLanguages"
          @load-more="loadMore"
          @change-sort="changeSort"
          @update:search-query="searchQuery = $event"
          @update:language-filter="languageFilter = $event"
        />
      </section>
    </template>
  </div>
</template>
