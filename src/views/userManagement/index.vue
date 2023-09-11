<template>
  <el-card class="box-card">
    <div class="header">
      <el-input placeholder="请输入内容" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary">添加用户</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="邮箱"> </el-table-column>
      <el-table-column prop="address" label="电话"> </el-table-column>
      <el-table-column prop="address" label="角色"> </el-table-column>
      <el-table-column prop="address" label="状态"> </el-table-column>
      <el-table-column prop="address" label="操作"> </el-table-column>
    </el-table>
 <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      :current-page="datalist.pagenum"
      :page-sizes="[1,2,5,10]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </el-card>
</template>

<script>
import { getUsers } from '@/api/user'
export default {
  name: 'userMnagement',
  data () {
    return {
      datalist: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 总页数
      total: 0,

      tableData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await getUsers(this.datalist)
      this.tableData = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    handleSizeChange () {

    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  margin-bottom: 20px;
  .el-input {
    width: 350px;
    margin-right: 20px;
  }
}
.footer{
display: flex;
align-items: center;
}
</style>
