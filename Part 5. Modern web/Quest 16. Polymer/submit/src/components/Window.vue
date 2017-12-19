<template> 
<div v-bind:style="styleObject" class="window">
    <div class="title-bar" v-on:dblclick="fireClose" v-on:mousedown="firePickup"> {{ computedName }}</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      display: "none",
      diffX: 0,
      diffY: 0
    };
  },
  props: ["id", "name", "moving", "currentCoord", "counter", "openMe"],
  watch: {
    currentCoord: function(newVal, oldVal) {
      if (this.moving === this.computedId) {
        var offsetX = this.currentCoord.x - this.diffX;
        var offsetY = this.currentCoord.y - this.diffY;
        this.$el.style.position = "absolute";
        this.$el.style.left = offsetX + "px";
        this.$el.style.top = offsetY + "px";
      }
    },
    openMe: function(newVal, oldVal) {
      if (this.openMe === this.id) {
        this.display = "block";
      }
    }
  },
  methods: {
    firePickup(e) {
      this.diffX = e.pageX - this.$el.offsetLeft;
      this.diffY = e.pageY - this.$el.offsetTop;
      this.$el.style.zIndex = this.counter;
      this.$emit("pickup", this.computedId);
    },
    fireClose() {
      this.display = "none";
      this.$emit("closewin");
    }
  },
  computed: {
    computedName: function() {
      return "window-for-" + this.name;
    },
    computedId: function() {
      return "window-" + this.id;
    },
    styleObject: function() {
      return {
        display: this.display
      };
    }
  }
};
</script>

<style scoped>
.window {
  border: 1px solid;
  border-radius: 3px;
  width: 500px;
  height: 300px;
  position: absolute;
  top: 200px;
  left: 240px;
  background: white;
}

.title-bar {
  border-bottom: 1px solid;
  background: lightgrey;
  height: 30px;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>