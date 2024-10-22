export const constantRouter = [
  {
    path: '/',
    name: 'DefaultLayout',
    component: () => import('@/layouts/default/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        children: []
      },
      // 时间轴
      {
        path: '/timeline',
        // component: () => import('@/views/TimeLine/index.vue'),
        name: 'timeline',
        children: []
      },
      {
        path: '/docs',
        name: 'docs',
        component: () => import('@/views/docs/index.vue'),
        children: [
          {
            
          }
        ]
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        children: []
      },
      {
        path: '/friend',
        name: 'friend',
        component: () => import('@/views/friend/index.vue'),
        children: []
      },
      {
        path: '/chat',
        name: 'chat',
        component: () => import('@/views/chat/index.vue'),
        children: []
      },
      {
        path: '/more',
        name: 'more',
        component: () => import('@/views/more/index.vue'),
        children: []
      }
    ]
  }
]
