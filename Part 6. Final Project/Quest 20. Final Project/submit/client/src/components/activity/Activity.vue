<template>
  <b-card no-body :border-variant="typeColor" 
          :header-bg-variant="typeColor"
          header-text-variant="white">
    <b-row slot="header" 
           class="text-center">
      <b-col cols="8">{{ activity.name }}</b-col>
      <b-col cols="4" class="pr-1" align="right"><a @click="deleteActivity" id="deleteBtn">x</a></b-col>
    </b-row>
    <b-list-group flush>
      <b-list-group-item v-if="activity.description"> {{ activity.description }}</b-list-group-item>
      <b-list-group-item> Metric: {{ activity.metric }}</b-list-group-item>
      <b-list-group-item> 
        <router-link :to="{ name: 'edit', params: {id: activity.id}}" tag="button" class="btn btn-secondary">edit</router-link>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>
<script>
export default {
  props: ["activity"],
  methods: {
    deleteActivity() {
      if (confirm("delete for sure?") == true)
        this.$store.commit("DELETE_ACTIVITY", this.activity.id);
    }
  },
  computed: {
    typeColor(){
      let colors = {
            1: 'primary',
            2: 'warning',
            3: 'info',
            4: 'danger',
            5: 'success',
            6: 'dark'
      }
      return colors[this.activity.type];
    }

  }
};
</script>
<style scoped>
#deleteBtn {
  padding: 6px;
  cursor: pointer;
  color: darkgrey;
  border: none;
  background: rgba(250, 250, 250, 0.2);
  border-radius: 5px;
}
#deleteBtn:hover {
  color: grey;
  background: rgba(170, 135, 135, 0.2);
}
</style>
