<template>
  <div id="app">
    <Desktop/>
    </Desktop
  </div>
</template>

<script>
import Desktop from './components/Desktop'

export default {
  name: 'app',
  components: {
    Desktop
  },

  data() {
    return {
      icons: [{
        name: 'icon 1',
        type: 'regular'
      },{
        name: 'icon 2',
        type: 'regular'
      },{
        name: 'folder 1',
        type: 'folder'
      }]
    }
  }
}
</script>

<style>
#app {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    padding: 20px;
    border: 1px solid;
    width: 1000px;
    margin: 0 auto;
    height: 800px;
    position: relative;
}
</style>
