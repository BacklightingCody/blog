import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
export default defineConfig({
  // ...
  title: "backlighting's blog",
  description: 'blog docs',
  themeConfig: {},  //主题配置
  head: [],    //引入网站图标，字体，注册service worker等等
  lang: 'en-US',
  base: '/',
  cleanUrls: true,
  rewrites: {
  }, //用于自定义目录<-->URL映射
  srcDir: '',  //srcDir 选项是相对于项目根目录解析的。
  outDir: 'dist',
  srcExclude: ['**/README.md', '**/TODO.md'], //排除项
  markdown: {
    // @vitepress-demo-preview的配置
    config(md) {
      // 支持区块内的方式展示 demo 和示例代码
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },

  // vue: {
  //   template: {
  //     compilerOptions: {
  //       isCustomElement: (tag) => ['article-detail'].includes(tag)
  //     }
  //   }
  // }
})