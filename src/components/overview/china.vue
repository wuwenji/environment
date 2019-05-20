<template>
  <div>
    <div id="earth"></div>
  </div>
</template>

<style scoped>
  #earth{
    width:100%;
    height:475px;
  }
</style>

<script>

import getCityId from 'echarts/map/json/china-cities'
let echarts = require('echarts/lib/echarts')
require('echarts/map/js/province/allCity')

export default {
  props: ['inCity'],
  data () {
    return {
      myChart: '',
      cityId: [],
      cityJson: ''
    }
  },
  created () {
    this.getABC()
  },
  mounted () {
    this.drawLine()
    this.mapOn()
  },
  methods: {
    getABC () {
      getCityId.features.map(item => {
        this.cityId[item.properties.name + '市'] = item.id
      })
    },
    getReg (city) {
      if (this.cityId[city]) {
        this.cityJson = require('echarts/map/json/province/china-main-city/' + this.cityId[city] + '.json')
        echarts.registerMap(city, this.cityJson)
      } else {
        this.cityJson = require('echarts/map/json/china')
        echarts.registerMap('china', this.cityJson)
      }
    },
    mapOn () {
      this.myChart.on('click', (params) => {
        if (this.$store.state.mapTypes.length >= 3) {
          this.$emit('update:chinafla', false)
        } else {
          this.$store.commit('addMaptypes', params.name)
          this.drawLine()
        }
      })
    },
    drawLine () {
      this.getReg(this.$store.state.mapTypes[this.$store.state.mapTypes.length - 1])
      this.myChart = echarts.init(document.getElementById('earth'))
      this.myChart.setOption({
        series: [
          {
            type: 'map',
            map: this.$store.state.mapTypes[this.$store.state.mapTypes.length - 1],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: '#49bde4'
                  }
                },
                areaColor: '#0f152f',
                borderColor: '#49bde4',
                borderWidth: 1,
                borderType: 'solid'
              },
              emphasis: {label: {show: true}}
            },
            data: [
              {name: '北京'},
              {name: '天津'},
              {name: '上海'},
              {name: '重庆'},
              {name: '河北'},
              {name: '河南'},
              {name: '云南'},
              {name: '辽宁'},
              {name: '黑龙江'},
              {name: '湖南'},
              {name: '安徽'},
              {name: '山东'},
              {name: '新疆'},
              {name: '江苏'},
              {name: '浙江'},
              {name: '江西'},
              {name: '湖北'},
              {name: '广西'},
              {name: '甘肃'},
              {name: '山西'},
              {name: '内蒙古'},
              {name: '陕西'},
              {name: '吉林'},
              {name: '福建'},
              {name: '贵州'},
              {name: '广东'},
              {name: '青海'},
              {name: '西藏'},
              {name: '四川'},
              {name: '宁夏'},
              {name: '海南'},
              {name: '台湾'},
              {name: '香港'},
              {name: '澳门'},
              {name: '广州市'},
              {name: '贵阳市'},
              {name: '白云区'},
              {name: '开阳县'},
              {name: '天河区'}
            ]
          }
        ]
      })
    }
  }
}
</script>
