<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import NeoCard from './NeoCard.vue'
import HighlightText from './HighlightText.vue'
import Icon from './Icon.vue'
import BrandLogo from './BrandLogo.vue'
import type { NewsItem } from '../data/news'
import { getBrandColor } from '../data/news'

const props = defineProps<{
  item: NewsItem
}>()

const emit = defineEmits<{
  close: []
}>()

const themeColor = getBrandColor(props.item.manufacturer)

// Lock body scroll when modal is open
onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = 'unset'
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      @click="emit('close')"
    />
    
    <!-- Modal Content -->
    <div class="relative w-full max-w-5xl max-h-[90vh] bg-[#fcfbf7] border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden modal-enter">
      
      <!-- Header -->
      <div class="flex items-start justify-between p-6 border-b-4 border-black bg-white z-10 shrink-0">
        <div class="pr-8 flex-1">
          <div class="flex items-center gap-3 mb-2">
            <!-- Brand Logo in Header -->
            <div class="w-8 h-8">
              <BrandLogo :manufacturer="item.manufacturer" />
            </div>
            <span class="text-sm font-bold text-gray-500 uppercase tracking-wider">{{ item.manufacturer }}</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-black leading-tight text-gray-900">
            <HighlightText 
              :text="item.title" 
              :highlights="item.titleHighlight" 
              highlight-class="bg-transparent text-gray-900"
            />
          </h2>
          <div class="mt-3 flex items-center gap-3">
            <span class="text-gray-500 font-mono font-bold text-sm bg-gray-100 px-2 py-1 rounded border border-gray-200">{{ item.date }}</span>
          </div>
        </div>
        <button 
          @click="emit('close')"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors border-2 border-transparent hover:border-black active:translate-y-1"
        >
          <X :size="28" :stroke-width="3" />
        </button>
      </div>

      <!-- Scrollable Body -->
      <div class="overflow-y-auto p-6 bg-[#fcfbf7]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <NeoCard 
            v-for="(detail, index) in item.details" 
            :key="index"
            :theme="item.theme" 
            :custom-color="themeColor"
            :hover-effect="false"
            class="flex flex-col h-full min-h-[160px]"
          >
            <div class="flex items-center justify-between mb-4 border-b pb-2 border-gray-100">
              <h3 class="text-lg font-bold text-gray-900">{{ detail.title }}</h3>
              <div :style="{ color: themeColor }" class="opacity-100">
                <Icon :name="detail.icon" :size="24" />
              </div>
            </div>
            <div class="text-gray-700 font-medium text-base leading-relaxed flex-grow">
              <HighlightText 
                :text="detail.content" 
                :highlights="detail.highlights"
                highlight-class="mx-1 px-1.5 py-0.5 bg-gray-200/80 rounded text-gray-900 font-semibold text-sm inline-block border border-gray-300/50"
              />
            </div>
          </NeoCard>
        </div>
        
        <!-- Footer in Modal -->
        <div class="mt-8 text-center">
          <button 
            @click="emit('close')"
            class="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_#ccc]"
          >
            关闭详情
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
