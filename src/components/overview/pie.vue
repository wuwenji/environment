<template>
  <div>
    <div id="pieChart"></div>
  </div>
</template>

<style scoped>
  #pieChart{
    width:100%;
    height:270px;
  }
</style>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: ['city', 'value'],
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('pieChart'))
      myChart.setOption({
        title: {
          show: false,
          text: '',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          show: false,
          orient: 'vertical',
          x: 'left',
          data: []
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        color: ['#54f3fe', '#dd5d31', '#ffd00d', '#e46d69', '#3581f1'],
        series: [
          {
            name: '污染物',
            type: 'pie',
            radius: [20, 75],
            center: ['47%', '42%'],
            roseType: 'area',
            data: [
              {value: 2, name: '生活排量'},
              {value: 45, name: '交通排量'},
              {value: 30, name: '工业排量'},
              {value: 8, name: '商业排量'},
              {value: 15, name: '工地排量'}
            ]
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
