<template>
  <el-card>
    <el-button type="primary" class="btn" @click="add">添加分类</el-button>
    <!-- 表格区 -->
    <tree-table
      :data="tableData"
      :columns="columns"
      :selection-type="false"
      :expand-type="false"
      show-index
      index-text="#"
      border
      :show-row-hover="false"
    >
    <template #default="obj" >
      <i class="el-icon-success" v-if="obj.row.cat_deleted=== false"></i>
       <i class="el-icon-error" v-else></i>
    </template>
    <template #order="{row}" >
           <el-tag :type="arrText[row.cat_level]">{{arr[row.cat_level]}}</el-tag>
    </template>
    <template #btn="{row}" >
<el-button type="primary" size="small" icon="el-icon-edit" @click="put(row.cat_id)">编辑</el-button>

<el-button type="danger" size="small" icon="el-icon-delete" @click="del(row.cat_id)">删除</el-button>

    </template>
    </tree-table>
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
     <!-- 添加弹框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="addClose" ref="dialog">
  <el-form :model="form" :rules="rules" ref="Form" >
    <el-form-item label="分类名称" prop="cat_name"  :label-width="formLabelWidth">
      <el-input v-model="form.cat_name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="父级分类"  :label-width="formLabelWidth">
      <el-cascader
      ref="abc"
    v-model="selectedKeys"
    :options="parentList"
    :props="props"
    clearable
    change-on-select
    :disabled="disabled"
    @change="handleChange"></el-cascader>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
  </el-card>

</template>

<script>
import { getGoodsList, addCategories, delGoodsList, IDGoodsList, putIDGoodsList } from '@/api/goods'

export default {
  name: 'parameterList',
  data () {
    return {
      tableData: [],
      list: {},
      total: 1,
      reports: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 表格属性
      columns: [{
        label: '分类名称',
        prop: 'cat_name'
      },
      {
        label: '是否有效',
        type: 'template',
        template: 'default'
      },
      {
        label: '排序',
        type: 'template',
        template: 'order'
      },
      {
        label: '操作',
        type: 'template',
        template: 'btn'
      }],
      arr: ['一级', '二级', '三级'],
      arrText: ['', 'success', 'warning'],
      // 弹出窗属性
      dialogFormVisible: false,
      formLabelWidth: '100px',

      // 表单属性,
      title: '',
      disabled: false,
      form: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0

      },
      rules: {
        cat_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      // 父级分类
      parentList: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'

      },
      // 选中的id数组
      selectedKeys: [],
      catId: null

    }
  },
  async created () {
    this.getData()
    const res = await getGoodsList({ type: 2 })
    this.parentList = res.data
    // console.log('2级子代', res)
  },
  methods: {
    async getData () {
      const res = await getGoodsList(this.reports)
      this.tableData = res.data.result
      this.total = res.data.total
      // console.log(res)
    },
    handleSizeChange (e) {
      this.reports.pagesize = e
      this.getData()
    },
    handleCurrentChange (e) {
      this.reports.pagenum = e
      this.getData()
    },
    handleChange () {
      if (this.selectedKeys.length > 0) {
        this.form.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        this.form.cat_level = this.selectedKeys.length
      } else {
        this.form.cat_pid = 0
        this.form.cat_level = 0
      }
    },
    addClose () {
      this.$refs.Form.resetFields()
      this.selectedKeys = []
      this.form.cat_pid = 0
      this.form.cat_level = 0
      this.catId = null
    },

    async submit () {
      this.$refs.Form.validate(async valid => {
        if (!valid) return
        if (this.catId) {
          const res = await putIDGoodsList(this.catId, this.form)
          this.$message.success(res.meta.msg)
          console.log(res)
        } else {
          const res = await addCategories(this.form)
          console.log(res)
          this.$message.success(res.meta.msg)
        }
        this.getData()
        this.dialogFormVisible = false
      }

      )
    },
    async add () {
      this.dialogFormVisible = true
      this.title = '添加分类'
      this.disabled = false
    },
    async put (id) {
      const res = await IDGoodsList(id)
      this.catId = res.data.cat_id
      this.form.cat_name = res.data.cat_name
      this.title = '修改分类'
      this.disabled = true
      // this.$refs.cascader.disabled = true
      // this.selectedKeys.push(res.data.cat_id)
      // console.log(this.selectedKeys)
      this.dialogFormVisible = true
      console.log(res)
    },
    async del (id) {
      this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delGoodsList(id)
        if (this.reports.pagenum === this.$refs.pagination.internalPageCount &&
          this.total % this.reports.pagesize === 1
        ) {
          this.reports.pagenum && this.reports.pagenum--
          console.log('我要返回上一页')
        }
        console.log(res)
        this.$message.success(res.meta.msg)
        this.getData()
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.btn {
  margin-bottom: 20px;
}
.el-icon-success{
  color: rgb(59, 216, 59);
  font-size: 18px;
}
.el-input{
  width: 500px;

}
</style>
