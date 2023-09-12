<template>
<el-card class="box-card">
 <el-button type="primary" class="add" >添加角色</el-button>
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
                <el-tag @close="$message.success('你好')" v-for="three in two.children" :key="three.id" type="warning" closable>
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
      <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
      <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
    </el-table-column>
  </el-table>
</el-card>
</template>

<script>
import { getRole } from '@/api/user'
export default {
  name: 'roleList',

  data () {
    return {
      roleList: []
    }
  },
  async created () {
    const res = await getRole()
    console.log(res.data)
    this.roleList = res.data
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
.add{
  margin-bottom: 20px;
}

</style>
