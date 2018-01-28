import Vue from 'vue'
import Vuex from 'vuex'

import activities from './modules/activities'
import events from './modules/events'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [],
    loading: false
  },
  mutations: {
    'SET_ACTIVITY_TYPES' (state, payload) {
      state.tags = payload
    },
    'LOADING_CONTENT' (state) {
      state.loading = true
    },
    'DONE_LOADING' (state) {
      state.loading = false
    }
  },
  getters: {
    activityTypes: (state) => {
      return state.tags
    },
    isLoading: (state) => {
      return state.loading
    }
  },
  modules: {
    activities,
    events,
    auth
  }
})
