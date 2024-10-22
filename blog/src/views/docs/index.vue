<template>
  <div class="w-full">
    <div class="flex flex-wrap flex-grow  gap-6 m-auto">
      <CategoryCard v-for="category in categories" :key="category.name" :category="category" />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryCard from '@/components/CategoryCard.vue'

const categories = ref([
  {
    name: 'Linux',
    image: '/path/to/linux-image.png',
    color: '#8BC34A',
    flipped: false,
    subcategories: ['Bash Scripting', 'System Administration', 'Networking']
  },
  {
    name: 'Docker',
    image: '/path/to/docker-image.png',
    color: '#2196F3',
    flipped: false,
    subcategories: ['CoreElec环境 Docker...', 'Docker 简单的Go项...', 'Docker部署 tusd上...', 'Docker部署Nginx反...', 'Play With Docker ...']
  },
  {
    name: 'FastAdmin',
    image: '/path/to/fastadmin-image.png',
    color: '#FF9800',
    flipped: false,
    subcategories: ['Installation', 'Customization', 'Plugins']
  },
  {
    name: 'Hexo',
    image: '/path/to/hexo-image.png',
    color: '#9C27B0',
    flipped: false,
    subcategories: ['Themes', 'Plugins', 'Deployment']
  },
  {
    name: 'FastAdmin',
    image: '/path/to/fastadmin-image.png',
    color: '#FF9800',
    flipped: false,
    subcategories: ['Installation', 'Customization', 'Plugins']
  },
])
</script>

<style scoped lang="scss"></style>
