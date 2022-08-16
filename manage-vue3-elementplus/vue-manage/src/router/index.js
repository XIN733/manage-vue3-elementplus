import { createRouter, createWebHistory , createWebHashHistory} from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    redirect: '/login',
    children: [  
      // {
    //     path: '/home',
    //     name: 'Home',
    //     component: () => import('@/views/Home')
    //   },
    //   {
    //     path: '/mall',
    //     name: 'Mall',
    //     component: () => import('@/views/Mall')
    //   },
    //   {
    //     path: '/user',
    //     name: 'User',
    //     component: () => import('@/views/User')
    //   },
    //   {
    //     path: '/other/page1',
    //     name: 'Page1',
    //     component: () => import('@/views/Other/Page1.vue')
    //   },
    //   {
    //     path: '/other/page2',
    //     name: 'Page2',
    //     component: () => import('@/views/Other/Page2.vue')
    //   }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history:createWebHashHistory(process.env.BASE_URL),
  routes
})


// 路由守卫
router.beforeEach((to,from,next) => {
  store.commit('user/getToken')
  console.log(store.state.user.token)
  const token = store.state.user.token
  if(!token && to.name!=='Login'){
      next({name:'Login'})
  }else if(token && to.name === 'Login'){
      next({name:'Home'})
  }else{
      next()
  }
})



export default router
