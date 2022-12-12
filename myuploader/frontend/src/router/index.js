// import Vue from 'vue'
// import VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import CompositeList from '../components/CompositeList'

// Vue.use(VueRouter)

const routes = [
  {
    path: '/home/:path*',
    name: 'home',
    component: CompositeList,
    props: true
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // ブラウザバック用にスクロール位置を保存
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      // return { x: 0, y: 0 }
      return { top: 0, left: 0 }
    }
  }
})

export default router
