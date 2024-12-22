<template>
  <div class="input-field relative">
    <!-- Textarea Input -->
    <textarea
      v-model="inputText"
      :placeholder="placeholder"
      class="w-full min-h-[70px] p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>

    <!-- Emoji & Image Picker Buttons -->
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

    <EmojiPicker
      v-if="showEmojiPicker"
      class="absolute bottom-12 left-0 z-1000"
      @select="addEmoji"
    />
    
    <ImagePreview
      :images="images"
      @remove-image="removeImage"
    />

    <!-- Submit Button -->
    <div class="flex justify-end mt-2">
      <button
        @click="submitInput"
        :disabled="!inputText || inputText.trim() === ''"
        class="px-4 py-2 bg-[#FB7299] text-white rounded-full text-sm hover:bg-[#FB7299]/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        提交
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SmileIcon, ImageIcon, XIcon } from 'lucide-vue-next'
import EmojiPicker from './EmojiPicker.vue'
import ImagePreview from './ImagePreview.vue'

// Props & Emits
const props = defineProps({
  placeholder: {
    type: String,
    default: '写下你的内容...',
  },
  images: {
    type: Array as () => string[],
    required: true,
  },
})

const emit = defineEmits(['input-change','submit'])

const inputText = ref<string>('')
const showEmojiPicker = ref(false)
const images = ref<string[]>([])

// Handle emoji picker toggle
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

// Handle emoji addition
const addEmoji = (emoji: string) => {
  inputText.value += emoji
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
          images.value.push(e.target.result as string)
          emit('input-change', { text: inputText.value, images: images.value })
        }
      }
      reader.readAsDataURL(file)
    })
    target.value = '' // Reset input
  }
}

// Remove image from preview
const removeImage = (index: number) => {
  images.value.splice(index, 1)
  emit('input-change', { text: inputText.value, images: images.value })
}

// Submit input
const submitInput = () => {
  if (inputText.value.trim() || images.value.length > 0) {
    emit('input-change', { text: inputText.value, images: images.value })
    emit('submit')
    inputText.value = '' // Reset content after submit
    images.value = [] // Clear images after submit
  }
}
</script>
