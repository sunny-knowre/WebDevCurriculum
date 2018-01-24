import Vue from 'vue'
import Vuex from 'vuex'
import activities from './modules/activities'
import events from './modules/events'
import auth from './modules/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: []
  },
  mutations: {
    'SET_ACTIVITY_TYPES' (state, payload) {
      state.tags = payload
    }
  },
  getters: {
    activityTypes: (state) => {
      return state.tags
    }
  },
  modules: {
    activities,
    events,
    auth
  }
})
