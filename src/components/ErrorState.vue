<script setup lang="ts">
import type { ApiError } from '@/types'

defineProps<{
  error: ApiError
}>()
</script>

<template>
  <div class="bg-surface-2 rounded-2xl border border-red-500/20 p-8 text-center">
    <div class="text-4xl mb-4">
      {{ error.isNotFound ? '🔍' : error.isRateLimit ? '⏱️' : '⚠️' }}
    </div>
    <h3 class="text-xl font-semibold text-gray-100 mb-2">
      {{ error.isNotFound ? 'User Not Found' : error.isRateLimit ? 'Rate Limit Exceeded' : 'Something went wrong' }}
    </h3>
    <p class="text-gray-400 max-w-md mx-auto">
      {{ error.message }}
    </p>
  </div>
</template>
