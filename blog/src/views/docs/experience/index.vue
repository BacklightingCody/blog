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
    subcategories: ['Forms', 'Tables', 'Media']
  },
  {
    name: '大学',
    icon: iconCSS,  // 指定图标组件
    color: '#1572B6',
    subcategories: ['Flexbox', 'Grid', 'Animations']
  },
  {
    name: 'JavaScript',
    icon: iconJS,  // 指定图标组件
    color: '#F7DF1E',
    subcategories: ['ES6', 'DOM Manipulation', 'Events']
  },
  {
    name: 'Vue.js',
    icon: iconVue,  // 指定图标组件
    color: '#42B883',
    subcategories: ['Components', 'Directives', 'Vue Router']
  },
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
