import axios from 'axios'
import AxiosService from './axiosService'
import { CustomTransform } from './customTransform' // 可选的自定义 transform 实现

const http = new AxiosService(
  {
    baseURL: '/api/v0',
    timeout: 5000
  },
  new CustomTransform()
)

export default http
