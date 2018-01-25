<template>
  <b-navbar toggleable="md" fixed="top" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"/>
    <b-navbar-brand href="#">Activity Tracker</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/" active-class="active" exact>Home</b-nav-item>
        <b-nav-item to="/calendar" active-class="active">Calendar</b-nav-item>
        <b-nav-item to="/activities" active-class="active">Activities</b-nav-item>
        <b-nav-item to="/progress" active-class="active">Progress</b-nav-item>
        <b-nav-item to="/login"
                    v-if="!isLoggedIn"
                    active-class="active">Login</b-nav-item>
        <b-nav-item-dropdown v-if="isLoggedIn" right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{ username }}</em>
          </template>
          <b-dropdown-item @click="logout">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    username () {
      return this.$store.getters.userInfo.name
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutUser', this.$router)
    }
  }
}
</script>
