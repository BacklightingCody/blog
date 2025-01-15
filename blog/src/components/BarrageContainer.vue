<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from 'vue'

const props = defineProps<{
  messages?: (string | object)[] // 可选的普通弹幕消息数组
}>()

interface BarrageItem {
  id: number
  top: number
  left: number
  content: any // 可以是组件或字符串
}

const barrageList = ref<BarrageItem[]>([])
let animationId: number
let counter = 0

// 初始化弹幕内容
const initBarrage = () => {
  // 获取插槽内容的 DOM 节点
  const slotElements = document.querySelectorAll('.barrage-slot')
  slotElements.forEach((element, index) => {
    const randomTop = Math.floor(Math.random() * 80) // 随机生成弹幕的垂直位置
    const item: BarrageItem = {
      id: counter++,
      top: randomTop,
      left: 100, // 初始位置在右侧
      content: element.outerHTML // 插槽内容转为 HTML 字符串
    }
    barrageList.value.push(item)
  })

  // 处理 props.messages 内容
  props.messages?.forEach((message) => {
    const randomTop = Math.floor(Math.random() * 80)
    const item: BarrageItem = {
      id: counter++,
      top: randomTop,
      left: 100,
      content: message
    }
    barrageList.value.push(item)
  })
}

// 动画循环
const animate = () => {
  barrageList.value = barrageList.value.filter(item => item.left > -20) // 移除离开屏幕的弹幕
  barrageList.value.forEach(item => {
    item.left -= 0.2 // 控制滑动速度
  })

  // 如果没有弹幕，重新初始化
  if (barrageList.value.length === 0) {
    initBarrage()
  }

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  initBarrage() // 初始化弹幕
  animationId = requestAnimationFrame(animate) // 开始动画
})

onUnmounted(() => {
  cancelAnimationFrame(animationId) // 清除动画
})
</script>

<template>
  <div class="barrage-container">
    <!-- 渲染弹幕 -->
    <div
      v-for="item in barrageList"
      :key="item.id"
      class="barrage-item"
      :style="{
        top: `${item.top}%`,
        left: `${item.left}%`
      }"
      v-html="item.content"
    />
    <slot class="barrage-slot" />
  </div>
</template>

<style scoped>
.barrage-container {
  position: relative;
  width: 100%;
  height: 100px;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 8px;
}

.barrage-item {
  position: absolute;
  padding: 4px 12px;
  background: #646cff;
  color: white;
  border-radius: 16px;
  white-space: nowrap;
  transform: translateX(-50%);
}
</style>
