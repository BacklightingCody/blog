<template>
  <div class="w-full">
    <template v-if="isDocsPage">
      <CategoryCardList :title="'文稿分类'" :categories="categories" backgroundImage="https://cdn.pixabay.com/photo/2024/08/20/14/21/ai-generated-8983471_640.jpg">
      </CategoryCardList>
    </template>
    <RouterView v-else></RouterView>
    <!-- <RouterView v-else></RouterView> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

import CategoryCardList from '@/components/CategoryCardList.vue'

import { useRoute } from 'vue-router'
// 导入不同的图标组件
import iconProgramme from '@/components/icons/iconProgramme.vue'
import iconTechnology from '@/components/icons/iconTechnology.vue'
import iconFoodMenu from '@/components/icons/iconRecipe.vue'
import iconPencil from '@/components/icons/iconPencil.vue'
import iconRainbow from '@/components/icons/iconRainbow.vue'


const route = useRoute()
const isDocsPage = computed(() => route.path == '/docs')
// 数据源
const categories = [
  {
    name: 'Programme',
    icon: iconProgramme,  // 指定图标组件
    color: '#E34F26',
    backgroundImage:'/picture/animial/animial1.jfif',
    link:'/docs/programming'
  },
  {
    name: 'Technology',
    icon: iconTechnology,  // 指定图标组件
    color: '#1572B6',
    backgroundImage:'/picture/animial/animial2.jfif',
    link:'/docs/technology'
  },
  {
    name: 'Experience',
    icon: iconRainbow,  // 指定图标组件
    color: '#F7DF1E',
    backgroundImage:'/picture/animial/animial3.jfif',
    link:'/docs/experience'
  },
  {
    name: 'Food Menu',
    icon: iconFoodMenu,  // 指定图标组件
    color: '#42B883',
    backgroundImage:'/picture/animial/animial4.jfif',
    link:'/docs/recipe'
  },
  {
    name: 'A word of the day',
    icon: iconPencil,  // 指定图标组件
    color: '#339933',
    backgroundImage:'/picture/animial/animial5.jfif',
    link:'/docs/motto'
  }
]
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
