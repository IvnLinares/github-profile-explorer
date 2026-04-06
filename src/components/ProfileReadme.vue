<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  username: string
  content: string | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

// Simple markdown to HTML converter for basic formatting
const htmlContent = computed(() => {
  if (!props.content) return ''

  let html = props.content
    // Headers
    .replace(/^### (.*?)$/gm, '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#0071e3] hover:text-[#0077ed] underline">$1</a>')
    // Code blocks
    .replace(/```(.*?)```/gs, '<pre class="bg-gray-100 dark:bg-gray-900/50 rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm font-mono text-gray-800 dark:text-gray-200">$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-800 rounded px-2 py-1 font-mono text-sm text-gray-900 dark:text-gray-100">$1</code>')
    // Paragraphs
    .split('\n\n')
    .map((p: string) => p.trim())
    .filter((p: string) => p.length > 0 && !p.startsWith('<'))
    .map((p: string) => `<p class="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">${p}</p>`)
    .join('')

  return html
})
</script>

<template>
  <div v-if="loading" class="glass rounded-3xl p-8">
    <div class="animate-pulse space-y-4">
      <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  </div>

  <div v-else-if="content" class="glass rounded-3xl p-8 prose dark:prose-invert max-w-none">
    <div class="flex items-center gap-2 mb-6">
      <svg class="w-5 h-5 text-[#0071e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">Profile README</h3>
    </div>
    <div v-html="htmlContent" class="prose-sm"></div>
  </div>

  <div v-else class="glass rounded-3xl p-8 text-center">
    <div class="flex justify-center mb-4">
      <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <p class="text-gray-500 dark:text-gray-400">
      No README found for
      <strong>{{ username }}/{{ username }}</strong>
    </p>
  </div>
</template>
