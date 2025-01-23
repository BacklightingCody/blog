<template>
  <div class="min-h-screen bg-default-bg p-8 rounded-lg">
    <h1 class="text-4xl font-bold text-center text-default-currgb mb-8">书海拾贝</h1>
    
    <div class="mb-6 flex justify-center">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="currentCategory = category"
        class="mx-2 px-4 py-2 rounded-full transition-colors duration-300"
        :class="currentCategory === category ? 'bg-default-currgb text-white' : 'bg-white text-gray-700 hover:bg-gray-200'"
      >
        {{ category }}
      </button>
    </div>

    <transition-group 
      name="book-list" 
      tag="div" 
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <BookCard
        v-for="book in filteredBooks"
        :key="book.id"
        :book="book"
        @click="openBookDetails"
      />
    </transition-group>

    <teleport to="body">
      <div v-if="selectedBook" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-md w-full p-6">
          <img :src="selectedBook.cover" :alt="selectedBook.title" class="w-full h-64 object-contain rounded-lg mb-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedBook.title }}</h2>
          <p class="text-gray-600 mb-4">作者：{{ selectedBook.author }}</p>
          <ProgressBar :progress="selectedBook.progress" class="mb-4" />
          <p class="text-gray-700 mb-4">{{ selectedBook.description }}</p>
          <button @click="selectedBook = null" class="bg-default-currgb text-white px-4 py-2 rounded hover:bg-active-btnText transition-colors duration-300">
            关闭
          </button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BookCard from '@/components/BookCard.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const books = ref([
  { id: 1, title: "JavaScript高级程序设计", author: "Nicholas C. Zakas", cover: "/picture/bookShelf/javascript高级程序设计.avif", category: "编程", description: "深入探讨JavaScript语言核心，适合有一定经验的开发者。", progress: 90 },
  { id: 2, title: "Vue.js设计与实现", author: "霍春阳", cover: "/picture/bookShelf/Vue.js设计与实现.avif", category: "编程", description: "详细讲解Vue.js的设计思想和实现原理。", progress: 90 },
  { id: 3, title: "JavaScript权威指南", author: "David Flanagan", cover: "/picture/bookShelf/JavaScript权威指南.avif", category: "编程", description: "JavaScript 语言的权威参考书，全面介绍 JavaScript 的核心语法、特性和应用，适合所有层次的开发者。", progress: 90 },
  { id: 4, title: "你不知道的JavaScript上卷", author: "KYLE SIMPSON", cover: "/picture/bookShelf/你不知道的JavaScript上卷.avif", category: "编程", description: "深入探讨 JavaScript 的核心概念，包括作用域、闭包、this 和对象原型，帮助开发者深入理解语言机制。", progress: 90 },
  { id: 5, title: "你不知道的JavaScript中卷", author: "KYLE SIMPSON", cover: "/picture/bookShelf/你不知道的JavaScript中卷.avif", category: "编程", description: "深入讲解 JavaScript 的异步编程、Promise、生成器和性能优化，帮助开发者掌握高级编程技巧。", progress: 80 },
  { id: 6, title: "你不知道的JavaScript下卷", author: "KYLE SIMPSON", cover: "/picture/bookShelf/你不知道的JavaScript下卷.avif", category: "编程", description: "探讨 JavaScript 的模块化、ES6+ 新特性、元编程和性能调优，帮助开发者编写现代、高效的 JavaScript 代码。", progress: 70 },
  { id: 7, title: "坐标React星：React核心思维模型", author: "叶凌东", cover: "/picture/bookShelf/坐标React星-React核心思维模型.avif", category: "编程", description: "深入解析 React 的核心思维模型，包括组件化、状态管理、Hooks 和渲染机制，帮助开发者掌握 React 的设计哲学和最佳实践。", progress: 100 },
  { id: 8, title: "React学习手册（第二版）", author: "Alex Banks | Eve Porcello", cover: "/picture/bookShelf/React学习手册（第二版）.avif", category: "编程", description: "深入解析 React 的核心思维模型，包括组件化、状态管理、Hooks 和渲染机制，帮助开发者掌握 React 的设计哲学和最佳实践。", progress: 90 },
])

const categories = ['全部', '编程']
const currentCategory = ref('全部')
const selectedBook = ref(null)

const filteredBooks = computed(() => {
  return currentCategory.value === '全部' 
    ? books.value 
    : books.value.filter(book => book.category === currentCategory.value)
})

const openBookDetails = (book) => {
  selectedBook.value = book
}
</script>

<style scoped>
.book-list-enter-active,
.book-list-leave-active {
  transition: all 0.5s ease;
}
.book-list-enter-from,
.book-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

