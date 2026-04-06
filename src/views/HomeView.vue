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
  <div class="flex flex-col items-center justify-center min-h-[78vh] px-4">

    <!-- Hero -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-6">
        <svg class="w-8 h-8 text-gray-800 dark:text-gray-200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>
      <h2 class="text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100 tracking-tight">
        Explore GitHub Profiles
      </h2>
      <p class="text-gray-500 text-lg max-w-sm mx-auto leading-relaxed">
        Search any user to see their repos, languages, and stats.
      </p>
    </div>

    <!-- Search -->
    <form
      class="w-full max-w-md flex gap-2"
      @submit.prevent="handleSearch"
    >
      <input
        v-model="username"
        type="text"
        placeholder="Username..."
        aria-label="GitHub username"
        class="flex-1 px-4 py-3 rounded-xl glass-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition text-sm"
      />
      <button
        type="submit"
        :disabled="!username.trim()"
        class="px-5 py-3 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-sm transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_2px_8px_rgba(0,113,227,0.3)]"
      >
        Search
      </button>
    </form>

    <!-- Search history -->
    <div v-if="history.length" class="flex gap-2 mt-4 flex-wrap justify-center max-w-md">
      <span class="text-xs text-gray-400 self-center">Recent:</span>
      <div v-for="item in history" :key="item" class="flex items-center gap-0.5">
        <button
          @click="searchHint(item)"
          class="text-xs px-2.5 py-1 rounded-l-full glass-sm text-gray-600 dark:text-gray-300 hover:text-[#0071e3] transition cursor-pointer"
        >
          {{ item }}
        </button>
        <button
          @click="removeSearch(item)"
          class="text-xs px-1.5 py-1 rounded-r-full glass-sm text-gray-400 hover:text-red-400 transition cursor-pointer"
          :aria-label="`Remove ${item}`"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Example hints -->
    <div class="flex gap-2 mt-4 flex-wrap justify-center">
      <span class="text-xs text-gray-400 self-center">Try:</span>
      <button
        v-for="hint in ['ivnlinares', 'github', 'torvalds', 'vuejs', 'microsoft']"
        :key="hint"
        @click="searchHint(hint)"
        class="text-xs px-3 py-1.5 rounded-full glass-sm text-gray-600 dark:text-gray-300 hover:text-[#0071e3] transition cursor-pointer"
      >
        {{ hint }}
      </button>
    </div>

  </div>
</template>
