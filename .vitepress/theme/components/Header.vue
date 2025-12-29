<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { Zap } from 'lucide-vue-next'

const props = defineProps<{
  titleText: string
}>()

const { isDark } = useData()

const titleStyle = computed(() => {
  const shadowColor = isDark.value ? '#c4556a' : '#ff9aa2'
  const strokeColor = isDark.value ? '#c4556a' : '#ff9aa2'
  return {
    'text-shadow': `4px 4px 0px ${shadowColor}, -2px -2px 0 ${isDark.value ? '#1e1e1e' : '#fff'}`,
    '-webkit-text-stroke': `2px ${strokeColor}`,
    'color': isDark.value ? '#f3f4f6' : 'white'
  }
})

const shadowTitleStyle = computed(() => ({
  color: isDark.value ? '#c4556a' : '#ff9aa2'
}))

const iconStyle = computed(() => ({
  color: isDark.value ? '#c4556a' : '#ff9aa2',
  filter: `drop-shadow(2px 2px 0px ${isDark.value ? 'rgba(196, 85, 106, 0.3)' : 'rgba(255, 154, 162, 0.3)'})`
}))
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-6 mb-10">
    <!-- AIFLASH Logo and Lightning -->
    <div class="flex items-center gap-3">
      <div class="relative inline-block">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-widest relative z-10 transition-all duration-300"
            :style="titleStyle">
          AIFLASH
        </h1>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black absolute left-0 top-0 translate-y-1 -z-10 tracking-widest opacity-40 blur-sm hidden sm:block w-full transition-all duration-300"
            :style="shadowTitleStyle">
          AIFLASH
        </h1>
      </div>
      <Zap :size="28" :style="iconStyle" class="animate-pulse" />
    </div>

    <!-- Daily Quick View -->
    <div class="relative inline-block z-10">
      <h1 class="text-2xl md:text-4xl font-black tracking-widest relative z-10 block"
          :style="titleStyle">
        {{ titleText }}
      </h1>
      <h1 class="text-2xl md:text-4xl font-black absolute left-0 top-0 translate-y-1 -z-10 tracking-widest opacity-50 blur-sm hidden md:block w-full"
          :style="shadowTitleStyle">
        {{ titleText }}
      </h1>
    </div>
  </div>
</template>
