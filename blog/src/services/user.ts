import http from '@/utils/http'

export const login = (data: { username: string; password: string }) => {
  return http.request({
    url: '/login',
    method: 'post',
    data
  })
}
