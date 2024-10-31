<template>
  <div>
    <h1 class="text-default-accent font-800 text-3xl my-10 text-center">{{ title }}</h1>
    <div class="flex flex-wrap gap-6 m-auto justify-center lg:justify-start">
      <CategoryCard v-for="category in categories" :key="category.name" :category="category"
        :backgroundImage="backgroundImage"
        class="flex-grow lg:max-w-[calc(33.33%-16px)] xl:max-w-[calc(33.33%-16px)] sm:w-full md:w-[calc(50%-16px)] 2xl:w-[calc(25%-16px)]">
        <template #icon>
          <component :is="category.icon" />
        </template>
      </CategoryCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import CategoryCard from '@/components/CategoryCard.vue' // 确保导入了你的CategoryCard组件
import { CategoryList } from '../interface/categoryList'
const props = defineProps<{
  title: string;
  categories: CategoryList[]; // 使用定义的接口
  backgroundImage?: string; // 可选属性
}>()

console.log(props.title)
console.log(props.categories)
console.log(props.backgroundImage)
</script>

<style scoped>
/* 在这里添加需要的样式 */
</style>
