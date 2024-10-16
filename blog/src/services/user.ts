import http from '@/utils/http'

export const getUserInfoFromUrlApi = (
  userId: string | null,
  username: string | null
) => {
  return http.request({
    url: `/user/info?userId=${userId}&username=${username}`,
    method: 'get'
  })
}

export const getUserInfoApi = () => {
  return http.request({
    url: '/user/info',
    method: 'get'
  })
}
