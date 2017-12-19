<template>
 <div id="app" class="desktop" v-on:mousemove="moveCurrentItem" v-on:mouseup="dropCurrentItem">
    <icon-box v-for="icon in icons" 
      :key="icon.id" 
      :moving="currentItem"
      :id="icon.id" 
      :name="icon.name" 
      :type="icon.type"
      :currentCoord="currentCoord"
      :counter="counter"
      v-on:pickup="handlePickup"
      v-on:openfolder="handleOpenFolder"> 
    </icon-box>
    <window-box v-for="folder in icons" v-bind:key="'win'+folder.id"
      v-if="folder.type === 'folder'"
      :id="folder.id"
      :name="folder.name"
      :moving="currentItem"
      :currentCoord="currentCoord"
      :counter="counter"
      :openMe="openFolder"
      v-on:pickup="handlePickup"
      v-on:closewin="handleCloseWin">
    </window-box>
</div>
</template>

<script>
import IconBox from "./Icon.vue";
import WindowBox from "./Window.vue";
export default {
  components: {
    "icon-box": IconBox,
    "window-box": WindowBox
  },
  data() {
    return {
      openFolder: '',
      currentCoord: {},
      currentItem: null,
      counter: 0,
      icons: [
        {
          id: "icon-1",
          name: "icon 1",
          type: "icon"
        },
        {
          id: "icon-2",
          name: "icon 2",
          type: "icon"
        },
        {
          id: "folder-1",
          name: "folder 1",
          type: "folder"
        }
      ]
    };
  },
  methods: {
    handlePickup: function(id) {
      this.counter++;
      this.currentItem = id;
    },
    handleOpenFolder: function(id){
      this.openFolder = id;
    },
    handleCloseWin: function(){
      this.openFolder = '';
    },
    dropCurrentItem: function() {
      this.currentItem = null;
    },
    moveCurrentItem: function(e) {
      this.currentCoord = { x: e.pageX, y: e.pageY };
    }
  }
};
</script>
<style>
.desktop {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 10px;
  border: 1px solid;
  width: 1000px;
  margin: 0 auto;
  height: 800px;
  position: relative;
}
</style>

