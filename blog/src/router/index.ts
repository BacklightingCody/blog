import { createRouter, createWebHistory } from 'vue-router'
import { constantRouter } from './route'
import { start, close } from '@/utils/nprogress'
import { useGlobalStore } from '@/stores'
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: constantRouter,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth', // 可选平滑滚动效果
      };
    } else {
      return { top: 0 };
    }
  },
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  const globalStore = useGlobalStore()
  start()
  globalStore.showLoader()
  next()
})

router.afterEach((to, from) => {
  // console.log(to, from)
  const globalStore = useGlobalStore()
  globalStore.hideLoader()
  close()
})

export default router
