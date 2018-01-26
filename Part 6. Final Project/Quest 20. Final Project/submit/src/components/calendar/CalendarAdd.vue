<template>
  <b-container>
    <b-row v-if="showFilter">
      <b-col class="px-0">
        <b-form-input size="sm"
                      placeholder="Find Activity"
                      v-model="filterKey"/>
      </b-col>
      <b-col cols="5" class="pl-1 pr-0 mr-0">
        <b-form-select v-model="activityTypeFilter"
                       :options="types"
                       size="sm">
        </b-form-select>
      </b-col>
    </b-row>
    <b-row>
      <b-btn v-for="activity in filteredData"
             :key="activity.id"
             :variant="bsColor(activity.type)"
             @click="addActivity(activity.id)"
             class="m-1"
             style="cursor:pointer">{{ activity.name }}</b-btn>
    </b-row>
  </b-container>
</template>
<script>
import { bootstrapColor } from '../../mixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [bootstrapColor],
  props: ['date', 'showFilter'],
  data () {
    return {
      filterKey: '',
      activityTypeFilter: null
    }
  },
  computed: {
    ...mapGetters(['activities']),
    types () {
      let defaultOption = {
        value: null,
        text: 'select type'
      }
      return [defaultOption].concat(this.$store.getters.activityTypes.map(el => { return {value: el.id, text: el.name} }))
    },
    filteredData () {
      var filterKey = this.filterKey.toLowerCase()
      var typeKey = this.activityTypeFilter
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
      if (typeKey) {
        data = data.filter(row => {
          return Object.keys(row).some(key => {
            if (key === 'type') {
              return (
                row[key] === typeKey
              )
            }
          })
        })
      }
      return data
    }
  },
  methods: {
    addActivity (id) {
      this.$emit('newEventFire', {activityId: id, scheduledDate: this.date})
    },
    bsColor (code) {
      return this.getBootstrapColor(code)
    }
  }
}
</script>

<style scoped>
  select {
    font-size: 12px;
  }
</style>
