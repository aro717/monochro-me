// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'

// Vue.config.productionTip = false

// Vue.prototype.$http = (url, opts) => fetch(url, opts)
// Vue.prototype.$endpoint = process.env.NODE_ENV === 'production' ? '/uploader/api/composites/' : 'http://127.0.0.1:8000/uploader/api/composites/'
// Vue.prototype.$fileUrlBase = process.env.NODE_ENV === 'production' ? '/uploader' : 'http://127.0.0.1:8000/uploader'
// Vue.prototype.$zipUrlBase = process.env.NODE_ENV === 'production' ? '/uploader/zip/' : 'http://127.0.0.1:8000/uploader/zip/'

const app = createApp(App)
installElementPlus(app)

app.config.globalProperties.$http = (url, opts) => fetch(url, opts)
app.config.globalProperties.$endpoint = process.env.NODE_ENV === 'production' ? '/uploader/api/composites/' : 'http://127.0.0.1:8000/uploader/api/composites/'
app.config.globalProperties.$fileUrlBase = process.env.NODE_ENV === 'production' ? '/uploader' : 'http://127.0.0.1:8000/uploader'
app.config.globalProperties.$zipUrlBase = process.env.NODE_ENV === 'production' ? '/uploader/zip/' : 'http://127.0.0.1:8000/uploader/zip/'

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

// Vue.prototype.$csrfToken = getCookie('csrftoken')

app.config.globalProperties.$csrfToken = getCookie('csrftoken')

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

app.use(router)
app.use({ render: h => h(App) })
app.mount('#app')
