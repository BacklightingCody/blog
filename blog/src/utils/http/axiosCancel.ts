import type { AxiosRequestConfig } from 'axios'

const pendingMap = new Map<string, AbortController>()

const getPendingUrl = (config: AxiosRequestConfig): string => {
  return [config.method, config.url].join('&')
}

export class AxiosCanceler {
  public addPending(config: AxiosRequestConfig): void {
    const url = getPendingUrl(config)
    if (!pendingMap.has(url)) {
      const controller = new AbortController()
      config.signal = config.signal || controller.signal
      pendingMap.set(url, controller)
      console.log('加入队列')
    }
  }

  public removePending(config: AxiosRequestConfig): void {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      pendingMap.delete(url)
      console.log('移除队列')
    }
  }

  public removeAllPending(): void {
    pendingMap.forEach((controller) => {
      controller.abort()
    })
    this.reset()
  }

  public reset(): void {
    pendingMap.clear()
  }
}
