<script>
import Calendar from '@/assets/calendar'
import month from '@/assets/month'
import { ref, computed } from 'vue'

export default {
  name: 'schedule-month',
  setup () {
    const { formatHHmm, loadSchedule } = Calendar()
    const { getMonthDays, getMonthSchedules, previous, next } = month()
    const { calendarMonth } = month()
    const routePath = ref('month_schedule')
    const schedules = ref([])

    const load = async () => {
      schedules.value = await loadSchedule()
    }
    load()

    const calendar = computed(() => {
      // 月間カレンダー情報の入った辞書を返す
      const calendarData = calendarMonth.value
      const days = getMonthDays(calendarData.month_current)
      const first = days[0][0]
      const last = days[days.length - 1][days[0].length - 1]
      calendarData.month_schedules = getMonthSchedules(first, last, days, schedules)
      return calendarData
    })

    return { calendar, routePath, previous, next, formatHHmm }
  }
}
</script>

<template>
  <a @click="previous(routePath)">＜</a>
  {{calendar.month_current.year}}年{{calendar.month_current.month}}月
  <a @click="next(routePath)">＞</a>
  <table>
    <thead>
      <tr>
        <template v-for="w of calendar.week_names" :key="w">
          <th>
            {{w}}
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-for="week_schedules of calendar.month_schedules" :key="week_schedules">
        <tr>
          <template v-for="(schedule, day) of week_schedules" :key="day">
            <td v-if="calendar.now === day" style="color: red">
              <div v-if="calendar.month_current.month != parseInt(day.split('-')[1])">
                {{parseInt(day.split('-')[1])}}/{{parseInt(day.split('-')[2])}}
                <div v-for="s of schedule" :key="s">
                  {{formatHHmm(s.start_time)}} - {{formatHHmm(s.end_time)}}<br>
                  {{s.summary}}<br>
                  {{s.description}}
                </div>
              </div>
              <div v-else>
                {{parseInt(day.split('-')[2])}}
                <div v-for="s of schedule" :key="s">
                  {{formatHHmm(s.start_time)}} - {{formatHHmm(s.end_time)}}<br>
                  {{s.summary}}<br>
                  {{s.description}}
                </div>
              </div>
            </td>
            <td v-else>
              <div v-if="calendar.month_current.month != parseInt(day.split('-')[1])">
                {{parseInt(day.split('-')[1])}}/{{parseInt(day.split('-')[2])}}
                <div v-for="s of schedule" :key="s">
                  {{formatHHmm(s.start_time)}} - {{formatHHmm(s.end_time)}}<br>
                  {{s.summary}}<br>
                  {{s.description}}
                </div>
              </div>
              <div v-else>
                {{parseInt(day.split('-')[2])}}
                <div v-for="s of schedule" :key="s">
                  {{formatHHmm(s.start_time)}} - {{formatHHmm(s.end_time)}}<br>
                  {{s.summary}}<br>
                  {{s.description}}
                </div>
              </div>
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
  table {
    table-layout: fixed;
  }

  td > div {
    height: 150px;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
