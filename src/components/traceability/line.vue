<template>
  <div>
    <div ref="lineChart" class="lineChart"></div>
  </div>
</template>

<style scoped>
  .lineChart{
    width:100%;
    height:100%;
  }
</style>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/theme/macarons')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: ['datas', 'legend', 'xAxis', 'type'],
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(this.$refs.lineChart, 'macarons')
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          show: true,
          left: '4%',
          top: '20%',
          bottom: '14%',
          right: '4%',
          borderWidth: '0'
        },
        legend: {
          data: this.legend,
          padding: [10, 0, 0, 0],
          textStyle: {
            color: '#fff'
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
            boundaryGap: this.type === 'line'? false: true,
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
          }
        ],
        series: [
          {
            name: this.legend[0],
            type: this.type,
            stack: 'john',
            symbol: 'none',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: this.datas[0]
          },
          {
            name: this.legend[1],
            type: this.type,
            stack: 'john',
            symbol: 'none',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: this.datas[1]
          },
          {
            name: this.legend[2],
            type: this.type,
            symbol: 'none',
            stack: 'john',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: this.datas[2]
          },
          {
            name: this.legend[3],
            type: this.type,
            symbol: 'none',
            stack: 'john',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: this.datas[3]
          },
          {
            name: this.legend[4],
            type: this.type,
            symbol: 'none',
            stack: 'john',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: this.datas[4]
          },
          {
            name: this.legend[5],
            type: this.type,
            symbol: 'none',
            stack: 'john',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: this.datas[5]
          }
        ]
      })
    }
  },
  watch: {
    data () {
      this.drawLine()
    },
    xAxis () {
      this.drawLine()
    }
  }
}
</script>
