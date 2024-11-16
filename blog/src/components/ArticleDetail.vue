<template>
  <div class="article-detail flex flex-col gap-[20px] p-10 bg-default-currency text-default-text">
    <!-- 外部容器布局 -->
    <header class="article-header text-default-text text-center">
      <h1>{{ articleTitle }}</h1>
      <p class="article-date">发布日期：{{ articleDate }}</p>
    </header>
    <aside class="article-toc text-default-text" v-if="markdownToc">
      <h2>目录</h2>
      <div v-html="markdownToc" />
    </aside>
    <main class="article-content">
      <component v-if="markdownContent" :is="markdownContent" />
      <div v-else>Loading...</div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const markdownContent = ref(null) // Markdown 主内容
const markdownToc = ref(null) // Markdown 的 TOC（目录）
const articleTitle = ref('') // 文章标题
const articleDate = ref('') // 文章发布日期

onMounted(async () => {
  try {
    const { category, subcategory, article } = route.params
    console.log(category, subcategory, article, 'Loading article...')

    // 动态加载 Markdown 文件
    const module = await import(`@/posts/${category}/${subcategory}/${article}.md`)
    markdownContent.value = module.default

    // 解析 frontmatter 的元数据
    const { frontmatter, toc } = module
    console.log(toc)
    articleTitle.value = frontmatter.title || '无标题'
    articleDate.value = frontmatter.date || '未知日期'

    // 动态生成 TOC 内容
    markdownToc.value = toc
    console.log('TOC Content:', markdownToc.value)
  } catch (error) {
    console.error('Failed to load article:', error)
  }
})
</script>

<style scoped>
.article-detail {
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 1);
}


.article-header .article-date {
  font-size: 0.9rem;
  color: #999;
  margin-top: 0.5em;
}

.article-content {
  margin-top: 20px;
  line-height: 2;
}

/* Markdown 样式 */
:deep(h1) {
  font-size: 2em;
  margin-bottom: 1em;
}

:deep(h2) {
  font-size: 1.5em;
  margin: 1em 0;
}

:deep(p) {
  margin: 1em 0;
  line-height: 1.6;
}

:deep(code) {
  background-color: #f4f4f4;
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

:deep(pre) {
  background-color: #f4f4f4;
  padding: 1em;
  border-radius: 5px;
  overflow-x: auto;
}
</style>
