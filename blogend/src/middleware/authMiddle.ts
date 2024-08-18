import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/util/tokenUtil";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token,'token')
  if (!token) {
    res.status(401).json({ code: 401, message: "请先登录", data: {} });
    return;
  }

  const userinfo = verifyAccessToken(token);
  if (!userinfo) {
    res.status(401).json({ code: 401, message: "没有权限", data: {} });
    return;
  }

  req.userinfo = userinfo; // 将用户信息添加到请求对象中
  next();
}
