<template>
  <div>
    <div class="left-top">
      <p class="key">空气质量指数<br/><span>AIR QUALITY INDEX</span></p>
      <div class="left-top-l">
        <div class="left-top-r">
          <strong id="pm2_5">{{value}}</strong><span> <label id="pm2_5Str"> {{rank}}</label><br l=""> AQI指数</span>
        </div>
      </div>
      <div class="left-topr">
        <div id="myChart"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .left-top {
    position: relative;
    left: 0;
    height:160px;
    background:rgba(255, 255, 255, 0.02);
    padding:10px;
    border-radius: 10px;
  }
  .left-top-r {
    font-family: "微软雅黑";
  }
  .left-topr{
    float:right;
    width:220px;
    height: 150px;
  }
  .left-top-r strong {
    float: left;
    display: inline-block;
    font-size: 5vw;
    font-family: '宋体';
    color: #efe72f;
    line-height: 130px;
  }
  .left-top-r span {
    float: left;
    font-size: 1vw;
    margin: 45px 0 0 20px;
    display: inline-block;
    color: #0e74e3;
  }
  #myChart{
    width:100%;
    height:140px;
  }
</style>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/theme/macarons')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: ['value', 'rank', 'city'],
  data () {
    return {
      aqiDatas: []
    }
  },
  mounted () {
    this.aqis()
    this.xData()
  },
  methods: {
    xData () {
      let array = []
      let date = new Date()
      let strDate = date.getDate()
      for (let i = 4; i >= 0; i--) {
        if (strDate - i <= 0) {
          array.push(30 - i + strDate + '号')
        } else if (i === 0) {
          array.push('今天')
        } else {
          array.push(strDate - i + '号')
        }
      }
      this.drawLine(array)
    },
    aqis () {
      this.aqiDatas = []
      if (this.value !== 0) {
        for (let i = 0; i < 5; i++) {
          if (i === 4) {
            this.aqiDatas.push(this.value)
          } else {
            this.aqiDatas.push(Math.abs(this.value - parseInt(Math.random()*30)))
          }
        }
      }
    },
    drawLine (array) {
      let myChart = echarts.init(document.getElementById('myChart'), 'macarons')
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          show: true,
          left: '10%',
          top: '10%',
          bottom: '42%',
          right: '6%',
          borderWidth: '0'
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            splitLine: {show: false},
            data: array,
            axisLabel: {
              textStyle: {
                color: 'rgba(255, 255, 255, 1)',
                width: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: '#5bc3e0',
                width: 1
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false,
            splitLine: {show: false},
            axisLabel: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.4)',
                width: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.4)',
                width: 1
              }
            }
          }
        ],
        series: [
          {
            name: 'AQI',
            type: 'line',
            symbol: 'none',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            lineStyle: {
              color: '#4692b2'
            },
            data: this.aqiDatas,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#5bc3e0' }, { offset: 1, color: '#6747ce' }])
              }
            }
          }
        ]
      })
    }
  },
  watch: {
    value () {
      this.$store.commit('getRank', this.value)
      this.aqis()
      this.xData()
    },
    city () {
      this.aqis()
      this.xData()
    }
  }
}
</script>
