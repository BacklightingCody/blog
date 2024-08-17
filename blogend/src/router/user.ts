import { Route } from "~/index";
import { login } from "@/handlers/";

export const loginRoutes: Route[] = [
  {
    method: "post",
    path: "/login",
    middleware: [],
    handler: login,
  },
];
