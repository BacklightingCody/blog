import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
export default defineConfig({
  // content: {
  //   filesystem: ['**/*.{html,js,ts,jsx,tsx,vue}']
  // },
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
      default: {
        bg: 'var(--background-color)',
        text: 'var(--text-color)',
        btnText: 'var(--btn-text-color)',
        shadow: 'var(--shadow-color)',
        icon: 'var(--icon-color)',
        border: 'var(--border-color)',
        currency: 'var(--currency-color)',
        currgb: 'var(--currgb-color)',
        accent: 'var(--accent-color)'
      },
      active: {
        btnText: 'var(--active-btn-text)'
      },
      hover: {
        btnText: 'var(--btn-hover-text-color)'
      },
      inactive: {},
      primary: {},
      warning: {}
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  }
})
