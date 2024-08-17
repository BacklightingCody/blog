import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

export class AxiosRetry {
  public retry(axiosInstance: AxiosInstance, error: AxiosError): Promise<any> {
    const config = error.config as AxiosRequestConfig & {
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
    return this.delay(waitTime).then(() => axiosInstance(config))
  }

  private delay(waitTime: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, waitTime))
  }
}
