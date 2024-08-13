import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useGlobalStore = defineStore(
  'global',
  () => {
    // 主题方面
    const theme = ref('light')
    const changeMode = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }
    // 加载loading方面
    const loading = ref(true)
    const loadingKey = ref(0)
    const showLoader = () => {
      loading.value = true
      loadingKey.value++
    }
    const hideLoader = () => {
      loading.value = false
    }
    return {
      theme,
      changeMode,
      loading,
      loadingKey,
      showLoader,
      hideLoader
    }
  },
  {
    persist: [
      {
        paths: ['theme'],
        key:'theme',
        storage: localStorage
      }
    ]
  }
)
