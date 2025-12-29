<script setup lang="ts">
import { useData } from 'vitepress'
import { Moon, Sun } from 'lucide-vue-next'

const { isDark } = useData()

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-lg border-2 transition-all duration-200 hover:translate-y-[-2px] hover:translate-x-[-2px] active:translate-y-[2px] active:translate-x-[2px]"
    :class="[
      isDark
        ? 'bg-dark-neo-card border-white/20 text-yellow-400 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
        : 'bg-white border-black text-orange-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'
    ]"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
    :title="isDark ? '浅色模式' : '深色模式'"
  >
    <Sun v-if="isDark" :size="20" />
    <Moon v-else :size="20" />
  </button>
</template>
