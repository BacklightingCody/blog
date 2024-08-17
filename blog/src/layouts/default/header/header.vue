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

import { login } from '@/services/index'
const loginSubmit = () => {
  login({username:'123',password:'123'})
}
</script>
<style lang="scss" scoped></style>
