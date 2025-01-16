<template>
  <div class="sliding-container overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-xl">
    <div class="sliding-wrapper" :style="{ animationDuration: `${animationDuration}s` }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  speed: {
    type: Number,
    default: 30 // Duration in seconds for one complete animation cycle
  },
  height: {
    type: String,
    default: '50px'
  }
});

const containerWidth = ref(0);
const animationDuration = ref(props.speed);

const updateContainerWidth = () => {
  const container = document.querySelector('.sliding-container');
  if (container) {
    containerWidth.value = container.offsetWidth;
    console.log(containerWidth.value);
    animationDuration.value = containerWidth.value / 100; // Adjust animation duration based on container width
  }
};

onMounted(() => {
  updateContainerWidth();
  window.addEventListener('resize', updateContainerWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerWidth);
});

watch(() => props.speed, (newSpeed) => {
  animationDuration.value = newSpeed;
});
</script>

<style scoped>
.sliding-container {
  position: relative;
  height: v-bind('height');
}

.sliding-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  animation: slide linear infinite;
  white-space: nowrap;
}

@keyframes slide {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>