<template>
  <b-card no-body>
    <b-row slot="header" 
           class="text-center">
      <b-col cols="8">{{ activity.name }}</b-col>
      <b-col cols="4" class="pr-1" align="right"><a @click="deleteActivity" id="deleteBtn">x</a></b-col>
    </b-row>
    <b-list-group flush>
      <b-list-group-item v-for="(val, key, index) in activity.values"
                         :key="key">{{ key + ": " + val }}</b-list-group-item>
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
        this.$store.dispatch("deleteActivity", this.activity.id);
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
