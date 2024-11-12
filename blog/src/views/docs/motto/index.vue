<template>
  <div class="w-full">
    <CategoryCardList title="一言" :categories="categories"></CategoryCardList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryCardList from '@/components/CategoryCardList.vue'

// 导入不同的图标组件
import iconInspiration from '@/components/icons/iconInspiration.vue';
import iconInnovation from '@/components/icons/iconInnovation.vue';
// 数据源：为每个分类指定不同的 icon 组件
const categories = [
  {
    name: 'Inspirational',
    icon: iconInspiration,  // 指定图标组件
    color: '#E34F26',
    backgroundImage: '/picture/technology/technology8.jfif',
    link: '/docs/motto/Inspirational'
  },
  {
    name: 'innovation',
    icon: iconInnovation,  // 指定图标组件
    color: '#1572B6',
    backgroundImage: '/picture/technology/technology9.jfif',
    link: '/docs/motto/innovation'
  },
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
