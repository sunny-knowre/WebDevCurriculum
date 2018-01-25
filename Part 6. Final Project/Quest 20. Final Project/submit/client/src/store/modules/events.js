import types from '../../data/activity_types'
import schedule from '../../data/user_schedule'
import firebase from 'firebase'
const state = {
  events: []
}

const mutations = {
  'SET_EVENTS' (state, events) {
    state.events = events
  },
  'ADD_EVENT' (state, payload) {
    let newEventId = Math.max(...state.events.map(o => o.id), 1) + 1
    let event = types.find(act => act.id === payload.activityId)
    let newEvent = { id: newEventId, activity: event, date: payload.date }
    state.events.push(newEvent)
  },
  'DELETE_EVENT' (state, id) {
    const record = state.events.find(element => element.id === id)
    state.events.splice(state.events.indexOf(record), 1)
  }
}

const actions = {
  initEvents: ({commit, getters}) => {
    const userId = getters.userInfo.id
    firebase.database().ref('/events/' + userId + '/').once('value').then(snapshot => {
      let data = snapshot.val()
      commit('SET_EVENTS', data)
    })
  }

}

const getters = {
  events: state => {
    return state.events
  },
  eventsByDay: (state) => (day) => {
    return state.events.filter(event => { return event.date === day })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
