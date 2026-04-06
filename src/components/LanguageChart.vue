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
  <div class="bg-surface-2 rounded-2xl border border-white/10 p-6">
    <h3 class="text-lg font-semibold text-gray-100 mb-4">Languages</h3>

    <div v-if="stats.length" class="flex flex-col sm:flex-row items-center gap-6">
      <!-- Chart -->
      <div class="w-48 h-48 shrink-0">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap gap-3">
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="flex items-center gap-2 text-sm"
        >
          <span
            class="w-3 h-3 rounded-full shrink-0"
            :style="{ backgroundColor: stat.color }"
          ></span>
          <span class="text-gray-300">{{ stat.name }}</span>
          <span class="text-gray-500">{{ stat.percentage }}%</span>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500 text-sm">No language data available.</p>
  </div>
</template>
