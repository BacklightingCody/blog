import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { AxiosCanceler } from './axiosCancel'
import { AxiosRetry } from './axiosRetry'
import {
  AxiosTransform,
  CreateAxiosOptions,
  RequestOptions
} from './axiosTransform'

class AxiosService {
  private axiosInstance: AxiosInstance
  constructor(
    config: AxiosRequestConfig,
    private transform: AxiosTransform | null = null
  ) {
    this.axiosInstance = axios.create(config)
    this.setupInterceptors()
  }

  private setupInterceptors() {
    const axiosCanceler = new AxiosCanceler()
    const axiosRetry = new AxiosRetry()

    // Request Interceptor
    this.axiosInstance.interceptors.request.use(
      (interconfig: AxiosRequestConfig) => {
        let config = interconfig as InternalAxiosRequestConfig //兼容ts类型
        axiosCanceler.addPending(config)

        if (this.transform?.beforeRequestHook) {
          config = this.transform.beforeRequestHook(
            config as any,
            {} as RequestOptions
          )
        }

        if (this.transform?.requestInterceptors) {
          config = this.transform.requestInterceptors(
            config as any,
            {} as RequestOptions
          )
        }

        return config
      },
      (error) => {
        this.transform?.requestInterceptorsCatch?.(error)
        return Promise.reject(error)
      }
    )

    // Response Interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        axiosCanceler.removePending(response.config)
        if (this.transform?.responseInterceptors) {
          response = this.transform.responseInterceptors(response)
        }
        if (this.transform?.transformResponseHook) {
          return this.transform.transformResponseHook(response, {} as any)
        }

        return response
      },
      (error) => {
        if (this.transform?.responseInterceptorsCatch) {
          return this.transform.responseInterceptorsCatch(
            this.axiosInstance,
            error
          )
        } else {
          return axiosRetry.retry(this.axiosInstance, error)
        }
      }
    )
  }
  public request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.request<any, T>(config)
  }
}

export default AxiosService
