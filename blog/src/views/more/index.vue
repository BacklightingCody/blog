<template>
  <div class="bg-dark-100 w-[300px] h-[200px] flex justify-center mt-[100px]">
    <div class="flex flex-col items-center justify-center">
    </div>
  </div>
</template>
<script setup lang="ts">
import { getMoreApi } from '@/services/more'
// import { refreshToken } from '@/utils/refreshToken'
import { useGlobalStore, useUserStore } from '@/stores'
const userStore = useUserStore()
const run = () => {
  getMoreApi().then(res => {
    console.log(111)
  })
}
</script>
<style lang="scss" scoped></style>
