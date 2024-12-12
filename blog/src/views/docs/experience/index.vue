<template>
  <div class="w-full">
    <CategoryCardList title="经历" :categories="categories"></CategoryCardList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryCardList from '@/components/CategoryCardList.vue'
// 导入不同的图标组件
import iconReading from '@/components/icons/iconReading.vue'
import iconUniversity from '@/components/icons/iconUniversity.vue';
import IconDefault from '@/components/icons/iconDefault.vue';
import iconSociety from '@/components/icons/iconSociety.vue';
import iconLife from '@/components/icons/iconLife.vue';
// 数据源：为每个分类指定不同的 icon 组件
const categories = [
  {
    name: '大学',
    icon: iconUniversity,  // 指定图标组件
    color: '#1572B6',
    backgroundImage: '/picture/animial/animial12.avif',
    link:'/docs/experience/college'
  },
  {
    name: '社会',
    icon: iconSociety,  // 指定图标组件
    color: '#F7DF1E',
    backgroundImage: '/picture/animial/animial13.avif',
    link:'/docs/experience/society'
  },
  {
    name: '生活',
    icon: iconLife,  // 指定图标组件
    color: '#42B883',
    backgroundImage: '/picture/animial/animial14.avif',
    link:'/docs/experience/life'
  },
  {
    name: 'Reading',
    icon: iconReading,  // 指定图标组件
    color: '#E34F26',
    backgroundImage: '/picture/animial/animial17.avif',
    link:'/docs/experience/reading'
  },
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
