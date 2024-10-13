import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { getUserInfoApi } from '@/services/user'
export const useUserStore = defineStore('user', () => {
  // 用户信息
  const avatar = ref('')
  const userId = ref(null)
  const username = ref(null)
  const isLoggedIn = ref(false)

  // 使用 useCookies 管理 token
  const cookies = useCookies(['accessToken', 'refreshToken'])

  // 获取 token
  const getToken = (isAccess: string) => {
    return cookies.get(isAccess === 'access' ? 'accessToken' : 'refreshToken')
  }

  // 设置 token
  const setToken = (value: string, isAccess: string) => {
    cookies.set(isAccess === 'access' ? 'accessToken' : 'refreshToken', value)
  }

  const checkLogin = async () => {
    if (isLoggedIn.value) {
      return // 如果已经登录，直接返回
    }
    const urlParams = new URLSearchParams(window.location.search)
    const loggedIn = urlParams.get('logged_in')
    if (loggedIn) {
      isLoggedIn.value = true
      const res = await getUserInfoApi()
      console.log(res)
      if(res){
        console.log(res)
      }
      // 清理 URL 参数，避免多次判断
      window.history.replaceState({}, document.title, window.location.pathname)
    }else{
      console.log('未登录')
      return 
    }
  }
  // 设置用户信息
  const setUserInfo = (user: {
    avatar: string
    id: string
    name: string
    token?: string
  }) => {
    avatar.value = user.avatar
    userId.value = user.id
    username.value = user.name
    setToken(user.token, 'access')
    isLoggedIn.value = true
  }

  // 清除 token
  const clearToken = () => {
    cookies.remove('accessToken')
    cookies.remove('refreshToken')
    isLoggedIn.value = false // 清除 token 后，更新登录状态
  } // 登出
  const logout = () => {
    avatar.value = ''
    userId.value = null
    username.value = null
    clearToken()
  }

  return {
    avatar,
    userId,
    username,
    isLoggedIn,
    checkLogin,
    getToken,
    setToken,
    clearToken,
    setUserInfo,
    logout
  }
})
