import request from '@/utils/request'

// 获取-权限列表-扁平结构
export const getRolesRights = () => request.get('/rights/list')
// 角色分配-权限点
export const RolesRights = data => request.post('/roles/{roleId}/rights', data)

// 添加角色
export const addRole = (data) => request.post('/roles', data)

// 删除角色
export const delRole = id => request.delete(`/roles/${id}`)

// 编辑提交角色
export const putRole = (data) => request.put(`/roles/${data.roleId}`, data)

// 根据 ID 查询角色
export const getRoleID = id => request.get(`/roles/${id}`)
// -权限列表-树形结构
export const getRolesTree = () => request.get('/rights/tree')
