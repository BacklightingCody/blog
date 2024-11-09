<template>
  <div class="w-full">
    <CategoryCardList title="技术" :categories="categories"></CategoryCardList>
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
    name: 'science',
    icon: iconHTML,  // 指定图标组件
    color: '#E34F26',
    backgroundImage: '/picture/animial/animial7.jfif',
    link: '/docs/technology/science'
  },
  {
    name: 'Front-end',
    icon: iconCSS,  // 指定图标组件
    color: '#1572B6',
    backgroundImage: '/picture/animial/animial1.jfif',
    link: '/docs/technology/front_end'
  },
  {
    name: 'Backend',
    icon: iconJS,  // 指定图标组件
    color: '#F7DF1E',
    backgroundImage: '/picture/animial/animial2.jfif',
    link: '/docs/technology/back_end'
  },
  {
    name: 'Lib',
    icon: iconVue,  // 指定图标组件
    color: '#42B883',
    backgroundImage: '/picture/animial/animial3.jfif',
    link: '/docs/technology/library'
  },
  {
    name: 'AI',
    icon: iconNode,  // 指定图标组件
    color: '#339933',
    backgroundImage: '/picture/animial/animial4.jfif',
    link: '/docs/technology/AI'
  }, {
    name: 'Data Structure',
    icon: iconNetwork,  // 指定图标组件
    color: '#339933',
    backgroundImage: '/picture/animial/animial5.jfif',
    link: '/docs/technology/data_structure'
  },
  {
    name: 'Large Model',
    icon: iconAlgorithms,
    color: '#00000',
    backgroundImage: '/picture/animial/animial6.jfif',
    link: '/docs/technology/large_model'
  }
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
