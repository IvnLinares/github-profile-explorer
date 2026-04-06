<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchHistory } from '@/composables/useSearchHistory'

const router = useRouter()
const username = ref('')
const { history, addSearch, removeSearch } = useSearchHistory()

function handleSearch() {
  const trimmed = username.value.trim()
  if (!trimmed) return
  addSearch(trimmed)
  router.push({ name: 'profile', params: { username: trimmed } })
}

function searchHint(hint: string) {
  username.value = hint
  handleSearch()
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] px-4 py-12">

    <!-- Hero -->
    <div class="text-center mb-12 max-w-2xl">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl glass mb-8 border border-white/40 dark:border-white/10">
        <svg class="w-10 h-10 text-[#0071e3] dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>
      <h2 class="text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
        Explore GitHub
        <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#0071e3] to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Profiles
        </span>
      </h2>
      <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
        Discover repositories, languages, activity, and stats for any GitHub developer.
      </p>
    </div>

    <!-- Search -->
    <form
      class="w-full max-w-lg flex gap-3 mb-6"
      @submit.prevent="handleSearch"
    >
      <input
        v-model="username"
        type="text"
        placeholder="Search a GitHub username..."
        aria-label="GitHub username"
        class="flex-1 px-5 py-4 rounded-xl glass-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/50 transition text-base border border-white/40 dark:border-white/10"
      />
      <button
        type="submit"
        :disabled="!username.trim()"
        class="px-8 py-4 rounded-xl bg-gradient-to-r from-[#0071e3] to-[#0056b3] hover:from-[#0077ed] hover:to-[#005fc4] text-white font-bold text-base transition-all cursor-pointer disabled:opacity-50 shadow-lg hover:shadow-[0_8px_24px_rgba(0,113,227,0.4)] disabled:shadow-none border border-[#0071e3]/50"
      >
        Search
      </button>
    </form>

    <!-- Search history -->
    <div v-if="history.length" class="flex gap-2.5 mb-6 flex-wrap justify-center max-w-lg">
      <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 self-center">Recent searches:</span>
      <div v-for="item in history" :key="item" class="flex items-center gap-0 group">
        <button
          @click="searchHint(item)"
          class="text-sm px-3.5 py-1.5 rounded-l-lg glass-sm text-gray-700 dark:text-gray-300 hover:text-[#0071e3] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition font-medium border border-white/40 dark:border-white/10 border-r-0"
        >
          {{ item }}
        </button>
        <button
          @click="removeSearch(item)"
          class="text-sm px-2.5 py-1.5 rounded-r-lg glass-sm text-gray-500 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition border border-white/40 dark:border-white/10 border-l-0"
          :aria-label="`Remove ${item}`"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Example hints -->
    <div class="flex gap-3 flex-wrap justify-center text-center">
      <span class="text-sm font-semibold text-gray-600 dark:text-gray-400 w-full mb-1">Try popular developers:</span>
      <button
        v-for="hint in ['ivnlinares', 'torvalds', 'github', 'microsoft']"
        :key="hint"
        @click="searchHint(hint)"
        class="text-sm px-4 py-2 rounded-lg glass-sm text-gray-700 dark:text-gray-300 hover:text-[#0071e3] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition font-medium border border-white/40 dark:border-white/10"
      >
        @{{ hint }}
      </button>
    </div>

  </div>
</template>
