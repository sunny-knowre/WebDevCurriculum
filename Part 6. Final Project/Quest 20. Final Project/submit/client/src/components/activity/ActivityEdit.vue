<template>
  <b-container>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="activity">
      <b-row class="mb-3">
        <b-col class="pl-3">
          <b-button-toolbar>
            <b-button-group class="mx-1">
              <b-btn to="/activities">&lsaquo;</b-btn>
            </b-button-group>
            <b-button-group size="sm" class="mx-2">
              <b-btn id="saveButton"
                     variant="outline-success"
                     @click.prevent="onSave">Save</b-btn>
              <b-btn variant="outline-danger" @click.prevent="cancelForm">Cancel</b-btn>
              <b-tooltip disabled
                         :show.sync="showTool"
                         target="saveButton"
                         placement="bottom">Saved!</b-tooltip>
            </b-button-group>
          </b-button-toolbar>
        </b-col>
      </b-row>
      <b-card :border-variant="bsColor"
              :header-bg-variant="bsColor"
              :header="activity.name"

              header-text-variant="white"
              align="center">
        <b-form>
          <b-form-group id="name"
                        horizontal
                        :label-cols="2"
                        label-size="sm"
                        label="Name"
                        label-for="name">
            <b-form-input id="input1"
                          type="text"
                          v-model="activity.name"
                          required
                          placeholder="Enter name"/>
          </b-form-group>
          <b-form-group id="desc"
                        horizontal
                        :label-cols="2"
                        label-size="sm"
                        label="Description"
                        label-for="desc">
            <b-form-input id="input3"
                          type="text"
                          v-model="activity.description"
                          required
                          placeholder="Enter description"/>
          </b-form-group>
          <b-form-group id="metric"
                        horizontal
                        :label-cols="2"
                        label-size="sm"
                        label="Metric"
                        label-for="metric">
            <b-form-input id="input2"
                          type="text"
                          v-model="activity.metric"
                          required
                          placeholder="Enter units to measure by"/>
          </b-form-group>
          <b-form-group id="type"
                        horizontal
                        :label-cols="2"
                        label-size="sm"
                        label="Type"
                        label-for="type">
            <b-form-select v-model="activity.type"
                           :options="types"
                           class="mb-3"/>
          </b-form-group>

        </b-form>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { bootstrapColor } from '../../mixins'
export default {
  mixins: [bootstrapColor],
  props: ['id'],
  data () {
    return {
      loading: false,
      activity: null,
      error: null,
      showTool: false
    }
  },
  computed: {
    selected () {
      return this.activity.type
    },
    types () {
      return this.$store.getters.activityTypes.map(el => { return {value: el.id, text: el.name} })
    },
    cardColor () {
      return this.$store.getters.activityColor(this.activity.id)
    },
    bsColor () {
      return this.getBootstrapColor(this.activity.type)
    }
  },
  created () {
    this.fetchActivity()
  },
  methods: {
    onSave () {
      this.$store.commit('SAVE_ACTIVITY', this.activity)
      this.showTool = true
      setTimeout(() => { this.showTool = false }, 700)
    },
    cancelForm () {
      this.activity = this.$store.getters.getClonedActivity(this.id)
      this.$router.push('/activities')
    },
    fetchActivity () {
      this.error = this.activity = null
      this.loading = true
      const record = this.$store.getters.getClonedActivity(this.id)
      this.loading = false
      if (record) {
        this.activity = record
      } else {
        this.error = 'activity not found'
      }
    }
  }
}
</script>
