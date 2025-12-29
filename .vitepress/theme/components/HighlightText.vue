<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  highlights?: string[]
  highlightClass?: string
  isDark?: boolean
}>(), {
  highlights: () => [],
  highlightClass: '',
  isDark: false
})

const computedHighlightClass = computed(() => {
  if (props.highlightClass) {
    return props.highlightClass
  }
  return props.isDark
    ? 'mx-1 px-1.5 py-0.5 bg-gray-700 rounded text-gray-100 text-sm font-medium border border-gray-600'
    : 'mx-1 px-1.5 py-0.5 bg-gray-200 rounded text-gray-800 text-sm font-medium'
})

const parts = computed(() => {
  if (!props.highlights || props.highlights.length === 0) {
    return [{ text: props.text, isHighlight: false }]
  }

  const pattern = new RegExp(
    `(${props.highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi'
  )

  return props.text.split(pattern).map(part => ({
    text: part,
    isHighlight: props.highlights!.some(h => h.toLowerCase() === part.toLowerCase())
  }))
})
</script>

<template>
  <span>
    <template v-for="(part, index) in parts" :key="index">
      <span v-if="part.isHighlight" :class="computedHighlightClass">{{ part.text }}</span>
      <span v-else>{{ part.text }}</span>
    </template>
  </span>
</template>
