<template>
  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
    <div 
      class="bg-default-currgb h-2.5 rounded-full transition-all duration-300 ease-in-out" 
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
  <div class="text-sm text-gray-600">
    {{ progressText }}
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  progress: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  },
  total: {
    type: Number,
    default: 100
  }
});

const progressText = computed(() => {
  return `${Math.round(props.progress)}% 完成`;
});
</script>

