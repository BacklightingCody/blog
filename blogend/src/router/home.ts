import { Route } from '~/index'
import { home } from '@/handlers/index'

export const homeRoutes: Route[] = [
  {
    method: 'get',
    path: '/',
    middleware: [],
    handler: home,
  },
]