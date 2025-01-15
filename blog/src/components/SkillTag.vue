<template>
  <div>
    <a class="glowing-border" :style="{ backgroundColor: color }">
      <span class="tag"><slot></slot></span>
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
.glowing-border {
  position: relative;
  text-decoration: none;
  text-align: center;
  border-radius: 50px;
  z-index: 1;
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.glowing-border::before {
  content: '';
  position: absolute;
  top: -4px;
  right: -4px;
  left: -4px;
  bottom: -4px;
  border-radius: 50px;
  background-image: linear-gradient(to right, #03a9f4, #f441a5, #ffeb3d, #09a8f4);
  background-size: 400%;
  z-index: -1;
  opacity: 0; /* 初始透明度 */
  animation: border-glow 4s linear infinite;
}

@keyframes border-glow {
  0% {
    background-position: 0% 0%; /* 从上左角开始 */
    opacity: 0; /* 隐藏 */
  }
  25% {
    background-position: 100% 0%; /* 右上角亮起 */
    opacity: 1; /* 显示 */
  }
  50% {
    background-position: 100% 100%; /* 右下角亮起 */
    opacity: 1;
  }
  75% {
    background-position: 0% 100%; /* 左下角亮起 */
    opacity: 1;
  }
  100% {
    background-position: 0% 0%; /* 返回到上左角 */
    opacity: 0; /* 隐藏 */
  }
}

.tag {
  position: relative;
  z-index: 2;
  display: inline-block;
  color: #fff;
  font-size: 24px;
  padding: 0px 10px;
  background-color: transparent;
}
</style>
