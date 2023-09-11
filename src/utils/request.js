/* 封装axios用于发送请求 */
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
// import router from '@/router'

// 创建一个新的axios实例
// 避免axios被污染
const request = axios.create({
  baseURL: 'http://vue-shop-api-t.itheima.net/api/private/v1/',
  // 超时时间
  timeout: 3000
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { token } = store.state.user
  if (token) {
    config.headers.Authorization = `${token}`
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.meta.status === 400) {
    Message.error(response.data.meta.msg)
  }

  return response.data
}, function (error) {
  // 对响应错误做点什么

  return Promise.reject(error)
})

export default request
