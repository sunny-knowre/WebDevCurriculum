<template>
    <b-modal size="md" title="Edit Activity" v-model="showModal" ok-title="save" @ok="handleOk" @cancel="cancelModal">
      <b-form  @submit.stop.prevent="handleSubmit">
        <b-form-group id="name" 
                      horizontal
                      :label-cols="2"
                      label-size="sm"
                      label="Name" 
                      label-for="name">
            <b-form-input id="input1" type="text" v-model="myEdit.name" required
                            placeholder="Enter name">
            </b-form-input>
        </b-form-group> 
          <b-form-group v-for="(val, key, index) in myEdit.values" 
            horizontal
            :label="key" 
            :label-for="key"
            :label-cols="2"
            label-size="sm">
            <b-form-input :id="key" type="text" v-model="myEdit.values[key]"></b-form-input>
          </b-form-group>
      </b-form>
        
    </b-modal>
</template>
<script>
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  props: ["showModal"],
  computed: {
    myEdit() {
      return _.cloneDeep(this.$store.getters.currentEdit);
    }
  },
  methods: {
    addRow(){

    },
    handleSubmit() {
      this.$store.dispatch("saveCurrentEdit", { activity: this.myEdit });
    },
    cancelModal() {
      this.$store.dispatch("setCurrentEdit", { activity: {} });
      this.$store.dispatch("toggleModal");
    },
    handleOk(evt) {
      this.$store.dispatch("toggleModal");
      evt.preventDefault();
      this.handleSubmit();
    }
  }
};
</script>
