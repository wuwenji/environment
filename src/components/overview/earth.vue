<template>
  <div class="earth_all">
    <iframe id="earth" src="../../../static/demo/index/map3d.html" frameborder="0"></iframe>
  </div>
</template>

<style scoped>
  #earth{
    width:100%;
    height:100%;
  }
  .earth_all{
    height:100%;
  }
</style>

<script>
export default{
  methods: {
    returns () {
      document.getElementById('earth').src = '../../../static/demo/index/map3d.html'
    }
  }
}
</script>
