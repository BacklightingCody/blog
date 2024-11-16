// 预加载会提前发起请求，将所请求的资源加载到内存中
const images = []
const maxPre = 3
export async function preLoadImages(max: number = 3) {
  const _images = images.slice()
  function loadImage() {
    const src = _images.shift()
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
      link.onload = resolve
      link.onerror = reject
      setTimeout(() => reject(new Error('timeout')), 10000)
    })
  }
  function _loadImage(maxPre) {
    loadImage().finally(() => {
      if (_images.length) {
        _loadImage(maxPre)
      }
    })
  }
  for (let i = 0; i < max; i++) {
    _loadImage(maxPre)
  }
}