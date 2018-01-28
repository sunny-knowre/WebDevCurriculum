import Today from './components/Today.vue'
import ActivityList from './components/activity/ActivityList.vue'
import ActivityEdit from './components/activity/ActivityEdit.vue'
import ProgressBoard from './components/progress/ProgressBoard.vue'
import Calendar from './components/calendar/Calendar.vue'
import Login from './components/Login.vue'

export const routes = [
  {
    path: '*',
    redirect: '/today'
  },
  {
    path: '/',
    redirect: '/today'
  },
  {
    path: '/today',
    name: 'today',
    component: Today,
    meta: {requiresAuth: true}
  },
  {
    path:
    '/calendar',
    name: 'calendar',
    component: Calendar,
    meta: {requiresAuth: true}
  },
  {
    path: '/activities',
    name: 'activities',
    component: ActivityList,
    meta: {requiresAuth: true}
  },
  {
    path: '/progress',
    name: 'progress',
    component: ProgressBoard,
    meta: {requiresAuth: true}
  },
  {
    path: '/activities/:id',
    name: 'edit',
    component: ActivityEdit,
    props: true,
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
