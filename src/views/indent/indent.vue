<template>
  <el-card>
    <el-input placeholder="请输入内容" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="d" label="" width="50"> </el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="250">
      </el-table-column>
      <el-table-column prop="order_price" label="订单价格"> </el-table-column>
      <el-table-column prop="pay_status" label="是否付款"> </el-table-column>
      <el-table-column prop="is_send" label="是否发货"> </el-table-column>
      <el-table-column prop="update_time" label="下单时间"> </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="{ row }">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="success"
            icon="el-icon-location"
            size="mini"
            @click="express(row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="variate.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="variate.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 物流弹框 -->
    <el-dialog
      title="物流进度"
      :visible.sync="dialogVisible"
      width="50%"

    >
    <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>

    </el-dialog>
  </el-card>
</template>

<script>
import { orders, logistics } from '@/api/orders'
export default {
  name: 'indentList',
  data () {
    return {
      total: 1,
      variate: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      list: [],
      dialogVisible: false,
      reverse: false,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await orders(this.variate)
      this.list = res.data.goods
      this.total = res.data.total
      console.log(res.data.goods)
    },
    handleSizeChange (e) {
      this.variate.pagesize = e
      this.getData()
    },
    handleCurrentChange (e) {
      this.variate.pagenum = e
      this.getData()
    },
    /* 物流 */
    async express (id) {
      this.dialogVisible = true
      const res = await logistics(id)
      console.log(res.data)
      this.activities = res.data.map(item => ({
        content: item.context,
        timestamp: item.time
      }))
    }

  }
}
</script>

<style  lang="scss" scoped>
.input-with-select {
  width: 400px;
  margin-bottom: 20px;
}
.el-table {
  margin-bottom: 20px;
}
</style>
