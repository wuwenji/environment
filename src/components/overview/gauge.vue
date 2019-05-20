<template>
  <div>
    <div id="myChart"></div>
  </div>
</template>

<style scoped>
  #myChart{
    width:100%;
    height:282px;
  }
</style>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/gauge')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: ['city', 'value'],
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {
          formatter: this.city + ': ' + this.value
        },
        toolbox: {
          show: true
        },
        series: [
          {
            name: '空气质量指数',
            type: 'gauge',
            min: 0,
            max: 500,
            startAngle: 140,
            endAngle: -140,
            precision: 0,
            splitNumber: 1,
            axisLine: {
              show: true,
              lineStyle: {
                color: [[0.07, '#00e400'], [0.15, '#ecec00'], [0.23, '#ff7e00'], [0.3, '#ff0000'], [0.5, '#99004c'], [1, '#7e0023']],
                width: 30
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              formatter: function (v) {
                switch (v + '') {
                  case '0': return '优'
                  case '75': return '良'
                  case '115': return '轻'
                  case '150': return '中'
                  case '250': return '重'
                  case '500': return '严重'
                  default: return ''
                }
              },
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: true,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 2,
                type: 'solid'
              }
            },
            pointer: {
              length: '80%',
              width: 8,
              color: 'auto'
            },
            title: {
              show: true,
              offsetCenter: ['-65%', -10],
              textStyle: {
                color: '#fff',
                fontSize: 15
              }
            },
            detail: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',
              borderWidth: 0,
              borderColor: '#ccc',
              width: 50,
              height: 7,
              offsetCenter: ['-60%', 10],
              formatter: this.$store.state.rank,
              textStyle: {
                color: 'auto',
                fontSize: 19,
                fontWeight: 'bold'
              }
            },
            data: [{value: this.value, name: this.city}]
          }
        ]
      })
    }
  },
  watch: {
    value () {
      this.$store.commit('getRank', this.value)
      this.drawLine()
    },
    city () {
      this.drawLine()
    }
  }
}
</script>
