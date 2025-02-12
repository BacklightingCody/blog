<template>
  <div class="article-detail relative flex flex-col gap-[20px] p-10 mx-5 bg-default-currency text-default-text"
    ref="contentContainer">
    <BackButton :buttonStyle="{ width: '60px', height: '60px', borderRadius: '50%' }">
      <iconReturn></iconReturn>
    </BackButton>
    <header class="article-header text-default-text text-center">
      <h1>{{ articleTitle }}</h1>
      <p class="article-date">发布日期：{{ articleDate }} &nbsp;&nbsp;本文字数：{{ wordCount }}</p>
      <ColorMap />
    </header>
    <main class="article-content">
      <component v-if="markdownContent" :is="markdownContent" />
      <div v-else>Loading...</div>
      <div v-if="isModalOpen" class="image-modal" @click="closeModal">
        <img :src="selectedImage" alt="Zoomed Image" />
      </div>
      <div class="flex justify-center">
        <div>
          <div class="p-6 flex items-center space-x-2 bg-default-currgb rounded-full shadow-inner">
            <ReactionButton color="#FF6B6B">
              <template #icon>
                <ThumbsUpIcon class="w-6 h-6 transition-colors duration-300"
                  :class="{ 'text-gray-400 group-hover:text-[#FF6B6B]': true }" />
              </template>
            </ReactionButton>

            <ReactionButton color="#4ECDC4">
              <template #icon>
                <Heart class="w-6 h-6 transition-colors duration-300"
                  :class="{ 'text-gray-400 group-hover:text-[#4ECDC4]': true }" />
              </template>
            </ReactionButton>

            <ReactionButton color="#FFB800">
              <template #icon>
                <PartyPopperIcon class="w-6 h-6 transition-colors duration-300"
                  :class="{ 'text-gray-400 group-hover:text-[#FFB800]': true }" />
              </template>
            </ReactionButton>

            <ReactionButton color="#45B7D1">
              <template #icon>
                <SparklesIcon class="w-6 h-6 transition-colors duration-300"
                  :class="{ 'text-gray-400 group-hover:text-[#45B7D1]': true }" />
              </template>
            </ReactionButton>

            <ReactionButton color="#96C93D" @click="showCardHandler">
              <template #icon>
                <MessageSquareShare class="w-6 h-6 transition-colors duration-300"
                  :class="{ 'text-gray-400 group-hover:text-[#96C93D]': true }" />
              </template>
            </ReactionButton>
          </div>
        </div>
      </div>

      <GenerateCard v-if="isShowCard" :title="articleTitle" :author="articleAuthor" :publishDate="articleDate"
        :excerpt="articleExcerpt" :image="articleImage" />
    </main>
    <footer ref="footer">
      <div class="w-full">
        <CommentList :comment-count="commentCount" :comments="comments" :current-user="currentUser" :sort-by="sortBy"
          @change-sort="updateSortBy" @add-comment="handleAddComment" @add-reply="handleAddReply"
          @like-comment="handleLikeComment" />
      </div>
    </footer>

    <BackTop />
  </div>
</template>
<script setup lang="ts">
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores';
import { useRoute } from 'vue-router'
import { formatDateFromISO, getCurTimeWithFullDate } from '@/utils/time/useCurTime';
import CommentList from './CommentList.vue';
import ColorMap from '@/components/ColorMap.vue'
import GenerateCard from './GenerateCard.vue'
import { getRandomPicture } from '@/utils/useGeneratePicture'
import iconReturn from './icons/iconReturn.vue'
import BackButton from './BackButton.vue'
import BackTop from './BackTop.vue'
import ReactionButton from './ReactionButton.vue';
import {
  Heart,
  ThumbsUp as ThumbsUpIcon,
  MessageSquareShare,
  PartyPopper as PartyPopperIcon,
  Sparkles as SparklesIcon,
} from 'lucide-vue-next';
import { getComments, addComment, addReply, likeComment } from '@/services/comment'
import type { CommentContent } from '@/interface/Comment';
import { copyWithCopyright } from '@/utils/copyWithright';
const route = useRoute()


const contentContainer = useTemplateRef('contentContainer')
const markdownContent = ref(null) // Markdown 主内容
const postId = ref('')
const articleTitle = ref('')
const articleDate = ref('')
const articleAuthor = ref('')
const articleExcerpt = ref('')
const articleImage = getRandomPicture()
const wordCount = ref(0);
const footer = useTemplateRef('footer')

