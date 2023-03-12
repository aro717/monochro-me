<script>
import month from '@/assets/month'
import { ref } from 'vue'
import CalendarMonth from '@/components/CalendarMonth.vue'
import ScheduleWeek from '@/components/ScheduleWeek.vue'
import ScheduleForm from '@/components/ScheduleForm.vue'

export default {
  name: 'my-calendar',
  components: { CalendarMonth, ScheduleWeek, ScheduleForm },
  setup () {
    const { dayClick } = month()
    const routePath = ref('calendar')
    const scheduleWeek = ref()

    const reload = async () => {
      await scheduleWeek.value.load()
    }

    return { scheduleWeek, routePath, dayClick, reload }
  }
}
</script>

<template>
  <div id="root">
    <div id="side">
      <CalendarMonth :routePath="routePath" :monthDisplay="false" :dayClick="dayClick"/>
      <ScheduleForm @reload="reload"/>
    </div>
    <div id="center">
      <ScheduleWeek ref="scheduleWeek" :routePath="routePath" :weekDisplay="false"/>
    </div>
  </div>
</template>

<style lang='scss'>
body {
  background-color: $monokai-black;
  color: $monokai-white;
}

#root {
  width: 100%;
  grid-template-columns: 20px 1fr 20px;
  grid-template-rows: 1fr;
}

#headcalendarMonth {
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  text-align: center;
  height: 2em;
  background-color: $vcalendar-black;
}

#headscheduleWeek {
  height: 2em;
  background-color: $vcalendar-black;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: $vcalendar-black;
  text-align: center;

  th {
    color: $vcalendar-blue-light;
  }

  // td {
  //   border-width: 1px 0px;
  //   border-color: #75715e;
  //   border-style: solid;
  // }
}

#calendarMonth {
  table {
    th, td {
      width: 3em;
      height: 2em;
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

#scheduleWeek {
  .vertical {
    td:first-of-type {
      width: 100px;
    }

    td:last-of-type {
      text-align: left;
    }
  }

  .day {
    width: 1.7em;
    height: 1.7em;
    line-height: 1.7em;
    margin: 0 auto;
    vertical-align: top;
  }

  .today {
    background: $vcalendar-red;
    color: #272822;
  }

  .today-s {
    background: $vcalendar-red-dark;
  }

  .selected {
    outline: 2px solid $vcalendar-blue;
    outline-offset: -2px;
  }

  .selected-s {
    background: $vcalendar-blue-dark;
  }
}

@include mq(tb) {
  #root {
    display: grid;
    // width: 700px;
    grid-template-columns: 1fr 200px 450px 1fr;
    column-gap: 20px;
    // row-gap: 100px;
  }

  #side {
    display: block;
    grid-row: 1;
    grid-column: 2;
  }

  #center {
    display: block;
    grid-row: 1;
    grid-column: 3;
  }

  #scheduleWeek {
    .horizontal {
      table-layout: fixed;

      tr:last-of-type {
        font-size: small;
        text-align: left;
      }
    }
  }
}

@include mq(md) {
  #root {
    // width: 980px;
    grid-template-columns: 1fr 250px 770px 1fr;
  }
}
</style>
