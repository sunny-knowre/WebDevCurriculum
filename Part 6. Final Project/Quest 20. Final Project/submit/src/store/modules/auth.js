import firebase from 'firebase'

const state = {
  isLoggedIn: false,
  user: null
}

const mutations = {
  'LOGIN_USER' (state, user) {
    state.isLoggedIn = true
    state.user = {
      id: user.uid,
      photo: user.photoURL,
      name: user.displayName,
      email: user.email
    }
  },
  'LOGOUT_USER' (state) {
    state.isLoggedIn = false
    state.user = null
  }
}

const actions = {
  loginUser: async ({commit}, router) => {
    let provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account'
    })
    try {
      let result = await firebase.auth().signInWithPopup(provider)
      let user = result.user
      const expiresIn = new Date(new Date().getTime() + 24 * 60 * 1000)
      const local = { user, expiresIn }
      localStorage.setItem('vueAppStorage', JSON.stringify(local))
      commit('LOGIN_USER', user)
      router.replace('today')
    } catch (err) {
      console.log('login error', {err})
    }
  },
  logoutUser: async ({commit}, router) => {
    try {
      await firebase.auth().signOut()
      localStorage.removeItem('vueAppStorage')
      commit('LOGOUT_USER')
      router.replace('login')
    } catch (err) {
      console.log('logout error', err)
    }
  },
  tryAutoLogin: ({commit}) => {
    const local = JSON.parse(localStorage.getItem('vueAppStorage'))
    if (!local) return
    const expireDate = local.expiresIn
    const now = new Date()
    if (now >= expireDate) return
    commit('LOGIN_USER', local.user)
  }

}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  userInfo: (state) => {
    return state.user
  },
  isAuthenticated: (state) => {
    return !(state.user === null)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
