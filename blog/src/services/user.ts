import http from '@/utils/http'

export const getUserInfoApi = () => {
  return http.request({
    url: '/user/info',
    method: 'get'
  })
}
