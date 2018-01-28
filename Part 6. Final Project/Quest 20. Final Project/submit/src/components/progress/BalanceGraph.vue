<template>
  <div>
    <svg width="400" height="400">
      <polygon :points="points"></polygon>
      <circle cx="200" cy="200" r="180"></circle>
      <axis-label v-for="(stat, index) in stats"
                  :stat="stat"
                  :index="index"
                  :key="index"
                  :total="stats.length">
      </axis-label>
    </svg>
  </div>
</template>

<script>
import AxisLabel from './AxisLabel.vue'
export default {
  components: {
    axisLabel: AxisLabel
  },
  props: ['stats'],
  computed: {
    points: function () {
      var total = this.stats.length
      return this.stats.map(function (stat, i) {
        var point = valueToPoint(stat.value, i, total)
        return point.x + ',' + point.y
      }).join(' ')
    }
  }
}

let valueToPoint = function (value, index, total) {
  var x = 0
  var y = -value * 0.8
  var angle = Math.PI * 2 / total * index
  var cos = Math.cos(angle)
  var sin = Math.sin(angle)
  var tx = x * cos - y * sin + 200
  var ty = x * sin + y * cos + 200
  return {
    x: tx,
    y: ty
  }
}
</script>
<style>
polygon {
    fill: #42b983;
    opacity: .75;
}

circle {
    fill: transparent;
    stroke: #999;
}

text {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 12px;
    font-weight: 600;
    fill: #666;
}

label {
    display: inline-block;
    margin-left: 12px;
    width: 20px;
}

</style>
