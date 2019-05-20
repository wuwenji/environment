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
                贵阳市监测点
                <a target="_blank" href="http://ygd.tt-box.cn:8088/login/hjjc?username=gyhb01&amp;password=123456" class="btndata"> 处置调度 </a>
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
              <p style="margin-bottom: 15px;" class="key">预警点<br/><span>Early-warning point</span></p>
              <table class="john-table" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <th>监测点</th>
                  <th>污染物</th>
                  <th>实时数据</th>
                  <th>预警线</th>
                  <th>负责人</th>
                  <th>联系电话</th>
                </tr>
              </table>
              <div class="john-scoll">
                <tabale id="carousel-table" class="john-table" border="0" cellpadding="0" cellspacing="0">
                  <tr v-for="(item, key) in persons" :key="key">
                    <td>{{item.point}}</td>
                    <td>{{item.fomes}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.prevention}}</td>
                    <td>{{item.person}}</td>
                    <td>{{item.photo}}</td>
                  </tr>
                </tabale>
              </div>
            </boxComponent>
          </div>
          <div class="left-bottom-right">
            <boxComponent style="margin-top: 0px;">
              <div class="line-echarts cl">
                <ul>
                  <li @click="fomesClick(key)" :class="key == keyAct? 'tra-btns-active': ''" v-for="(val, key) in fomes" :key="key">{{val}}</li>
                </ul>
                <line-echarts class="line" :fome="fome" :datas="fomesData"></line-echarts>
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
                    预警线：110<br/>
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
                    预警线：150<br/>
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
            <p class="key">污染环比<br/><span>Pollution ring ratio</span></p>
            <radioEcharts
              :xaxis="ratio1"
              :Datas="dataTrend">
            </radioEcharts>
            <p class="key">污染同比<br/><span>Year-on-year pollution</span></p>
            <radioEcharts
              :types="2"
              style="margin-bottom:30px;"
              :xaxis="ratio2"
              :Datas="dataTrend">
            </radioEcharts>
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
    width:525px;
    float:left;
    margin-left:32px;
  }
  .left-bottom-right{
    width:calc(100% - 580px);
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
    overflow: hidden;
    width: 100%;
  }
</style>

<script>
import headerComponent from '../components/header'
import mapComponent from '../components/monitor/map'
import pieEcharts from '../components/prevention/pie'
import boxComponent from '../components/overview/box'
import lineEcharts from '../components/prevention/line'
import radioEcharts from '../components/overview/radioline'
import {animate} from '../assets/getCity'
export default {
  data () {
    return {
      goCity: this.$store.state.mapZom,
      keyAct: 0,
      air: [3, 4],
      major: [4,1],
      ratio1: ['昨天', '今天'],
      ratio2: ['2017-10-23', '2018-10-23'],
      fomes: ['AQI', 'PM2.5', 'PM10', 'O₃', 'SO₂', 'NO₂', 'CO'],
      fomesData: this.$store.state.monitor.Fomes.Aqis,
      dataTrend: {
        pm25: [],
        pm10: [],
        o3: [],
        no2: [],
        co: [],
        so2: []
      },
      factorDatas: [4, 3, 110, 26, 60, 1],
      persons: [{
        point: '马鞍安',
        fomes: 'PM2.5',
        number: 132,
        prevention: 80,
        person: '张晓丹',
        photo: '13824646475'
      },
        {
          point: '鉴湖路',
          fomes: 'PM10',
          number: 150,
          prevention: 60,
          person: '李铭',
          photo: '15827563719'
        },
        {
          point: '燕子冲',
          fomes: 'C0',
          number: 4,
          prevention: 3,
          person: '程荣盛',
          photo: '18825637281'
        },
        {
          point: '红边门',
          fomes: 'NO',
          number: 200,
          prevention: 120,
          person: '丘堃',
          photo: '15026381926'
        },
        {
          point: '太慈桥',
          fomes: 'O3',
          number: 600,
          prevention: 400,
          person: '吴晓雯',
          photo: '13163728941'
        },
        {
          point: '碧云窝',
          fomes: 'PM2.5',
          number: 132,
          prevention: 80,
          person: '周川',
          photo: '13082753619'
        },
        {
          point: '桐木岭',
          fomes: 'NO',
          number: 200,
          prevention: 120,
          person: '周小洁',
          photo: '15527648398'
        },
        {
          point: '市环保站',
          fomes: 'PM10',
          number: 150,
          prevention: 60,
          person: '曹强',
          photo: '13672563891'
        }
      ],
      dataTrend: {
        pm25: [],
        pm10: [],
        o3: [],
        no2: [],
        co: [],
        so2: []
      },
      cityScale: {
        '人口数量': this.$store.state.monitor.UrbanScale.population,
        '城市面积': this.$store.state.monitor.UrbanScale.acreage,
        '车辆数量': this.$store.state.monitor.UrbanScale.cars,
        '医院数量': this.$store.state.monitor.UrbanScale.hospital,
        '道路长度': this.$store.state.monitor.UrbanScale.road,
        '建筑数量': this.$store.state.monitor.UrbanScale.architecture,
        '工厂数量': this.$store.state.monitor.UrbanScale.factory
      },
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
    fomesClick (val) {
      this.keyAct = val
      if (val === 0) {
        this.fomesData = this.$store.state.monitor.Fomes.Aqis
      } else if (val === 1) {
        this.fomesData = this.$store.state.monitor.Fomes.Pm25s
      } else if (val === 2) {
        this.fomesData = this.$store.state.monitor.Fomes.Pm10s
      } else if (val === 3) {
        this.fomesData = this.$store.state.monitor.Fomes.O3s
      } else if (val === 4) {
        this.fomesData = this.$store.state.monitor.Fomes.So2s
      } else if (val === 5) {
        this.fomesData = this.$store.state.monitor.Fomes.No2s
      } else if (val === 6) {
        this.fomesData = this.$store.state.monitor.Fomes.Cos
      }
    },
    changeIcity () {
      if (this.$refs.Icity.value !== '') {
        this.goCity = this.$refs.Icity.value
        this.$store.commit('monitorChange', this.$refs.Icity.value)
      }
    },
    carou () {
      let ct2 = document.getElementById('carousel-table')
      let tr2_ = ct2.getElementsByTagName('tr')
      let tr21 = tr2_[0]
      ct2.removeChild(tr21)
      ct2.appendChild(tr21)
      ct2.style.top = '0px'
      animate('carousel-table', 'top', '-25', this.carou)
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
    animate('carousel-table', 'top', '-25', this.carou)
  },
  components: {
    headerComponent,
    mapComponent,
    pieEcharts,
    boxComponent,
    lineEcharts,
    radioEcharts
  }
}
</script>
