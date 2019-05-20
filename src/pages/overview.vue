<template>
  <div style="height:100%;">
    <header-component class="cl"></header-component>
    <main class="cl">
      <div id="left">
        <pm-component :city="this.$store.state.city" :value="this.$store.state.Aqi" :rank="this.$store.state.aqiRank"></pm-component>
        <box-component class="left-content">
          <p class="key">行业占比<br/><span>Industry occupation ratio</span></p>
          <div class="cl">
            <div class="pie-box">
              <pie-echarts></pie-echarts>
            </div>
            <ul class="ratio" style="line-height: 23px;">
              <li v-for="(val, key) in ratios" :key="key">
                <p>{{val.name}}：<span :class="val.change > 0? 'yellow': 'green'">{{val.value}}</span><br/>
                  较昨日{{val.change > 0? '上升': '下降'}}了：<span :class="val.change > 0? 'yellow': 'green'">{{Math.abs(val.change)}}%</span></p>
              </li>
            </ul>
          </div>
          <div class="right-two cl">
            <div class="right-two-left">
              <p class="key">主要污染指标<br/><span>Major pollution indicators</span></p>
              <br/>
              <ul class="pies">
                <li v-for="(val, atr, key) in orderFomes" :key="key"><piesEchart :fomes="atr" :value="val"></piesEchart></li>
              </ul>
            </div>
            <div class="right-two-right">
              <p class="key">排行榜<br/><span>Ranking List</span></p>
              <ul class="john-tab">
                <li @click="tabClick(1)" :class="{'john-active': johntab == 'oneli'}">差</li>
                <li @click="tabClick(2)" :class="{'john-active': johntab == 'twoli'}">优</li>
              </ul>
              <table style="margin-top: 10px;" class="john-table" border="0" cellpadding="0" cellspacing="0">
                <colgroup>
                  <col width="180">
                  <col width="150">
                  <col width="150">
                  <col width="200">
                </colgroup>
                <tr>
                  <th>排名</th>
                  <th>地区</th>
                  <th>AQI</th>
                  <th>空气质量</th>
                </tr>
              </table>
              <div class="john-table-box">
                <table style="top:0" border="0" cellpadding="0" cellspacing="0" id="carousel-table" class="john-table carousel-table">
                  <colgroup>
                    <col width="150">
                    <col width="150">
                    <col width="150">
                    <col width="200">
                  </colgroup>
                  <tr @click="rankClick(item.city, 1)" v-for="(item, index) in cityDatas" :key="index">
                    <td>
                      <span class="spans e400" v-if="item.pm25s <= 50">{{item.num}}</span>
                      <span class="spans ec00" v-if="item.pm25s <= 100 && item.pm25s > 50">{{item.num}}</span>
                      <span class="spans ff7e00" v-if="item.pm25s <= 200 && item.pm25s > 100">{{item.num}}</span>
                      <span class="spans ff0000" v-if="item.pm25s <= 300 && item.pm25s > 200">{{item.num}}</span>
                      <!--<span class="spans c4c" v-if="item.pm25s <= 250 && item.pm25s > 150">{{item.num}}</span>-->
                      <span class="spans e0023" v-if="item.pm25s > 300 ">{{item.num}}</span>
                    </td>
                    <td>{{item.city}}</td>
                    <td>
                      <span class="col-e400" v-if="item.pm25s <= 50">{{item.pm25s}}</span>
                      <span class="col-ec00" v-if="item.pm25s <= 100 && item.pm25s > 50">{{item.pm25s}}</span>
                      <span class="col-ff7e00" v-if="item.pm25s <= 200 && item.pm25s > 100">{{item.pm25s}}</span>
                      <span class="col-ff0000" v-if="item.pm25s <= 300 && item.pm25s > 200">{{item.pm25s}}</span>
                      <span class="col-e0023" v-if="item.pm25s > 300 ">{{item.pm25s}}</span>
                    </td>
                    <td>
                      <span class="col-e400" v-if="item.pm25s <= 50">{{item.AQIStatus}}</span>
                      <span class="col-ec00" v-if="item.pm25s <= 100 && item.pm25s > 50">{{item.AQIStatus}}</span>
                      <span class="col-ff7e00" v-if="item.pm25s <= 200 && item.pm25s > 100">{{item.AQIStatus}}</span>
                      <span class="col-ff0000" v-if="item.pm25s <= 300 && item.pm25s > 200">{{item.AQIStatus}}</span>
                      <span class="col-e0023" v-if="item.pm25s > 300 ">{{item.AQIStatus}}</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </box-component>
      </div>
      <div id="content">
        <a @click="earthShow()" class="map-retrun">全球</a>
        <a @click="returnChina()" class="map-retrun return-two">返回</a>
        <div class="earth">
          <component ref="chinamap" :is="earth_china()"></component>
        </div>
        <div class="content-bottom">
          <box-component>
            <line-echarts :Datas="dataTrend"></line-echarts>
          </box-component>
        </div>
      </div>
      <div id="right">
        <box-component style="margin-top:0;">
          <p class="key">{{importCity}}天气<br/><span>Weather forecast</span></p>
          <div class="tq-hidden">
            <iframe id="tq" scrolling="no" frameborder="0" allowtransparency="true"
                    src="http://i.tianqi.com/index.php?c=code&id=12&color=%23FFFFFF&icon=1&num=5&site=12"></iframe>
          </div>
          <p class="key">监测分布<br/><span>Monitoring distribution</span></p>
          <div class="jcfb cl">
            <div class="jcfbleft">
              <ul class="john-tab john-tab2">
                <li @click="tabClick2(1)" :class="{'john-active': johntab2 == 'oneli'}">差</li>
                <li @click="tabClick2(2)" :class="{'john-active': johntab2 == 'twoli'}">优</li>
              </ul>
              <table class="john-table" border="0" cellpadding="0" cellspacing="0">
                <colgroup>
                  <col width="210">
                  <col width="150">
                  <col width="150">
                </colgroup>
                <tr>
                  <th>排名</th>
                  <th>城市</th>
                  <th>Pm2.5</th>
                </tr>
              </table>
              <div class="john-table-box" style="height:160px;">
                <table style="top:0" border="0" cellpadding="0" cellspacing="0" id="carousel-table2" class="john-table carousel-table">
                  <colgroup>
                    <col width="130">
                    <col width="150">
                    <col width="150">
                  </colgroup>
                  <tr @click="rankClick(val.city, 2)" v-for="(val, key) in ranks" :key="key">
                    <td>
                      <span class="col-e400" v-if="val.value <= 35">{{val.count}}</span>
                      <span class="col-ec00" v-if="val.value <= 75 && val.value > 35">{{val.count}}</span>
                      <span class="col-ff7e00" v-if="val.value <= 115 && val.value > 75">{{val.count}}</span>
                      <span class="col-ff0000" v-if="val.value <= 150 && val.value > 115">{{val.count}}</span>
                      <span class="col-c4c" v-if="val.value <=250  && val.value > 150">{{val.count}}</span>
                      <span class="col-e0023" v-if="val.value > 250 ">{{val.count}}</span>
                    </td>
                    <td>{{val.city}}</td>
                    <td>
                      <span class="col-e400" v-if="val.value <= 35">{{val.value}}</span>
                      <span class="col-ec00" v-if="val.value <= 75 && val.value > 35">{{val.value}}</span>
                      <span class="col-ff7e00" v-if="val.value <= 115 && val.value > 75">{{val.value}}</span>
                      <span class="col-ff0000" v-if="val.value <= 150 && val.value > 115">{{val.value}}</span>
                      <span class="col-c4c" v-if="val.value <=250  && val.value > 150">{{val.value}}</span>
                      <span class="col-e0023" v-if="val.value > 250 ">{{val.value}}</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="jcfbright">
              <chinaAll></chinaAll>
            </div>
          </div>
          <div class="fomesratio">
            <p class="key">污染环比<br/><span>Pollution ring ratio</span></p>
            <radioEcharts :xaxis="ratio1" :Datas="dataTrend"></radioEcharts>
          </div>
        </box-component>
        <box-component style="margin-top:15px;">
          <div class="factorall">
            <div class="factor-left">
              <p class="key">环境因素<br/><span>environmental factor</span></p>
              <ul class="ratio factor">
                <li v-for="(val, key) in factors" :key="key">
                  <p>{{val.name}}：<span :class="val.change > 0? 'yellow': 'green'">{{val.value}}</span>
                    较昨日{{val.change > 0? '上升': '下降'}}了：<span :class="val.change > 0? 'yellow': 'green'">{{Math.abs(val.change)}}%</span></p>
                </li>
              </ul>
            </div>
            <div class="factor-right">
              <factorEcharts :factors="factorDatas"></factorEcharts>
            </div>
          </div>
        </box-component>
      </div>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<style scoped>
  #carousel-table tr:hover,#carousel-table2 tr:hover{
    background:rgba(15, 116, 230, 0.2);
    cursor:pointer;
  }
  .factor-left{
    float:left;
    width:210px;
  }
  .factorall{
    height:200px;
  }
  .factor-right{
    float:right;
    width:250px;
  }
  .fomesratio{
    margin-top:35px;
  }
  #left {
    width: 485px;
    height: 100%;
    float: left;
  }
  .pie-box{
    float:left;
    width:68%;
    margin-top: 35px;
  }
  #right{
    width:485px;
    height:100%;
    float:left;
  }
  .tq-hidden{
    overflow:hidden;
    margin-top:10px;
    margin-bottom:20px;
  }
  .right-content{
    height:calc(100% - 440px);
  }
  .left-content{
    height: calc(100% - 510px);
  }
  .ratio{
    font-family:'微软雅黑';
    float:right;
  }
  .factor{
    margin-top:20px;
    float:left;
  }
  .ratio li{
    list-style:none;
    margin-bottom:10px;
    font-size:12px;
  }
  .jcfb{
    height:228px;
  }
  .right-two{
    margin-bottom:60px;
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
  .yellow{
    color:#efe73d;
  }
  .green{
    color:#0ee55b;
  }
  #tq{
    position:relative;
    left: -65px;
    width:130%;
    height:60px;
  }
  #content {
    width: calc(100% - 970px);
    float: left;
    height: 100%;
    position: relative;
  }
  main{
    width: calc(100% - 20px);
    margin:20px 10px 0 10px;
    height: calc(100% - 216px);
  }
  .jcfbleft table {
    width: 100%;
    font-size:12px;
  }
  .jcfbleft table td{
    text-align:center;
    line-height: 14px;
    padding: 2px 0;
  }
  .jcfbleft{
    width: 170px;
    float:left;
    margin-top:30px;
  }
  .jcfbright{
    width: calc(100% - 180px);
    float:right;
    margin-left:10px;
    margin-top:20px;
    height:255px;
  }
  .john-table-box{
    height: calc(100% - 30px);
    overflow:hidden;
  }
  .boxspan table td{
  }
  .content-bottom{
    margin:0 15px;
  }
  .earth{
    width:100%;
    height:calc(100% - 248px);
    position:relative;
  }
  .carousel-table td:nth-child(2){
    color:#66a5d6;
  }
  .earth img{
    position:absolute;
    bottom:0;
    left:15px;
  }
  .map-retrun {
    position: absolute;
    margin-left: 20px;
    border: 1px solid #182f5a;
    border-radius: 6px;
    background: #172d56;
    padding: 3px 6px;
    font-size: 12px;
    text-decoration: none;
    color: #00a0e8;
    cursor: pointer;
    z-index: 9999999;
  }
  .return-two{
    margin-left: 70px;
  }
  .john-table th{
    line-height: 35px;
    font-size:12px !important;
    background:rgba(23, 61, 115, 0.3);
  }
  .right-two-left{
    width: 50%;
    float:left;
    height: 255px;
  }
  .right-two-right{
    width: 50%;
    float:right;
    height: 255px;
  }
  .john-table td{
    text-align:center;
    line-height: 25px;
    font-size:12px !important;
  }
  .john-tab{
    background: #445058;
    position:absolute;
    right:0;
    height: 20px;
    margin-top: -26px;
    margin-right:10px;
    border-radius: 4px;
    width: 70px;
  }
  .john-tab2{
    left: 95px;
    margin-top: -20px;
  }
  .john-tab li.john-active {
    background: #ffea35;
    color: #666;
  }
  .john-tab li {
    cursor: pointer;
    font-size: 12px;
    display: inline-block;
    line-height: 20px;
    height: 20px;
    float: left;
    width: 50%;
    text-align:center;
  }
  .john-tab li:first-child {
    border-radius: 4px 0 0 4px;
  }
  .john-tab li:last-child {
    border-radius: 0 4px 4px 0;
  }
  .spans{
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    display: inline-block;
    border-radius: 4px;
  }
  .e400{
    background:#00e400;
  }
  .ec00{
    background:#ecec00;
    color:#666;
  }
  .ff7e00{
    background:#ff7e00;
  }
  .ff0000{
    background:#ff0000;
  }
  .c4c{
    background:#99004c;
  }
  .e0023{
    color:#8cf447;
  }
  .col-e400{
    color:#00e400;
  }
  .col-ec00{
    color:#ecec00;
  }
  .col-ff7e00{
    color:#ff7e00;
  }
  .col-ff0000{
    color:#ff0000;
  }
  .col-c4c{
    color:#99004c;
  }
  .col-e0023{
    color:#7e0023;
  }
  .carousel-table{
    position:relative;
  }
  .pies{
    margin-top: 10px;
  }
  .pies li{
    width: 33%;
    float:left;
    list-style:none;
    height:120px;
  }
