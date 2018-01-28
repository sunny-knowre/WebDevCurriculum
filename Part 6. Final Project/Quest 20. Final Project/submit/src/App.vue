<template>
  <div class="container">
    <app-header/>
    <div v-if="auth">
      <span v-if="loading">loading ...</span>
      <router-view v-else></router-view>
    </div>
    <login v-else></login>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Login from './components/Login.vue'
export default {
  components: {
    'app-header': Header,
    login: Login
  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    },
    loading () {
      return this.$store.getters.isLoading
    }
  },
  created () {
    this.$store.dispatch('tryAutoLogin')
  },
  mounted () {
    let auth = this.$store.getters.isAuthenticated
    if (auth) {
      this.$store.commit('LOADING_CONTENT')
      this.$store.dispatch('initActivities')
      this.$store.dispatch('initEvents')
    }
  }
}
</script>

<style>
body {
  padding-top: 60px;
}
</style>
