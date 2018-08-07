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
      <el-button icon="el-icon-search" plain size="mini" type="primary" @click="view"/>
      <el-button ref="copy" icon="el-icon-document" plain
                  size="mini" type="success" @click="copy"/>
      <el-button icon="el-icon-delete" plain size="mini" type="danger" @click="del"/>
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
    },
  },
  methods: {
    del() {
      const self = this;
      this.$confirm('是否删除该项目？', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => self.$http.delete(`/api/project/${this.item.id}`))
        .then(() => { // param: res
          this.$message({ type: 'success', message: '删除成功!' });
        })
        .catch((err) => {
          if (err !== 'cancel') {
            this.$message({ type: 'error', message: '删除出现异常！' });
          }
        })
        .finally(() => {
          self.onRemove();
        });
    },
    view() {
      window.open(`${this.item.url}/`, '_blank');
    },
    copy() {
      this.$copyString(this.$refs.copy.$el, `${window.location.origin}${this.item.url}/`);
      this.$message.success('网址成功复制到剪切板');
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
