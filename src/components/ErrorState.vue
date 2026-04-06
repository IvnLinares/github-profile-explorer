<script setup lang="ts">
import type { ApiError } from '@/types'

defineProps<{
  error: ApiError
}>()
</script>

<template>
  <div class="glass rounded-2xl p-10 text-center">
    <div class="text-4xl mb-4">
      {{ error.isNotFound ? '🔍' : error.isRateLimit ? '⏱️' : '⚠️' }}
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-1.5">
      {{ error.isNotFound ? 'User Not Found' : error.isRateLimit ? 'Rate Limit Exceeded' : 'Something went wrong' }}
    </h3>
    <p class="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
      {{ error.message }}
    </p>
  </div>
</template>
