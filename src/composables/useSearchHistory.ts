import { ref } from 'vue'

const STORAGE_KEY = 'ghpe:recent'
const MAX_ITEMS = 8

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

const history = ref<string[]>(load())

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
}

export function useSearchHistory() {
  function addSearch(username: string) {
    const trimmed = username.trim().toLowerCase()
    if (!trimmed) return
    history.value = [trimmed, ...history.value.filter((h) => h !== trimmed)].slice(0, MAX_ITEMS)
    save()
  }

  function removeSearch(username: string) {
    history.value = history.value.filter((h) => h !== username)
    save()
  }

  function clearHistory() {
    history.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  return { history, addSearch, removeSearch, clearHistory }
}
