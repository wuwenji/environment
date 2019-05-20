<template>
  <div style="height:100%;position:relative;overflow:hidden;">
    <!--<div class="china">-->
      <!--<div>-->
        <!--123-->
      <!--</div>-->
    <!--</div>-->
    <div v-show="cityPoins == '公交路线'" class="result_all">
      <!--getResult()-->
      <button class="btn btn1" @click="getResult(233)">233路</button>
      <button class="btn btn1" @click="getResult(246)">246路</button>
      <button class="btn btn1" @click="getResult(272)">272路</button>
      <button class="btn btn2" @click="getResult('白云5路')">5路</button>
      <button class="btn btn2" @click="getResult('白云8路')">8路</button>
      <div style="clear: both;margin-bottom: 10px;"></div>
      <div id="r-result">

      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <img :src="alImg" />

      </el-dialog>
    </div>
    <button v-show="this.$route.path == '/monitor'" @click="heatClick()" class="bnt heatmap">{{showX}}</button>
    <button v-show="this.$route.path == '/monitor'" @click="select()" class="bnt selecbnt">框选</button>
    <div id="map"></div>
    <div v-show="this.$route.path == '/monitor'" class="ditubox" ref="bottom" style="bottom: -180px;"><span @click="tobottom(parseInt($refs.bottom.style.bottom) >= 0)" class="bottom"></span>
      <div>
        <el-table
          :data="selectMarker"
          height="180"
          border
          style="width: 100%;">
          <el-table-column
            prop="city"
            label="监测点">
          </el-table-column>
          <el-table-column
            prop="aqi"
            label="AQI">
          </el-table-column>
          <el-table-column
            prop="pm25"
            label="PM2.5">
          </el-table-column>
          <el-table-column
            prop="pm10"
            label="PM10">
          </el-table-column>
          <el-table-column
            prop="o3"
            label="O3">
          </el-table-column>
          <el-table-column
            prop="no2"
            label="NO2">
          </el-table-column>
          <el-table-column
            prop="so2"
            label="SO2">
          </el-table-column>
          <el-table-column
            prop="co"
            label="CO">
          </el-table-column>
          <el-table-column
            prop="co2"
            label="CO2">
          </el-table-column>
          <el-table-column
            prop="wen"
            label="温度">
          </el-table-column>
          <el-table-column
            prop="shi"
            label="湿度">
          </el-table-column>
          <el-table-column
            prop="fengx"
            label="风向">
          </el-table-column>
          <el-table-column
            prop="fengl"
            label="风力">
          </el-table-column>
          <el-table-column
            prop="fengs"
            label="风速">
          </el-table-column>
          <el-table-column
            prop="tiq"
            label="天气">
          </el-table-column>
          <el-table-column
            prop="ziw"
            label="紫外线">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style>
  #r-result dd table:nth-child(1),#r-result div div{
    display: none;
  }

</style>
<style scoped>
  #map{
    width:100%;
    height:100%;
  }
  .result_all .btn{
    cursor: pointer;
    padding: 4px 7.8px;
    background: #eee;
    border: 1px solid #ddd;
    float: left;
  }
  .result_all{
    width: 260px;
    color: #666;
    border-top:1px solid #bbb;
    border-left: 1px solid #bbb;
    padding: 5px;
    top: 50px;
    background: #fff;
    height: 530px;
    position: absolute;
    right: 0;
    z-index: 999999;
    overflow: auto;
  }
  #r-result{

  }
  .china{
    width: 340px;
    height: 340px;
    z-index: 99999;
    position:absolute;
    background: #fff;
    left: 0;
    bottom: 0;
    border-top:1px solid #bbb;
    border-right: 1px solid #bbb;
  }
  .china > div{
    width: 335px;
    height: 335px;
    border-top:1px solid #bbb;
    border-right: 1px solid #bbb;
    margin-top: 5px;
  }
  .heatmap{
    right: 200px;
  }
  .john-table1 {
    width: 100%;
    border-collapse: collapse;
    margin-top: 6px;
  }
  .john-table1 td,.john-table1 th{
    padding: 3px;
  }
  .ditubox {
    height: 180px;
    position: absolute;
    background: #000;
    width: 100%;
    z-index: 99999;
  }
  .bottom {
    background: url(../../../static/images/bottom.png) no-repeat;
    width: 92px;
    height: 19px;
    display: block;
    cursor: pointer;
    position: absolute;
    margin-top: -19px;
    left: 45%;
  }
  .selecbnt{
    right: 150px;
  }
  .bnt{
    position: absolute;
    z-index: 9999;
    top: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 2px 2px 3px;
    border:none;
    background: rgb(142, 168, 224) none repeat scroll 0% 0%;
    padding: 2px 6px;
    font: bold 12px/1.3em arial, simsun, sans-serif;
    text-align: center;
    white-space: nowrap;
    border-radius: 3px;
    color: rgb(255, 255, 255);
    cursor: pointer;
  }
