<template>

    <el-card>
     <div class="main" style="width: 750px;height:400px;" ref="main"></div>
    </el-card>

</template>

<script>
// 1. 导入 echarts
import * as echarts from 'echarts'
import { reports } from '@/api/rights'
export default {
  data () {
    return {
      list: []

    }
  },
  async created () {

  },
  // 此时，页面上的元素，已经被渲染完毕了！所以要将初始化放到这里 而不是created里

  methods: {},
  async mounted () {
    const res = await reports()
    this.list = res.data.series
    console.log(res.data.series)
    const myChart = echarts.init(this.$refs.main)
    myChart.setOption({
      color: [
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae'

      ],
      title: {
        text: '用户来源'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: this.list.map(ele => ele.name)
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['2017-12-27', '2017-12-28', '2017-12-29', '2017-12-30', '2017-12-31', '2018-1-1']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: this.list[0].name,
          type: 'line',
          stack: 'Total',
          areaStyle: { color: '#c23531' },
          emphasis: {

          },
          data: this.list[0].data
        },
        {
          name: this.list[1].name,
          type: 'line',
          stack: 'Total',
          areaStyle: { color: '#6e7d88' },
          emphasis: {
            focus: 'series'
          },
          data: this.list[1].data
        },
        {
          name: this.list[2].name,
          type: 'line',
          stack: 'Total',
          areaStyle: { color: '#91bdc3' },
          emphasis: {

          },
          data: this.list[2].data
        },
        {
          name: this.list[3].name,
          type: 'line',
          stack: 'Total',
          areaStyle: { color: '#e1a894' },
          emphasis: {

          },
          data: this.list[3].data
        },
        {
          name: this.list[4].name,
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: { color: '#acd2c0' },
          emphasis: {

          },
          data: this.list[4].data
        }
      ]
    }

    )
  }
}
</script>

<style lang="less" scoped>
</style>
