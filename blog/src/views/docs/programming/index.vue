<template>
  <div class="w-full">
    <CategoryCardList title="编程" :categories="categories"></CategoryCardList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryCardList from '@/components/CategoryCardList.vue'

// 导入不同的图标组件
import iconHTML from '@/components/icons/iconHTML.vue'
import iconCSS from '@/components/icons/iconCSS.vue'
import iconJS from '@/components/icons/iconJs.vue'
import iconVue from '@/components/icons/iconVue.vue'
import iconNode from '@/components/icons/iconNode.vue'
import iconNetwork from '@/components/icons/iconNetwork.vue'
import iconAlgorithms from '@/components/icons/iconAlgorithms.vue'
import iconBrowser from '@/components/icons/iconBrowser.vue'
// 数据源：为每个分类指定不同的 icon 组件
const categories = [
  {
    name: 'HTML',
    icon: iconHTML,  // 指定图标组件
    color: '#E34F26',
    backgroundImage: '/picture/animial/animial7.jfif',
    link: '/docs/programming/html'
  },
  {
    name: 'CSS',
    icon: iconCSS,  // 指定图标组件
    color: '#1572B6',
    backgroundImage: '/picture/animial/animial1.jfif',
    link: '/docs/programming/css'
  },
  {
    name: 'JavaScript',
    icon: iconJS,  // 指定图标组件
    color: '#F7DF1E',
    backgroundImage: '/picture/animial/animial2.jfif',
    link: '/docs/programming/javascript'
  },
  {
    name: 'Vue.js',
    icon: iconVue,  // 指定图标组件
    color: '#42B883',
    backgroundImage: '/picture/animial/animial3.jfif',
    link: '/docs/programming/vue'
  },
  {
    name: 'Node.js',
    icon: iconNode,  // 指定图标组件
    color: '#339933',
    backgroundImage: '/picture/animial/animial4.jfif',
    link: '/docs/programming/node'
  }, {
    name: 'Network',
    icon: iconNetwork,  // 指定图标组件
    color: '#339933',
    backgroundImage: '/picture/animial/animial5.jfif',
    link: '/docs/programming/network'
  },
  {
    name: 'Algorithms',
    icon: iconAlgorithms,
    color: '#00000',
    backgroundImage: '/picture/animial/animial6.jfif',
    link: '/docs/programming/algorithms'
  },
  {
    name: 'Browser',
    icon: iconBrowser,
    color: '#000000',
    backgroundImage: '/picture/animial/animial8.jfif',
    link: '/docs/programming/browser'
  }
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