onMounted(async () => {
  try {
    const { category, subcategory, article } = route.params
    // 动态加载文章的 index.md 文件
    const module = await import(`@/posts/${category}/${subcategory}/${article}/index.md`)
    markdownContent.value = module.default
    const contentDetail = document.querySelector('.article-detail')
    // 使用 nextTick 确保组件渲染后获取 DOM 元素
    nextTick(() => {

      if (contentDetail) {
        // 统计文章字数
        function calculateWordCount(text) {
          // 去除 HTML 标签和首尾多余空格
          const plainText = text.replace(/<[^>]+>/g, '').trim();

          // 精确匹配统计的内容：中文字符、数字、标点符号
          const matchedCharacters = plainText.match(/[\u4e00-\u9fa5\u3000-\u303F\uFF00-\uFFEF0-9，。！？、：；“”‘’（）【】《》〈〉'"。,!?]/g);

          // 如果匹配到了，返回匹配的字符数量；否则返回 0
          return matchedCharacters ? matchedCharacters.length : 0;
        }
        const plainText = contentContainer.value?.textContent.trim();
        wordCount.value = calculateWordCount(plainText);
        // 动画样式
        addTitleClassToHeadings()
        Prism.highlightAll();

        const titles = contentDetail.querySelectorAll('.title')
        const paragraphs = contentDetail.querySelectorAll('p');
        const lis = contentDetail.querySelectorAll('li')
        const relLis = Array.from(lis).filter(li => {
          return !li.closest('.table-of-contents');
        })
        // const relTitles = Array.from(titles).filter((element, index, array) => {
        //   // 判断是否为最后一个元素，并且类名包含 "title"
        //   return !(index === array.length - 1 && element.classList.contains('title'));
        // });


        titles.forEach((title) => {
          const result = title.textContent.split('').map((char) => `<span>${char}</span>`).join('')
          title.innerHTML = result
          const spans = title.querySelectorAll('span')
          for (let i = 0; i < spans.length; i++) {
            spans[i].style.setProperty('--delay', `${i * 0.3}s`)
          }
        })

        paragraphs.forEach((paragraph) => {
          const lines = paragraph.innerHTML.split('\n');
          paragraph.innerHTML = '';
          lines.forEach((line, index) => {
            if (line.trim() !== '') {
              const lineWrapper = document.createElement('div');
              lineWrapper.classList.add('line');
              lineWrapper.style.setProperty('--delay', `${index * 0.1}s`)
              lineWrapper.innerHTML = line;
              paragraph.appendChild(lineWrapper);
            }
          });
        });

        relLis.forEach((li) => {
          const lines = li.innerHTML.split('\n');
          li.innerHTML = '';
          lines.forEach((line, index) => {
            if (line.trim() !== '') {
              const lineWrapper = document.createElement('div');
              lineWrapper.classList.add('line');
              lineWrapper.style.setProperty('--delay', `${index * 0.2}s`)
              lineWrapper.innerHTML = line;
              li.appendChild(lineWrapper);
            }
          });
        })
        const images = contentDetail?.querySelectorAll('img') || []
        // 为每个图片绑定点击事件
        images.forEach(img => {
          img.addEventListener('click', () => {
            openModal(img.src)
            // console.log(img.src)
          })
        })

      }
    })
    // 解析 frontmatter 的元数据
    const { frontmatter } = module
    postId.value = frontmatter.id || 1
    // console.log(postId.value, 'postId')
    articleTitle.value = frontmatter.title || ''
    articleDate.value = formatDateFromISO(frontmatter.date) || ''
    articleAuthor.value = frontmatter.author || 'backlighting'
    articleExcerpt.value = frontmatter.description || ''

    // 获取评论列表
    if (postId.value) {
      fetchComments(postId.value, sortBy.value);
    }
  } catch (error) {
    console.error('Failed to load article:', error)
  }
})


onMounted(() => {
  const footerElement = footer.value
  if (footerElement) {
    footerElement.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const image = target as HTMLImageElement;
        openModal(image.src);
      }
    });
  }
})

// Add copyright information to the clipboard

onMounted(() => {
  document.addEventListener('copy', (event) => {
    const selection = window.getSelection()?.toString() || '';
    const currentUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
    copyWithCopyright(selection,currentUrl)
      .catch((err) => {
        // 处理复制错误
        console.error("复制失败:", err);
      });

    event.preventDefault(); // 阻止默认复制行为
  });
})

onUnmounted(()=>{
  document.removeEventListener('copy',()=>{})
})

const isModalOpen = ref(false);
const selectedImage = ref(null);

const openModal = (src) => {
  selectedImage.value = src;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedImage.value = null;
};

const isShowCard = ref(false);
const showCardHandler = () => {
  isShowCard.value = !isShowCard.value;
};

function addTitleClassToHeadings() {
  // 获取所有 h 标签
  const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
  // 遍历每个标签，添加 title 类
  headings.forEach(heading => {
    heading.classList.add('title');
  });
}

// 当前用户信息
const currentUser = ref({
  id: '',
  nickname: '',
  avatar: '',
  badges: []
})

// 评论总数
const commentCount = ref(0)
const comments = ref([])
type SortBy = 'hot' | 'time';
const sortBy = ref<SortBy>('time')

