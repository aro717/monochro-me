<script>
import month from '@/assets/month'
import { ref } from 'vue'
import CalendarMonth from '@/components/CalendarMonth.vue'
// import ScheduleMonth from '@/components/ScheduleMonth.vue'
import ScheduleWeek from '@/components/ScheduleWeek.vue'
import ScheduleDay from '@/components/ScheduleDay.vue'
import ScheduleForm from '@/components/ScheduleForm.vue'

export default {
  name: 'my-calendar',
  components: { CalendarMonth, ScheduleWeek, ScheduleDay, ScheduleForm },
  // components: { ScheduleMonth, ScheduleWeek, ScheduleDay, ScheduleForm },
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
      <!-- <ScheduleMonth :routePath="routePath" :monthDisplay="false" :dayClick="dayClick" :scheduleDisplay="false"/> -->
      <ScheduleForm @reload="reload"/>
    </div>
    <div id="center">
      <ScheduleWeek ref="scheduleWeek" :routePath="routePath" :weekDisplay="false"/>
      <ScheduleDay />
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

table {
  width: 100%;
  border-collapse: collapse;
  background-color: $vcalendar-black;
  text-align: center;
}

#scheduleDay {
  height: 737px;
}

@include mq(tb) {
  #root {
    display: grid;
    grid-template-columns: 1fr 200px 450px 1fr;
    column-gap: 20px;
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
}

@include mq(md) {
  #root {
    // width: 980px;
    grid-template-columns: 1fr 250px 770px 1fr;
  }
}
</style>
