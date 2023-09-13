<template>
<el-card>
 <el-button type="primary" class="btn">添加分类</el-button>
 <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop=""
      label="#"
      width="50">
    </el-table-column>
    <el-table-column
      prop="name"
      label="分类名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="是否有效">
    </el-table-column>
     <el-table-column
      prop="address"
      label="排序">
    </el-table-column>
     <el-table-column
      prop="address"
      label="操作">
    </el-table-column>
  </el-table>
   <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="reports.pagenum"
        :page-sizes="[1, 2, 3, 5]"
        :page-size="reports.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
</el-card>
</template>

<script>
import { getGoodsList } from '@/api/goods'
export default {
  name: 'parameterList',
  data () {
    return {
      tableData: [],
      total: 1,
      reports: {
        query: '',
        pagenum: 1,
        pagesize: 5
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async  getData () {
      const res = await getGoodsList(this.reports)
      this.tableData = res.data
      console.log(res)
    },
    handleSizeChange (e) {
      this.reports.pagesize = e
      this.getData()
    },
    handleCurrentChange (e) {
      this.reports.pagenum = e
      this.getData()
    }

  }

}
</script>

<style lang="scss" scoped>
.btn{
  margin-bottom: 20px;
}

</style>
