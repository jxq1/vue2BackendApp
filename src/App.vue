<template>
  <div id="app">
    <!-- <el-row>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
    </el-row> -->
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style lang="less">
html,body,h3,p {
  margin: 0;
  padding: 0;
  // overflow: hidden;
}
.el-aside{
  overflow: hidden;
}
</style>
