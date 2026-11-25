<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useData } from 'vitepress'
import { Coffee } from 'lucide-vue-next'
import { data as newsData } from '../data/news.data.js'
import { generateDateList, getDayStr } from '../utils/newsUtils'
import type { NewsItem } from '../utils/newsUtils'
import DateSidebar from '../components/DateSidebar.vue'
import NewsCard from '../components/NewsCard.vue'
import NeoCard from '../components/NeoCard.vue'
import DetailModal from '../components/DetailModal.vue'
import Header from '../components/Header.vue'

const { isDark } = useData()

const dateList = generateDateList(newsData.map(item => item.date))

// Default to the newest date that actually has news
const selectedDate = ref(dateList[0]?.fullDate ?? getDayStr(0))
const selectedItem = ref<NewsItem | null>(null)
const selectedCategory = ref<string | null>(null)

// 切换日期后，当前分类可能在新的一天不存在，需清空避免误显示空状态
watch(selectedDate, () => {
  selectedCategory.value = null
})

const dayItems = computed(() =>
  newsData.filter(item => item.date === selectedDate.value)
)

// 分类来自当期数据，切换日期时自动收敛
const categories = computed(() =>
  Array.from(new Set(dayItems.value.map(item => item.category)))
)

const filteredData = computed(() => {
  if (!selectedCategory.value) return dayItems.value
  return dayItems.value.filter(item => item.category === selectedCategory.value)
})

const selectedDateObj = computed(() =>
  dateList.find(d => d.fullDate === selectedDate.value)
)

const titleText = computed(() => {
  if (selectedCategory.value) {
    return selectedCategory.value
  }
  return selectedDateObj.value?.isToday
    ? "今日速览"
    : `${selectedDateObj.value?.displayDate} 速览`
})

const updateDate = computed(() => {
  const date = new Date()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `更新于 ${hours}:${minutes}`
})

const openDetail = (item: NewsItem) => {
  selectedItem.value = item
}

const toggleFilter = (category: string) => {
  selectedCategory.value = selectedCategory.value === category ? null : category
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
          <Header :titleText="titleText" :updateDate="updateDate" />

          <!-- Category Filter -->
          <div v-if="categories.length > 1" class="flex flex-wrap gap-2 mb-6">
            <button
              v-for="category in categories"
              :key="category"
              @click="toggleFilter(category)"
              class="px-3 py-1.5 text-sm font-bold rounded-full border-2 transition-all duration-200"
              :class="[
                selectedCategory === category
                  ? (isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                  : (isDark ? 'border-white/20 text-gray-400 hover:text-white' : 'border-black/20 text-gray-500 hover:text-black')
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- Content List -->
          <div v-if="filteredData.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NewsCard
              v-for="item in filteredData"
              :key="item.id"
              :item="item"
              :isDark="isDark"
              @click="openDetail(item)"
              @filter-category="toggleFilter"
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
              {{ selectedCategory ? `暂无「${selectedCategory}」相关新闻` : '今天暂时没有新闻' }}
            </h3>
            <p v-if="selectedCategory" class="text-base font-medium max-w-md mx-auto" :class="[isDark ? 'text-gray-400' : 'text-gray-500']">
              Try checking other dates!
            </p>
          </NeoCard>
        </main>
      </div>
    </div>
  </div>
</template>
