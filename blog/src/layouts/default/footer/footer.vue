<template>
  <div class="w-full h-[60px] pt-[10px] border border-solid border-default-border">
    <div class="flex justify-center h-full items-center">
      <a class="text-default-text" href="https://beian.miit.gov.cn/#/Integrated/index">
        © 2024 | 	晋ICP备2024050623号-1
      </a>
      <GithubStar class="mx-5" />
    </div>
   
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import GithubStar from '@/components/GithubStar.vue'
</script>
<style lang="scss" scoped></style>
