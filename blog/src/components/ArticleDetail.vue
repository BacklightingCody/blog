<template>
  <div class="article-detail relative flex flex-col gap-[20px] p-10 mx-5 bg-default-currency text-default-text">
    <header class="article-header text-default-text text-center">
      <h1>{{ articleTitle }}</h1>
      <p class="article-date">发布日期：{{ articleDate }}</p>
      <ColorMap />
    </header>
    <main class="article-content">
      <component v-if="markdownContent" :is="markdownContent" />
      <div v-else>Loading...</div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { formatDateFromISO } from '@/utils/time/useCurTime'
import ColorMap from '@/components/ColorMap.vue'
const route = useRoute()

const markdownContent = ref(null) // Markdown 主内容
const articleTitle = ref('') // 文章标题
const articleDate = ref('') // 文章发布日期

onMounted(async () => {
  try {
    const { category, subcategory, article } = route.params
    // 动态加载文章的 index.md 文件
    const module = await import(`@/posts/${category}/${subcategory}/${article}/index.md`)
    markdownContent.value = module.default

    // 解析 frontmatter 的元数据
    const { frontmatter } = module
    articleTitle.value = frontmatter.title || '无标题'
    articleDate.value = formatDateFromISO(frontmatter.date) || '未知日期'
  } catch (error) {
    console.error('Failed to load article:', error)
  }
})
</script>

<style scoped lang="scss">
.article-detail {
  margin-right: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 1);
}

.article-header .article-date {
  font-size: 14px;
  color: var(--text-color);
}

.article-content {
  line-height: 1.5;
}

/* Markdown 样式 */
:deep(h1) {
  font-size: 2em;
}

:deep(h2) {
  font-size: 1.75em;
  margin: 1em 0;
}

:deep(h3) {
  font-size: 1.5em;
  margin: 1em 0;
}

:deep(img) {
  margin: 15px 0px;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: auto;
}

:deep(p) {
  margin: 1.5em 0;
  line-height: 2;
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

:deep(ul) {
  list-style: disc;

  li {
    margin: 8px 0;
  }
}

:deep(ol) {
  list-style: decimal;

  li {
    margin: 8px 0;
  }
}

:deep(.table-of-contents) {
  ul {
    list-style-type: upper-roman;
    padding: 20px 0 20px 20px;
    display: flex;
    flex-direction: column;
    width: 250px;
    position: fixed;
    top: 100px;
    right: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 1);

    &::before {
      content: '目录';
      font-size: 16px;
      font-weight: 800;
      text-align: start;
      margin-bottom: 10px;
    }

    li {
      position: relative;
      font-size: 13px;
      margin: 5px 0;

      ul {
        padding: 0;
        position: relative;
        width: 300px;
        top: 0px;
        left: 20px;
        border-radius: 0px;
        box-shadow: none;

        li {
          margin: 2px 0;
        }

        &::before {
          content: '';
        }
      }

    }
  }
}


:deep(a) {
  color: var(--text-color);
  font-weight: bold;
}

@media screen and (max-width: 800px) {
  .article-detail {
    margin: 0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 1);
  }

  :deep(.table-of-contents) {
    ul {
      position: relative;
      width: 100%;
      padding: 10px;
      top: 0;
      right: 0;

    }
  }
}
</style>