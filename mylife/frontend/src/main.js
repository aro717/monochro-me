import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

require('@/assets/scss/main.scss')

const app = createApp(App)
app.config.globalProperties.$http = (url, opts) => fetch(url, opts)
app.config.globalProperties.$httpSchedules = process.env.NODE_ENV === 'production' ? '/life/api/schedules/' : 'http://127.0.0.1:8000/life/api/schedules/'
app.config.globalProperties.$httpCategories = process.env.NODE_ENV === 'production' ? '/life/api/categories/' : 'http://127.0.0.1:8000/life/api/categories/'

app.provide('$http', app.config.globalProperties.$http)
app.provide('$httpSchedules', app.config.globalProperties.$httpSchedules)
app.provide('$httpCategories', app.config.globalProperties.$httpCategories)

const getCookie = name => {
  if (document.cookie && document.cookie !== '') {
    for (const cookie of document.cookie.split(';')) {
      const [key, value] = cookie.trim().split('=')
      if (key === name) {
        return decodeURIComponent(value)
      }
    }
  }
}

app.config.globalProperties.$csrfToken = getCookie('csrftoken')
app.provide('$csrfToken', app.config.globalProperties.$csrfToken)

app.use(ElementPlus)
app.use(store).use(router).mount('#app')
