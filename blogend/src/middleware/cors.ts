import cors from "cors";
import { Request, Response, NextFunction } from "express";
const corsOptions = {
  origin: "http://localhost:5173/", // 替换为你的前端域名
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // 如果需要传递 cookie，设置为 true
};

export const corsMiddleware = cors(corsOptions);

// 自定义中间件，进一步配置响应头
export const customCorsHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 替换为你的前端域名
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  // 如果需要处理 OPTIONS 请求
  if (req.method === "OPTIONS") {
    res.sendStatus(200); // 直接返回 200 状态码
  } else {
    next(); // 继续处理其他请求
  }
};
