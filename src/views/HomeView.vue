<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')

function handleSearch() {
  const trimmed = username.value.trim()
  if (!trimmed) return
  router.push({ name: 'profile', params: { username: trimmed } })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] px-4">
    <div class="text-center mb-10">
      <h2 class="text-4xl font-bold mb-3 bg-gradient-to-r from-brand-400 to-brand-200 bg-clip-text text-transparent">
        Explore GitHub Profiles
      </h2>
      <p class="text-gray-400 text-lg max-w-md">
        Search any GitHub user to see their repos, languages, and stats.
      </p>
    </div>

    <form
      class="w-full max-w-lg flex gap-3"
      @submit.prevent="handleSearch"
    >
      <input
        v-model="username"
        type="text"
        placeholder="Enter a GitHub username..."
        class="flex-1 px-4 py-3 rounded-xl bg-surface-2 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
      />
      <button
        type="submit"
        class="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium transition cursor-pointer"
      >
        Search
      </button>
    </form>
  </div>
</template>
