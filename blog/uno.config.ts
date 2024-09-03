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
      bgColor: 'var(--background-color)',
      iconColor: 'var(--icon-color)',
      accentColor: 'var(--accent-color)',
      borderColor: 'var(--border-color)',
      shadowColor: 'var(--shadow-color)',
      text:{
        primary: 'var(--text-color)',
        btn: 'var(--btn-text-color)',
      },
      btn:{
        primary: 'var(--btn-text-color)',
        active: 'var(--active-color)',
        inactive: 'var(--inactive-color)',
        hover: 'var(--hover-color)'
      }
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
