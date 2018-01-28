import firebase from 'firebase'
import moment from 'moment'
import Vue from 'vue'
const state = {
  events: null
}

const mutations = {
  'SET_EVENTS' (state, events) {
    state.events = events
  },
  'ADD_EVENT' (state, {id, value, activityId, scheduledDate, type}) {
    Vue.set(state.events, id, { value: 0, activityId, scheduledDate, type })
  },
  'DELETE_EVENT' (state, id) {
    Vue.delete(state.events, id)
  },
  'SET_EVENT_VALUE' (state, {id, value}) {
    Vue.set(state.events[id], 'value', value)
    Vue.set(state.events[id], 'logged', true)
  }
}

const actions = {
  initEvents: async ({commit, getters}) => {
    const userId = getters.userInfo.id
    try {
      let snapshot = await firebase.database().ref('/events/' + userId + '/').once('value')
      let data = snapshot.val()

      if (!data) data = {}
      commit('SET_EVENTS', data)
      commit('DONE_LOADING')
    } catch (err) {
      console.log('init events', err)
    }
  },
  addEvent: async ({commit, getters}, payload) => {
    const path = '/events/' + getters.userInfo.id + '/'
    try {
      const newEventKey = await firebase.database().ref(path).push().key
      await firebase.database().ref(path + newEventKey).update({ value: 0, ...payload })
      commit('ADD_EVENT', { id: newEventKey, ...payload })
    } catch (err) {
      console.log('add event', err)
    }
  },
  deleteEvent: async ({commit, getters}, id) => {
    const path = '/events/' + getters.userInfo.id + '/' + id
    try {
      await firebase.database().ref(path).remove()
      commit('DELETE_EVENT', id)
    } catch (err) {
      console.log('delete event', err)
    }
  },
  logItem: async ({commit, getters}, payload) => {
    const path = '/events/' + getters.userInfo.id + '/' + payload.id
    try {
      await firebase.database().ref(path).update({
        value: payload.value,
        logged: true
      })
      commit('SET_EVENT_VALUE', { logged: true, ...payload })
    } catch (err) {
      console.log('log event', err)
    }
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
          const description = activities[event.activityId].description
          const type = activities[event.activityId].type
          const metric = activities[event.activityId].metric
          data.push(Object.assign({}, { id, ...event, description, name, type, metric }))
        }
      }
    }
    return data
  },
  eventsLoaded: (state) => {
    return !(state.events === null)
  },
  allEvents: (state, getters) => {
    const activities = getters.activities
    let data = []
    for (const key in state.events) {
      if (state.events.hasOwnProperty(key)) {
        const event = state.events[key]
        if (event.logged) {
          const name = activities[event.activityId].name
          const type = activities[event.activityId].type
          const metric = activities[event.activityId].metric
          data.push(Object.assign({}, { activityType: type, value: event.value, name, metric }))
        }
      }
    }
    return data
  },
  eventsProgressBetween: (state) => (end, activityId) => {
    let events = state.events
    let start = moment(end).clone().subtract(1, 'weeks')
    let result = 0
    for (const key in events) {
      if (events.hasOwnProperty(key)) {
        const event = events[key]
        if (event.logged === true && event.activityId === activityId) {
          let date = moment(event.scheduledDate)
          if (date.isBetween(start, end)) {
            result = result + Number(event.value)
          }
        }
      }
    }
    return result
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
