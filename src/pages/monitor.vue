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
              <div class="point-smake">贵阳市监测点</div>
          </div>
            <div class="map">
              <map-component
                :city="goCity"
                :cityPoins="cityPoins"
              ></map-component>
            </div>
          </div>
        </div>
        <div class="left-bottom-m">
          <div class="left-bottom-left">
            <boxComponent style="margin-top: 0px;">
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
            </boxComponent>
          </div>
          <div class="left-bottom-right">
            <boxComponent style="margin-top: 0px;">
              <line-echarts style="margin-top:25px;margin-bottom:25px;" :Datas="dataTrend"></line-echarts>
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
                <p class="key">监测分类<br/><span>Monitoring and classification</span></p>
                <div class="right-block cl">
                  <ul class="checkboxs">
                    <li @click="liClick"><i class="iconfont icon-gongdi"></i> 拆建工地&nbsp;&nbsp;&nbsp;<el-checkbox></el-checkbox></li>
                    <li @click="liClick"><i class="iconfont icon-jiudian"></i> 宾馆酒店&nbsp;&nbsp;&nbsp;<el-checkbox></el-checkbox></li>
                    <li @click="liClick"><i class="iconfont icon-mineral"></i> 工矿企业&nbsp;&nbsp;&nbsp;<el-checkbox></el-checkbox></li>
                    <li @click="liClick"><i class="iconfont icon-xiaoqu"></i> 小区学校&nbsp;&nbsp;&nbsp;<el-checkbox></el-checkbox></li>
                    <li @click="liClick"><i class="iconfont icon-wuliuqiache2"></i> 物流园区&nbsp;&nbsp;&nbsp;<el-checkbox></el-checkbox></li>
                    <li @click="liClick"><i class="iconfont icon-lvyou"></i> 旅游景点&nbsp;&nbsp;&nbsp;<el-checkbox></el-checkbox></li>
                    <li :class="this.selectLi.indexOf('公交路线') > -1? 'checkboxs-active': ''" @click="liClick($event, '公交路线')"><i class="iconfont icon-qichezhantianchong"></i> 公交路线&nbsp;&nbsp;&nbsp;<span class="zhe_span"></span><el-checkbox v-model="this.selectLi.indexOf('公交路线') > -1"></el-checkbox></li>
                    <li :class="this.selectLi.indexOf('重点企业') > -1? 'checkboxs-active': ''" @click="liClick($event, '重点企业')"><i class="iconfont icon-shangyejianzhu"></i> 重点企业&nbsp;&nbsp;&nbsp;<span class="zhe_span"></span><el-checkbox v-model="this.selectLi.indexOf('重点企业') > -1"></el-checkbox></li>
                    <!--<li @click="liClick"><div>重点企业</div><span style="display:block;">123654</span></li>-->
                    <li :class="this.selectLi.indexOf('重点监测') > -1? 'checkboxs-active': ''" @click="liClick($event, '重点监测')"><i class="iconfont icon-gongyesheshi"></i> 重点监测&nbsp;&nbsp;&nbsp;<span class="zhe_span"></span><el-checkbox v-model="this.selectLi.indexOf('重点监测') > -1"></el-checkbox></li>
                    <li @click="liClick"><i class="iconfont icon-qita"></i> 其&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;它&nbsp;&nbsp;&nbsp;<el-checkbox></el-checkbox></li>
                  </ul>
                </div>
                <p class="key">污染因素<br/><span>Pollution factors</span></p>
                <div class="right-block cl">
                  <ul class="checkboxs">
                    <li class="checkboxs-active"><i class="iconfont icon-shineijiaotong"></i> 交通排放&nbsp;&nbsp;&nbsp;<el-checkbox checked="true"></el-checkbox></li>
                    <li class="checkboxs-active"><i class="iconfont icon-gongyesheshi"></i> 工业排放&nbsp;&nbsp;&nbsp;<el-checkbox checked="true"></el-checkbox></li>
                    <li><i class="iconfont icon-shangyejianzhu"></i> 商业排放&nbsp;&nbsp;&nbsp;<el-checkbox></el-checkbox></li>
                    <li><i class="iconfont icon-fl-jia"></i> 生活排放&nbsp;&nbsp;&nbsp;<el-checkbox></el-checkbox></li>
                    <li><i class="iconfont icon-icon2"></i> 工地排放&nbsp;&nbsp;&nbsp;<el-checkbox></el-checkbox></li>
                    <li><i class="iconfont icon-qita"></i> 其&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;它&nbsp;&nbsp;&nbsp;<el-checkbox></el-checkbox></li>
                  </ul>
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
                <div class="right-block cl" style="margin-top:70px;">
                  <pieTwo></pieTwo>
                </div>
              </div>
            </div>
          </boxComponent>
        </div>
        <div class="right-bottom">
          <boxComponent style="margin-top:0;">
            <p class="key">城市规模<br/><span>Urban scale</span></p>
            <ul class="urban-scale">
              <li>
                人口数量 (万)
                <p>232</p>
              </li>
              <li>
                城市面积 (Km²)
                <p>1343</p>
              </li>
              <li>
                车辆数量 (万)
                <p>56</p>
              </li>
              <li>
                道路长度 (Km)
                <p>232</p>
              </li>
              <li>
                建筑数量 (万间)
                <p>132</p>
              </li>
              <li>
                工厂数量 (万间)
                <p>12</p>
              </li>
            </ul>
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
  .zhe_span{
    position: absolute;
    z-index: 999999;
    width:25px;
    height:25px;
    display: inline-block;
  }
  .key {
    font-family: '微软雅黑';
    line-height: 12px;
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
    height: 478px;
  }
  .checkboxs-active{
    color:#18fafe;
  }
  .right-two-left,.right-two-right{
    float:left;
    height: 100%;
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
    cursor: pointer;
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
    height:665px;
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
</style>

<script>
import headerComponent from '../components/header'
import mapComponent from '../components/monitor/map'
import pieEchart from '../components/monitor/pie'
import boxComponent from '../components/overview/box'
import factorEcharts from '../components/overview/factor'
import lineEcharts from '../components/overview/line'
import pieTwo from '../components/monitor/pieTwo'

let enterprises = [
  {city: '白云区污水处理厂', lng: 106.6275025807, lat: 26.6993347133, pm25s: parseInt(Math.random()*30)},
  {city: '燕京啤酒（贵阳）公司', lng: 106.6254915971, lat: 26.7042607578, pm25s: parseInt(Math.random()*30)},
  {city: '贵州华岭能源开发有限公司', lng: 106.6295715971, lat: 26.7039707578, pm25s: parseInt(Math.random()*30)},
  {city: '贵阳娃哈哈昌盛饮料有限公司', lng: 106.6278715971, lat: 26.7073337578, pm25s: parseInt(Math.random()*30)},
  {city: '贵阳西部化工市场有限责任公司', lng: 106.6391713942, lat: 26.718388163, pm25s: parseInt(Math.random()*30)},
  {city: '贵州拜特制药有限公司', lng: 106.6378313942, lat: 26.720478163, pm25s: parseInt(Math.random()*30)},
  {city: '中国航空标准件制造有限公司', lng: 106.651901, lat: 26.677058, pm25s: parseInt(Math.random()*30)},
  {city: '中国铝业股份有限公司贵州分公司', lng: 106.679059, lat: 26.702313, pm25s: parseInt(Math.random()*30)},
  {city: '贵州铝厂', lng: 106.658028, lat: 26.690629, pm25s: parseInt(Math.random()*30)},
  {city: '贵州今飞毂股份有限公司', lng: 106.671238, lat: 26.70194, pm25s: parseInt(Math.random()*30)},
  {city: '贵州中铝铝业有限公司', lng: 106.679059, lat: 26.702313, pm25s: parseInt(Math.random()*30)},
  {city: '康师傅（贵阳）饮品有限公司', lng: 106.68693, lat: 26.721547, pm25s: parseInt(Math.random()*30)},
  {city: '中国航空发动机贵州黎阳动力有限公司', lng: 106.672053, lat: 26.714236, pm25s: parseInt(Math.random()*30)},
  {city: '贵州振华新材料有限公司', lng: 106.673512, lat: 26.724909, pm25s: parseInt(Math.random()*30)},
  {city: '中车贵阳车辆有限公司（南方汇通）', lng: 106.735156, lat: 26.689667, pm25s: parseInt(Math.random()*30)},
  {city: '宇宙钢丝绳有限公司', lng: 106.72464, lat: 26.693607, pm25s: parseInt(Math.random()*30)},
  {city: '贵阳白云骨粒化工厂', lng: 106.756005, lat: 26.692442, pm25s: parseInt(Math.random()*30)},
  {city: '贵阳长乐钢铁有限公司', lng: 106.690417, lat: 26.751749, pm25s: parseInt(Math.random()*30)},
  {city: '贵州汉方药业有限公司', lng: 106.673817, lat: 26.753551, pm25s: parseInt(Math.random()*30)},
  {city: '贵阳市白云区麦架乡镇企业公司（青山铝土矿）', lng: 106.629822, lat: 26.702324, pm25s: parseInt(Math.random()*30)}
]
let monitors = [
  {city: '空气质量自动监测站', lng: 106.599965, lat: 26.697798, pm25s: parseInt(Math.random()*30)},
  {city: '空气质量自动监测站', lng: 106.711247, lat: 26.704067, pm25s: parseInt(Math.random()*30)},
  {city: '治理设施工况监控企业', lng: 106.627878, lat: 26.707333, pm25s: parseInt(Math.random()*30)},
  {city: '治理设施工况监控企业', lng: 106.638247, lat: 26.688988, pm25s: parseInt(Math.random()*30)},
  {city: '治理设施工况监控企业', lng: 106.657798, lat: 26.691121, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.675283, lat: 26.748099, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.651909, lat:	26.755808, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.662927, lat:	26.686929, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.647692, lat:	26.688583, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.637199, lat:	26.694668, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.626995, lat:	26.697056, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.628755, lat:	26.716872, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.66749, lat:	26.712516, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.664059, lat:	26.698717, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.656261, lat:	26.694063, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.62686, lat:	26.680094, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.634244, lat:	26.679723, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.627147, lat:	26.689358, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.638107, lat:	26.694547, pm25s: parseInt(Math.random()*30)},
  {city: '餐饮油烟在线监控点', lng: 106.631998, lat:	26.709723, pm25s: parseInt(Math.random()*30)},
  {city: '扬尘自动监控站', lng: 106.617494, lat:	26.675963, pm25s: parseInt(Math.random()*30)},
  {city: '扬尘自动监控站', lng: 106.637167, lat:	26.688306, pm25s: parseInt(Math.random()*30)},
  {city: '扬尘自动监控站', lng: 106.655672, lat:	26.682608, pm25s: parseInt(Math.random()*30)}
]

export default {
  data () {
    return {
      goCity: this.$store.state.mapZom,
      air: [3, 4],
      selectLi: ['重点监测'],
      major: [4,1],
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
      factorDatas: [4, 3, 110, 26, 60, 1],
      dataTrend: {
        pm25: [],
        pm10: [],
        o3: [],
        no2: [],
        co: [],
        so2: []
      },
      cityPoins: monitors,
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
  computed: {
  },
  methods: {
    changeIcity () {
      if (this.$refs.Icity.value !== '') {
        this.goCity = this.$refs.Icity.value
        this.$store.commit('monitorChange', this.$refs.Icity.value)
      }
    },
    liClick (event, str) {
      this.selectLi.length = 0
      if (this.selectLi.indexOf(str) > -1){
        var arrts = []
        for (var i=0; i< this.selectLi.length ; i++){
          if( this.selectLi[i] != str) {
            arrts.push(this.selectLi[i])
          }
        }
        this.selectLi = arrts
      } else {
        this.selectLi.push(str)
      }
      if (str == '重点企业') {
        this.cityPoins = enterprises
      } else if (str == '重点监测') {
        // this.cityPoins = this.$store.state.cityPoins
        this.cityPoins = monitors
      } else if (str == '公交路线') {
        // this.cityPoins = this.$store.state.cityPoins
        this.cityPoins = '公交路线'
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
  components: {
    headerComponent,
    mapComponent,
    pieEchart,
    boxComponent,
    factorEcharts,
    lineEcharts,
    pieTwo
  }
}
</script>
