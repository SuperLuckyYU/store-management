<template>
  <el-dialog title="详情信息" @close="handleCloseClick" :visible="true" append-to-body>
    <template v-if="info.area">
      <el-divider class="info-title" content-position="left">区域信息</el-divider>
      <el-row class="row" style="margin-top: 40px">
        <el-col :span="8"><span class="label">区域名称：</span><span class="value">{{info.area.name}}</span></el-col>
        <el-col :span="8"><span class="label">区域排序：</span><span class="value">{{info.area.sort}}</span></el-col>
        <el-col :span="8"><span class="label">区域备注：</span><span class="value">{{info.area.remark}}</span></el-col>
      </el-row>
      <el-row class="row" style="margin-bottom: 40px">
        <el-col :span="8"><span class="label">区域扩展1：</span><span class="value">{{info.area.extend1}}</span></el-col>
        <el-col :span="8"><span class="label">区域扩展2：</span><span class="value">{{info.area.extend2}}</span></el-col>
      </el-row>
    </template>
    <template v-if="info.store">
      <el-divider class="info-title" content-position="left">商铺信息</el-divider>
      <el-row class="row" style="margin-top: 40px">
        <el-col :span="8"><span class="label">商铺编号：</span><span class="value">{{info.store.storeNo}}</span></el-col>
        <el-col :span="8"><span class="label">商铺类型：</span><span class="value">{{storeTypeFormat(info.store.type)}}</span></el-col>
        <el-col :span="8"><span class="label">商铺面积：</span><span class="value">{{info.store.acreage}}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span class="label">商铺位置：</span><span class="value">{{info.store.location}}</span></el-col>
        <el-col :span="8"><span class="label">商铺状态：</span><span class="value">{{storeStatusFormat(info.store.status)}}</span></el-col>
        <el-col :span="8"><span class="label">商铺扩展1：</span><span class="value">{{info.store.extend1}}</span></el-col>
      </el-row>
      <el-row class="row" style="margin-bottom: 40px">
        <el-col :span="8"><span class="label">商铺扩展2：</span><span class="value">{{info.store.extend2}}</span></el-col>
      </el-row>
    </template>
    <template v-if="info.tenant">
      <el-divider class="info-title" content-position="left">租户信息</el-divider>
      <el-row class="row" style="margin-top: 40px">
        <el-col :span="8"><span class="label">姓名：</span><span class="value">{{info.tenant.name}}</span></el-col>
        <el-col :span="8"><span class="label">联系人：</span><span class="value">{{info.tenant.contactsName}}</span></el-col>
        <el-col :span="8"><span class="label">电话：</span><span class="value">{{info.tenant.phone}}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span class="label">备用电话：</span><span class="value">{{info.tenant.secondPhone}}</span></el-col>
        <el-col :span="8"><span class="label">店名：</span><span class="value">{{info.tenant.storeName}}</span></el-col>
        <el-col :span="8"><span class="label">行业：</span><span class="value">{{info.tenant.trade}}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span class="label">入驻日期：</span><span class="value">{{info.tenant.enterDate}}</span></el-col>
        <el-col :span="8"><span class="label">备注：</span><span class="value">{{info.tenant.remark}}</span></el-col>
        <el-col :span="8"><span class="label">扩展1：</span><span class="value">{{info.tenant.extend1}}</span></el-col>
      </el-row>
      <el-row class="row" style="margin-bottom: 40px">
        <el-col :span="8"><span class="label">扩展2：</span><span class="value">{{info.tenant.extend2}}</span></el-col>
      </el-row>
    </template>
    <template v-if="info.contract">
      <el-divider class="info-title" content-position="left">合同信息</el-divider>
      <el-row class="row" style="margin-top: 40px">
        <el-col :span="8"><span class="label">合同编号：</span><span class="value">{{info.contract.contractNo}}</span></el-col>
        <el-col :span="8"><span class="label">营业执照：</span><span class="value">{{info.contract.businessLicenseUrl}}</span></el-col>
        <el-col :span="8"><span class="label">合同文件：</span><span class="value">{{info.contract.fileUrl}}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span class="label">下次营业执照审核日：</span><span class="value">{{info.contract.businessLicenseCheckDate}}</span></el-col>
        <el-col :span="8"><span class="label">押金数：</span><span class="value">{{info.contract.deposit}}</span></el-col>
        <el-col :span="8"><span class="label">租金到期日：</span><span class="value">{{info.contract.monthlyExpiresDate}}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span class="label">月租价格：</span><span class="value">{{info.contract.monthlyRental}}</span></el-col>
        <el-col :span="8"><span class="label">待付物业费：</span><span class="value">{{info.contract.planProperty}}</span></el-col>
        <el-col :span="8"><span class="label">签约日期：</span><span class="value">{{info.contract.signDate}}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span class="label">到期日期：</span><span class="value">{{info.contract.signExpiresDate}}</span></el-col>
        <el-col :span="8"><span class="label">待付租金：</span><span class="value">{{info.contract.planRent}}</span></el-col>
        <el-col :span="8"><span class="label">物业费：</span><span class="value">{{info.contract.property}}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span class="label">物业费到期日：</span><span class="value">{{info.contract.propertyExpiresDate}}</span></el-col>
        <el-col :span="8"><span class="label">实付物业费：</span><span class="value">{{info.contract.realityProperty}}</span></el-col>
        <el-col :span="8"><span class="label">实收租金：</span><span class="value">{{info.contract.realityRent}}</span></el-col>
      </el-row>
      <el-row class="row" style="margin-bottom: 40px">
        <el-col :span="8"><span class="label">备注：</span><span class="value">{{info.contract.remark}}</span></el-col>
        <el-col :span="8"><span class="label">扩展1：</span><span class="value">{{info.contract.extend1}}</span></el-col>
        <el-col :span="8"><span class="label">扩展2：</span><span class="value">{{info.contract.extend2}}</span></el-col>
      </el-row>
    </template>
    <template v-if="info.maintain">
      <el-divider class="info-title" content-position="left">运维信息</el-divider>
      <el-row class="row" style="margin-top: 40px">
        <el-col :span="8"><span class="label">电路检修日期：</span><span class="value">{{info.maintain.electrical}}</span></el-col>
        <el-col :span="8"><span class="label">电路下次检修时间：</span><span class="value">{{info.maintain.electricalNotice}}</span></el-col>
        <el-col :span="8"><span class="label">灭火器更换日期：</span><span class="value">{{info.maintain.extinguisher}}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span class="label">下次灭火器更换日期：</span><span class="value">{{info.maintain.extinguisherNotice}}</span></el-col>
        <el-col :span="8"><span class="label">其他1：</span><span class="value">{{info.maintain.other1}}</span></el-col>
        <el-col :span="8"><span class="label">其他1自定义内容：</span><span class="value">{{info.maintain.other1Content}}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span class="label">其他1到期时间：</span><span class="value">{{info.maintain.other1Notice}}</span></el-col>
        <el-col :span="8"><span class="label">其他2：</span><span class="value">{{info.maintain.other2}}</span></el-col>
        <el-col :span="8"><span class="label">其他2自定义内容：</span><span class="value">{{info.maintain.other2Content}}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span class="label">其他2到期时间：</span><span class="value">{{info.maintain.other2Notice}}</span></el-col>
        <el-col :span="8"><span class="label">备注：</span><span class="value">{{info.maintain.remark}}</span></el-col>
        <el-col :span="8"><span class="label">扩展1：</span><span class="value">{{info.maintain.extend1}}</span></el-col>
      </el-row>
      <el-row class="row" style="margin-bottom: 40px">
        <el-col :span="8"><span class="label">扩展2：</span><span class="value">{{info.maintain.extend2}}</span></el-col>
      </el-row>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloseClick">取 消</el-button>
      <el-button type="primary" @click="handleCloseClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSummaryInfo } from '../../api/business/store'

