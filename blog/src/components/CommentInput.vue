<template>
  <div class="bg-white rounded-lg p-4">
    <!-- Avatar & Comment Input Section -->
    <div class="flex items-start space-x-3">
      <Avatar :src="currentUser.avatar" :size="'middle'" />
      <InputField
        class="flex-1"
        v-model="commentContent"
        placeholder="写下你的评论..."
        @input-change="handleInputChange"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Avatar from './Avatar.vue'
import InputField from './InputField.vue'
import type { CommentContent } from '@/interface/Comment'

// Props & Emits
const props = defineProps({
  currentUser: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-comment'])
const commentContent = ref<CommentContent>('') // initial content as string or object
const images = ref<string[]>([])

// Handle input change
const handleInputChange = (content: CommentContent) => {
  // console.log(content,'1111')
  if (typeof content === 'string') {
    commentContent.value = content
    images.value = [] // clear images if only text
  } else {
    commentContent.value = content.text
    images.value = content.images
  }
}

// Submit comment
const handleSubmit = () => {
  if (typeof commentContent.value === 'string' && commentContent.value.trim()) {
    emit('add-comment', { text: commentContent.value, images: images.value, user: props.currentUser })
  } else if (Array.isArray(images.value) && images.value.length > 0) {
    emit('add-comment', { text: commentContent.value, images: images.value, user: props.currentUser })
  }

  commentContent.value = '' // Reset content after submit
  images.value = [] // Reset images after submit
}
</script>

<style scoped>
.comment-input {
  width: 100%;
}
</style>
