<template>
  <el-card>
    <div class="header">
      <el-steps :active="+activeIndex" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="form"
        ref="form"
        :rules="rules"
      >
        <el-tabs
          :tab-position="tabPosition"
          v-model="activeIndex"
          :before-leave="beforeLeave"
          @tab-click="tabClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="form.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="form.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="form.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="form.goods_cat"
                :options="options"
                :props="props"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name"
              v-for="item in tagList"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  border
                  :label="e"
                  v-for="(e, i) in item.attr_vals"
                  :key="i"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyList"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- action图片上传地址-->
            <el-upload
              class="upload-demo"

              action="http://127.0.0.1:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headers"

              list-type="picture"
            >VueQuillEditor
              <el-button size="small" type="primary">点击上传</el-button>

            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="form.goods_introduce"></quill-editor>
              <el-button type="primary" class="submit" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { getGoodsList, getAttributes, addGoods } from '@/api/goods'
import store from '@/store'
export default {
  name: 'addGoods',
  data () {
    return {
      tabPosition: 'left',
      labelPosition: 'top',
      // 表单数据
      form: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        goods_introduce: '',
        pics: [],
        attrs: []

      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      },
      // 多级菜单
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },

      // 步骤条
      activeIndex: '0',
      // 动态参数和静态属性
      tagList: [],
      onlyList: [],
      // 上传图片
      headers: {
        Authorization: store.state.user.token

      }
    }
  },
  async created () {
    const res = await getGoodsList()
    this.options = res.data
    // console.log('商品分类', res.data)
  },
  methods: {
    handleChange () {
      if (this.form.goods_cat.length !== 3) {
        this.$message.warning('只能选择3级分类')
        this.form.goods_cat = []
      }
    },
    beforeLeave (activeName, oldActiveName) {
      // console.log('我要切换')
      if (oldActiveName === '0' && this.form.goods_cat.length !== 3) {
        this.$message.warning('请先选择分类')
        return false
      }
    },
    async tabClick () {
      if (this.activeIndex === '1') {
        console.log(this.cateID)
        const res = await getAttributes(this.cateID, { sel: 'many' })
        console.log('参数', res)
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        })
        this.tagList = res.data
      }
      if (this.activeIndex === '2') {
        const res = await getAttributes(this.cateID, { sel: 'only' })
        this.onlyList = res.data
      }
    },
    // 图片上传
    handlePreview () {

    },
    handleRemove () {},
    add () {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项')
        } else {
          this.form.goods_cat = this.form.goods_cat.join(',')
          this.tagList.forEach(item => {
            const obj = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals.join(' ')
            }
            this.form.attrs.push(obj)
          })
          this.onlyList.forEach(item => {
            const obj = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals
            }
            this.form.attrs.push(obj)
          })
          const res = await addGoods(this.form)
          console.log('添加商品', res)
          this.$message.success(res.meta.msg)
          this.$router.push('/goods')
        }
      })
    }

  },
  computed: {
    cateID () {
      if (this.form.goods_cat.length === 3) {
        return this.form.goods_cat[2]
      }
      return null
    }
  }
}
</script >

<style  lang="scss" scoped>
.el-checkbox {
  margin: 10px;
}
.submit{
  margin-top: 20px ;
}
</style>
