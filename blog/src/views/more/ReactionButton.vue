<template>
  <button
    @click="handleClick"
    class="group relative w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
    :class="{ 'scale-110': isActive }"
  >
    <!-- 背景动画 -->
    <div
      class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      :style="{
        background: `radial-gradient(circle at center, ${color}20, transparent 70%)`
      }"
    ></div>
    
    <!-- 图标容器 -->
    <div
      class="relative flex items-center justify-center w-full h-full transform transition-transform duration-300"
      :class="{ 'scale-110 animate-bounce-small': isActive }"
    >
      <slot name="icon"></slot>
    </div>

    <!-- 点击效果 -->
    <div
      v-show="showRipple"
      class="absolute inset-0 rounded-full animate-ripple"
      :style="{ background: `${color}30` }"
    ></div>
  </button>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: '#FFB800'
  }
});

const isActive = ref(false);
const showRipple = ref(false);

const handleClick = () => {
  isActive.value = !isActive.value;
  showRipple.value = true;
  setTimeout(() => {
    showRipple.value = false;
  }, 300);
};
</script>

<style scoped>
@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes bounce-small {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-ripple {
  animation: ripple 0.3s ease-out;
}

.animate-bounce-small {
  animation: bounce-small 0.3s ease-in-out;
}
</style>