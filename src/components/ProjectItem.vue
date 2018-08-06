<template>
  <el-card :body-style="{ padding: '0px' }" shadow="hover" :id="item.id">
    <img src="../assets/zip.png" class="image">
    <div class="info">
      <el-row>
        <span class="name">{{item.name}}</span>
      </el-row>
      <el-row>
        <time>上传时间：{{item.uploaded_at}}</time>
      </el-row>
    </div>
    <div class="control">
      <el-button icon="el-icon-search" plain size="mini" type="primary" @click="view"></el-button>
      <el-button icon="el-icon-delete" plain size="mini" type="danger" @click="del"></el-button>
    </div>
  </el-card>
</template>

<script>
import '../assets/zip.png';

export default {
  name: 'ProjectItem',
  props: {
    item: Object,
    onRemove: {
      type: Function,
      default: () => {},
    }
  },
  methods: {
    del() {
      let self = this;
      this.$http.delete(`http://localhost:3000/api/project/${this.item.id}`)
        .then((res) => {
          window.console.log(res);
          self.onRemove();
        });
    },
    view() {
      window.open(`http://localhost:3000${this.item.url}`, '_blank');
    },
  },
};
</script>

<style scoped>
.image{
  padding: 10px;
  width: 128px;
}
time{
  font-size: 12px;
  color: #909399;
}
.name{
  font-size: 14px;
  color: #303133;
}
.info{
  border-top: 1px solid #E4E7ED;
  border-bottom: 1px solid #E4E7ED;
  padding: 5px 0;
}
.control{
  margin-top: 10px;
}
</style>
