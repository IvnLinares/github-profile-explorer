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

// Apply inline formatting (bold, italic, links, code, images) while preserving emojis
function applyInlineFormatting(text: string): string {
  return (
    text
      // Images ![alt](url)
      .replace(
        /!\[(.*?)\]\((.*?)\)/g,
        '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4 inline-block" loading="lazy" />',
      )
      // Bold **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>')
      // Italic *text* (but not within **)
      .replace(/(?<!\*)\*([^\*]+)\*(?!\*)/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>')
      // Links [text](url)
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#0071e3] hover:text-[#0077ed] underline">$1</a>',
      )
      // Inline code `text`
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-200 dark:bg-gray-800 rounded px-2 py-1 font-mono text-sm text-gray-900 dark:text-gray-100">$1</code>',
      )
  )
}

// Enhanced markdown to HTML converter
const htmlContent = computed(() => {
  if (!props.content) return ''

  let lines = props.content.split('\n')
  let html = ''
  let inCodeBlock = false
  let codeBlockContent = ''
  let i = 0

  while (i < lines.length) {
    let line = lines[i]

    // Code blocks
    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeBlockContent = ''
      } else {
        inCodeBlock = false
        html += `<pre class="bg-gray-100 dark:bg-gray-900/50 rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm font-mono text-gray-800 dark:text-gray-200">${codeBlockContent
          .split('\n')
          .map(l => l.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
          .join('\n')}</code></pre>`
      }
      i++
      continue
    }

    if (inCodeBlock) {
      codeBlockContent += (codeBlockContent ? '\n' : '') + line
      i++
      continue
    }

    const trimmed = line.trim()

    // Preserve raw HTML (detect <tag> patterns)
    if (trimmed.includes('<') && trimmed.includes('>')) {
      html += `<div class="my-4">${trimmed}</div>`
      i++
      continue
    }

    // Horizontal rules
    if (/^-{3,}$/.test(trimmed)) {
      html += '<hr class="my-6 border-0 border-t border-gray-300 dark:border-gray-700" />'
      i++
      continue
    }

    // Headers
    if (/^#{1,3}\s/.test(trimmed)) {
      const match = trimmed.match(/^(#+)\s(.*)$/)
      if (match) {
        const level = match[1].length
        const text = match[2]
        const sizes = {
          1: 'text-3xl',
          2: 'text-2xl',
          3: 'text-xl',
        }
        const size = sizes[level as keyof typeof sizes] || 'text-lg'
        html += `<h${level} class="${size} font-bold text-gray-900 dark:text-white mt-8 mb-4">${applyInlineFormatting(text)}</h${level}>`
      }
      i++
      continue
    }

    // Empty lines
    if (!trimmed) {
      html += ''
      i++
      continue
    }

    // Lists (- or *)
    if (/^[-*]\s/.test(trimmed)) {
      html += `<ul class="list-disc list-inside my-4 space-y-2">`

      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) {
        const itemText = lines[i].trim().substring(2)
        html += `<li class="text-gray-700 dark:text-gray-300 ml-2">${applyInlineFormatting(itemText)}</li>`
        i++
      }

      html += `</ul>`
      continue
    }

    // Regular paragraphs
    if (trimmed) {
      html += `<p class="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">${applyInlineFormatting(trimmed)}</p>`
    }

    i++
  }

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

  <div v-else-if="props.content" class="glass rounded-3xl p-8">
    <div class="flex items-center gap-2 mb-6">
      <svg class="w-5 h-5 text-[#0071e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">Profile README</h3>
    </div>
    <!-- Renderizar HTML con soporte para emojis, imágenes, badges, etc -->
    <div v-html="htmlContent" class="readme-content overflow-x-auto"></div>
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
