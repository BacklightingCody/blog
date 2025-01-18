<template>
  <div class="bg-white rounded-lg p-4">
    <div class="flex items-start space-x-3">
      <Avatar :src="currentUser.avatar" :size="'middle'" />
      <InputField class="flex-1" v-model="content" placeholder="写下你的评论..." @submit="handleSubmit"
        @upload-progress="handleUploadProgress" />
      <!-- Display progress bar -->
      <div v-if="uploadProgress > 0 && uploadProgress < 100">
        <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Avatar from './Avatar.vue'
import InputField from './InputField.vue'
import type { CommentContent } from '@/interface/Comment'
import { } from '@/services/comment'

// Props & Emits
const props = defineProps({
  currentUser: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-comment'])

const content = ref({
  text: '',
  images: []
})

const uploadProgress = ref(0)

const handleUploadProgress = (progress: number) => {
  uploadProgress.value = progress
}


// Submit comment
const handleSubmit = () => {
  if (content.value.text.trim() || content.value.images.length > 0) {
    emit('add-comment', {
      text: content.value.text,
      images: content.value.images,
      user: props.currentUser
    })
    // Reset content after submit
    content.value = {
      text: '',
      images: []
    }
  }
}
</script>