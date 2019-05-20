<template>
  <div style="height:100%">
    <header-component class="cl"></header-component>
    <main>
      <div class="left">
        <div class="left-top">
          <div class="left-top-right">
            <div class="smake-select">
              <div class="btns1">
                <ul>
                  <li>
                    <img src="../../static/images/marker_red_sprite3.png" alt="">
                    <input type="checkbox" name="" id="check1">
                    <label for="check1">国测点</label>
                  </li>
                  <li>
                    <img src="../../static/images/marker_red_sprite1.png" alt="">
                    <input type="checkbox" name="" id="check2">
                    <label for="check2">省测点</label>
                  </li>
                  <li>
                    <img src="../../static/images/marker_red_sprite.png" alt="">
                    <input type="checkbox" name="" id="check3">
                    <label for="check3">自建点</label>
                  </li>
                  <li>
                    <img src="../../static/images/marker_red_sprite2.png" alt="">
                    <input type="checkbox" name="" id="check4">
                    <label for="check4">移动点</label>
                  </li>
                </ul>
              </div>
              <div class="point-smake">
                <div class="days">
                  <a class="days-active" href="">明天</a>
                  <a href="">后天</a>
                </div>
                <a target="_blank" class="btndata"><img src="../../static/images/action.png" alt=""> 预测</a>
                <a target="_blank" class="btndata">预测报告</a>
              </div>
            </div>
            <div class="map">
              <map-component
                :city="goCity"
                :cityPoins="this.$store.state.cityPoins"
              ></map-component>
            </div>
          </div>
        </div>
        <div class="left-bottom-m">
          <div class="left-bottom-left">
            <boxComponent style="margin-top: 0px;">
              <p class="key">行业占比<br/><span>Industry occupation ratio</span></p>
              <piesEchart style="height:224px; overflow: hidden;"></piesEchart>
            </boxComponent>
          </div>
          <div class="left-bottom-right">
            <boxComponent style="margin-top: 0px;">
              <div class="line-echarts cl">
                <line-echarts :legend="legends" type="line" :xAxis="xAxis" class="line" style="margin-top:25px;margin-bottom: 10px;" :datas="dataTrend"></line-echarts>
              </div>
            </boxComponent>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <boxComponent style="margin-top: 0px;">
            <p class="key">污染等级<br/><span>Class of pollution</span></p>
            <div class="industop">
              <img src="../../static/images/moni.png" alt="">
              <ul>
                <li><input id="inpu1" title="优" name="1" checked="" type="checkbox"><label for="inpu1"></label></li>
                <li><input id="inpu2" title="良" name="2" checked="" type="checkbox"><label for="inpu2"></label></li>
                <li><input id="inpu3" title="轻度污染" name="3" checked="" type="checkbox"><label for="inpu3"></label></li>
                <li><input id="inpu4" title="中度污染" name="4" checked="" type="checkbox"><label for="inpu4"></label></li>
                <li><input id="inpu5" title="重度污染" name="5" checked="" type="checkbox"><label for="inpu5"></label></li>
                <li><input id="inpu6" title="严重污染" name="6" checked="" type="checkbox"><label for="inpu6"></label></li>
              </ul>
            </div>
          </boxComponent>
          <boxComponent>
            <div class="right-two">
              <div class="right-two-left">
                <p class="key">空气质量指数<br/><span>Air quality index</span></p>
                <div class="right-block cl">
                  <ul class="numberType">
                    <li v-for="(item, key) in air" :key="key">{{item}}</li>
                  </ul>
                  <div class="numberType-right">
                    污染物：AQI<br/>
                    质量状况：优
                  </div>
                </div>

              </div>
              <div class="right-two-right">
                <p class="key">首要污染物<br/><span>Major pollutants</span></p>
                <div class="right-block cl">
                  <ul class="numberType">
                    <li v-for="(item, key) in major" :key="key">{{item}}</li>
                  </ul>
                  <div class="numberType-right">
                    污染物：PM2.5<br/>
                    质量状况：优
                  </div>
                </div>
              </div>
              <p class="key">污染指数<br/><span>pollution index</span></p>
              <div class="right-bottom-left">
                <ul>
                  <li v-for="(val, str, key) in pies" :key="key">
                    <pieEcharts :value="val" :fomes="str"></pieEcharts>
                  </li>
                </ul>
              </div>
            </div>
          </boxComponent>
        </div>
        <div class="right-bottom">
          <boxComponent style="margin-top:0;">
            <p class="key">行业排量<br/><span>Industry displacement</span></p>
            <line-echarts :legend="legends2" type="bar" :xAxis="xAxis" style="height: 180px;" :datas="dataTrend"></line-echarts>
            <p class="key">环境因素<br/><span>environmental factor</span></p>
            <wind-echarts style="height:150px;" :xAxis="xAxis" :data="windData"></wind-echarts>
          </boxComponent>
        </div>
      </div>
    </main>
  </div>
