<template>
  <b-container>
    <b-row class="mb-4">
      <b-col cols="9" class="px-0">
        <b-input-group left="Filter">
          <b-form-input placeholder="Search"
                        v-model="filterKey"/>
        </b-input-group>
      </b-col>
      <b-col cols="3">
        <b-button @click.stop.prevent="addActivity">add new</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-card-group columns>
        <app-activity v-for="activity in filteredData"
                      :activity="activity"
                      :key="activity.id"/>
      </b-card-group>
    </b-row>
  </b-container>
</template>
<script>
import Activity from './Activity.vue'
import ActivityEdit from './ActivityEdit.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    appActivity: Activity,
    appEditActivity: ActivityEdit
  },
  data () {
    return {
      filterKey: ''
    }
  },
  methods: {
    addActivity () {
      this.$store.dispatch('addActivity')
    }
  },
  computed: {
    ...mapGetters(['activities']),
    filteredData () {
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var data = []
      for (const key in this.activities) {
        if (this.activities.hasOwnProperty(key)) {
          const element = { id: key, ...this.activities[key] }
          data.push(element)
        }
      }
      if (filterKey) {
        data = data.filter(row => {
          return Object.keys(row).some(key => {
            if (key === 'name') {
              return (
                String(row[key])
                  .toLowerCase()
                  .indexOf(filterKey) > -1
              )
            }
          })
        })
      }
      return data
    }
  }
}
</script>
