import request from '@/utils/request'
// 商品列表
export const getGoods = params => request.get('/goods', { params })

// 商品分类列表
export const getGoodsList = params => request.get('/categories', { params })

// 商品参数和属性
export const getCategories = (params, id) => request.get(`/categories/${id}/attributes`, { params })

// 添加-商品
export const addGoods = data => request.post('/goods', { data })

// 商品-删除
export const delGoods = (data, id) => request.delete(`/goods/${id}`, { data })

// 添加分类
export const addCategories = data => request.post('/categories', data)

// 根据 id 查询分类
export const IDGoodsList = id => request.get(`categories/${id}`)

// 编辑提交分类
export const putIDGoodsList = (id, data) => request.put(`categories/${id}`, data)

// 删除分类
export const delGoodsList = id => request.delete(`categories/${id}`)

// 参数列表
export const getAttributes = (id, params) => request.get(`categories/${id}/attributes`, { params })

// 添加动态参数或者静态属性
export const addAttributes = (data, id) => request.post(`categories/${id}/attributes`, data)

// 根据 ID 查询参数
export const getAttributesID = (id, attrId, params) => request.get(`categories/${id}/attributes/${attrId}`, { params })
// export const getAttributesID = (params) => request.get(`categories/${params.id}/attributes/${params.attrId}`, { params })

// 编辑提交参数
export const putAttributes = (id, attrId, data) => request.put(`categories/${id}/attributes/${attrId}`, data)
// 删除参数
export const delAttributes = (id, attrid) => request.delete(`categories/${id}/attributes/${attrid}`)
