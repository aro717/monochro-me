// import Vue from 'vue'
// import VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import PostList from '@/components/PostList.vue'
import Post from '@/components/Post.vue'
import Profile from '@/components/Profile.vue'

// Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'posts',
    component: PostList
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Post,
    props: routes => ({
      id: Number(routes.params.id)
    })
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes,
//   // ブラウザバック用にスクロール位置を保存
//   scrollBehavior (to, from, savedPosition) {
//     if (savedPosition) {
//       return savedPosition
//     } else {
//       return { x: 0, y: 0 }
//     }
//   }
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
