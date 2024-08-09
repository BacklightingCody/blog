import { Request, Response,RequestHandler as Middleware } from 'express'
type Method =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
export type Handler = (req: Request, res: Response) => any
export type Route = {
  method: Method;
  path: string;
  middleware: Middleware[];
  handler: Handler;
}