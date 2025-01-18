<template>
  <div v-if="imageUrls.length > 0" class="flex gap-2 mt-2">
    <div
      v-for="(image, index) in imageUrls"
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
import { computed, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array as () => File[],
    required: true,
  },
})

const emit = defineEmits(['remove-image'])

// Use computed to make imageUrls reactive
const imageUrls = computed(() => {
  return props.images.map(file => URL.createObjectURL(file))
})

// Clean up ObjectURLs when images change to prevent memory leaks
watch(() => props.images, (newImages, oldImages) => {
  if (oldImages) {
    oldImages.forEach(file => URL.revokeObjectURL(URL.createObjectURL(file)))
  }
}, { deep: true })

const removeImage = (index: number) => {
  emit('remove-image', index)
}
</script>