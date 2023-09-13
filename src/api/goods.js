import request from '@/utils/request'
// 商品列表
export const getGoods = params => request.get('/goods', { params })

// 商品分类列表
export const getGoodsList = params => request.get('/categories', { params })
