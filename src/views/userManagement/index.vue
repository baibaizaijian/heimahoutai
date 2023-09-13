<template>
  <el-card class="box-card">
    <div class="header">
      <el-input placeholder="请输入内容" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
      <!-- 添加用户弹出框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="addForm">
          <el-form-item label="用户名" label-width="80px" prop="username">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="80px" prop="password">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="80px" prop="email">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" label-width="80px" prop="mobile">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改用户的对话框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
      >
        <el-form
          :model="editForm"
          :rules="rules"
          ref="editForm"
          label-width="70px"
        >
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配角色框 -->
      <el-dialog
      title="分配角色"
      :visible.sync="setRoleVisible"
      width="50%">
      <div>
        <p>当前的用户：123</p>
        <p>当前的角色：1231</p>
        <p>
          分配新角色：
          <el-select  placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :value="item.id"
              :label="item.roleName"
            >
            </el-option>
          </el-select>
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="" width="50">
        <template #default="obj">{{ obj.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column label="状态">
        <!-- 作用域插槽 新版是v-slot="scope" scope.row代表这一行的所有数据 这是从上面userlist里拿出来的 -->
        <!-- 将开关的状态和数据里的mg_state绑定 -->
        <template #default="obj">
          <el-switch
            v-model="obj.row.mg_state"
            @change="put(obj.row.id, obj.row.mg_state)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
               @click="editUser(obj.row.id)"
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
              @click="open(obj.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="分配角色"
            placement="top"
          >
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-s-tools"
              @click="setRoleVisible = true"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="datalist.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="datalist.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import { getUsers, addUsers, delUsers, putUsers, getUser, putUser, getRole } from '@/api/user'

export default {
  name: 'userMnagement',
  data () {
    // 验证邮箱的自定义规则（查看element）
    const checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式（ppt有）
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        /* 校验通过 */
        return cb() /* cb随便取的 组件应该定义好了 */
      }

      cb(new Error('请输入合法的邮箱')) /* 传递一个错误对象 */
    }
    // 验证手机号的自定义规则
    const checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      datalist: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      // 总页数
      total: 0,
      value: true,
      dialogFormVisible: false,
      editDialogVisible: false,
      setRoleVisible: false,
      // 表单数据
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm: {
        username: '',
        email: '',
        mobile: ''

      },
      rolesList: [],
      // 校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 101 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            min: 3,
            max: 12,
            message: '长度在 3 到 12 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },

      tableData: []
    }
  },
  async created () {
    this.getData()
    const res = await getRole()
    this.rolesList = res.data

    console.log('这是角色列表', res.data)
  },
  methods: {
    async getData () {
      const res = await getUsers(this.datalist)
      this.tableData = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    handleSizeChange (e) {
      this.datalist.pagesize = e
      this.getData()
    },
    handleCurrentChange (e) {
      this.datalist.pagenum = e
      this.getData()
    },
    async add () {
      this.dialogFormVisible = false
      const res = await addUsers(this.form)
      console.log(res)
      this.$message.success('添加成功')
      this.getData()
      this.$refs.addForm.resetFields()
      // 刷新页面
    },
    open (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delUsers(id)
          console.log(res)
          this.getData()
          // 发送请求 刷新页面
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async put (id, bool) {
      const res = await putUsers({ id, bool })
      console.log(res)
      this.$message.success(res.meta.msg)
    },
    async editUser (id) {
      const res = await getUser(id)
      console.log(res)
      this.editForm = res.data
      this.editDialogVisible = true
    },
    async editUserInfo () {
      console.log(this.editForm)
      const res = await putUser(this.editForm)
      this.$message.success(res.meta.msg)
      this.getData()
      this.$refs.editForm.resetFields()
      this.editDialogVisible = false
    },
    saveRoleInfo () {

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
.footer {
  display: flex;
  align-items: center;
}
</style>
