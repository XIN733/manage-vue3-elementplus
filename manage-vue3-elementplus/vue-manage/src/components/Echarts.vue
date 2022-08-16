<template>
  <div ref="echart"></div>
</template>

<script>
import { markRaw } from 'vue';
import * as echarts from "echarts";

export default {
  props: {
    isChart: { //判断是哪个类型的图表,1折线图  2柱状图  3饼图
      type: Number,
      value: 0,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  data() {
    return {
      lineChartOption: { //折线图
        legend: {
          textStyle: { color: "#333" },
        },
        grid: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#75B3EC",
          "#FBD0A9",
          "#CF8A92",
          "#B8A8E1",
        ],
        series: [],
      },
      barGraphOption: { //柱状图
        legend: {
          textStyle:{color:'#333'}
        },
        grid:{
          left:'20%',
        },
        tooltip:{
           trigger: 'axis'
        },
        xAxis: {
          type:'category',
          data: [],
          axisLine:{
            lineStyle:{
              color:'#17b3a3'
            }
          },
          axisLabel:{
            interval:0,
            color:'#333'
          }
        },
        yAxis: [
          {
            type:'value',
            axisLine:{
              lineStyle:{
                color:'#17b3a3'
              }
            }
          }
        ],
        color:['#2ec7c9','#b6a2de'],
        series:[]
      },
      pieChartOption: { //饼状图
        tooltip:{
           trigger: 'item'
        },
        color:['#8f78f4','#dd536b','#9462e5','#a6a6a6','#e1bb22','#39c362','#3ed1cf'],
        series: []
      },
      echart: null,
    };
  },
  methods: {
    initChart() {
      this.initChartData();
      if (this.echart) { //如果存在echart直接渲染
        this.echart.setOption(this.options);
      } else {
        this.echart = markRaw(echarts.init(this.$refs.echart));
        this.echart.setOption(this.options);
      }
    },
    initChartData() {
      if (this.isChart == 1) {
        this.lineChartOption.xAxis.data = this.chartData.xData;
        this.lineChartOption.series = this.chartData.series;
      }else if(this.isChart == 2){
        this.barGraphOption.xAxis.data = this.chartData.xData;
        this.barGraphOption.series = this.chartData.series;
      } else if(this.isChart == 3){
        this.pieChartOption.series = this.chartData.series;
      }
    },
  },
  computed: {
    options() {
      return this.isChart==1 ? this.lineChartOption : this.isChart==2 ? this.barGraphOption : this.pieChartOption ;
    },
  },
  watch: {
    chartData: {
      handler() {
        this.initChart();
      },
      deep: true,
    },
  },
};
</script>


