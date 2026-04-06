<script setup lang="ts">
import type { GitHubEvent } from '@/types'

defineProps<{
  events: GitHubEvent[]
  loading: boolean
}>()

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

interface EventInfo {
  icon: string
  text: string
  url?: string
}

function parseEvent(event: GitHubEvent): EventInfo | null {
  const repo = event.repo.name
  const repoUrl = `https://github.com/${repo}`
  const p = event.payload

  switch (event.type) {
    case 'PushEvent': {
      const commits = p.commits?.length ?? 0
      const msg = p.commits?.[0]?.message?.split('\n')[0] ?? ''
      return {
        icon: '⬆',
        text: `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${repo}${msg ? ` — "${msg}"` : ''}`,
        url: repoUrl,
      }
    }
    case 'CreateEvent':
      return {
        icon: '✦',
        text: `Created ${p.ref_type} ${p.ref ? `"${p.ref}" in ` : ''}${repo}`,
        url: repoUrl,
      }
    case 'WatchEvent':
      return { icon: '★', text: `Starred ${repo}`, url: repoUrl }
    case 'ForkEvent':
      return {
        icon: '⑂',
        text: `Forked ${repo} → ${p.forkee?.full_name ?? ''}`,
        url: p.forkee?.html_url ?? repoUrl,
      }
    case 'PullRequestEvent':
      return {
        icon: p.action === 'closed' && p.pull_request?.merged ? '⇋' : '⇌',
        text: `${p.action === 'opened' ? 'Opened PR' : p.pull_request?.merged ? 'Merged PR' : 'Closed PR'}: "${p.pull_request?.title}" in ${repo}`,
        url: p.pull_request?.html_url,
      }
    case 'IssuesEvent':
      return {
        icon: '◎',
        text: `${p.action === 'opened' ? 'Opened issue' : 'Closed issue'}: "${p.issue?.title}" in ${repo}`,
        url: p.issue?.html_url,
      }
    case 'IssueCommentEvent':
      return {
        icon: '◌',
        text: `Commented on "${p.issue?.title}" in ${repo}`,
        url: p.issue?.html_url,
      }
    case 'ReleaseEvent':
      return {
        icon: '◈',
        text: `Released ${p.release?.tag_name ?? ''} in ${repo}`,
        url: p.release?.html_url,
      }
    case 'DeleteEvent':
      return { icon: '✕', text: `Deleted ${p.ref_type} "${p.ref}" in ${repo}`, url: repoUrl }
    case 'PublicEvent':
      return { icon: '◉', text: `Made ${repo} public`, url: repoUrl }
    default:
      return null
  }
}
</script>

<template>
  <div class="glass rounded-2xl p-6">
    <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-5">Recent Activity</h3>

    <!-- Skeleton -->
    <div v-if="loading" class="space-y-3 animate-pulse">
      <div v-for="i in 6" :key="i" class="flex gap-3 items-start">
        <div class="w-7 h-7 rounded-full bg-black/[0.06] dark:bg-white/[0.08] shrink-0"></div>
        <div class="flex-1 space-y-1.5 pt-1">
          <div class="h-3 rounded-full bg-black/[0.06] dark:bg-white/[0.08]" :style="`width:${60 + (i * 13) % 35}%`"></div>
          <div class="h-2.5 w-16 rounded-full bg-black/[0.04] dark:bg-white/[0.05]"></div>
        </div>
      </div>
    </div>

    <div v-else-if="events.length" class="relative">
      <!-- Timeline line -->
      <div class="absolute left-3.5 top-0 bottom-0 w-px bg-black/[0.06] dark:bg-white/[0.1]"></div>

      <div class="space-y-4">
        <div
          v-for="event in events"
          :key="event.id"
          class="flex gap-3 items-start pl-0"
        >
          <template v-if="parseEvent(event)">
            <!-- Dot -->
            <div class="w-7 h-7 rounded-full glass-sm shrink-0 relative z-10 flex items-center justify-center text-[11px] text-gray-500 font-mono">
              {{ parseEvent(event)!.icon }}
            </div>
            <div class="flex-1 min-w-0 pb-1">
              <a
                v-if="parseEvent(event)!.url"
                :href="parseEvent(event)!.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-gray-700 dark:text-gray-300 hover:text-[#0071e3] transition-colors leading-snug line-clamp-2 block"
              >
                {{ parseEvent(event)!.text }}
              </a>
              <p v-else class="text-sm text-gray-700 dark:text-gray-300 leading-snug line-clamp-2">
                {{ parseEvent(event)!.text }}
              </p>
              <span class="text-[11px] text-gray-400 mt-0.5 block">{{ timeAgo(event.created_at) }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-400 text-sm">No recent public activity.</p>
  </div>
</template>
