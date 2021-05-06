<template>
  <el-row class="tac" v-if="areaList.length > 0">
    <el-col :span="4">
      <ul class="menubar">
        <li class="menuitem" v-for="item in areaList" :key="item.id" @click.stop="handleMenuItemClick(item.id)">
          <div class="meun-title" :class="{'is-active': item.id === activedId}" style="padding-left: 20px;">{{item.name}}</div>
          <ul class="menubar" v-if="item.children.length > 0">
            <li class="menuitem" v-for="itemChildren in item.children" :key="itemChildren.id" @click.stop="handleMenuItemClick(itemChildren.id)">
              <div class="meun-title" :class="{'is-active': itemChildren.id === activedId}" style="padding-left: 40px;">{{itemChildren.name}}</div>
              <ul class="menubar" v-if="itemChildren.children.length > 0">
                <li class="menuitem" v-for="itemSon in itemChildren.children" :key="itemSon.id" @click.stop="handleMenuItemClick(itemSon.id)">
                  <div class="meun-title" :class="{'is-active': itemSon.id === activedId}" style="padding-left: 60px;">{{itemSon.name}}</div>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </el-col>
    <el-col :span="20" style="padding: 0 20px;box-sizing: border-box;">
      <div class="title">
        <i class="el-icon-s-marketing mr-2" ></i><h6 class="title_text">基础数据统计</h6>
      </div>
      <el-card class="content mt-2">
        <el-row>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="总房间数"
                :value="info.totalRoom"
                suffix="间"
                :value-style="{ color: '#2A92F6' }" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="已租间数"
                :value="info.rentRoom"
                suffix="间"
                :value-style="{ color: '#3f8600' }" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="已租数占比"
                :value="info.rentPercent"
                suffix=""
                :value-style="{ color: '#cf1322' }" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="空置间数"
                :value="info.vacancyRoom"
                suffix="间"
                :value-style="{ color: '#745AF5' }" />
            </el-card>
          </el-col>
        </el-row>
        <el-row class="mt-2">
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="空置店铺占比"
                :value="info.vacancyPercent"
                suffix=""
                :value-style="{ color: '#2A92F6' }" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="自用间数"
                :value="info.oneselfRoom"
                suffix="间"
                :value-style="{ color: '#3f8600' }" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="维护间数"
                :value="info.maintainRoom"
                suffix="间"
                :value-style="{ color: '#cf1322' }" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="其他（其他状态的间数）"
                :value="info.otherRoom"
                suffix="间"
                :value-style="{ color: '#745AF5' }" />
            </el-card>
          </el-col>
        </el-row>
      </el-card>
      <div class="title mt-4">
        <i class="el-icon-s-marketing mr-2" ></i><h6 class="title_text">面积数据统计</h6>
      </div>
      <el-card class="content mt-2">
        <el-row>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="总面积"
                :value="info.totalAcreage"
                suffix="㎡"
                :value-style="{ color: '#2A92F6' }" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="已租面积"
                :value="info.rentAcreage"
                suffix="㎡"
                :value-style="{ color: '#3f8600' }" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="空置面积"
                :value="info.vacancyAcreage"
                suffix="㎡"
                :value-style="{ color: '#cf1322' }" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="自用面积"
                :value="info.oneselfAcreage"
                suffix="㎡"
                :value-style="{ color: '#745AF5' }" />
            </el-card>
          </el-col>
        </el-row>
        <el-row class="mt-2">
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="维护面积"
                :value="info.maintainAcreage"
                suffix="㎡"
                :value-style="{ color: '#2A92F6' }" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="content-item" :hoverable="true">
              <base-statistic
                title="其他"
                :value="info.otherAcreage"
                suffix="㎡"
                :value-style="{ color: '#3f8600' }" />
            </el-card>
          </el-col>
        </el-row>
      </el-card>
      <div class="title mt-4">
        <i class="el-icon-s-marketing mr-2" ></i><h6 class="title_text">租金数据统计</h6>
      </div>
      <div class="descriptions mt-2">
        <div class="descriptions-title d-flex">
          <div class="descriptions-title-item" />
          <div class="descriptions-title-item">本月已收</div>
          <div class="descriptions-title-item">本月待收</div>
        </div>
        <div class="descriptions-content">
          <div class="descriptions-row d-flex">
            <div class="descriptions-content-item">租金间数</div>
            <div class="descriptions-content-item">{{ info.realityRentMoneyRoom || 0 }}</div>
            <div class="descriptions-content-item">{{ info.planRentMoneyRoom || 0 }}</div>
          </div>
          <div class="descriptions-row d-flex">
            <div class="descriptions-content-item">租金总数</div>
            <div class="descriptions-content-item">￥{{ info.realityRentMoney || 0 }}</div>
            <div class="descriptions-content-item">￥{{ info.planRentMoney || 0 }}</div>
          </div>
          <div class="descriptions-row d-flex">
            <div class="descriptions-content-item">租金占比</div>
            <div class="descriptions-content-item">{{ info.realityRentMoneyPercent || 0 }}</div>
            <div class="descriptions-content-item">--</div>
          </div>
          <div class="descriptions-row d-flex">
            <div class="descriptions-content-item">物业费间数</div>
            <div class="descriptions-content-item">{{ info.realityPropertyMoneyRoom || 0 }}</div>
            <div class="descriptions-content-item">{{ info.planPropertyMoneyRoom || 0 }}</div>
          </div>
          <div class="descriptions-row d-flex">
            <div class="descriptions-content-item">物业费总数</div>
            <div class="descriptions-content-item">￥{{ info.realityPropertyMoney || 0 }}</div>
            <div class="descriptions-content-item">￥{{ info.planPropertyMoney || 0 }}</div>
          </div>
          <div class="descriptions-row d-flex">
            <div class="descriptions-content-item">物业费占比</div>
            <div class="descriptions-content-item">{{ info.realityPropertyPercent || 0 }}</div>
            <div class="descriptions-content-item">--</div>
          </div>
        </div>
      </div>
      <div class="title mt-4">
        <i class="el-icon-s-marketing mr-2" ></i><h6 class="title_text">到期数据统计</h6>
      </div>
      <div class="contract-info">
        <el-row class="row">
          <el-col :span="8"><span class="label">合同已到期：</span><span class="value">{{ info.signExpireRoom || 0 }}</span></el-col>
          <el-col :span="8"><span class="label">合同即将到期：</span><span class="value">{{ info.upcomingSignExpireRoom || 0 }}</span></el-col>
          <el-col :span="8"><span class="label">租金已到期：</span><span class="value">{{ info.rentMoneyExpireRoom || 0 }}</span></el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8"><span class="label">租金即将到期：</span><span class="value">{{ info.upcomingRentMoneyExpireRoom || 0 }}</span></el-col>
          <el-col :span="8"><span class="label">物业费已到期：</span><span class="value">{{ info.propertyExpireRoom || 0 }}</span></el-col>
          <el-col :span="8"><span class="label">物业费即将到期：</span><span class="value">{{ info.upcomingPropertyExpireRoom || 0 }}</span></el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8"><span class="label">营业执照已到期：</span><span class="value">{{ info.businessLicenseExpireRoom || 0 }}</span></el-col>
          <el-col :span="8"><span class="label">营业执照即将审核：</span><span class="value">{{ info.upcomingBusinessLicenseExpireRoom || 0 }}</span></el-col>
          <el-col :span="8"><span class="label">电路检修已到期：</span><span class="value">{{ info.electricalMaintenanceExpireRoom || 0 }}</span></el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8"><span class="label">电路检修即将检修：</span><span class="value">{{ info.upcomingElectricalMaintenanceExpireRoom || 0 }}</span></el-col>
          <el-col :span="8"><span class="label">灭火器更换：</span><span class="value">{{ info.upcomingExtinguisherExpireRoom}}</span></el-col>
          <el-col :span="8"><span class="label">灭火器更换间数：</span><span class="value">{{ info.extinguisherExpireRoom}}</span></el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8"><span class="label">其他1已到期：</span><span class="value">{{ info.other1ExpireRoom || 0 }}</span></el-col>
          <el-col :span="8"><span class="label">其他1即将到期：</span><span class="value">{{ info.upcomingOther1ExpireRoom || 0 }}</span></el-col>
          <el-col :span="8"><span class="label">其他2已到期：</span><span class="value">{{ info.other2ExpireRoom || 0 }}</span></el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8"><span class="label">其他2即将到期：</span><span class="value">{{ info.upcomingOther2ExpireRoom || 0 }}</span></el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { listArea } from "@/api/business/area"
