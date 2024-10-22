<template>
  <div class="rounded-full flex justify-center items-center">
    <div v-if="windowWidth >= 900" class="nav h-full flex items-center rounded-full px-2 transition-all duration-1000"
      @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" ref="nav" :style="{ background: backgroundStyle }">
      <div class="nav-tab">
        <RouterLink to="/" exact-active-class="active-nav">
          <iconHome class="icon icon-animation" :class="{
            'block': route.path === '/' ? true : false,
            'hidden': route.path === '/' ? false : true,
          }">
          </iconHome>
          主页
        </RouterLink>
      </div>
      <el-dropdown>
        <div class="nav-tab">
          <RouterLink to="/docs" active-class="active-nav" class="el-dropdown-link">
            <iconDocs class="icon icon-animation" :class="{
              'block': route.path === '/docs' ? true : false,
              'hidden': route.path === '/docs' ? false : true,
            }">
            </iconDocs>
            文稿
          </RouterLink>
        </div>
        <template #dropdown>
          <el-dropdown-menu ref="dropdownMenu">
            <div
              class="absolute left-0 bg-default-currency transition-all duration-300 ease-in-out rounded-full opacity-50 z-10 cursor-pointer"
              :style="{ top: `${sliderPosition + 3}px`, height: `${itemHeight}px`, width: '100%' }"></div>
            <el-dropdown-item v-for="(category, index) in docCategory" :key="category"
              @mouseover="updateSliderPosition(index)">{{ category }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class=" nav-tab">
        <RouterLink to="/timeline" active-class="active-nav">
          <iconTimeLine class="icon icon-animation" :class="{
            'block': route.path === '/timeline' ? true : false,
            'hidden': route.path === '/timeline' ? false : true,
          }">
          </iconTimeLine>
          时光轴
        </RouterLink>
      </div>
      <div class="nav-tab">
        <RouterLink to="/chat" active-class="active-nav">
          <iconOpenAI class="icon icon-animation" :class="{
            'block': route.path === '/chat' ? true : false,
            'hidden': route.path === '/chat' ? false : true,
          }"></iconOpenAI>
          Chat
        </RouterLink>
      </div>
      <div class=" nav-tab">
        <RouterLink to="/friend" active-class="active-nav">
          <iconFriendLink class="icon  icon-animation" :class="{
            'block': route.path === '/friend' ? true : false,
            'hidden': route.path === '/friend' ? false : true,
          }">
          </iconFriendLink>
          友链
        </RouterLink>
      </div>
      <div class="nav-tab">
        <RouterLink to="/about" active-class="active-nav">
          <iconAbout class="icon  icon-animation" :class="{
            'block': route.path === '/about' ? true : false,
            'hidden': route.path === '/about' ? false : true,
          }"></iconAbout>关于
        </RouterLink>
      </div>
      <div class="nav-tab">
        <RouterLink to="/more" active-class="active-nav">
          <iconMore class="icon  icon-animation" :class="{
            'block': route.path === '/more' ? true : false,
            'hidden': route.path === '/more' ? false : true,
          }">
          </iconMore>更多
        </RouterLink>
      </div>
    </div>
    <div v-else class="w-[50px] flex justify-center">
      <iconHomeMobile @click="showDrawer = true" class="nav cursor-pointer text-default-icon" />
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
import { useWindowSize } from '@vueuse/core'
import { DocCategory } from '@/enum/document'
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
// dropdown数据
const docCategory = Object.values(DocCategory)
console.log(docCategory)
const itemHeight = 42
const currentIndex = ref(0)
const sliderPosition = computed(() => currentIndex.value * itemHeight)
const updateSliderPosition = (index) => {
  currentIndex.value = index
}
// icon图标
const windowWidth = ref(0);
const windowHeight = ref(0);
const { width, height } = useWindowSize();
onMounted(() => {
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

.drawer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  transition: height 0.3s ease;

  .drawer-content {
    background-color: var(--accent-color);
    display: flex;
    flex-direction: column;
    height: 300px;

    .nav-tab {
      @apply flex justify-center
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
<style lang="scss">
.el-dropdown-menu {
  @apply bg-default-bg;

  .el-dropdown-menu__item {
    @apply text-default-btnText px-[40px] py-[10px] font-bold;
  }

  .el-dropdown-menu__item:not(.is-disabled):focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    @apply text-hover-btnText filter brightness-120 contrast-251 saturate-100 bg-transparent;
    /*bg-default-currency*/
  }

  .sliding-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    /* 背景框的高度，可以根据实际情况调整 */
    background-color: rgba(0, 0, 0, 0.1);
    /* 背景框的颜色 */
    z-index: -1;
    /* 保证背景框在菜单项的后面 */
    transition: transform 0.3s ease;
    /* 平滑过渡 */
  }
}

.el-dropdown__popper {
  --el-dropdown-menuItem-hover-fill: var(--background-color);
}
</style>
