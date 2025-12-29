<script setup lang="ts">
import { computed, ref } from 'vue'

export type ColorTheme = 'blue' | 'pink' | 'green' | 'yellow' | 'purple'

const props = withDefaults(defineProps<{
  theme?: ColorTheme
  customColor?: string
  hoverEffect?: boolean
  isDark?: boolean
}>(), {
  theme: 'blue',
  hoverEffect: true,
  isDark: false
})

const emit = defineEmits<{
  click: []
}>()

const isHovered = ref(false)

const lightThemeColors: Record<ColorTheme, string> = {
  blue: '#aed9e0',
  pink: '#f7aef8',
  green: '#b5e48c',
  yellow: '#fde4cf',
  purple: '#d0d1ff'
}

const darkThemeColors: Record<ColorTheme, string> = {
  blue: '#3b82f6',
  pink: '#c4556a',
  green: '#22c55e',
  yellow: '#fbbf24',
  purple: '#8b5cf6'
}

const themeColors = computed(() => props.isDark ? darkThemeColors : lightThemeColors)
const shadowColor = computed(() => props.customColor || themeColors.value[props.theme] || props.isDark ? '#666666' : '#cbd5e1')

const cardStyle = computed(() => ({
  boxShadow: `6px 6px 0px 0px ${shadowColor.value}`,
  borderColor: props.hoverEffect && isHovered.value ? shadowColor.value : (props.isDark ? '#ffffff' : '#000000')
}))

const cardClasses = computed(() => [
  'border-2 rounded-2xl p-4 transition-all duration-200',
  props.isDark ? 'bg-dark-neo-card text-gray-100' : 'bg-white',
  props.hoverEffect ? 'cursor-pointer hover:translate-y-[-2px] hover:translate-x-[-2px] active:translate-y-[2px] active:translate-x-[2px]' : ''
])
</script>

<template>
  <div
    @click="emit('click')"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :style="cardStyle"
    :class="cardClasses"
  >
    <slot />
  </div>
</template>
