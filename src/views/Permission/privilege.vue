<template>
  <el-card class="box-card">
    <el-table :data="rightsList" border style="width: 100%">
      <el-table-column prop="" label="" width="50"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="address" label="权限等级">
        <template #default="obj">
          <el-tag :type="level[obj.row.level]">{{levelText[obj.row.level]}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { rightsList } from '@/api/rights'
export default {
  name: 'privilegeList',
  data () {
    return {
      rightsList: [],
      level: ['', 'success', 'warning'],
      levelText: ['标签一', '标签二', '标签三']
    }
  },
  async created () {
    const res = await rightsList()
    this.rightsList = res.data
    console.log(res)
  }
}
</script>

<style>
</style>
