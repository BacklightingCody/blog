import pxtorem from 'postcss-pxtorem'
import pxToViewport from 'postcss-px-to-viewport'

import autoprefixer from 'autoprefixer'
import UnoCSS from '@unocss/postcss'

export default {
  plugins: [
    UnoCSS(),
    autoprefixer({}),
    // pxToViewport({
    //   viewportWidth: 1024, // 设计稿的视口宽度，比如设计稿是基于375px宽度的
    //   unitPrecision: 5,   // 转换后的精度
    //   viewportUnit: 'vw', // 使用的单位
    //   selectorBlackList: ['.ignore', '.hairlines'], // 选择器黑名单，不转换这些类
    //   minPixelValue: 1,   // 最小的单位不转换
    //   mediaQuery: false   // 是否允许在媒体查询中转换 `px`
    // }),
    pxtorem({
      rootValue: 16,     // 根元素的字体大小，1rem = 16px
      unitPrecision: 5,  // 转换后的精度
      propList: ['*'],   // 需要转换的属性列表，* 代表所有属性都转换
      selectorBlackList: ['.ignore'], // 忽略转换的选择器
      replace: true,     // 替换而不是追加
      mediaQuery: false, // 是否允许在媒体查询中转换 `px`
      minPixelValue: 1   // 小于1px的值不转换
    })
  ]
}
