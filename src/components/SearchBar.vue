<script setup lang="ts">
defineProps<{
  username: string
}>()

const emit = defineEmits<{
  search: [username: string]
}>()

const model = defineModel<string>({ required: true })

function handleSubmit() {
  const trimmed = model.value.trim()
  if (!trimmed) return
  emit('search', trimmed)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-full max-w-md flex gap-2">
    <input
      v-model="model"
      type="text"
      placeholder="Search a username..."
      class="flex-1 px-4 py-3 rounded-xl glass-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/50 transition-all text-sm border border-white/30 dark:border-white/10"
      aria-label="GitHub username"
    />
    <button
      type="submit"
      class="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0071e3] to-[#0056b3] hover:from-[#0077ed] hover:to-[#005fc4] text-white font-semibold text-sm transition-all cursor-pointer disabled:opacity-50 shadow-lg hover:shadow-[0_4px_16px_rgba(0,113,227,0.4)] disabled:shadow-none"
      :disabled="!model.trim()"
    >
      Search
    </button>
  </form>
</template>

