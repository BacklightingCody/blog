<template>
  <div
    class="relative flex justify-center items-center flex-shrink-0"
    :class="{ 'circle': rainbow }"
    :style="computedStyle"
  >
    <el-avatar
      :size="computedSize"
      :src="src"
      :shape="shape"
      :fit="fit"
      @error="errorHandler"
    >
      <img :src="src" v-if="src" />
      <slot v-else>
        <iconUser class="user-default" @click="userLogin" />
      </slot>
    </el-avatar>
  </div>
</template>

<script setup lang="ts">
import iconUser from '@/components/icons/iconUser.vue'

const props = defineProps({
  src: { type: String, default: '' },
  size: { type: [Number, String], default: 'middle' }, // number or predefined size
  shape: { type: String, default: 'circle' },
  fit: { type: String, default: 'cover' },
  rainbow: { type: Boolean, default: true }
})

const sizeMap = {
  small: 32,
  middle: 45,
  large: 64
}

const computedSize = computed(() => {
  return typeof props.size === 'number' ? props.size : sizeMap[props.size] || sizeMap.middle
})

const computedStyle = computed(() => {
  if (!props.rainbow) return {}
  const haloSize = typeof props.size === 'number' ? props.size + 10 : (sizeMap[props.size] || sizeMap.middle) + 10
  return {
    width: `${haloSize}px`,
    height: `${haloSize}px`,
    borderRadius: '50%',
    background: 'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)'
  }
})

const errorHandler = () => true
const userLogin = () => {}
</script>

<style lang="scss" scoped>
.user-default {
  @apply text-default-text;
}
</style>
