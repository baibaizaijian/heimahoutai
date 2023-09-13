<template>
  <el-card class="box-card">
    <el-button type="primary" class="add" @click="add">添加角色</el-button>
    <el-table border :data="roleList" style="width: 100%">
      <!-- type="expand" 表示当前表格的行可以展开 -->
      <el-table-column type="expand">
        <template #default="{ row }">
          <!-- 一级 -->
          <el-row v-for="one in row.children" :key="one.id">
            <el-col :span="4">
              <el-tag closable>
                {{ one.authName }}
              </el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 二级 -->
              <el-row v-for="two in one.children" :key="two.id">
                <el-col :span="5">
                  <el-tag type="success" closable>
                    {{ two.authName }}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-tag
                    @close="$message.success('你好')"
                    v-for="three in two.children"
                    :key="three.id"
                    type="warning"
                    closable
                  >
                    {{ three.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50">
        <!-- 表格插槽对象不能直接用插值表达式来查看 -->
        <!-- <template #default="obj">{{ obj.$index + 1 }}</template> -->
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName"> </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column label="操作">
        <template #default="obj">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="put(obj.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="del(obj.row.id)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-setting"
            @click="setRight(obj.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightVisible" width="50%" @close="close">
      <!-- 树形控件 -->
      <el-tree
        :data="rightsList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        :props="defaultProps"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色 -->
    <el-dialog :title="title" :visible.sync="addRoleVisible" ref="dialog">
      <el-form :model="form" :rules="rules" ref="Form">
        <el-form-item label="角色名称" label-width="100px" prop="roleName">
          <el-input
            v-model="form.roleName"
            autocomplete="off"
            width="500px"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px">
          <el-input
            v-model="form.roleDesc"
            autocomplete="off"
            width="500px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getRole } from '@/api/user'
import {
  getRolesTree,
  addRole,
  getRoleID,
  putRole,
  delRole
} from '@/api/role'
export default {
  name: 'roleList',

  data () {
    return {
      // 默认选中的
      defKeys: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleList: [],
      rightsList: [],
      setRightVisible: false,
      addRoleVisible: false,
      form: {
        roleName: '',
        roleDesc: '',
        id: ''
      },
      title: '',
      rules: {
        roleName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      },
      formLabelWidth: '100'
    }
  },
  async created () {
    this.getData()
    const res2 = await getRolesTree()
    this.rightsList = res2.data
    console.log('权限列表', res2.data)
  },
  methods: {
    /* 渲染函数 */
    async getData () {
      const res = await getRole()
      console.log('角色列表', res.data)
      this.roleList = res.data
    },
    /* 权限分配 */
    setRight (obj) {
      this.setRightVisible = true
      console.log('当前角色', obj)
      // 获取默认值

      this.getRightsKeys(obj, this.defKeys)
      console.log('现在默认keys', this.defKeys)
    },
    allotRights () {},

    /* 确认提交函数 */
    async submit () {
      if (this.title === '添加角色') {
        const res = await addRole(this.form)
        console.log(res)
        this.$message.success('添加成功')
      }
      if (this.title === '修改角色') {
        const res = await putRole(this.form)
        console.log(res)
        this.$message.success('修改成功')
      }

      this.addRoleVisible = false
      this.$refs.Form.resetFields()
      this.getData()
    },
    /* 增删改查 */
    add () {
      this.title = '添加角色'
      this.addRoleVisible = true
    },
    async put (id) {
      this.title = '修改角色'
      this.addRoleVisible = true
      const res = await getRoleID(id)
      console.log('角色', res)
      this.form = res.data
    },

    async del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        const res = await delRole(id)
        console.log('删除角色', res)
        this.$message.success(res.meta.msg)
        this.getData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /* 递归函数,获取选中id */
    getRightsKeys (obj, arr) {
      if (!obj.children) {
        return arr.push(obj.id)
      }
      obj.children.forEach(item => {
        this.getRightsKeys(item, arr)
      })
    },
    close () {
      console.log('我要清空')
      this.defKeys = []

      console.log(this.defKeys)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  .el-tag {
    margin: 7px;
  }
}
.add {
  margin-bottom: 20px;
}
.el-input {
  width: 450px;
  margin-right: 20px;
}
</style>
