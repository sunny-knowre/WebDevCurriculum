import Home from './components/Home.vue';
import ActivityList from './components/activity/ActivityList.vue';
import ProgressBoard from './components/progress/ProgressBoard.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/activities', component: ActivityList },
    { path: '/progress', component: ProgressBoard }
];