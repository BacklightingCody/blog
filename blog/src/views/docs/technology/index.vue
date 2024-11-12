<template>
  <div class="w-full">
    <CategoryCardList title="技术" :categories="categories"></CategoryCardList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryCardList from '@/components/CategoryCardList.vue'
// 导入不同的图标组件
import iconScience from '@/components/icons/iconScience.vue'
import iconComponentLib from '@/components/icons/iconComponentLib.vue'
import iconAI from '@/components/icons/iconAI.vue'
import iconLargeModel from '@/components/icons/iconLargeModel.vue'
import iconDefault from '@/components/icons/iconDefault.vue'
// 数据源：为每个分类指定不同的 icon 组件
const categories = [
  {
    name: 'science',
    icon: iconScience,
    color: '#E34F26',
    backgroundImage: '/picture/technology/technology1.jfif',
    link: '/docs/technology/science'
  },
  {
    name: 'Lib',
    icon: iconComponentLib,
    color: '#42B883',
    backgroundImage: '/picture/technology/technology3.jfif',
    link: '/docs/technology/library'
  },
  {
    name: 'AI',
    icon: iconAI,
    color: '#339933',
    backgroundImage: '/picture/technology/technology4.jfif',
    link: '/docs/technology/AI'
  },
  {
    name: 'Large Model',
    icon: iconLargeModel,
    color: '#00000',
    backgroundImage: '/picture/technology/technology2.jfif',
    link: '/docs/technology/large_model'
  },
  {
    name: 'uncertainty',
    icon: iconDefault,
    color: '#339933',
    backgroundImage: '/picture/technology/technology5.jfif',
    link: '/docs/technology/data_structure'
  },

]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
