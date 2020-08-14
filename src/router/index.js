import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import { token } from '@/api/apis'


Vue.use(VueRouter)

const router = new VueRouter({

  base: process.env.BASE_URL,
  routes: [
    {//登录
      path: '/',
      name: 'Login',
      component: Login
    },
    {//一级路由
      path: '/Main',
      name: 'Main',
      component: () => import('../pages/Main'),
      children: [
        {//首页
          path: '/Main/Index',
          name: '/Main/Index',
          component: () => import('../pages/main/Index')
        },
        {//订单管理
          path: '/Main/Order',
          name: '/Main/Order',
          component: () => import('../pages/main/Order')
        },
        {//商品管理
          path: '/Main/GoodsLists',
          name: '/Main/GoodsLists',
          component: () => import('../pages/main/GoodsLists')
        },
        {//商品添加
          path: '/Main/GoodAdd',
          name: '/Main/GoodAdd',
          component: () => import('../pages/main/GoodAdd')
        },
        {//商品分类
          path: '/Main/GoodsClass',
          name: '/Main/GoodsClass',
          component: () => import('../pages/main/GoodsClass')
        },
        {//店铺管理
          path: '/Main/Shop',
          name: '/Main/Shop',
          component: () => import('../pages/main/Shop')
        },
        {//账户列表
          path: '/Main/UserLists',
          name: '/Main/UserLists',
          component: () => import('../pages/main/UserLists')
        },
        {//添加账号
          path: '/Main/UserAdd',
          name: '/Main/UserAdd',
          component: () => import('../pages/main/UserAdd')
        },
        {//修改密码
          path: '/Main/ChangePwd',
          name: '/Main/ChangePwd',
          component: () => import('../pages/main/ChangePwd')
        },
        {//商品统计
          path: '/Main/GoodsStatistics',
          name: '/Main/GoodsStatistics',
          component: () => import('../pages/main/GoodsStatistics')
        },
        {//订单统计
          path: '/Main/OrderStatistics',
          name: '/Main/OrderStatistics',
          component: () => import('../pages/main/OrderStatistics')
        },
        {//订单统计
          path: '/Main/ChangeUser',
          name: '/Main/ChangeUser',
          component: () => import('../pages/main/ChangeUser')
        },
      ]
    }
  ]
})

// 路由拦截
router.beforeEach((to, from, next) => {

  // 只要不是默认登录,都开启路由验证
  if (to.path != "/") {
    token(localStorage.token).then(res => {
      if (res.data.code == 0) {
        next()
      } else {
        next("/")

      }
    })
  } else {
    next()
  }
})



export default router