// 更新排序方式
const updateSortBy = (newSortBy) => {
  sortBy.value = newSortBy;
  // fetchComments(postId.value, newSortBy); // 根据新的排序方式重新获取数据
};
// 获取评论列表
const fetchComments = async (postId: string, sortBy: 'hot' | 'time' = 'time') => {
  try {
    // console.log(postId, sortBy)
    const response = await getComments(postId, sortBy)  // 也可以选择 'hot' 排序
    comments.value = response.data.comments
    commentCount.value = response.data.totalComments
    // console.log(comments.value,commentCount.value,'评论')
  } catch (error) {
    console.error('Failed to fetch comments:', error)
  }
}


// 处理添加评论
const handleAddComment = async (content) => {
  const newComment = {
    text: content.text,
    images: content.images
  }
  try {
    //console.log(postId.value, newComment)
    const response = await addComment(postId.value, currentUser.value.id, newComment)
    // console.log('response', response)
    if (response.data.newComment) {
      comments.value.push(response.data.newComment)  // 将新的评论添加到评论列表
      commentCount.value++
    }
    // comments.value.push(response.data.newComment)  // 将新的评论添加到评论列表
    // commentCount.value++
    // await fetchComments(postId.value,sortBy.value)
  } catch (error) {
    console.error('Failed to add comment:', error)
  }
}
// 处理添加回复
const handleAddReply = async (commentId, content, replyTo) => {
  const newReply = {
    text: content.text,
    images: content.images
  }
  try {
    const response = await addReply(commentId, currentUser.value.id, newReply)
    // const comment = comments.value.find(c => c.id === commentId)
    const index = comments.value.findIndex(c => c.id === commentId);

    if (index !== -1) {
      const targetComment = comments.value[index]; // 获取目标评论
      console.log('targetComment', targetComment)
      if (!targetComment.replies) {
        // 如果 replies 未初始化，使用 Vue 的 $set 方法初始化它（确保响应式）
        targetComment.replies = [];
      }
      // 向 replies 数组中添加新回复
      targetComment.replies.push(response.data.newReply);
      console.log(comments.value, '11111')
    }
  } catch (error) {
    console.error('Failed to add reply:', error)
  }
}

// 处理点赞
const handleLikeComment = async (id, isReply = false) => {
  try {
    await likeComment(id, isReply, currentUser.value.id)  // 调用接口点赞
    if (!isReply) {
      const comment = comments.value.find(c => c.id === id)
      if (comment) comment.likes++  // 更新本地评论点赞数
    } else {
      comments.value.forEach(comment => {
        const reply = comment.replies.find(r => r.id === id)
        if (reply) reply.likes++  // 更新本地回复点赞数
      })
    }
  } catch (error) {
    console.error('Failed to like comment:', error)
  }
}

onMounted(() => {
  const userStore = useUserStore()
  // console.log(userStore.userId)
  // console.log(userStore.username)
  // console.log(userStore.isLoggedIn)
  if (userStore.isLoggedIn) {
    currentUser.value.nickname = userStore.username
    currentUser.value.id = userStore.userId
    currentUser.value.avatar = userStore.avatar
  }
})

</script>

<style scoped lang="scss">
.article-detail {
  letter-spacing: 2px;
  font-size: 1rem;
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
  font-size: 1.5rem;
  max-width: 100%;
  word-wrap: break-word;
  /* 支持换行 */
  word-break: break-word;
  /* 支持非标准单词换行 */
}

:deep(h2) {
  font-size: 1.375rem;
  margin: 1em 0;
  position: relative;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  /* 确保伪元素相对于 h2 定位 */
}

:deep(h2)::after {
  content: '';
  /* 伪元素内容为空 */
  display: block;
  width: 100%;
  /* 宽度与 h2 相同 */
  height: 1px;
  /* 细线的高度 */
  background-color: var(--currgb-color);
  /* 细线的颜色，可以调整 */
  position: absolute;
  /* 绝对定位 */
  bottom: -0.5em;
  /* 将细线定位在 h2 下方 */
  left: 0;
  /* 从左侧开始 */
}

:deep(h3) {
  font-size: 1.25rem;
  margin: 1em 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

:deep(h4) {
  font-size: 1.3rem;
  margin: 1em 0;
}

:deep(.article-content img) {
  margin: 20px 0px;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: auto;
}

:deep(p) {
  margin: 10px 0;
  line-height: 2;
  max-width: 100%;
  overflow-wrap: break-word;

  /* 新标准 */
  code {
    color: var(--text-color);
    font-weight: 900;
  }
}

:deep(hr) {
  margin: 20px 0;
  background: var(--text-color);
  height: 0.5px;
}

:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th {
    padding: 10px;
    border: 2px solid var(--table-color);
    text-align: left;
    background-color: var(--accent-color);
  }

  td {
    color: var(--text-color);
    padding: 10px;
    border: 2px solid var(--table-color);
    text-align: left;

    code {
      color: var(--text-color);
    }
  }

  tr:hover {
    background-color: var(--accent-color);

    td {
      color: #fff;
    }

  }
}

