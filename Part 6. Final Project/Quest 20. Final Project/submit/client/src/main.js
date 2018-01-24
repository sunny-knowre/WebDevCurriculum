import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import store from './store/store'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
var config = {
  apiKey: 'AIzaSyBTk2ZKj8Z0EPNdW8zq0tWALf9sT7k8stw',
  authDomain: 'vuejs-http-685b2.firebaseapp.com',
  databaseURL: 'https://vuejs-http-685b2.firebaseio.com',
  projectId: 'vuejs-http-685b2',
  storageBucket: 'vuejs-http-685b2.appspot.com',
  messagingSenderId: '428814632893'
}
firebase.initializeApp(config)

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
