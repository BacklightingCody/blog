// express.ts
import { Request, Response, NextFunction } from 'express';

// 定义错误中间件的类型
export type ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => void;