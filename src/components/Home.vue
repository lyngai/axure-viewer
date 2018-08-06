<template>
  <div>
    <h5>{{msg}}</h5>
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
      msg: '请上传Axure发布生成的zip文件以生成预览',
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
