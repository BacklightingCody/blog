// import { refreshTokenApi } from '@/services'
// import { useGlobalStore } from '@/stores'
// let refreshTokenPromise: Promise<boolean> | null = null
// export async function refreshToken(): Promise<boolean> {
//   if (refreshTokenPromise) return refreshTokenPromise

//   refreshTokenPromise = new Promise(async (resolve, reject) => {
//     try {
//       const globalStore = useGlobalStore()
//       const refreshToken = globalStore.getToken('refresh')
//       const accessTOken = globalStore.getToken('access')
//       console.log(accessTOken)
//       console.log('refreshToken', refreshToken)
//       // 请求刷新 token，后端设置新的 accessToken 和 refreshToken
//       await refreshTokenApi(refreshToken)
//       ElMessage.success('Token refreshed successfully')
//       resolve(true)
//     } catch (error) {
//       ElMessage.error('Token refresh failed. Please log in again.')
//       reject(false)
//     } finally {
//       refreshTokenPromise = null
//     }
//   })

//   return refreshTokenPromise
// }
