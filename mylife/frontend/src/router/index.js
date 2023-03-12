import { createRouter, createWebHistory } from 'vue-router'
import CalendarMonth from '@/components/CalendarMonth.vue'
import CalendarWeek from '@/components/CalendarWeek.vue'
import ScheduleWeek from '@/components/ScheduleWeek.vue'
import ScheduleMonth from '@/components/ScheduleMonth.vue'
import MyCalendar from '@/components/MyCalendar.vue'

const routes = [
  {
    path: '/month/:year?/:month?',
    name: 'calendar_month',
    component: CalendarMonth
  },
  {
    path: '/week/:year?/:month?/:day?',
    name: 'calendar_week',
    component: CalendarWeek
  },
  {
    path: '/week_schedule/:year?/:month?/:day?',
    name: 'schedule_week',
    component: ScheduleWeek
  },
  {
    path: '/month_schedule/:year?/:month?',
    name: 'schedule_month',
    component: ScheduleMonth
  },
  {
    path: '/calendar/:year?/:month?/:day?',
    name: 'my_calendar',
    component: MyCalendar
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
