import { defineStore } from 'pinia'
import { ref } from 'vue'
import { updateCSSVariables, generateRandomColors } from '@/utils/color'
import { useCookies } from '@vueuse/integrations/useCookies'

export const useGlobalStore = defineStore(
  'global',
  () => {
    // 登录状态方面
    const isLogin = ref(false)
    const changeLoginStatus = (value: boolean) => {
      isLogin.value = value
    }

    // 主题方面
    const oldTheme = localStorage.getItem('theme')
    const theme = ref(oldTheme || 'default') // 默认主题
    const colors = ref(generateRandomColors(5)) // 产生一组颜色

    const changeMode = (mode: string) => {
      theme.value = mode
      updateCSSVariables(theme)
    }

    // 加载loading方面
    const loading = ref(true)
    const showLoader = () => {
      loading.value = true
    }
    const hideLoader = () => {
      loading.value = false
    }

    // 使用 useCookies 管理 token
    const cookies = useCookies(['accessToken', 'refreshToken'])

    const getToken = (isAccess: string) => {
      return cookies.get(isAccess === 'access' ? 'accessToken' : 'refreshToken')
    }

    const setToken = (value: string, isAccess: string) => {
      cookies.set(isAccess === 'access' ? 'accessToken' : 'refreshToken', value)
    }

    const clearToken = () => {
      cookies.remove('accessToken')
      cookies.remove('refreshToken')
    }

    return {
      isLogin,
      changeLoginStatus,
      theme,
      changeMode,
      loading,
      showLoader,
      hideLoader,
      getToken,
      setToken,
      clearToken
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
