import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { getUserInfoFromUrlApi, getUserInfoApi } from '@/services/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const avatar = ref('')
    const userId = ref(null)
    const username = ref(null)
    const isLoggedIn = ref(false)

    // 使用 useCookies 管理 token
    const cookies = useCookies(['accessToken', 'refreshToken'])

    const checkLoginFromUrl = async () => {
      // if (isLoggedIn.value) {
      //   return true // 如果已经登录，直接返回
      // }
      const urlParams = new URLSearchParams(window.location.search)
      const loggedIn = urlParams.get('logged_in')
      const Id = urlParams.get('user_id')
      const name = urlParams.get('username')
      if ((loggedIn && userId) || username) {
        isLoggedIn.value = true
        const res = await getUserInfoFromUrlApi(Id, name)
        console.log(res)
        if (res && res.data) {
          setUserInfo(res.data)
          console.log(avatar.value)
        }
        // 清理 URL 参数，避免多次判断
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        )
        return true
      } else {
        isLoggedIn.value = false
        console.log('未登录')
        return false
      }
    }

    const getUserInfoFromUrl = async () => {
      if (isLoggedIn.value && userId.value && username.value) {
        try {
          const res = await getUserInfoFromUrlApi(userId.value, username.value) // 请求后端验证信息
          if (res && res.data) {
            setUserInfo(res.data) // 若成功，更新用户信息
            return true
          } else {
            isLoggedIn.value = false
            clearUserInfo() // 如果验证失败，清除用户信息
          }
        } catch (error) {
          console.error('后端请求失败:', error)
          isLoggedIn.value = false
          clearUserInfo() // 请求失败时也清除用户信息
        }
      }
      return false
    }
    const getUserInfo = async () => {
      isLoggedIn.value = true
      console.log(isLoggedIn.value, 'kxc')
      if (isLoggedIn.value) {
        try {
          console.log(userId.value, username.value)
          const res = await getUserInfoFromUrlApi(userId.value, username.value)
          if (res && res.data) {
            setUserInfo(res.data)
          }
        } catch (error) {
          console.log(error)
          isLoggedIn.value = false
          clearUserInfo()
        }
      }
    }
    // 设置用户信息
    const setUserInfo = (user: {
      avatarUrl: string
      id: string
      name: string
      // token?: string
    }) => {
      avatar.value = user.avatarUrl
      userId.value = user.id
      username.value = user.name
      // setToken(user.token, 'access')
      // isLoggedIn.value = true
    }

    // 清除用户信息
    const clearUserInfo = () => {
      avatar.value = ''
      userId.value = null
      username.value = null
      isLoggedIn.value = false
    }
    const logout = () => {
      avatar.value = ''
      userId.value = null
      username.value = null
      isLoggedIn.value = false
    }

    return {
      avatar,
      userId,
      username,
      isLoggedIn,
      checkLoginFromUrl,
      getUserInfoFromUrl,
      getUserInfo,
      clearUserInfo,
      setUserInfo,
      logout
    }
  },
  {
    persist: [
      {
        pick: ['userId', 'username', 'avatar','isLoggedIn'],
        key: 'user',
        storage: localStorage
      }
    ]
  }
)
