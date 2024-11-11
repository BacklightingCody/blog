// import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite' //引入unocss
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' //引入element-plus
import { VantResolver } from '@vant/auto-import-resolver' //引入vant
// import viteEslint from 'vite-plugin-eslint';   //eslint插件
import viteStylelint from '@amatlash/vite-plugin-stylelint';
import Markdown from 'vite-plugin-md'
import MarkdownPages from 'vite-plugin-pages'
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
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({
      markdownItOptions: {
        html: true, // 允许 HTML 标签
        linkify: true, // 自动将 URL 转换为链接
        typographer: true // 美化标点符号
      }
    }),
    MarkdownPages({
      dirs: 'posts', // 指定目录，插件会扫描此目录下的文件
      extensions: ['md'], // 扩展名设置为 md 文件
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
