<script setup lang="ts">
import Header from '../default/header/header.vue'
import Footer from '../default/footer/footer.vue'
import Main from '../default/main/index.vue'
import { useWindowSize } from '@vueuse/core';
// 响应式设计
const windowWidth = ref(0);
const windowHeight = ref(0);
const { width, height } = useWindowSize();
onMounted(() => {
  windowWidth.value = width.value;
  windowHeight.value = height.value;
});
watch(width, () => {
  windowWidth.value = width.value;
})
</script>
<template>
  <el-container class="box-border w-full">
    <el-header class="fixed w-full border-box h-[70px]! z-50">
      <Header></Header>
    </el-header>
    <el-main class="p-0! mt-[70px]!">
      <Main></Main>
    </el-main>
    <el-footer class="p-0!">
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>
<style lang="scss">
body {
  background: var(--background-color);
}

/* Firefox 浏览器的滚动条样式 */
/* 针对 Chrome, Safari 和 Edge 定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  /* 设置垂直滚动条宽度 */
  height: 8px;
  /* 设置水平滚动条高度 */
}

::-webkit-scrollbar-thumb {
  background-color: var(--currency-color);
  border-radius: 8px;
  /* 滚动条滑块的圆角效果 */
}

::-webkit-scrollbar-track {
  background-color: var(--background-color);
  /* 滚动条轨道的颜色 */
}
</style>
<style scoped>
</style>
