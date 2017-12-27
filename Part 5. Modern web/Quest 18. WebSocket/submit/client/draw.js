const size = 70;
const stroke = 5;
let counter = 0;
let bus = new Vue();
var socket = io();
Vue.component("shape-generator", {
  template: "#shape-generator-template",
  props: ["type", "name"],
  data() {
    return {
      uid: 0
    };
  },
  methods: {
    generate(){
      let id = this.type + "-" + this.uid++;
      let type = this.type;

      bus.$emit('fireMake', id, type);
    }
  }
});

Vue.component("shape-box", {
  template: "#shape-box-template",
  props: ["type", "id", "moving", "boundary", "coords"],
  computed: {
    styleObject() {
      return {
        position: "absolute",
        height: size + stroke * 2 + "px",
        top: this.coords.y + "px",
        left: this.coords.x + "px"
      };
    },
    boxSize() {
      return size + stroke * 2;
    },
    viewBox() {
      return (-stroke + " ").repeat(2) + (size + stroke * 2 + " ").repeat(2);
    },
    activeStatus() {
      return this.id === this.moving;
    }
  }
});

Vue.component("square", {
  props: ["id", "activeStatus"],
  template: `<rect class="svg-shape" v-bind:style="activeBorder" x="0" y="0" v-on:click="select" :width="sideLength" :height="sideLength" />`,
  computed: {
    sideLength() {
      return size;
    },
    activeBorder() {
      if (this.activeStatus)
        return "stroke: #52bbf8; stroke-width:" + stroke + "px;";
      else return "stroke: none";
    }
  },
  methods: {
    select() {
      bus.$emit("fireSelect", this.id);
    }
  }
});

Vue.component("triangle", {
  props: ["id", "activeStatus"],
  template: `<polygon class="svg-shape" v-bind:style="activeBorder" v-on:click="select" :points="computedPoints" ></polygon>`,
  computed: {
    computedPoints() {
      return "0 " + (size + " ").repeat(3) + size / 2 + " 0";
    },
    activeBorder() {
      if (this.activeStatus)
        return "stroke: #52bbf8; stroke-width:" + stroke + "px;";
      else return "stroke: none";
    }
  },
  methods: {
    select() {
      bus.$emit("fireSelect", this.id);
    }
  }
});

Vue.component("circ", {
  props: ["id", "activeStatus"],
  template: `<circle class="svg-shape" v-bind:style="activeBorder" v-on:click="select" :cx="midpoint" :cy="midpoint" :r="midpoint"/>`,
  computed: {
    midpoint() {
      return size / 2;
    },
    activeBorder() {
      if (this.activeStatus)
        return "stroke: #52bbf8; stroke-width:" + stroke + "px;";
      else return "stroke: none";
    }
  },
  methods: {
    select() {
      bus.$emit("fireSelect", this.id);
    }
  }
});

var myapp = new Vue({
  el: "#app",
  data: {
    moving: "",
    title: "Hello World!",
    shapes: [],
    types: [ {id: "square", name: "Square" }, 
             {id: "triangle", name: "Triangle" },
             {id: "circ", name: "Circle" } ],
    boundary: {},
    sandbox: {}
  },
  mounted(){
    document.addEventListener("keydown", this.keyHander);
    socket.on ('test', data => {
      console.log(data);
    });
    bus.$on("fireSelect", id => this.handleSelect(id));
    bus.$on("fireMake", (id, type) => this.handleMake(id, type));
    let sandbox = this.$el.childNodes[0];
    let bounds = sandbox.getBoundingClientRect();
    this.boundary = {
      x: { min: 5, max: bounds.width-5  },
      y: { min: 5, max: bounds.height-5 }
    };
    socket.emit('test2', {hello: 'from client'});
  },
  methods: {
    keyHander(e) {
      if (this.moving && ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Delete"].includes(e.key) ) {
        this.handleMove( this.moving, e.key);
      }
    },
    handleSelect(id) {
      this.moving = id;
    },
    handleDelete(id) {
      this.moving = '';
      this.shapes = this.shapes.filter( shape => {return shape.id !== id;} );
      
    },
    handleMake(id, type) {    
      const item = {
        id: id,
        type: type,
        coords: {
          x: 10,
          y: ((size + stroke*2) * counter++) + 10
        }
      };
      this.shapes.push(item);
    },
    handleMove(id, keyCode) {
      const index = this.shapes.findIndex(shape => shape.id === id);
      const shape = this.shapes[index];
      switch (keyCode) {
        case "ArrowRight":
          if( shape.coords.x + 10 < this.boundary.x.max - size - stroke*2)
            this.shapes[index].coords.x = shape.coords.x + 10;
          break;
        case "ArrowLeft":
          if( shape.coords.x - 10 > this.boundary.x.min)
            this.shapes[index].coords.x = shape.coords.x - 10;
          break;
        case "ArrowUp":
          if( shape.coords.y - 10 > this.boundary.y.min)  
            this.shapes[index].coords.y = shape.coords.y - 10;
          break;
        case "ArrowDown":
          if( (shape.coords.y + 10) < (this.boundary.y.max - size - stroke*2) )
            this.shapes[index].coords.y = shape.coords.y + 10;
          break;
        case "Delete":
          this.handleDelete(id);
          break;
      }
    }
  }
});