export default {
  name: 'StoreDetailDialog',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      dialogVisible: false,
      info: {},
      storeTypeOptions: [],
      storeStatusOptions: []
    }
  },
  created () {
    this.getInfo()
    this.getDicts("store_type").then(response => {
      this.storeTypeOptions = response.data;
    });
    this.getDicts("store_status").then(response => {
      this.storeStatusOptions = response.data;
    });
  },
  methods: {
    // 获取商铺详情信息
    async getInfo () {
      const {data} = await getSummaryInfo(this.id)
      this.info = data
    },
    // 商铺类型字典翻译
    storeTypeFormat(type) {
      return this.selectDictLabel(this.storeTypeOptions, type);
    },
    // 商铺状态字典翻译
    storeStatusFormat(status) {
      return this.selectDictLabel(this.storeStatusOptions, status);
    },
    handleCloseClick() {
      this.$emit('CloseStoreDetailDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.info-title {
  margin-bottom: 20px;
}
::v-deep .el-divider__text {
  color: rgba(0,0,0,.85);
  font-weight: 700;
  font-size: 16px;
}
.row {
  margin: auto;
  margin-bottom: 16px;
  .label {
    color: rgba(0,0,0,.85);
    font-weight: 400;
  }
  .value {
    color: rgba(0,0,0,.65);
  }
}
</style>
