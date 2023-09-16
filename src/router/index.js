import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/Welcome',
    children: [
      { path: '/users', component: () => import('@/views/userManagement') },
      { path: '/rights', component: () => import('@/views/Permission/privilege') },
      { path: '/roles', component: () => import('@/views/Permission/role') },
      { path: '/goods', component: () => import('@/views/goods/goods') },
      { path: '/goods/add', component: () => import('@/views/goods/addGoods') },
      { path: '/params', component: () => import('@/views/goods/goodsCategory') },
      { path: '/categories', component: () => import('@/views/goods/parameter') },
      { path: '/orders', component: () => import('@/views/indent/indent') },
      { path: '/reports', component: () => import('@/views/dataManagement//dataTable') },
      { path: '/Welcome', component: () => import('@/views/Welcome') }

    ]
  },
  { path: '*', component: () => import('@/views/notFound') }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const { token } = store.state.user
  // 如果去页面不是登录且没有token,都打回到登录页
  if (to.path !== '/login' && !token) {
    next('/login')
    Message.error('请您先登录')
    return
  }
  next()
  // 提示用户
})

export default router
