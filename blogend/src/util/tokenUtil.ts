import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
export interface UserPayload {
  username: string;
}
// 密钥和令牌有效期
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "backlighting";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "pitilessmiracle";
const ACCESS_TOKEN_EXPIRATION = "10s"; // 15 分钟
const REFRESH_TOKEN_EXPIRATION = "7d"; // 7 天

// 生成访问令牌
export function generateAccessToken(userinfo: UserPayload) {
  return jwt.sign(userinfo, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
}

// 生成刷新令牌
export function generateRefreshToken(userinfo: UserPayload) {
  return jwt.sign(userinfo, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
}

// 验证访问令牌
export function verifyAccessToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as UserPayload; //强行将返回的对象转为我们需要的数据结构
  } catch (error) {
    return null;
  }
}

// 验证刷新令牌
export function verifyRefreshToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as UserPayload; //强行将返回的对象转为我们需要的数据结构
  } catch (error) {
    return null;
  }
}
