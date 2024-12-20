<template>
  <div class="comment-item">
    <UserMeta
      :avatar="comment.user.avatar"
      :nickname="comment.user.nickname"
      size="middle"
    >
      <template #badges>
        <div class="flex gap-1">
          <span
            v-for="badge in comment.user.badges"
            :key="badge"
            class="px-1.5 py-0.5 text-xs bg-[#FFF1F0] text-[#FB7299] rounded"
          >
            {{ badge }}
          </span>
        </div>
      </template>
      <!-- 评论内容 -->
      <template #default>
        <p class="mt-1 text-gray-900">{{ comment.content }}</p>
        <div class="mt-2 flex items-center gap-6 text-sm text-gray-500">
          <span>{{ comment.time }}</span>
          <div class="flex items-center gap-6">
            <button
              class="flex items-center gap-1 hover:text-[#FB7299]"
              @click="$emit('like', comment.id, false)"
            >
              <ThumbsUpIcon class="w-4 h-4" />
              <span>{{ comment.likes }}</span>
            </button>
            <button
              class="hover:text-[#FB7299]"
              @click="handleShowReply(comment.user.nickname)"
            >
              回复
            </button>
          </div>
        </div>
      </template>
    </UserMeta>

    <!-- 回复输入框 -->
    <div v-if="showReplyInput" class="mt-3 ml-12">
      <div class="flex items-start gap-3">
        <img 
          :src="currentUser.avatar" 
          :alt="currentUser.nickname"
          class="w-8 h-8 rounded-full"
        />
        <div class="flex-1">
          <div class="mb-2 text-sm text-gray-500">
            回复 <span class="text-[#FB7299]">@{{ replyToUser }}</span>
          </div>
          <textarea
            v-model="replyContent"
            placeholder="回复..."
            class="w-full min-h-[40px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#FB7299] text-sm"
          ></textarea>
          <div class="mt-2 flex justify-end gap-2">
            <button
              class="px-3 py-1 text-sm text-gray-500 hover:text-[#FB7299]"
              @click="cancelReply"
            >
              取消
            </button>
            <button
              class="px-3 py-1 text-sm bg-[#FB7299] text-white rounded-full hover:bg-[#FB7299]/90"
              @click="submitReply"
            >
              回复
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 回复列表 -->
    <div 
      v-if="comment.replies?.length" 
      class="ml-12 mt-4 space-y-4 border-l-2 border-gray-100 pl-4"
    >
      <div 
        v-for="reply in comment.replies" 
        :key="reply.id"
      >
        <UserMeta
          :avatar="reply.user.avatar"
          :nickname="reply.user.nickname"
          size="small"
        >
          <template #badges>
            <span v-if="reply.replyTo" class="text-gray-500 text-sm">
              回复 <span class="text-[#FB7299]">@{{ reply.replyTo }}</span>
            </span>
          </template>
          <template #default>
            <p class="mt-1 text-gray-900">{{ reply.content }}</p>
            <div class="mt-2 flex items-center gap-6 text-sm text-gray-500">
              <span>{{ reply.time }}</span>
              <div class="flex items-center gap-6">
                <button
                  class="flex items-center gap-1 hover:text-[#FB7299]"
                  @click="$emit('like', reply.id, true)"
                >
                  <ThumbsUpIcon class="w-4 h-4" />
                  <span>{{ reply.likes }}</span>
                </button>
                <button
                  class="hover:text-[#FB7299]"
                  @click="handleShowReply(reply.user.nickname)"
                >
                  回复
                </button>
              </div>
            </div>
          </template>
        </UserMeta>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ThumbsUpIcon } from 'lucide-vue-next'
import UserMeta from './UserMeta.vue'
import {User} from '@/interface/User'
import {Comment} from '@/interface/Comment'

const props = defineProps<{
  comment: Comment
  currentUser: User
}>()

const emit = defineEmits<{
  (e: 'reply', commentId: number, content: string, replyTo: string): void
  (e: 'like', id: number, isReply: boolean): void
}>()

const showReplyInput = ref(false)
const replyContent = ref('')
const replyToUser = ref('')

const handleShowReply = (nickname: string) => {
  showReplyInput.value = true
  replyToUser.value = nickname
}

const cancelReply = () => {
  showReplyInput.value = false
  replyContent.value = ''
  replyToUser.value = ''
}

const submitReply = () => {
  if (replyContent.value.trim()) {
    emit('reply', props.comment.id, replyContent.value, replyToUser.value)
    cancelReply()
  }
}
</script>

<style scoped>
.comment-item {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.comment-item:last-child {
  border-bottom: none;
}
</style>