import firebase from 'firebase'

const state = {
  isLoggedIn: false,
  user: [],
  refreshToken: '',
  accestoken: null,
  idToken: null
}

const mutations = {
  'LOGIN_USER' (state, {idToken, accessToken, user}) {
    console.log(user)
    state.isLoggedIn = true
    state.idToken = idToken
    state.accessToken = accessToken
    state.refreshToken = user.refreshToken
    state.user = {
      id: user.uid,
      photo: user.photoURL,
      name: user.displayName,
      email: user.email
    }
  },
  'LOGOUT_USER' (state) {
    state.isLoggedIn = false
    state.refreshToken = ''
    state.user = []
  }
}

const actions = {
  loginUser: async ({commit}) => {
    let provider = new firebase.auth.GoogleAuthProvider()
    try {
      let result = await firebase.auth().signInWithPopup(provider)
      console.log(result)
      let accessToken = result.credential.accessToken
      let idToken = result.credential.idToken
      let user = result.user
      commit('LOGIN_USER', { idToken, accessToken, user })
    } catch (err) {
      console.log(err)
    }
  },
  logoutUser: async ({commit}) => {
    try {
      await firebase.auth().signOut()
      commit('LOGOUT_USER')
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
    return state.accessToken
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
