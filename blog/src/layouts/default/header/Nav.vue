<template>
  <div
    class="nav h-full flex items-center rounded-full"
    @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" ref="nav" :style="{ background: backgroundStyle }">
    <div class="nav-tab">
      <RouterLink to="/" exact-active-class="active-nav">
        <iconHome class="icon"></iconHome>
        主页
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/docs" active-class="active-nav">
        <iconDocs class="icon"></iconDocs>
        文稿
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/timeline" active-class="active-nav">
        <iconTimeLine class="icon"></iconTimeLine>
        时光轴
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/chat" active-class="active-nav">
        <iconOpenAI class="icon"></iconOpenAI>
        Chat
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/friend" active-class="active-nav">
        <iconFriendLink class="icon"></iconFriendLink>
        友链
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/about" active-class="active-nav">
        <iconAbout class="icon"></iconAbout>关于
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/more" active-class="active-nav">
        <iconMore class="icon"></iconMore>更多
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import iconOpenAI from '@/components/icons/iconOpenAI.vue'
import iconHome from '@/components/icons/iconHome.vue'
import iconDocs from '@/components/icons/iconDocs.vue'
import iconTimeLine from '@/components/icons/iconTimeLine.vue'
import iconFriendLink from '@/components/icons/iconFriendLink.vue'
import iconAbout from '@/components/icons/iconAbout.vue'
import iconMore from '@/components/icons/iconMore.vue'

// Navigation bar background color gradient
const currentNav = ref('')
const nav = ref()
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
    }

    .active-nav {
      @apply text-active-btnText filter brightness-120 contrast-251 saturate-100;
    }
  }
}
</style>
