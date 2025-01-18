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
      <button @click="toggleEmojiPicker" class="text-gray-500 hover:text-[#FB7299] transition">
        <SmileIcon class="w-5 h-5" />
      </button>
      <label :for="uniqueId" class="cursor-pointer text-gray-500 hover:text-[#FB7299] transition">
        <ImageIcon class="w-5 h-5" />
        <input
          type="file"
          :id="uniqueId"
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
          multiple
        />
      </label>
    </div>

    <EmojiPicker
      v-if="showEmojiPicker"
      class="absolute bottom-12 left-0 z-1000"
      @select="addEmoji"
    />

    <!-- Display Image Previews -->
    <ImagePreview
      :images="modelValue.images"
      @remove-image="removeImage"
    />

    <!-- Progress Bar -->
    <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mt-2">
      <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
    </div>

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
import { ref } from 'vue'
import { SmileIcon, ImageIcon } from 'lucide-vue-next'
import EmojiPicker from './EmojiPicker.vue'
import ImagePreview from './ImagePreview.vue'
import { CommentContent } from '@/interface/Comment'

// Define props and emitters
const props = defineProps({
  placeholder: {
    type: String,
    default: '写下你的内容...',
  },
  modelValue: {
    type: Object as () => CommentContent,  // Change from string[] to File[]
    required: true,
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: CommentContent): void; // Change from string[] to File[]
  (e: 'submit'): void;
  (e: 'upload-progress', progress: number): void; // Add this to handle 'upload-progress' event
}>()

const uniqueId = `image-upload-${Math.random().toString(36).substr(2, 9)}`
const showEmojiPicker = ref(false)
const uploadProgress = ref(0) // Track upload progress

// Toggle emoji picker
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

// Update text input
const updateInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', {
    ...props.modelValue,
    text: target.value
  })
}

// Add emoji
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

    // For preview, read as base64 or object URL for files
    files.forEach((file) => {
      const newImages = [...props.modelValue.images, file]
      emit('update:modelValue', {
        ...props.modelValue,
        images: newImages
      })
    })
  }
}

// Remove image from preview
const removeImage = (index: number) => {
  console.log('Removing image at index:', index)

  const newImages = [...props.modelValue.images]
  newImages.splice(index, 1)
  emit('update:modelValue', {
    ...props.modelValue,
    images: newImages
  })
}

// Submit input
const submitInput = async () => {
  if (props.modelValue.text.trim() || props.modelValue.images.length > 0) {
    // Start uploading files
    await uploadFiles(props.modelValue.images)
    emit('submit')
  }
}

// Upload files when the user submits
const uploadFiles = async (files: File[]) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('images', file) // Add files to FormData
  })

  const xhr = new XMLHttpRequest()

  // Track upload progress
  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded / event.total) * 100)
      uploadProgress.value = progress
      emit('upload-progress', progress)
    }
  }

  // Handle success
  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText)
      const newImageUrls = response.data.imageUrls // Assuming the backend returns image URLs
      emit('update:modelValue', {
        ...props.modelValue,
        images: newImageUrls
      })
    }
  }

  // Handle error
  xhr.onerror = () => {
    console.error('File upload failed')
  }

  // Send the files to the server
  xhr.open('POST', '/upload', true)
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.send(formData)
}
</script>

<style scoped>
.progress-bar {
  height: 4px;
  background-color: #FB7299;
  transition: width 0.3s;
}
</style>
