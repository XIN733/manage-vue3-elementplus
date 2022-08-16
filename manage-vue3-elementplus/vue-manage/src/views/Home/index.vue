<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:20px;">
      <el-card shadow="hover" class="user-box">
        <div class="user">
          <img :src="userImg" alt="" />
          <div class="user-info">
            <div class="name">Admin</div>
            <div class="access">超级管理员</div>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" class="tableData-box">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, index) in tableLabel"
            :key="index"
            :prop="index"
            :label="val"
          />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:20px;">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" shadow="hover" :body-style="{ padding: 0 }">
          <div class="card-content">
            <div class="icon-box" :style="{ 'background-color': item.color }">
              <component :is="item.icon" class="icon"></component>
            </div>
            <div class="text-box">
              <div class="price">￥{{ item.value }}</div>
              <div class="label">￥{{ item.name }}</div>
            </div>
          </div>
        </el-card>
      </div>
      <el-card class="chart line-chart" shadow="hover" >
         <!-- <div id="lineChart" ref="lineChart"></div> -->
         <echarts :isChart="1"  :chartData="lineChartData" id="lineChart"></echarts>
      </el-card>
      <div class="charts">
        <el-card class="chart bar-graph" shadow="hover" >
          <!-- <div id="barGraph" ref="barGraph"></div> -->
          <echarts :isChart="2"  :chartData="barGraphData" id="barGraph"></echarts>
        </el-card>
        <el-card class="chart pie-chart" shadow="hover">
          <!-- <div id="pieChart" ref="pieChart"></div> -->
          <echarts :isChart="3"  :chartData="pieChartData" id="pieChart"></echarts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import { markRaw } from 'vue';
// import * as echarts from 'echarts'
import { getData } from '@/api/data.js'
import Echarts from '@/components/Echarts.vue'

