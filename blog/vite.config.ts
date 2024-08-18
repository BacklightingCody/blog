// import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite' //引入unocss
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' //引入element-plus
// import eslintPlugin from 'vite-plugin-eslint'    //eslint插件
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // eslintPlugin(),
    UnoCSS(),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
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
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
