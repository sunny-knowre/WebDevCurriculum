<template>
  <div>
    <b-container v-if="!isEmpty">
      <b-card v-for="item in events" :key="item.id"
              v-if="!isHidden(item.id)"
              bg-variant="light">
        <b-form-group horizontal
                      breakpoint="lg"
                      :label="item.name"
                      label-size="lg"
                      label-class="font-weight-bold pt-0"
                      class="mb-0">
          <b-form-group horizontal
                        :label="item.metric"
                        label-class="text-sm-right"
                        label-for="nestedValue">
            <b-input-group>
              <b-form-input id="nestedValue" v-model="item.value" placeholder="enter value"></b-form-input>
              <b-input-group-append>
                <b-btn @click="logItem(item.id)" variant="outline-success">Log</b-btn>
                <b-btn @click="cancelItem(item.id)" variant="warning">Skip</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-form-group>
      </b-card>
    </b-container>
    <b-container v-else>
      <b-jumbotron header="All done for today!" lead="go add some more activities to your calendar" >
        <b-btn variant="primary" to="/calendar">go to calendar</b-btn>
      </b-jumbotron>
    </b-container>
  </div>

</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      hiddenItems: []
    }
  },
  computed: {
    events () {
      const date = moment().format('YYYY-MM-DD')
      let events = this.$store.getters.eventsByDay(date)
      return events
    },
    isEmpty () {
      return this.hiddenItems.length === this.events.length
    }
  },
  methods: {
    isHidden (id) {
      return this.hiddenItems.includes(id)
    },
    logItem (id) {
      let item = this.events.find((e) => { return e.id === id })
      if (item.value > 0) {
        this.$store.dispatch('logItem', {id, value: item.value})
        this.hiddenItems.push(id)
      } else {
        this.hiddenItems.push(id)
        this.$store.dispatch('skipItem', id)
      }
    },
    cancelItem (id) {
      this.$store.dispatch('skipItem', id)
      this.hiddenItems.push(id)
    }
  }
}
</script>
<style>
</style>
