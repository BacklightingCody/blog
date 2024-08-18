import { Route } from '@/types/index'
import { home } from '@/handlers/index'

export const homeRoutes: Route[] = [
  {
    method: 'get',
    path: '/',
    middleware: [],
    handler: home,
  },
]