<template>
  <b-container>
    <b-row>
      <b-col align="center">
        <b-card title="Welcome">
          <p class="card-text">
            Welcome to the sample activity scheduler app
          </p>
          <img :src="require('../assets/google_signin.png')"
               class="google_btn"
               @click="login" />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  methods: {
    login () {
      this.$store.dispatch('loginUser', this.$router)
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
