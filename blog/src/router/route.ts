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
            meta: { identifier: 'programming' },
          },
          {
            path: 'technology',
            name: 'technology',
            component: () => import('@/views/docs/technology/index.vue'),
            meta: { identifier: 'technology' },
          },
          {
            path: 'experience',
            name: 'experience',
            component: () => import('@/views/docs/experience/index.vue'),
            meta: { identifier: 'experience' },
          },
          {
            path: 'recipe',
            name: 'recipe',
            component: () => import('@/views/docs/recipe/index.vue'),
            meta: { identifier: 'recipe' },
          },
          {
            path: 'motto',
            name: 'motto',
            component: () => import('@/views/docs/motto/index.vue'),
            meta: { identifier: 'motto' },
          },
          {
            path: ':category/:subcategory',
            name: 'article_list',
            component: () => import('@/components/ArticleLine.vue'),
            props: true, // 允许将动态参数作为 props 传递
            meta: { identifier: 'article_list' },
          },
          {
            path: ':category/:subcategory/:article',
            name: 'article_detail',
            component: () => import('@/components/ArticleDetail.vue'),
            props: true, // 允许将动态参数作为 props 传递
            meta: { identifier: 'article_detail' },
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
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        children: []
      },
    ]
  }
]
