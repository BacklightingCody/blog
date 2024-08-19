import http from '@/utils/http'

export const getMoreApi = () => {
  return http.request({
    url: '/more',
    method: 'get',
  })
}
