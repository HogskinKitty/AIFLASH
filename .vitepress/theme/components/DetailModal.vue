<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { X, ExternalLink } from 'lucide-vue-next'
import Icon from './Icon.vue'
import type { NewsItem } from '../utils/newsUtils'
import { getCategoryColor } from '../utils/newsUtils'

const props = defineProps<{
  item: NewsItem
  isDark?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const categoryColor = getCategoryColor(props.item.category)
const categoryIcon = computed(() => props.item.details[0]?.icon || 'globe')

const modalBgClass = computed(() => props.isDark ? 'bg-dark-neo-bg border-white' : 'bg-[#fcfbf7] border-black')
const headerBgClass = computed(() => props.isDark ? 'bg-dark-neo-card border-white' : 'bg-white border-black')
const bodyBgClass = computed(() => props.isDark ? 'bg-dark-neo-bg' : 'bg-[#fcfbf7]')
const modalShadow = computed(() => ({
  boxShadow: `8px 8px 0px 0px ${props.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,1)'}`
}))

const paragraphs = computed(() => props.item.details[0]?.paragraphs ?? [])
const images = computed(() => props.item.images ?? [])
const links = computed(() => props.item.links ?? [])

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
      class="relative w-full max-w-3xl max-h-[90vh] border-4 rounded-2xl flex flex-col overflow-hidden modal-enter transition-colors duration-300"
      :class="[modalBgClass]"
      :style="modalShadow"
    >
      <!-- Header -->
      <div
        class="flex items-start justify-between p-6 border-b-4 z-10 shrink-0 transition-colors duration-300"
        :class="headerBgClass"
      >
        <div class="pr-8 flex-1">
          <div class="flex items-center gap-2 mb-2">
            <span
              class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border-2"
              :style="{ color: categoryColor, borderColor: categoryColor }"
            >
              <Icon :name="categoryIcon" :size="14" />
              {{ item.category }}
            </span>
            <span
              class="font-mono font-bold text-xs px-2 py-1 rounded border transition-colors duration-300"
              :class="[isDark ? 'text-gray-300 bg-gray-800 border-gray-700' : 'text-gray-500 bg-gray-100 border-gray-200']"
            >
              {{ item.date }}
            </span>
          </div>
          <h2
            class="text-2xl md:text-3xl font-black leading-tight transition-colors duration-300"
            :class="[isDark ? 'text-gray-100' : 'text-gray-900']"
          >
            {{ item.title }}
          </h2>
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
      <div class="overflow-y-auto p-6 transition-colors duration-300" :class="bodyBgClass">
        <!-- Summary -->
        <blockquote
          v-if="item.summary"
          class="border-l-4 pl-4 py-2 mb-5 text-base font-medium leading-relaxed rounded-r-lg transition-colors duration-300"
          :style="{ borderColor: categoryColor }"
          :class="[isDark ? 'bg-white/5 text-gray-200' : 'bg-black/[0.03] text-gray-700']"
        >
          {{ item.summary }}
        </blockquote>

        <!-- Body paragraphs -->
        <div v-if="paragraphs.length > 0" class="space-y-3 mb-5">
          <p
            v-for="(paragraph, index) in paragraphs"
            :key="index"
            class="text-base leading-relaxed transition-colors duration-300"
            :class="[isDark ? 'text-gray-300' : 'text-gray-700']"
          >
            {{ paragraph }}
          </p>
        </div>

        <!-- Images -->
        <div v-if="images.length > 0" class="space-y-3 mb-5">
          <img
            v-for="(image, index) in images"
            :key="index"
            :src="image"
            alt=""
            loading="lazy"
            referrerpolicy="no-referrer"
            class="w-full rounded-xl border-2 transition-colors duration-300"
            :class="[isDark ? 'border-white/10' : 'border-black/10']"
          />
        </div>

        <!-- Related links -->
        <div v-if="links.length > 0" class="border-t pt-4 transition-colors duration-300" :class="[isDark ? 'border-gray-700' : 'border-gray-200']">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-2" :class="[isDark ? 'text-gray-400' : 'text-gray-500']">
            相关链接
          </h3>
          <ul class="space-y-1.5">
            <li v-for="(link, index) in links" :key="index">
              <a
                :href="link"
                target="_blank"
                rel="noopener noreferrer nofollow"
                class="inline-flex items-start gap-1.5 text-sm font-medium break-all hover:underline"
                :style="{ color: categoryColor }"
              >
                <ExternalLink :size="14" class="mt-0.5 shrink-0" />
                {{ link }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Footer -->
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
