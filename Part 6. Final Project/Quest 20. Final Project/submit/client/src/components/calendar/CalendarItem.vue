<template>
  <div class="day-container">
    <div v-for="(val, key) in events"
         :class="[colorClass(val.type), structureClass]"
         :key="key">
      {{ val.name }}
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { bootstrapColor } from '../../mixins'
export default {
  mixins: [bootstrapColor],
  data () {
    return {
      day: moment(),
      structureClass: 'event',
      events: [
        { name: '4x4 boulder', type: 4 },
        { name: 'ARC', type: 1 },
        { name: 'x-on x-off', type: 1 },
        { name: '4x4 route', type: 1 },
        { name: 'one/min', type: 3 },
        { name: 'deadhang', type: 1 },
        { name: 'plank', type: 6 },
        { name: 'pull up', type: 6 }
      ]
    }
  },
  methods: {
    colorClass (code) {
      return this.getBootstrapColor(code)
    }
  }
}
</script>

<style scoped>

.day-container {
  display: grid;
  grid-gap: 2px;
  align-content: flex-start;
  color: white;
  margin: 0 auto;
  min-width: 0;
  width: 100%;
  background: rgb(232, 255, 27);
}
.event {
  display: grid;
  border-radius: 3px;
  justify-content: center;
  align-content: center;
}
.primary {
  background: #0274d8a1
}

.warning {
  background:#f0ac4e7c
}

.info {
  background: #5bc0de80
}

.danger {
  background: #d9544f6e
}

.success {
  background: #5cb85c77
}
.dark {
  background: #292b2c6e
}

</style>
