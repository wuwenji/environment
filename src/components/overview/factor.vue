<template>
  <div>
    <div id="factorChart"></div>
  </div>
</template>

<style scoped>
  #factorChart{
    width:100%;
    height:200px;
  }
</style>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/radar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: ['factors'],
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('factorChart'))
      myChart.setOption({
        tooltip: {},
        calculable: true,
        polar: [
          {
            indicator: [
              {text: '风速(m/s)', max: 30},
              {text: '风力(级)', max: 20},
              {text: '风向(°)', max: 360},
              {text: '温度(℃)', max: 60},
              {text: '湿度(%)', max: 100},
              {text: '气压(kPa)', max: 10}
            ],
            radius: 70
          }
        ],
        series: [
          {
            name: '环境',
            type: 'radar',
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default'
                }
              }
            },
            data: [
              {
                value: this.factors
              }
            ]
          }
        ]
      })
    }
  },
  watch: {
    factors () {
      this.drawLine()
    }
  }
}
</script>
