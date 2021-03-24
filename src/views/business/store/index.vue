<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="区域id" prop="areaId">
        <el-input
          v-model="queryParams.areaId"
          placeholder="请输入区域id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商铺编号" prop="storeNo">
        <el-input
          v-model="queryParams.storeNo"
          placeholder="请输入商铺编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商铺名称" prop="storeName">
        <el-input
          v-model="queryParams.storeName"
          placeholder="请输入商铺名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商铺类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择商铺类型" clearable size="small">
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商铺状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择商铺状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商铺面积" prop="acreage">
        <el-input
          v-model="queryParams.acreage"
          placeholder="请输入商铺面积"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商铺位置" prop="location">
        <el-input
          v-model="queryParams.location"
          placeholder="请输入商铺位置"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['business:store:add']"
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
          v-hasPermi="['business:store:edit']"
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
          v-hasPermi="['business:store:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['business:store:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="storeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="区域id" align="center" prop="areaId" />
      <el-table-column label="商铺编号" align="center" prop="storeNo" />
      <el-table-column label="商铺名称" align="center" prop="storeName" />
      <el-table-column label="商铺类型" align="center" prop="type" :formatter="typeFormat" />
      <el-table-column label="商铺状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="商铺面积" align="center" prop="acreage" />
      <el-table-column label="商铺位置" align="center" prop="location" />
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
            v-hasPermi="['business:store:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['business:store:remove']"
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

    <!-- 添加或修改商铺信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
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
import { listStore, getStore, delStore, addStore, updateStore, exportStore } from "@/api/business/store";

export default {
  name: "Store",
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
      // 商铺信息表格数据
      storeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 商铺类型字典
      typeOptions: [],
      // 商铺状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        areaId: null,
        storeNo: null,
        storeName: null,
        type: null,
        status: null,
        acreage: null,
        location: null,
        deptId: null,
        extend1: null,
        extend2: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("store_type").then(response => {
      this.typeOptions = response.data;
    });
    this.getDicts("store_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询商铺信息列表 */
    getList() {
      this.loading = true;
      listStore(this.queryParams).then(response => {
        this.storeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 商铺类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
    },
    // 商铺状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
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
        areaId: null,
        storeNo: null,
        storeName: null,
        type: null,
        status: "0",
        acreage: null,
        location: null,
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
      this.title = "添加商铺信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStore(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商铺信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateStore(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStore(this.form).then(response => {
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
      this.$confirm('是否确认删除商铺信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStore(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有商铺信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportStore(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
