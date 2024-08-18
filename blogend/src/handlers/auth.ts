import { Handler } from "@/types/route";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/util/tokenUtil";

// 用于存储刷新令牌
let refreshTokens: string[] = [];

export const login: Handler = (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (username !== "backlighting" || password !== "123456") {
    return res
      .status(401)
      .json({ code: 401, message: "用户名或密码错误", data: {} });
  }
  // 此处为用户验证逻辑,比如比对用户名密码
  const userName = { username };
  // 生成令牌
  const accessToken = generateAccessToken(userName);
  const refreshToken = generateRefreshToken(userName);
  res.setHeader("Authorization", `Bearer ${accessToken}`);
  res.setHeader("RefreshToken", `Bearer ${refreshToken}`);
  // 存储刷新令牌
  refreshTokens.push(refreshToken);
  res.status(200).json({
    code: 200,
    message: "登录成功",
    data: {
      accessToken,
      refreshToken,
    },
  });
};

export const tokenHandle: Handler = (req, res) => {
  const { refreshToken } = req.body;
  console.log(refreshTokens.includes(refreshToken),'isinclude')
  if (!refreshToken) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(401);

  const userinfo = verifyRefreshToken(refreshToken);
  if (!userinfo) return res.sendStatus(401); // 刷新令牌无效
  console.log(userinfo, "userinfo");
  const accessToken = generateAccessToken({ username: userinfo.username });
  // 设置响应头
  res.setHeader("Authorization", `Bearer ${accessToken}`);
  res
    .status(200)
    .json({ code: 200, message: "刷新令牌成功", data: { accessToken } });
};

export const logout: Handler = (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  refreshTokens = refreshTokens.filter((item) => item !== token);
  res.status(200).json({ code: 200, message: "退出成功", data: {} });
};
