import request from '@/utils/request'
// 订单列表
export const orders = params => request.get('/orders', { params })
// 获取-物流信息
export const logistics = id => request.get(`/kuaidi/${id}`)
