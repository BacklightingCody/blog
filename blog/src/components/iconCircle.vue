<template>
  <div
    class="relative w-[50px] h-[50px] ml-[10px] flex items-center justify-center rounded-1/2 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110"
    @click="navigateToUrl">
    <div class="absolute left-0 top-0 text-default-text">
      <el-tooltip placement="bottom" :content="toolTitle" :effect="tooltipColor">
        <slot />
      </el-tooltip>
    </div>

  </div>
</template>
<script setup lang="ts">
import { useGlobalStore } from '@/stores';
const props = defineProps({
  toolTitle: { type: String, required: true },
  url: { type: String, required: true },
})
const globalStore = useGlobalStore()

const tooltipColor = computed(() => {
  return globalStore.theme === 'dark' ? 'light' : 'dark'
})
const navigateToUrl = () => {
  if (props.url) {
    window.open(props.url, '_blank')
  }
}
</script>

<style scoped></style>
