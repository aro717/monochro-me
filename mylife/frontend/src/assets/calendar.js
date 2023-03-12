import { ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

export default function () {
  // const firstWeekday = 0
  const weekNames = ref(['日', '月', '火', '水', '木', '金', '土'])
  const $http = inject('$http')
  const $httpSchedules = inject('$httpSchedules')
  const $httpCategories = inject('$httpCategories')
  const $csrfToken = inject('$csrfToken')
  const router = useRouter()
  const route = useRoute()

  const dateFormat = (date, format) => {
    const y = date.getFullYear()
    const m = ('00' + (date.getMonth() + 1)).slice(-2)
    const d = ('00' + date.getDate()).slice(-2)
    const datetime = {
      today: y + '-' + m + '-' + d,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekday: date.getDay(),
      toPathYM: function () {
        return this.year + '/' + this.month
      },
      toPathYMD: function () {
        return this.year + '/' + this.month + '/' + this.day
      },
      toNum: function () {
        return parseInt(y + m + d)
      }
    }
    return datetime
  }

  const formatHHmm = (str) => {
    let times = []
    if (!str.match(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)) {
      times = str.split(':')
    }
    return times[0] + ':' + times[1]
  }

  const loadJson = async (url) => {
    const response = await $http(url)
    const json = await response.json()
    return json
  }

  const loadSchedule = async () => {
    const json = await loadJson($httpSchedules)
    return json
  }

  const loadCategory = async () => {
    const json = await loadJson($httpCategories)
    return json
  }

  const saveJson = async (formData) => {
    const success = await $http($httpSchedules, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'X-CSRFToken': $csrfToken,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json().then(() => {
          ElNotification({
            title: 'お知らせ',
            message: '保存が完了しました',
            duration: 2000,
            type: 'success'
          })
          return true
        })
      } else {
        return response.json().then(data => {
          ElNotification({
            title: 'お知らせ',
            message: JSON.stringify(data),
            duration: 2000,
            type: 'error'
          })
          return false
        })
      }
    })
    return success
  }

  const zip = (...arrays) => {
    const length = Math.min(...(arrays.map(arr => arr.length)))
    return new Array(length).fill().map((_, i) => arrays.map(arr => arr[i]))
  }

  return { router, route, weekNames, dateFormat, formatHHmm, loadSchedule, loadCategory, saveJson, zip }
}
