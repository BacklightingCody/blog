<template>
  <div class="circle flex justify-center items-center">
    <el-avatar
    :size="size"
    :src="props.src"
    :shape="shape"
    :fit="fit"
    @error="errorHandler"
  >
    <img src="/avatar.jpg" />
  </el-avatar>
  </div>
  
</template>
<script setup lang="ts">
const props = defineProps({
  // 头像相关
  src: { type: String, default: '' },
  size: { type: Number, default: 40 },
  shape: { type: String, default: 'circle' },
  fit: { type: String, default: 'cover' }
})
const errorHandler = () => true
</script>
<style lang="scss" scoped>
.circle{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background:conic-gradient(#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00);
  position:relative;
}
</style>
