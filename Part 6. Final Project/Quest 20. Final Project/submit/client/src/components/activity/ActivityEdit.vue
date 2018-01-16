<template>
  <b-container>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="activity">
      <b-row class="mb-4">
        <b-col class="pl-2 col-md-10 offset-md-2">
          <b-button-toolbar>
          <b-button-group class="mx-1">
            <b-btn to="/activities">&lsaquo;</b-btn>
          </b-button-group>
            <b-button-group size="sm" class="mx-1">
              <b-btn variant="outline-secondary">New Field</b-btn>
            </b-button-group>
            <b-button-group size="sm" class="mx-1">
              <b-btn id="saveButton" variant="outline-success" @click.prevent="onSave">Save</b-btn>
              <b-btn variant="outline-danger" @click.prevent="cancelForm">Cancel</b-btn>
              <b-tooltip disabled :show.sync="showTool" target="saveButton" placement="bottom">
                Saved!
              </b-tooltip>
            </b-button-group>
          </b-button-toolbar>
        </b-col>
      </b-row>
      <b-form>
        <b-form-group id="name" horizontal :label-cols="2" label-size="sm" label="Name" label-for="name">
          <b-form-input id="input1" type="text" v-model="activity.name" required placeholder="Enter name">
          </b-form-input>
        </b-form-group>
        <b-form-group v-for="(val, key, index) in activity.values" horizontal :label="key" :label-for="key" :label-cols="2" label-size="sm" :key="index">
          <b-form-input :id="key" type="text" v-model="activity.values[key]"></b-form-input>
        </b-form-group>
      </b-form>
    </div>
  </b-container>
</template>

<script>
  export default {
    props: ["id"],      //id: param from route
    data() {
      return {
        loading: false,
        activity: null,
        error: null,
        showTool: false
      };
    },
    created() {
      this.fetchActivity();
    },
    methods: {
      onSave(){
        this.$store.commit('SAVE_CURRENT_EDIT', this.activity);
        this.showTool = true;
        setTimeout(() => {this.showTool = false;}, 500);
        
      },
      cancelForm() {
        this.activity = this.$store.getters.getClonedActivity(this.id);
        this.$router.go(-1);
      },
      fetchActivity() {
        this.error = this.activity = null;
        this.loading = true;
        const record = this.$store.getters.getClonedActivity(this.id);
        this.loading = false;
        if (record) {
          this.activity = record;
        } else {
          this.error = "activity not found";
        }
      }
    }
  };
</script>
