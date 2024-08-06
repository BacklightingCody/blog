import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'   //引入unocss
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'   //引入element-plus
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue'],   //导入vue
      dts: "/auto-import.d.ts",   //自动导入的声明文件
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        includePaths: [
          path.resolve(__dirname, 'src/sass')
        ],
      }
    }
  }
})
