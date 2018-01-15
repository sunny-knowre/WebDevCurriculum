<template>
  <b-navbar toggleable="md" fixed="top" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">Activity Tracker</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item to="/" activeClass="active" exact>Home</b-nav-item>
        <b-nav-item to="/activities" activeClass="active" exact>Activities</b-nav-item>
        <b-nav-item to="/progress" activeClass="active" exact>Progress</b-nav-item>
      </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: true
    }
  },
  computed: {
    navClasses() {
      return {
        collapse: this.isCollapsed,
        'navbar-collapse': 'navbar-collapse'
      }
    }
  },
  methods: {
    toggleNav(){
      if(this.isCollapsed === false)
        this.isCollapsed = true;
    }
  }
}
</script>