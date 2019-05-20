<template>
  <div>
    <div id="login">
      <div class="login-content">
        <div class="login-left-top"></div>
        <div class="login-right-bottom"></div>
        <img class="login-top" src="../../static/images/login-top.png" alt="">
        <div class="login-right">
          <div>
            <span style="color: red;position:absolute;">{{message}}</span>
            <div class="login-item">
              <i class="layui-icon-username"></i>
              <input class="loginInput" ref="user" name="username" placeholder="请输入用户名" type="text">
            </div>
            <div class="login-item">
              <i class="layui-icon-password"></i>
              <input class="loginInput" ref="passw" name="password" placeholder="请输入密码" type="password">
            </div>
            <button @click="submit()" id="my_button">登录</button>
          </div>
        </div>
      </div>
    </div>
    <p class="center">技术支持：广州德亨信息技术有限公司</p>
  </div>
</template>

<style scoped>
  .index-title {
    display: block;
    width: 806px;
    margin: 70px auto;
  }
  #login .login-content {
    background: url(../../static/images/login.png) no-repeat;
    background-size:1200px;
    padding-top:200px;
    height: 702px;
    width: 1200px;
    margin: 0 auto;
    top: 80px;
    position:relative;
  }
  .login-top{
    width:627px;
    display:block;
    margin:0 auto;
  }
  #login .login-right {
    width: 342px;
    margin:0 auto;
    border-radius: 10px;
    padding: 10px 30px;
  }
  #login {
    width: 100%;
  }
  .login-item {
    position: relative;
  }
  .login-left-top{
    background:url(../../static/images/lefttop.png) no-repeat;
    width:176px;
    height:176px;
    position:absolute;
    top:-30px;
    left: -30px;
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    animation: rotation 8s linear infinite;
    -moz-animation: rotation 8s linear infinite;
    -webkit-animation: rotation 8s linear infinite;
    -o-animation: rotation 8s linear infinite;
  }
  .login-right-bottom{
    background:url(../../static/images/rightbottom.png) no-repeat;
    width:155px;
    height:155px;
    position:absolute;
    bottom:-60px;
    right: -55px;
    -webkit-transform: rotate(0deg);
    animation: rotatio 8s linear infinite;
    -moz-animation: rotatio 8s linear infinite;
    -webkit-animation: rotatio 8s linear infinite;
    -o-animation: rotatio 8s linear infinite;
  }
  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
    }
  }
  @keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
    }
  }
  @keyframes rotatio {
    from {
      -webkit-transform: rotate(360deg);
      -ms-transform:rotate(360deg)
    }
    to {
      -webkit-transform: rotate(0deg);
      -ms-transform:rotate(0deg)
    }
  }
  @-webkit-keyframes rotatio {
    from {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
    }
    to {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
    }
  }
  .loginInput {
    border: 2px solid #95e0fd;
    line-height: 40px;
    height: 40px;
    width: 100%;
    margin-top: 20px;
    color:#fff;
    padding-left: 50px;
    background: rgba(0, 0, 0, 0.1);
  }
  #my_button {
    width: 143px;
    height:67px;
    line-height: 67px;
    background: url(../../static/images/confirm_yes.png) no-repeat;
    border: none;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
    display:block;
    font-size:17px;
    margin:0 auto;
    margin-top: 50px;
  }

  .login-item i {
    position: absolute;
    top: 23px;
    width: 42px;
    height: 39px;
  }
  p.center {
    line-height: 65px;
    color: #999;
    margin-top: 80px;
  }
  .center {
    text-align: center;
  }
  .layui-icon-username{
    background:url(../../static/images/user.png) no-repeat;
  }
  .layui-icon-password{
    background:url(../../static/images/password.png) no-repeat;
  }
</style>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    submit () {
      this.axios.post('http://119.23.160.82:8763/hjjc-api/user/login', {
        'userAccount': this.$refs.user.value,
        'userPassword': this.$refs.passw.value
      }).then(resp => {
        if (resp.data.success) {
          localStorage.setItem('token',JSON.stringify(resp.data.data.token))
          this.$router.push({ path: '/'})
        } else {
          this.message = resp.data.message
        }
      })
    }
  },
  beforeCreate () {
    // document.querySelector('body').setAttribute('style', 'background:#fff')
  },
  beforeDestroy () {
    // document.querySelector('body').setAttribute('style', '')
  }
}
</script>
