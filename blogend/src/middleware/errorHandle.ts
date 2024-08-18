import { ErrorHandler } from '@/types/index';

export const errorHandler: ErrorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send('服务器发生未知错误');
};