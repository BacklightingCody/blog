<template>
  <div class="bg-dark-100 w-[100px[] h-[200px] flex justify-center">
    <el-button type="success" @click="run">请求</el-button>
    <el-button type="warning" @click="refresh">刷新token</el-button>
    <el-button type="primary" @click="refreshstatus">刷新status</el-button>
  </div>
</template>
<script setup lang="ts">
import { getMoreApi } from '@/services/more'
import { refreshToken } from '@/utils/refreshToken'
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()
const run = () => {
  getMoreApi().then(res => {
    console.log(res, 'more')
    ElMessage.success(res.message)
  })
}
const refreshstatus = () => {
  globalStore.changeLoginStatus(false)
  console.log(globalStore.isLogin)
}
async function refresh() {
  await refreshToken()
}
</script>
<style lang="scss" scoped></style>
