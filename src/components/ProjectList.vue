<template>
  <div class="container" v-loading="pending">
    <project-item v-for="item in list"
                  :key="item.id"
                  :item="item"
                  :onRemove="handleChange"
                  class="item"
                  />
    <el-upload
      class="item"
      name="file"
      ref="upload"
      action="http://localhost:3000/api/project"
      method="post"
      list-type="picture-card"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :before-upload="handlePending"
      :before-remove="handlePending"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import ProjectItem from './ProjectItem';
import '../assets/zip.png';

export default {
  name: 'ProjectList',
  data() {
    return {
      list: [],
      pending: true,
    };
  },
  mounted() {
    this.updateList();
  },
  methods: {
    updateList() {
      this.pending = true;
      const self = this;
      this.$http.get('http://localhost:3000/api/project')
        .then((res) => {
          self.list = res.data.data;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          self.pending = false;
        });
    },
    handleChange() {
      this.updateList();
    },
    handleSuccess() {
      this.$refs.upload.clearFiles();
    },
    handlePending() {
      this.pending = true;
    },
  },
  components: {
    'project-item': ProjectItem,
  },
};
</script>

<style scoped>
.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
}
.item{
  margin: 10px 10px;
  padding: 0 10px 10px;
}
</style>
