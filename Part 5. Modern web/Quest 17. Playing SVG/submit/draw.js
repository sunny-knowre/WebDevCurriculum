let size = 100;
let counter = 0;
var bus = new Vue();

Vue.component('shape-box', {
  template: '#shape-box-template',
  props: ["type","id","moving"],
  data() {
    return {
      size,
      x: 0,
      y: 0
    };
  },
  created(){
    bus.$on("fireMove", movement => this.handleMove(movement) );
  },
  computed: {
    styleObject(){
      return {
        position: "absolute",
        top:  (10+size)*counter++ + 'px'
      };
    }
  },
  methods: {
    handleMove(movement){
      if(movement.id === this.id){
        console.log(movement.keyCode);
      }
    }
  }
});

Vue.component('square', {
  props: ["id"],
  template: `<rect class="svg-shape" x="0" y="0" v-on:click="select" :width="sideLength" :height="sideLength" />`,
  computed: {
    sideLength(){
      return size;
    }
  },
  methods: {
    select(){
      bus.$emit("fireSelect", this.id);
    }
  }
});

Vue.component('triangle', {
  props: ["id"],
  template: `<polygon class="svg-shape" v-on:click="select" :points="computedPoints" ></polygon>`,
  computed: {
    computedPoints() {
      return "0 " + (size + " ").repeat(3) + size/2 + " 0";
    }
  },
  methods: {
    select(){
      bus.$emit("fireSelect", this.id);
    }
  }
});

Vue.component('circ', {
  props: ["id"],
  template: `<circle class="svg-shape" v-on:click="select" :cx="midpoint" :cy="midpoint" :r="midpoint"/>`,
  computed: {
    midpoint(){
      return size/2;
    }
  },
  methods: {
    select(){
      bus.$emit("fireSelect", this.id);
    }
  }

});

new Vue({
  el: "#app",
  data: {
    moving: '',
    title: "Hello World!",
    shapes: [
      {
        id: 1,
        type: "square"
      },
      {
        id: 2,
        type: "triangle"
      },
      {
        id: 3,
        type: "circ"
      },
      {
        id: 4,
        type: "square"
      }
    ]
  },
  created() {
    document.addEventListener('keydown', this.keyHander);
    bus.$on('fireSelect', id => this.handleSelect(id) );
  },
  methods: {
    keyHander(e){
      if(this.moving){
        bus.$emit("fireMove", {id: this.moving, keyCode: e.key, });
      }
        
    },
    handleSelect(id){
      this.moving = id;
    }
  }
});
