<template>
  <RouterLink :to="category.link" class="flex justify-center">
    <div
      class="category-card-container flex justify-center items-center w-[320px] h-[240px] perspect-1000px cursor-pointer"
      @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">

      <div class="card-content w-full h-full rounded-2xl text-default-text relative"
        :style="[cardStyle, { backgroundImage: `url(${category.backgroundImage})` }]">
        <!-- Overlay for background opacity -->
        <div class="background-overlay"
          :style="{ backgroundColor: `rgba(${backFilter}, ${backFilter}, ${backFilter}, ${backgroundOpacity})` }"></div>
        <div class="flex flex-col items-center justify-center p-6 z-10">
          <slot name="icon"></slot>
          <h2 class="text-2xl font-bold text-default-btnText hover:text-hover-btnText cursor-pointer mt-10">
            {{ category.name }}
          </h2>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue'
import { useGlobalStore } from '@/stores';
const globalStore = useGlobalStore()
const backFilter = computed(() => {
  return globalStore.theme === 'dark' ? 0 : 255
})
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  backgroundOpacity: {
    type: Number,
    default: 0.5,
  },
})

const cardStyle = ref({
  transform: 'rotateX(0deg) rotateY(0deg)',
  transition: 'transform 0.3s ease-out',
  backgroundSize: 'cover',
  backgroundPosition: 'right top',
})

const handleMouseMove = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement
  const cardRect = card.getBoundingClientRect()
  const centerX = cardRect.left + cardRect.width / 2
  const centerY = cardRect.top + cardRect.height / 2
  const deltaX = event.clientX - centerX
  const deltaY = event.clientY - centerY
  const rotateX = (deltaY / cardRect.height) * -30
  const rotateY = (deltaX / cardRect.width) * 30
  cardStyle.value = {
    ...cardStyle.value,
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
  }
}

const handleMouseLeave = () => {
  cardStyle.value = {
    ...cardStyle.value,
    transform: 'rotateX(0deg) rotateY(0deg)',
  }
}
</script>

<style scoped>
.category-card-container {
  transition: transform 0.3s ease-out;
}

.card-content {
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  will-change: transform;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
}

/* Overlay layer for background image opacity */
.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>
