<template>
    <div class="footer">
        <p>Axure Viewer By LamYin Ngai</p>
        <p>Themed By Element-ui</p>
    </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      activeIndex: '1',
    };
  },
};
</script>

<style scoped>
.footer {
    font-size: 13px;
    color: #909399;
    border-top: solid 1px #e6e6e6;
    padding: 15px;
}
</style>
