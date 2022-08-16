<template>
    <div class="tags">
        <el-tag :closable="item.name!=='Home'" size="small"  @close="handleClose(item,index)" v-for="(item,index) in tabsList" :key="item.path" 
        :effect="$route.name === item.name?'dark':'plain'" @click="changeMenu(item)">{{item.label}}</el-tag>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default{
    data(){
        return{

        }
    },
    methods:{
        ...mapMutations('tab',['closeTag']),
        handleClose(item,index){
          const length = this.tabsList.length -1
          let nextItem = ''
          if(item.name === this.$route.name){
            if(index === length){
              nextItem = this.tabsList[index - 1]
            }else{
              nextItem = this.tabsList[index + 1]
            }
            this.$router.push({ name: nextItem.name })
            this.$store.commit('tab/setCurrentMenu',nextItem)
          } 
          this.closeTag(item)
        },
        changeMenu(item){
          this.$router.push({name:item.name})
          this.$store.commit('tab/setCurrentMenu',item)
        }
    },
    computed: {
      ...mapState({'tabsList':state => state.tab.tabsList})
    },
}
</script>

<style lang="less" scoped>
.el-tag{
    margin-right: 10px;
    height: 25px;
}
</style>