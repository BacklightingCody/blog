<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Article, ArticleList, ArticleModule } from '@/interface/Article'
import matter from 'gray-matter'
import { getCurrentTime,formatDateFromISO } from '@/utils/time/useCurTime'
import iconReturn from './icons/iconReturn.vue'
import BackButton from './BackButton.vue'
// 使用 import.meta.glob 动态导入所有 Markdown 文件
const articles = import.meta.glob('@/posts/**/index.md')

const route = useRoute()
const curPath = ref('')

const articleList = ref<ArticleList>({
  category: '',
  subcategory: '',
  articles: [],
  total: 0
})

onMounted(async () => {
  const { category, subcategory } = route.params

  const filteredArticles = await Promise.all(
    Object.keys(articles)
      .filter((path) => path.includes(`/posts/${category}/${subcategory}/`))
      .map(async (path) => {
        const file = await articles[path]()
        const id = path.split('/').slice(-2, -1)[0]
        const article = file as ArticleModule;
        const title = article.frontmatter.title
        const date = article.frontmatter.date
        return {
          id,
          title: title || id,
          date: formatDateFromISO(date) || getCurrentTime()
        } as Article
      })
  )

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
    console.log('curpath:', curPath.value)
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
  <div class="relative max-w-2xl mx-auto p-4">
    <BackButton :buttonStyle="{width:'60px',height:'60px', borderRadius:'50%' }"><iconReturn></iconReturn></BackButton>
    <h1 class="text-2xl text-default-text font-600 my-10 ">加油，共 <span class="text-3xl font-800">{{ articleList.total
        }}</span> 文章</h1>
    <el-timeline class="relative">
      <el-timeline-item v-for="(article, index) in sortedArticles" :key="index">
        <!-- <span
          class="absolute flex items-center justify-center w-[20px] h-[20px] bg-blue-100 rounded-full -left-1 top-2 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <svg class="w-[15px] h-[15px] text-blue-800 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 20 20">
            <path
              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </span> -->
        <router-link :to="`${curPath}/${article.id}`" class="flex justify-between mb-2 text-xl font-semibold">
          <span class="text-default-text cursor-pointer article-title">{{ article.title }}</span>
          <time class="mb-2 text-sm ml-2 font-normal text-default-text leading-relaxed">
            {{ article.date }}
          </time>
        </router-link>

      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style lang="scss" scoped>
//动画效果
.article-title {
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    /* 下划线位置 */
    height: 3px;
    /* 下划线粗细 */
    width: 100%;
    background-color: var(--currency-color);
    transform-origin: left;
    /* 动画起点 */
    transform: scaleX(0);
    /* 初始状态 */
    transition: transform 0.4s ease;
    /* 延展和缩回时间 */
  }

  &:hover::after {
    transform: scaleX(1);
  }
}
</style>

<style lang="scss">
.el-timeline-item {
  .el-timeline-item__tail {
    border-left: 1px solid var(--currgb-color);
  }

  .el-timeline-item__node {
    background-color: var(--currgb-color);
  }
}
</style>