</template>
<style>
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #18fafe;
    border-color: #18fafe;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #18fafe;
  }
</style>
<style scoped>
  main{
    height: calc(100% - 127px);
    margin-top:15px;
  }
  .btndata img{
    position:relative;
    top:3px;
  }
  .btndata{
    margin-left: 10px;
    cursor:pointer;
  }
  .days{
    float:left;
  }
  .point-smake .days a:nth-child(1){
    border-radius:4px 0 0 4px;
  }
  .point-smake .days a:nth-child(2){
    border-radius:0 4px 4px 0;
  }
  .point-smake .days a{
    float:left;
    display: block;
    height: 23px;
    line-height: 23px;
    width: 60px;
    margin: 0;
    background:none;
    border: none;
    margin-top: 7px;
    text-align: center;
    border: 1px solid #51ebe3;
    cursor: pointer;
    font-size: 12px;
    color: #51ebe3;
    font-family: Arial
  }
  .point-smake .days .days-active{
    background: #51ebe3;
    color: #15262e;
  }
  .john-table th{
    padding: 8px 0;
    color:#13feff;
    background:#13304e;
  }
  #carousel-table{
    position:relative;
  }
  .john-scoll{
    height: 175px;
    color: #ecec00;
    overflow: hidden;
  }
  .john-scoll tr:hover{
    background: #13304e;
    cursor:pointer;
  }
  .john-table td{
    padding: 6px 0;
    font-size: 12px;
  }
  .john-table td,.john-table th{
    text-align: center;
    width: 85px;
  }
  .right-bottom-left{
    height: 115px;
    width: 100%;
    float: left;
  }
  .right-bottom-left ul{
    height:100%;
  }
  .right-bottom-left ul li{
    float:left;
    list-style:none;
    width:16.6%;
  }
  .key {
    font-family: '微软雅黑';
    line-height: 12px;
  }
  .right-bottom .key:nth-child(1){
    margin-bottom: 15px;
  }
  .right-bottom .key:nth-child(3){
    margin-top: 36px;
    margin-bottom: 25px;
  }
  .right-block{
    margin-bottom: 40px;
  }
  .industop{
    margin-top: 15px;
    position:relative;
  }
  .industop ul {
    position: absolute;
    top: 25px;
    left: 0px;
  }
  .right-two{
    height: 268px;
  }
  .checkboxs-active{
    color:#18fafe;
  }
  .right-two-left,.right-two-right{
    float:left;
    height: 135px;
    width:50%;
  }
  .industop ul li {
    float: left;
    width: 75px;
    text-align: left;
    list-style: none;
  }
  .numberType{
    margin-top: 15px;
    margin-right: 5px;
  }
  .numberType-right{
    float:left;
    color:#13feff;
    font-size: 12px;
    margin-left:5px;
    line-height: 18px;
    font-family: '微软雅黑';
  }
  .numberType li{
    float:left;
    margin-right: 5px;
    background:#122f4d;
    list-style: none;
    width: 40px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color:#13feff;
    font-family: DS;
    font-size:50px;
  }
  .industop ul li label {
    width: 60px;
    height: 10px;
    display: inline-block;
    cursor:pointer;
  }
  .checkboxs li {
    float:left;
    list-style:none;
    width: 50%;
    margin:4px 0;
    font-size: 12px;
    font-family: '微软雅黑';
  }
  .checkboxs {
    margin-top: 10px;
  }
  .checkboxs i{
    width: 20px;
    display:inline-block;
  }
  .checkboxs i input{
    margin-left:5px;
  }
  .key span {
    text-transform: Uppercase;
    font-size: 8px;
  }
  .left,.right{
    height: 100%;
    float:left;
    margin: 0 5px;
  }
  .left-bottom{
  }
  .left-bottom-m{
    height: calc(100% - 665px);
  }
  .left-bottom-left{
    height: 100%;
    width:425px;
    float:left;
    margin-left:32px;
  }
  .left-bottom-right{
    width:calc(100% - 480px);
    margin-left: 10px;
    float:left;
  }
  .yellow{
    color:#efe73d;
  }
  .green{
    color:#0ee55b;
  }
  .left {
    width: calc(100% - 550px);
  }
  .right {
    width: 530px;
  }
  .left-top{
    background: url(../../static/images/mapLeft.png) no-repeat left top;
    height: 665px;
  }
  .right-top{
    height:455px;
  }
  .right-bottom{
    height: calc(100% - 665px);
  }
  .left-top-right{
    background: url(../../static/images/mapright.png) no-repeat right bottom;
    height: 645px;
    padding: 15px 32px;
  }
  .smake-select{
    height: 30px;
  }
  .btns1{
  }
  .btns1 ul img{
    position: relative;
    top: 5px;
    width: 15px;
  }
  .btns1 ul li input{
    position: relative;
    top: 2px;
  }
  .btns1 ul li{
    float:left;
    list-style:none;
    margin-right:20px;
  }
  .point-smake{
    float: right;
    line-height: 30px;
    color: #15fdff;
    width: 660px;
  }
  .point-smake a{
    float:right;
    background:#20759d;
    border:1px solid #1ad9db;
    padding: 0 10px;
    border-radius:4px;
    line-height: 28px;
  }
  .map{
    height: calc(100% - 35px);
    margin-top: 5px;
  }
  .factor-left{
    float:left;
    width:210px;
  }
  .factorall{
    height:250px;
  }
  .factor-right{
    float:right;
    width:280px;
    margin-top: 25px;
  }
  .ratio{
    font-family:'微软雅黑';
    float:right;
    margin-top: 25px;
  }
  .ratio li{
    list-style:none;
    margin-bottom:15px;
    font-size:12px;
  }
  .ratio li p{
    display:inline-block;
    margin-left:10px;
  }
  .ratio li:before{
    content: '';
    width: 10px;
    height: 10px;
    border-radius:50%;
    display:inline-block;
    position:relative;
    top: -22px;
  }
  .factor li:before{
    top: -0px;
  }
  .ratio li:nth-child(1):before{
    background:#54f3fe;
  }
  .ratio li:nth-child(2):before{
    background:#dd5d31;
  }
  .ratio li:nth-child(3):before{
    background:#ffd00d;
  }
  .ratio li:nth-child(4):before{
    background:#e46d69;
  }
  .ratio li:nth-child(5):before{
    background:#3a8dff;
  }
  .factor li:nth-child(6):before{
    background:#3a8dff;
  }
  .urban-scale{
    margin-top: 20px;
  }
  .urban-scale li {
    float:left;
    width: 150px;
    list-style:none;
    text-align:center;
    color:#7b7b7b;
    margin: 6px 5px;
    padding: 10px 0;
    font-family: '微软雅黑';
    background: rgba(0, 0, 0, 0.2);
  }
  .urban-scale li p{
    color:#13feff;
    font-family: DS;
    font-size: 30px;
    margin-top: 10px;
  }
  .line-echarts ul{
    float:right;
    height:25px;
    line-height: 25px;
    border:1px solid #51ebe3;
    border-radius:4px;
    z-index:999999;
    margin-top:10px;
    margin-left:10px;
  }
  .line-echarts ul li{
    display: block;
    height:23px;
    line-height: 23px;
    width: 60px;
    margin: 0;
    border: none;
    list-style: none;
    float: left;
    text-align:center;
    border-right:1px solid #51ebe3;
    cursor: pointer;
    font-size:12px;
    color: #51ebe3;
    font-family: Arial;
  }
  .line-echarts ul li:last-child{
    border:none;
  }
  .line-echarts ul li.tra-btns-active {
    background: #51ebe3;
    color: #15262e;
  }
  .line{
    height: 215px;
    width: 100%;
  }
