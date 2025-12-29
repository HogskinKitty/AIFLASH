<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useData } from 'vitepress'
import { Zap, Coffee } from 'lucide-vue-next'
import { data as newsData } from '../data/news.data.js'
import { generateDateList, getDayStr } from '../utils/newsUtils'
import type { NewsItem } from '../utils/newsUtils'
import DateSidebar from '../components/DateSidebar.vue'
import NewsCard from '../components/NewsCard.vue'
import DetailModal from '../components/DetailModal.vue'
import Header from '../components/Header.vue'

const { isDark, theme } = useData()

const selectedDate = ref(getDayStr(0))
const selectedItem = ref<NewsItem | null>(null)
const selectedManufacturer = ref<string | null>(null)

const dateList = generateDateList(30)

const filteredData = computed(() => {
  let items = newsData.filter(item => item.date === selectedDate.value)
  if (selectedManufacturer.value) {
    items = items.filter(item => item.manufacturer === selectedManufacturer.value)
  }
  return items
})

const selectedDateObj = computed(() =>
  dateList.find(d => d.fullDate === selectedDate.value)
)

const titleText = computed(() => {
  if (selectedManufacturer.value) {
    return `${selectedManufacturer.value} 速览`
  }
  return selectedDateObj.value?.isToday
    ? "今日速览"
    : `${selectedDateObj.value?.displayDate} 速览`
})

const openDetail = (item: NewsItem) => {
  selectedItem.value = item
}

const toggleFilter = (manufacturer: string) => {
  if (selectedManufacturer.value === manufacturer) {
    selectedManufacturer.value = null
  } else {
    selectedManufacturer.value = manufacturer
  }
}

const closeDetail = () => {
  selectedItem.value = null
}

// Initialize dark mode on client side
function updateDarkMode() {
  if (typeof document !== 'undefined') {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

onMounted(updateDarkMode)
watch(isDark, updateDarkMode)
</script>

<template>
  <div class="min-h-screen" :class="{ 'dark': isDark }">
    <div class="min-h-screen transition-colors duration-300"
         :style="{ backgroundColor: isDark ? '#121212' : '#fcfbf7' }">
      <div class="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">

        <!-- Modal -->
        <DetailModal
          v-if="selectedItem"
          :item="selectedItem"
          :isDark="isDark"
          @close="closeDetail"
        />

        <!-- Sidebar - Date Selection -->
        <DateSidebar
          v-model="selectedDate"
          :dates="dateList"
        />

        <!-- Main Content Area -->
        <main class="flex-1 min-h-[50vh]">
          <!-- Header -->
          <Header :titleText="titleText" />

          <!-- Content List -->
          <div v-if="filteredData.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NewsCard
              v-for="item in filteredData"
              :key="item.id"
              :item="item"
              :isDark="isDark"
              @click="openDetail(item)"
              @filter-manufacturer="toggleFilter"
            />
          </div>

          <!-- Empty State -->
          <NeoCard
            v-else
            :isDark="isDark"
            :hoverEffect="false"
            custom-color="#94a3b8"
            class="flex flex-col items-center justify-center py-20 text-center"
          >
            <div class="mb-6 text-gray-400 animate-pulse">
              <Coffee :size="64" :stroke-width="1.5" />
            </div>
            <h3 class="font-black text-2xl mb-2" :class="[isDark ? 'text-white' : 'text-black']">
              {{ selectedManufacturer ? `暂无 ${selectedManufacturer} 相关新闻` : '今天暂时没有新闻' }}
            </h3>
            <p v-if="selectedManufacturer" class="text-base font-medium max-w-md mx-auto" :class="[isDark ? 'text-gray-400' : 'text-gray-500']">
              Try checking other dates!
            </p>
          </NeoCard>
        </main>
      </div>
    </div>
  </div>
</template>
