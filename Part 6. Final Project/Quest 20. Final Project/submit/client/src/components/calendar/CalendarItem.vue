<template>
  <div :class="['grid-item', 'event-container', isToday ? 'today' : '' ]"
       @click="triggerAddEvent">
    <div v-for="(val, key) in events"
         :class="[colorClass(val.type), 'event']"
         :key="key"
         @click.prevent.stop>
      <div> {{ val.name }}</div>
      <a @click.prevent.stop="deleteEvent(val.id)" id="deleteEvnt">x</a>
    </div>

  </div>
</template>
<script>
import moment from 'moment'
import { bootstrapColor } from '../../mixins'
export default {
  mixins: [bootstrapColor],
  props: ['day'],
  computed: {
    isToday () {
      return moment().isSame(this.day, 'day')
    },
    events () {
      let data = this.$store.getters.eventsByDay(this.day.format('YYYY-MM-DD'))
      return data
    }
  },
  methods: {
    colorClass (code) {
      return this.getBootstrapColor(code)
    },
    triggerAddEvent () {
      this.$emit('addEvent', this.day)
    },
    deleteEvent (eventId) {
      this.$store.dispatch('deleteEvent', eventId)
    }
  }

}
</script>
<style scoped>
.event-container {
  grid-gap: 2px;
  align-content: flex-start;
  padding: 3px;

}
.event-container:hover {
  background: rgba(216, 243, 252, 0.952);
}
.event {
  display: grid;
  grid-template-columns: 1fr 1.2rem;
  padding-left: 3px;
  color: #FFF;
  min-height: 1.5rem;
  border-radius: 3px;
  align-items:center;
  justify-content: center;
  align-content: center;
  font-size: 12px;
  font-weight:300;
}
.primary {
  background: #0274d8;
}

.warning {
  background:#f0ac4e;
}

.info {
  background: #5bc0de;
}

.danger {
  background: #d9544f;
}

.success {
  background: #5cb85c;
}
.dark {
  background: #292b2c;
}

.today {
  background: #f8f4b6;
}

#deleteEvnt {
  text-align:center;
  cursor: pointer;
  border: none;
  border-radius: 3px;
}
#deleteEvnt:hover {
  background: rgba(250, 250, 250, 0.2);
}
</style>
