<template>
  <el-card>
    <div class="header">
      <el-steps :active="2" align-center>
        <el-step
          title="基本信息"
        ></el-step>
        <el-step
          title="商品参数"
        ></el-step>
        <el-step
          title="商品属性"
        ></el-step>
        <el-step
          title="商品图片"
        ></el-step>
        <el-step
          title="商品内容"
        ></el-step>
        <el-step
          title="完成"
        ></el-step>
      </el-steps>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'addGoods'
}
</script>

<style>
</style>
