import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { AxiosCanceler } from './axiosCancel'
export class AxiosRetry {
  private axiosCanceler: AxiosCanceler

  constructor() {
    this.axiosCanceler = new AxiosCanceler()
  }
  public retry(axiosInstance: AxiosInstance, error: AxiosError): Promise<any> {
    const config = { ...error.config } as AxiosRequestConfig & {
      __retryCount?: number
      requestOptions?: { retryRequest?: { waitTime?: number; count?: number } }
    }

    const { waitTime = 1000, count = 3 } =
      config.requestOptions?.retryRequest ?? {}
    config.__retryCount = config.__retryCount || 0

    if (config.__retryCount >= count) {
      return Promise.reject(error)
    }

    config.__retryCount += 1
    console.log(`Retrying request... Attempt #${config.__retryCount}`)
    // 临时移除 pendingMap 中的 URL 避免重试期间被取消
    this.axiosCanceler.removePending(config)

    return this.delay(waitTime)
      .then(() => {
        // 在重试时为新请求生成新的 AbortController
        this.axiosCanceler.addPending(config)
        return axiosInstance(config)
      })
      .finally(() => {
        // 重试请求完成或失败后，移除 pendingMap 中的 URL
        this.axiosCanceler.removePending(config)
      })
  }

  private delay(waitTime: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, waitTime))
  }
}
