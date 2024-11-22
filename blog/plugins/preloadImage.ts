import { Plugin } from 'vite'
import fg from 'fast-glob';

interface preloadImagesOptions {
  dir: string,
  attrs?: {
    rel?: 'preload' | 'prefetch'
  }
}
const preloadImages = (opt: preloadImagesOptions): Plugin => {
  const { dir, attrs = {} } = opt
  // console.log(attrs)
  return {
    name: 'vite-plugin-preload-images',
    transformIndexHtml(html, ctx) {
      // console.log('111')
      console.log('publicDir:', ctx.server?.config.publicDir);
      const files = fg.sync(dir, {
        //获取指定的public资源位置
        cwd: ctx.server?.config.publicDir||'public'
      })
      // console.log("flies", files)
      const images = files.map(file => (ctx.server?.config.base||'/') + file)
      // console.log("images", images)
      return images.map(href => {
        return {
          tag: 'link',
          attrs: {
            rel: 'prefetch',
            as: 'image',
            href: href,
            ...attrs,
          }
        }
      })
    }
  }
}

export default preloadImages