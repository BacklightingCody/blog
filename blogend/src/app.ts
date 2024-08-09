import express from 'express'
const app = express()
const PORT = process.env.PORT || 3000  // process.env.PORT读取当前目录下环境变量port的值，若没有则默认端口为3000
import { errorHandler } from '@/middleware/errorHandle'
import { routes } from '@/router/index'


routes.forEach((route) => {
  const middlewares = route.middleware || [];
  switch (route.method) {
    case 'get':
      app.get(route.path, ...middlewares, route.handler);
      break;
    case 'post':
      app.post(route.path, ...middlewares, route.handler);
      break;
    case 'put':
      app.put(route.path, ...middlewares, route.handler);
      break;
    case 'delete':
      app.delete(route.path, ...middlewares, route.handler);
      break;
    // 你可以根据需要添加其他 HTTP 方法
    default:
      throw new Error(`Unsupported method: ${route.method}`);
  }
})
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})