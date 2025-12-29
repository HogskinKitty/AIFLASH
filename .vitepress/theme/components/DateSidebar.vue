<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string
  dates: Array<{
    fullDate: string
    displayDate: string
    weekDay: string
    isToday: boolean
  }>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { isDark } = useData()
const isSidebarExpanded = ref(false)

const visibleDates = computed(() =>
  isSidebarExpanded.value ? props.dates : props.dates.slice(0, 7)
)

const selectDate = (date: string) => {
  emit('update:modelValue', date)
}

const getDateItemClass = (isSelected: boolean) => {
  const baseClass = [
    'flex-shrink-0 cursor-pointer px-4 py-3 rounded-xl border-2 transition-all duration-200',
    'flex flex-col md:flex-row md:items-center md:justify-between',
    'min-w-[100px] md:min-w-0 w-full'
  ]

  if (isSelected) {
    return [
      ...baseClass,
      'shadow-[4px_4px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px]',
      isDark.value
        ? 'bg-dark-neo-pink border-white text-white'
        : 'bg-[#ff9aa2] border-black text-black'
    ]
  }

  return [
    ...baseClass,
    isDark.value
      ? 'bg-dark-neo-card border-white/20 text-gray-400 hover:bg-dark-neo-card/80 hover:text-white'
      : 'bg-white border-black text-gray-500 hover:bg-gray-50 hover:text-black'
  ]
}
</script>

<template>
  <aside class="w-full md:w-56 flex-shrink-0 z-20">
    <div class="sticky top-8">
      <!-- Title -->
      <div class="mb-4 hidden md:block">
        <h2
          class="text-lg font-black inline-block px-3 py-1 transform -skew-x-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-colors duration-300"
          :class="[isDark ? 'bg-white text-black' : 'bg-black text-white']"
        >
          历史早报
        </h2>
      </div>

      <!-- Date List -->
      <div class="flex md:flex-col overflow-x-auto md:overflow-visible gap-3 pb-4 md:pb-0 scrollbar-hide items-start">
        <div
          v-for="dateItem in visibleDates"
          :key="dateItem.fullDate"
          @click="selectDate(dateItem.fullDate)"
          :class="getDateItemClass(modelValue === dateItem.fullDate)"
        >
          <span
            class="font-bold text-sm md:text-base"
            :class="[
              modelValue === dateItem.fullDate
                ? ''
                : (isDark ? 'text-gray-400' : 'text-gray-500')
            ]"
          >
            {{ dateItem.displayDate }}
          </span>
          <span
            class="text-xs md:text-sm"
            :class="[
              modelValue === dateItem.fullDate
                ? ''
                : (isDark ? 'text-gray-500' : 'text-gray-400')
            ]"
          >
            {{ dateItem.weekDay }}
          </span>
        </div>

        <!-- Expand/Collapse Button -->
        <button
          @click="isSidebarExpanded = !isSidebarExpanded"
          class="hidden md:flex items-center justify-center w-full px-4 py-2 mt-2 text-sm font-bold border-2 border-transparent rounded-xl transition-colors"
          :class="[
            isDark
              ? 'text-gray-400 hover:bg-dark-neo-card/80'
              : 'text-gray-500 hover:bg-gray-100'
          ]"
        >
          <ChevronUp v-if="isSidebarExpanded" :size="16" class="mr-1" />
          <ChevronDown v-else :size="16" class="mr-1" />
          {{ isSidebarExpanded ? '收起' : '展开更多' }}
        </button>
      </div>
    </div>
  </aside>
</template>
