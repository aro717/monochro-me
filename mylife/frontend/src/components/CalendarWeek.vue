<script>
import week from '@/assets/week'
import { ref } from 'vue'

export default {
  name: 'calendar-week',
  setup () {
    const { calendar, previous, next } = week()
    const routePath = ref('week')

    return { calendar, routePath, previous, next }
  }
}
</script>

<template>
  <a @click="previous(routePath)">＜</a>
  {{calendar.week_first.year}}年{{calendar.week_first.month}}月{{calendar.week_first.day}}日〜{{calendar.week_last.year}}年{{calendar.week_last.month}}月{{calendar.week_last.day}}日
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
      <tr>
        <template v-for="day of calendar.week_days" :key="day">
          <td v-if="calendar.now == day.today" style="color: red">
            <template v-if="calendar.week_first.month != day.month">
              {{day.month}}/{{day.day}}
            </template>
            <template v-else>
              {{day.day}}
            </template>
          </td>
          <td v-else>
            <template v-if="calendar.week_first.month != day.month">
              {{day.month}}/{{day.day}}
            </template>
            <template v-else>
              {{day.day}}
            </template>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
