import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios'
import { AxiosRetry } from './axiosRetry'
import { AxiosTransform, RequestOptions } from './axiosTransform'
import { useGlobalStore } from '@/stores'
import { refreshToken } from '@/utils/refreshToken'
import { getMoreApi } from '@/services/more'
// 创建自定义的 AxiosTransform 实现
export class CustomTransform extends AxiosTransform {
  // 请求前的钩子函数
  beforeRequestHook(
    config: InternalAxiosRequestConfig,
    options: RequestOptions
  ): InternalAxiosRequestConfig {
    console.log('发起了请求')
    const globalStore = useGlobalStore()
    // 在请求头中添加 token
    const accessToken = globalStore.getToken('access')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  }

  requestCatchHook(e: Error, options: RequestOptions): Promise<any> {
    // 可以实现全局的错误提示，例如弹出一个消息框
    console.error('请求失败:', e.message)
    // 这里可以对错误进行进一步处理，或者直接返回错误信息
    return Promise.reject(e)
  }

  requestInterceptors(
    config: InternalAxiosRequestConfig,
    options: RequestOptions
  ): InternalAxiosRequestConfig {
    // console.log('requestInterceptors')
    // 可以在这里对所有的请求统一添加某些参数或者处理一些特殊逻辑
    return config
  }
  //响应拦截器
  responseInterceptors(res: AxiosResponse<any>): AxiosResponse<any> {
    // console.log('responseInterceptors')
    const globalStore = useGlobalStore()
    // 首先需要存储token以及更新token
    if (res.headers.refreshtoken) {
      console.log('refresh')
      const refreshToken = res.headers.refreshtoken.replace('Bearer ', '')
      globalStore.setToken(refreshToken, 'refresh')
    }
    if (res.headers.authorization) {
      console.log('auth')
      const accessToken = res.headers.authorization.replace('Bearer ', '')
      globalStore.setToken(accessToken, 'access')
    }
    console.log(res,'res')
    if (res.status === 200) {
      ElMessage.success({
        message: res.data.message,
        duration: 3000
      })
    }
    return res
  }
  // 响应拦截器之后继续处理钩子函数
  transformResponseHook(res: AxiosResponse<any>, options: RequestOptions): any {
    // console.log('transformResponseHook')
    const { data } = res
    console.log(data)
    return data
  }

  // 响应拦截器错误处理钩子函数
  async responseInterceptorsCatch(
    axiosInstance: AxiosInstance,
    error: AxiosError
  ): Promise<any> {
    // 可以尝试做一些全局的错误重试或错误处理
    const axiosRetry = new AxiosRetry()
    // axiosRetry.retry(axiosInstance, error)  放在外边可以默认重试
    let message = ''
    async function handleResponseError() {
      // const axiosRetry = new AxiosRetry()
      console.log('进入错误处理')
      const globalStore = useGlobalStore()
      switch (error.response?.status) {
        case 400:
          message = '请求错误(400)'
          break
        case 401:
          if (globalStore.isLogin) {
            const isRefresh: boolean = await refreshToken()
            // 重新请求
            if (isRefresh) {
              console.log(error,'error')
              error.config.headers['Authorization'] = `Bearer ${globalStore.getToken('access')}`
              // error.config.headers['Content-Type'] = `application/json; charset=utf-8`
              axiosRetry.retry(axiosInstance, error)
            }
          }else{
            message = '请先登录'
          }
          // 这里可以做清空storage并跳转到登录页的操作
          break
        case 403:
          message = '拒绝访问(403)'
          break
        case 404:
          message = '请求出错(404)'
          break
        case 408:
          message = '请求超时(408)'
          break
        case 500:
          message = '服务器错误(500)'
          break
        case 501:
          message = '服务未实现(501)'
          break
        case 502:
          message = '网络错误(502)'
          break
        case 503:
          message = '服务不可用(503)'
          break
        case 504:
          message = '网络超时(504)'
          break
        case 505:
          message = 'HTTP版本不受支持(505)'
          break
        default:
          message = '未知错误'
          break
      }
    }
    await handleResponseError()
    // 这里错误消息可以使用全局弹框展示出来
    if (message) {
      ElMessage.error({
        message,
        duration: 3000
      })
    }
    // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
    return Promise.reject(error.response)
  }
}
