<template>
  <div>
    <div ref="olid" class="radioChart"></div>
  </div>
</template>

<style scoped>
  .radioChart{
    width:100%;
    height:150px;
  }
</style>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: ['xaxis', 'types'],
  data () {
    return {
      Datas: {
        a: [10, 8, 14, 16, 35, 1],
        b: [12, 6, 17, 33, 45, 1]
      },
      xData: ['Pm2.5', 'Pm10', 'So₂', 'No₂', 'O₃', 'Co'],
      colors: []
    }
  },
  created () {
    if (this.types) {
      this.colors = ['#dd5d31', '#3581f1']
    } else {
      this.colors = ['#4ad2ff', '#ff69b4']
    }
  },
  mounted () {
    this.drawLine()
    // setInterval(() => {
    // this.move()
    // this.drawLine()
    // }, 2100)
  },
  methods: {
    move () {
      let data = this.Datas
      data.a.push(data.a[0])
      data.a.shift()
      data.b.push(data.b[0])
      data.b.shift()
      let data2 = this.xData
      data2.push(data2[0])
      data2.shift()
    },
    drawLine () {
      let myChart = echarts.init(this.$refs.olid)
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          show: true,
          top: '25%',
          bottom: '14%',
          borderWidth: '0'
        },
        legend: {
          data: this.xaxis,
          padding: 0,
          textStyle: {
            color: '#fff'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: this.xData,
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
            name: this.xaxis[0],
            type: 'bar',
            data: this.Datas.a,
            itemStyle: {
              normal: {
                color: this.colors[0]
              }
            }
          },
          {
            name: this.xaxis[1],
            type: 'bar',
            data: this.Datas.b,
            itemStyle: {
              normal: {
                color: this.colors[1]
              }
            }
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
