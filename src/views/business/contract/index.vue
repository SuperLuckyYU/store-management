<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="140px">
      <el-form-item label="商铺" prop="storeId">
        <el-select v-model="queryParams.storeId" filterable placeholder="请选择商铺" @keyup.enter.native="handleQuery">
          <el-option
            v-for="item in storeList"
            :key="item.id"
            :label="item.storeNo"
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
      <el-form-item label="合同编号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="签约日期" prop="signDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.signDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择签约日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到期日期" prop="signExpiresDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.signExpiresDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择到期日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="押金数" prop="deposit">
        <el-input
          v-model="queryParams.deposit"
          placeholder="请输入押金数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="月租价格" prop="monthlyRental">
        <el-input
          v-model="queryParams.monthlyRental"
          placeholder="请输入月租价格"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物业费" prop="property">
        <el-input
          v-model="queryParams.property"
          placeholder="请输入物业费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="下次营业执照审核日" prop="businessLicenseCheckDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.businessLicenseCheckDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择下次营业执照审核日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="租金到期日" prop="monthlyExpiresDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.monthlyExpiresDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择租金到期日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="物业费到期日" prop="propertyExpiresDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.propertyExpiresDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择物业费到期日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="待付租金" prop="planRent">
        <el-input
          v-model="queryParams.planRent"
          placeholder="请输入待付租金"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="待付物业费" prop="planProperty">
        <el-input
          v-model="queryParams.planProperty"
          placeholder="请输入待付物业费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实付物业费" prop="realityProperty">
        <el-input
          v-model="queryParams.realityProperty"
          placeholder="请输入实付物业费"
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
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入备注"
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
          v-hasPermi="['business:contract:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAddTransaction"
          v-hasPermi="['business:contract:add']"
        >添加交易</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['business:contract:edit']"
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
          v-hasPermi="['business:contract:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['business:contract:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="contractList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="商铺" align="center" prop="storeNo" />
      <el-table-column label="租户" align="center" prop="tenantName" />
      <el-table-column label="合同编号" align="center" prop="contractNo" />
      <el-table-column label="签约日期" align="center" prop="signDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到期日期" align="center" prop="signExpiresDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signExpiresDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="押金数" align="center" prop="deposit" />
      <el-table-column label="月租价格" align="center" prop="monthlyRental" />
      <el-table-column label="物业费" align="center" prop="property" />
      <el-table-column label="合同文件" align="center" prop="fileUrl" />
      <el-table-column label="营业执照" align="center" prop="businessLicenseUrl" />
      <el-table-column label="下次营业执照审核日" align="center" prop="businessLicenseCheckDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.businessLicenseCheckDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="租金到期日" align="center" prop="monthlyExpiresDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.monthlyExpiresDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物业费到期日" align="center" prop="propertyExpiresDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.propertyExpiresDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="待付租金" align="center" prop="planRent" />
      <el-table-column label="待付物业费" align="center" prop="planProperty" />
      <el-table-column label="实付物业费" align="center" prop="realityProperty" />
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
            v-hasPermi="['business:contract:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAddTransaction(scope.row)"
            v-hasPermi="['business:contract:add']"
          >添加交易</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['business:contract:remove']"
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

    <!-- 添加或修改合同对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商铺" prop="storeId">
          <el-select v-model="form.storeId" filterable placeholder="请选择商铺">
            <el-option
              v-for="item in storeList"
              :key="item.id"
              :label="item.storeNo"
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
        <el-form-item label="合同编号" prop="contractNo">
          <el-input v-model="form.contractNo" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="签约日期" prop="signDate">
          <el-date-picker clearable size="small"
            v-model="form.signDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择签约日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期日期" prop="signExpiresDate">
          <el-date-picker clearable size="small"
            v-model="form.signExpiresDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择到期日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="押金数" prop="deposit">
          <el-input v-model="form.deposit" placeholder="请输入押金数" />
        </el-form-item>
        <el-form-item label="月租价格" prop="monthlyRental">
          <el-input v-model="form.monthlyRental" placeholder="请输入月租价格" />
        </el-form-item>
        <el-form-item label="物业费" prop="property">
          <el-input v-model="form.property" placeholder="请输入物业费" />
        </el-form-item>
        <el-form-item label="合同文件">
          <fileUpload v-model="form.fileUrl"/>
        </el-form-item>
        <el-form-item label="营业执照">
          <fileUpload v-model="form.businessLicenseUrl"/>
        </el-form-item>
        <el-form-item label="下次营业执照审核日" prop="businessLicenseCheckDate">
          <el-date-picker clearable size="small"
            v-model="form.businessLicenseCheckDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择下次营业执照审核日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="租金到期日" prop="monthlyExpiresDate">
          <el-date-picker clearable size="small"
            v-model="form.monthlyExpiresDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择租金到期日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="物业费到期日" prop="propertyExpiresDate">
          <el-date-picker clearable size="small"
            v-model="form.propertyExpiresDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择物业费到期日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="待付租金" prop="planRent">
          <el-input v-model="planRent" placeholder="请输入待付租金" disabled />
        </el-form-item>
        <el-form-item label="待付物业费" prop="planProperty">
          <el-input v-model="form.planProperty" placeholder="请输入待付物业费" />
        </el-form-item>
        <el-form-item label="实付物业费" prop="realityProperty">
          <el-input v-model="form.realityProperty" placeholder="请输入实付物业费" />
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

    <!-- 添加交易对话框 -->
    <el-dialog title="添加交易" :visible.sync="transactionOpen" width="500px" append-to-body>
      <el-form ref="transactionForm" :model="transactionForm" :rules="transactionRules" label-width="80px">
        <el-form-item label="合同编号" prop="contractNo">
          <el-input v-model="transactionForm.contractNo" disabled placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model="transactionForm.money" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="transactionForm.type" placeholder="请选择类型">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="transactionForm.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="扩展1" prop="extend1">
          <el-input v-model="transactionForm.extend1" placeholder="请输入扩展1" />
        </el-form-item>
        <el-form-item label="扩展2" prop="extend2">
          <el-input v-model="transactionForm.extend2" placeholder="请输入扩展2" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTransactionForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listContract, getContract, delContract, addContract, updateContract, exportContract } from "@/api/business/contract";
