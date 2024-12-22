<template>
  <div class="comment-item">
    <!-- 用户信息和评论内容 -->
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
      <template #default>
        <div class="mt-1 text-gray-900">
          <!-- Render comment content -->
          <div v-if="typeof comment.content === 'string'">
            <p v-html="comment.content"></p>
          </div>

          <div v-else>
            <!-- Display text content -->
            <p v-html="comment.content.text"></p>

            <!-- Display images -->
            <div v-if="comment.content.images.length" class="mt-2 grid grid-cols-3 gap-2">
              <div
                v-for="(image, index) in comment.content.images"
                :key="index"
                class="relative w-full h-32 rounded-lg overflow-hidden"
              >
                <img :src="image" class="w-full h-full object-cover" alt="Comment Image" />
              </div>
            </div>
          </div>

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
        </div>
      </template>
    </UserMeta>

    <!-- 回复输入框 -->
    <ReplyInput
      v-if="showReplyInput"
      :currentUser="currentUser"
      :reply-to="replyToUser"
      @cancel="cancelReply"
      @submit="submitReply"
    />

    <!-- 回复列表 -->
    <ReplyList
      v-if="comment.replies?.length"
      :replies="comment.replies"
      @like="$emit('like', $event.id, true)"
      @reply="handleShowReply"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ThumbsUpIcon } from 'lucide-vue-next';
import UserMeta from './UserMeta.vue';
import ReplyInput from './ReplyInput.vue';
import ReplyList from './ReplyList.vue';
import CommentInput from './CommentInput.vue'; // Import CommentInput
import { User } from '@/interface/User';
import { Comment } from '@/interface/Comment';
import type { CommentContent } from '@/interface/Comment';

const props = defineProps<{
  comment: Comment;
  currentUser: User;
}>();

const emit = defineEmits<{
  (e: 'like', id: number, isReply: boolean): void;
}>();

const showReplyInput = ref(false);
const replyToUser = ref('');

const handleShowReply = (nickname: string) => {
  showReplyInput.value = true;
  replyToUser.value = nickname;
};

const cancelReply = () => {
  showReplyInput.value = false;
  replyToUser.value = '';
};

const submitReply = ( content:CommentContent) => {
  emit('reply', props.comment.id, content, replyToUser.value);
  cancelReply();
};
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
