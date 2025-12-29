<script setup lang="ts">
import NeoCard from './NeoCard.vue'
import HighlightText from './HighlightText.vue'
import BrandLogo from './BrandLogo.vue'
import type { NewsItem } from '../utils/newsUtils'
import { getBrandColor } from '../utils/newsUtils'

const props = defineProps<{
  item: NewsItem
  isDark?: boolean
}>()

const emit = defineEmits<{
  click: []
  'filter-manufacturer': [manufacturer: string]
}>()

const brandColor = getBrandColor(props.item.manufacturer)
</script>

<template>
  <NeoCard
    :theme="item.theme"
    :custom-color="brandColor"
    :isDark="isDark"
    class="flex items-center justify-between min-h-[80px] h-full overflow-hidden"
  >
    <div 
      class="flex items-center gap-4 flex-1 min-w-0 pr-2 cursor-pointer"
      @click="emit('click')"
    >
      <!-- Vertical Accent Bar -->
      <div
        class="w-1.5 h-10 rounded-full flex-shrink-0"
        :style="{ backgroundColor: brandColor }"
      />

      <!-- Title Content -->
      <div
        class="text-base font-bold leading-snug break-words transition-colors duration-300"
        :class="[isDark ? 'text-gray-100' : 'text-gray-800']"
      >
        <HighlightText
          :text="item.title"
          :highlights="item.titleHighlight"
          :isDark="isDark"
        />
      </div>
    </div>

    <!-- Logo Area -->
    <div
      class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border-2 p-1 transition-colors duration-300 cursor-pointer hover:scale-110 active:scale-95"
      :class="[isDark ? 'border-white/10 bg-dark-neo-card' : 'border-black/5 bg-gray-50']"
      @click.stop="emit('filter-manufacturer', item.manufacturer)"
      title="Filter by this brand"
    >
      <BrandLogo :manufacturer="item.manufacturer" :isDark="isDark" />
    </div>
  </NeoCard>
</template>