:deep(strong) {
  font-weight: 800;
}


:deep(pre) {
  overflow: hidden !important;
  position: relative;

  code {
    display: inline-block;
    padding-bottom: 20px;
    position: relative;
    top: 20px;
  }

  &::before {
    content: "";
    position: absolute;
    background: red;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 10px;
    left: 15px;
    transform: translate(-50%);
  }

  &::after {
    content: "";
    position: absolute;
    background: sandybrown;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 10px;
    left: 30px;
    transform: translate(-50%);
  }

  code:first-child {
    &::after {
      content: "";
      position: absolute;
      background: limegreen;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      top: -28px;
      left: 28px;
      transform: translate(-50%);
    }
  }
}


:deep(ul) {
  list-style: disc;

  li {
    line-height: 2;

    code {
      font-weight: 700;
    }
  }
}

:deep(ol) {
  list-style: decimal;

  li {
    line-height: 2;
    margin: 8px 0;
  }
}

:deep(li) {
  margin: 8px 0;

  strong {
    color: var(--strong-color);
  }

  ul {
    list-style-type: circle;
    margin-left: 2rem;

    li {
      ul {
        list-style-type: square;
      }
    }
  }
}

:deep(.table-of-contents) {
  position: fixed;
  top: 100px;
  right: 30px;
  width: 260px;
  max-height: 500px; // Use max-height instead of fixed height for better content handling
  overflow-y: auto; // Only vertical scroll if needed
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1); // Softer shadow
  padding-left: 20px;

  ul {
    list-style-type: upper-roman; // Remove default list styling
    padding: 20px;
    margin: 0;


    &::before {
      content: '目录';
      font-size: 16px;
      font-weight: 800;
      text-align: start;
      margin-bottom: 10px;
      display: block;
      text-align: center;
      border-bottom: 1px solid var(--text-color);
    }

    &>li {
      position: relative;
      font-size: 0.8rem;
      margin-bottom: 8px;
      line-height: 1.6;

      &::marker {
        display: block;
        width: 30px;
      }

      ul {
        list-style-type: decimal;
        padding: 0;
        position: relative;
        width: 300px;
        height: auto;
        top: 0px;
        left: 20px;
        border-radius: 0px;
        box-shadow: none;

        &::before {
          display: block;
          border-bottom: none;
        }

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
  max-width: 100%;
  position: relative;
  display: inline-block;
  color: var(--text-color);
  font-weight: bold;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    /* 下划线位置 */
    height: 3px;
    /* 下划线粗细 */
    width: 100%;
    background-color: var(--currgb-color);
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

@media screen and (max-width: 800px) {
  .article-detail {
    margin: 0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 1);
  }

  :deep(.table-of-contents) {
    ul {
      overflow: auto;
      position: relative;
      width: 100%;
      height: 100%;
      padding: 20px;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}

:deep(::selection) {
  color: #654321;
  font-size: 40px;
  background-color: #E8F5E9;
  text-shadow: none;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.image-modal img {
  width: 90%;
  height: 90%;
  object-fit: contain;
  animation: zoomIn 0.3s linear;
}

@keyframes zoomIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes dropIn {
  0% {
    opacity: 0;
    transform: translateY(-200%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 为每一行文字设置动画样式 */
:deep(.line) {
  line-height: 2;
  opacity: 0;
  animation: dropIn 0.5s var(--delay) cubic-bezier(0.42, 0, 0.77, 1.7) forwards;
}



:deep(.title) {
  display: flex;

  span {
    text-shadow: 1px 1px var(--shadow-color), 2px 2px var(--shadow-color), 3px 3px var(--shadow-color);
    opacity: 0;
    animation: dropIn 0.5s cubic-bezier(0.42, 0, 0.77, 1.7) forwards var(--delay);
  }
}

:deep(h1) {
  justify-content: center; //对大标题居中
}

:deep(pre) {
  background-color: var(--code-background-color);
  border-radius: 5px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
}

:deep(code) {
  display: inline-block;
  font-family: 'Courier New', monospace;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  color: var(--code-text-color);
  font-weight: 400;
}

:deep(blockquote) {
  border-left: 4px solid #42b983;
  background-color: #f4f9f4;
  color: #333;
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  font-size: 1.1rem;
  border-radius: 4px;
  font-style: italic;
  line-height: 1.5;

  a {
    color: #42b983;
  }
}

:deep(blockquote)::before {
  content: "tip: ";
  font-weight: bold;
  color: #42b983;
}
</style>