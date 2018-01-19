import data from '../../data/activity_types'
import tags from '../../data/tags'

const state = {
  activities: []
}

const mutations = {
  'SET_ACTIVITIES' (state, activities) {
    state.activities = activities
  },
  'SAVE_ACTIVITY' (state, payload) {
    Object.keys(state.activities).forEach((key) => {
      let obj = state.activities[key]
      if (payload.id === obj.id) {
        state.activities[key] = payload
      }
    })
  },
  'DELETE_ACTIVITY' (state, id) {
    const record = state.activities.find(element => element.id === id)
    state.activities.splice(state.activities.indexOf(record), 1)
  }
}

const actions = {
  initActivities: ({commit}) => {
    commit('SET_ACTIVITIES', data)
    commit('SET_ACTIVITY_TYPES', tags, {root: true})
  }
}

const getters = {
  activities: state => {
    return state.activities
  },
  getClonedActivity: (state) => (id) => {
    const record = state.activities.find(act => act.id === Number(id))
    return Object.assign({}, record)
  },
  activityColor: (state) => (id) => {
    const record = state.activities.find(act => act.id === id)
    const colors = {
      1: 'primary',
      2: 'warning',
      3: 'info',
      4: 'danger',
      5: 'success',
      6: 'dark'
    }
    return colors[record.type]
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
