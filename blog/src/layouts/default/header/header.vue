<template>
  <div class="flex w-full h-[60px] items-center bg-[var(--background-color)]">
    <avatar class="m-3"></avatar>
    <Nav class="ml-auto h-[40px]!"></Nav>
    <div class="w-[100px] h-[60px] ml-auto flex items-center">
      <ColorMode></ColorMode>
      <div><el-button type="success" class="text-white ml-2" size="small" @click="loginSubmit">登录</el-button></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Avatar from '@/components/Avatar.vue'
import Nav from './Nav.vue'
import ColorMode from './ColorMode.vue'
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
</script>
<style lang="scss" scoped></style>
