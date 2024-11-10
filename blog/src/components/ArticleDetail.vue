<template>
  <div class="article-detail">
    <Article1></Article1>
    <component v-if="markdownContent" :is="markdownContent" />
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const markdownContent = ref(null)

onMounted(async () => {
  try {
    const { category, subcategory, id } = route.params
    console.log(category,subcategory,id)
    // 使用动态导入加载 Markdown 文件
    const module = await import(`@/posts/${category}/${subcategory}/article${id}.md`)
    markdownContent.value = module.default
  } catch (error) {
    console.error('Failed to load article:', error)
  }
})
</script>

<style scoped>
.article-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
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
