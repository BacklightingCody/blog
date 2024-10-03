import { defineStore } from 'pinia'
import { ref } from 'vue'
import { updateCSSVariables, generateRandomColors } from '@/utils/color'

export const useGlobalStore = defineStore(
  'global',
  () => {
    // 主题管理
    const oldTheme = localStorage.getItem('theme')
    const theme = ref(oldTheme || 'default') // 默认主题
    const colors = ref(generateRandomColors(5)) // 产生一组颜色

    const changeMode = (mode: string) => {
      theme.value = mode
      updateCSSVariables(theme)
    }

    // 加载 loading 管理
    const loading = ref(true)
    const showLoader = () => {
      loading.value = true
    }
    const hideLoader = () => {
      loading.value = false
    }

    return {
      theme,
      changeMode,
      loading,
      showLoader,
      hideLoader
    }
  },
  {
    persist: [
      {
        pick: ['theme'],
        key: 'theme',
        storage: localStorage
      }
    ]
  }
)
