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
    name: '高中',
    icon: iconHTML,  // 指定图标组件
    color: '#E34F26',
    backgroundImage: '/animial/animial1.jfif',
    link:'/docs/experience/senior'
  },
  {
    name: '大学',
    icon: iconCSS,  // 指定图标组件
    color: '#1572B6',
    backgroundImage: '/animial/animial2.jfif',
    link:'/docs/experience/college'
  },
  {
    name: '社会',
    icon: iconJS,  // 指定图标组件
    color: '#F7DF1E',
    backgroundImage: '/animial/animial3.jfif',
    link:'/docs/experience/society'
  },
  {
    name: '生活',
    icon: iconVue,  // 指定图标组件
    color: '#42B883',
    backgroundImage: '/animial/animial4.jfif',
    link:'/docs/experience/life'
  },
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
