<template>
  <el-menu default-active="/home" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose"
  background-color="#555b66" text-color="#ffffff" active-text-color="#E0B653">
    <h3 class="title">{{isCollapse?'后台':'通用后台管理系统'}}</h3>
    <el-menu-item   v-for="item in noChildren" :index="item.path" :key="item.path" @click="clickMenu(item)">
      <el-icon><component :is="item.icon" /></el-icon>
      <template #title>{{item.label}}</template>
    </el-menu-item>
    <el-sub-menu v-for="item in hasChildren" :index="item.path" :key="item.path" >
      <template #title>
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{item.label}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="subItem in item.children" :index="subItem.path" :key="subItem.path" @click="clickMenu(subItem)">
          <el-icon><component :is="subItem.icon" /></el-icon>
          <span>{{item.label}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name:'CommonAside',
  data() { 
    return {
      menu:[]
      // menu:[
      //   {
      //       path:'/home',
      //       name:'Home',
      //       label:'首页',
      //       icon:'HomeFilled',
      //       url:'Home/index'
      //   },
      //   {
      //       path:'/mall',
      //       name:'Mall',
      //       label:'商品管理',
      //       icon:'VideoPlay',
      //       url:'Mall/index'
      //   },
      //   {
      //       path:'/user',
      //       name:'User',
      //       label:'用户管理',
      //       icon:'User',
      //       url:'User/index'
      //   },
      //   {
      //       path:'/other',
      //       label:'其他',
      //       icon:'Location',
      //       children:[
      //           {
      //               path:'/page1',
      //               name:'Page1',
      //               label:'页面1',
      //               icon:'Setting',
      //               url:'Other/Page1'
      //           },
      //           {
      //               path:'/page2',
      //               name:'Page2',
      //               label:'页面2',
      //               icon:'Setting',
      //               url:'Other/Page2'
      //           }
      //       ]
      //   }
      // ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
       this.$router.push({name:item.name})
       this.$store.commit('tab/selectMenu',item)
    }
  },
  computed:{
     noChildren(){
        return this.asyncMenu !==''?this.asyncMenu.filter(item => !item.children):'' //没有子项目返回
     },
     hasChildren(){
       return this.asyncMenu !==''?this.asyncMenu.filter(item => item.children):'' //有子项目返回
     },
     isCollapse(){
       return this.$store.state.tab.isCollapse
     },
     asyncMenu(){
       return this.$store.state.tab.menu
     }
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  border: none;
  height: 100%;
  .title{
    width:100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-size: 18px;
  }
}
</style>
