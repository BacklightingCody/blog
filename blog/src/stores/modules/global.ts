import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useGlobalStore = defineStore(
  'global',
  () => {
    const theme = ref('light')
    const changeMode = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }
    return {
      theme,
      changeMode
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
