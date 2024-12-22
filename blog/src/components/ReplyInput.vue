<template>
  <div class="reply-input">
    <!-- 回复框 -->
    <textarea
      v-model="replyText"
      class="w-full h-20 border rounded p-2"
      placeholder="请输入回复内容..."
    ></textarea>

    <!-- 图片上传 -->
    <div v-if="images.length" class="mt-2 grid grid-cols-3 gap-2">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative w-full h-32 rounded-lg overflow-hidden"
      >
        <img :src="image" class="w-full h-full object-cover" alt="Reply Image" />
        <button
          class="absolute top-1 right-1 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center"
          @click="removeImage(index)"
        >
          x
        </button>
      </div>
    </div>

    <div class="mt-2 flex items-center justify-between">
      <input
        type="file"
        multiple
        @change="handleImageUpload"
        class="border p-2 rounded"
      />
      <button @click="submitReply" class="bg-[#FB7299] text-white px-4 py-2 rounded">
        提交回复
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  currentUser: any;
  replyTo: string;
  onCancel: () => void;
  onSubmit: (content: { text: string; images: string[] }) => void; // Update the onSubmit signature
}>();

const replyText = ref('');
const images = ref<string[]>([]);

const handleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        images.value.push(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
};

const removeImage = (index: number) => {
  images.value.splice(index, 1);
};

const submitReply = () => {
  if (replyText.value.trim() || images.value.length > 0) {
    props.onSubmit({
      text: replyText.value,
      images: images.value,
    });
    replyText.value = '';
    images.value = [];
  }
};
</script>

<style scoped>
.reply-input {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.reply-input textarea {
  width: 100%;
}

.reply-input img {
  width: 100%;
  height: 100%;
}
</style>