</style>

<style>
  .maker-window{
    line-height: 24px;
  }
  .anchorBL{
    display:none !important;
  }
</style>

<script>
import BMap from 'BMap'
import BMapLib from 'BMapLib'
import {getColor, getColour} from '../../assets/getCity'
export default{
  props: ['city', 'cityPoins'],
  data () {
    return {
      map: '',
      myIcon: '',
      dialogVisible: false,
      alImg: '../../../static/images/bottom.png',
      blist: [],
      districtLoading: 0,
      heatS: true,
      heatmap: '',
      showX: '热力',
      selectMarker: [],
      remoPoints: []
    }
  },
  methods: {
    tobottom (fla) {
      if (fla) {
        let tobom = setInterval(() => {
          let ss = parseInt(this.$refs.bottom.style.bottom)
          if (ss > -180) {
            this.$refs.bottom.style.bottom = (ss - 3) + 'px'
          } else {
            clearInterval(tobom)
          }
        }, 10)
      } else {
        let totop = setInterval(() => {
          let sss = parseInt(this.$refs.bottom.style.bottom)
          if (sss < 0) {
            this.$refs.bottom.style.bottom = (sss + 3) + 'px'
          } else {
            clearInterval(totop)
          }
        }, 10)
      }
    },
    handleClose() {
      this.dialogVisible = false
    },
    getResult (number) {
      let that = this
      let busline = new BMap.BusLineSearch('贵阳',{
        renderOptions:{map:that.map,panel:"r-result"},
        onGetBusListComplete: function(result){
          if(result) {
            var fstLine = result.getBusListItem(0);//获取第一个公交列表显示到map上
            busline.getBusLine(fstLine);
          }
        },
        onMarkersSet:function(result){
          for (var i=0; i< result.length; i++) {
            result[i].addEventListener('click', (elem) => {
              //let node = document.getElementsByClassName('BMap_pop')
              if (elem.currentTarget.BB == '沙农') {
                setTimeout(resp => {
                  let node = document.createElement('img')
                  node.style='47px;height: 47px; position: absolute; right:20px; '
                  node.src='../../../static/images/shanong.png'
                  that.alImg = '../../../static/images/shanong.png',
                  node.addEventListener('click', (elem) => {
                    that.alertImg()
                  })
                  that.getBS(elem.currentTarget.BB).parentNode.appendChild(node)
                }, 500)
              } else if (elem.currentTarget.BB == '麦架镇') {
                setTimeout(resp => {
                  let node = document.createElement('img')
                  node.style='47px;height: 47px; position: absolute; right:20px; '
                  node.src='../../../static/images/maijiazheng.png'
                  that.alImg = '../../../static/images/maijiazheng.png',
                  node.addEventListener('click', (elem) => {
                    that.alertImg()
                  })
                  that.getBS(elem.currentTarget.BB).parentNode.appendChild(node)
                }, 500)
              } else if (elem.currentTarget.BB == '沙子坡') {
                setTimeout(resp => {
                  let node = document.createElement('img')
                  node.style='47px;height: 47px; position: absolute; right:20px; '
                  node.src='../../../static/images/shazipo.png'
                  that.alImg = '../../../static/images/shazipo.png',
                  node.addEventListener('click', (elem) => {
                    that.alertImg()
                  })
                  that.getBS(elem.currentTarget.BB).parentNode.appendChild(node)
                }, 500)
              }
              console.log(elem.currentTarget)
            })
          }
          document.getElementById('aStop_0_21').addEventListener('click', (elem) => {
            //let node = document.getElementsByClassName('BMap_pop')
            setTimeout(resp => {
              let node = document.createElement('img')
              node.style='47px;height: 47px; position: absolute; right:20px; '
              //node.onClick=this.alertImg()
              node.src='../../../static/images/shanong.png'
              that.alImg = '../../../static/images/shanong.png',
              node.addEventListener('click', (elem) => {
                that.alertImg()
              })
              that.getBS('沙农').parentNode.appendChild(node)
            }, 500)
          })
          document.getElementById('aStop_0_17').addEventListener('click', (elem) => {
            //let node = document.getElementsByClassName('BMap_pop')
            setTimeout(resp => {
              let node = document.createElement('img')
              node.style='47px;height: 47px; position: absolute; right:20px; '
              node.src='../../../static/images/shazipo.png'
              that.alImg = '../../../static/images/shazipo.png',
              node.addEventListener('click', (elem) => {
                that.alertImg()
              })
              that.getBS('沙子坡').parentNode.appendChild(node)
            }, 500)
          })
          document.getElementById('aStop_0_13').addEventListener('click', (elem) => {
            //let node = document.getElementsByClassName('BMap_pop')
            setTimeout(resp => {
              let node = document.createElement('img')
              node.style='47px;height: 47px; position: absolute; right:20px; '
              node.src='../../../static/images/maijiazheng.png'
              that.alImg = '../../../static/images/maijiazheng.png',
              node.addEventListener('click', (elem) => {
                that.alertImg()
              })
              that.getBS('麦架镇').parentNode.appendChild(node)
            }, 500)
          })
        }
      })
      let busName = number;
      busline.getBusList(busName)
      setTimeout(resp => {
        // that.addMarker()
        this.addDistrict('贵州白云')
      }, 1000)
    },
    alertImg () {
      this.dialogVisible = true
    },
    getBS (string) {
      let title_bs = document.getElementsByTagName('b')
      //alert(title_bs.length)
      for (var i = 0; i< title_bs.length; i++) {
        if (title_bs[i].innerHTML == string) {
          return title_bs[i]
        }
      }
    },
    showArea () {
      this.map.setMapStyle({
        styleJson:  [{
          "featureType": "road",
          "elementType": "all",
          "stylers": {
            "color": "#ffffff",
            "visibility": "off"
          }
      }]
      })
    },
    addDistrict (districtName) {
      //使用计数器来控制加载过程
      this.districtLoading++;
      var that = this;
      that.blist.length = 0
      var bdary = new BMap.Boundary();
      bdary.get(districtName, function (rs) {       //获取行政区域
      var count = rs.boundaries.length; //行政区域的点有多少个
       for (var i = 0; i < count; i++) {
         that.blist.push({ points: rs.boundaries[i], name: districtName });
         };
        //加载完成区域点后计数器-1
        that.districtLoading--;
        if (that.districtLoading == 0) {
          //全加载完成后画端点
          that.drawBoundary();
         }
        });
      },
    drawBoundary() {
      //包含所有区域的点数组
      var pointArray = [];
      //循环添加各闭合区域
      for (var i = 0; i < this.blist.length; i++) {
         //添加多边形层并显示
         var ply = new BMap.Polygon(this.blist[i].points, {
                                         strokeWeight: 3,   //边框宽度
                                             trokeColor: "#014F99",   //边框颜色014F99
                                              fillColor: "none"
                                            //fillColor: " #DDE4F0" //填充颜色
                                  }); //建立多边形覆盖物
        ply.name = this.blist[i].name;
        this.map.addOverlay(ply);
        //将点增加到视野范围内
        var path = ply.getPath();
        pointArray = pointArray.concat(path);
      }
      //限定显示区域(只显示特定区域，鼠标拖动松开后自动回到显示范围内)，需要引用api库
      // var boundply = new BMap.Polygon(pointArray);
      // BMapLib.AreaRestriction.setBounds(map, boundply.getBounds());
      this.map.setViewport(pointArray);    //调整视野
    },
    select () {
      let overlays = [];
      let styleOptions = {
        strokeColor:"#1cd4d9",    //边线颜色。
        fillColor:"#015bad",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'dashed' //边线的样式，solid或dashed。
      }
      //实例化鼠标绘制工具
      let drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: true, //是否开启绘制模式
        enableDrawingTool: false, //是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
          offset: new BMap.Size(5, 5), //偏离值
        },
        rectangleOptions: styleOptions //矩形的样式
      });
      drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE )
      //添加鼠标绘制工具监听事件，用于获取绘制结果
      drawingManager.addEventListener('overlaycomplete', (e) => {
        this.selectMarker.length = 0
        overlays.push(e.overlay)
        let pStart = e.overlay.getPath()[3]
        let pEnd = e.overlay.getPath()[1]
        let pt1 = new BMap.Point(pStart.lng, pStart.lat)
        let pt2 = new BMap.Point(pEnd.lng, pEnd.lat)
        let bds = new BMap.Bounds(pt1, pt2)
        for (let i = 0; i < this.cityPoins.length; i++) {
          let pt = new BMap.Point(this.cityPoins[i].lng, this.cityPoins[i].lat)
          if (BMapLib.GeoUtils.isPointInRect(pt, bds)) {
            this.selectMarker.push(this.cityPoins[i])
          }
        }
        this.tobottom(false)
        drawingManager.close()
        for(var i = 0; i < overlays.length; i++){
          this.map.removeOverlay(overlays[i]);
        }
        overlays.length = 0
      });
    },
    getMap () {
      this.map = new BMap.Map('map', {enableMapClick: true})
      this.map.centerAndZoom(this.city, 13)
      this.map.addControl(new BMap.NavigationControl())
      this.map.addControl(new BMap.MapTypeControl())
      this.map.enableScrollWheelZoom(true)
      // this.map.setMapStyle({style:'midnight'})
    },
    setHeatmap () {
      let arry = []
      let data = this.$store.state.cityPoins
      for (let i = 0; i < data.length; i++) {
        arry.push({
          'lng': data[i].lng,
          'lat': data[i].lat,
          'count': data[i].pm25s
        })
      }
      let grad = {
        0.5: '#00e400',
        0.6: '#00e400',
        0.7: '#00e400',
        0.8: '#00e400',
        0.9: '#00e400',
        1: '#ecec00'
      }
      this.heatmap = new BMapLib.HeatmapOverlay({
        radius: 20,
        //        gradient: grad
      })
      this.map.addOverlay(this.heatmap)
      this.heatmap.setDataSet({
        data: arry,
        max: 200
      })
    },
    addHeatmap (array) {
      this.heatmap = new BMapLib.HeatmapOverlay({'radius': 40})
      this.map.addOverlay(this.heatmap)
      this.heatmap.setDataSet({
        data: array,
        max: 10
      })
      let grad1 = {}
      if (array[0].count < 100) {
        grad1 = {
          0.15: '#00e400',
          0.3: '#00e400',
          0.5: '#00e400',
          0.7: '#00e400',
          1: '#00e400'
        }
      } else {
        grad1 = {
          0.15: '#000',
          0.3: '#000',
          0.5: '#000',
          0.7: '#000',
          1: '#000'
        }
      }
      this.heatmap.setOptions({
        gradient: grad1
      })
    },
    gradient (numb) {
    },
    heatClick () {
      this.heatS = !this.heatS
      if (this.heatS) {
        this.showX = '热力'
        this.heatmap.hide()
        this.addMarker()
      } else {
        this.showX = '监测点'
        this.map.clearOverlays()
        this.setHeatmap()
      }
    },
    addMarker () {
      if (this.cityPoins == '公交路线') {
        this.getResult(233)

      } else {
      this.map.clearOverlays()
      let tileLayer = new BMap.TileLayer({isTransparentPng: true});
      tileLayer.getTilesUrl = function(tileCoord, zoom) {
        if(zoom == 18 || zoom == 19){
          return "../../../static/images/border500.png";
        }
        if(zoom == 17 || zoom == 16){
          return "../../../static/images/border1000.png";
        }
        if(zoom <= 15){
          return "../../../static/images/border2000.png";
        }
      }

      this.map.addTileLayer(tileLayer);
      this.addDistrict('贵州白云')
      this.cityPoins.forEach((item, index) => {
        if (this.$route.path === '/prevention' && item.pm25s >= 25) {
          this.myIcon = new BMap.Icon('../../../static/images/marker_red_sprite.gif', new BMap.Size(19, 25))
        } else {
          this.myIcon = new BMap.Icon('../../../static/images/marker_red_sprite3.png', new BMap.Size(19, 25))
        }
        let point = new BMap.Point(item.lng, item.lat)
        let marker = new BMap.Marker(point, {icon: this.myIcon})
        this.map.addOverlay(marker)
        let label = new BMap.Label(item.pm25s, {offset: new BMap.Size(15, -10)})
        let bgColor = getColor(item.pm25s)
        let color = getColour(item.pm25s)
        label.setStyle({
          borderColor: bgColor,
          backgroundColor: bgColor,
          fontSize: '14px',
          color: color,
          fontWeight: 'bold'
        })
        marker.setLabel(label)
        let content = "<div class='maker-window'>"
        content += item.city + '<br/>'
        content += '<div>温度: 26℃</div>'
        content += '<div>天气: 阴转小雨</div>'
        content += '<div>湿度: 50%</div>'
        content += '<div>风向: 110°</div>'
        content += '<div>风力: 2级</div>'
        content += '<div>风速: 3 m/s</div>'
        content += '<div>紫外外: 弱</div>'
        content += '</div>'
        marker.addEventListener('click', () => {
          if (this.$route.path === '/monitor' || this.$route.path === '/prevention') {
            this.$store.commit('monitorChange', item)
          }
          let infoWindow = new BMap.InfoWindow(content)
          this.map.openInfoWindow(infoWindow, point)
        })
      })
    }
    }
  },
  mounted () {
    this.getMap()
    this.addMarker()
    // this.getResult()
    this.showArea()
    this.addDistrict('贵州白云')
  },
  watch: {
    city () {
      this.getMap()
      this.addMarker()
    },
    cityPoins () {
      this.addMarker()
    }
  }
}
</script>
