import {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosInstance
} from 'axios'
// 定义 CreateAxiosOptions 接口
export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  requestOptions?: RequestOptions
}

// 定义 RequestOptions 接口，包含请求的其他选项
export interface RequestOptions {
  retryRequest?: {
    count: number
    waitTime: number
  }
}
export abstract class AxiosTransform {
  beforeRequestHook?(
    config: InternalAxiosRequestConfig,
    options: RequestOptions
  ): InternalAxiosRequestConfig
  transformResponseHook?(res: AxiosResponse<any>, options: RequestOptions): any
  requestCatchHook?(e: Error, options: RequestOptions): Promise<any>
  requestInterceptors?(
    config: InternalAxiosRequestConfig,
    options: RequestOptions
  ): InternalAxiosRequestConfig
  responseInterceptors?(res: AxiosResponse<any>): AxiosResponse<any>
  requestInterceptorsCatch?(error: Error): void
  responseInterceptorsCatch?(
    axiosInstance: AxiosInstance,
    error: Error
  ): Promise<any>
}
