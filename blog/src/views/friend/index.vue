<template>
  <div class="w-full h-full">
    <div>
      <CategoryCardList title="朋友们" :categories="categories"></CategoryCardList>
    </div>
  </div>
</template>
<script setup lang="ts">
import CategoryCardList from '@/components/CategoryCardList.vue';

const categories = [{
  name: 's1rius',
  link: 'https://s1rius.space/',
  backgroundImage: 'https://s1rius.space/img/custom/avatar.webp'
}]
</script>
<style lang="scss" scoped></style>
