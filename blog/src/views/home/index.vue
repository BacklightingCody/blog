<template>
  <div class="mx-auto flex h-[500px] flex-shrink-0">
    <div class="left mt-20 w-60% flex flex-col justify-center">
      <h1 class="text-2xl lg:text-3xl text-default-text  ">
        Hi, I'm backlighting👋。
      </h1>
      <h1 class="text-2xl lg:text-3xl  text-default-text ml-5 mt-8"> A Front-end &lt;developer/&gt;</h1>
      <div class="flex">
        <iconCircle url="https://music.163.com/#/user/home?id=32630738630" bgColor="#DE0014">
          <iconCloudMusic></iconCloudMusic>
        </iconCircle>
        <iconCircle url="https://space.bilibili.com/1274808675?spm_id_from=333.1007.0.00" bgColor="#FB7299">
          <iconBilibili></iconBilibili>
        </iconCircle>
        <iconCircle url="https://github.com/BacklightingCody">
          <iconGithub></iconGithub>
        </iconCircle>

      </div>
    </div>
    <div class="right w-40% flex items-center justify-center mt-10">
      <Avatar :size='avatarSize' :rainbow="false" src="/avatar.jpg"></Avatar>
    </div>

  </div>
</template>
<script setup lang="ts">
import Avatar from '@/components/Avatar.vue';
import { useWindowSize } from '@vueuse/core';
import iconCircle from '@/components/iconCircle.vue';
import iconCloudMusic from '@/components/icons/iconCloudMusic.vue';
import iconBilibili from '@/components/icons/iconBilibili.vue';
import iconGithub from '@/components/icons/iconGithub.vue';

const windowSize = useWindowSize()
const width = windowSize.width
const height = windowSize.height
const avatarSize = computed(() => {
  return width.value > 1023 ? 300 : 200
})


</script>
<style lang="scss" scoped>
.nav {
  width: 300px;
  height: 200px;
  background-color: var(--bg-color);
  position: relative;
  overflow: hidden;

}

.nav::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--btn-color) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  pointer-events: none;
}

.nav:hover::before {
  transform: translate(-50%, -50%) scale(0.5);
  opacity: 1;
}
</style>
