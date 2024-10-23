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
        component: () => import('@/views/timeline/index.vue'),
        name: 'timeline',
        children: []
      },
      {
        path: '/docs',
        name: 'docs',
        component: () => import('@/views/docs/index.vue'),
        children: [
          {
            path: 'programming',
            name: 'programming',
            component: () => import('@/views/docs/programming/index.vue'),
            children: []
          }, 
          {
            path: 'technology',
            name: 'technology',
            component: () => import('@/views/docs/technology/index.vue'),
            children: []
          },
          {
            path: 'experience',
            name: 'experience',
            component: () => import('@/views/docs/technology/index.vue'),
            children: []
          },
          {
            path: 'recipe',
            name: 'recipe',
            component: () => import('@/views/docs/recipe/index.vue'),
            children: []
          },
          {
            path: 'motto',
            name: 'motto',
            component: () => import('@/views/docs/motto/index.vue'),
            children: []
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
