import Calendar from '@/assets/calendar'
import { computed } from 'vue'

export default function () {
  const { router, route, weekNames, dateFormat } = Calendar()

  const calendar = computed(() => {
    // 週間カレンダー情報の入った辞書を返す
    const days = getWeekDays()
    const first = days[0]
    const last = days[days.length - 1]
    const calendarData = {
      now: dateFormat(new Date()).today,
      week_days: days,
      week_previous: getPreviousWeek(first),
      week_next: getNextWeek(first),
      week_names: weekNames.value,
      week_first: first,
      week_last: last,
      selected_date: selectedDay() ? selectedDay() : dateFormat(new Date())
    }
    return calendarData
  })

  const calendarWeek = computed(() => calendar.value)

  const getPreviousWeek = (datetime) => {
    // 前月を返す
    const date = new Date(datetime.year, datetime.month - 1, datetime.day - 7)
    return dateFormat(date)
  }

  const getNextWeek = (datetime) => {
    // 次月を返す
    const date = new Date(datetime.year, datetime.month - 1, datetime.day + 7)
    return dateFormat(date)
  }

  const getWeekDays = () => {
    // その週の全ての日を返す
    const year = route.params.year
    const month = route.params.month
    const day = route.params.day
    let datetime = {}
    if (year && month && day) {
      datetime = dateFormat(new Date(year, month - 1, day))
    } else {
      datetime = dateFormat(new Date())
    }
    const Day = datetime.weekday
    const firstDay = dateFormat(new Date(datetime.year, datetime.month - 1, datetime.day - Day))
    const week = []
    for (let i = 0; i <= 6; i++) {
      week[i] = dateFormat(new Date(firstDay.year, firstDay.month - 1, firstDay.day + i))
    }
    return week
  }

  const getWeekSchedules = (start, end, days, schedules) => {
    // それぞれの日とスケジュールを返す
    let queryset = []
    if (schedules.value) {
      queryset = schedules.value.filter(schedule => {
        const temp = schedule.date.split('-')
        const date = temp.join('')
        const boolStart = parseInt(date) >= start.toNum()
        const boolEnd = parseInt(date) <= end.toNum()
        return boolStart && boolEnd
      })
    }
    const daySchedules = {}
    for (const day of days) {
      daySchedules[day.today] = []
    }
    for (const schedule of queryset) {
      const scheduleDate = schedule.date
      daySchedules[scheduleDate].push(schedule)
    }
    return daySchedules
  }

  const previous = (routePath) => {
    router.push({ path: `/${routePath}/${calendar.value.week_previous.toPathYMD()}` })
  }

  const next = (routePath) => {
    router.push({ path: `/${routePath}/${calendar.value.week_next.toPathYMD()}` })
  }

  const selectedDay = () => {
    return dateFormat(new Date(route.params.year, route.params.month - 1, route.params.day))
  }

  return { calendar, calendarWeek, getWeekDays, getWeekSchedules, previous, next }
}
