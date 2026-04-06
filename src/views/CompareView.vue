<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProfile } from '@/composables/useProfile'
import { useRepos } from '@/composables/useRepos'
import ProfileCard from '@/components/ProfileCard.vue'
import ProfileSkeleton from '@/components/ProfileSkeleton.vue'
import ErrorState from '@/components/ErrorState.vue'
import LanguageChart from '@/components/LanguageChart.vue'
import { useLanguages } from '@/composables/useLanguages'

const route = useRoute()

const user1Input = ref((route.query.a as string) || '')
const user2Input = ref((route.query.b as string) || '')

const {
  user: userA,
  loading: loadingA,
  error: errorA,
  fetchUser: fetchA,
} = useProfile()

const {
  user: userB,
  loading: loadingB,
  error: errorB,
  fetchUser: fetchB,
} = useProfile()

const { filteredRepos: reposA, totalStars: starsA, fetchRepos: fetchReposA } = useRepos(() => user1Input.value)
const { filteredRepos: reposB, totalStars: starsB, fetchRepos: fetchReposB } = useRepos(() => user2Input.value)

const { languageStats: langsA, computeFromRepos: computeA } = useLanguages()
const { languageStats: langsB, computeFromRepos: computeB } = useLanguages()

const hasCompared = ref(false)

async function compare() {
  const a = user1Input.value.trim()
  const b = user2Input.value.trim()
  if (!a || !b) return
  hasCompared.value = true
  await Promise.all([
    fetchA(a).then(() => fetchReposA(true).then(() => computeA(reposA.value))),
    fetchB(b).then(() => fetchReposB(true).then(() => computeB(reposB.value))),
  ])
}

// run compare on mount if query params provided
watch(
  () => [route.query.a, route.query.b],
  ([a, b]) => {
    if (a && b) compare()
  },
  { immediate: true },
)

const statRows = computed(() => {
  if (!userA.value || !userB.value) return []
  return [
    {
      label: 'Public Repos',
      a: userA.value.public_repos.toLocaleString(),
      b: userB.value.public_repos.toLocaleString(),
      winner: userA.value.public_repos > userB.value.public_repos ? 'A' : userA.value.public_repos < userB.value.public_repos ? 'B' : null,
    },
    {
      label: 'Total Stars ★',
      a: starsA.value.toLocaleString(),
      b: starsB.value.toLocaleString(),
      winner: starsA.value > starsB.value ? 'A' : starsA.value < starsB.value ? 'B' : null,
    },
    {
      label: 'Followers',
      a: userA.value.followers.toLocaleString(),
      b: userB.value.followers.toLocaleString(),
      winner: userA.value.followers > userB.value.followers ? 'A' : userA.value.followers < userB.value.followers ? 'B' : null,
    },
    {
      label: 'Following',
      a: userA.value.following.toLocaleString(),
      b: userB.value.following.toLocaleString(),
      winner: userA.value.following > userB.value.following ? 'A' : userA.value.following < userB.value.following ? 'B' : null,
    },
  ]
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-10 space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-1">Compare Profiles</h2>
      <p class="text-gray-500 text-sm">Side-by-side GitHub stats comparison</p>
    </div>

    <!-- Input row -->
    <div class="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
      <input
        v-model="user1Input"
        type="text"
        placeholder="First username..."
        class="flex-1 px-4 py-2.5 rounded-xl glass-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition text-sm"
        @keyup.enter="compare"
      />
      <span class="self-center text-gray-400 font-bold hidden sm:block">vs</span>
      <input
        v-model="user2Input"
        type="text"
        placeholder="Second username..."
        class="flex-1 px-4 py-2.5 rounded-xl glass-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition text-sm"
        @keyup.enter="compare"
      />
      <button
        @click="compare"
        :disabled="!user1Input.trim() || !user2Input.trim()"
        class="px-5 py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-sm transition cursor-pointer disabled:opacity-40 shadow-[0_2px_8px_rgba(0,113,227,0.25)]"
      >
        Compare
      </button>
    </div>

    <!-- Results -->
    <template v-if="hasCompared">
      <!-- Profile cards side-by-side -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ProfileSkeleton v-if="loadingA" />
          <ErrorState v-else-if="errorA" :error="errorA" />
          <ProfileCard v-else-if="userA" :user="userA" :total-stars="starsA" />
        </div>
        <div>
          <ProfileSkeleton v-if="loadingB" />
          <ErrorState v-else-if="errorB" :error="errorB" />
          <ProfileCard v-else-if="userB" :user="userB" :total-stars="starsB" />
        </div>
      </div>

      <!-- Stats table -->
      <div v-if="userA && userB" class="glass rounded-2xl overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/[0.06] dark:border-white/[0.06]">
              <th class="py-3 px-5 text-left text-gray-400 font-medium">Stat</th>
              <th class="py-3 px-5 text-center text-[#0071e3] font-semibold">{{ userA.login }}</th>
              <th class="py-3 px-5 text-center text-[#0071e3] font-semibold">{{ userB.login }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in statRows"
              :key="row.label"
              class="border-b border-black/[0.04] dark:border-white/[0.04] last:border-0"
            >
              <td class="py-3 px-5 text-gray-500">{{ row.label }}</td>
              <td class="py-3 px-5 text-center font-semibold" :class="row.winner === 'A' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'">
                {{ row.a }}
                <span v-if="row.winner === 'A'" class="text-green-500 ml-1">↑</span>
              </td>
              <td class="py-3 px-5 text-center font-semibold" :class="row.winner === 'B' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'">
                {{ row.b }}
                <span v-if="row.winner === 'B'" class="text-green-500 ml-1">↑</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Language charts -->
      <div v-if="langsA.length || langsB.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LanguageChart v-if="langsA.length" :stats="langsA" />
        <LanguageChart v-if="langsB.length" :stats="langsB" />
      </div>
    </template>
  </div>
</template>
