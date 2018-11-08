<template>
  <div v-if="!isEdit">
    <span>{{value}}</span>
    <el-button
      class="edit-btn"
      type="text"
      size="mini"
      title="点击编辑"
      icon="el-icon-edit"
      @click="startEdit"
      />
  </div>
  <div v-else>
    <el-input
      ref="edit-input"
      class="edit-input"
      size="mini"
      :value="value"
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
.edit-btn {
  position: absolute;
  top: -3px;
}
.edit-input {
  width: 65%;
}
</style>
