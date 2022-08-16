<template>
    <el-form :model="form" label-width="120px" ref="form" :inline="inline">
        <el-form-item  v-for="item in formLabel" :key="item.label" :label="item.label">
            <el-input v-model="form[item.model]"  v-if="item.type === 'input'" :placeholder="'请输入'+item.label" />
            <el-switch v-model="form[item.model]"  v-if="item.type === 'switch'" />
            <el-date-picker v-model="form[item.model]" v-if="item.type === 'date'" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="选择日期" />
            <el-select v-model="form[item.model]" v-if="item.type === 'select'" placeholder="请选择" >
                <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item><slot></slot></el-form-item>
    </el-form>
</template>

<script>
export default{
   props:{
      formLabel:Array,
      form:Object,
      inline:Boolean //布局方式
   },
   data(){
     return{
        
     }
   }
}
</script>

<style lang="less" scoped>
.el-form--inline .el-form-item{
    margin-right: 10px;
}
</style>