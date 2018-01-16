import Home from './components/Home.vue';
import ActivityList from './components/activity/ActivityList.vue';
import ActivityEdit from './components/activity/ActivityEdit.vue';
import ProgressBoard from './components/progress/ProgressBoard.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/activities', component: ActivityList },
    { path: '/progress', component: ProgressBoard },
    { path: '/activities/:id', name: 'edit', component: ActivityEdit, props: true }
];