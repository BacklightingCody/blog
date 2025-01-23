<template>
  <div 
    class="book-item bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
    @click="$emit('click', book)"
  >
    <img :src="book.cover" :alt="book.title" class="w-full h-64 object-cover">
    <div class="p-4 h-40 flex flex-col">
      <h3 class="text-lg font-semibold text-gray-800 mb-1 truncate" :title="book.title">{{ book.title }}</h3>
      <div class="mt-auto">
        <p class="text-sm text-gray-600 mb-2">{{ book.author }}</p>
        <ProgressBar :progress="book.progress" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProgressBar from './ProgressBar.vue';

defineProps({
  book: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);
</script>

