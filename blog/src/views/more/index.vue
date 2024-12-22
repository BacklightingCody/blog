<template>
  <div class="bg-dark-100 w-[300px] h-[200px] flex justify-center mt-[100px]">
    <div class="flex flex-col items-center justify-center">
      <InputField placeholder="请输入" @input-change="handleChange"  @submit="handleSubmit"/>
    <InputField placeholder="输入" @input-change="handleChange"  @submit="handleSubmit"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getMoreApi } from '@/services/more'
// import { refreshToken } from '@/utils/refreshToken'
import InputField from '@/components/InputField.vue';
import { useGlobalStore, useUserStore } from '@/stores'
const userStore = useUserStore()
const run = () => {
  getMoreApi().then(res => {
    console.log(111)
  })
}
const handleChange = (content) => {
  console.log(content);
};
const handleSubmit = () => {
  console.log('submit');
};
</script>
<style lang="scss" scoped></style>
