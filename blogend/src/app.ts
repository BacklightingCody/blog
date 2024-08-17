import express from "express";
const app = express();
const PORT = process.env.PORT || 8000; // process.env.PORT读取当前目录下环境变量port的值，若没有则默认端口为3000
import { errorHandler } from "@/middleware";
import { corsMiddleware, customCorsHeaders } from "@/middleware";
import { routes } from "@/router/index";
app.use(express.urlencoded({ extended: false }));
app.use(corsMiddleware); // 使用 CORS 中间件

const API_PREFIX = "/api";
routes.forEach((route) => {
  const middlewares = route.middleware || [];
  const fullPath = `${route.path}`;
  console.log(fullPath);
  switch (route.method) {
    case "get":
      app.get(fullPath, ...middlewares, route.handler);
      break;
    case "post":
      app.post(fullPath, ...middlewares, route.handler);
      break;
    case "put":
      app.put(fullPath, ...middlewares, route.handler);
      break;
    case "delete":
      app.delete(fullPath, ...middlewares, route.handler);
      break;
    // 你可以根据需要添加其他 HTTP 方法
    default:
      throw new Error(`Unsupported method: ${route.method}`);
  }
});

app.use(customCorsHeaders);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
