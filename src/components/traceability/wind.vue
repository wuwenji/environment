<template>
  <div style="height:100%;">
    <div id="windChart"></div>
  </div>
</template>

<style scoped>
  #windChart{
    width:100%;
    height:100%;
  }
</style>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/theme/macarons')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: ['data', 'fome', 'xAxis'],
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('windChart'), 'macarons')
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          show: true,
          left: '4%',
          top: '25%',
          bottom: '14%',
          right: '8%',
          borderWidth: '0'
        },
        legend: {
          data: ['风速(m/s)', '风力(级)', '风向(°)', '温度(°)', '湿度(%)', '气压(kPa)'],
          padding: [0, 5, 0, 5],
          textStyle: {
            color: '#fff',
            fontSize: 10
          }
        },
        toolbox: {
          show: false,
          feature: {
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            splitLine: {show: false},
            data: this.xAxis,
            axisLabel: {
              textStyle: {
                color: '#fff',
                width: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: '#4488bb',
                width: 2
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {show: false},
            axisLabel: {
              textStyle: {
                color: '#fff',
                width: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: '#4488bb',
                width: 2
              }
            }
          },
          {
            type: 'value',
            splitLine: {show: false},
            axisLabel: {
              textStyle: {
                color: '#fff',
                width: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: '#4488bb',
                width: 2
              }
            }
          }
        ],
        series: [
          {
            name: '风速(m/s)',
            type: 'bar',
            symbol: 'none',
            data: this.data[0]
          },
          {
            name: '风力(级)',
            type: 'bar',
            symbol: 'none',
            data: this.data[1]
          },
          {
            name: '风向(°)',
            type: 'bar',
            yAxisIndex: 1,
            symbol: 'none',
            data: this.data[2]
          },
          {
            name: '温度(°)',
            type: 'bar',
            symbol: 'none',
            yAxisIndex: 1,
            data: this.data[3]
          },
          {
            name: '湿度(%)',
            type: 'bar',
            symbol: 'none',
            yAxisIndex: 1,
            data: this.data[4]
          },
          {
            name: '气压(kPa)',
            type: 'bar',
            symbol: 'none',
            data: this.data[5]
          }
        ]
      })
    }
  },
  watch: {
    Datas () {
      this.drawLine()
    },
    xAxis () {
      this.drawLine()
    }
  }
}
</script>