import { payTransation } from "@/api/business/transaction";
import FileUpload from '@/components/FileUpload';
import { listStore } from "@/api/business/store";
import { listTenant } from "@/api/business/tenant";

export default {
  name: "Contract",
  components: {
    FileUpload,
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
      // 合同表格数据
      contractList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示交易弹出层
      transactionOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        storeId: null,
        tenantId: null,
        contractNo: null,
        signDate: null,
        signExpiresDate: null,
        deposit: null,
        monthlyRental: null,
        property: null,
        fileUrl: null,
        businessLicenseUrl: null,
        businessLicenseCheckDate: null,
        monthlyExpiresDate: null,
        propertyExpiresDate: null,
        planRent: null,
        realityRent: null,
        planProperty: null,
        realityProperty: null,
        deptId: null,
        remark: null,
        extend1: null,
        extend2: null
      },
      // 表单参数
      form: {},
      transactionForm: {},
      // 表单校验
      rules: {
      },
      transactionRules: {},
      storeList: [],
      tenantList: [],
      typeOptions: []
    };
  },
  computed: {
    planRent () {
      if (this.form.monthlyRental) return this.form.monthlyRental * 3
      return 0
    }
  },
  created() {
    this.getList();
    this.getStoreList();
    this.getTenantList();
    this.getDicts("transaction_type").then(response => {
      this.typeOptions = response.data;
    });
  },
  methods: {
    /** 查询商铺列表 */
    getStoreList() {
      listStore({
        pageNum: 1,
        pageSize: 10000,
        status: '0',
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
    /** 查询合同列表 */
    getList() {
      this.loading = true;
      listContract(this.queryParams).then(response => {
        this.contractList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
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
        contractNo: null,
        signDate: null,
        signExpiresDate: null,
        deposit: null,
        monthlyRental: null,
        property: null,
        fileUrl: null,
        businessLicenseUrl: null,
        businessLicenseCheckDate: null,
        monthlyExpiresDate: null,
        propertyExpiresDate: null,
        planRent: null,
        realityRent: null,
        planProperty: null,
        realityProperty: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        deptId: null,
        remark: null,
        extend1: null,
        extend2: null
      };
      this.transactionForm = {
        id: null,
        contractNo: null,
        contractId: null,
        money: null,
        type: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        deptId: null,
        remark: null,
        extend1: null,
        extend2: null
      }
      this.resetForm("form");
      this.resetForm("transactionForm");
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
      this.title = "添加合同";
    },
    handleAddTransaction (row) {
      this.reset();
      this.transactionOpen = true;
      this.transactionForm.contractNo = row.contractNo
      this.transactionForm.contractId = row.id
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getContract(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改合同";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            const params = {
              ...this.form,
            }
            if (params.monthlyRental) params.planRent = this.form.monthlyRental*3
            updateContract(params).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addContract(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    submitTransactionForm() {
      this.$refs["transactionForm"].validate(valid => {
        if (valid) {
          payTransation(this.transactionForm).then(response => {
            this.msgSuccess("新增成功");
            this.transactionOpen = false;
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除合同编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delContract(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有合同数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportContract(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
