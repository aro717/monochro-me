import Calendar from '@/assets/calendar'
import { computed } from 'vue'

export default function () {
  const { router, route, dateFormat } = Calendar()

  const calendar = computed(() => {
    // その日のカレンダー情報の入った辞書を返す
    const currentDay = getCurrentDay()
    const calendarData = {
      now: dateFormat(new Date()),
      day_current: currentDay,
      day_previous: getPreviousDay(currentDay),
      day_next: getNextDay(currentDay)
      // selected_date: selectedDay() ? selectedDay() : dateFormat(new Date())
    }
    return calendarData
  })

  const calendarDay = computed(() => calendar.value)

  const getPreviousDay = (datetime) => {
    // 前日を返す
    const date = new Date(datetime.year, datetime.month - 1, datetime.day - 1)
    return dateFormat(date)
  }

  const getNextDay = (datetime) => {
    // 次日を返す
    const date = new Date(datetime.year, datetime.month - 1, datetime.day + 1)
    return dateFormat(date)
  }

  const getCurrentDay = () => {
    // その日を返す
    const year = route.params.year
    const month = route.params.month
    const day = route.params.day
    let datetime = {}
    if (year && month && day) {
      datetime = dateFormat(new Date(year, month - 1, day))
    } else {
      datetime = dateFormat(new Date())
    }
    return datetime
  }

  const getDaySchedules = (days, schedules) => {
    // その日のスケジュールを返す
    let queryset = []
    if (schedules.value) {
      queryset = schedules.value.filter(schedule => {
        const temp = schedule.date.split('-')
        const date = temp.join('')
        const boolA = parseInt(date) === days[0].toNum()
        const boolB = parseInt(date) === days[1].toNum()
        return boolA || boolB
      })
    }
    const daySchedules = {}
    for (const day of days) {
      daySchedules[day.today] = []
    }
    const posList = []
    for (const schedule of queryset) {
      schedule.pos = getPosition(schedule)
      let bool = false
      posList.forEach((element) => {
        const boolA = parseInt(schedule.start_time.split(':').join('')) > element[0] && parseInt(schedule.end_time.split(':').join('')) < element[1]
        const boolB = parseInt(schedule.start_time.split(':').join('')) < element[0] && parseInt(schedule.end_time.split(':').join('')) > element[0]
        const boolC = parseInt(schedule.start_time.split(':').join('')) < element[1] && parseInt(schedule.end_time.split(':').join('')) > element[1]
        bool = bool || boolA || boolB || boolC
        if (bool) {
          schedule.pos.left += 107
        }
        bool = false
      })
      posList.push([parseInt(schedule.start_time.split(':').join('')), parseInt(schedule.end_time.split(':').join(''))])
      const scheduleDate = schedule.date
      daySchedules[scheduleDate].push(schedule)
    }
    return daySchedules
  }

  const getNowPosition = (datetime) => {
    return 100 + (datetime.hour + datetime.minute / 60) * 53
  }

  const getPosition = (schedule) => {
    const timeStart = schedule.start_time.split(':')
    const timeEnd = schedule.end_time.split(':')
    // const top = 65 + (parseInt(timeStart[0]) + parseInt(timeStart[1]) / 60) * 53
    const top = 110 + (parseInt(timeStart[0]) + parseInt(timeStart[1]) / 60) * 53
    const height = ((parseInt(timeEnd[0]) + parseInt(timeEnd[1]) / 60) - (parseInt(timeStart[0]) + parseInt(timeStart[1]) / 60)) * 52
    let left = 114
    if (schedule.date !== calendar.value.now.today) {
      left += 328
    }
    return {
      top: top,
      height: height,
      left: left
    }
  }

  const previous = (routePath) => {
    router.push({ path: `/${routePath}/${calendar.value.day_previous.toPathYMD()}` })
  }

  const next = (routePath) => {
    router.push({ path: `/${routePath}/${calendar.value.day_next.toPathYMD()}` })
  }

  return { calendar, calendarDay, getCurrentDay, getDaySchedules, previous, next, getNowPosition, getPosition }
}
