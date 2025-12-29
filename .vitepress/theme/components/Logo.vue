<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isDark?: boolean
  size?: 'sm' | 'md' | 'lg'
}>()

const isDark = computed(() => props.isDark ?? false)

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 40
}

const size = computed(() => sizeMap[props.size || 'md'])

const colors = computed(() => {
  const mainColor = isDark.value ? '#c4556a' : '#ff9aa2'
  const shadowColor = isDark.value ? 'rgba(196, 85, 106, 0.3)' : 'rgba(255, 154, 162, 0.3)'
  const innerColor = isDark.value ? '#f3f4f6' : 'white'
  return { mainColor, shadowColor, innerColor }
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="logo"
  >
    <!-- Lightning shape outline -->
    <path
      d="M20 2L28 18H22L32 38H12L18 24H10L20 2Z"
      :stroke="colors.mainColor"
      stroke-width="3"
      :fill="colors.innerColor"
      stroke-linejoin="round"
      stroke-linecap="round"
    />

    <!-- Shadow offset -->
    <path
      d="M22 4L30 20H24L34 40H14L20 26H12L22 4Z"
      :stroke="colors.mainColor"
      stroke-width="0"
      :fill="colors.shadowColor"
      transform="translate(2, 2)"
    />

    <!-- Letter A inside -->
    <text
      x="20"
      y="28"
      :fill="colors.mainColor"
      font-size="14"
      font-weight="900"
      text-anchor="middle"
      font-family="Arial, sans-serif"
      style="text-shadow: -1px -1px 0 white, 1px 1px 0 white, -1px 1px 0 white, 1px -1px 0 white;"
    >
      A
    </text>
  </svg>
</template>

<style scoped>
.logo {
  display: inline-block;
  vertical-align: middle;
}
</style>
