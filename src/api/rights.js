import request from '@/utils/request'

export const rightsList = () => request.get('/rights/list')

export const reports = () => request.get('/reports/type/1')
