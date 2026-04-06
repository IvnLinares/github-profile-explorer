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
      class="flex-1 px-4 py-2.5 rounded-xl glass-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition text-sm"
      aria-label="GitHub username"
    />
    <button
      type="submit"
      class="px-5 py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-sm transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_2px_8px_rgba(0,113,227,0.25)]"
      :disabled="!model.trim()"
    >
      Search
    </button>
  </form>
</template>

