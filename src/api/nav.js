import request from '@/utils/request'

export const getNav = params => request.get('/menus', { params })
