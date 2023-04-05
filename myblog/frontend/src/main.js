import { createApp } from 'vue'
import VueGtag from 'vue-gtag'
import App from './App.vue'
import router from './router'
import { store } from './store'

const app = createApp(App)
app.config.globalProperties.$http = (url, opts) => fetch(url, opts)
app.config.globalProperties.$httpPosts = process.env.NODE_ENV === 'production' ? '/blog/api/posts/' : 'http://127.0.0.1:8000/blog/api/posts/'
app.config.globalProperties.$httpCategories = process.env.NODE_ENV === 'production' ? '/blog/api/categories/' : 'http://127.0.0.1:8000/blog/api/categories/'
app.config.globalProperties.$httpSite = process.env.NODE_ENV === 'production' ? '/sitedetail/api/' : 'http://127.0.0.1:8000/sitedetail/api/'

app.provide('$http', app.config.globalProperties.$http)
app.provide('$httpPosts', app.config.globalProperties.$httpPosts)
app.provide('$httpCategories', app.config.globalProperties.$httpCategories)
app.provide('$httpSite', app.config.globalProperties.$httpSite)

app.use(router)
app.use(store)
app.use({ render: h => h(App) })

app.use(VueGtag, {
  id: 'UA-210405451-1',
  router
})

app.mount('#app')
