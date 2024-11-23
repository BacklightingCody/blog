<template>
  <div class="mx-auto  flex-shrink-0">
    <div class="mt-30 w-full" v-if="width > 640">
      <div class="home-top flex">
        <div class="left mt-20 w-60% flex flex-col justify-center">
          <h1 class="text-2xl lg:text-3xl text-default-text  ">
            Hi, I'm <span class="font-800">backlighting</span>👋。
          </h1>
          <h1 class="text-2xl lg:text-3xl  text-default-text ml-5 mt-8"> A Front-end &lt;developer/&gt;</h1>
          <div class="flex mt-5">
            <iconCircle url="https://music.163.com/#/user/home?id=32630738630" toolTitle="网易云音乐">
              <iconCloudMusic></iconCloudMusic>
            </iconCircle>
            <iconCircle url="https://space.bilibili.com/1274808675?spm_id_from=333.1007.0.00" toolTitle="Bilibili">
              <iconBilibili></iconBilibili>
            </iconCircle>
            <iconCircle url="https://github.com/BacklightingCody" toolTitle="Github">
              <iconGithub></iconGithub>
            </iconCircle>
            <iconCircle url="https://x.com/pitilessmi77034" toolTitle="Twitter">
              <iconTwitter></iconTwitter>
            </iconCircle>
            <iconCircle url="https://www.douyin.com/user/self?from_tab_name=main" toolTitle="抖音">
              <iconTikTok></iconTikTok>
            </iconCircle>
          </div>
        </div>
        <div class="right w-40% flex flex-col mt-10">
          <Avatar :size='avatarSize' :rainbow="false" src="/avatar.jpg"></Avatar>
          <div class="mt-6 text-2xl font-400 text-default-text text-center">
            愿你我都能做生活的高手!
          </div>
        </div>
      </div>
      <div class="home-middle my-10 text-center">
        <h1
          class="my-5 text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500 text-2xl">
          Commit 时光拼图
        </h1>
        <img src="https://ghchart.rshah.org/BacklightingCody" alt="GitHub Contributions" class="w-full" rel="preload">
      </div>
    </div>
    <div v-else>
      <div class="home-top mt-40 w-full flex flex-col justify-center">
        <h1 class="text-center text-2xl lg:text-3xl text-default-text  ">
          Hi, I'm <span class="font-800">backlighting</span>👋。
        </h1>
        <h1 class="text-center text-2xl lg:text-3xl  text-default-text ml-5 mt-8"> A Front-end &lt;developer/&gt;</h1>

      </div>
      <div class="home-middle my-10">
        <div class="my-5 w-full flex items-center justify-center">
          <Avatar :size='avatarSize' :rainbow="false" src="/avatar.jpg"></Avatar>
        </div>
        <div class="my-5 text-2xl font-400 text-default-text text-center">
          愿你我都能做生活的高手!
        </div>
        <div class="flex justify-center my-5 h-[50px]">
          <iconCircle url="https://music.163.com/#/user/home?id=32630738630" toolTitle="网易云音乐">
            <iconCloudMusic></iconCloudMusic>
          </iconCircle>
          <iconCircle url="https://space.bilibili.com/1274808675?spm_id_from=333.1007.0.00" toolTitle="Bilibili">
            <iconBilibili></iconBilibili>
          </iconCircle>
          <iconCircle url="https://github.com/BacklightingCody" toolTitle="Github">
            <iconGithub></iconGithub>
          </iconCircle>
          <iconCircle url="https://x.com/pitilessmi77034" toolTitle="Twitter">
            <iconTwitter></iconTwitter>
          </iconCircle>
          <iconCircle url="https://www.douyin.com/user/self?from_tab_name=main" toolTitle="抖音">
            <iconTikTok></iconTikTok>
          </iconCircle>
        </div>
        <div class="my-5 text-center">
          <h1
            class="my-5 text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500 text-2xl">
            Commit 时光拼图
          </h1>
          <img src="https://ghchart.rshah.org/BacklightingCody" alt="GitHub Contributions" class="w-full">
        </div>
      </div>

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
import iconTwitter from '@/components/icons/iconTwitter.vue'
import iconTikTok from '@/components/icons/iconTikTok.vue';
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
