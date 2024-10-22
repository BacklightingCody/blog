<template>
  <div class="category-card-container">
    <div
      class="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer bg-default-currency"
      :class="{ 'rotate-y-180': flipped }" @click="flipCard">
      <!-- 卡片正面 -->
      <div class="front absolute w-full h-full backface-hidden">
        <div class="w-full h-full rounded-lg shadow-lg flex flex-col items-center justify-center p-6"
          :style="{ backgroundColor: props.category.color }">
          <img :src="props.category.image" :alt="props.category.name" class="w-24 h-24 mb-4" />
          <h2 class="text-2xl font-bold text-white">{{ props.category.name }}</h2>
        </div>
      </div>

      <!-- 卡片背面 -->
      <div class="back absolute w-full h-full backface-hidden rotate-y-180">
        <div class="w-full h-full bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
          <h3 class="text-xl font-bold mb-4">{{ props.category.name }} Subcategories</h3>
          <ul class="space-y-2">
            <li v-for="subcategory in props.category.subcategories" :key="subcategory" class="text-sm">
              {{ subcategory }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
})

const flipped = ref(false)

const flipCard = () => {
  flipped.value = !flipped.value
}
</script>

<style scoped>
.category-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  perspective: 1000px;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
</style>