export default {
  name: "HomeView",
  components:{
     Echarts
  },
  data() {
    return {
      userImg: require("@/assets/images/user.jpeg"),
      tableData:[],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
        {
          name: "今日支收藏订单",
          value: 210,
          icon: "StarFilled",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "GoodsFilled",
          color: "#52ACF4",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "StarFilled",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "GoodsFilled",
          color: "#52ACF4",
        },
      ],
      lineChartData:{xData:[],series:[]},
      barGraphData:{xData:[],series:[]},
      pieChartData:{xData:[],series:[]},
      // lineChart:'', //折线图实例
      // barGraph:'', //柱状图实例
      // pieChart:'',  //饼图实例
    };
  },
  mounted(){
    getData().then(res => {
      const {code,data} =  res.data
      // console.log(res)
      if(code == 20000){
        this.tableData = data.tableData 
        this.setLineChart(data.orderData)
        this.setBarGraph(data.userData)
        this.setPieChart(data.videoData)
      }
    })
    // this.$http.get('/user?ID=12345')
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //  });

 },
  methods:{
    setLineChart(order){
      const keyArray = Object.keys(order.data[0]) 
      const series = []
      keyArray.forEach(key=>{
         series.push({
           name:key,
           data:order.data.map(item => item[key]),
           type: 'line'
         })
      })
      this.lineChartData.xData = order.date
      this.lineChartData.series = series
    },
    setBarGraph(user){
      this.barGraphData.xData = user.map(item => item.date)
      this.barGraphData.series = [
          {
            name:'新增用户',
            data:user.map(item => item.new),
            type: 'bar'
          },
          {
            name:'活跃用户',
            data:user.map(item => item.active),
            type: 'bar'
          }
        ]
    },
    setPieChart(video){
      this.pieChartData.series = [{
        type:'pie',
        data:video
      }]
    },
    // setLineChart(order){
    //   const keyArray = Object.keys(order.data[0]) 
    //   const series = []
    //   keyArray.forEach(key=>{
    //      series.push({
    //        name:key,
    //        data:order.data.map(item => item[key]),
    //        type: 'line'
    //      })
    //   })
    //   const option = {
    //     legend: {
    //       data:keyArray,
    //       textStyle:{color:'#333'}
    //     },
    //     grid:{
    //       left:'20%',
    //     },
    //     tooltip:{
    //        trigger: 'axis'
    //     },
    //     xAxis: {
    //       type:'category',
    //       data: order.date,
    //       axisLine:{
    //         lineStyle:{
    //           color:'#17b3a3'
    //         }
    //       },
    //       axisLabel:{
    //         interval:0,
    //         color:'#333'
    //       }
    //     },
    //     yAxis: [
    //       {
    //         type:'value',
    //         axisLine:{
    //           lineStyle:{
    //             color:'#17b3a3'
    //           }
    //         }
    //       }
    //     ],
    //     color:['#2ec7c9','#b6a2de','#75B3EC','#FBD0A9','#CF8A92','#B8A8E1'],
    //     series: series
    //   }
    //   this.lineChart = markRaw(echarts.init(this.$refs.lineChart)) ;
    //   this.lineChart.setOption(option)
    // },
    // setBarGraph(user){
    //   const option = {
    //     legend: {
    //       textStyle:{color:'#333'}
    //     },
    //     grid:{
    //       left:'20%',
    //     },
    //     tooltip:{
    //        trigger: 'axis'
    //     },
    //     xAxis: {
    //       type:'category',
    //       data: user.map(item => item.date),
    //       axisLine:{
    //         lineStyle:{
    //           color:'#17b3a3'
    //         }
    //       },
    //       axisLabel:{
    //         interval:0,
    //         color:'#333'
    //       }
    //     },
    //     yAxis: [
    //       {
    //         type:'value',
    //         axisLine:{
    //           lineStyle:{
    //             color:'#17b3a3'
    //           }
    //         }
    //       }
    //     ],
    //     color:['#2ec7c9','#b6a2de'],
    //     series: [
    //       {
    //         name:'新增用户',
    //         data:user.map(item => item.new),
    //         type: 'bar'
    //       },
    //       {
    //         name:'活跃用户',
    //         data:user.map(item => item.active),
    //         type: 'bar'
    //       }
    //     ]
    //   }
    //   // 因为vue3中的数据对象是用的proxy监听的，要取值需要用value等方法取出来。那解决方法就有了，直接让echarts从监听对象变成普通对象就ok了
    //   this.barGraph = markRaw(echarts.init(this.$refs.barGraph)) ; 
    //   this.barGraph.setOption(option)
    // },
    // setPieChart(video){
    //   const option = {
    //     tooltip:{
    //        trigger: 'item'
    //     },
    //     color:['#8f78f4','#dd536b','#9462e5','#a6a6a6','#e1bb22','#39c362','#3ed1cf'],
    //     series: [
    //       {
    //         type:'pie',
    //         data:video
    //       }
    //     ]
    //   }
    //   this.pieChart = echarts.init(this.$refs.pieChart); 
    //   this.pieChart.setOption(option)
    // }
  },
};
</script>

<style lang="less" scoped>
.home {
  .el-col{
    padding: 0 8px !important;
  }
  .user-box {
    .user {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding-bottom: 15px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .user-info {
        margin-left: 30px;
        .name {
          font-size: 24px;
        }
        .access {
          font-size: 10px;
          color: #999;
        }
      }
    }
    .login-info {
      line-height: 25px;
      padding-top: 15px;
      p {
        font-size: 10px;
        color: #999;
        span {
          padding-left: 30px;
        }
      }
    }
  }
  .tableData-box {
    margin-top: 18px;
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    .el-card {
      width: calc((100% - 40px) / 3);
      margin: 0 20px 18px 0;
      border: 0;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      .card-content {
        display: flex;
        align-items: center;
        .icon-box {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon {
            width: 40%;
            color: #fff;
          }
        }
        .text-box {
          flex: 1;
          height: 60px;
          padding-left: 15px;
          border: 1px solid #e4e7ed;
          border-left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .price {
            font-size: 22px;
          }
          .label {
            font-size: 12px;
            color: #999;
            margin-top: 2px;
          }
        }
      }
    }
  }
  .line-chart{
    height: 280px;
    margin-bottom: 18px;
    #lineChart{
      height: 280px;
    }
  }
  .charts{
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .chart{
      width: calc((100% - 18px) / 2);
      height: 100%;
    }
    .bar-graph{
      #barGraph{
        height: 280px;
      }
    }
    .pie-chart{
        #pieChart{
          height: 240px;
        }
    }
  }
}
</style>