<template>
  <div
    class="fixed flex w-full items-center bg-default-bg border-b-[1px] border-solid border-gray-400 border-op-0 px-20"
    ref="header" :class="{ isborder: showHeaderBorder }">
    <avatar class="m-2.5"></avatar>
    <Signature width="150px" height="50px" class="relative top-[5px] ml-[20px] flex-shrink-0"></Signature>
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
</script>
<style lang="scss" scoped>
.isborder {
  @apply border-op-30 transition-all .duration-1000
}
</style>
