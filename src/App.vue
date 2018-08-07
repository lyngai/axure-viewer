<template>
  <el-container id="app">
    <el-header>
      <ax-header/>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer style="height: auto">
      <ax-footer/>
    </el-footer>
  </el-container>
</template>

<script>

import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

export default {
  name: 'App',
  components: {
    'ax-header': Header,
    'ax-footer': Footer,
  },
};
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: "PingFang SC","Helvetica Neue",Helvetica,
      "Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-footer{
  bottom: 0;
  width: 100%;
}
</style>
