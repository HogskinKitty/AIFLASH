<script setup lang="ts">
import NeoCard from './NeoCard.vue'
import HighlightText from './HighlightText.vue'
import BrandLogo from './BrandLogo.vue'
import type { NewsItem } from '../utils/newsUtils'
import { getBrandColor } from '../utils/newsUtils'

const props = defineProps<{
  item: NewsItem
}>()

const emit = defineEmits<{
  click: []
}>()

const brandColor = getBrandColor(props.item.manufacturer)
</script>

<template>
  <NeoCard 
    :theme="item.theme" 
    :custom-color="brandColor"
    @click="emit('click')"
    class="flex items-center justify-between min-h-[80px] h-full overflow-hidden"
  >
    <div class="flex items-center gap-4 flex-1 min-w-0 pr-2">
      <!-- Vertical Accent Bar -->
      <div 
        class="w-1.5 h-10 rounded-full flex-shrink-0" 
        :style="{ backgroundColor: brandColor }"
      />
      
      <!-- Title Content -->
      <div class="text-base font-bold text-gray-800 leading-snug break-words">
        <HighlightText :text="item.title" :highlights="item.titleHighlight" />
      </div>
    </div>

    <!-- Logo Area -->
    <div 
      class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border-2 border-black/5 p-1 bg-gray-50"
    >
      <BrandLogo :manufacturer="item.manufacturer" />
    </div>
  </NeoCard>
</template>
