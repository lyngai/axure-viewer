<template>
    <el-menu :default-active="activeIndex" class="menu" mode="horizontal">
        <el-menu-item index="1">
            <router-link to='/'>概览</router-link>
        </el-menu-item>
<!--         <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
        </el-submenu> -->
<!--         <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4">订单管理</el-menu-item> -->
    </el-menu>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: '1',
    };
  },
};
</script>

<style scoped>
.menu{
    display: flex;
    justify-content: center;
}
.el-menu-item{
    user-select: none;
}
.el-menu-item a{
    display: block;
    text-decoration: none;
}
</style>
