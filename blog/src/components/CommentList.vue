<template>
  <div class="comment-section p-4 bg-white rounded-lg shadow">
    <!-- 评论数量和排序 -->
    <div class="flex items-center justify-between border-b pb-3 mb-4">
      <h2 class="text-lg font-medium">{{ commentCount }} 条评论</h2>
      <div class="space-x-4">
        <button class="text-sm px-2 py-1 rounded transition-colors"
          :class="props.sortBy === 'hot' ? 'text-[#FB7299] font-medium' : 'text-gray-500'" @click="updateSortBy('hot')">
          热度排序
        </button>
        <button class="text-sm px-2 py-1 rounded transition-colors"
          :class="props.sortBy === 'time' ? 'text-[#FB7299] font-medium' : 'text-gray-500'" @click="updateSortBy('time')">
          时间排序
        </button>
      </div>
    </div>

    <!-- 评论输入组件 -->
    <CommentInput :current-user="currentUser" @add-comment="submitComment" />

    <!-- 评论列表 -->
    <div class="space-y-6">
      <CommentItem v-for="comment in sortedComments" :key="comment.id" :comment="comment" :current-user="currentUser"
        @reply="handleReply" @like="handleLike" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentItem from './CommentItem.vue'
import CommentInput from './CommentInput.vue'
import { ref, computed } from 'vue'
import { Comment } from '@/interface/Comment'
import { User } from '@/interface/User'
import { formatDateFromISOFull } from '@/utils/time/useCurTime'
import type { CommentContent } from '@/interface/Comment'
const props = defineProps({
  sortBy: String,
  commentCount: Number,
  comments: Array as () => Comment[],
  currentUser: Object as () => User,
})

const emit = defineEmits(['add-comment', 'add-reply', 'like-comment','change-sort'])

const sortedComments = computed(() => {
  const sortedArray = props.sortBy === 'hot'
    ? props.comments.toSorted((a, b) => b.likes - a.likes)
    : props.comments.toSorted((a, b) => new Date(formatDateFromISOFull(b.createdAt as string)).getTime() - new Date(formatDateFromISOFull(a.createdAt as string)).getTime());
  return sortedArray;
})

const updateSortBy = (newSortBy) => {
  emit('change-sort', newSortBy); // 通知父组件更新排序方式
};

const submitComment = (content: CommentContent) => {
  emit('add-comment', content)
}

const handleReply = (id: number, content: CommentContent, replyTo: string) => {
  emit('add-reply', id, content, replyTo)
}

const handleLike = (id: number, isReply: boolean) => {
  emit('like-comment', id, isReply)
}

watch(
  () => props.comments,
  (newVal) => {
    console.log('Updated comments:', newVal);
  },
  { deep: true }
);
</script>
