<template>
  <div class="w-full">

    <template v-if="isDocsPage">
      <h1 class="text-default-accent font-800 text-3xl my-10 text-center">文稿分类</h1>
      <div class="flex flex-wrap gap-6 m-auto">
        <CategoryCard v-for="category in categories" :key="category.name" :category="category"
          class="flex-grow max-w-[calc(33.33%-16px)] min-w-[300px]">
          <template #icon>
            <!-- 根据分类动态渲染不同的图标 -->
            <component :is="category.icon" />
          </template>
        </CategoryCard>
      </div>
    </template>
    <RouterView v-else></RouterView>
    <!-- <RouterView v-else></RouterView> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryCard from '@/components/CategoryCard.vue'
import { useRoute } from 'vue-router'
// 导入不同的图标组件
import iconProgramme from '@/components/icons/iconProgramme.vue'
import iconTechnology from '@/components/icons/iconTechnology.vue'
import iconFoodMenu from '@/components/icons/iconRecipe.vue'
import iconPencil from '@/components/icons/iconPencil.vue'
import iconRainbow from '@/components/icons/iconRainbow.vue'


const route = useRoute()
const isDocsPage = computed(() => route.path == '/docs')
console.log(isDocsPage.value)
// 数据源
const categories = ref([
  {
    name: 'Programme',
    icon: iconProgramme,  // 指定图标组件
    color: '#E34F26',
    subcategories: ['Forms', 'Tables', 'Media']
  },
  {
    name: 'Technology',
    icon: iconTechnology,  // 指定图标组件
    color: '#1572B6',
    subcategories: ['Flexbox', 'Grid', 'Animations']
  },
  {
    name: 'Experience',
    icon: iconRainbow,  // 指定图标组件
    color: '#F7DF1E',
    subcategories: ['ES6', 'DOM Manipulation', 'Events']
  },
  {
    name: 'Food Menu',
    icon: iconFoodMenu,  // 指定图标组件
    color: '#42B883',
    subcategories: ['Components', 'Directives', 'Vue Router']
  },
  {
    name: 'A word of the day',
    icon: iconPencil,  // 指定图标组件
    color: '#339933',
    subcategories: ['Express', 'File System', 'APIs']
  }
])
</script>

<style scoped lang="scss">
/* 添加样式 */
</style>
