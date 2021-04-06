<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="140px">
      <el-form-item label="商铺" prop="storeId">
        <el-select v-model="queryParams.storeId" filterable placeholder="请选择商铺" @keyup.enter.native="handleQuery">
          <el-option
            v-for="item in storeList"
            :key="item.id"
            :label="item.storeName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租户" prop="tenantId">
        <el-select v-model="queryParams.tenantId" filterable placeholder="请选择租户" @keyup.enter.native="handleQuery">
          <el-option
            v-for="item in tenantList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电路检修日期" prop="electrical">
        <el-date-picker clearable size="small"
          v-model="queryParams.electrical"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择电路检修日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="电路下次检修时间" prop="electricalNotice">
        <el-date-picker clearable size="small"
          v-model="queryParams.electricalNotice"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择电路下次检修时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="灭火器更换日期" prop="extinguisher">
        <el-date-picker clearable size="small"
          v-model="queryParams.extinguisher"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择灭火器更换日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下次灭火器更换日期" prop="extinguisherNotice">
        <el-date-picker clearable size="small"
          v-model="queryParams.extinguisherNotice"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择下次灭火器更换日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="其他1" prop="other1">
        <el-date-picker clearable size="small"
          v-model="queryParams.other1"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择其他1">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="其他2" prop="other2">
        <el-date-picker clearable size="small"
          v-model="queryParams.other2"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择其他2">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="其他1自定义内容" prop="other1Content">
        <el-input
          v-model="queryParams.other1Content"
          placeholder="请输入其他1自定义内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="其他2自定义内容" prop="other2Content">
        <el-input
          v-model="queryParams.other2Content"
          placeholder="请输入其他2自定义内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="其他1到期时间" prop="other1Notice">
        <el-date-picker clearable size="small"
          v-model="queryParams.other1Notice"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择其他1到期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="其他2到期时间" prop="other2Notice">
        <el-date-picker clearable size="small"
          v-model="queryParams.other2Notice"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择其他2到期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所属部门" prop="deptId">
        <el-input
          v-model="queryParams.deptId"
          placeholder="请输入所属部门"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="扩展1" prop="extend1">
        <el-input
          v-model="queryParams.extend1"
          placeholder="请输入扩展1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="扩展2" prop="extend2">
        <el-input
          v-model="queryParams.extend2"
          placeholder="请输入扩展2"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['business:maintain:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['business:maintain:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['business:maintain:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['business:maintain:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="maintainList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="商铺" align="center" prop="storeName" />
      <el-table-column label="租户" align="center" prop="tenantName" />
      <el-table-column label="电路检修日期" align="center" prop="electrical" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.electrical, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电路下次检修时间" align="center" prop="electricalNotice" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.electricalNotice, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="灭火器更换日期" align="center" prop="extinguisher" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.extinguisher, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下次灭火器更换日期" align="center" prop="extinguisherNotice" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.extinguisherNotice, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="其他1" align="center" prop="other1" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.other1, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="其他2" align="center" prop="other2" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.other2, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="其他1自定义内容" align="center" prop="other1Content" />
      <el-table-column label="其他2自定义内容" align="center" prop="other2Content" />
      <el-table-column label="其他1到期时间" align="center" prop="other1Notice" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.other1Notice, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="其他2到期时间" align="center" prop="other2Notice" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.other2Notice, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属部门" align="center" prop="deptId" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="扩展1" align="center" prop="extend1" />
      <el-table-column label="扩展2" align="center" prop="extend2" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['business:maintain:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['business:maintain:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改运维信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="商铺" prop="storeId">
          <el-select v-model="form.storeId" filterable placeholder="请选择商铺">
            <el-option
              v-for="item in storeList"
              :key="item.id"
              :label="item.storeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租户" prop="tenantId">
          <el-select v-model="form.tenantId" filterable placeholder="请选择租户">
            <el-option
              v-for="item in tenantList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电路检修日期" prop="electrical">
          <el-date-picker clearable size="small"
            v-model="form.electrical"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择电路检修日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电路下次检修时间" prop="electricalNotice">
          <el-date-picker clearable size="small"
            v-model="form.electricalNotice"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择电路下次检修时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="灭火器更换日期" prop="extinguisher">
          <el-date-picker clearable size="small"
            v-model="form.extinguisher"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择灭火器更换日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下次灭火器更换日期" prop="extinguisherNotice">
          <el-date-picker clearable size="small"
            v-model="form.extinguisherNotice"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择下次灭火器更换日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="其他1" prop="other1">
          <el-date-picker clearable size="small"
            v-model="form.other1"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择其他1">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="其他2" prop="other2">
          <el-date-picker clearable size="small"
            v-model="form.other2"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择其他2">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="其他1自定义内容" prop="other1Content">
          <el-input v-model="form.other1Content" placeholder="请输入其他1自定义内容" />
        </el-form-item>
        <el-form-item label="其他2自定义内容" prop="other2Content">
          <el-input v-model="form.other2Content" placeholder="请输入其他2自定义内容" />
        </el-form-item>
        <el-form-item label="其他1到期时间" prop="other1Notice">
          <el-date-picker clearable size="small"
            v-model="form.other1Notice"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择其他1到期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="其他2到期时间" prop="other2Notice">
          <el-date-picker clearable size="small"
            v-model="form.other2Notice"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择其他2到期时间">
          </el-date-picker>
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
import { listMaintain, getMaintain, delMaintain, addMaintain, updateMaintain, exportMaintain } from "@/api/business/maintain";
import { listStore } from "@/api/business/store";
import { listTenant } from "@/api/business/tenant";

export default {
  name: "Maintain",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 运维信息表格数据
      maintainList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        storeId: null,
        tenantId: null,
        electrical: null,
        electricalNotice: null,
        extinguisher: null,
        extinguisherNotice: null,
        other1: null,
        other2: null,
        other1Content: null,
        other2Content: null,
        other1Notice: null,
        other2Notice: null,
        deptId: null,
        extend1: null,
        extend2: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      storeList: [],
      tenantList: [],
    };
  },
  created() {
    this.getList();
    this.getStoreList();
    this.getTenantList();
  },
  methods: {
    /** 查询商铺列表 */
    getStoreList() {
      listStore({
        pageNum: 1,
        pageSize: 10000,
      }).then(response => {
        this.storeList = response.rows;
      });
    },
    /** 查询租户列表 */
    getTenantList() {
      listTenant({
        pageNum: 1,
        pageSize: 10000,
      }).then(response => {
        this.tenantList = response.rows;
      });
    },
    /** 查询运维信息列表 */
    getList() {
      this.loading = true;
      listMaintain(this.queryParams).then(response => {
        this.maintainList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        storeId: null,
        tenantId: null,
        electrical: null,
        electricalNotice: null,
        extinguisher: null,
        extinguisherNotice: null,
        other1: null,
        other2: null,
        other1Content: null,
        other2Content: null,
        other1Notice: null,
        other2Notice: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        deptId: null,
        remark: null,
        extend1: null,
        extend2: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加运维信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMaintain(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改运维信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMaintain(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMaintain(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除运维信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMaintain(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有运维信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportMaintain(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
