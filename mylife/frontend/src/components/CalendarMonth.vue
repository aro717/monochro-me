<script>
import month from '@/assets/month'

export default {
  name: 'calendar-month',
  props: {
    routePath: {
      type: String,
      default: 'month'
    },
    monthDisplay: {
      type: Boolean,
      default: true
    },
    dayClick: {
      type: Function,
      default: null
    }
  },
  setup () {
    const { calendar, previous, next } = month()

    return { calendar, previous, next }
  }
}
</script>

<template>
  <div id="headcalendarMonth">
    <div @click="previous(routePath)">＜</div>
    <div>{{calendar.month_current.year}}年{{calendar.month_current.month}}月</div>
    <div @click="next(routePath)">＞</div>
  </div>
  <div id="calendarMonth">
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
        <template v-for="week of calendar.month_days" :key="week">
          <tr>
            <template v-for="day of week" :key="day">
              <td>
                <template v-if="calendar.month_current.month != day.month && monthDisplay">
                  <div @click="dayClick(routePath, day)">{{day.month}}/{{day.day}}</div>
                </template>
                <template v-else>
                  <div :class="[calendar.now === day.today ? 'today' : '', calendar.selected_date.today === day.today ? 'selected' : '', 'day']" @click="dayClick(routePath, day)">{{day.day}}</div>
                </template>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style lang='scss'>
#headcalendarMonth {
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  text-align: center;
  height: 2em;
  background-color: $vcalendar-black;
}

#calendarMonth {
  table {
    th, td {
      width: 3em;
      height: 2em;
    }

    th {
      color: $vcalendar-blue-light;
    }

    // td {
    //   border-width: 1px 0px;
    //   border-color: #75715e;
    //   border-style: solid;
    // }
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
