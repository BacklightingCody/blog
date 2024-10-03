import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'

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

  // 清除 token
  const clearToken = () => {
    cookies.remove('accessToken')
    cookies.remove('refreshToken')
    isLoggedIn.value = false // 清除 token 后，更新登录状态
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

  // 登出
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
    getToken,
    setToken,
    clearToken,
    setUserInfo,
    logout
  }
})
