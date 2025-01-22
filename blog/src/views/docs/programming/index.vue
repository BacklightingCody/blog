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
import iconReact from '@/components/icons/iconReact.vue'
import iconDatabase from '@/components/icons/iconDatabase.vue'
import iconLinux from '@/components/icons/iconLinux.vue'
// 数据源：为每个分类指定不同的 icon 组件
const categories = [
  {
    name: 'HTML',
    icon: iconHTML,  // 指定图标组件
    color: '#E34F26',
    backgroundImage: '/picture/animial/animial7.avif',
    link: '/docs/programming/html'
  },
  {
    name: 'CSS',
    icon: iconCSS,  // 指定图标组件
    color: '#1572B6',
    backgroundImage: '/picture/animial/animial1.avif',
    link: '/docs/programming/css'
  },
  {
    name: 'JavaScript',
    icon: iconJS,  // 指定图标组件
    color: '#F7DF1E',
    backgroundImage: '/picture/animial/animial2.avif',
    link: '/docs/programming/javascript'
  },
  {
    name: 'Vue.js',
    icon: iconVue,  // 指定图标组件
    color: '#42B883',
    backgroundImage: '/picture/animial/animial3.avif',
    link: '/docs/programming/vue'
  },
  {
    name: 'Node.js',
    icon: iconNode,  // 指定图标组件
    color: '#339933',
    backgroundImage: '/picture/animial/animial4.avif',
    link: '/docs/programming/node'
  }, {
    name: 'Network',
    icon: iconNetwork,  // 指定图标组件
    color: '#339933',
    backgroundImage: '/picture/animial/animial5.avif',
    link: '/docs/programming/network'
  },
  {
    name: 'Algorithms',
    icon: iconAlgorithms,
    color: '#00000',
    backgroundImage: '/picture/animial/animial6.avif',
    link: '/docs/programming/algorithms'
  },
  {
    name: 'Browser',
    icon: iconBrowser,
    color: '#000000',
    backgroundImage: '/picture/animial/animial8.avif',
    link: '/docs/programming/browser'
  },
  {
    name: 'React',
    icon: iconReact,
    color: '#61DAFB',
    backgroundImage: '/picture/animial/animial9.avif',
    link: '/docs/programming/react'
  },
  {
    name: 'Database',
    icon: iconDatabase,
    color: '#61DAFB',
    backgroundImage: '/picture/animial/animial10.avif',
    link: '/docs/programming/database'
  },
  {
    name: 'Linux',
    icon: iconLinux,
    color: '#61DAFB',
    backgroundImage: '/picture/animial/animial11.avif',
    link: '/docs/programming/linux'
  }
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
