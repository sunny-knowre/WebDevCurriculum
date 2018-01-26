import firebase from 'firebase'
import Vue from 'vue'
const state = {
  events: []
}

const mutations = {
  'SET_EVENTS' (state, events) {
    state.events = events
  },
  'ADD_EVENT' (state, {id, activityId, scheduledDate}) {
    Vue.set(state.events, id, {activityId, scheduledDate})
  },
  'DELETE_EVENT' (state, id) {
    Vue.delete(state.events, id)
  }
}

const actions = {
  initEvents: ({commit, getters}) => {
    const userId = getters.userInfo.id
    firebase.database().ref('/events/' + userId + '/').once('value').then(snapshot => {
      let data = snapshot.val()
      commit('SET_EVENTS', data)
    })
  },
  addEvent: ({commit, getters}, payload) => {
    const path = '/events/' + getters.userInfo.id + '/'
    const newEventKey = firebase.database().ref(path).push().key
    firebase.database().ref(path + newEventKey).update(payload)
    commit('ADD_EVENT', { id: newEventKey, ...payload })
  },
  deleteEvent: ({commit, getters}, id) => {
    const path = '/events/' + getters.userInfo.id + '/' + id
    firebase.database().ref(path).remove()
    commit('DELETE_EVENT', id)
  }

}

const getters = {
  eventsByDay: (state, getters) => (day) => {
    const activities = getters.activities
    let data = []
    for (const key in state.events) {
      if (state.events.hasOwnProperty(key)) {
        const event = state.events[key]
        if (event.scheduledDate === day) {
          const id = key
          const name = activities[event.activityId].name
          const type = activities[event.activityId].type
          data.push({ id, name, type })
        }
      }
    }
    return data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
