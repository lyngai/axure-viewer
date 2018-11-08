<template>
  <div class="container" v-loading="pending">
    <span class="tips" v-show="pending">{{tips}}</span>
    <template v-for="item in list">
      <project-item
        class="item"
        :key="item.id"
        :item="item"
        :onRemove="handleChange"
        :onChange="handleChange"
        />
    </template>
    <div class="item uploads-group">
      <el-upload
        name="file"
        ref="upload"
        action="/api/project"
        list-type="picture-card"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="handlePending"
        :before-remove="handlePending"
        :http-request="handleUpload"
        >
        <i class="el-icon-plus" />
      </el-upload>
<!--       <el-upload-folder
        name="folder"
        ref="upload-folder"
        action="http://localhost:3000/api/project/folder"
        list-type="picture-card"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="handlePending"
        :before-remove="handlePending"
        :http-request="handleUploadFolder"
        >
         <span>上传文件夹</span>
         <i class="el-icon-plus" />
      </el-upload-folder> -->
    </div>
  </div>
</template>

<script>
import ProjectItem from './ProjectItem';

export default {
  name: 'ProjectList',
  data() {
    return {
      tips: '若加载时间过长，请使用Chrome浏览器...',
      list: [],
      pending: false,
    };
  },
  mounted() {
    // console.log(this.$refs.upload);
    this.updateList();
  },
  methods: {
    updateList() {
      this.pending = true;
      const self = this;
      this.$http.get('/api/project')
        .then((res) => {
          self.list = res.data.data;
        })
        .catch((err) => {
          self.$message.error(`(${err.code}) 拉取项目列表失败`);
        })
        .finally(() => {
          self.pending = false;
        });
    },
    handleChange() {
      this.updateList();
    },
    handleSuccess() { // param: res
      this.$refs.upload.clearFiles();
      this.$message.success('压缩包校验通过，已生成预览');
    },
    handleError(err) {
      if (err instanceof String) {
        this.$message.error(err);
      } else {
        this.$message.error(`错误：${err.data.msg}`);
      }
    },
    handlePending() {
      this.pending = true;
    },
    handleUpload(option) {
      /* process data */
      const formData = new FormData();
      if (option.data) {
        Object.keys(option.data).forEach((key) => {
          formData.append(key, option.data[key]);
        });
      }
      formData.append(option.filename, option.file, option.file.name);
      /* data prepared */
      this.$http.post(option.action, formData, {
        onUploadProgress(e) {
          if (e.total > 0) { e.percent = (e.loaded / e.total) * 100; }
          option.onProgress(e);
        },
      }).then((res) => {
        option.onSuccess(res.data);
      }).catch((err) => {
        option.onError(err.response || err.response.error || err.responseText || 'fail to make request');
      });
    },
    // handleUploadFolder(option) {
    //   // console.log(option);
    // },
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
.tips{
  font-size: 12px;
  color: #909399;
  position: absolute;
  top: 0;
  z-index: 9000;
  white-space: none;
}
.item{
  margin: 10px 10px;
  padding: 0 10px 10px;
}
.uploads-group {
  display: flex;
}
</style>
