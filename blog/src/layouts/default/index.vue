<template>
  <el-container>
    <el-header class="p-0!"><Header></Header></el-header>
    <el-main class="p-0!"><Main></Main></el-main>
    <el-footer class="p-0!"><Footer></Footer></el-footer>
  </el-container>
</template>
<script setup lang="ts">
import Header from '../default/header/header.vue'
import Footer from '../default/footer/footer.vue'
import Main from '../default/main/index.vue'
import { ref, reactive } from 'vue'
</script>
<style lang="scss" scoped></style>
