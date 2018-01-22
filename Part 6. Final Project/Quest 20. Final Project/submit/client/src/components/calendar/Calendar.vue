<template>
  <div class="calendar-layout">
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
    <div class="grid">
      <div v-for="(day,key) in week"
           class="item"
           :key="key">{{ day.format('ddd (DD)') }}</div>
      <calendar-item v-for="(day, key) in week"
                     :key="key"
                     :day="day"/>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import CalendarItem from './CalendarItem'
export default {
  components: {
    calendarItem: CalendarItem
  },
  data () {
    return {
      week: {}
    }
  },
  computed: {
    weekDisplay () {
      return `${this.week.sun.format('MMM. D')} ~  ${this.week.sat.format('MMM. D')}`
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
    }
  }
}
</script>

<style>
  .grid {
      display: grid;
      height: 80vh;
      grid-gap: 1px;
      grid-template-columns: repeat(7,minmax(0,1fr));
      grid-template-rows: 30px minmax(20px,1fr);
      background:grey;
      border-radius: 5px;
    }
  .item {
  /* We center the contents of these items. You can also do this with flexbox too! */
  display: grid;
  min-width: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  font-size: 12px;
}
</style>
