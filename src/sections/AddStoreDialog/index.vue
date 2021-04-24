<template>
  <div>
    <el-dialog :title="title" width="500px" :visible="true" @close="handleCloseClick" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="区域" prop="areaId">
          <treeselect v-model="form.areaId" :options="areaOptions" :normalizer="normalizer" placeholder="请选择区域" />
        </el-form-item>
        <el-form-item label="商铺编号" prop="storeNo">
          <el-input v-model="form.storeNo" placeholder="请输入商铺编号" />
        </el-form-item>
        <el-form-item label="商铺类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择商铺类型">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商铺状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商铺面积" prop="acreage">
          <el-input v-model="form.acreage" placeholder="请输入商铺面积" />
        </el-form-item>
        <el-form-item label="商铺位置" prop="location">
          <el-input v-model="form.location" placeholder="请输入商铺位置" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="扩展1" prop="extend1">
          <el-input v-model="form.extend1" placeholder="请输入扩展1" />
        </el-form-item>
        <el-form-item label="扩展2" prop="extend2">
          <el-input v-model="form.extend2" placeholder="请输入扩展2" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addStore, updateStore } from "@/api/business/store";
import Treeselect from "@riophae/vue-treeselect";
import { listArea } from "@/api/business/area";

export default {
  name: 'AddStroeDialog',
  components: {
    Treeselect,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    statusOptions: {
      type: Array,
      required: true
    },
    typeOptions: {
      type: Array,
      required: true
    },
    info: {
      type: Object,
    },
  },
  data () {
    return {
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        areaId: [
          { required: true, message: '请选择区域', trigger: 'blur' },
        ],
        storeNo: [
          { required: true, message: '请填写商铺编号', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请填写商铺类型', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请填写商铺状态', trigger: 'blur' },
        ],
      },
      // 区域树选项
      areaOptions: [],
      areaList: [],
    }
  },
  created () {
    if (this.title === '修改商铺信息') {
      this.form = {
        ...this.form,
        ...this.info,
      }
    }
    this.getTreeselect();
  },
  methods: {
    /** 查询区域列表 */
    getList() {
      listArea().then(response => {
        this.areaList = this.handleTree(response.data, "id", "pid");
      });
    },
    /** 转换区域数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      listArea().then(response => {
        this.areaOptions = [];
        const data = { id: 0, name: '顶级节点', children: [] };
        data.children = this.handleTree(response.data, "id", "pid");
        this.areaOptions.push(data);
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateStore(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.$emit('UpdateStoreDialogVisible');
              this.$emit('AddStoreCallback');
            });
          } else {
            addStore(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.$emit('UpdateStoreDialogVisible');
              this.$emit('AddStoreCallback');
            });
          }
        }
      });
    },
    // 取消按钮
    cancel() {
      this.$emit('UpdateStoreDialogVisible');
    },
    handleCloseClick () {
      this.$emit('UpdateStoreDialogVisible');
    }
  }
}
</script>
