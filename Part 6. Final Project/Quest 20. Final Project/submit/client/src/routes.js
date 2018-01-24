import Home from './components/Home.vue'
import ActivityList from './components/activity/ActivityList.vue'
import ActivityEdit from './components/activity/ActivityEdit.vue'
import ProgressBoard from './components/progress/ProgressBoard.vue'
import Calendar from './components/calendar/Calendar.vue'
import Login from './components/Login.vue'

export const routes = [
  { path: '/', component: Home },
  { path: '/calendar', component: Calendar },
  { path: '/activities', component: ActivityList },
  { path: '/progress', component: ProgressBoard },
  { path: '/activities/:id', name: 'edit', component: ActivityEdit, props: true },
  { path: '/login', component: Login }
]
