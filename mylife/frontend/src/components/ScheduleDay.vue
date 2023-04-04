<script>
import Calendar from '@/assets/calendar'
import day from '@/assets/day'
import { ref, computed } from 'vue'

export default {
  name: 'schedule-week',
  props: {
    routePath: {
      type: String,
      default: 'day_schedule'
    }
  },
  setup (_, context) {
    const { loadSchedule } = Calendar()
    const { calendarDay, getDaySchedules, getNowPosition, getPosition } = day()
    const schedules = ref([])

    const load = async () => {
      schedules.value = await loadSchedule()
    }
    load()

    const calendar = computed(() => {
      // その日のカレンダー情報の入った辞書を返す
      const calendarData = calendarDay.value
      calendarData.day_schedules = getDaySchedules([calendarData.day_current, calendarData.now], schedules)
      return calendarData
    })

    context.expose({ load })

    return { schedules, calendar, getNowPosition, getPosition }
  }
}
</script>

<template>
  <div id="scheduleDay" class="table-container">
    <div id="now" :style="{top: getNowPosition(calendar.now)+'px'}"></div>
    <template v-for="schedules of calendar.day_schedules" :key="schedules">
      <template v-for="schedule of schedules" :key="schedule">
        <div class="schedule" :style="{
          top: schedule.pos.top+'px',
          left: schedule.pos.left+'px',
          height: schedule.pos.height+'px',
          border: '1px solid' + schedule.category.color
        }"><font color={schedule.category.color}>{{schedule.summary}}</font><br>{{schedule.description}}</div>
      </template>
    </template>
    <table>
      <thead>
        <tr>
          <th class="th-border-left"></th><th style="width:10px"></th>
          <th class="th-border">
            <div class="circle-today">
              <p style="font-size: 10px">TODAY</p>
              {{calendar.now.day}}
            </div>
          </th>
          <th class="th-border" v-if="calendar.day_current.today!==calendar.now.today">
            <template v-if="calendar.day_current.month!==calendar.now.month">
              {{calendar.day_current.month}}/{{calendar.day_current.day}}
            </template>
            <template v-else>
              {{calendar.day_current.day}}
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in 24" class="table-time" :key="n">
          <td v-if="n<13"><div>{{n%12 + ' AM'}}</div></td>
          <td v-else-if="n<24"><div>{{n%12 + ' PM'}}</div></td>
          <td v-else></td>
          <td v-if="n<24" class="table-line-left"></td>
          <td v-else></td>
          <td class="table-line"></td>
          <template v-if="calendar.day_current.today!==calendar.now.today">
            <td class="table-line"></td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
  .table-container {
    position: relative;
    // height: 500px;
    width: 100%;
    // table-layout: fixed;
    overflow-x: hidden;
    overflow-y: scroll;

    table {
      table-layout: fixed;
      border-collapse: separate;
      border-spacing: 0;
    }

    th {
      position: sticky;
      top: 0;
      height: 100px;
      z-index: 1;
      background-color: $vcalendar-black;
      vertical-align: bottom;
      padding-bottom: 10px;
    }

    th:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-bottom: 1px solid $vcalendar-gray;
    }

    .th-border-left {
      width:100px;
    }

    .th-border-left:before {
      border-image: linear-gradient(to right, $vcalendar-black 0%, $vcalendar-gray 100%) 1/0 0 1px 0;
    }

    .th-border:before {
      border-left: 1px solid $vcalendar-gray;
    }

    .table-time {
      text-align: right;

      div {
        position: relative;
        height: 25px;
        top: 32px;
        padding: 5px;
        font-size: 10px;
      }
    }

    .table-line-left {
      border-bottom: 1px solid $vcalendar-gray;
    }

    .table-line {
      height: 50px;
      border-bottom: 1px solid $vcalendar-gray;
      border-left: 1px solid $vcalendar-gray;
    }
  }

  #now {
    position: absolute;
    left: 100px;
    width: 100%;
    border-image: linear-gradient(to right, $vcalendar-pink 0%, $vcalendar-red 100%) 1/0 0 1px 0;
    border-style: solid;
  }

  .schedule {
    position: absolute;
    width: 100px;
    background-color: $monokai-black;
    border-radius: 5px;
    padding-left: 5px;
    font-size: 12px;
  }

  .circle-today {
    margin: 0 auto;
    width: 50px;
    // background: $vcalendar-red;
    border-radius: 50%;
  }
</style>
