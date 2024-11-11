<template>
  <div>
    <h1 class="text-default-currgb font-800 text-3xl my-10 text-center">{{ title }}</h1>
    <div class="flex flex-wrap gap-6 m-auto justify-center lg:justify-start">
      <CategoryCard v-for="category in categories" :key="category.name" :category="category"
        :backgroundImage="category.backgroundImage" :link="category.link" :width="width" :height="height" :isNewTab="isNewTab"
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
import { CategoryList } from '@/views/docs/interface/categoryList'
import { ca } from 'element-plus/es/locale/index.mjs';
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  categories: {
    type: Array as () => CategoryList[],
    required: true,
  },
  width: {
    type: Number,
    default: 320
  },
  height: {
    type: Number,
    default: 240
  },
  isNewTab: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
/* 在这里添加需要的样式 */
</style>
