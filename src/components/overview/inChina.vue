<template>
  <div>
    <div id="earth"></div>
  </div>
</template>

<style scoped>
  #earth{
    width:100%;
    height:590px;
  }
</style>

<script>
import getCityId from 'echarts/map/json/china-cities'
let echarts = require('echarts/lib/echarts')
require('echarts/map/js/province/allCity')

export default {
  data () {
    return {
      myChart: '',
      cityId: [],
      cityJson: '',
      mapTypes: ['china'],
      citydatas: [
        {name: '北京',value: Math.round(Math.random()*150)},
        {name: '天津',value: Math.round(Math.random()*150)},
        {name: '上海',value: Math.round(Math.random()*150)},
        {name: '重庆',value: Math.round(Math.random()*150)},
        {name: '河北',value: 0},
        {name: '河南',value: Math.round(Math.random()*150)},
        {name: '云南',value: 5},
        {name: '辽宁',value: 155},
        {name: '黑龙江',value: Math.round(Math.random()*150)},
        {name: '湖南',value: Math.round(Math.random()*150)},
        {name: '安徽',value: Math.round(Math.random()*150)},
        {name: '山东',value: Math.round(Math.random()*150)},
        {name: '新疆',value: Math.round(Math.random()*150)},
        {name: '江苏',value: Math.round(Math.random()*150)},
        {name: '浙江',value: Math.round(Math.random()*150)},
        {name: '江西',value: Math.round(Math.random()*150)},
        {name: '湖北',value: Math.round(Math.random()*150)},
        {name: '广西',value: Math.round(Math.random()*150)},
        {name: '甘肃',value: Math.round(Math.random()*150)},
        {name: '山西',value: Math.round(Math.random()*150)},
        {name: '内蒙古',value: Math.round(Math.random()*150)},
        {name: '陕西',value: Math.round(Math.random()*150)},
        {name: '吉林',value: Math.round(Math.random()*150)},
        {name: '福建',value: Math.round(Math.random()*150)},
        {name: '贵州',value: Math.round(Math.random()*150)},
        {name: '广东',value: 305},
        {name: '广州市',value: 305},
        {name: '深圳市',value: 205},
        {name: '青海',value: Math.round(Math.random()*150)},
        {name: '西藏',value: Math.round(Math.random()*150)},
        {name: '四川',value: Math.round(Math.random()*150)},
        {name: '宁夏',value: Math.round(Math.random()*150)},
        {name: '海南',value: Math.round(Math.random()*150)},
        {name: '台湾',value: Math.round(Math.random()*150)},
        {name: '香港',value: Math.round(Math.random()*150)},
        {name: '日喀则市',value: Math.round(Math.random()*150)},
        {name: '山南市',value: Math.round(Math.random()*150)},
        {name: '澳门',value: Math.round(Math.random()*150)},
        {name: '东山区',value: 18+Math.round(Math.random()*6)},
        {name: '荔湾区',value: 18+Math.round(Math.random()*6)},
        {name: '越秀区',value: 18+Math.round(Math.random()*6)},
        {name: '海珠区',value: 18+Math.round(Math.random()*6)},
        {name: '天河区',value: 300},
        {name: '芳村区',value: 18+Math.round(Math.random()*6)},
        {name: '白云区',value: 18+Math.round(Math.random()*6)},
        {name: '黄埔区',value: 18+Math.round(Math.random()*6)},
        {name: '番禺区',value: 18+Math.round(Math.random()*6)},
        {name: '花都区',value: 18+Math.round(Math.random()*6)},
        {name: '增城市',value: 18+Math.round(Math.random()*6)},
        {name: '从化市',value: 18+Math.round(Math.random()*6)},
        {name: '南沙区',value: 18+Math.round(Math.random()*6)},
        {name: '萝岗区',value: 18+Math.round(Math.random()*6)},
        {name: '市辖区',value: 18+Math.round(Math.random()*6)},
        {name: '南明区',value: 18+Math.round(Math.random()*6)},
        {name: '云岩区',value: 18+Math.round(Math.random()*6)},
        {name: '花溪区',value: 18+Math.round(Math.random()*6)},
        {name: '乌当区',value: 18+Math.round(Math.random()*6)},
        {name: '白云区',value: 18+Math.round(Math.random()*6)},
        {name: '小河区',value: 18+Math.round(Math.random()*6)},
        {name: '开阳县',value: 18+Math.round(Math.random()*6)},
        {name: '息烽县',value: 18+Math.round(Math.random()*6)},
        {name: '修文县',value: 18+Math.round(Math.random()*6)},
        {name: '清镇市',value: 18+Math.round(Math.random()*6)}
      ]
    }
  },
  created () {
    this.getABC()
    if (this.$store.state.inChinaMap !== '') {
      this.addMaptypes(this.$store.state.mapTypes[1].replace('省', ''))
      this.addMaptypes(this.$store.state.inChinaMap)
    }
  },
  mounted () {
    this.drawLine()
    this.mapOn()
    this.getcitydatas()
  },
  watch: {
    '$store.state.inChinaMap' () {
      if (this.mapTypes.length === 1) {
        this.addMaptypes(this.$store.state.mapTypes[1].replace('省', ''))
      }
      this.addMaptypes(this.$store.state.inChinaMap)
      this.drawLine()
      this.mapOn()
    }
  },
  methods: {
    getcitydatas () {
      //      this.axios.post('http://119.23.160.82:8763/hjjc-api/pmData/getChinaData',
      //        {
      //          'levels': '1,2,3,4,5,6'
      //        }).then(resp => {
      //        if (resp.data.success) {
      //          let cityPms = resp.data.data
      //          for (let i = 0; i < cityPms.length; i++) {
      //            this.citydatas.push({
      //              name: cityPms[i].city,
      //              value: cityPms[i].pm25s
      //            })
      //          }
      //        }
      //      })
      this.axios.post('http://119.23.160.82:8763/hjjc-api/area/findAllCity').then(resp => {
        if (resp.data.success) {
          let data = resp.data.data
          data.map(item => {
            this.citydatas.push({
              name: item.cityName,
              value: Math.round(Math.random()*150)
            })
          })
        }
      })
    },
    getABC () {
      getCityId.features.map(item => {
        this.cityId[item.properties.name] = item.id
      })
      //      this.axios.post('http://119.23.160.82:8763/hjjc-api/area/findAllCity').then(resp => {
      //        if (resp.data.success) {
      //          let data = resp.data.data
      //          data.map(item => {
      //            this.cityId[item.cityName] = item.cityId
      //          })
      //        }
      //      })
    },
    addMaptypes (city) {
      if (this.mapTypes.length >= 3) {
        this.mapTypes.pop()
        this.mapTypes.push(city)
      } else {
        this.mapTypes.push(city)
      }
    },
    remveMaptypes () {
      if (this.mapTypes.length > 1) {
        this.mapTypes.pop()
        this.drawLine()
      }
    },
    getReg (city) {
      this.$store.commit('changeCity', city)
      let cityA = city.replace('市', '')
      if (this.cityId[cityA]) {
        this.cityJson = require('echarts/map/json/province/china-main-city/' + this.cityId[cityA] + '.json')
        echarts.registerMap(city, this.cityJson)
      } else {
        this.cityJson = require('echarts/map/json/china')
        echarts.registerMap('china', this.cityJson)
      }
    },
    mapOn () {
      this.myChart.on('click', (params) => {
        this.$store.state.city = params.name
        if (this.mapTypes.length >= 3) {
        } else {
          this.addMaptypes(params.name)
          this.drawLine()
        }
      })
    },
    drawLine () {
      this.getReg(this.mapTypes[this.mapTypes.length - 1])
      this.myChart = echarts.init(document.getElementById('earth'))
      this.myChart.setOption({
        tooltip: {
          formatter: 'Pm2.5 <br/>{b} : {c}'
        },
        dataRange: {
          show: false,
          x: 'left',
          y: 'bottom',
          splitList: [
            {start: 300},
            {end: 300}
          ],
          color: ['rgba(255, 0, 0, 0.7)', 'rgba(1, 78, 139, 0.7)']
        },
        series: [
          {
            type: 'map',
            top: 30,
            bottom: 30,
            map: this.mapTypes[this.mapTypes.length - 1],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                },
                areaColor: 'rgba(1, 78, 139, 0.7)',
                borderColor: '#49bde4',
                borderWidth: 1,
                borderType: 'solid',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10
              },
              emphasis: {label: {show: true}}
            },
            data: this.citydatas
          }
        ]
      })
    }
  }
}
</script>
