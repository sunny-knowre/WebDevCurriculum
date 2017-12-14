Vue.component("icon-box", {
  template: '<div v-bind:class="classObject" v-on:mousedown="firePickup"> {{ name }} </div>',
  props: ["id", "name", "type", "moving"],
  watch: { 
    moving: function(newVal, oldVal) { // watch it
      if(newVal === this.id)
        console.log('moving ', this.id);
    }
  },
  methods: {
    firePickup() {
      this.$emit("pickup", this.id);
    },
    handleMove() {
        console.log('moving: ' + this.id);
    }
  },
  computed: {
    classObject: function () {
      return this.type;
    }
  }
});
var desktop = new Vue({
  el: "#desktop",
  data: {
    currentItem: null,
    counter: 0,
    icons: [
      {
        id: "icon-1",
        name: "icon-1",
        type: "icon"
      },
      {
        id: "icon-2",
        name: "icon-2",
        type: "icon"
      },
      {
        id: "folder-1",
        name: "folder-1",
        type: "folder"
      }
    ]
  },
  methods: {
    handlePickup: function(id) {
      this.counter++;
      this.currentItem = id;
    },
    moveCurrentItem: function(){
      if(this.currentItem){
        this.$emit('moveItem', this.currentItem);
      }

    },
    dropCurrentItem: function(){
      this.currentItem = null;
    }
  }
});
