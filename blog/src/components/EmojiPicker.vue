<template>
  <div 
    class="emoji-picker" 
    :style="{ width: `${columns * 40}px` }"
    :class="{ 'emoji-picker--dark': isDarkMode }"
  >
    <div class="emoji-categories" v-if="showCategories">
      <button
        v-for="category in categories"
        :key="category.name"
        class="category-btn"
        :class="{ 'active': currentCategory === category.name }"
        @click="setCategory(category.name)"
        :aria-label="`${category.name} category`"
      >
        {{ category.icon }}
      </button>
    </div>
    <div 
      class="emoji-grid"
      :style="{ 
        'grid-template-columns': `repeat(${columns}, 1fr)`,
        'max-height': `${rows * 40}px`
      }"
    >
      <button
        v-for="emoji in currentEmojis"
        :key="emoji"
        class="emoji-btn"
        @click="selectEmoji(emoji)"
        :aria-label="`Select ${emoji} emoji`"
      >
        {{ emoji }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Category {
  name: string
  icon: string
  emojis: string[]
}

const props = defineProps({
  initialCategory: {
    type: String,
    default: 'smileys'
  },
  columns: {
    type: Number,
    default: 8
  },
  rows: {
    type: Number,
    default: 4
  },
  showCategories: {
    type: Boolean,
    default: true
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const categories: Category[] = [
  { name: 'smileys', icon: '😊', emojis: ['😊', '😂', '😅', '😍', '😘', '🤔', '😎', '😴'] },
  { name: 'animals', icon: '🐶', emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'] },
  { name: 'food', icon: '🍎', emojis: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓'] },
  { name: 'activities', icon: '⚽', emojis: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱'] }
]

const currentCategory = ref(props.initialCategory)

const currentEmojis = computed(() => {
  const category = categories.find(c => c.name === currentCategory.value)
  return category ? category.emojis : []
})

const setCategory = (category: string) => {
  currentCategory.value = category
}

const selectEmoji = (emoji: string) => {
  emit('select', emoji)
}
</script>

<style scoped>
.emoji-picker {
  position: absolute;
  bottom: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.emoji-picker--dark {
  background: #2c2c2c;
  border-color: #444;
  color: white;
}

.emoji-categories {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.emoji-picker--dark .emoji-categories {
  border-bottom-color: #444;
}

.category-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.category-btn:hover,
.category-btn.active {
  background-color: #f0f0f0;
}

.emoji-picker--dark .category-btn:hover,
.emoji-picker--dark .category-btn.active {
  background-color: #3c3c3c;
}

.emoji-grid {
  display: grid;
  gap: 0.25rem;
  overflow-y: auto;
}

.emoji-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1.25rem;
  transition: background-color 0.2s, transform 0.1s;
}

.emoji-btn:hover {
  background: #f5f5f5;
  transform: scale(1.1);
}

.emoji-picker--dark .emoji-btn:hover {
  background: #3c3c3c;
}

.emoji-btn:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .emoji-picker {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 8px 8px 0 0;
  }
}
</style>

