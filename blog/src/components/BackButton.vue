<template>
  <button @click="handleClick" :class="buttonClass" :style="buttonStyle">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { CSSProperties } from 'vue';

// 定义 props
const props = defineProps({
  buttonClass: {
    type: String,
    default: 'bg-default-currency text-default-text border border-solid rounded hover:scale-110 transition-transform duration-200',
  },
  buttonStyle: {
    type: Object as () => CSSProperties,
    default: () => ({}),
  },
  to: {
    type: String,
    default: '',
  },
});

// 使用 Vue Router
const router = useRouter();

// 点击事件处理函数
const handleClick = () => {
  if (props.to) {
    router.push(props.to); // 路由跳转
  } else {
    window.history.back(); // 浏览器返回
  }
};
</script>

<style scoped>
/* 可在这里添加额外样式 */
</style>
