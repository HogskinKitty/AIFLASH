<script setup lang="ts">
import { computed } from 'vue'
import { Zap } from 'lucide-vue-next'

const props = defineProps<{
  isDark?: boolean
}>()

const isDark = computed(() => props.isDark ?? false)

const titleStyle = computed(() => {
  const shadowColor = isDark.value ? '#c4556a' : '#ff9aa2'
  const strokeColor = isDark.value ? '#c4556a' : '#ff9aa2'
  return {
    'text-shadow': `4px 4px 0px ${shadowColor}, -2px -2px 0 ${isDark.value ? '#1e1e1e' : '#fff'}`,
    '-webkit-text-stroke': `2px ${strokeColor}`,
    'color': isDark.value ? '#f3f4f6' : 'white'
  }
})

const iconStyle = computed(() => {
  const color = isDark.value ? '#c4556a' : '#ff9aa2'
  return {
    color,
    filter: `drop-shadow(2px 2px 0px ${isDark.value ? 'rgba(196, 85, 106, 0.3)' : 'rgba(255, 154, 162, 0.3)'})`
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2 mb-4">
    <div class="relative inline-block">
      <!-- Main Title -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-widest relative z-10 transition-all duration-300"
          :style="titleStyle">
        AIFLASH
      </h1>

      <!-- Decorative shadow -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black absolute left-0 top-0 translate-y-1 -z-10 tracking-widest opacity-40 blur-sm hidden sm:block w-full transition-all duration-300"
          :style="{ color: isDark ? '#c4556a' : '#ff9aa2' }">
        AIFLASH
      </h1>
    </div>

    <!-- Lightning Icon -->
    <div class="flex items-center gap-2 mt-1">
      <Zap :size="24" :style="iconStyle" class="animate-pulse" />
    </div>
  </div>
</template>
