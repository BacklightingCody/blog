<template>
  <div class="flex  fixed w-full items-center bg-default-bg border-b-[1px] border-solid border-gray-400 border-op-0"
    ref="header" :class="{ isborder: showHeaderBorder }">
    <avatar class="m-2.5" :size="windowWidth > 900 ? 40 : 30"></avatar>
    <Signature :width="windowWidth > 900 ? '150px' : '90px'" :height="windowWidth > 900 ? '50px' : '40px'"
      class="relative top-[5px] ml-[15px]"></Signature>
    <Nav class="mx-auto h-[40px]!  border-b-[1px] border-solid border-gray-400 border-op-0"
      :class="{ isborder: showNavBorder }"></Nav>

    <div class="w-[100px] h-[60px] flex items-center">
      <ColorMode></ColorMode>
      <div><el-button type="success" class="text-black ml-2" size="small" @click="loginSubmit">登录</el-button></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import Avatar from '@/components/Avatar.vue'
import Nav from './Nav.vue'
import ColorMode from './ColorMode.vue'
import Signature from '@/components/Signature.vue'
import { loginApi } from '@/services/auth'
import { useGlobalStore } from '@/stores'
import { useWindowSize } from '@vueuse/core';
const globalStore = useGlobalStore()
const loginSubmit = () => {
  loginApi({ username: 'backlighting', password: '123456' }).then(res => {
    globalStore.setToken(res.data.refreshToken, 'refresh')
    globalStore.setToken(res.data.accessToken, 'access')
    globalStore.changeLoginStatus(true)
    ElMessage({
      message: res.message,
      type: 'success'
    })
  })
}
// 根据滚动控制是否显示底部bordr
const showHeaderBorder = ref(false)
const showNavBorder = ref(true)
const headerRef = useTemplateRef<HTMLElement | null>('header')
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop;
  const threshold = headerRef.value.offsetHeight;  // headerRef的临界值，可以根据需要调整
  if (scrollTop > threshold) {
    showHeaderBorder.value = true
    showNavBorder.value = false
  } else {
    showHeaderBorder.value = false
    showNavBorder.value = true
  }

}
watchEffect(() => {

})
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
})
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
<style lang="scss" scoped>
.isborder {
  @apply border-op-30 transition-all .duration-1000
}
</style>
