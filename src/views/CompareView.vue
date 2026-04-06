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
  <div class="max-w-6xl mx-auto px-4 py-12 space-y-10">
    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">Compare Profiles</h2>
      <p class="text-gray-600 dark:text-gray-400 text-lg">Side-by-side GitHub stats comparison</p>
    </div>

    <!-- Input row -->
    <div class="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
      <input
        v-model="user1Input"
        type="text"
        placeholder="First username..."
        class="flex-1 px-5 py-3 rounded-xl glass-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/50 transition text-base border border-white/40 dark:border-white/10"
        @keyup.enter="compare"
      />
      <span class="self-center text-gray-400 font-bold hidden sm:block text-xl">vs</span>
      <input
        v-model="user2Input"
        type="text"
        placeholder="Second username..."
        class="flex-1 px-5 py-3 rounded-xl glass-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/50 transition text-base border border-white/40 dark:border-white/10"
        @keyup.enter="compare"
      />
      <button
        @click="compare"
        :disabled="!user1Input.trim() || !user2Input.trim()"
        class="px-7 py-3 rounded-xl bg-gradient-to-r from-[#0071e3] to-[#0056b3] hover:from-[#0077ed] hover:to-[#005fc4] text-white font-bold text-base transition-all cursor-pointer disabled:opacity-50 shadow-lg hover:shadow-[0_8px_24px_rgba(0,113,227,0.4)] disabled:shadow-none border border-[#0071e3]/50"
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
      <div v-if="userA && userB" class="glass rounded-3xl overflow-hidden border border-white/40 dark:border-white/10">
        <table class="w-full">
          <thead class="bg-white/40 dark:bg-white/5 border-b border-black/[0.06] dark:border-white/[0.06]">
            <tr>
              <th class="py-4 px-6 text-left text-gray-700 dark:text-gray-300 font-semibold">Stat</th>
              <th class="py-4 px-6 text-center text-gray-700 dark:text-gray-300 font-semibold">{{ userA.login }}</th>
              <th class="py-4 px-6 text-center text-gray-700 dark:text-gray-300 font-semibold">{{ userB.login }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in statRows"
              :key="row.label"
              class="border-b border-black/[0.04] dark:border-white/[0.04] last:border-0 hover:bg-white/20 dark:hover:bg-white/5 transition-colors"
            >
              <td class="py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">{{ row.label }}</td>
              <td class="py-4 px-6 text-center font-semibold text-lg" :class="row.winner === 'A' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'">
                {{ row.a }}
                <span v-if="row.winner === 'A'" class="text-emerald-500 ml-2">↑</span>
              </td>
              <td class="py-4 px-6 text-center font-semibold text-lg" :class="row.winner === 'B' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'">
                {{ row.b }}
                <span v-if="row.winner === 'B'" class="text-emerald-500 ml-2">↑</span>
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
