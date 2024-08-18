import { refreshTokenApi } from '@/services'
import { useGlobalStore } from '@/stores'
export async function refreshToken() {
  const globalStore = useGlobalStore()
  await refreshTokenApi({ refreshToken: globalStore.getToken('refresh') }).then(
    (res) => {
      const { accessToken } = res.data
      globalStore.setToken(accessToken, 'access')
      ElMessage.success('刷新成功')
    }
  )
}
