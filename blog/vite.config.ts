// import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite' //引入unocss
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
//@ts-ignore
import preloadImages from './plugins/preloadImage.ts';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' //引入element-plus
import { VantResolver } from '@vant/auto-import-resolver' //引入vant
// import viteEslint from 'vite-plugin-eslint';   //eslint插件
import viteStylelint from '@amatlash/vite-plugin-stylelint';
import Markdown from 'vite-plugin-md'
import MarkdownPages from 'vite-plugin-pages'
// @ts-ignore: 暂时忽略类型检查
import markdownItToc from 'markdown-it-table-of-contents'
import markdownItAnchor from 'markdown-it-anchor'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      VITE_API_BASE_URL: process.env.VITE_API_BASE_URL
    }
  },
  publicDir: 'public',
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // 支持 .vue 和 .md 文件
    }),
    preloadImages({
      dir: ["picture/**/*.{jpg,png,svg,jfif,avif}","avatar.jpg","icon404.png","backlighting.svg"],
      attrs: {
        rel: 'preload'
      }
    }),
    Markdown(
      {
        markdownItSetup(md) {
          md.use(markdownItAnchor)
          md.use(markdownItToc, {
            includeLevel: [1, 2, 3], // 指定生成 TOC 的标题级别
          })
        },
        wrapperClasses: 'markdown-body', // 自定义外部容器类
        frontmatter: true, // 启用 frontmatter
      }
    ), // Markdown 支持 Vue 文件系统
    MarkdownPages({
      dirs: 'posts', // 扫描 posts 目录
      extensions: ['md'], // 扫描 Markdown 文件
    }),
    // viteEslint(),
    // viteStylelint({ exclude: /node_modules/ }),
    UnoCSS(),
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()]
    }),
    AutoImport({
      resolvers: [ElementPlusResolver(), VantResolver()],
      imports: ['vue'], //导入vue
      dts: './src/types/auto-import.d.ts', //自动导入的声明文件
      eslintrc: {
        enabled: true, //默认关闭eslint
        filepath: './.eslintrc-auto-import.json' //eslint配置文件路径
      }
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src/types')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve(__dirname, 'src/sass')],
        additionalData: '@use "@/sass//themes/_theme.scss" as *;'
      }
    }
  },
  server: {
    port: 5173, //设置服务启动端口号
    open: false, //设置服务器启动时是否自动打开浏览器
    cors: true, //允许跨域
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path: any) => path.replace(/^\/api/, '')
      }
    }
  }
})
