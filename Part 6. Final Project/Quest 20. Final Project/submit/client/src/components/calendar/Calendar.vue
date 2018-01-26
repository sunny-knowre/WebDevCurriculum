<template>
  <div>
    <!-- Modal Component -->
    <b-modal v-model="showAddModal"
             hide-footer
             no-fade>
      <span slot="modal-header">{{ addItem.title }}</span>
      <calender-adder :date="addItem.date"
                      :show-filter="false"
                      @newEventFire="handleCreateEvent"></calender-adder>
    </b-modal>
    <b-row class="mb-1">
      <b-col cols="5">
        <b-button size="sm" @click="changeWeek(-1)"> Previous </b-button>
        <b-button size="sm" @click="changeWeek(1)"> Next </b-button>
        <b-button size="sm" @click="goToday"> Today </b-button>
      </b-col>
      <b-col cols="7">
        <span> {{ weekDisplay }}</span>
      </b-col>
    </b-row>
    <div class="calendar-grid">
      <div v-for="(day,key,index) in week"
           class="grid-item calendar-header"
           :key="index">{{ day.format('ddd (DD)') }}</div>
      <calendar-item v-for="(day, key) in week"
                     :key="key"
                     :day="day"
                     @addEvent="lauchAddModal"/>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import CalendarItem from './CalendarItem'
import CalendarAdd from './CalendarAdd'
export default {
  components: {
    calendarItem: CalendarItem,
    calenderAdder: CalendarAdd
  },
  data () {
    return {
      week: {},
      addItem: {},
      showAddModal: false
    }
  },
  computed: {
    weekDisplay () {
      return `${this.week.sun.format('MMM. D')} ~  ${this.week.sat.format(
        'MMM. D'
      )}`
    }
  },
  created () {
    this.setWeek(moment())
  },
  methods: {
    goToday () {
      let today = moment()
      this.setWeek(today)
    },
    setWeek (day) {
      let start = day.startOf('week')
      this.week = {
        sun: start,
        mon: start.clone().add(1, 'd'),
        tue: start.clone().add(2, 'd'),
        wed: start.clone().add(3, 'd'),
        thurs: start.clone().add(4, 'd'),
        fri: start.clone().add(5, 'd'),
        sat: start.clone().add(6, 'd')
      }
    },
    changeWeek (amt) {
      let now = this.week.sun.clone()
      let newStart = amt < 0 ? now.subtract(-1 * amt, 'w') : now.add(amt, 'w')
      this.setWeek(newStart)
    },
    lauchAddModal (day) {
      this.addItem.title = 'Add Activity: ' + day.format('ddd, MMM Do')
      this.addItem.date = day.format('YYYY-MM-DD')
      this.showAddModal = true
    },
    handleCreateEvent (payload) {
      this.$store.dispatch('addEvent', payload)
      this.showAddModal = false
    }
  }
}
</script>

<style scoped>
.calendar-grid {
  display: grid;
  height: 75vh;
  grid-gap: 1px;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: 30px minmax(0, 1fr);
  background: grey;
  border-radius: 5px;
}

.grid-item {
  display: grid;
  min-width: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  white-space: nowrap;
}
.calendar-header {
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
}
</style>
