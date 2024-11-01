<template>
  <div class="relative flex justify-center items-center flex-shrink-0 " :class="{ 'circle': rainbow }">
    <el-avatar :size="size" :src="props.src" :shape="shape" :fit="fit" @error="errorHandler">
      <img :src="props.src" v-if="props.src" />
      <iconUser v-if="!props.src" class="user-default" @click="userLogin" />
    </el-avatar>
  </div>
</template>
<script setup lang="ts">
import iconUser from '@/components/icons/iconUser.vue'
const props = defineProps({
  // 头像相关
  src: { type: String, default: '' },
  size: { type: Number, default: 40 },
  shape: { type: String, default: 'circle' },
  fit: { type: String, default: 'cover' },
  rainbow: { type: Boolean, default: true }
})
const errorHandler = () => true
const userLogin = () => {

}
</script>
<style lang="scss" scoped>
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
}

.user-default {
  @apply text-default-text
}
</style>
