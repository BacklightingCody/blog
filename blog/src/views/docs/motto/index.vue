<template>
  <div class="w-full">
    <CategoryCardList title="一言" :categories="categories"></CategoryCardList>
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
    name: 'Inspirational',
    icon: iconHTML,  // 指定图标组件
    color: '#E34F26',
    backgroundImage: '/picture/animial/animial1.jfif',
    link: '/docs/motto/Inspirational'
  },
  {
    name: 'innovation',
    icon: iconCSS,  // 指定图标组件
    color: '#1572B6',
    backgroundImage: '/picture/animial/animial2.jfif',
    link: '/docs/motto/innovation'
  },
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
