<script>
import Calendar from '@/assets/calendar'
import month from '@/assets/month'
import { ref, computed } from 'vue'

export default {
  name: 'schedule-month',
  props: {
    routePath: {
      type: String,
      default: 'month_schedule'
    }
  },
  setup () {
    const { formatHHmm, loadSchedule } = Calendar()
    const { getMonthDays, getMonthSchedules, previous, next } = month()
    const { calendarMonth } = month()
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

    return { calendar, previous, next, formatHHmm }
  }
}
</script>

<template>
  <div id="headscheduleMonth">
    <div @click="previous(routePath)">＜</div>
    <div>{{calendar.month_current.year}}年{{calendar.month_current.month}}月</div>
    <div @click="next(routePath)">＞</div>
  </div>
  <div id="scheduleMonth">
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
              <td>
                <template v-if="calendar.month_current.month != parseInt(day.split('-')[1]) && monthDisplay">
                  <div>{{parseInt(day.split('-')[1])}}/{{parseInt(day.split('-')[2])}}</div>
                </template>
                <template v-else>
                  <div :class="[calendar.now === day ? 'today' : '', calendar.selected_date.today === day ? 'selected' : '', 'day']">{{parseInt(day.split('-')[2])}}</div>
                </template>
                <div v-for="s of schedule" :key="s">
                  {{formatHHmm(s.start_time)}} - {{formatHHmm(s.end_time)}}<br>
                  {{s.summary}}<br>
                  {{s.description}}
                </div>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style lang='scss'>
#headscheduleMonth {
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  text-align: center;
  height: 2em;
  background-color: $vcalendar-black;
}

#scheduleMonth {
  table {
    table-layout: fixed;

    th, td {
      width: 2em;
      height: 2em;
    }

    // td {
    //   height: 150px;
    //   overflow: hidden;
    //   white-space: nowrap;
    // }

    th {
      color: $vcalendar-blue-light;
    }
  }

  .day {
    width: 1.7em;
    height: 1.7em;
    line-height: 1.7em;
    margin: 0 auto;
    cursor: pointer;
  }

  .today {
    background: $vcalendar-red;
    border-radius: 50%;
    // color: #272822;
  }

  .selected {
    // background: $vcalendar-blue;
    border-radius: 50%;
    outline: 2px solid $vcalendar-blue;
    outline-offset: -2px;
    // color: #272822;
  }
}
</style>
