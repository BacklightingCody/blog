<template>
  <div class="input-field relative">
    <!-- Textarea Input -->
    <textarea
      :value="modelValue.text"
      @input="updateInput"
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
      <label :for="uniqueId" class="cursor-pointer text-gray-500 hover:text-[#FB7299] transition">
        <ImageIcon class="w-5 h-5" />
        <input
          type="file"
          :id="uniqueId"
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
      :images="modelValue.images"
      @remove-image="removeImage"
    />

    <!-- Submit Button -->
    <div class="flex justify-end mt-2">
      <button
        @click="submitInput"
        :disabled="!modelValue.text || modelValue.text.trim() === ''"
        class="px-4 py-2 bg-[#FB7299] text-white rounded-full text-sm hover:bg-[#FB7299]/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        提交
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SmileIcon, ImageIcon } from 'lucide-vue-next'
import EmojiPicker from './EmojiPicker.vue'
import ImagePreview from './ImagePreview.vue'

interface InputContent {
  text: string;
  images: string[];
}

// Props & Emits
const props = defineProps({
  placeholder: {
    type: String,
    default: '写下你的内容...',
  },
  modelValue: {
    type: Object as () => InputContent,
    required: true,
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

// Generate unique ID for file input
const uniqueId = `image-upload-${Math.random().toString(36).substr(2, 9)}`
const showEmojiPicker = ref(false)

// Handle emoji picker toggle
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

// Handle input update
const updateInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', {
    ...props.modelValue,
    text: target.value
  })
}

// Handle emoji addition
const addEmoji = (emoji: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    text: props.modelValue.text + emoji
  })
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
          const newImages = [...props.modelValue.images, e.target.result as string]
          emit('update:modelValue', {
            ...props.modelValue,
            images: newImages
          })
        }
      }
      reader.readAsDataURL(file)
    })
    target.value = '' // Reset input
  }
}

// Remove image from preview
const removeImage = (index: number) => {
  const newImages = [...props.modelValue.images]
  newImages.splice(index, 1)
  emit('update:modelValue', {
    ...props.modelValue,
    images: newImages
  })
}

// Submit input
const submitInput = () => {
  if (props.modelValue.text.trim() || props.modelValue.images.length > 0) {
    emit('submit')
  }
}
</script>