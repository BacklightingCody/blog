import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios'
import { AxiosTransform, RequestOptions } from './axiosTransform'

// 创建自定义的 AxiosTransform 实现
export class CustomTransform extends AxiosTransform {
  // 请求前的钩子函数
  beforeRequestHook(
    config: InternalAxiosRequestConfig,
    options: RequestOptions
  ): InternalAxiosRequestConfig {
    // 在请求头中添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }

  // 响应数据处理钩子函数
  transformResponseHook(res: AxiosResponse<any>, options: RequestOptions): any {
    const { data } = res
    console.log(res)
    // if (data.code !== 0) {
    //   throw new Error(data.message || '请求失败')
    // }
    return data
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
    // 可以在这里对所有的请求统一添加某些参数或者处理一些特殊逻辑
    config.headers['X-Request-Id'] = 'request-id-placeholder'
    return config
  }

  responseInterceptors(res: AxiosResponse<any>): AxiosResponse<any> {
    // 假设需要在所有响应后都记录日志
    console.log('响应数据:', res.data)
    return res
  }
  // 响应拦截器错误处理钩子函数
  responseInterceptorsCatch(
    axiosInstance: AxiosInstance,
    error: AxiosError
  ): Promise<any> {
    // 可以尝试做一些全局的错误重试或错误处理
    let message = ''
    switch (error.response?.status) {
      case 400:
        message = '请求错误(400)'
        break
      case 401:
        message = '未授权，请重新登录(401)'
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
        message = `连接出错(${error.response.status})!`
    }
    // 这里错误消息可以使用全局弹框展示出来
    // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
    return Promise.reject(error.response)
  }
}
