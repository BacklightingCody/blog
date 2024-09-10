<template>
<<<<<<< Updated upstream
  <div class="flex w-full h-[70px] items-center bg-[var(--background-color)]">
    <avatar class="m-3"></avatar>
=======
  <div class="fixed flex w-full items-center bg-default-bg" ref="header" :class="{ isborder: showHeaderBorder }">
    <avatar class="m-2.5"></avatar>
>>>>>>> Stashed changes
    <Signature width="150px" height="50px" class="absolute left-[80px] top-[15px]"></Signature>
    <Nav class="ml-auto h-[40px]!" :class="{ isborder: showNavBorder }"></Nav>
    <div class="w-[100px] h-[60px] ml-auto flex items-center">
      <ColorMode></ColorMode>
      <div><el-button type="success" class="text-white ml-2" size="small" @click="loginSubmit">登录</el-button></div>
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
  }else{
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
</script>
<style lang="scss" scoped>
.isborder {
  @apply border-b-[1px] border-solid border-gray-400 border-op-30
}
</style>
