import type { AxiosRequestConfig } from 'axios'

const pendingMap = new Map<string, AbortController>()

const getPendingUrl = (config: AxiosRequestConfig): string => {
  return [config.method, config.url].join('&')
}

export class AxiosCanceler {
  public addPending(config: AxiosRequestConfig): void {
    this.removePending(config)
    const url = getPendingUrl(config)
    const controller = new AbortController()
    config.signal = config.signal || controller.signal
    if (!pendingMap.has(url)) {
      pendingMap.set(url, controller)
    }
  }

  public removeAllPending(): void {
    pendingMap.forEach((controller) => {
      controller.abort()
    })
    this.reset()
  }

  public removePending(config: AxiosRequestConfig): void {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      const controller = pendingMap.get(url)
      controller?.abort()
      pendingMap.delete(url)
    }
  }

  public reset(): void {
    pendingMap.clear()
  }
}
