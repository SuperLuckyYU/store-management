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
        <el-col :span="8"><span class="label">商铺名称：</span><span class="value">{{info.store.storeName}}</span></el-col>
        <el-col :span="8"><span class="label">商铺编号：</span><span class="value">{{info.store.storeNo}}</span></el-col>
        <el-col :span="8"><span class="label">商铺类型：</span><span class="value">{{storeTypeFormat(info.store.type)}}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span class="label">商铺面积：</span><span class="value">{{info.store.acreage}}</span></el-col>
        <el-col :span="8"><span class="label">商铺位置：</span><span class="value">{{info.store.location}}</span></el-col>
        <el-col :span="8"><span class="label">商铺状态：</span><span class="value">{{storeStatusFormat(info.store.status)}}</span></el-col>
      </el-row>
      <el-row class="row" style="margin-bottom: 40px">
        <el-col :span="8"><span class="label">商铺扩展1：</span><span class="value">{{info.store.extend1}}</span></el-col>
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
      <el-row class="row">
        <el-col :span="8"><span class="label">扩展2：</span><span class="value">{{info.tenant.extend2}}</span></el-col>
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
