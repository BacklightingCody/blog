<template>
  <div class="nav h-full flex items-center shadow-lg rounded-full shadow-[var(--accent-color)]">
    <div class="nav-tab">
      <RouterLink to="/">
        <iconHome class="icon"></iconHome>
        主页
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/docs">
        <iconDocs class="icon"></iconDocs>
        文稿
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/timeline">
        <iconTimeLine class="icon"></iconTimeLine>
        时光轴
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/chat">
        <iconOpenAI class="icon"></iconOpenAI>
        Chat
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/friend">
        <iconFriendLink class="icon"></iconFriendLink>
        友链
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/about">
        <iconAbout class="icon"></iconAbout>关于
      </RouterLink>
    </div>
    <div class="nav-tab">
      <RouterLink to="/more">
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
</script>
<style lang="scss" scoped>
.nav {
  .nav-tab {
    @apply h-full flex items-center;

    a {
      @apply h-full text-[var(--btn-text-color)] flex items-center flex-nowrap px-2 hover:(text-[var(--btn-color)] filter brightness-120 contrast-251 saturate-100);

      .icon {
        @apply m-1
      }
    }
  }
}
</style>
