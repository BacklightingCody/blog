<template>
  <div class="w-full">
    <CategoryCardList title="经历" :categories="categories"></CategoryCardList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryCardList from '../components/CategoryCardList.vue'
// 导入不同的图标组件
import iconHTML from '@/components/icons/iconHTML.vue'
import iconCSS from '@/components/icons/iconCSS.vue'
import iconJS from '@/components/icons/iconJs.vue'
import iconVue from '@/components/icons/iconVue.vue'
import iconNode from '@/components/icons/iconNode.vue'
import iconNetwork from '@/components/icons/iconNetwork.vue'
import iconAlgorithms from '@/components/icons/iconAlgorithms.vue'
// 数据源：为每个分类指定不同的 icon 组件
const categories = [
  {
    name: 'HTML',
    icon: iconHTML,  // 指定图标组件
    color: '#E34F26',
    backgroundImage: '/animial/animial7.jfif'
  },
  {
    name: 'CSS',
    icon: iconCSS,  // 指定图标组件
    color: '#1572B6',
    backgroundImage: '/animial/animial1.jfif'
  },
  {
    name: 'JavaScript',
    icon: iconJS,  // 指定图标组件
    color: '#F7DF1E',
    backgroundImage: '/animial/animial2.jfif'
  },
  {
    name: 'Vue.js',
    icon: iconVue,  // 指定图标组件
    color: '#42B883',
    backgroundImage: '/animial/animial3.jfif'
  },
  {
    name: 'Node.js',
    icon: iconNode,  // 指定图标组件
    color: '#339933',
    backgroundImage: '/animial/animial4.jfif'
  }, {
    name: 'Network',
    icon: iconNetwork,  // 指定图标组件
    color: '#339933',
    backgroundImage: '/animial/animial5.jfif'
  },
  {
    name: 'Algorithms',
    icon: iconAlgorithms,
    color: '#00000',
    backgroundImage: '/animial/animial6.jfif'
  }
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
