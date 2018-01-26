<template>
  <b-container>
    <b-row>
      <button @click="getData">get</button>
    </b-row>
  </b-container>
</template>
<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      activities: [
        { name: '4x4 boulder', metric: 'V grade', description: 'only 1 min rest between sets', type: 4 },
        { name: 'ARC', metric: 'mins', description: 'climb continuously for x minutes', type: 1 },
        { name: 'x-on x-off', metric: 'mins', description: 'climb for x min and rest x min; 4 reps', type: 1 },
        { name: '4x4 route', metric: 'decimal grade', description: '3 or more set of 4 routes', type: 1 },
        { name: 'one/min', metric: 'grade', description: 'climb 1 boulder/min for 8 min; 3 reps', type: 3 },
        { name: 'deadhang', metric: '', description: '', type: 1 },
        { name: 'plank', metric: 'mins', description: '', type: 6 },
        { name: 'pull up', metric: 'reps', description: '', type: 6 }
      ],
      tags: [
        { id: 1, name: 'aerobic capacity', color: 'blue' },
        { id: 2, name: 'anaerobic capacity', color: 'yellow' },
        { id: 3, name: 'aerobic power', color: 'skyblue' },
        { id: 4, name: 'anaerobic power', color: 'red' },
        { id: 5, name: 'strength', color: 'green' },
        { id: 6, name: 'auxiliary', color: 'grey' }
      ],
      events: [
        { activityId: '-L3ftfMOVeCfOMeGFkUL', scheduledDate: '2018-01-21' },
        { activityId: '-L3ftfMOVeCfOMeGFkUL', scheduledDate: '2018-01-22' },
        { activityId: '-L3ftfMOVeCfOMeGFkUL', scheduledDate: '2018-01-22' },
        { activityId: '-L3ftfMOVeCfOMeGFkUL', scheduledDate: '2018-01-22' },
        { activityId: '-L3ftfMOVeCfOMeGFkUL', scheduledDate: '2018-01-23' },
        { activityId: '-L3ftfMOVeCfOMeGFkUL', scheduledDate: '2018-01-23' },
        { activityId: '-L3ftfMOVeCfOMeGFkUL', scheduledDate: '2018-01-24' }
      ]
    }
  },
  methods: {
    getData () {
      this.events.forEach(tag => {
        firebase.database().ref('/events/V5fqXJKSgmUjFDYBg1khjW3c7402/').push(tag)
        // firebase.database().ref('/events/').remove()
      })
      console.log('done')
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
