<template>
  <b-container>
    <b-row>
      <button @click="getData">get</button>
    </b-row>
  </b-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  methods: {
    async getData () {
      try {
        let token = this.$store.getters.idToken
        let result = await axios.get('https://vuejs-http-685b2.firebaseio.com/activities.json' + '?access_token=' + token)
        console.log(result)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss">
.google_btn {
      width:220px;
      height: 50px;
      border: 0;
      background-size: 100%;
}
</style>
