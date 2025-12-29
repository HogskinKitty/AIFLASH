<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { X } from 'lucide-vue-next'
import NeoCard from './NeoCard.vue'
import HighlightText from './HighlightText.vue'
import Icon from './Icon.vue'
import BrandLogo from './BrandLogo.vue'
import type { NewsItem } from '../utils/newsUtils'
import { getBrandColor } from '../utils/newsUtils'

const props = defineProps<{
  item: NewsItem
  isDark?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const themeColor = getBrandColor(props.item.manufacturer)

const modalBgClass = computed(() => props.isDark ? 'bg-dark-neo-bg border-white' : 'bg-[#fcfbf7] border-black')
const headerBgClass = computed(() => props.isDark ? 'bg-dark-neo-card border-white' : 'bg-white border-black')
const bodyBgClass = computed(() => props.isDark ? 'bg-dark-neo-bg' : 'bg-[#fcfbf7]')
const modalShadow = computed(() => ({
  boxShadow: `8px 8px 0px 0px ${props.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,1)'}`
}))

// Lock body scroll when modal is open
onMounted(() => {
  document.documentElement.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.documentElement.style.overflow = ''
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
    <div 
      class="relative w-full max-w-5xl max-h-[90vh] border-4 rounded-2xl flex flex-col overflow-hidden modal-enter transition-colors duration-300"
      :class="[modalBgClass]"
      :style="modalShadow"
    >
      <!-- Header -->
      <div 
        class="flex items-start justify-between p-6 border-b-4 z-10 shrink-0 transition-colors duration-300"
        :class="headerBgClass"
      >
        <div class="pr-8 flex-1">
          <div class="flex items-center gap-3 mb-2">
            <!-- Brand Logo in Header -->
            <div class="w-8 h-8">
              <BrandLogo :manufacturer="item.manufacturer" :isDark="isDark" />
            </div>
            <span 
              class="text-sm font-bold uppercase tracking-wider transition-colors duration-300"
              :class="[isDark ? 'text-gray-400' : 'text-gray-500']"
            >
              {{ item.manufacturer }}
            </span>
          </div>
          <h2 
            class="text-2xl md:text-3xl font-black leading-tight transition-colors duration-300"
            :class="[isDark ? 'text-gray-100' : 'text-gray-900']"
          >
            <HighlightText 
              :text="item.title" 
              :highlights="item.titleHighlight" 
              :isDark="isDark"
              highlight-class="bg-transparent"
            />
          </h2>
          <div class="mt-3 flex items-center gap-3">
            <span 
              class="font-mono font-bold text-sm px-2 py-1 rounded border transition-colors duration-300"
              :class="[
                isDark 
                  ? 'text-gray-300 bg-gray-800 border-gray-700' 
                  : 'text-gray-500 bg-gray-100 border-gray-200'
              ]"
            >
              {{ item.date }}
            </span>
          </div>
        </div>
        <button 
          @click="emit('close')"
          class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors border-2 border-transparent hover:border-black dark:hover:border-white active:translate-y-1"
          :class="[isDark ? 'text-gray-300' : 'text-gray-900']"
        >
          <X :size="28" :stroke-width="3" />
        </button>
      </div>

      <!-- Scrollable Body -->
      <div 
        class="overflow-y-auto p-6 transition-colors duration-300"
        :class="bodyBgClass"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <NeoCard 
            v-for="(detail, index) in item.details" 
            :key="index"
            :theme="item.theme" 
            :custom-color="themeColor"
            :isDark="isDark"
            :hover-effect="false"
            class="flex flex-col h-full min-h-[160px]"
          >
            <div 
              class="flex items-center justify-between mb-4 border-b pb-2 transition-colors duration-300"
              :class="[isDark ? 'border-gray-700' : 'border-gray-100']"
            >
              <h3 
                class="text-lg font-bold transition-colors duration-300"
                :class="[isDark ? 'text-gray-100' : 'text-gray-900']"
              >
                {{ detail.title }}
              </h3>
              <div :style="{ color: themeColor }" class="opacity-100">
                <Icon :name="detail.icon" :size="24" />
              </div>
            </div>
            <div 
              class="font-medium text-base leading-relaxed flex-grow transition-colors duration-300"
              :class="[isDark ? 'text-gray-300' : 'text-gray-700']"
            >
              <HighlightText 
                :text="detail.content" 
                :highlights="detail.highlights"
                :isDark="isDark"
                highlight-class="mx-1 px-1.5 py-0.5 rounded font-semibold text-sm inline-block border transition-colors duration-300"
              />
            </div>
          </NeoCard>
        </div>

        <!-- Footer in Modal -->
        <div class="mt-8 text-center">
          <button 
            @click="emit('close')"
            class="px-8 py-3 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors shadow-[4px_4px_0px_0px_#ccc] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
            :class="[isDark ? 'bg-white text-black' : 'bg-black text-white']"
          >
            关闭详情
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
