import { Route } from '~/index'
import { homeRoutes } from './home';
import {loginRoutes} from './user'

export const routes: Route[] = [
  ...homeRoutes,
  ...loginRoutes
];