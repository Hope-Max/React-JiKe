// Encapsulate axios
import axios from "axios"
import { getToken } from "./token"
// 1. Root domain name - 根域名
// 2. Timeout duration - 超时时间
const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})
// 3. Request interceptor / Response interceptor - 请求拦截器/响应拦截器
// 在请求发送之前 做拦截 插入一些自定义的配置 参数处理
request.interceptors.request.use((config) => {
  // Actions before sending a request
  // Inject token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}` // 如果拼接，按照后端要求
  }
  return config
}, (error) => {
  // Actions with request errors
  return Promise.reject(error)
})
// 在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response) => {
  // Will be triggered for status codes within the 2xx range - 2xx 范围内的状态码都会触发该函数
  // Actions with the response data - 对响应数据做点什么
  return response.data
}, (error) => {
  // Will be triggered for status codes beyond the 2xx range - 超出 2xx 范围的状态码都会触发该函数
  // Actions with response errors
  return Promise.reject(error)
})

export { request }