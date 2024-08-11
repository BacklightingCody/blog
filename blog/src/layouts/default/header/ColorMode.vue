<template>
  <UseColorMode>
    <el-switch v-model="isDarkMode" @change="toggleMode" class="transition-all! duration-300 ease-in-out border-0!"
      style="--el-switch-on-color: var(--background-color); --el-switch-off-color: var(--background-color)">
      <template #active-action>
        <span class="custom-active-action flex items-center">
          <iconDark></iconDark>
        </span>
      </template>
      <template #inactive-action>
        <span class="custom-inactive-action flex items-center">
          <iconLight></iconLight>
        </span>
      </template>
    </el-switch>
  </UseColorMode>
</template>
<script setup lang="ts">
import { useGlobalStore } from '@/stores'
import { useColorMode } from '@vueuse/core'
import { UseColorMode } from '@vueuse/components'
import { ref } from 'vue'
const colorMode = useColorMode({
  attribute: 'theme',
  modes: {
    dark: 'dark',
    light: 'light',
  },
})
const globalStore = useGlobalStore()
const isDarkMode = ref(colorMode.value === 'dark')

const toggleMode = () => {
  colorMode.value = isDarkMode.value ? 'dark' : 'light'
  globalStore.changeMode()
  console.log(isDarkMode.value)
}
</script>
<style lang="scss" scoped>
:deep(.el-switch__core){
  border-color:var(--accent-color) !important;
}
:deep(.el-switch__core .el-switch__action){
  background-color:var(--background-color) !important;
  color:var(--icon-color) !important;
  
}
</style>
