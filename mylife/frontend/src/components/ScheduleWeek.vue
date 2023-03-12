<script>
import Calendar from '@/assets/calendar'
import week from '@/assets/week'
import { ref, computed } from 'vue'

export default {
  name: 'schedule-week',
  props: {
    routePath: {
      type: String,
      default: 'week_schedule'
    },
    weekDisplay: {
      type: Boolean,
      default: true
    }
  },
  setup (_, context) {
    const { formatHHmm, loadSchedule, zip } = Calendar()
    const { calendarWeek, getWeekSchedules, previous, next } = week()
    const schedules = ref([])

    const load = async () => {
      schedules.value = await loadSchedule()
    }
    load()

    const calendar = computed(() => {
      // 週間カレンダー情報の入った辞書を返す
      const calendarData = calendarWeek.value
      calendarData.week_schedules = getWeekSchedules(calendarData.week_first, calendarData.week_last, calendarData.week_days, schedules)
      const dataZip = zip(calendarData.week_names, calendarData.week_days, Object.values(calendarData.week_schedules))
      calendarData.week_row = dataZip.map((x) => {
        return { week_name: x[0], day: x[1], schedule: x[2] }
      })
      return calendarData
    })

    context.expose({ load })

    return { schedules, calendar, previous, next, formatHHmm }
  }
}
</script>

<template>
  <div id="headscheduleWeek">
    <a @click="previous(routePath)">＜</a>
    {{calendar.week_first.year}}年{{calendar.week_first.month}}月{{calendar.week_first.day}}日〜{{calendar.week_last.year}}年{{calendar.week_last.month}}月{{calendar.week_last.day}}日
    <a @click="next(routePath)">＞</a>
  </div>
  <div id="scheduleWeek">
    <table class="horizontal">
      <thead v-if="weekDisplay">
        <tr>
          <template v-for="w of calendar.week_names" :key="w">
            <th>
              {{w}}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr>
          <template v-for="day of calendar.week_days" :key="day">
            <td :class="[calendar.now === day.today ? 'today' : '', calendar.selected_date.today === day.today ? 'selected' : '', 'day']">
              <template v-if="calendar.week_first.month !== day.month">
                <div>{{day.month}}/{{day.day}}</div>
              </template>
              <template v-else>
                <div>{{day.day}}</div>
              </template>
            </td>
          </template>
        </tr>
        <tr>
          <template v-for="(schedule, day) of calendar.week_schedules" :key="schedule">
            <td :class="[calendar.now === day ? 'today-s' : '', calendar.selected_date.today === day ? 'selected-s' : '', 'day']">
              <div v-for="s of schedule" :key="s">
                {{formatHHmm(s.start_time)}} - {{formatHHmm(s.end_time)}}<br>
                {{s.summary}} <font color="{{s.category.color}}">{{s.category.name}}</font><br>
                {{s.description}}
              </div>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <table class="vertical">
      <tbody>
        <tr v-for="row of calendar.week_row" :key="row">
          <td v-if="calendar.now === row.day.today" style="color: red">
            <template v-if="calendar.week_first.month !== row.day.day">
              {{row.day.month}}/{{row.day.day}}({{row.week_name}})
            </template>
            <template v-else>
              {{row.day.day}}({{row.week_name}})
            </template>
          </td>
          <td v-else>
            <template v-if="calendar.week_first.month !== row.day.day">
              {{row.day.month}}/{{row.day.day}}({{row.week_name}})
            </template>
            <template v-else>
              {{row.day.day}}({{row.week_name}})
            </template>
          </td>
          <td>
            <div v-for="s of row.schedule" :key="s">
              {{formatHHmm(s.start_time)}} - {{formatHHmm(s.end_time)}}
              {{s.summary}}<br>
              {{s.description}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>

.horizontal{
  display: none;
}

.vertical{
  display: table;
}

@media (min-width: 768px) {

  .horizontal{
    display: table;
  }

  .vertical{
    display: none;
  }

}

@media (min-width: 1024px) {

}
</style>
