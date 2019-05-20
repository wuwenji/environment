<template>
  <div>
    <div id="pieChart"></div>
  </div>
</template>

<style scoped>
  #pieChart{
    width:100%;
    height:270px;
    position:relative;
    right: 10px;
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
      let myChart = echarts.init(document.getElementById('pieChart'), 'macarons')
      myChart.setOption({
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            show:false,
            orient : 'vertical',
            x : 'left',
            data:['交通排量', '生活排量', '工业排量', '商业排量', '工地排量', '其它排量', '拆建工地']
          },
          toolbox: {
            show : false,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {
                show: true,
                type: ['pie', 'funnel']
              },
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : false,
          // color: ['#54f3fe', '#dd5d31', '#ffd00d', '#e46d69', '#3581f1'],
          series : [
            {
              type:'pie',
              selectedMode: 'single',
              hoverAnimation:false,
              radius : [0, 40],

              // for funnel
              x: '20%',
              width: '40%',
              funnelAlign: 'right',
              max: 1548,

              itemStyle : {
                normal : {
                  label : {
                    position : 'center',
                    color: '#fff'
                  },
                  labelLine : {
                    show : false
                  }
                }
              },
              data:[
                {value:1, name:'拆建工地'}
              ]
            },
            {
              type:'pie',
              radius : [80, 120],

              // for funnel
              x: '60%',
              width: '35%',
              funnelAlign: 'left',
              max: 1048,
              hoverAnimation:false,
              itemStyle : {
                normal : {
                  label : {
                    position : 'inner'
                  },
                  labelLine : {
                    show : false
                  }
                }
              },
              data:[
                {value:45, name:'交通排量'},
                {value:2, name:'生活排量'},
                {value:15, name:'工地排量'},
                {value:8, name:'商业排量'},
                {value:28, name:'工业排量'},
                {value:2, name:'其它排量'}
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
