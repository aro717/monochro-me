import Calendar from '@/assets/calendar'
import { computed } from 'vue'

export default function () {
  const { router, route, weekNames, dateFormat } = Calendar()

  const calendar = computed(() => {
    // 月間カレンダー情報の入った辞書を返す
    const currentMonth = getCurrentMonth()
    const calendarData = {
      now: dateFormat(new Date()).today,
      month_days: getMonthDays(currentMonth),
      month_current: currentMonth,
      month_previous: getPreviousMonth(currentMonth),
      month_next: getNextMonth(currentMonth),
      week_names: weekNames.value,
      selected_date: selectedDay() ? selectedDay() : dateFormat(new Date())
    }
    return calendarData
  })

  const calendarMonth = computed(() => calendar.value)

  const getPreviousMonth = (datetime) => {
    // 前月を返す
    if (datetime.month === 1) {
      return dateFormat(new Date(datetime.year - 1, 11, 1))
    } else {
      return dateFormat(new Date(datetime.year, datetime.month - 2, 1))
    }
  }

  const getNextMonth = (datetime) => {
    // 次月を返す
    if (datetime.month === 12) {
      return dateFormat(new Date(datetime.year + 1, 0, 1))
    } else {
      return dateFormat(new Date(datetime.year, datetime.month, 1))
    }
  }

  const getMonthDays = (datetime) => {
    // その月の全ての日を返す
    const calendar = []
    const firstDay = new Date(datetime.year, datetime.month - 1, 1).getDay()
    const lastDate = new Date(datetime.year, datetime.month, 0).getDate()
    let dayNum = 1 - firstDay
    while (dayNum <= lastDate) {
      const weekData = []
      for (let i = 0; i <= 6; i++) {
        weekData[i] = dateFormat(new Date(datetime.year, datetime.month - 1, dayNum))
        dayNum++
      }
      calendar.push(weekData)
    }
    return calendar
  }

  const getCurrentMonth = () => {
    // 現在の月を返す
    const year = route.params.year
    const month = route.params.month
    let datetime = {}
    if (year && month) {
      datetime = dateFormat(new Date(year, month - 1, 1))
    } else {
      datetime = dateFormat(new Date())
    }
    return datetime
  }

  const getMonthSchedules = (start, end, days, schedules) => {
    // それぞれの日とスケジュールを返す
    let queryset = []
    if (schedules.value) {
      queryset = schedules.value.filter(schedule => {
        const temp = schedule.date.split('-')
        const date = temp.join('')
        const boolStart = parseInt(date) >= start.toNum()
        const boolEnd = parseInt(date) < end.toNum()
        return boolStart && boolEnd
      })
    }
    const daySchedules = {}
    for (const week of days) {
      for (const day of week) {
        daySchedules[day.today] = []
      }
    }
    for (const schedule of queryset) {
      const scheduleDate = schedule.date
      daySchedules[scheduleDate].push(schedule)
    }

    const _daySchedules = []
    let i = 0
    let tempObject = {}
    for (const key in daySchedules) {
      tempObject[key] = daySchedules[key]
      i++
      if (i % 7 === 0) {
        _daySchedules.push(tempObject)
        tempObject = {}
      }
    }

    return _daySchedules
  }

  const previous = (routePath) => {
    if (routePath === 'calendar') {
      router.push({ path: `/${routePath}/${calendar.value.month_previous.toPathYMD()}` })
    } else {
      router.push({ path: `/${routePath}/${calendar.value.month_previous.toPathYM()}` })
    }
  }

  const next = (routePath) => {
    if (routePath === 'calendar') {
      router.push({ path: `/${routePath}/${calendar.value.month_next.toPathYMD()}` })
    } else {
      router.push({ path: `/${routePath}/${calendar.value.month_next.toPathYM()}` })
    }
  }

  const dayClick = (routePath, datetime) => {
    router.push({ path: `/${routePath}/${datetime.toPathYMD()}` })
  }

  const selectedDay = () => {
    return dateFormat(new Date(route.params.year, route.params.month - 1, route.params.day))
  }

  return { calendar, calendarMonth, getMonthDays, getCurrentMonth, getMonthSchedules, previous, next, dayClick }
}
