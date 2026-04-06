<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import type { LanguageStat } from '@/types'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  stats: LanguageStat[]
}>()

const chartData = computed(() => ({
  labels: props.stats.map((s) => s.name),
  datasets: [
    {
      data: props.stats.map((s) => s.bytes),
      backgroundColor: props.stats.map((s) => s.color),
      borderColor: 'transparent',
      hoverOffset: 6,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.95)',
      titleColor: '#1d1d1f',
      bodyColor: '#6e6e73',
      borderColor: 'rgba(0,0,0,0.08)',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label(ctx: { label?: string; parsed: number; dataset: { data: number[] } }) {
          const total = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const pct = Math.round((ctx.parsed / total) * 100)
          return ` ${ctx.label}: ${pct}%`
        },
      },
    },
  },
}
</script>

<template>
  <div class="glass rounded-2xl p-6">
    <h3 class="text-base font-semibold text-gray-900 mb-5">Languages</h3>

    <div v-if="stats.length" class="flex flex-col sm:flex-row items-center gap-6">
      <!-- Chart -->
      <div class="w-44 h-44 shrink-0">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap gap-x-5 gap-y-2.5">
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="flex items-center gap-2 text-sm"
        >
          <span
            class="w-2.5 h-2.5 rounded-full shrink-0"
            :style="{ backgroundColor: stat.color }"
          ></span>
          <span class="text-gray-700 font-medium">{{ stat.name }}</span>
          <span class="text-gray-400">{{ stat.percentage }}%</span>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-400 text-sm">No language data available.</p>
  </div>
</template>
