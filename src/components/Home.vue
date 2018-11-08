<template>
  <div>
    <h5>{{msg}}</h5>
    <h5 v-html="domMsg" />
    <el-row type="flex" justify="center">
        <el-card shadow="never" class="project-list">
          <project-list />
        </el-card>
    </el-row>
  </div>
</template>

<script>
import ProjectList from './ProjectList';

export default {
  name: 'Home',
  data() {
    return {
      msg: '请上传Axure发布生成的zip或tar文件以生成预览，文件夹上传仅限Chrome浏览器',
      domMsg: '推荐使用tar格式，<a href="https://www.7-zip.org/" target="_blank">前往下载7-zip工具</a>'
    };
  },
  components: {
    'project-list': ProjectList,
  },
};
</script>

<style scoped>
h1,h2,h3,h4,h5{
  color: #303133;
}
.projext-list{
  max-width: 66.67%;
}
</style>
