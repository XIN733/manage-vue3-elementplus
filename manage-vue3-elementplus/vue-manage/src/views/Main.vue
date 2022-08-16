<template>
  <el-container>
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main>
        <common-tag></common-tag>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import CommonTag from "@/components/CommonTag.vue";

export default {
  name:'MainView',
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  },
  data() {
    return {
     
    };
  },
  methods:{
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header{
    background-color: #343334;
  }
  .el-main{
    background-color: #F5F4F6;
  }
}
</style>