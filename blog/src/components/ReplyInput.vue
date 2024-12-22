<template>
    <div class="bg-white rounded-lg p-4">
      <!-- Avatar & Comment Input Section -->
      <div class="flex items-start space-x-3">
        <Avatar :src="currentUser.avatar" :size="'small'" />
        <InputField
           :images="images"
          class="flex-1"
          v-model="replyContent"
          placeholder="回复..."
          @input-change="handleInputChange"
          @submit="handleSubmit"
        />
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CommentContent } from '@/interface/Comment';
import InputField from './InputField.vue';

const props = defineProps<{
  currentUser: any;
  replyTo: string;
  onCancel: () => void;
  onSubmit: (content: CommentContent) => void; 
}>();

const emit = defineEmits(['submit'])

const replyContent = ref('') 
const images = ref<string[]>([])


const handleInputChange = (content: { text: string; images: string[] }) => {
  replyContent.value = content.text;
};

const handleSubmit = () => {
  if (replyContent.value.trim() || images.value.length > 0) {
    emit('submit', {
      text: replyContent.value,
      images: images.value,
      user: props.currentUser,
    });
    replyContent.value = '';
    images.value = [];
  }
};

</script>

<style scoped>

</style>
