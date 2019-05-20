<template>
  <div style="height:100%">
    <div style="width:100%;height:calc(100% - 35px);" :id="fomes"></div>
    <p>{{fomes}}</p>
  </div>
</template>

<style scoped>
  p{
    line-height: 35px;
    text-align:center;
    position:relative;
    top: -10px;
    font-family: Arial;
  }
</style>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: ['value', 'fomes'],
  data () {
    return {
      labelBottom: {
        normal: {
          color: '#ccc'
        }
      },
      labelTop: {
      }
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    getColor (a, b) {
      var color_ = ''
      if (b === 'PM10') {
        if (a < 35) {
          color_ = '#00e400'
        } else if (a < 75) {
          color_ = '#ecec00'
        } else if (a < 115) {
          color_ = '#ff7e00'
        } else if (a < 150) {
          color_ = '#ff0000'
        } else if (a < 250) {
          color_ = '#99004c'
        } else if (a < 500) {
          color_ = '#7e0023'
        }
      } else if (b === 'PM2.5') {
        if (a < 35) {
          color_ = '#00e400'
        } else if (a < 75) {
          color_ = '#ecec00'
        } else if (a < 115) {
          color_ = '#ff7e00'
        } else if (a < 150) {
          color_ = '#ff0000'
        } else if (a < 250) {
          color_ = '#99004c'
        } else if (a < 500) {
          color_ = '#7e0023'
        }
      } else if (b === 'SO₂') {
        if (a < 50) {
          color_ = '#00e400'
        } else if (a < 150) {
          color_ = '#ecec00'
        } else if (a < 475) {
          color_ = '#ff7e00'
        } else if (a < 800) {
          color_ = '#ff0000'
        } else if (a < 1500) {
          color_ = '#99004c'
        } else if (a < 2620) {
          color_ = '#7e0023'
        }
      } else if (b === 'CO₂') {
        if (a < 50) {
          color_ = '#00e400'
        } else if (a < 150) {
          color_ = '#ecec00'
        } else if (a < 475) {
          color_ = '#ff7e00'
        } else if (a < 800) {
          color_ = '#ff0000'
        } else if (a < 1500) {
          color_ = '#99004c'
        } else if (a < 2620) {
          color_ = '#7e0023'
        }
      } else if (b === 'NO₂') {
        if (a < 40) {
          color_ = '#00e400'
        } else if (a < 80) {
          color_ = '#ecec00'
        } else if (a < 180) {
          color_ = '#ff7e00'
        } else if (a < 280) {
          color_ = '#ff0000'
        } else if (a < 565) {
          color_ = '#99004c'
        } else if (a < 940) {
          color_ = '#7e0023'
        }
      } else if (b === 'CO') {
        if (a < 2) {
          color_ = '#00e400'
        } else if (a < 4) {
          color_ = '#ecec00'
        } else if (a < 14) {
          color_ = '#ff7e00'
        } else if (a < 24) {
          color_ = '#ff0000'
        } else if (a < 36) {
          color_ = '#99004c'
        } else if (a < 60) {
          color_ = '#7e0023'
        }
      } else if (b === 'O₃') {
        if (a < 160) {
          color_ = '#00e400'
        } else if (a < 200) {
          color_ = '#ecec00'
        } else if (a < 300) {
          color_ = '#ff7e00'
        } else if (a < 400) {
          color_ = '#ff0000'
        } else if (a < 800) {
          color_ = '#99004c'
        } else if (a < 1200) {
          color_ = '#7e0023'
        }
      }
      return color_
    },
    getPie (a, b) {
      let c = 500
      let color_ = ''
      let obj = {}
      color_ = this.getColor(a, b)
      if (b === 'PM10') {
        c = 500
      } else if (b === 'PM2.5') {
        c = 2620
      } else if (b === 'SO₂') {
        c = 2620
      } else if (b === 'CO₂') {
        c = 2620
      } else if (b === 'NO₂') {
        c = 940
      } else if (b === 'CO') {
        c = 60
      } else if (b === 'O₃') {
        c = 1200
      }
      obj = {
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            hoverAnimation:false,
            radius: [20, 25],
            x: '0%',
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value === a) {
                      return params.value
                    } else {
                      return ''
                    }
                  }
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {name: '', value: c - a, itemStyle: this.labelBottom},
              {name: '', value: a, itemStyle: this.labelTop}
            ]
          }
        ],
        color: [color_]
      }
      return obj
    },
    drawLine () {
      let myChart = echarts.init(document.getElementById(this.fomes))
      myChart.setOption(this.getPie(this.value, this.fomes), true)
    }
  },
  watch: {
    value () {
      this.drawLine()
    }
  }
}
</script>
