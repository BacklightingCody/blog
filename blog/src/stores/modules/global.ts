import { defineStore } from 'pinia'
import { ref } from 'vue'
import { modifyCurColor, generateRandomColors } from '@/utils/color'

export const useGlobalStore = defineStore(
  'global',
  () => {
    // 主题管理
    const oldTheme = localStorage.getItem('theme')
    const theme = ref(oldTheme || 'default') // 默认主题
    const curColor = ref('rgba(166, 108, 138, 0.7)')

    const changeMode = (mode: string) => {
      theme.value = mode
      const { rgba, rgb } = modifyCurColor(undefined, theme.value)
      console.log(rgba)
      curColor.value = rgba
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
      curColor,
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
