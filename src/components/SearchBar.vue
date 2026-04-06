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
  <form @submit.prevent="handleSubmit" class="w-full max-w-lg flex gap-3">
    <input
      v-model="model"
      type="text"
      placeholder="Enter a GitHub username..."
      class="flex-1 px-4 py-3 rounded-xl bg-surface-2 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
      aria-label="GitHub username"
    />
    <button
      type="submit"
      class="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium transition cursor-pointer disabled:opacity-50"
      :disabled="!model.trim()"
    >
      Search
    </button>
  </form>
</template>
