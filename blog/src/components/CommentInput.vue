<template>
  <div class="bg-white rounded-lg p-4">
    <!-- Avatar & Comment Input Section -->
    <div class="flex items-start space-x-3">
      <Avatar :src="currentUser.avatar" :size="'middle'" />

      <div class="flex-1 relative">
        <!-- Comment Area -->
        <textarea
          v-model="newComment"
          placeholder="写下你的评论..."
          class="w-full min-h-[70px] p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <!-- Emoji & Image Picker -->
        <div class="flex items-center space-x-2 mt-2">
          <!-- Emoji Button -->
          <button @click="toggleEmojiPicker" class="text-gray-500 hover:text-[#FB7299] transition">
            <SmileIcon class="w-5 h-5" />
          </button>

          <!-- Image Upload Button -->
          <label for="image-upload" class="cursor-pointer text-gray-500 hover:text-[#FB7299] transition">
            <ImageIcon class="w-5 h-5" />
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload"
            />
          </label>
        </div>

        <!-- Emoji Picker -->
        <EmojiPicker
          v-if="showEmojiPicker"
          class="absolute bottom-12 left-0 z-1000"
          @select="addEmoji"
        />

        <!-- Image Preview & Remove -->
        <div v-if="selectedImages.length > 0" class="flex gap-2 mt-2">
          <div
            v-for="(image, index) in selectedImages"
            :key="index"
            class="relative w-20 h-20"
          >
            <img :src="image" class="w-full h-full object-cover rounded-lg" alt="Selected Image" />
            <button
              @click="removeImage(index)"
              class="absolute top-0 right-0 bg-gray-800 rounded-full p-1 text-white"
            >
              <XIcon class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end mt-2">
          <button
            @click="submitComment"
            :disabled="!newComment || newComment.trim() === ''"
            class="px-4 py-2 bg-[#FB7299] text-white rounded-full text-sm hover:bg-[#FB7299]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { SmileIcon, ImageIcon, XIcon } from 'lucide-vue-next'
import Avatar from '@/components/Avatar.vue'
import EmojiPicker from './EmojiPicker.vue'
import { User } from '@/interface/User'

// Props & Emits
const props = defineProps({
  currentUser: {
    type: Object as () => User,
    required: true,
  },
})

const emit = defineEmits(['add-comment'])

const newComment = ref<string>('')
const showEmojiPicker = ref(false)
const selectedImages = ref<string[]>([])

// Handle emoji picker toggle
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

// Handle emoji addition
const addEmoji = (emoji: string) => {
  newComment.value += emoji
}

// Handle image upload
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const files = Array.from(target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          selectedImages.value.push(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    })
    target.value = '' // Reset input
  }
}

// Remove image from preview
const removeImage = (index: number) => {
  selectedImages.value.splice(index, 1)
}

// Submit comment
const submitComment = () => {
  if (newComment.value.trim() || selectedImages.value.length) {
    emit('add-comment', { text: newComment.value, images: selectedImages.value })
    newComment.value = ''
    selectedImages.value = []
    showEmojiPicker.value = false
  }
}
</script>

<style scoped>
/* You can keep any scoped styles here */
</style>
