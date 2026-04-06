<script setup lang="ts">
import type { GitHubUser } from '@/types'

defineProps<{
  user: GitHubUser
}>()
</script>

<template>
  <div class="glass rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
    <!-- Avatar -->
    <a :href="user.html_url" target="_blank" rel="noopener noreferrer" class="shrink-0">
      <img
        :src="user.avatar_url"
        :alt="`${user.login}'s avatar`"
        class="w-24 h-24 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform"
      />
    </a>

    <!-- Info -->
    <div class="flex-1 text-center sm:text-left min-w-0">
      <div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2.5 mb-1.5">
        <h2 class="text-xl font-semibold text-gray-900 truncate">{{ user.name || user.login }}</h2>
        <a
          :href="user.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-[#0071e3] hover:underline text-sm font-normal"
        >
          @{{ user.login }}
        </a>
      </div>

      <p v-if="user.bio" class="text-gray-500 text-sm mb-4 max-w-lg leading-relaxed">{{ user.bio }}</p>

      <!-- Meta info -->
      <div class="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
        <span v-if="user.location" class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {{ user.location }}
        </span>
        <span v-if="user.company" class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          {{ user.company }}
        </span>
        <a
          v-if="user.blog"
          :href="user.blog.startsWith('http') ? user.blog : `https://${user.blog}`"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 text-[#0071e3] hover:underline"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
          {{ user.blog }}
        </a>
        <a
          v-if="user.twitter_username"
          :href="`https://twitter.com/${user.twitter_username}`"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 text-[#0071e3] hover:underline"
        >
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          @{{ user.twitter_username }}
        </a>
      </div>

      <!-- Stats -->
      <div class="flex gap-5 text-sm justify-center sm:justify-start">
        <div class="text-center">
          <span class="block text-lg font-bold text-gray-900">{{ user.public_repos.toLocaleString() }}</span>
          <span class="text-gray-400 text-xs">Repos</span>
        </div>
        <div class="w-px bg-black/[0.06]"></div>
        <div class="text-center">
          <span class="block text-lg font-bold text-gray-900">{{ user.followers.toLocaleString() }}</span>
          <span class="text-gray-400 text-xs">Followers</span>
        </div>
        <div class="w-px bg-black/[0.06]"></div>
        <div class="text-center">
          <span class="block text-lg font-bold text-gray-900">{{ user.following.toLocaleString() }}</span>
          <span class="text-gray-400 text-xs">Following</span>
        </div>
      </div>
    </div>
  </div>
</template>
