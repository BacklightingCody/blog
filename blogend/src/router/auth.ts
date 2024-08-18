import { Route } from "@/types/index";
import { login } from "@/handlers";
import { tokenHandle } from "@/handlers";
import { logout } from "@/handlers";
import { authenticateToken } from "@/middleware/authMiddle";
export const loginRoutes: Route[] = [
  {
    method: "post",
    path: "/login",
    middleware: [],
    handler: login,
  },
];

export const tokenRoutes: Route[] = [
  {
    method: "post",
    path: "/refresh_token",
    middleware: [],
    handler: tokenHandle,
  },
];

export const logoutRoutes: Route[] = [
  {
    method: "post",
    path: "/logout",
    middleware: [authenticateToken],
    handler: logout,
  },
];