</style>

<script>
  import headerComponent from '../components/header'
  import mapComponent from '../components/monitor/map'
  import pieEcharts from '../components/prevention/pie'
  import boxComponent from '../components/overview/box'
  import lineEcharts from '../components/traceability/line'
  import piesEchart from '../components/overview/pie'
  import windEcharts from '../components/traceability/wind'
  export default {
    data () {
      return {
        goCity: this.$store.state.mapZom,
        keyAct: 0,
        air: [3, 4],
        major: [4,1],
        ratio1: ['昨天', '今天'],
        ratio2: ['2017-10-23', '2018-10-23'],
        legends: ['PM2.5', 'PM10', 'O₃', 'NO₂', 'SO₂', 'CO'],
        legends2: ['工地', '商业', '生活', '交通', '工业', '其它'],
        xAxis: ['0点', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点'],
        windData: [
          [1, 3, 4, 2, 4, 1, 2, 4, 6, 3, 2, 4, 2, 3, 3, 4, 5, 1, 4, 2, 3, 1, 2, 4],
          [4, 2, 1, 3, 1, 2, 4, 4, 5, 4, 2, 3, 2, 4, 2, 4, 3, 3, 1, 4, 1, 2, 6, 3],
          [110, 112, 113, 120, 113, 112, 110, 108, 107, 105, 104, 98, 100, 104, 106, 110, 114, 110, 116, 117, 120, 160, 165, 170],
          [23, 24, 26, 27, 28, 27, 28, 26, 29, 30, 29, 28, 27, 24, 22, 22, 21, 24, 22, 23, 24, 23, 19, 18],
          [40, 50, 60, 65, 64, 60, 50, 62, 55, 40, 32, 52, 47, 54, 62, 72, 41, 54, 62, 73, 64, 53, 57, 68],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        fomesData: this.$store.state.monitor.Fomes.Aqis,
        factorDatas: [4, 3, 110, 26, 60, 1],
        dataTrend: [
          [15, 17, 16, 13, 16, 20, 23, 25, 25, 20, 18, 19, 17, 14, 16, 20, 22, 18, 20, 19, 28, 25, 24, 20],
          [15, 17, 16, 13, 16, 20, 23, 25, 25, 20, 18, 19, 17, 14, 16, 20, 22, 18, 20, 19, 28, 25, 24, 20],
          [15, 17, 16, 13, 16, 20, 23, 25, 25, 20, 18, 19, 17, 14, 16, 20, 22, 18, 20, 19, 28, 25, 24, 20],
          [15, 17, 16, 13, 16, 20, 23, 25, 25, 20, 18, 19, 17, 14, 16, 20, 22, 18, 20, 19, 28, 25, 24, 20],
          [15, 17, 16, 13, 16, 20, 23, 25, 25, 20, 18, 19, 17, 14, 16, 20, 22, 18, 20, 19, 28, 25, 24, 20],
          [15, 17, 16, 13, 16, 20, 23, 25, 25, 20, 18, 19, 17, 14, 16, 20, 22, 18, 20, 19, 28, 25, 24, 20]
        ],
        orderFomes: {
          'PM10': this.$store.state.monitor.Fomes.Pm10,
          'O₃': this.$store.state.monitor.Fomes.O3,
          'NO₂': this.$store.state.monitor.Fomes.No2,
          'SO₂': this.$store.state.monitor.Fomes.So2,
          'CO₂': this.$store.state.monitor.Fomes.Co2,
          'CO': this.$store.state.monitor.Fomes.Co
        },
        pies: {
          'PM2.5': this.$store.state.monitor.Fomes.Pm25,
          'PM10': this.$store.state.monitor.Fomes.Pm10,
          'O₃': this.$store.state.monitor.Fomes.O3,
          'SO₂': this.$store.state.monitor.Fomes.So2,
          'NO₂': this.$store.state.monitor.Fomes.No2,
          'CO': this.$store.state.monitor.Fomes.Co
        }
      }
    },
    watch: {
      '$store.state.monitor.Point' () {
        this.cityScale = {
          '人口数量': this.$store.state.monitor.UrbanScale.population,
          '城市面积': this.$store.state.monitor.UrbanScale.acreage,
          '车辆数量': this.$store.state.monitor.UrbanScale.cars,
          '医院数量': this.$store.state.monitor.UrbanScale.hospital,
          '道路长度': this.$store.state.monitor.UrbanScale.road,
          '建筑数量': this.$store.state.monitor.UrbanScale.architecture,
          '工厂数量': this.$store.state.monitor.UrbanScale.factory
        }
        this.orderFomes = {
          'PM10': this.$store.state.monitor.Fomes.Pm10,
          'O₃': this.$store.state.monitor.Fomes.O3,
          'NO₂': this.$store.state.monitor.Fomes.No2,
          'SO₂': this.$store.state.monitor.Fomes.So2,
          'CO₂': this.$store.state.monitor.Fomes.Co2,
          'CO': this.$store.state.monitor.Fomes.Co
        }
      }
    },
    methods: {
      changeIcity () {
        if (this.$refs.Icity.value !== '') {
          this.goCity = this.$refs.Icity.value
          this.$store.commit('monitorChange', this.$refs.Icity.value)
        }
      },
      dataTrendChange () {
        this.axios.post('http://119.23.160.82:8763/hjjc-api/pmData/getCityListData', {
          'city': this.$store.state.city
        }).then(resp => {
          if (resp.data.success) {
            let trend1 = []
            let trend2 = []
            let trend3 = []
            let trend4 = []
            let trend5 = []
            let trend6 = []
            for (let i = 0; i < resp.data.data.length; i++) {
              trend1.push(resp.data.data[i].pm25s)
              trend2.push(resp.data.data[i].pm10)
              trend3.push(resp.data.data[i].o3)
              trend4.push(resp.data.data[i].no2)
              trend5.push(resp.data.data[i].co)
              trend6.push(resp.data.data[i].so2)
            }
            this.dataTrend = {
              pm25: trend1,
              pm10: trend2,
              o3: trend3,
              no2: trend4,
              co: trend5,
              so2: trend6
            }
          }
        })
      }
    },
    created () {
      this.$store.commit('addPoins', '贵阳')
      this.dataTrendChange()
    },
    mounted () {
    },
    components: {
      headerComponent,
      mapComponent,
      pieEcharts,
      boxComponent,
      lineEcharts,
      windEcharts,
      piesEchart
    }
  }
</script>
