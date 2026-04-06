<script setup lang="ts">
import type { GitHubUser } from '@/types'

defineProps<{
  user: GitHubUser
  totalStars?: number
}>()
</script>

<template>
  <div class="glass rounded-3xl p-8">
    <!-- Header: Avatar + Name -->
    <div class="flex flex-col sm:flex-row gap-6 mb-6">
      <!-- Avatar with frame -->
      <a :href="user.html_url" target="_blank" rel="noopener noreferrer" class="shrink-0">
        <div class="relative w-28 h-28 group">
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0071e3]/20 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-lg transition-all duration-300"></div>
          <img
            :src="user.avatar_url"
            :alt="`${user.login}'s avatar`"
            class="relative w-full h-full rounded-3xl object-cover shadow-lg group-hover:shadow-[0_8px_32px_rgba(0,113,227,0.25)] transition-all duration-300 ring-2 ring-white/50 dark:ring-white/10"
          />
        </div>
      </a>

      <!-- Name & Login -->
      <div class="flex-1 min-w-0">
        <div class="flex flex-col ">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-1 truncate">{{ user.name || user.login }}</h2>
          <a
            :href="user.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#0071e3] hover:text-[#0077ed] text-base font-semibold transition-colors inline-block w-fit"
          >
            @{{ user.login }}
          </a>
        </div>
        <p v-if="user.bio" class="text-gray-600 dark:text-gray-300 text-base leading-relaxed mt-3">{{ user.bio }}</p>
      </div>
    </div>

    <!-- Meta row -->
    <div v-if="user.location || user.company || user.blog || user.twitter_username" class="flex flex-wrap gap-4 mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
      <div v-if="user.location" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <svg class="w-4 h-4 text-[#0071e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        {{ user.location }}
      </div>
      <div v-if="user.company" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <svg class="w-4 h-4 text-[#0071e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
        {{ user.company }}
      </div>
      <a
        v-if="user.blog"
        :href="user.blog.startsWith('http') ? user.blog : `https://${user.blog}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 text-sm text-[#0071e3] hover:text-[#0077ed] transition-colors font-medium"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
        Website
      </a>
      <a
        v-if="user.twitter_username"
        :href="`https://twitter.com/${user.twitter_username}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 text-sm text-[#0071e3] hover:text-[#0077ed] transition-colors font-medium"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Twitter
      </a>
    </div>

    <!-- Stats badges -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl p-4 text-center border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-shadow">
        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ user.public_repos.toLocaleString() }}</div>
        <div class="text-xs font-medium text-blue-600/70 dark:text-blue-400/70 mt-1">Repositories</div>
      </div>
      <div v-if="totalStars !== undefined" class="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 rounded-2xl p-4 text-center border border-yellow-200/50 dark:border-yellow-800/50 hover:shadow-lg transition-shadow">
        <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ totalStars.toLocaleString() }}</div>
        <div class="text-xs font-medium text-yellow-600/70 dark:text-yellow-400/70 mt-1">Stars ⭐</div>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl p-4 text-center border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-shadow">
        <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ user.followers.toLocaleString() }}</div>
        <div class="text-xs font-medium text-purple-600/70 dark:text-purple-400/70 mt-1">Followers</div>
      </div>
      <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-2xl p-4 text-center border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-lg transition-shadow">
        <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ user.following.toLocaleString() }}</div>
        <div class="text-xs font-medium text-emerald-600/70 dark:text-emerald-400/70 mt-1">Following</div>
      </div>
    </div>
  </div>
</template>
