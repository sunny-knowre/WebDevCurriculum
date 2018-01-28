import firebase from 'firebase'
import Vue from 'vue'
const ObjToArray = (snaps) => {
  let data = []
  for (const key in snaps) {
    if (snaps.hasOwnProperty(key)) {
      data.push(snaps[key])
    }
  }
  return data
}

const state = {
  activities: null
}

const mutations = {
  'SET_ACTIVITIES' (state, activities) {
    state.activities = activities
  },
  'SAVE_ACTIVITY' (state, payload) {
    state.activities[payload.id] = payload.activity
  },
  'ADD_ACTIVITY' (state, {id, payload}) {
    console.log(id, payload)
    // Vue.set(state.activities, id, payload)
  },
  'DELETE_ACTIVITY' (state, id) {
    Vue.delete(state.activities, id)
  }
}

const actions = {
  initActivities: async ({commit}) => {
    try {
      let activities = await firebase.database().ref('/activities/').once('value')
      let data = activities.val()
      commit('SET_ACTIVITIES', data)
    } catch (err) {
      console.log('init activities error', err)
    }
    try {
      let snapshot = await firebase.database().ref('/tags/').once('value')
      let tags = ObjToArray(snapshot.val())
      commit('SET_ACTIVITY_TYPES', tags, {root: true})
    } catch (err) {
      console.log('get tags error', err)
    }
  },
  addActivity: async ({commit, getters}) => {
    const path = '/activities/'
    try {
      const newActivity = await firebase.database().ref(path).push().key
      let payload = {
        description: 'new description',
        metric: '',
        name: 'new activity',
        type: 1
      }
      await firebase.database().ref(path + newActivity).update(payload)

      commit('ADD_ACTIVITY', { id: newActivity, payload })
    } catch (err) {
      console.log('add event', err)
    }
  },
  saveActivity: async ({commit}, payload) => {
    try {
      await firebase.database().ref('/activities/' + payload.id).set(
        payload.activity
      )
      commit('SAVE_ACTIVITY', payload)
    } catch (err) {
      console.log('error saving', payload, err)
    }
  },
  deleteActivity: async ({commit}, id) => {
    try {
      await firebase.database().ref('/activities/' + id).remove()
      commit('DELETE_ACTIVITY', id)
    } catch (err) {
      console.log('error deleting', id, err)
    }
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
  },
  activitiesLoaded: (state) => {
    return !(state.activities === null)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