</style>

<script>
import headerComponent from '../components/header'
import footerComponent from '../components/footer'
import pmComponent from '../components/overview/pm25'
import boxComponent from '../components/overview/box'
import gaugeEcharts from '../components/overview/gauge'
import earthEcharts from '../components/overview/earth'
import chinaEcharts from '../components/overview/inChina'
import chinaAll from '../components/overview/allChina'
import lineEcharts from '../components/overview/line'
import radioEcharts from '../components/overview/radioline'
import pieEcharts from '../components/overview/pie'
import factorEcharts from '../components/overview/factor'
import piesEchart from '../components/monitor/pie'
import {animate, cityABC} from '../assets/getCity'
export default {
  data () {
    return {
      johntab: 'oneli',
      johntab2: 'oneli',
      earth: true,
      ratio1: ['昨天', '今天'],
      dataTrend: {
        pm25: [],
        pm10: [],
        o3: [],
        no2: [],
        co: [],
        so2: []
      },
      factorDatas: [4, 3, 110, 26, 60, 1],
      cityDatas: [],
      goodRanks: [],
      poorRanks: [],
      ratios: [
        {
          name: '生活排量',
          value: 2,
          change: -1
        },
        {
          name: '交通排量',
          value: 45,
          change: 5
        },
        {
          name: '工业排量',
          value: 15,
          change: 10
        },
        {
          name: '商业排量',
          value: 8,
          change: -2
        },
        {
          name: '工地排量',
          value: 30,
          change: 8
        }
      ],
      ranksG: [],
      ranksP: [],
      ranks: [
        {
          count: 1,
          city: '南昌',
          value: 1
        },
        {
          count: 2,
          city: '合肥',
          value: 1
        },
        {
          count: 3,
          city: '延边州',
          value: 1
        },
        {
          count: 4,
          city: '博州',
          value: 1
        },
        {
          count: 5,
          city: '佳木斯',
          value: 1
        },
        {
          count: 6,
          city: '莱芜',
          value: 1
        },
        {
          count: 7,
          city: '白山',
          value: 2
        },
        {
          count: 8,
          city: '阜新',
          value: 2
        },
        {
          count: 9,
          city: '哈尔滨',
          value: 2
        },
        {
          count: 10,
          city: '淄博',
          value: 2
        }
      ],
      factors: [
        {
          name: '风速',
          value: 4,
          change: -1
        },
        {
          name: '风力',
          value: 3,
          change: 1
        },
        {
          name: '风向',
          value: 110,
          change: 4
        },
        {
          name: '温度',
          value: 26,
          change: -2
        },
        {
          name: '湿度',
          value: 60,
          change: -5
        },
        {
          name: '气压',
          value: 1,
          change: 0
        }
      ],
      orderFomes: {
        'PM2.5': 0,
        'PM10': 0,
        'O₃': 0,
        'NO₂': 0,
        'SO₂': 0,
        'CO': 0
      }
    }
  },
  computed: {
    importCity () {
      if (this.$store.state.city === 'china') {
        return '中国'
      } else {
        return this.$store.state.city
      }
    }
  },
  methods: {
    getranks () {
      this.axios.post('http://119.23.160.82:8763/hjjc-api/pmData/getChinaData', {'levels': '1,2,3,4,5,6'}).then(resp => {
        if (resp.data.success) {
          this.ranks = []
          let dataP = resp.data.data
          for (let i = 0; i < 10; i++){
            this.ranksP.push({
              count: i + 1,
              city: dataP[i].city,
              value: dataP[i].pm25s
            })
          }
          this.ranks = this.ranksP
          let dataG = dataP.reverse()
          for (let i = 0; i < 10; i++){
            this.ranksG.push({
              count: i + 1,
              city: dataG[i].city,
              value: dataG[i].pm25s
            })
          }
        }
      })
    },
    orderFormes () {
      this.axios.post('http://119.23.160.82:8763/hjjc-api/pmData/findByCity', {
        'city': this.$store.state.city
      }).then(resp => {
        if (resp.data.success) {
          let data = resp.data.data
          console.log(data)
          this.orderFomes = {
            'PM2.5': data.pm25,
            'PM10': data.pm10,
            'O₃': data.o3,
            'NO₂': data.no2,
            'SO₂': data.so2,
            'CO': data.co
          }
        }
      })
    },
    earthShow () {
      this.earth = true
      this.$store.state.inChinaMap = ''
      if (this.earth) {
        this.$refs.chinamap.returns()
      }
    },
    rankClick (city, type) {
      if (type === 1) {
        window.earthFun()
        this.$store.state.inChinaMap = this.$store.state.city
      } else if (type === 2) {
        window.earthFun()
        this.$store.state.inChinaMap = city
      }

    },
    carou () {
      let ct = document.getElementById('carousel-table')
      let tr_ = ct.getElementsByTagName('tr')
      let tr1 = tr_[0]
      ct.removeChild(tr1)
      ct.appendChild(tr1)
      ct.style.top = '0px'
      animate('carousel-table', 'top', '-23', this.carou)
    },
    carou2 () {
      let ct2 = document.getElementById('carousel-table2')
      let tr2_ = ct2.getElementsByTagName('tr')
      let tr21 = tr2_[0]
      ct2.removeChild(tr21)
      ct2.appendChild(tr21)
      ct2.style.top = '0px'
      animate('carousel-table2', 'top', '-15', this.carou2)
    },
    returnChina () {
      if (!this.earth) {
        this.$refs.chinamap.remveMaptypes()
      }
    },
    earth_china () {
      if (this.earth) {
        return earthEcharts
      } else {
        return chinaEcharts
      }
    },
    tabClick2 (value) {
      if (value === 1) {
        this.johntab2 = 'oneli'
        this.ranks = this.ranksP
      }
      if (value === 2) {
        this.johntab2 = 'twoli'
        this.ranks = this.ranksG
      }
    },
    tabClick (value) {
      if (value === 1) {
        this.johntab = 'oneli'
        this.cityDatas = this.goodRanks
      }
      if (value === 2) {
        this.johntab = 'twoli'
        this.cityDatas = this.poorRanks
      }
      if (value === 0) {
        this.axios.post('http://119.23.160.82:8763/hjjc-api/pmData/getAreaPmByCity', {
          city: this.$store.state.city
        }).then(resp => {
          this.goodRanks = []
          this.poorRanks = []
          let data = resp.data
          if (data.success) {
            for (let i = 0; i < data.data.length; i++) {
              this.goodRanks.push({
                num: i + 1,
                city: data.data[i].area,
                pm25s: data.data[i].aqi,
                AQIStatus: data.data[i].aqistr
              })
            }
            this.cityDatas = this.goodRanks
            for (let i = this.goodRanks.length - 1; i > 0; i--) {
              this.poorRanks.push({
                num: this.goodRanks.length - i,
                city: data.data[i].area,
                pm25s: data.data[i].aqi,
                AQIStatus: data.data[i].aqistr
              })
            }
          }
        })
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
      document.getElementById('tq').src = 'http://i.tianqi.com/index.php?c=code&id=12&color=%23FFFFFF&icon=1&py=' + cityABC(this.$store.state.city.replace('市', '')).toLowerCase() + '&num=5&site=12'
    }
  },
  created () {
    this.getranks()
    window.earthFun = () => {
      this.earth = false
    }
    this.tabClick(0)
    this.orderFormes()
  },
  mounted () {
    animate('carousel-table', 'top', '-31', this.carou)
    animate('carousel-table2', 'top', '-15', this.carou2)
    this.dataTrendChange()
  },
  watch: {
    '$store.state.city' () {
      this.dataTrendChange()
      this.tabClick(0)
      this.orderFormes()
    }
  },
  components: {
    headerComponent,
    pmComponent,
    boxComponent,
    gaugeEcharts,
    earthEcharts,
    chinaEcharts,
    lineEcharts,
    pieEcharts,
    footerComponent,
    chinaAll,
    piesEchart,
    radioEcharts,
    factorEcharts
  }
}
</script>
