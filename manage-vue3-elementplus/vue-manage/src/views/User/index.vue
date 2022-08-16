<template>
  <div class="manage">
    <el-dialog v-model="dialogVisible" :title="operateType==='add'?'新增用户':'编辑用户'" :close-on-click-modal="false">
        <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
        <div class="dialog-footer" >
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
        </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <common-form :formLabel="formLabel" :form="searchForm" :inline="true" ref="form"  class="search-form" >
        <el-button type="primary" @click="getList(this.searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" class="tabel-wrap" 
     @editUser="editUser" @deleteUser="deleteUser" @changePage="changePage"></common-table>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue";
import CommonTable from "@/components/CommonTable.vue";
import { getUserList,editUser,addUser,delUser } from '@/api/data.js'


export default {
  name: "UserView",
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
        operateType:'add',
        dialogVisible:false,
        operateFormLabel:[
            {
                model:'name',
                label:'姓名',
                type:'input'
            },
            {
                model:'age',
                label:'年龄',
                type:'input'
            },
            {
                model:'sex',
                label:'性别',
                type:'select',
                opts:[
                    {
                        label:'男',
                        value:1
                    },
                    {
                        label:'女',
                        value:0
                    }
                ]
            },
            {
                model:'birth',
                label:'出生日期',
                type:'date'
            },
            {
                model:'addr',
                label:'地址',
                type:'input'
            }
        ],
        operateForm:{
          name:'',
          age:'',
          sex:'',
          sexLabel:'',
          birth:'',
          addr:''
        },
        formLabel:[
           {
                model:'keyword',
                label:'',
                type:'input'
            }
        ],
        searchForm:{
          keyword:'',
        },
        tableData:[],
        tableLabel:[
          {
            prop:'name',
            label:'姓名'
          },
           {
            prop:'age',
            label:'年龄'
          },
           {
            prop:'sexLabel',
            label:'性别'
          },
           {
            prop:'birth',
            label:'出生日期',
            width:200
          },
           {
            prop:'addr',
            label:'地址',
            width:320
          },
        ],
        config:{
          total:1,
          page:1,
          pageSize:20,
          loading:false
        }
    };
  },
  created(){
    this.config.loading = true
    this.getList()
  },
  methods:{
    confirm(){ //添加或编辑
      if(this.operateType === 'edit'){
        editUser(this.operateForm).then(res => {
          const {code,data} =  res.data
          if(code == 20000){
            this.dialogVisible=false
            this.$message({
              type: 'success',
              message:data.message,
            })
            this.config.loading = true
            this.getList()
          }
        })
      }else{
        addUser(this.operateForm).then(res => {
          const {code,data} =  res.data
          if(code == 20000){
            this.dialogVisible=false
            this.$message({
              type: 'success',
              message:data.message,
            })
            this.config.loading = true
            this.getList()
          }
        })
      }
    },
    addUser(){ //显示添加弹窗
      this.dialogVisible=true
      this.operateType = 'add'
      this.operateForm = {
          name:'',
          addr:'',
          age:'',
          birth:'',
          sex:'',
          sexLabel:''
      }
    },
    editUser(row){ //显示编辑弹窗
      this.dialogVisible=true
      this.operateType = 'edit'
      this.operateForm = {...row}
    },
    deleteUser(row){ //删除用户
      this.$confirm(
        "此操作将永久删除该文件，是否继续？",
        "提示",
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        delUser(row.id).then(res => {
          const {code,message} =  res.data
          if(code == 20000){
            this.$message({
              type: 'success',
              message: message,
            })
            this.config.loading = true
            this.getList()
          }else{
            this.$message({
              type: 'info',
              message: message,
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除',
        })
      })
    },
    changePage(page){ //分页
      this.config.page = page
      this.config.loading = true
      this.getList()
    },
    getList(name=''){ //获取用户列表和搜索
      this.config.loading = true
      name?this.config.page=1:''
      getUserList({
        name,
        page:this.config.page,
        limit:this.config.pageSize
      }).then(res => {
        const {code,list,count} =  res.data
        if(code == 20000){
          this.tableData = list.map(item => {
            item.sexLabel = item.sex==1?'男':'女'
            return item
          })
          // console.log(list)
          this.config.total = count
          this.config.loading = false
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.manage {
  width: 100%;
  padding-top: 20px;
  .dialog-footer{
    text-align: right;
  }
  .manage-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search-form{
      height: 32px;
      overflow: hidden;
    }
  }
  .tabel-wrap{
    margin-top: 20px;
  }
}
</style>