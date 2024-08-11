import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
export default defineConfig({
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno(),
    presetIcons({
      /* options */
    })
    // ...custom presets
  ],
  theme: {
    colors: {
      // 使用 CSS 变量定义主题颜色
      'background-color': 'var(--background-color)',
      'text-color': 'var(--text-color)',
      'icon-color': 'var(--icon-color)',
      'accent-color': 'var(--accent-color)',
      'active-color': 'var(--active-color)',
      'inactive-color': 'var(--inactive-color)'
    }
  }
})
