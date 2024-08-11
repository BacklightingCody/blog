import { createRouter, createWebHistory } from 'vue-router'
import { constantRouter } from './route'
import { start, close } from '@/utils/nprogress'
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: constantRouter
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  start()
  next()
})

router.afterEach((to, from) => {
  close()
})

export default router
