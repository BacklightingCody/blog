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
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue'], //导入vue
      dts: './src/types/auto-import.d.ts' //自动导入的声明文件
    }),
    Components({
      resolvers: [ElementPlusResolver()]
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
  }
})
