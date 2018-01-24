<template>
  <b-card no-body
          :border-variant="bsColor"
          :header-bg-variant="bsColor"
          header-text-variant="white">
    <b-row slot="header"
           class="text-center">
      <b-col cols="8">{{ activity.name }}</b-col>
      <b-col cols="4"
             class="pr-1"
             align="right">
        <a @click="deleteActivity" id="deleteBtn">x</a>
      </b-col>
    </b-row>
    <b-list-group flush>
      <b-list-group-item v-if="activity.description"> {{ activity.description }}</b-list-group-item>
      <b-list-group-item> Metric: {{ activity.metric }}</b-list-group-item>
      <b-list-group-item>
        <router-link tag="button" class="btn btn-secondary"
                     :to="{ name: 'edit', params: {id: activity.id }}">edit</router-link> </b-list-group-item>
    </b-list-group>
  </b-card>
</template>
<script>
import { bootstrapColor } from '../../mixins'
export default {
  mixins: [bootstrapColor],
  props: {
    activity: Object
  },
  computed: {
    bsColor () {
      return this.getBootstrapColor(this.activity.type)
    }
  },
  methods: {
    deleteActivity () {
      if (confirm('delete for sure?') === true) {
        this.$store.commit('DELETE_ACTIVITY', this.activity.id)
      }
    }
  }
}
</script>
<style scoped>
#deleteBtn {
  padding: 2px 5px 2px 5px;
  cursor: pointer;
  color: darkgrey;
  border: none;
  background: rgba(170, 135, 135, 0.2);
  border-radius: 5px;
}
#deleteBtn:hover {
  color: darkgrey;
  background: rgba(250, 250, 250, 0.2);
}
</style>
