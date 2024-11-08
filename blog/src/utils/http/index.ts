import axios from 'axios'
import AxiosService from './axiosService'
import { CustomTransform } from './customTransform' // 可选的自定义 transform 实现

const http = new AxiosService(
  {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v0',
    timeout: 5000
  },
  new CustomTransform()
)
console.log(import.meta.env.VITE_API_BASE_URL)
export default http
