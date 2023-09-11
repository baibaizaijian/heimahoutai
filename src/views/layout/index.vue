<template>
<el-container>
  <el-header>
    <div>
    <img src="http://123.57.109.30:4005/vue_shop/img/heima.b5a855ee.png" >
    <h1>电商后台管理系统</h1>
    </div>
  <el-button type="info" @click="quit">退出</el-button>
  </el-header>
  <el-container>
    <el-aside  :width="isCollapse ? '64px' : '200px'">
        <el-menu
      router
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff">

      <el-submenu :index="item.id.toString()" v-for="(item,index) in list" :key="index">
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="ele.path" v-for="(ele,i) in item.children" :key="i" @click="fn([item.authName,ele.authName])">
          <i class="el-icon-menu"></i>
          <span>{{ele.authName}}</span>
          </el-menu-item>
      </el-submenu>

    </el-menu>
    </el-aside>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
   <el-breadcrumb-item v-for="item in arr" :key="item">{{item}}</el-breadcrumb-item>
</el-breadcrumb>
      <router-view></router-view>
</el-main>
  </el-container>
</el-container>
</template>

<script>
import { getNav } from '@/api/nav'
export default {
  name: 'layoutIndex',
  data () {
    return {
      isCollapse: false,
      list: [],
      // 图标对象
      iconsObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-s-check',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing'
      },
      arr: []
    }
  },
  methods: {
    toggle () {
      this.isCollapse = !this.isCollapse
    },
    fn (arr) {
      this.arr = arr
    },
    quit () {
      // console.log('用户点击了确认')
      // 1. 提交 mutations 来清除 token
      this.$store.commit('user/logout')
      // 2. 跳转到登录页
      this.$router.push('/login')
      // 3. 提醒用户退出成功
      this.$message.success('退出成功')
    }

  },
  async created () {
    const res = await getNav()
    this.list = res.data
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
