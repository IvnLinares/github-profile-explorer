<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header glass -->
    <header class="glass-header sticky top-0 z-50 border-b border-black/[0.04] dark:border-white/[0.06]">
      <div class="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-3 flex-1 min-w-0 hover:text-[#0071e3] transition-colors">
          <svg class="w-7 h-7 text-gray-900 dark:text-gray-100 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          <h1 class="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
            GitHub Profile Explorer
          </h1>
        </RouterLink>

        <!-- Nav actions -->
        <div class="flex items-center gap-2">
          <RouterLink
            to="/compare"
            class="text-sm px-4 py-2 rounded-lg glass-sm text-gray-700 dark:text-gray-300 hover:text-[#0071e3] transition-colors font-medium border border-white/30 dark:border-white/10"
          >
            Compare
          </RouterLink>

          <!-- Dark mode toggle -->
          <button
            @click="toggleTheme"
            class="w-9 h-9 rounded-lg glass-sm flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#0071e3] transition-colors cursor-pointer border border-white/30 dark:border-white/10"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <!-- Sun -->
            <svg v-if="isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            <!-- Moon -->
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="py-6 text-center text-sm text-gray-400">
      desarrollado con <span class="text-red-400">❤️</span> por
      <a
        href="https://ivnlinares.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[#0071e3] hover:underline font-medium"
      >
        IvnLinares
      </a>
    </footer>
  </div>
</template>
