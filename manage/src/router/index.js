import Vue from 'vue'
import Router from 'vue-router'
//引入仓库
import Store from '../store'
//封装一个函数，用来检测是否真的存在该地址
//some 结果一个为真就都是真
function hasUrl(e) {
  return Store.state.userInfo.menus_url.some(item => item == e)
}

Vue.use(Router)


export let indexList = [
  {
    path: '/menu',
    component: () => import('../views/menu/menu'),
    name: '菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() : next('/home')
    }
  },
  {
    path: '/role',
    component: () => import('../views/role/role'),
    name: '角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() : next('/home')
    }
  },
  {
    path: '/user',
    component: () => import('../views/user/user'),
    name: '管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/user') ? next() : next('/home')
    }
  },
  {
    path: '/cate',
    component: () => import('../views/cate/cate'),
    name: '商品分类',
    beforeEnter: (to, from, next) => {
      hasUrl('/cate') ? next() : next('/home')
    }
  },
  {
    path: '/specs',
    component: () => import('../views/specs/specs'),
    name: '商品规格',
    beforeEnter: (to, from, next) => {
      hasUrl('/specs') ? next() : next('/home')
    }
  },
  {
    path: '/manage',
    component: () => import('../views/manage/manage'),
    name: '商品管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/manage') ? next() : next('/home')
    }
  },
  {
    path: '/member',
    component: () => import('../views/member/member'),
    name: '会员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/member') ? next() : next('/home')
    }
  },
  {
    path: '/banner',
    component: () => import('../views/banner/banner'),
    name: '轮播图管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() : next('/home')
    }
  },
  {
    path: '/seck',
    component: () => import('../views/seck/seck'),
    name: '秒杀管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/seck') ? next() : next('/home')
    }
  },
]

const router = new Router({
  routes: [
    {
      path: "/login",
      component: () => import('../pages/login')
    },
    {
      path: '/index',
      component: () => import('../pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('../views/home')
        },
        ...indexList,
        {
          path: '',
          redirect: '/menu'
        }
      ]
    },
    {
      path: "*",
      redirect: '/login'
    }
  ]
})

//全局导航守卫
/* 如果你去的是登录 就next  如果你去的不是登录 就判断你是否登陆过 next 否则就跳转到登录页 */
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
    return
  }
  if (sessionStorage.getItem('userInfo')) {
    next()
    return
  }
  next()
})


export default router