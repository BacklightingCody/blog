<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import Avatar from '@/components/Avatar.vue'
import Nav from './Nav.vue'
import ColorMode from './ColorMode.vue'
import Signature from '@/components/Signature.vue'
import { loginApi, githubLoginApi } from '@/services/auth'
import { useGlobalStore } from '@/stores'
import { useUserStore } from '@/stores'
import { useWindowSize } from '@vueuse/core';
const globalStore = useGlobalStore()
const userStore = useUserStore()
const userAvatar = ref(userStore.avatar)
const loginSubmit = (method: string) => {
  switch (method) {
    case 'github':
      githubLoginApi()
      break;
    case 'email':
      break;
  }
}
onMounted(async () => {
  console.log(import.meta.env.VITE_BACKEND_URL)
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get('user_id')
  const isLoggedFromUrl = urlParams.get('logged_in');
  if (isLoggedFromUrl != null) {
    userStore.isLoggedIn = !!isLoggedFromUrl
  }
  if (userId) {
    userStore.userId = userId
    await userStore.getUserInfo(userId)
  } else if (userStore.userId) {
    console.log('userStore.userId', userStore.userId)
    await userStore.getUserInfo(userStore.userId)
  }else{
    userStore.isLoggedIn = false
    userStore.clearUserInfo()
  }
  // 清理 URL 参数，避免多次判断
  window.history.replaceState({}, document.title, window.location.pathname)
})
watch(() => userStore.avatar, (newAvatar) => {
  userAvatar.value = newAvatar;
});
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
<template>
  <div class="header-container" ref="header" :class="{ isborder: showHeaderBorder }">
    <div class="blur-background"></div>
    <avatar class="m-2.5" :size="windowWidth > 768 ? 40 : 30" src="/avatar.jpg"></avatar>
    <Signature :width="windowWidth > 768 ? '150px' : '100px'" :height="windowWidth > 768 ? '50px' : '40px'"
      class="relative top-[5px] ml-[15px]"></Signature>
    <Nav class="mx-auto h-[40px]!  border-b-[1px] border-solid border-gray-400 border-op-0"
      :class="{ isborder: showNavBorder }"></Nav>

    <div class="w-[100px] h-[60px] flex items-center">
      <ColorMode></ColorMode>
      <!-- <div><el-button type="success" class="text-black ml-2" size="small" @click="loginSubmit">登录</el-button></div> -->
      <avatar :src="userAvatar" :size="windowWidth > 768 ? 40 : 30" @click="loginSubmit('github')" class="ml-2">
      </avatar>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header-container {

  @apply flex px-10 absolute w-full right-0 left-0 items-center border-b-[1px] border-solid border-gray-400 border-op-0 z-10;

  @media (max-width:500px) {
    @apply px-2
  }
}

.header-container::after {
  @apply content-[''] absolute w-full h-full top-0 left-0 backdrop-filter backdrop-blur-xl backdrop-brightness-100 backdrop-contrast-100 z--1
}

.blur-background {
  @apply absolute w-full h-full top-0 left-0 backdrop-filter backdrop-blur-xl bg-default-bg opacity-80 z--2;
}

.isborder {
  @apply border-op-30 transition-all .duration-1000
}

.isPadding {
  @apply px-2;
}
</style>
