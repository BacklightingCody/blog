<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Article, ArticleList } from '@/interface/Article'
// 使用 import.meta.glob 动态导入所有 Markdown 文件
const articles = import.meta.glob('@/posts/**/*.md')

const route = useRoute()
const curPath = ref('')

const articleList = ref<ArticleList>({
  category: '',
  subcategory: '',
  articles: [],
  total: 0
})

onMounted(() => {
  const { category, subcategory } = route.params

  // 初始化 `articleList`，只包含匹配当前分类和子分类的文章
  const filteredArticles = Object.keys(articles)
    .filter((path) => path.includes(`/posts/${category}/${subcategory}/`))
    .map((path) => {
      const fileName = path.split('/').pop() || 'unknown'
      const id = fileName.replace('.md', '')
      return {
        id,
        title: fileName.replace('.md', ''),
        date: '2024-11-08'  // 示例日期，可改为实际提取的日期
      } as Article
    })

  // 更新 articleList
  articleList.value = {
    category: category as string,
    subcategory: subcategory as string,
    articles: filteredArticles,
    total: filteredArticles.length
  }

  // 跳转路由监控
  watch(() => route.path, (newPath) => {
    curPath.value = newPath
  },
    { immediate: true }
  )
})

// 排序文章列表
const sortedArticles = computed(() => {
  return [...articleList.value.articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
console.log(sortedArticles.value)
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-xl text-default-text font-600 my-5 ">加油，共 <span class="text-2xl font-800">{{ articleList.total
        }}</span> 文章</h1>
    <ul class="relative border-l border-gray-200 dark:border-gray-700">
      <li v-for="(article, index) in sortedArticles" :key="index" class="mb-10 ml-6">
        <span
          class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <svg class="w-3 h-3 text-blue-800 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 20 20">
            <path
              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </span>
        <router-link :to="`${curPath}/${article.id}`"
          class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          {{ article.title }}
        </router-link>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {{ article.date }}
        </time>
      </li>
    </ul>
  </div>
</template>
