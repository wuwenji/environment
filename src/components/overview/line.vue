<template>
  <div>
    <div id="lineChart"></div>
  </div>
</template>

<style scoped>
  #lineChart{
    width:100%;
    height:200px;
  }
</style>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/theme/macarons')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data () {
    return {
      foreData: [12, 14, 13, 19, 17, 22, 20, 24, 21, 20, 28, 21, 19, 17, 22, 24, 18, 12, 19, 24, 15, 14, 17, 14]
    }
  },
  props: ['Datas'],
  mounted () {
    this.drawLine()
  },
  methods: {
    forecast (data) {
      let array = []
      let lastData = parseInt(data[data.length - 1])
      for (let i = 0; i < data.length; i++) {
        if (i === data.length - 1) {
          array.push(lastData)
        } else {
          array.push('-')
        }
      }
      for (let i = data.length; i < 24; i++) {
        // array.push(this.foreData[i])
        array.push(lastData + parseInt(Math.random() * 10))
      }
      return array
    },
    drawLine () {
      let myChart = echarts.init(document.getElementById('lineChart'), 'macarons')
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let relVal = params[0].name + '<br/>'
            let fla = parseInt(params[0].axisValue.replace('点', ''))
            if (fla >= this.Datas.pm25.length) {
              relVal += params[0].seriesName + ' : ' + params[0].value + '<br/>'
              relVal += params[1].seriesName + ' : ' + params[1].value + '<br/>'
              relVal += params[2].seriesName + ' : ' + params[2].value + '<br/>'
              relVal += params[3].seriesName + ' : ' + params[3].value + '<br/>'
              relVal += params[4].seriesName + ' : ' + params[4].value + '<br/>'
              relVal += params[5].seriesName + ' : ' + params[5].value
            } else {
              relVal += params[0].seriesName + ' : ' + params[0].value + '<br/>'
              relVal += params[2].seriesName + ' : ' + params[2].value + '<br/>'
              relVal += params[4].seriesName + ' : ' + params[4].value + '<br/>'
              relVal += params[6].seriesName + ' : ' + params[6].value + '<br/>'
              relVal += params[8].seriesName + ' : ' + params[8].value + '<br/>'
              relVal += params[10].seriesName + ' : ' + params[10].value
            }
            return relVal
          }
        },
        grid: {
          show: true,
          left: '4%',
          top: '20%',
          bottom: '14%',
          right: '2%',
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
          show: true,
          feature: {
            magicType: {
              show: true,
              type: ['line', 'bar']
            }
          },
          iconStyle: {
            color: '#38d449',
            borderColor: '#38d449'
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
            name: 'PM2.5',
            type: 'line',
            symbol: 'none',
            data: this.Datas.pm25
          },
          {
            name: 'PM2.5',
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted'
                }
              }
            },
            data: this.forecast(this.Datas.pm25)
          },
          {
            name: 'PM10',
            type: 'line',
            symbol: 'none',
            data: this.Datas.pm10
          },
          {
            name: 'PM10',
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted'
                }
              }
            },
            data: this.forecast(this.Datas.pm10)
          },
          {
            name: 'O₃',
            type: 'line',
            symbol: 'none',
            data: this.Datas.o3
          },
          {
            name: 'O₃',
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted'
                }
              }
            },
            data: this.forecast(this.Datas.o3)
          },
          {
            name: 'NO₂',
            type: 'line',
            symbol: 'none',
            data: this.Datas.no2
          },
          {
            name: 'NO₂',
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted'
                }
              }
            },
            data: this.forecast(this.Datas.no2)
          },
          {
            name: 'SO₂',
            type: 'line',
            symbol: 'none',
            data: this.Datas.so2
          },
          {
            name: 'SO₂',
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted'
                }
              }
            },
            data: this.forecast(this.Datas.so2)
          },
          {
            name: 'CO',
            type: 'line',
            symbol: 'none',
            data: this.Datas.co
          },
          {
            name: 'CO',
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted'
                }
              }
            },
            data: this.forecast(this.Datas.co)
          }
        ]
      })
    }
  },
  watch: {
    Datas () {
      this.drawLine()
    }
  }
}
</script>
