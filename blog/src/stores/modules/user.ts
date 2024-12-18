import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { getUserInfoApi } from '@/services/user'
// import { fnOverload } from '@/utils/fnOverload'
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

    // 根据 URL 或本地状态获取用户信息
    const getUserInfo = async (
      userId?: string | null,
      username?: string | null
    ) => {
      if (!userId && !username) {
        throw new Error('no userId or username')
      }
      const res = await getUserInfoApi(userId, username)
      if (res && res.data) {
        setUserInfo(res.data)
        isLoggedIn.value = true
        return true
      } else {
        ElMessage.error('获取用户信息失败')
        clearUserInfo()
        return false
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
      getUserInfo,
      clearUserInfo,
      setUserInfo,
      logout
    }
  },
  {
    persist: [
      {
        pick: ['userId', 'username', 'avatar', 'isLoggedIn'],
        key: 'user',
        storage: localStorage
      }
    ]
  }
)
