<template>
  <div class="comment-section p-4 bg-white rounded-lg shadow">
    <!-- 评论数量和排序 -->
    <div class="flex items-center justify-between border-b pb-3 mb-4">
      <h2 class="text-lg font-medium">{{ commentCount }} 条评论</h2>
      <div class="space-x-4">
        <button
          class="text-sm px-2 py-1 rounded transition-colors"
          :class="sortBy === 'hot' ? 'text-[#FB7299] font-medium' : 'text-gray-500'"
          @click="sortBy = 'hot'"
        >
          热度排序
        </button>
        <button
          class="text-sm px-2 py-1 rounded transition-colors"
          :class="sortBy === 'time' ? 'text-[#FB7299] font-medium' : 'text-gray-500'"
          @click="sortBy = 'time'"
        >
          时间排序
        </button>
      </div>
    </div>

    <!-- 评论输入框 -->
    <div class="flex items-start space-x-3 mb-6">
      <Avatar :src="currentUser.avatar" :size="'middle'" />
      <div class="flex-1 relative">
        <div
          contenteditable="true"
          class="w-full min-h-[70px] resize-none border p-2 rounded-lg outline-none text-black border-solid border-[#FB7299] border-2px"
          ref="commentEditor"
          @input="handleInput"
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
          v-bind:innerHTML="newComment"
        ></div>
        <EmojiPicker
          v-if="showEmojiPicker"
          class="absolute bottom-full left-0 mb-2"
          @select="addEmoji"
          :isDarkMode="false"
        />
        <div class="flex space-x-2">
          <button 
            @click="toggleEmojiPicker"
            class="text-gray-500 hover:text-[#FB7299] transition-colors"
          >
            <SmileIcon class="w-5 h-5" />
          </button>
          <label 
            for="image-upload" 
            class="cursor-pointer text-gray-500 hover:text-[#FB7299] transition-colors"
          >
            <ImageIcon class="w-5 h-5" />
            <input 
              type="file" 
              id="image-upload" 
              accept="image/*" 
              class="hidden" 
              @change="handleImageUpload"
            >
          </label>
        </div>
        <div class="flex justify-end mt-2">
          <button
            @click="submitComment"
            class="px-4 py-1 bg-[#FB7299] text-white rounded-full text-sm hover:bg-[#FB7299]/90"
          >
            发送
          </button>
        </div>
        <div v-if="uploadedImage" class="mt-2">
          <img :src="uploadedImage" alt="Uploaded image" class="max-w-full h-auto rounded-lg" />
          <button 
            @click="removeUploadedImage" 
            class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
          >
            <XIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="space-y-6">
      <CommentItem
        v-for="comment in sortedComments"
        :key="comment.id"
        :comment="comment"
        :current-user="currentUser"
        @reply="handleReply"
        @like="handleLike"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SmileIcon, ImageIcon, XIcon } from 'lucide-vue-next'
import { Comment } from '@/interface/Comment'
import { User } from '@/interface/User'
import CommentItem from './CommentItem.vue'
import Avatar from '@/components/Avatar.vue'
import EmojiPicker from './EmojiPicker.vue'

const props = defineProps({
  commentCount: {
    type: Number,
    required: true,
  },
  comments: {
    type: Array as () => Comment[],
    required: true,
  },
  currentUser: {
    type: Object as () => User,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'add-comment', comment: string): void
  (e: 'add-reply', commentId: number, content: string, replyTo: string): void
  (e: 'like-comment', commentId: number, isReply: boolean): void
}>()

const sortBy = ref<'hot' | 'time'>('hot')
const newComment = ref('')
const showEmojiPicker = ref(false)
const uploadedImage = ref<string | null>(null)
// 用于标记是否正在使用中文输入法
const isComposing = ref(false)

const sortedComments = computed(() => {
  if (sortBy.value === 'hot') {
    return [...props.comments].sort((a, b) => b.likes - a.likes)
  }
  return [...props.comments].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
})

// 处理输入框的内容
const handleInput = () => {
  if (isComposing.value) return // 如果正在中文输入，不更新 newComment
  
  const editor = document.querySelector('[contenteditable="true"]') as HTMLElement
  if (editor) {
    newComment.value = editor.innerHTML
  }
}

// 处理中文输入法的输入事件
const handleCompositionStart = () => {
  isComposing.value = true
}

const handleCompositionEnd = () => {
  isComposing.value = false
  handleInput() // 中文输入完成后，更新 newComment
}

const submitComment = () => {
  if (newComment.value.trim()) {
    emit('add-comment', newComment.value)
    newComment.value = ''
  }
}

const handleReply = (commentId: number, content: string, replyTo: string) => {
  emit('add-reply', commentId, content, replyTo)
}

const handleLike = (commentId: number, isReply: boolean) => {
  emit('like-comment', commentId, isReply)
}

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

const addEmoji = (emoji: string) => {
  newComment.value += emoji
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]

    // 使用 FileReader 读取图片
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        // 创建一个 canvas 元素来缩小图片
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const MAX_WIDTH = 150 // 设置图片的最大宽度
        const MAX_HEIGHT = 150 // 设置图片的最大高度
        let width = img.width
        let height = img.height

        // 按比例计算新的宽高
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height *= MAX_WIDTH / width))
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width *= MAX_HEIGHT / height))
            height = MAX_HEIGHT
          }
        }

        // 设置 canvas 的宽高并将图片绘制到 canvas 中
        canvas.width = width
        canvas.height = height
        ctx?.drawImage(img, 0, 0, width, height)

        // 将缩小后的图片转换为 DataURL
        const dataUrl = canvas.toDataURL('image/jpeg')

        // 在文本框中插入图片
        newComment.value += `<img src="${dataUrl}" class="max-w-[150px] mt-2 mb-2" />`
      }

      img.src = e.target?.result as string
    }

    reader.readAsDataURL(file)
  }
}

const removeUploadedImage = () => {
  uploadedImage.value = null
}
</script>
