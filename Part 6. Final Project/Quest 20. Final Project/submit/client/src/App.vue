<template>
  <div class="container">
    <app-header/>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
    'app-header': Header
  },
  beforeCreate () {
    this.$store.dispatch('tryAutoLogin')
    this.$store.dispatch('initActivities')
    this.$store.dispatch('initEvents')
  }
}
</script>

<style>
body {
  padding-top: 60px;
}
</style>
