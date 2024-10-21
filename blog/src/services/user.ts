import http from '@/utils/http'

export const getUserInfoApi = (
  userId: string | null,
  username: string | null
) => {
  return http.request({
    url: `/user/info`,
    method: 'get',
    params: { userId, username }
  })
}