import { getStatisticInfo } from '@/api/business/statistics'
import BaseStatistic from '../components/BaseStatistic'

export default {
  name: 'Statistical',
  components: {
    BaseStatistic,
  },
  data () {
    return {
      areaList: [],
      activedId: '',
      info: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data } = await listArea({})
      this.areaList = this.handleTree(data, "id", "pid")
      if (this.areaList.length > 0) {
        this.activedId = this.areaList[0].id
        this.getStatisticInfo(this.activedId)
      }
    },
    async getStatisticInfo (id) {
      const { data } = await getStatisticInfo(id)
      this.info = data
      console.log(data)
    },
    handleMenuItemClick (id) {
      this.activedId = id
      this.getStatisticInfo(id)
    },
  },
};
</script>

<style scoped lang="scss">
.menubar {
  width: 100%;
  display: inline-block;
  background-color: rgb(84, 92, 100);
  text-align: left;
  border-right: 1px solid #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  .menuitem {
    .meun-title {
      height: 56px;
      line-height: 56px;
      font-size: 14px;
      color: #303133;
      padding: 0 20px;
      list-style: none;
      cursor: pointer;
      position: relative;
      transition: border-color .3s,background-color .3s,color .3s;
      box-sizing: border-box;
      white-space: nowrap;
      color: rgb(255, 255, 255);
      background-color: rgb(84, 92, 100);
      border-bottom-color: #409eff;
    }
    .is-active {
      color: rgb(255, 208, 75) !important;
    }
    :hover {
      background-color: rgb(67, 74, 80);
    }
  }
}
.title {
  .icon {
    display: inline-block;
  }
  .title_text {
    display: inline-block;
    vertical-align: inherit;
  }
}
.content {
  background: #f0f2f5;
  .content-item {
    width: 80%;
    margin: auto;
  }
}
.descriptions {
  border: 1px solid #e8e8e8;
}
.descriptions-title-item {
  flex: 1;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  text-align: center;
  background-color: rgb(242, 249, 252);
}
.descriptions-row {
  border-bottom: 1px solid #e8e8e8;
  background: #fff;
  .descriptions-content-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .descriptions-content-item:first-of-type {
    background-color: rgb(226, 237, 243);
    font-weight: bold;
  }
}
.descriptions-row:last-of-type {
  border-bottom: none;
}
.contract-info {
  margin: auto;
  margin-bottom: 80px;
  .row {
    margin-bottom: 16px;
    padding-left: 40px;
    .label {
      color: rgba(0,0,0,.85);
      font-weight: 400;
    }
    .value {
      color: rgba(0,0,0,.65);
    }
  }
}
</style>

