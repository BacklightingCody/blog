import { Handler } from '~/index'
export const home: Handler = (req, res) => {
  res.send('hello')
}