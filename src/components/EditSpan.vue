<template>
  <div v-if="!isEdit">
    <span>{{value}}</span>
    <el-button class="edit-btn" icon="el-icon-edit" size="mini" type="text" @click="startEdit" title="点击编辑"/>
  </div>
  <div v-else>
    <el-input class="edit-input" ref="edit-input" :value="value" size="mini"/>
    <el-button icon="el-icon-check" size="mini" type="text" @click="saveEdit" title="点击保存"/>
    <el-button icon="el-icon-circle-close" size="mini" type="text" @click="cancelEdit" title="点击取消"/>
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
      value: this.context
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
    }
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