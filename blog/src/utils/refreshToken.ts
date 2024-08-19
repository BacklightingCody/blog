import { refreshTokenApi } from '@/services'
import { useGlobalStore } from '@/stores'

let promise: Promise<boolean> | null = null

export async function refreshToken(): Promise<boolean> {
  const globalStore = useGlobalStore()

  if (promise) return promise

  promise = new Promise(async (resolve, reject) => {
    try {
      const res = await refreshTokenApi({
        refreshToken: globalStore.getToken('refresh')
      })

      const { accessToken } = res.data
      globalStore.setToken(accessToken, 'access')
      ElMessage.success('Token refreshed successfully')

      resolve(res.code === 200)
    } catch (error) {
      ElMessage.error('Token refresh failed')
      reject(error)
    } finally {
      promise = null
    }
  })

  return promise
}
