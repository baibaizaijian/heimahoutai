import request from '@/utils/request'

export const login = data => request.post('/login', data)
// 获取用户
export const getUsers = params => request.get('/users', { params })
// 添加用户
export const addUsers = data => request.post('/users', data)
// 删除用户
export const delUsers = id => request.delete(`/users/${id}`)
// 修改-用户状态
export const putUsers = ({ id, bool }) => request.put(`/users/${id}/state/${bool}`)

// 获取-用户详情
export const getUser = id => request.get(`/users/${id}`)

// 修改-用户详情
export const putUser = data => request.put(`/users/${data.id}`, data)
// 获取-角色列表
export const getRole = () => request.get('/roles')
// 分配-用户权限
export const putRole = data => request.put(`/users/${data.id}/role`, data)
