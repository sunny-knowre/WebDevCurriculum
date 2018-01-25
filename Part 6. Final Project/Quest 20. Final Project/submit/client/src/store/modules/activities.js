import firebase from 'firebase'
import Vue from 'vue'
const snapToArray = (snaps) => {
  let data = []
  for (const key in snaps) {
    if (snaps.hasOwnProperty(key)) {
      data.push(snaps[key])
    }
  }
  return data
}

const state = {
  activities: []
}

const mutations = {
  'SET_ACTIVITIES' (state, activities) {
    state.activities = activities
  },
  'SAVE_ACTIVITY' (state, payload) {
    state.activities[payload.id] = payload.activity
  },
  'DELETE_ACTIVITY' (state, id) {
    Vue.delete(state.activities, id)
  }
}

const actions = {
  initActivities: ({commit}) => {
    firebase.database().ref('/activities/').once('value').then(snapshot => {
      let data = snapshot.val()
      commit('SET_ACTIVITIES', data)
    })
    firebase.database().ref('/tags/').once('value').then(snapshot => {
      let tags = snapToArray(snapshot.val())
      commit('SET_ACTIVITY_TYPES', tags, {root: true})
    })
  },
  saveActivity: ({commit}, payload) => {
    firebase.database().ref('/activities/' + payload.id).set(
      payload.activity
    )
    commit('SAVE_ACTIVITY', payload)
  },
  deleteActivity: ({commit}, id) => {
    firebase.database().ref('/activities/' + id).remove()
    commit('DELETE_ACTIVITY', id)
  }
}

const getters = {
  activities: state => {
    return state.activities
  },
  getClonedActivity: (state) => (id) => {
    let record = state.activities[id]
    return Object.assign({}, record)
  },
  activityColor: (state) => (id) => {
    const record = state.activities[id]
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
