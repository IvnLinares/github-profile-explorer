<script setup lang="ts">
import type { GitHubUser } from '@/types'

defineProps<{
  user: GitHubUser
}>()
</script>

<template>
  <div class="bg-surface-2 rounded-2xl border border-white/10 p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
    <!-- Avatar -->
    <a :href="user.html_url" target="_blank" rel="noopener noreferrer">
      <img
        :src="user.avatar_url"
        :alt="`${user.login}'s avatar`"
        class="w-28 h-28 rounded-full ring-2 ring-brand-500/30 hover:ring-brand-400 transition"
      />
    </a>

    <!-- Info -->
    <div class="flex-1 text-center sm:text-left">
      <div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
        <h2 class="text-2xl font-bold text-gray-100">{{ user.name || user.login }}</h2>
        <a
          :href="user.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand-400 hover:text-brand-300 transition text-sm"
        >
          @{{ user.login }}
        </a>
      </div>

      <p v-if="user.bio" class="text-gray-400 mb-4 max-w-lg">{{ user.bio }}</p>

      <!-- Meta info -->
      <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
        <span v-if="user.location" class="flex items-center gap-1">
          📍 {{ user.location }}
        </span>
        <span v-if="user.company" class="flex items-center gap-1">
          🏢 {{ user.company }}
        </span>
        <a
          v-if="user.blog"
          :href="user.blog.startsWith('http') ? user.blog : `https://${user.blog}`"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 text-brand-400 hover:text-brand-300 transition"
        >
          🔗 {{ user.blog }}
        </a>
        <a
          v-if="user.twitter_username"
          :href="`https://twitter.com/${user.twitter_username}`"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 text-brand-400 hover:text-brand-300 transition"
        >
          🐦 @{{ user.twitter_username }}
        </a>
      </div>

      <!-- Stats -->
      <div class="flex gap-6 text-sm">
        <div class="text-center">
          <span class="block text-xl font-bold text-gray-100">{{ user.public_repos }}</span>
          <span class="text-gray-500">Repos</span>
        </div>
        <div class="text-center">
          <span class="block text-xl font-bold text-gray-100">{{ user.followers }}</span>
          <span class="text-gray-500">Followers</span>
        </div>
        <div class="text-center">
          <span class="block text-xl font-bold text-gray-100">{{ user.following }}</span>
          <span class="text-gray-500">Following</span>
        </div>
      </div>
    </div>
  </div>
</template>
