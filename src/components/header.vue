<template>
  <header>
    <nav>
      <ul>
        <li :class="page == '/' ? 'navacitve': ''"><router-link to="/">实时概览</router-link></li>
        <li :class="page == '/monitor' ? 'navacitve': ''"><router-link to="/monitor">监测分布</router-link></li>
        <li :class="page == '/prevention' ? 'navacitve': ''"><router-link to="/prevention">预警处置</router-link></li>
        <li :class="page == '/traceability' ? 'navacitve': ''"><router-link to="/traceability">污染溯源</router-link></li>
        <li :class="page == '/forecast' ? 'navacitve': ''"><router-link to="/forecast">预测分析</router-link></li>
      </ul>
    </nav>
    <div class="login">
      <a>超级管理员</a>
      <router-link to="/logo">
        <img @click="clickOut()" class="out" src="../../static/images/out.png" alt="">
      </router-link>
    </div>
    <div v-if="page == '/monitor2'">
      <div class="industop">
        <img src="../../static/images/biao.png" alt="">
        <ul>
          <li><input id="inpu1" title="优" name="1" checked="" type="checkbox"><label for="inpu1"></label></li>
          <li><input id="inpu2" title="良" name="2" checked="" type="checkbox"><label for="inpu2"></label></li>
          <li><input id="inpu3" title="轻度污染" name="3" checked="" type="checkbox"><label for="inpu3"></label></li>
          <li><input id="inpu4" title="中度污染" name="4" checked="" type="checkbox"><label for="inpu4"></label></li>
          <li><input id="inpu5" title="重度污染" name="5" checked="" type="checkbox"><label for="inpu5"></label></li>
          <li><input id="inpu6" title="严重污染" name="6" checked="" type="checkbox"><label for="inpu6"></label></li>
        </ul>
      </div>
    </div>
    <div v-else class="serach">
      <a @click.stop="searchShow()" class="search_a">{{importCity}} <img src="../../static/images/down.jpg" alt=""></a>
      <div class="serach-box" ref="serach">
        <input @click.stop="searchShowt()" class="cityinput" ref="Icity" id="citySelect" placeholder="请输入地区首字母" type="text">
        <button @click="changeCity()" class="sera-submit">确定</button>
      </div>
    </div>
    <div id="time">{{nowTime}}</div>
  </header>
</template>

<style>
  body{
    /*background: url(../../static/images/header.png) no-repeat top center;*/
  }
  html,#web{
    height: 100%;
  }
</style>

<style scoped>
  header{
    text-align:center;
    background: url(../../static/images/header.png) no-repeat top center;
    padding-top: 5px;
  }
  nav{
    margin-bottom:10px;
  }
  nav li {
    display: inline-block;
    line-height: 60px;
    font-size: 16px;
  }
  nav li a {
    padding: 0px 15px;
    line-height: 40px;
    display: inline-block;
    border-radius: 4px;
    height: 40px;
    border: 1px solid transparent;
  }
  .navacitve a {
    background: #054a8a;
    border: 1px solid #0c9696;
  }
  #time {
    background: url(../../static/images/date.png) no-repeat;
    width: 225px;
    height: 37px;
    float: right;
    font-size: 15px;
    margin-right: 20px;
    text-align: center;
    line-height: 37px;
  }
  .login {
    position: absolute;
    right: 40px;
    top: 7px;
    /*line-height: 25px;*/
    /*border-radius: 4px;*/
    /*background: #0f152f;*/
    /*padding: 4px 10px;*/
    /*border: 1px solid #1173e2;*/
  }
  #allmap{
    opacity:0;
  }
  .out {
    position: relative;
    top: 2px;
    margin-left: 5px;
  }
  .serach-box {
    display: none;
    background: #fff;
    width: 340px;
    height: 40px;
    position: absolute;
    z-index: 99999999;
  }
  .serach {
    float: left;
    font-size: 30px;
    font-weight: bold;
    margin-left: 100px;
    text-align: left;
  }
  .serach img {
    position: relative;
    top: -5px;
  }
  .cityinput {
    width: 80%;
    padding-left: 5%;
    height: 100%;
    border: none;
    float: left;
    position: relative;
  }
  .serach-box button {
    float: left;
    width: 20%;
    height: 100%;
    border: none;
    cursor: pointer;
  }
  .search_a{
    cursor: pointer;
  }
  .industop ul {
    position: absolute;
    top: 33px;
    left: 10px;
  }
  .industop ul li {
    float: left;
    width: 57px;
    text-align: left;
    list-style: none;
  }
  .industop {
    position: absolute;
    left: 3px;
    top: 40px;
  }
  .industop ul li label {
    width: 43px;
    height: 10px;
    display: inline-block;
    cursor:pointer;
  }
</style>

<script>
import Vcity from '../../static/js/cityselect'
import '../../static/css/cityselect.css'
export default {
  data () {
    return {
      nowTime: ''
    }
  },
  methods: {
    getDay () {
      let date = new Date()
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (hours >= 0 && hours <= 9) {
        hours = '0' + hours
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hours + ':' + minutes + ':' + seconds
      this.nowTime = currentdate
    },
    clickOut () {
      localStorage.removeItem('token')
    },
    getCity () {
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new Vcity.CitySelector({input: 'citySelect'})
      })
    },
    searchShow () {
      if (this.$refs.serach.style.display === 'block') {
        this.$refs.serach.style.display = 'none'
      } else {
        this.$refs.serach.style.display = 'block'
      }
    },
    searchShowt () {
      this.$refs.serach.style.display = 'block'
    },
    changeCity () {
      let Ic = this.$refs.Icity.value
      if (Ic !== ''){
        this.$store.commit('changeCity', Ic)
        if (this.page === '/') {
          window.earthFun()
          this.$store.state.inChinaMap = Ic
        }
      }
    },
    myLocation () {
      if (this.$store.state.mapTypes.length < 3){
        this.$store.commit('addMaptypes', '贵州')
        this.$store.commit('addMaptypes', '贵阳市')
      }
      this.$store.commit('changeCity', '贵阳市')
    }
  },
  computed: {
    page () {
      return this.$route.path
    },
    importCity () {
      if (this.$store.state.city === 'china') {
        return '中国'
      } else {
        return this.$store.state.city
      }
    }
  },
  mounted () {
    this.myLocation()
  },
  created () {
    this.getDay()
    this.getCity()
    setInterval(() => {
      this.getDay()
    }, 1000)
    window.onclick = () => {
      if (this.$refs.serach) {
        this.$refs.serach.style.display = 'none'
      }

    }
  }
}
</script>
