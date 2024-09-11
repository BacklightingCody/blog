<template>
  <div class="rounded-full flex justify-center items-center">
    <div v-if="windowWidth >= 900" class="nav h-full flex items-center rounded-full px-2 transition-all duration-1000"
      @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" ref="nav" :style="{ background: backgroundStyle }">
      <div class="nav-tab">
        <RouterLink to="/" exact-active-class="active-nav">
          <iconHome class="icon hidden icon-animation" :class="{ 'show-icon': route.path === '/' ? true : false }">
          </iconHome>
          主页
        </RouterLink>
      </div>
      <div class="nav-tab">
        <RouterLink to="/docs" active-class="active-nav">
          <iconDocs class="icon hidden icon-animation" :class="{ 'show-icon': route.path === '/docs' ? true : false }">
          </iconDocs>
          文稿
        </RouterLink>
      </div>
      <div class="nav-tab">
        <RouterLink to="/timeline" active-class="active-nav">
          <iconTimeLine class="icon hidden icon-animation"
            :class="{ 'show-icon': route.path === '/timeline' ? true : false }">
          </iconTimeLine>
          时光轴
        </RouterLink>
      </div>
      <div class="nav-tab">
        <RouterLink to="/chat" active-class="active-nav">
          <iconOpenAI class="icon hidden icon-animation"
            :class="{ 'show-icon': route.path === '/chat' ? true : false }"></iconOpenAI>
          Chat
        </RouterLink>
      </div>
      <div class="nav-tab">
        <RouterLink to="/friend" active-class="active-nav">
          <iconFriendLink class="icon hidden icon-animation"
            :class="{ 'show-icon': route.path === '/friend' ? true : false }">
          </iconFriendLink>
          友链
        </RouterLink>
      </div>
      <div class="nav-tab">
        <RouterLink to="/about" active-class="active-nav">
          <iconAbout class="icon hidden icon-animation"
            :class="{ 'show-icon': route.path === '/about' ? true : false }"></iconAbout>关于
        </RouterLink>
      </div>
      <div class="nav-tab">
        <RouterLink to="/more" active-class="active-nav">
          <iconMore class="icon hidden icon-animation" :class="{ 'show-icon': route.path === '/more' ? true : false }">
          </iconMore>更多
        </RouterLink>
      </div>
    </div>
    <div v-else class="w-[50px] flex justify-center">
      <iconHomeMobile @click="showDrawer = true"
        class="nav cursor-pointer text-default-icon" />
      <div v-if="showDrawer" class="drawer-container" @click="showDrawer = false">
        <div class="nav drawer-content">
          <div class="nav-tab">
            <RouterLink to="/" exact-active-class="active-nav">
              <iconHome class="icon hidden icon-animation" :class="{ 'show-icon': route.path === '/' ? true : false }">
              </iconHome>
              主页
            </RouterLink>
          </div>
          <div class="nav-tab">
            <RouterLink to="/docs" active-class="active-nav">
              <iconDocs class="icon hidden icon-animation"
                :class="{ 'show-icon': route.path === '/docs' ? true : false }">
              </iconDocs>
              文稿
            </RouterLink>
          </div>
          <div class="nav-tab">
            <RouterLink to="/timeline" active-class="active-nav">
              <iconTimeLine class="icon hidden icon-animation"
                :class="{ 'show-icon': route.path === '/timeline' ? true : false }">
              </iconTimeLine>
              时光轴
            </RouterLink>
          </div>
          <div class="nav-tab">
            <RouterLink to="/chat" active-class="active-nav">
              <iconOpenAI class="icon hidden icon-animation"
                :class="{ 'show-icon': route.path === '/chat' ? true : false }"></iconOpenAI>
              Chat
            </RouterLink>
          </div>
          <div class="nav-tab">
            <RouterLink to="/friend" active-class="active-nav">
              <iconFriendLink class="icon hidden icon-animation"
                :class="{ 'show-icon': route.path === '/friend' ? true : false }">
              </iconFriendLink>
              友链
            </RouterLink>
          </div>
          <div class="nav-tab">
            <RouterLink to="/about" active-class="active-nav">
              <iconAbout class="icon hidden icon-animation"
                :class="{ 'show-icon': route.path === '/about' ? true : false }"></iconAbout>关于
            </RouterLink>
          </div>
          <div class="nav-tab">
            <RouterLink to="/more" active-class="active-nav">
              <iconMore class="icon hidden icon-animation"
                :class="{ 'show-icon': route.path === '/more' ? true : false }">
              </iconMore>更多
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import iconOpenAI from '@/components/icons/iconOpenAI.vue'
import iconHome from '@/components/icons/iconHome.vue'
import iconDocs from '@/components/icons/iconDocs.vue'
import iconTimeLine from '@/components/icons/iconTimeLine.vue'
import iconFriendLink from '@/components/icons/iconFriendLink.vue'
import iconAbout from '@/components/icons/iconAbout.vue'
import iconMore from '@/components/icons/iconMore.vue'
import iconHomeMobile from '@/components/icons/iconHomeMobile.vue'
import { useWindowSize } from '@vueuse/core';
const route = useRoute()
// Navigation bar background color gradient
const currentNav = ref('')
const nav = ref()
// 背景渐变色
const backgroundStyle = ref('')
const handleMouseMove = (event) => {
  const rect = nav.value.getBoundingClientRect()
  // 计算鼠标在目标元素中的相对坐标
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  backgroundStyle.value = `radial-gradient(circle 70px at ${x}px ${y}px,var(--currency-color), transparent)`
}
const handleMouseLeave = () => {
  document.body.style.cursor = 'default'
  backgroundStyle.value = ``
}
// icon图标
const windowWidth = ref(0);
const windowHeight = ref(0);
const { width, height } = useWindowSize();
onMounted(() => {
  console.log(windowHeight.value, '11')
  windowWidth.value = width.value;
  windowHeight.value = height.value;
});
watch(width, () => {
  windowWidth.value = width.value;
})
const showDrawer = ref(false);

</script>
<style lang="scss" scoped>
.nav {
  .nav-tab {
    @apply h-full flex items-center;

    a {
      @apply h-full text-default-btnText flex items-center flex-nowrap px-2 hover:(text-hover-btnText filter brightness-120 contrast-251 saturate-100);

      .icon {
        @apply m-1
      }

      .show-icon {
        @apply block
      }

      .icon-animation {
        animation: iconMoveAnimation 0.3s ease-in-out;
      }
    }

    .active-nav {
      @apply text-active-btnText filter brightness-120 contrast-251 saturate-100;
    }
  }
}

@screen at-sm {
  .nav {
    flex-direction: column;
  }

  .is-mobile {}

  .nav-tab {
    width: 100%;
    text-align: center;
  }
}

.drawer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  transition: height 0.3s ease;
  .drawer-content {
    background-color: var(--accent-color);
    padding: 10px;
    display: flex;
    .nav-tab{
      @apply flex justify-center pl-10
    }
  }
}

@keyframes iconMoveAnimation {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
