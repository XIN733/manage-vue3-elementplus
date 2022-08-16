<template>
  <header>
    <div class="l-content">
      <el-button icon="Menu" size="mini" @click="clickMenu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item  :class="currentMenu.name==item.name?'el-breadcrumb-item active':'el-breadcrumb-item'" :to="{ path: item.path }"
         v-for="item in tabsList" :key="item.path" @click="setCurrentMenu(item)">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span>
          <img :src="userImg" alt="" class="user-header" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      userImg: require("@/assets/images/user.jpeg"),
    };
  },
  methods: {
    clickMenu() {
      this.$store.commit("tab/setCollapseMenu");
    },
    setCurrentMenu(val){
      this.$store.commit('tab/setCurrentMenu',val)
    },
    logOut(){
      this.$store.commit('tab/clearMenu')
      this.$store.commit('user/clearToken')
      this.$router.push({name:'Login'})
    }
  },
  computed: {
    ...mapState({
      'tabsList':state => state.tab.tabsList,
      'currentMenu':state => state.tab.currentMenu
    })
  },
};
</script>

<style lang="less" scoped>
header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .l-content {
    display: flex;
    align-items: center;
    .el-breadcrumb{
      margin-left: 20px;
      .el-breadcrumb-item /deep/ .el-breadcrumb__inner {
        color: #A8ABB2 ;
        &:hover{
          opacity: 0.7;
        }
      }
      .el-breadcrumb-item.active  /deep/ .el-breadcrumb__inner{
        color: #fff ;
        &:hover{
          opacity: 0.8;
        }
      }
    }
  }
  .r-content {
    .user-header {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
}
</style>