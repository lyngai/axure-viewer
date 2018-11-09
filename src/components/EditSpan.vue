<template>
  <div v-if="!isEdit">
    <span class="editable-span" title="点击编辑" @click="startEdit">{{value}}</span>
  </div>
  <div v-else>
    <el-input
      ref="edit-input"
      class="edit-input"
      size="mini"
      :value="value"
      @keyup.enter.native="saveEdit"
      @keyup.esc.native="cancelEdit"
      />
    <el-button
      type="text"
      size="mini"
      title="点击保存"
      icon="el-icon-check"
      @click="saveEdit"
      />
    <el-button
      type="text"
      size="mini"
      title="点击取消"
      icon="el-icon-circle-close"
      @click="cancelEdit"
      />
  </div>
</template>

<script>

export default {
  name: 'EditSpan',
  props: {
    context: String,
    afterEdit: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isEdit: false,
      value: this.context,
    };
  },
  methods: {
    startEdit() {
      this.isEdit = true;
      this.$nextTick(() => {
        this.$refs['edit-input'].$refs.input.focus();
      });
    },
    saveEdit() {
      this.isEdit = false;
      this.value = this.$refs['edit-input'].$refs.input.value;
      this.afterEdit(this.value);
    },
    cancelEdit() {
      this.isEdit = false;
    },
  },
};
</script>

<style scoped>
.editable-span {
  padding: 0 1em;
  cursor: pointer;
}
.editable-span:hover {
  border: 1px solid #409EFF;
  padding: 0 calc(1em - 1px);
  border-radius: 3px;
}
.edit-input {
  width: 70%;
}
.el-button+.el-button {
  margin-left: 1px;
}
</style>
<style>
.edit-input .el-input__inner {
  padding: 0 .8em;
}
</style>
