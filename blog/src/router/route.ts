export const constantRouter = [
  {
    path: '/',
    name: 'HomeLayout',
    component: () => import('@/layouts/default/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        children:[]
      },
      // 时间轴
      {
        path: '/timeline',
        // component: () => import('@/views/TimeLine/index.vue'),
        name: 'timeline',
        children:[]
      }
    ]
  }
]
