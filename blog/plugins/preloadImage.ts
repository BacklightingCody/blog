import { Plugin } from 'vite'
import fg from 'fast-glob'

interface preloadImagesOptions {
  dir: string,
  attrs: {
    rel: 'preload' | 'prefetch'
  }
}
export const preloadImages = (opt: preloadImagesOptions): Plugin => {
  const { dir, attrs = {} } = opt
  return {
    name: 'vite-plugin-preload-images',
    transformIndexHtml(html, ctx) {
      const files = fg.sync(dir, {
        //获取指定的public资源位置
        cwd: ctx.server?.config.publicDir
      })
      const images = files.map(file => ctx.server?.config.base + file)
      
      return images.map(item => {
        return {
          tag: 'link',
          attrs: {
            rel: 'prefetch',
            as: 'image',
            href: item,
            ...attrs,
          }
        }
      })
    }
  }
}