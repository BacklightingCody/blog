import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({
  // ...
  title: "backlighting's blog",
  description: 'blog docs',
  themeConfig: {
    sidebar:[],
    nav:[]
  },  //主题配置

  //引入网站图标，字体，注册service worker等等
  head: [

    //Adding Google Fonts
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' }
    ],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=TAG_ID' }
    ],

    //Using Google Analytics
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'TAG_ID');`
    ]
  ],
  lang: 'en-US',
  base: '/',   //The base URL the site will be deployed at
  cleanUrls: true,
  rewrites: {
  }, //用于自定义目录<-->URL映射
  srcDir: 'src/posts',  //srcDir 选项是相对于项目根目录解析的。
  outDir: 'dist',
  cacheDir:'.vitepress/cache',
  srcExclude: ['**/README.md', '**/TODO.md'], //排除项
  markdown: {
    html: true, // 允许 HTML 标签
    linkify: true, // 自动将 URL 转换为链接
    typographer: true, // 美化标点符号
    toc: {
      level: [2, 3],  // 指定要生成目录的标题级别，例如这里是 2 级和 3 级标题
    },
  }

  // vue: {
  //   template: {
  //     compilerOptions: {
  //       isCustomElement: (tag) => ['article-detail'].includes(tag)
  //     }
  //   }
  // }
})