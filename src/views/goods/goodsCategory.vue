<template>
  <el-card>
    <el-alert
      title="注意：只允许为第三级分类设置相关参数！"
      type="warning"
      show-icon
    >
    </el-alert>
    <el-row class="header">
      <el-col :span="3">
        <p class="text">选择商品分类：</p>
      </el-col>
      <el-col :span="6">
        <el-cascader
          v-model="selectedKeys"
          :options="cateList"
          :props="props"
          clearable
          @change="handleChange"
        ></el-cascader>
      </el-col>
    </el-row>
    <el-tabs v-model="activeTabs" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="many">
        <el-button
          type="primary"
          size="medium"
          :disabled="isBtn"
          @click="manyAdd"
          >添加参数</el-button
        >
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="expand">
            <template #default="obj">
              <el-tag
                v-for="(item, i) in obj.row.attr_vals"
                :key="i"
                closable=""
              >
                {{ item }}</el-tag
              >
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
          <el-table-column label="操作">
            <template #default="obj">
              <el-tooltip
                class="item"
                effect="dark"
                content="修改参数"
                placement="top"
              >
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="manyPut(obj.row.attr_id)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除参数"
                placement="top"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="del(obj.row.attr_id)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态属性" name="only">
        <el-button
          type="primary"
          size="medium"
          :disabled="isBtn"
          @click="onlyAdd"
          >添加属性</el-button
        >
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="expand">
            <template #default="obj">
              <el-tag
                v-for="(item, i) in obj.row.attr_vals"
                :key="i"
                closable=""
              >
                {{ item }}</el-tag
              >
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
          <el-table-column label="操作">
            <template #default="obj">
              <el-tooltip
                class="item"
                effect="dark"
                content="修改参数"
                placement="top"
              >
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="manyPut(obj.row.attr_id)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除参数"
                placement="top"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="del(obj.row.attr_id)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加弹框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="close">
      <el-form :model="form" :rules="rules" ref="Form">
        <el-form-item
          :label="Text"
          :label-width="formLabelWidth"
          prop="attr_name"
        >
          <el-input v-model="form.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  getGoodsList,
  getAttributes,
  addAttributes,
  getAttributesID,
  putAttributes,
  delAttributes
} from '@/api/goods'
export default {
  data () {
    return {
      tableData: [],
      // 多级选择
      cateList: [],
      selectedKeys: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      Id: null,
      // 被激活的页签
      activeTabs: 'many',
      // 弹框属性
      title: '',
      dialogFormVisible: false,
      formLabelWidth: '100px',
      form: {
        attr_name: ''
      },
      rules: {
        attr_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 添加标签
      inputVisible: false,
      inputValue: ''
    }
  },
  async created () {
    const res = await getGoodsList()
    this.cateList = res.data
    console.log(res)
  },
  methods: {
    // 多级选择事件
    async handleChange () {
      this.getData()
    },
    handleClick () {
      if (!this.isBtn) {
        this.getData()
      }
    },
    async getData () {
      const res = await getAttributes(this.cateID, { sel: this.activeTabs })
      res.data.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
      })
      this.tableData = res.data
      console.log('参数', res)
    },
    async submit () {
      this.$refs.Form.validate(async (valid) => {
        if (!valid) return
        if (this.Id) {
          const res = await putAttributes(this.cateID, this.Id, {
            attr_name: this.form.attr_name,
            attr_sel: this.activeTabs
          })
          this.$message.success(res.meta.msg)
        } else {
          const res = await addAttributes(
            {
              attr_name: this.form.attr_name,
              attr_sel: this.activeTabs
            },
            this.cateID
          )
          console.log(res)
          this.$message.success(res.meta.msg)
        }

        this.dialogFormVisible = false
        this.getData()
      })
    },
    async manyPut (id) {
      // console.log(id)
      this.Id = id
      this.dialogFormVisible = true
      this.title = '修改' + this.Text
      const res = await getAttributesID(this.cateID, id, {
        attr_sel: this.activeTabs
      })
      // const res = await getAttributesID({
      //   id: id,
      //   attrId: this.cateID,
      //   attr_sel: this.activeTabs
      // })
      console.log(res)
      this.form.attr_name = res.data.attr_name
    },

    async del (id) {
      const res = await delAttributes(this.cateID, id)
      this.$message.success(res.meta.msg)
      this.getData()
    },
    manyAdd () {
      this.dialogFormVisible = true
      this.title = '添加' + this.Text
    },
    onlyAdd () {
      this.dialogFormVisible = true
      this.title = '添加' + this.Text
    },
    close () {
      this.$refs.Form.resetFields()
      this.Id = null
    },
    // 标签事件
    handleInputConfirm () {},
    showInput () {
      this.inputVisible = true
    }

  },
  computed: {
    // 计算分类是否选中
    isBtn () {
      if (this.selectedKeys.length > 0) {
        return false
      }
      return true
    },
    cateID () {
      if (this.selectedKeys.length > 0) {
        return this.selectedKeys[this.selectedKeys.length - 1]
      }
      return null
    },
    Text () {
      if (this.activeTabs === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 20px;
  line-height: 200%;
  margin: 0;
}
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-tag {
  margin: 10px;
}
.input-new-tag{
  width: 100px;
}
</style>
