<template>
  <div class="w-full">
    <CategoryCardList title="菜谱" :categories="categories"></CategoryCardList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryCardList from '@/components/CategoryCardList.vue'

// 导入不同的图标组件
import iconSteam from '@/components/icons/iconSteam.vue';
import iconFry from '@/components/icons/iconFry.vue';
import iconStirFry from '@/components/icons/iconStirFry.vue';
// 数据源：为每个分类指定不同的 icon 组件
const categories = [
  {
    name: '清蒸',
    icon: iconSteam,  // 指定图标组件
    color: '#E34F26',
    backgroundImage: '/picture/recipe/recipe1.jfif',
    link:'/docs/recipe/steam'
  },
  {
    name: '油炸',
    icon: iconFry,  // 指定图标组件
    color: '#1572B6',
    backgroundImage: '/picture/recipe/recipe2.jfif',
    link:'/docs/recipe/fry'
  },
  {
    name: '爆炒',
    icon: iconStirFry,  // 指定图标组件
    color: '#42B883',
    backgroundImage: '/picture/recipe/recipe3.jfif',
    link:'/docs/recipe/stir_fry'
  },
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
