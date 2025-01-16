<template>
  <div class="mx-auto  flex-shrink-0">
    <div class="mt-30 w-full" v-if="width > 640">
      <div class="home-top flex" ref="homeTop">
        <div class="left mt-20 w-60% flex flex-col justify-center">
          <h1 class="animated-title text-2xl lg:text-3xl text-default-text ">
            Hi, I'm <i class="font-800">backlighting</i>👋。
          </h1>
          <h1 class="animated-title text-2xl lg:text-3xl  text-default-text ml-5 mt-8"> A Front-end &lt;developer/&gt;
          </h1>
          <div class="flex mt-5">
            <iconCircle url="https://music.163.com/#/user/home?id=32630738630" toolTitle="网易云音乐"   class="icon-item">
              <iconCloudMusic></iconCloudMusic>
            </iconCircle>
            <iconCircle url="https://space.bilibili.com/1274808675?spm_id_from=333.1007.0.00" toolTitle="Bilibili"   class="icon-item">
              <iconBilibili></iconBilibili>
            </iconCircle>
            <iconCircle url="https://github.com/BacklightingCody" toolTitle="Github"   class="icon-item">
              <iconGithub></iconGithub>
            </iconCircle>
            <iconCircle url="https://x.com/pitilessmi77034" toolTitle="Twitter"   class="icon-item">
              <iconTwitter></iconTwitter>
            </iconCircle>
            <iconCircle url="https://www.douyin.com/user/self?from_tab_name=main" toolTitle="抖音"   class="icon-item">
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
        <div>
          <BarrageContainer :speed="8">
            <div v-for="(item, index) in skills":key=item.name>
              <SkillTag :color="item.color">{{ item.name }}</SkillTag>
            </div>
          </BarrageContainer>
        </div>
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
        <h1 class="text-center text-2xl lg:text-3xl  text-default-text  mt-8"> A Front-end &lt;developer/&gt;</h1>

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
import BarrageContainer from '@/components/BarrageContainer.vue';
import SkillTag from '@/components/SkillTag.vue';
const windowSize = useWindowSize()
const width = windowSize.width
const height = windowSize.height
const avatarSize = computed(() => {
  return width.value > 1023 ? 300 : 200
})
const skills = [
      { name: "HTML", color: "#E34F26" },
      { name: "CSS", color: "#1572B6" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "Node.js", color: "#339933" },
      { name: "Vue", color: "#42B883" },
      { name: "React", color: "#61DAFB" },
      { name: "Docker", color: "#2496ED" },
      { name: "Nginx", color: "#009639" },
      { name: "Linux", color: "#FCC624" },
      { name: "Tailwind CSS", color: "#38B2AC" },
      { name: "UnoCSS", color: "#FFD700" },
      { name: "Vite", color: "#646CFF" },
      { name: "SCSS", color: "#C6538C" },
      { name: "pnpm", color: "#F69220" },
      { name: "npm", color: "#CB3837" },
      { name: "Git", color: "#F05032" },
      { name: "Browser", color: "#4285F4" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Prisma", color: "#0C344B" },
      { name: "Supabase", color: "#3ECF8E" },
      { name: "Element Plus", color: "#409EFF" },
      { name: "Ant Design", color: "#0170FE" },
      { name: "shadcn", color: "#000000" },
      { name: "Express", color: "#000000" },
    ];

const homeTopRef = useTemplateRef('homeTop')

onMounted(() => {
  homeTopRef.value?.querySelectorAll('.animated-title').forEach((title, index) => {
    const element = title as HTMLElement; //进行类型断言，html标签存在style属性
    element.style.setProperty('--delay', `${index * 0.3}s`); // 每行延迟 0.5 秒
    // 添加类名以触发动画
    element.classList.add('animated-line');
  });
  homeTopRef.value.querySelectorAll('.icon-item').forEach((icon, index) => {
    const element = icon as HTMLElement; 
    element.style.setProperty('--delay', `${index * 0.3}s`);
    element.classList.add('animated-line');
  });
});
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

@keyframes dropIn {
  0% {
    opacity: 0;
    transform: translateY(-200%);
    /* 从上方开始 */
  }

  100% {
    opacity: 1;
    transform: translateY(0);
    /* 到正常位置 */
  }
}

:deep(.animated-line) {
  opacity: 0;
  /* 初始状态隐藏 */
  animation: dropIn 0.6s cubic-bezier(0.42, 0, 0.77, 1.7) forwards var(--delay, 0s);
}

:deep(i) {
  margin: 0 10px;
}

:deep(.icon-item){
  opacity: 0;
  animation: dropIn 0.6s cubic-bezier(0.42, 0, 0.77, 1.7) forwards var(--delay);
}



</style>
