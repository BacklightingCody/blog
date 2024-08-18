import { Route } from "@/types/index";
import { homeRoutes } from "./home";
import { loginRoutes, tokenRoutes, logoutRoutes } from "./auth";
import { moreRoutes } from './more';
export const routes: Route[] = [
  ...homeRoutes,
  ...loginRoutes,
  ...tokenRoutes,
  ...logoutRoutes,
  ...moreRoutes
];
