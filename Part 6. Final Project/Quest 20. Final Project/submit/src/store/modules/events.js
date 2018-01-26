import firebase from 'firebase'
import Vue from 'vue'
const state = {
  events: []
}

const mutations = {
  'SET_EVENTS' (state, events) {
    state.events = events
  },
  'ADD_EVENT' (state, {id, value, skipped, activityId, scheduledDate}) {
    Vue.set(state.events, id, { value: 0, skipped: false, activityId, scheduledDate })
  },
  'DELETE_EVENT' (state, id) {
    Vue.delete(state.events, id)
  },
  'SET_EVENT_VALUE' (state, payload) {
    Vue.set(state.events[payload.id], 'value', payload.value)
  },
  'SKIP_EVENT' (state, id) {
    Vue.set(state.events[id], 'skipped', true)
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
    firebase.database().ref(path + newEventKey).update({ value: 0, skipped: false, ...payload }).then(() => {
      commit('ADD_EVENT', { id: newEventKey, ...payload })
    })
  },
  deleteEvent: ({commit, getters}, id) => {
    const path = '/events/' + getters.userInfo.id + '/' + id
    firebase.database().ref(path).remove()
    commit('DELETE_EVENT', id)
  },
  logItem: ({commit, getters}, payload) => {
    const path = '/events/' + getters.userInfo.id + '/' + payload.id
    firebase.database().ref(path).update({
      value: payload.value
    })
    commit('SET_EVENT_VALUE', payload)
  },
  skipItem: ({commit, getters}, id) => {
    const path = '/events/' + getters.userInfo.id + '/' + id
    firebase.database().ref(path).update({
      skipped: true
    })
    commit('SKIP_EVENT', id)
  }
}

const getters = {
  eventsByDay: (state, getters) => (day) => {
    const activities = getters.activities
    let data = []
    for (const key in state.events) {
      if (state.events.hasOwnProperty(key)) {
        const event = state.events[key]
        if (event.scheduledDate === day && !event.skipped) {
          const id = key
          const name = activities[event.activityId].name
          const type = activities[event.activityId].type
          const metric = activities[event.activityId].metric
          data.push({ id, ...event, name, type, metric })
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
