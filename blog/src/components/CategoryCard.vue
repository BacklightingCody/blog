<template>
  <div
    class="category-card-container flex justify-center items-center w-[320px] h-[240px] perspect-1000px cursor-pointer"
    @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="card-content w-full h-full rounded-2xl text-default-text relative" :style="cardStyle">
      <div class="flex flex-col items-center justify-center p-6 z-10">
        <slot name="icon"></slot>
        <h2 class="text-2xl font-bold text-default-btnText hover:text-hover-btnText cursor-pointer mt-10">
          {{ category.name }}
        </h2>
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
  backgroundImage: {
    type: String,
    default: 'https://i.pinimg.com/564x/6d/d0/59/6dd059b19db716581b8ce6e2a2ab1485.jpg',
  },
  backgroundOpacity: {
    type: Number,
    default: 0.7, // 鼠标悬停时背景图片的透明度
  },
})

const cardStyle = ref({
  transform: 'rotateX(0deg) rotateY(0deg)',
  transition: 'transform 0.3s ease-out',
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
}

.card-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://i.pinimg.com/564x/6d/d0/59/6dd059b19db716581b8ce6e2a2ab1485.jpg') no-repeat;
  background-size: cover;
  background-position: right top;
  transition: opacity 0.3s ease-out;
  /* 初始不透明 */
  opacity: 0.5;
  z-index: -2;
}

.card-content::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  /* 半透明黑色遮罩层 */
  z-index: -1;
  /* 遮罩层 */
}

.category-card-container:hover .card-content::before {
  opacity: 0.6;
  /* 悬停时更改背景图片透明度 */
}
</style>
