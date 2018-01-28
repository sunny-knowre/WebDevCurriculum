<script>
import moment from 'moment'
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  computed: {
    datacollection () {
      let today = moment('2018-01-31')
      let start = today.clone().subtract(4, 'weeks')
      let w1 = start.clone().add(1, 'weeks')
      let w2 = w1.clone().add(1, 'weeks')
      let w3 = w2.clone().add(1, 'weeks')
      let w4 = w3.clone().add(1, 'weeks')
      let labels = [w1, w2, w3, w4].map(e => { return e.format('YYYY-MM-DD') })
      const colors = {
        1: '#0274d8',
        2: '#f0ac4e',
        3: '#5bc0de',
        4: '#d9544f',
        5: '#5cb85c',
        6: '#292b2c'
      }
      let datasets = []
      let activities = this.$store.getters.activities
      for (const key in activities) {
        if (activities.hasOwnProperty(key)) {
          const activity = activities[key]
          let data = labels.map(
            d => { return this.$store.getters.eventsProgressBetween(d, key) })
          const total = data.reduce((acc, cur) => acc + cur, 0)
          if (total !== 0) {
            datasets.push({
              label: activity.name,
              backgroundColor: colors[activity.type],
              data})
          }
        }
      }
      return {
        labels,
        datasets
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
