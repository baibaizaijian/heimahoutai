<template>
  <el-card>
    <div class="header">
      <el-input placeholder="请输入内容" class="input-with-select" v-model="reports.query">
        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
      </el-input>
      <el-button type="primary" @click="$router.push('/goods/add')"
        >添加商品</el-button
      >
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="" label="" width="50"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
      <el-table-column prop="goods_price" label="商品价格（元）" width="150">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="80">
      </el-table-column>
      <el-table-column prop="upd_time" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="" label="操作" width="200">
        <template #default="obj">
          <el-tooltip
            class="item"
            effect="dark"
            content="修改用户"
            placement="top"
          >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="put(obj.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除用户"
            placement="top"
          >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="del(obj.row.goods_id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        ref="pagination"
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
import { getGoods, delGoods } from '@/api/goods'
export default {
  name: 'goodsList',
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
  async created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await getGoods(this.reports)
      this.tableData = res.data.goods
      this.total = res.data.total
      this.reports.query = ''
    },
    handleSizeChange (e) {
      this.reports.pagesize = e
      this.getData()
    },
    handleCurrentChange (e) {
      this.reports.pagenum = e
      this.getData()
    },
    async del (id) {
      const res = await delGoods(id)
      if (this.reports.pagenum === this.$refs.pagination.internalPageCount &&
          this.total % this.reports.pagesize === 1
      ) {
        this.reports.pagenum && this.reports.pagenum--
        console.log('我要返回上一页')
      }
      this.$message.success(res.meta.msg)
      this.getData()
    },
    put () {

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
</style>
