<template>
  <el-avatar
    :size="size"
    :src="props.src"
    :shape="shape"
    :fit="fit"
    @error="errorHandler"
  >
    <img src="/avatar.jpg" />
  </el-avatar>
</template>
<script setup lang="ts">
const props = defineProps({
  // 头像相关
  src: { type: String, default: '' },
  size: { type: Number, default: 50 },
  shape: { type: String, default: 'circle' },
  fit: { type: String, default: 'cover' }
})
const errorHandler = () => true
</script>
<style lang="scss" scoped></style>
