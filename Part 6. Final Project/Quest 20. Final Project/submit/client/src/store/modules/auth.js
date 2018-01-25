import firebase from 'firebase'

const state = {
  isLoggedIn: false,
  user: {},
  token: null
}

const mutations = {
  'LOGIN_USER' (state, { token, user }) {
    state.isLoggedIn = true
    state.token = token
    state.user = {
      id: user.uid,
      photo: user.photoURL,
      name: user.displayName,
      email: user.email
    }
  },
  'LOGOUT_USER' (state) {
    state.isLoggedIn = false
    state.user = []
    state.token = null
  }
}

const actions = {
  loginUser: async ({commit}, router) => {
    let provider = new firebase.auth.GoogleAuthProvider()
    try {
      let result = await firebase.auth().signInWithPopup(provider)
      let token = result.credential
      let user = result.user
      const expiresIn = new Date(new Date().getTime() + 24 * 60 * 1000)
      const local = {token, user, expiresIn}
      localStorage.setItem('vueAppStorage', JSON.stringify(local))
      commit('LOGIN_USER', { token, user })
      router.replace('calendar')
    } catch (err) {
      console.log(err)
    }
  },
  logoutUser: async ({commit}, router) => {
    try {
      await firebase.auth().signOut()
      localStorage.removeItem('vueAppStorage')
      commit('LOGOUT_USER')
      router.replace('login')
    } catch (err) {
      console.log(err)
    }
  },
  tryAutoLogin: async ({commit}) => {
    try {
      const local = JSON.parse(localStorage.getItem('vueAppStorage'))
      if (!local) return

      const expireDate = local.expiresIn
      const now = new Date()
      if (now >= expireDate) return
      commit('LOGIN_USER', {token: local.token, user: local.user})
    } catch (err) {
      console.log(err)
    }
  }

}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  userInfo: (state) => {
    return state.user
  },
  idToken: (state) => {
    return state.token
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
