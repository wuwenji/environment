<template>
  <div>
    <footer v-if="this.$route.path == '/'">
      <div class="footer1">
        <box-component>
          <p>版权所有：广州德亨信息技术有限公司（蒋朝哲--首席科学家）</p>
          <p>
            技术合作：
            <a href="https://uwaterloo.ca/" target="_blank">加拿大滑铁卢大学</a>
            <a href="https://www.imperial.ac.uk/" target="_blank">英国皇家理工学院</a>
            <a href="http://www.sysu.edu.cn/2012/cn/index.htm" target="_blank">广东中山大学</a>
            &nbsp;&nbsp;数据合作：
            <a href="http://www.cnemc.cn/" target="_blank">国家环境监测网</a>
            <a href="http://www.chndaqi.com/" target="_blank">中国大气网</a>
            <a href="http://data.cma.cn/" target="_blank">中国气象数据网</a>
          </p>
        </box-component>
      </div>
    </footer>
    <footer v-else>
      <div class="footer2">版权所有：广州德亨信息技术有限公司</div>
    </footer>
  </div>
</template>

<style scoped>
  .footer1{
    margin:0 15px 0 10px;
  }
  .footer1 p,.footer1 a{
    text-align: center;
    line-height: 25px;
    color: #0e74e3;
  }
  .footer2{
    line-height: 50px;
    border-top: 1px solid #202b59;
    background: rgba(15, 21, 47, 0.6);
    text-align: center;
  }
</style>

<script>
import boxComponent from '../components/overview/box'
export default {
  components: {
    boxComponent
  }
}
</script>
