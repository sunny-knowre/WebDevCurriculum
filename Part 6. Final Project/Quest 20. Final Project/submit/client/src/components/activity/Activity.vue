<template>
    <b-card>
      <b-row slot="header" class="text-center">
        <b-col cols="8">{{ activity.name }}</b-col>
        <b-col cols="4" align="right"><b-button @click="deleteActivity" id="deleteBtn" size="sm" variant="outline-danger">x</b-button></b-col>
      </b-row>
        <b-list-group flush>
            <b-list-group-item v-for="(val, key, index) in activity.values">{{ key + ": " + val }}</b-list-group-item>
            <b-list-group-item> 
              <button class="btn btn-secondary" @click="launchEdit">edit</button>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>
<script>
export default {
  props: ["activity"],
  methods: {
    launchEdit() {
      this.$store.dispatch("setCurrentEdit", { activity: this.activity });
      this.$store.dispatch("toggleModal");
    },
    deleteActivity(){
      if (confirm("delete for sure?") == true) 
        this.$store.dispatch("deleteActivity", this.activity.id);
    }
  }
};
</script>
<style>
.card-body {
  padding: 0;
}

#deleteBtn {
  padding: 0.3rem 0.3rem;
  font-size: 0.7rem;
  line-height: 0.8;
  border-radius: 0.2rem;
}

</style>
