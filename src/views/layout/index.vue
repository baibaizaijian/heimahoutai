<template>
<el-container>
  <el-header>
    <div>
    <img src="http://123.57.109.30:4005/vue_shop/img/heima.b5a855ee.png" >
    <h1>电商后台管理系统</h1>
    </div>
  <el-button type="info" disabled>退出</el-button>
  </el-header>
  <el-container>
    <el-aside  :width="isCollapse ? '64px' : '200px'">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
          <el-menu-item index="1-1">
            <i class="el-icon-location"></i>
          <span>导航一</span>
          </el-menu-item>

      </el-submenu>

    </el-menu>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
import { getNav } from '@/api/nav'
export default {
  name: 'layoutIndex',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    toggle () {
      this.isCollapse = !this.isCollapse
    }
  },
  async created () {
    const res = await getNav()
    console.log(res)
  }
}

</script>

<style lang="scss" scoped>

.el-container{
    height: 100vh;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #373d41;
  div{
    display: flex;
     h1{
    color: #fff;
    font-weight:400;
    font-size: 20px;
    width: 160px;
    padding-left: 15px;
  }
  }

}
.el-aside{
    height: 100%;
    background-color: #333744;
}

</style>
