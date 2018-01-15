import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';
import store from './store/store';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});