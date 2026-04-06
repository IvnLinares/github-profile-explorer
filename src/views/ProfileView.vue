<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProfile } from '@/composables/useProfile'
import { useRepos } from '@/composables/useRepos'
import { useLanguages } from '@/composables/useLanguages'
import ProfileCard from '@/components/ProfileCard.vue'
import ProfileSkeleton from '@/components/ProfileSkeleton.vue'
import ErrorState from '@/components/ErrorState.vue'
import SearchBar from '@/components/SearchBar.vue'
import RepoList from '@/components/RepoList.vue'
import LanguageChart from '@/components/LanguageChart.vue'

const route = useRoute()
const router = useRouter()
const { user, loading, error, fetchUser } = useProfile()

const currentUsername = ref(route.params.username as string)
const searchInput = ref(currentUsername.value)

const {
  filteredRepos,
  loading: reposLoading,
  hasMore,
  sort,
  searchQuery,
  fetchRepos,
  loadMore,
  changeSort,
} = useRepos(() => currentUsername.value)

const { languageStats, computeFromRepos } = useLanguages()

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
    }
  },
  { immediate: true },
)

function handleSearch(username: string) {
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
      <ProfileCard :user="user" />

      <LanguageChart :stats="languageStats" />

      <section>
        <h2 class="text-xl font-semibold text-gray-100 mb-4">
          Repositories
          <span class="text-gray-500 text-base font-normal">({{ user.public_repos }})</span>
        </h2>
        <RepoList
          :repos="filteredRepos"
          :loading="reposLoading"
          :has-more="hasMore"
          :sort="sort"
          :search-query="searchQuery"
          @load-more="loadMore"
          @change-sort="changeSort"
          @update:search-query="searchQuery = $event"
        />
      </section>
    </template>
  </div>
</template>
