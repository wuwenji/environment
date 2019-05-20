<template>
  <div class="left-bottom box">
    <div class="box-c boxspan">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .box {
    position: relative;
    padding: 1px;
  }
  .left-bottom {
    margin-top: 17px;
    position: relative;
    left: 0;
  }
  .box-c{
    background:rgba(255, 255, 255, 0.02);
    padding:10px;
    position:relative;
    border-radius: 10px;
  }
</style>

<script></script>
