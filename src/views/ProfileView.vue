<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProfile } from '@/composables/useProfile'
import ProfileCard from '@/components/ProfileCard.vue'
import ProfileSkeleton from '@/components/ProfileSkeleton.vue'
import ErrorState from '@/components/ErrorState.vue'
import SearchBar from '@/components/SearchBar.vue'

const route = useRoute()
const router = useRouter()
const { user, loading, error, fetchUser } = useProfile()

const searchInput = ref(route.params.username as string)

// Fetch on route param change
watch(
  () => route.params.username,
  (username) => {
    if (username && typeof username === 'string') {
      searchInput.value = username
      fetchUser(username)
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

    <!-- Profile -->
    <ProfileCard v-else-if="user" :user="user" />
  </div>
</template>
