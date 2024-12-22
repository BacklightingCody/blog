<template>
  <div class="bg-white rounded-lg p-4">
    <div class="flex items-start space-x-3">
      <Avatar :src="currentUser.avatar" :size="'small'" />
      <InputField
        class="flex-1"
        v-model="content"
        placeholder="回复..."
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommentContent } from '@/interface/Comment'
import InputField from './InputField.vue'

const props = defineProps<{
  currentUser: any
  replyTo: string
  onCancel: () => void
  onSubmit: (content: CommentContent) => void
}>()

const emit = defineEmits(['submit'])

const content = ref({
  text: '',
  images: []
})

const handleSubmit = () => {
  if (content.value.text.trim() || content.value.images.length > 0) {
    emit('submit', {
      text: content.value.text,
      images: content.value.images,
      user: props.currentUser,
    })
    // Reset content after submit
    content.value = {
      text: '',
      images: []
    }
  }
}
</script>