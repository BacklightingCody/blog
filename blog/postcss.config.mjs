import postcssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import UnoCSS from '@unocss/postcss'

export default {
  plugins: [
    UnoCSS(),
    postcssPxToRem({
      rootValue: 16, // 根元素字体大小，通常设置为 16px
      propList: ['*'], // 需要转换的属性列表，* 表示所有属性
      unitPrecision: 5, // 转换后的精度
      replace: true, // 是否替换 px 为 rem
      mediaQuery: false, // 是否处理媒体查询中的 px
      minPixelValue: 0 // 小于此值的 px 不会被转换
    }),
    autoprefixer({
      // 配置选项
    }),
  ],
}