import http from '@/utils/http'

export const loginApi = (data: { username: string; password: string }) => {
  return http.request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
export const githubLoginApi = () => {
  // return http.request({
  //   url: '/auth/github/redirect',
  //   method: 'get'
  // })
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/github/redirect`
  console.log(import.meta.env.VITE_API_BASE_URL)
}
export const refreshTokenApi = async (data: { refreshToken: string }) => {
  return http.request({
    url: '/auth/refresh_token',
    method: 'post',
    data
  })
}
