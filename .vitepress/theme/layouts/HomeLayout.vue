<script setup lang="ts">
import { ref, computed } from 'vue'
import { data as newsData } from '../data/news.data.js'
import { generateDateList, getDayStr } from '../utils/newsUtils'
import type { NewsItem } from '../utils/newsUtils'
import DateSidebar from '../components/DateSidebar.vue'
import NewsCard from '../components/NewsCard.vue'
import DetailModal from '../components/DetailModal.vue'

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

const openDetail = (item: NewsItem) => {
  selectedItem.value = item
}

const closeDetail = () => {
  selectedItem.value = null
}
</script>

<template>
  <div class="min-h-screen bg-neo-bg">
    <div class="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      
      <!-- Modal -->
      <DetailModal 
        v-if="selectedItem" 
        :item="selectedItem" 
        @close="closeDetail" 
      />

      <!-- Sidebar - Date Selection -->
      <DateSidebar 
        v-model="selectedDate" 
        :dates="dateList" 
      />

      <!-- Main Content Area -->
      <main class="flex-1 min-h-[50vh]">
        <!-- Header Title - Centered -->
        <div class="text-center mb-10">
          <div class="relative inline-block z-10">
            <h1 
              class="text-4xl md:text-5xl font-black text-white relative z-10 block tracking-widest"
              style="
                text-shadow: 4px 4px 0px #ff9aa2, -2px -2px 0 #fff;
                -webkit-text-stroke: 2px #ff9aa2;
                color: white;
                font-family: 'Noto Sans SC', sans-serif;
              "
            >
              {{ titleText }}
            </h1>
            <!-- Decorative shadow -->
            <h1 
              class="text-4xl md:text-5xl font-black text-[#ff9aa2] absolute left-0 top-0 translate-y-1 -z-10 tracking-widest opacity-50 blur-sm hidden md:block w-full"
            >
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
            @click="openDetail(item)"
          />
        </div>
        
        <!-- Empty State -->
        <div 
          v-else 
          class="flex flex-col items-center justify-center py-20 bg-white border-2 border-dashed border-gray-300 rounded-2xl"
        >
          <div class="text-4xl mb-4">😴</div>
          <p class="text-gray-400 font-bold text-lg">今天暂时没有新闻</p>
          <p class="text-gray-300 text-sm">No news available for this date.</p>
        </div>
        
        <div class="mt-12 text-center md:text-left text-gray-400 text-sm">
          © 2025 AI Morning News. Designed with Neo-Pop style.
        </div>
      </main>
    </div>
  </div>
</template>
