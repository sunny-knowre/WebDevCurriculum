import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';
import { store } from './store/store';
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  store,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});