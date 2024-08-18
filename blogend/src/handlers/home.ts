import { Handler } from '@/types/index'
export const home: Handler = (req, res) => {
  res.send('hello')
}