<template>
  <text :x="point.x" :y="point.y">{{ stat.label }}</text>
</template>
<script>
export default {
  props: {
    stat: Object,
    index: Number,
    total: Number
  },
  computed: {
    point: function () {
      return valueToPoint(
        +this.stat.value,
        this.index,
        this.total
      )
    }
  }
}

let valueToPoint = function (value, index, total) {
  var x = 0
  var y = -value * 0.8
  var angle = Math.PI * 2 / total * index
  var cos = Math.cos(angle)
  var sin = Math.sin(angle)
  var tx = x * cos - y * sin + 160
  var ty = x * sin + y * cos + 200
  return {
    x: tx,
    y: ty
  }
}
</script>
