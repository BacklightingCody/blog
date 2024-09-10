import postcssPxToRem from 'postcss-pxtorem'
import autoprefixer from 'autoprefixer'
import UnoCSS from '@unocss/postcss'

export default {
  plugins: [
    UnoCSS(),
    autoprefixer({
      // 配置选项
    })
  ]
}
