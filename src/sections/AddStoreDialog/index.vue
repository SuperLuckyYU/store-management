<template>
  <div>
    <el-dialog :title="title" width="500px" :visible="true" @close="handleCloseClick" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="区域id" prop="areaId">
          <el-input v-model="form.areaId" placeholder="请输入区域id" />
        </el-form-item>
        <el-form-item label="商铺编号" prop="storeNo">
          <el-input v-model="form.storeNo" placeholder="请输入商铺编号" />
        </el-form-item>
        <el-form-item label="商铺名称" prop="storeName">
          <el-input v-model="form.storeName" placeholder="请输入商铺名称" />
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
        <el-form-item label="商铺状态">
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

export default {
  name: 'AddStroeDialog',
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
  },
  data () {
    return {
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    }
  },
  methods: {
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
