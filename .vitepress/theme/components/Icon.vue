<script setup lang="ts">
import { 
  Code, 
  Brain, 
  Bot, 
  Lightbulb, 
  Palette, 
  Rocket, 
  Zap, 
  Globe 
} from 'lucide-vue-next'

export type IconName = 'code' | 'brain' | 'bot' | 'lightbulb' | 'palette' | 'rocket' | 'zap' | 'globe'

defineProps<{
  name: IconName
  size?: number
}>()

const iconMap = {
  code: Code,
  brain: Brain,
  bot: Bot,
  lightbulb: Lightbulb,
  palette: Palette,
  rocket: Rocket,
  zap: Zap,
  globe: Globe
}
</script>

<template>
  <component :is="iconMap[name]" :size="size || 24" />
</template>
