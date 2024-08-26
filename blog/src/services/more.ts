import http from '@/utils/http'

export const getMoreApi = () => {
  return http.request({
    url: '/more',
    method: 'get',
    requestOptions: {
      retryRequest: {
        waitTime: 1000, // 设置重试间隔
        count: 3, // 设置重试次数
      },
    }
  })
}
