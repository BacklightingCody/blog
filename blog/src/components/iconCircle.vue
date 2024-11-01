<template>
  <div
    class="w-[50px] h-[50x] ml-[10px] flex items-center justify-center rounded-1/2 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110"
    @click="navigateToUrl">
    <slot :style="{ fill: bgColor }" />
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  url: { type: String, required: true },
  bgColor: { type: String, default: '#ccc' }
})

const navigateToUrl = () => {
  if (props.url) {
    window.open(props.url, '_blank')
  }
}
</script>

<style scoped></style>
