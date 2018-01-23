import types from '../../data/activity_types'
import schedule from '../../data/user_schedule'

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
  initEvents: ({commit}) => {
    let data = schedule.map((element) => {
      let event = types.find(act => act.id === element.activityId)
      return { id: element.eventId, activity: event, date: element.scheduled_date }
    })
    commit('SET_EVENTS', data)
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
