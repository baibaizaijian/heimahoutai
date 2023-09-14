<template>
  <el-card>
    <div class="header">
      <el-steps :active="2" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="基本信息">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
          >
            <el-form-item label="商品名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input
                v-model="formLabelAlign.region"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="formLabelAlign.type" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="formLabelAlign.type" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                v-model="value"
                :options="options"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性">角色管理</el-tab-pane>
        <el-tab-pane label="商品图片">定时任务补偿</el-tab-pane>
        <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
import { getGoodsList } from '@/api/goods'
export default {
  name: 'addGoods',
  data () {
    return {
      tabPosition: 'left',
      labelPosition: 'top',
      // 表单数据
      formLabelAlign: {},
      // 多级菜单
      options: [],
      value: ''

    }
  },
  async created () {
    const res = await getGoodsList()
    console.log('商品分类', res)
  },
  methods: {
    handleChange () {}
    // 递归函数

  }
}
</script >

<style  lang="scss" scoped>
</style>
