<template> 
    <div v-bind:style="styleObject" v-bind:class="classObject" v-on:dblclick.prevent="fireOpenFolder" v-on:mousedown="firePickup"> {{ name }} </div>
</template>
<script>
export default {
  data() {
    return {
      margin: 10,
      diffX: 0,
      diffY: 0
    };
  },
  props: ["id", "name", "type", "moving", "currentCoord", "counter"],
  watch: {
    currentCoord: function(newVal, oldVal) {
      // watch it
      if (this.moving === this.id) {
        var offsetX = this.currentCoord.x - this.diffX;
        var offsetY = this.currentCoord.y - this.diffY;
        this.$el.style.position = "absolute";
        this.$el.style.left = offsetX + "px";
        this.$el.style.top = offsetY + "px";
      }
    }
  },
  methods: {
    firePickup(e) {
      this.diffX = e.pageX + this.margin - this.$el.offsetLeft;
      this.diffY = e.pageY + this.margin - this.$el.offsetTop;
      this.$el.style.zIndex = this.counter;
      this.$emit("pickup", this.id);
    },
    fireOpenFolder(e) {
      if (this.type === "folder") {
        this.$emit("openfolder", this.id);
      }
    }
  },
  computed: {
    classObject() {
      return this.type;
    },
    styleObject() {
      return {
        margin: this.margin + "px"
      };
    }
  }
};
</script>

<style>
.icon {
  flex: 0 0 auto;
  border: 1px solid;
  border-radius: 3px;
  background: grey;
  width: 50px;
  height: 50px;
  text-align: center;
}

.folder {
  flex: 0 0 auto;
  border: 1px solid;
  border-radius: 3px;
  background: skyblue;
  width: 50px;
  height: 50px;
  text-align: center;
}
</style>