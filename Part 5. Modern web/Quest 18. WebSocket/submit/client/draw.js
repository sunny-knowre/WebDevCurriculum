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
      let item = {
        id: this.type + "-" + this.uid++,
        type: this.type
      };
      bus.$emit('fireMake', item);
    }
  }
});

Vue.component("shape-box", {
  template: "#shape-box-template",
  props: ["type", "id", "moving", "boundary"],
  data() {
    return {
      size,
      x: 0,
      y: 0
    };
  },
  created() {
    bus.$on("fireMove", movement => this.handleMove(movement));
  },
  computed: {
    styleObject() {
      return {
        position: "fixed",
        height: size + stroke * 2 + "px",
        top: ((size + stroke*2) * counter++) + 10 + "px",
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
  },
  methods: {
    handleMove(movement) {
      if (movement.id === this.id && ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Delete"].includes(movement.keyCode)) {
        let rect = this.$el.getBoundingClientRect();
        switch (movement.keyCode) {
          case "ArrowRight":
            if( rect.left + 15 < this.boundary.x.max - size - stroke*2)
              this.$el.style.left = rect.left + 10 + "px";
            break;
          case "ArrowLeft":
            if( rect.left - 15 > this.boundary.x.min)
              this.$el.style.left = rect.left - 20  + "px";
            break;
          case "ArrowUp":
            if( rect.top - 15 > this.boundary.y.min)  
              this.$el.style.top = rect.top - 20 + "px";
            break;
          case "ArrowDown":
            if( rect.top + 15 < this.boundary.y.max - size - stroke*2)
              this.$el.style.top = rect.top + 10 + "px";
            break;
          case "Delete":
            bus.$emit('fireDelete', this.id);
            break;
        }
      }
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
    bus.$on("fireDelete", id => this.handleDelete(id));
    bus.$on("fireMake", item => this.handleMake(item));
    let bounds = this.$el.childNodes[0].getBoundingClientRect();
    this.boundary = {
      x: { min: bounds.x, max: bounds.x + bounds.width  },
      y: { min: bounds.y, max: bounds.y + bounds.height }
    };
    socket.emit('test2', {hello: 'from client'});
  },
  methods: {
    keyHander(e) {
      if (this.moving) {
        bus.$emit("fireMove", { id: this.moving, keyCode: e.key });
      }
    },
    handleSelect(id) {
      this.moving = id;
    },
    handleDelete(id) {
      this.moving = '';
      this.shapes = this.shapes.filter( shape => {return shape.id !== id;} );
      
    },
    handleMake(item) {
      this.shapes.push(item);
    }
  }
});
