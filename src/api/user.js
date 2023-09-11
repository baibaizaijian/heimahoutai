import request from '@/utils/request'

export const login = data => request.post('/login', data)

export const getUsers = params => request.get('/users', { params })
