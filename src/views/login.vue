<template>
  <div class="login-page">
    <!-- 所有组件的类名规范, 组件名就是元素的类名 -->
    <div class="box">
      <div class="avatar_box">
        <img src="../assets/20180428135053_FktKX.jpeg" alt="">
      </div>
    <el-card class="login-card">

      <el-form ref="form" :model="form" >
        <el-form-item class="name">
          <el-input v-model="form.username" placeholder="请输入账号"
          >
            <i
              class="el-icon-user el-input__icon"
              slot="prefix"
            >
            </i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password"  placeholder="请输入密码" show-password  >
            <i class="el-icon-loading el-input__icon" slot="prefix"> </i>
          </el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click='login'>登录</el-button>
          <el-button type="info" @click='reset'>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }

    }
  },
  methods: {
    async login () {
      console.log(this.form)
      await this.$store.dispatch('user/loginAction', this.form)
      this.$router.push('/')
      this.$message.success('登录成功')
    },
    reset () {
      this.$refs.form.resetFields()
    }

  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #2b4b6b;
  display: flex;
  align-items: center;
  justify-content: center;
  .avatar_box{
    width: 130px;
    height: 130px;
    // background-color: red;
    border-radius: 50%;
    padding: 10px;
    background-color: #fff;
    // border: 1px red solid;
    margin: 0 auto -65px auto;
    box-shadow: 0 0 10px #ddd;
    img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
    }
  }
  .login-card{
    width: 450px;
    height: 300px;
    .btn{
     display: flex;
     justify-content: flex-end;
    }
    .name{
      margin-top: 80px;
    }

  }

}
</style>
