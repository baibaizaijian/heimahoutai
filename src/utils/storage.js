
// 统一名称
const KEY = 'my-token-ds'

// 直接用按需导出，可以导出多个
// 但是按需导出，导入时必须 import { getToken } from '模块名导入'

// 设置
export const setToken = (Token) => {
  localStorage.setItem(KEY, Token)
}
// 获取
export const getToken = () => {
  return localStorage.getItem(KEY)
}

// 删除
export const delToken = () => {
  localStorage.removeItem(KEY)
}
