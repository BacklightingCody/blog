<template>
  <UseColorMode>
    <el-switch v-model="isDarkMode" @click="handleToggleMode" class="transition-all! duration-300 ease-in-out border-0!"
      style="--el-switch-on-color: var(--background-color); --el-switch-off-color: var(--background-color)">
      <template #active-action>
        <span class="custom-active-action flex items-center">
          <iconDark />
        </span>
      </template>
      <template #inactive-action>
        <span class="custom-inactive-action flex items-center">
          <iconLight />
        </span>
      </template>
    </el-switch>
  </UseColorMode>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores'
import { useColorMode } from '@vueuse/core'
import { UseColorMode } from '@vueuse/components'
import { ref, nextTick } from 'vue'

// 使用 VueUse 的 useColorMode 处理亮/暗主题
const colorMode = useColorMode({
  attribute: 'theme',
  modes: {
    dark: 'dark',
    light: 'light',
  },
})
const globalStore = useGlobalStore()
const isDarkMode = ref(colorMode.value === 'dark')

// 检查是否支持视图过渡
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

// 切换主题模式并应用动画
const handleToggleMode = async (event: MouseEvent) => {
  const { clientX: x, clientY: y } = event
  const enableTransitions = () =>
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches

  if (!enableTransitions()) {
    toggleMode()
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ]

  // 提前设置动画样式
  const docElement = document.documentElement
  docElement.style.clipPath = clipPath[0]

  const doc = document as Document & { startViewTransition?: (callback: () => void) => { ready: Promise<void> } }

  await doc.startViewTransition?.(async () => {
    toggleMode()
    await nextTick()
  })?.ready

  const animation = docElement.animate(
    { clipPath: clipPath },
    {
      duration: 400,
      easing: 'ease-in-out',
    }
  )

  animation.onfinish = () => {
    docElement.style.clipPath = ''
  }
}


// 切换逻辑
const toggleMode = () => {
  colorMode.value = isDarkMode.value ? 'dark' : 'light'
  globalStore.changeMode(colorMode.value)
}
</script>

<style lang="scss" scoped>
:deep(.el-switch__core) {
  border-color: var(--accent-color) !important;
}

:deep(.el-switch__core .el-switch__action) {
  background-color: var(--background-color) !important;
  color: var(--icon-color) !important;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}


</style>
