import http from '@/utils/http'

export const getMoreApi = () => {
  console.log(1)
  return http.request({
    url: '/more',
    method: 'get',
  })
}
