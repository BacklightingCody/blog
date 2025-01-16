<template>
  <div class="wrapper">
    <a class="glowing-border">
      <span class="tag" :style="{ backgroundColor: color }">
        <slot></slot>
      </span>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GlowingBorderTag',
  props: {
    // 接受 color 属性来控制背景色
    color: {
      type: String,
      default: '#444', // 默认背景色
    },
  },
})
</script>

<style scoped>
.wrapper {
  position: relative;
  display: inline-block;
}

.glowing-border {
  position: relative;
  display: inline-block;
  border-radius: 50px;
  /* 控制边框形状 */
  padding: 2px 2px;
  /* 边框内部的填充 */
  z-index: 1;
  background-color: transparent;
  /* 透明背景，以便仅显示流光边框 */
  overflow: hidden;
}

.glowing-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50px;
  /* 确保边框是圆角 */
  padding: 10px;
  /* 控制流光边缘的宽度 */
  box-sizing: border-box;
  /* 包含内边距在内 */
  background: conic-gradient(from 90deg,
      transparent 120deg,
      #03a9f4 150deg,
      #f441a5 180deg,
      #ffeb3d 210deg,
      transparent 240deg);
  /* 环形渐变 */
  z-index: -1;
  animation: rotateGlow 4s linear infinite;
  /* 控制流光的旋转 */
}

.tag {
  position: relative;
  display: inline-block;
  z-index: 2;
  color: #fff;
  font-weight: bold;
  border-radius: 50px;
  padding: 0 10px;
}

@keyframes rotateGlow {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
