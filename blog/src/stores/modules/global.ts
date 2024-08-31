import { defineStore } from 'pinia'
import { ref } from 'vue'
import {updateCSSVariables,generateRandomColors} from '@/utils/color'
export const useGlobalStore = defineStore(
  'global',
  () => {
    // 登录状态方面
    const isLogin = ref(false)
    const changeLoginStatus = (value: boolean) => {
      isLogin.value = value
    }
    // 主题方面
    const theme = ref('light')
    const colors = ref(generateRandomColors(5))
    const changeMode = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
      updateCSSVariables(theme)
    }
    watchEffect(() => {
      updateCSSVariables(theme)
    })
    // 加载loading方面
    const loading = ref(true)
    const showLoader = () => {
      loading.value = true
    }
    const hideLoader = () => {
      loading.value = false
    }
    // token方面
    const accessToken = ref('')
    const refreshToken = ref('')
    const getToken = (isAccess: string) => {
      if (isAccess == 'access') {
        return accessToken.value
      } else {
        return refreshToken.value
      }
    }
    const setToken = (value: string, isAccess: string) => {
      if (isAccess == 'access') {
        accessToken.value = value
      } else {
        refreshToken.value = value
      }
    }
    const clearToken = () => {
      accessToken.value = ''
      refreshToken.value = ''
    }
    return {
      isLogin,
      changeLoginStatus,
      theme,
      changeMode,
      loading,
      showLoader,
      hideLoader,
      accessToken,
      refreshToken,
      getToken,
      setToken,
      clearToken
    }
  },
  {
    persist: [
      {
        paths: ['theme'],
        key: 'theme',
        storage: localStorage
      },
      {
        paths: ['refreshToken'],
        key: 'blog-token',
        storage: localStorage
      }
    ]
  }
)
