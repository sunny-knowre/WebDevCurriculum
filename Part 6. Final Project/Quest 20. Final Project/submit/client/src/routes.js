import Home from './components/Home.vue';
import ActivityList from './components/activity/ActivityList.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/activity', component: ActivityList }
];