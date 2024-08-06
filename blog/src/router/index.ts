import { createRouter, createWebHistory } from 'vue-router'
import NavPage from '@/views/index.vue'
import HomeLayout from '@/layouts/Home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'nav',
      meta: {
        name: 'Nav',
      },
      component: NavPage,
      redirect: '/home',
      children:[]
    },
    {
      path: '/',
      name: 'HomeLayout',
      meta: {
        name: 'HomeLayout',
      },
      component: HomeLayout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          meta: {
            name: '首页',
          },
          component: () => import('@/views/home/index.vue'),
        },
      ]
    }
  ]
})

export default router
