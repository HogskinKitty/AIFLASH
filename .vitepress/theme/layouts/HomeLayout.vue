<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useData } from 'vitepress'
import { Zap } from 'lucide-vue-next'
import { data as newsData } from '../data/news.data.js'
import { generateDateList, getDayStr } from '../utils/newsUtils'
import type { NewsItem } from '../utils/newsUtils'
import DateSidebar from '../components/DateSidebar.vue'
import NewsCard from '../components/NewsCard.vue'
import DetailModal from '../components/DetailModal.vue'

const { isDark } = useData()

const selectedDate = ref(getDayStr(0))
const selectedItem = ref<NewsItem | null>(null)

const dateList = generateDateList(30)

const filteredData = computed(() =>
  newsData.filter(item => item.date === selectedDate.value)
)

const selectedDateObj = computed(() =>
  dateList.find(d => d.fullDate === selectedDate.value)
)

const titleText = computed(() =>
  selectedDateObj.value?.isToday
    ? "今日速览"
    : `${selectedDateObj.value?.displayDate} 速览`
)

const titleStyle = computed(() => {
  const shadowColor = isDark.value ? '#c4556a' : '#ff9aa2'
  const strokeColor = isDark.value ? '#c4556a' : '#ff9aa2'
  return {
    'text-shadow': `4px 4px 0px ${shadowColor}, -2px -2px 0 ${isDark.value ? '#1e1e1e' : '#fff'}`,
    '-webkit-text-stroke': `2px ${strokeColor}`,
    'color': isDark.value ? '#f3f4f6' : 'white'
  }
})

const shadowTitleStyle = computed(() => ({
  color: isDark.value ? '#c4556a' : '#ff9aa2'
}))

const iconStyle = computed(() => ({
  color: isDark.value ? '#c4556a' : '#ff9aa2',
  filter: `drop-shadow(2px 2px 0px ${isDark.value ? 'rgba(196, 85, 106, 0.3)' : 'rgba(255, 154, 162, 0.3)'})`
}))

const openDetail = (item: NewsItem) => {
  selectedItem.value = item
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
          <!-- Header - 水平排列 -->
          <div class="flex flex-wrap items-center justify-center gap-6 mb-10">
            <!-- AIFLASH Logo 和闪电 -->
            <div class="flex items-center gap-3">
              <div class="relative inline-block">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-widest relative z-10 transition-all duration-300"
                    :style="titleStyle">
                  AIFLASH
                </h1>
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-black absolute left-0 top-0 translate-y-1 -z-10 tracking-widest opacity-40 blur-sm hidden sm:block w-full transition-all duration-300"
                    :style="shadowTitleStyle">
                  AIFLASH
                </h1>
              </div>
              <Zap :size="28" :style="iconStyle" class="animate-pulse" />
            </div>

            <!-- 今日速览 -->
            <div class="relative inline-block z-10">
              <h1 class="text-2xl md:text-4xl font-black tracking-widest relative z-10 block"
                  :style="titleStyle">
                {{ titleText }}
              </h1>
              <h1 class="text-2xl md:text-4xl font-black absolute left-0 top-0 translate-y-1 -z-10 tracking-widest opacity-50 blur-sm hidden md:block w-full"
                  :style="shadowTitleStyle">
                {{ titleText }}
              </h1>
            </div>
          </div>

          <!-- Content List -->
          <div v-if="filteredData.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NewsCard
              v-for="item in filteredData"
              :key="item.id"
              :item="item"
              :isDark="isDark"
              @click="openDetail(item)"
            />
          </div>

          <!-- Empty State -->
          <div
            v-else
            class="flex flex-col items-center justify-center py-20 transition-colors duration-300 border-2 border-dashed rounded-2xl"
            :class="[
              isDark ? 'bg-dark-neo-card border-dark-neo-purple text-dark-neo-text-secondary' : 'bg-white border-gray-300 text-gray-400'
            ]"
          >
            <div class="text-4xl mb-4">😴</div>
            <p class="font-bold text-lg">今天暂时没有新闻</p>
            <p class="text-sm opacity-80">No news available for this date.</p>
          </div>

          <div class="mt-12 text-center md:text-left text-sm transition-colors duration-300"
               :class="[isDark ? 'text-gray-500' : 'text-gray-400']">
            © 2025 AIFLASH. Designed with Neo-Pop style.
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
