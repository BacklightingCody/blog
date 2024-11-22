import { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

interface preloadImagesOptions {
  dir: string
  attrs?: {
    rel?: 'preload' | 'prefetch'
  }
}

const preloadImages = (opt: preloadImagesOptions): Plugin => {
  const { dir, attrs = {} } = opt
  console.log(attrs)
  return {
    name: 'vite-plugin-preload-images',
    transformIndexHtml(html, ctx) {
      // 使用 fs 读取指定目录
      const files = getFilesFromDir(dir, ctx.server?.config.publicDir || '')

      // 通过路径组合获取完整的文件路径
      const images = files.map(file => ctx.server?.config.base + file)
      console.log("images", images)

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

// 使用 Node.js fs 模块读取文件夹中的所有文件
const getFilesFromDir = (dir: string, publicDir: string): string[] => {
  try {
    // 获取目录下的所有文件
    const directoryPath = path.join(publicDir, dir)
    const files = fs.readdirSync(directoryPath)
    // 过滤出所有图片文件或符合条件的文件
    return files.filter(file => /\.(jpg|png|svg|jpeg|jfif)$/i.test(file))
  } catch (err) {
    console.error('Error reading directory:', err)
    return []
  }
}

export default preloadImages
