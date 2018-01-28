<template>
  <div>
    <b-container v-if="isEmpty">
      <b-jumbotron header="All done for today!" lead="go add some more activities to your calendar" >
        <b-btn variant="primary" to="/calendar">go to calendar</b-btn>
      </b-jumbotron>
    </b-container>
    <b-container v-else>
      <b-card v-for="item in events"
              v-if="!item.logged"
              :key="item.id"
              :sub-title="item.description">
        <!-- form label  needed-->
        <b-row>
          <b-col align="right" class="pt-1" cols="5">
            <p>{{ item.name }}
            {{ item.metric }}</p>
          </b-col>
          <b-col cols="7">
            <b-input-group>
              <b-form-input id="nestedValue" v-model="item.value" placeholder="enter value"></b-form-input>
              <b-btn id="logButton" @click="logItem(item.id)" variant="outline-success">Log</b-btn>
              <b-btn @click="cancelItem(item.id)" variant="warning">Skip</b-btn>
            </b-input-group>
          </b-col>
        </b-row>
      </b-card>
    </b-container>

  </div>

</template>
<script>
import moment from 'moment'
export default {
  mounted () {
    const date = moment().format('YYYY-MM-DD')
    let result = this.$store.getters.eventsByDay(date)
    if (result.length === 0) {
      this.$store.dispatch('initActivities')
      this.$store.dispatch('initEvents')
    }
  },
  computed: {
    events () {
      const date = moment().format('YYYY-MM-DD')
      let events = this.$store.getters.eventsByDay(date)
      return events
    },
    isEmpty () {
      let result = true
      this.events.forEach(element => {
        if (!element.logged) { result = false }
      })
      return result
    }
  },
  methods: {
    logItem (id) {
      let item = this.events.find((e) => { return e.id === id })
      if (item.value > 0) {
        this.$store.dispatch('logItem', {id, activityId: item.activityId, value: item.value})
      }
    },
    cancelItem (id) {
      this.$store.dispatch('deleteEvent', id)
    }
  }
}
</script>
<style>
</style>
