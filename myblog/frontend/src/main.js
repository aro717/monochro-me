// import Vue from 'vue'
import { createApp } from 'vue'
import VueGtag from 'vue-gtag'
import App from './App.vue'
import router from './router'
import { store } from './store'

// Vue.config.productionTip = false

// Vue.prototype.$http = (url, opts) => fetch(url, opts)
// Vue.prototype.$httpPosts = process.env.NODE_ENV === 'production' ? '/blog/api/posts/' : 'http://127.0.0.1:8000/blog/api/posts/'
// Vue.prototype.$httpCategories = process.env.NODE_ENV === 'production' ? '/blog/api/categories/' : 'http://127.0.0.1:8000/blog/api/categories/'
// Vue.prototype.$httpSite = process.env.NODE_ENV === 'production' ? '/sitedetail/api/' : 'http://127.0.0.1:8000/sitedetail/api/'

const app = createApp(App)
app.config.globalProperties.$http = (url, opts) => fetch(url, opts)
// app.config.globalProperties.$httpPosts = process.env.NODE_ENV === 'production' ? '/blog/api/posts/' : 'http://127.0.0.1:8000/blog/api/posts/'
// app.config.globalProperties.$httpCategories = process.env.NODE_ENV === 'production' ? '/blog/api/categories/' : 'http://127.0.0.1:8000/blog/api/categories/'
// app.config.globalProperties.$httpSite = process.env.NODE_ENV === 'production' ? '/sitedetail/api/' : 'http://127.0.0.1:8000/sitedetail/api/'
app.config.globalProperties.$httpPosts = 'http://127.0.0.1:8000/blog/api/posts/'
app.config.globalProperties.$httpCategories = 'http://127.0.0.1:8000/blog/api/categories/'
app.config.globalProperties.$httpSite = 'http://127.0.0.1:8000/sitedetail/api/'

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

app.use(router)
app.use(store)
app.use({ render: h => h(App) })

app.use(VueGtag, {
  id: 'UA-210405451-1',
  router
})

app.mount('#app')
