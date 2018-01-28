<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="8" >
        <line-chart></line-chart>
      </b-col>
      <b-col cols="6" md="4">
        <app-graph :stats="stats" ></app-graph>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import BalanceGraph from './BalanceGraph.vue'
import LineChart from './ProgressChart.vue'
export default {
  components: {
    appGraph: BalanceGraph,
    lineChart: LineChart
  },
  data () {
    return {
      events: null,
      types: null
    }
  },
  computed: {
    options () {
      let activities = this.activities
      let formOptions = []
      for (const key in activities) {
        if (activities.hasOwnProperty(key)) {
          const activity = activities[key]
          formOptions.push({
            value: key,
            text: activity.name
          })
        }
      }
      return formOptions
    },
    stats () {
      let data = []
      let counter = {}
      let events = this.events
      let types = this.types
      for (const key in types) {
        if (types.hasOwnProperty(key)) {
          const type = types[key]
          counter[type.id] = 0
          data.push({ id: type.id, label: type.name, value: 110 })
        }
      }
      let max = 1
      for (const key in events) {
        if (events.hasOwnProperty(key)) {
          const event = events[key]
          counter[event.activityType]++
          if (counter[event.activityType] >= max) { max = counter[event.activityType] }
        }
      }
      data = data.map(point => {
        let addition = (counter[point.id] / max) * 110
        return { label: point.label, value: point.value + addition }
      })
      return data
    }
  },
  created () {
    this.types = this.$store.getters.activityTypes
    this.events = this.$store.getters.allEvents
  }
}
</script>
