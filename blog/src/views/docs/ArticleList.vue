<template>
  <div class="w-full">
    <ArticleLine :articles="articles" />
  </div>
</template>
<script setup lang="ts">
import ArticleLine from '@/components/ArticleLine.vue';
const articles = [
  {
    title: 'vue3.0+ts+vite2.0+element-plus+vuex4.0+vue-router4.0+sass+axios+vue-cli4.0+vue-template-compiler',
    date: '2021-07-07',
    // content: 'vue3.0+ts+vite2.0+element-plus+vuex4.0+vue-router'
  },
  {
    title: '+vue-class-component+vuex-module-decorators+vue-property-decorator',
    date: '2021-07-07',
    // content:'sda'
  }
]



</script>
<style lang="scss" scoped></style>
