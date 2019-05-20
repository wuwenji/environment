<template>
  <div style="height:100%">
    <div id="myChart"></div>
  </div>
</template>

<style scoped>
  #myChart{
    width:100%;
    height:100%;
    margin-tOP:5px;
  }
</style>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/gauge')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: ['value'],
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {
          formatter: ' 风向: {c}°<br/> 风力: 2级<br/> 风速: 5m/s'
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: false},
            restore: {show: false},
            saveAsImage: {show: false}
          }
        },
        series: [
          {
            name: '风向',
            type: 'gauge',
            min: 0,
            max: 360,
            startAngle: 1,
            endAngle: 360,
            splitNumber: 0,
            axisLine: {
              lineStyle: {
                color: [[0.2, '#47b9e1'], [0.8, '#47b9e1'], [1, '#47b9e1']],
                width: 4
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              formatter: '{value}°',
              textStyle: {
                color: '#fff',
                fontSize: 14
              },
              offsetCenter: [0, '60%']
            },
            data: [
              {value: this.value, name: ''}
            ]
          }
        ]
      })
    }
  },
  watch: {
    value () {
      this.drawLine()
    }
  }
}
</script>
