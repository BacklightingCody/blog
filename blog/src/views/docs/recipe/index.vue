<template>
  <div class="w-full">
    <h1 class="text-default-accent font-800 text-3xl my-10 text-center">菜谱</h1>
    <div class="flex flex-wrap gap-6 m-auto">
      <CategoryCard v-for="category in categories" :key="category.name" :category="category"
        class="flex-grow max-w-[calc(33.33%-16px)] min-w-[300px]">
        <template #icon>
          <!-- 根据分类动态渲染不同的图标 -->
          <component :is="category.icon" />
        </template>
      </CategoryCard>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryCard from '@/components/CategoryCard.vue'

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
    subcategories: ['Forms', 'Tables', 'Media']
  },
  {
    name: 'CSS',
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
  {
    name: 'Node.js',
    icon: iconNode,  // 指定图标组件
    color: '#339933',
    subcategories: ['Express', 'File System', 'APIs']
  }, {
    name: 'Network',
    icon: iconNetwork,  // 指定图标组件
    color: '#339933',
    subcategories: ['Express', 'File System', 'APIs']
  },
  {
    name: 'Algorithms',
    icon: iconAlgorithms,
    color: '#00000',
    subcategories: ['Sorting', 'Searching', 'Graphs']
  }
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
