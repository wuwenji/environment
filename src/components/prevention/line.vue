<template>
  <div>
    <div id="lineChart"></div>
  </div>
</template>

<style scoped>
  #lineChart{
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
  props: ['datas', 'fome'],
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('lineChart'), 'macarons')
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          show: true,
          left: '4%',
          top: '20%',
          bottom: '10%',
          right: '6%',
          borderWidth: '0'
        },
        legend: {
          data: ['PM2.5', 'PM10', 'O₃', 'NO₂', 'SO₂', 'CO'],
          padding: 0,
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
            boundaryGap: false,
            splitLine: {show: false},
            data: ['0点', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点'],
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
            name: this.fome,
            type: 'line',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            symbol: 'none',
            data: this.datas,
            lineStyle: {
              color: '#51ebe3'
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#5bc3e0' }, { offset: 1, color: '#51ebe3' }])
              }
            },
            markLine: {
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#ff0000 '
                  }
                }
              },
              data: [
                [
                  {
                    name: '预警线',
                    yAxis: 25,
                    xAxis: 0
                  },
                  {
                    yAxis: 25,
                    xAxis: 23
                  }
                ]
              ]
            }
          }
        ]
      })
    }
  },
  watch: {
    datas () {
      this.drawLine()
    }
  }
}
</script>
