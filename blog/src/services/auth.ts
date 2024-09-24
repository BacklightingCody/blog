import http from '@/utils/http'

export const loginApi = (data: { username: string; password: string }) => {
  return http.request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export const refreshTokenApi = async (data: { refreshToken: string }) => {
  return http.request({
    url: '/auth/refresh_token',
    method: 'post',
    data
  })
}
