<template>
  <div 
    v-if="visible" 
    class="back-to-top" 
    @click="scrollToTop"
  >
    <!-- 插槽，默认显示 "🔝" -->
    <slot>🔝</slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Props
const props = defineProps({
  threshold: {
    type: Number,
    default: 200, // 滚动距离阈值
  },
  scrollSpeed: {
    type: Number,
    default: 300, // 滚动动画时长（毫秒）
  },
});

const visible = ref(true);

// 滚动事件处理
const handleScroll = () => {
  visible.value = window.scrollY > props.threshold;
};

// 返回顶部
const scrollToTop = () => {
  const start = window.scrollY;
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / props.scrollSpeed, 1);
    const ease = progress < 0.5 ? 2 * progress ** 2 : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, start - start * ease);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

// 挂载和卸载事件监听
onMounted(() => {
  console.log(1)
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  console.log(1)
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: #f5f5f5;
  color: #333;
  font-size:30px;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.back-to-top:hover {
  background-color: #333;
  color: #fff;
  transform: scale(1.1);
}
</style>
