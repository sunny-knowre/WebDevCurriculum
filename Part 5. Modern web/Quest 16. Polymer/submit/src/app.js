import Vue from 'vue';
import Desktop from './components/Desktop.vue';

const app = new Vue({
    render: h => h(Desktop)
});

export { app };
