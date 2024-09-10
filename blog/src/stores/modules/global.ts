import { defineStore } from 'pinia'
import { ref } from 'vue'
import { updateCSSVariables, generateRandomColors } from '@/utils/color'
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
    const theme = ref(oldTheme)
    watchEffect(() => {
      console.log(theme.value, '111')
    })
    const colors = ref(generateRandomColors(5))  //产生一组颜色
    const changeMode = (mode: string) => {
      console.log(111)
      theme.value = mode
      // updateCSSVariables(theme)
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
        pick: ['theme'],
        key: 'theme',
        storage: localStorage
      },
      {
        pick: ['refreshToken'],
        key: 'blog-token',
        storage: localStorage
      }
    ]
  }
)
