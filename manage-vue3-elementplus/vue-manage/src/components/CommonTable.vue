<template>
  <div class="common-table">
    <el-table :data="tableData" height="calc(100% - 35px)" stripe>
      <el-table-column
        show-overflow-tooltip
        :prop="item.prop"
        :label="item.label"
        :width="item.width?item.width:125"
        v-for="item in tableLabel"
        :key="item.prop">
        <!-- <template #default="scope">
          <span style="margin-left:10px;">{{scope.row[item.prop]}}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="operations" label="操作" min-width="180">
          <template #default="scope">
            <el-button @click="editUser(scope.row)" size="mini">编辑</el-button>
            <el-button type="danger" @click="deleteUser(scope.row)" size="mini">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="config.total" :current-page="config.page"
     @current-change="changePage" :page-size="config.pageSize"/>
  </div>
</template>
<script>
export default {
  props: {
    tableData:Array,
    tableLabel:Array,
    config:Object
  },
  data() {
    return {};
  },
  methods:{
    editUser(row){
      this.$emit('editUser',row)
    },
    deleteUser(row){
      this.$emit('deleteUser',row)
    },
    changePage(page){
      this.$emit('changePage',page)
    }
  }
};
</script>

<style lang="less" scoped>
.common-table{
  background-color: #fff;
  height: calc(100vh - 200px);
  overflow: hidden;
  position: relative;
  .el-table{
    height: 90%;
    width: 100%;
  }
  .el-pagination{
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
}
</style>