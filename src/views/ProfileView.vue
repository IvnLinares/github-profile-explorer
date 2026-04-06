<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const username = route.params.username as string
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <p class="text-gray-400">
      Profile view for <span class="text-brand-400 font-semibold">{{ username }}</span> — coming in Fase 2.
    </p>
  </div>
</template>
