<template>
  <div
    class="category-card-container flex justify-center items-center w-[320px] h-[240px] perspect-1000px cursor-pointer"
    @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="card-content w-full h-full bg-default-currency rounded-2xl text-default-text" :style="cardStyle">
      <!-- 卡片正面内容 -->
      <div class="flex flex-col items-center justify-center p-6">
        <!-- 插槽，用于传递图标组件 -->
        <slot name="icon"></slot>
        <h2 class="text-2xl font-bold text-default-btnText hover:text-hover-btnText cursor-pointer mt-10">{{
          props.category.name }}</h2>
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

const cardStyle = ref({})

const handleMouseMove = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement
  const cardRect = card.getBoundingClientRect()

  // 获取鼠标相对卡片中心的位置
  const centerX = cardRect.left + cardRect.width / 2
  const centerY = cardRect.top + cardRect.height / 2

  const deltaX = event.clientX - centerX
  const deltaY = event.clientY - centerY

  // 根据鼠标偏移计算旋转角度
  const rotateX = (deltaY / cardRect.height) * -30 // 根据Y轴位置旋转的角度
  const rotateY = (deltaX / cardRect.width) * 30 // 根据X轴位置旋转的角度

  cardStyle.value = {
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    transition: 'transform 0.3s ease-out',
  }
}

const handleMouseLeave = () => {
  // 当鼠标离开时恢复到原来的状态
  cardStyle.value = {
    transform: 'rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.3s ease-out',
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
}
</style>
