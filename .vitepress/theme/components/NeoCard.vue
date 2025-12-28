<script setup lang="ts">
import { computed, ref } from 'vue'

export type ColorTheme = 'blue' | 'pink' | 'green' | 'yellow' | 'purple'

const props = withDefaults(defineProps<{
  theme?: ColorTheme
  customColor?: string
  hoverEffect?: boolean
}>(), {
  theme: 'blue',
  hoverEffect: true
})

const emit = defineEmits<{
  click: []
}>()

const isHovered = ref(false)

const themeColors: Record<ColorTheme, string> = {
  blue: '#aed9e0',
  pink: '#f7aef8',
  green: '#b5e48c',
  yellow: '#fde4cf',
  purple: '#d0d1ff'
}

const shadowColor = computed(() => props.customColor || themeColors[props.theme] || '#cbd5e1')

const cardStyle = computed(() => ({
  boxShadow: `6px 6px 0px 0px ${shadowColor.value}`,
  borderColor: props.hoverEffect && isHovered.value ? shadowColor.value : '#000'
}))
</script>

<template>
  <div 
    @click="emit('click')"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :style="cardStyle"
    :class="[
      'bg-white border-2 rounded-2xl p-4 transition-all duration-200',
      hoverEffect ? 'cursor-pointer hover:translate-y-[-2px] hover:translate-x-[-2px] active:translate-y-[2px] active:translate-x-[2px]' : ''
    ]"
  >
    <slot />
  </div>
</template>
