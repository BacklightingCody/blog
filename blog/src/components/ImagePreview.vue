<template>
  <div v-if="images.length > 0" class="flex gap-2 mt-2">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="relative w-20 h-20"
    >
      <img :src="image" class="w-full h-full object-cover rounded-lg" alt="Selected Image" />
      <button
        @click="removeImage(index)"
        class="absolute top-0 right-0 bg-gray-800 rounded-full p-1 text-white"
      >
        <XIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'

// Props: 接收图片数组
const props = defineProps({
  images: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

// Emits: 触发删除事件
const emit = defineEmits(['remove-image'])

// 删除图片
const removeImage = (index: number) => {
  emit('remove-image', index)
}
</script>
