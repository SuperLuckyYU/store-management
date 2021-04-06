<template>
  <div>
    <div class="ml-2 mb-2 mt-2" style="overflow: hidden;">
      <template v-if="type === 'add' || type === 'edit'">
        <el-tooltip v-if="!isStart">
          <template slot="content">
            开始某个商铺的绘制
          </template>
          <el-button class="mr-2" @click="handleStartClick">开始</el-button>
        </el-tooltip>
        <el-tooltip v-else>
          <template slot="content">
            完成按钮是完成当前商铺的绘制
          </template>
          <el-button class="mr-2" @click="handleCompleteClick">完成</el-button>
        </el-tooltip>
        <el-tooltip>
          <template slot="content">
            提交按钮是提交当前整个区域内所有商铺信息
          </template>
          <el-button type="primary" @click="handleSubmitRoomInfo">
            提交
          </el-button>
        </el-tooltip>
      </template>
      <el-button v-else class="fl ml-2" type="primary" @click="handleEditClick">
        修改
      </el-button>
      <el-button class="fr mr-2" type="default" @click="handleGoBackClick">
        返回
      </el-button>
    </div>
    <div class="draggable-wrapper" :class="{'view-draggable-wrapper': type === 'show'}">
      <!-- 编辑视图下的展示 -->
      <template v-if="type === 'edit' || type === 'add'">
        <el-tooltip>
          <template slot="content">
            {{isStart ? '添加元素' : '点击开始按钮以继续'}}
          </template>
          <i
            class="add-btn el-icon-circle-plus-outline"
            :class="{'desabled': !isStart}"
            @click="handleAddclick" />
        </el-tooltip>
        <el-tooltip>
          <template slot="content">
            {{type === 'edit' ? '删除所选元素' : isStart ? '删除所选元素' : '点击开始按钮以继续'}}
          </template>
          <i
            class="delete-btn el-icon-delete"
            :class="{'desabled': type === 'edit' ? false : !isStart}"
            @click="handleDeleteClick" />
        </el-tooltip>
        <div
          class="draggable-item-wrapper"
          v-for="(item, index) in layouts"
          :key="index">
          <vue-draggable-resizable
            class-name="draggable-item"
            :grid="[20,20]"
            :w="item.w"
            :h="item.h"
            :x="item.x"
            :y="item.y"
            :disable-user-select="false"
            :active="item.active"
            :draggable="type === 'edit' ? true : !isFirst"
            :resizable="type === 'edit' ? true : !isFirst"
            @dragging="onDrag(index, ...arguments)"
            @resizing="onResize(index, ...arguments)"
            @activated="onActivated(index)"
            @deactivated="onDeactivated(index)">
            {{
              index === 0 ? item.storeName : layouts[index-1].storeName !== item.storeName ? item.storeName : ''
            }}
          </vue-draggable-resizable>
        </div>

      </template>
      <!-- 浏览视图下的展示 -->
      <template v-if="type === 'show'">
        <div
          class="draggable-item-wrapper"
          v-for="(item, index) in layouts"
          :key="index">
          <vue-draggable-resizable
            class-name="draggable-item"
            :style="{background: item.storeStatus && color[item.storeStatus].color}"
            @activated="handleAreaItemClick(item.storeId)"
            :w="item.w"
            :h="item.h"
            :x="item.x"
            :y="item.y"
            :disable-user-select="false"
            :active="false"
            :draggable="false"
            :resizable="false">
            {{
              index === 0 ? item.storeName : layouts[index-1].storeName !== item.storeName ? item.storeName : ''
            }}
          </vue-draggable-resizable>
        </div>
      </template>
    </div>
    <el-dialog
      title="绑定商铺信息"
      :visible.sync="openDialog"
      width="500px"
      append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商铺名称" prop="storeId">
          <el-select v-model="form.storeId" filterable placeholder="请选择绑定商铺">
            <el-option
              v-for="item in storeOptions"
              :key="item.id"
              :label="item.storeName"
              :value="item.id">
            </el-option>
          </el-select>
          <div>暂时没有想要的？请点击<el-button type="text" @click="handleAddStoreClick">新增</el-button></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加&修改商铺弹窗 -->
    <add-stroe-dialog
      v-if="openAddStoreDialog"
      title="添加商铺信息"
      :statusOptions="statusOptions"
      :typeOptions="typeOptions"
      @UpdateStoreDialogVisible="handleCloseStoreDialog"
      @AddStoreCallback="handleAddStoreCallback" />
    <!-- 查看商铺详情弹窗 -->
    <store-detail-dialog v-if="openStoreDetail" :id="currentSelectedStoreId" @CloseStoreDetailDialog="closeStoreDetailDialog" />
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import AddStroeDialog from '../../sections/AddStoreDialog'
import StoreDetailDialog from '../../sections/StoreDetailDialog'
import { listStore, getStore } from '@/api/business/store'
import { updateArea, getArea } from "@/api/business/area"
import { COLOR } from '../../constants/store'
import "@riophae/vue-treeselect/dist/vue-treeselect.css"

export default {
  name: 'FloorPlan',
  components: {
    VueDraggableResizable,
    AddStroeDialog,
    StoreDetailDialog,
  },
  data () {
    return {
      isStart: false,
      openDialog: false,
      openAddStoreDialog: false,
      isFirst: true,
      openStoreDetail: false,
      type: 'add',
      currentSelectedStoreId: '',
      layouts: [
        // {
        //   w: 100,
        //   h: 100,
        //   x: 20,
        //   y: 20,
        //   active: false,
        //   storeName: '',
        //   storeId: '',
        // },
      ],
      currentActivedIndex: '',
      form: {},
      rules: {
        storeId: [
          { required: true, message: '请选择绑定商铺', trigger: 'blur' },
        ],
      },
      // 商铺列表数据
      storeOptions: [],
      // 商铺类型字典
      typeOptions: [],
      // 商铺状态字典
      statusOptions: [],
      storeIdMapStatus: {},
      color: COLOR,
    }
  },
  computed: {
    storeObj () {
      const ret = {}
      this.storeOptions.map(item => {
        if (!ret[item.id]) {
          ret[item.id] = item
        }
      })
      return ret
    },
  },
  created () {
    listStore({
      pageSize: 1000,
      pageNum: 1,
      areaId: this.$route.query.id
    }).then((res) => {
      this.storeOptions = res.rows
      this.fetchRoomInfo()
    })
    this.getDicts('store_type').then(({data}) => {
      this.typeOptions = data
    })
    this.getDicts('store_status').then(({data}) => {
      this.statusOptions = data
    })
  },
  methods: {
    async fetchStroeList () {
      const res = await listStore({
        pageSize: 1000,
        pageNum: 1,
        areaId: this.$route.query.id
      })
      this.storeOptions = res.rows
    },
    // 添加元素事件
    handleAddclick () {
      this.layouts.push({
        w: 100,
        h: 100,
        x: 20,
        y: 0,
        active: true,
        storeName: this.storeObj[this.form.storeId].storeName,
        storeId: this.form.storeId,
      })
    },
    // 删除元素事件
    handleDeleteClick () {
      if (!this.isStart && this.type === 'add') return
      if (this.type === 'show') return
      this.layouts.splice(this.currentActivedIndex, 1)
    },
    // 元素调整大小
    onResize (i, x, y, w, h) {
      this.layouts[i].x = x
      this.layouts[i].y = y
      this.layouts[i].w = w
      this.layouts[i].h = h
    },
    // 元素拖拽
    onDrag (i, x, y) {
      this.layouts[i].x = x
      this.layouts[i].y = y
    },
    // 元素点击
    onActivated (i) {
      this.layouts[i].active = true
      this.currentActivedIndex = i
    },
    // 元素取消选中
    onDeactivated (i) {
      this.layouts[i].active = false
    },
    // 点击开始按钮
    handleStartClick () {
      this.openDialog = true
      this.form = {}
    },
    // 点击完成按钮
    handleCompleteClick () {
      this.isStart = false
      this.form = {}
    },
    // 点击修改按钮
    handleEditClick () {
      this.type = 'edit'
    },
    // 提交绑定商户信息表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isStart = true
          this.openDialog = false
          this.isFirst = false
        } else {
          return false
        }
      });
    },
    // 取消绑定商户信息表单弹窗
    cancel () {
      this.isStart = false
      this.openDialog = false
    },
    // 点击区域展示商铺详情
    handleAreaItemClick (storeId) {
      this.currentSelectedStoreId = storeId
      this.openStoreDetail = true
    },
    // 更新商铺详情弹窗展示状态
    closeStoreDetailDialog () {
      this.openStoreDetail = false
    },
    // 添加商铺信息
    handleAddStoreClick () {
      this.openAddStoreDialog = true
    },
    // 处理新增商铺弹窗关闭回调
    handleCloseStoreDialog () {
      this.openAddStoreDialog = false
    },
    // 处理新增商铺弹窗成功回调
    handleAddStoreCallback () {
      this.fetchStroeList()
    },
    // 返回至区域列表
    handleGoBackClick () {
      this.$router.push('/business/area')
    },
    // 提交房间信息
    handleSubmitRoomInfo () {
      updateArea({
        id: this.$route.query.id,
        pid: this.$route.query.pid,
        name: this.$route.query.name,
        roomInfo: JSON.stringify(this.layouts),
      }).then(response => {
        this.msgSuccess("修改成功")
        this.$router.push('/business/area')
      });
    },
    // 根据区域id查询房间信息
    async fetchRoomInfo () {
      const res = await getArea(this.$route.query.id)
      if (res.data.roomInfo && JSON.parse(res.data.roomInfo).length > 0) {
        let roomInfo = JSON.parse(res.data.roomInfo)
        // 删除layouts中已经不再的商铺
        const allStoreIds = this.storeOptions.map(item => {
          return item.id
        })
        roomInfo = roomInfo.map((layoutItem) => {
          if (allStoreIds.indexOf(layoutItem.storeId) !== -1) {
            return layoutItem
          }
          return ''
        })
        const arr = []
        for (let i = 0; i < roomInfo.length; i++) {
          if (roomInfo[i] !== '') arr.push(roomInfo[i])
        }
        roomInfo = arr
        if (roomInfo.length > 0) {
          // 查询所有商铺的状态
          const storeIds = this.filterStore(roomInfo)
          const promises = storeIds.map(function (id) {
            return getStore(id)
          })
          try {
            const rets = await Promise.all(promises)
            rets.map(({data}) => {
              this.storeIdMapStatus[data.id] = data.status
            })
            roomInfo.map(item => {
              item.storeStatus = this.storeIdMapStatus[item.storeId]
            })
            this.layouts = roomInfo
            if (this.layouts.length > 0) this.type = 'show'
          } catch (error) {
            console.log(error)
          }
        }
      } else {
        this.type = 'add'
      }
    },
    // 筛选区域信息中的所有商铺
    filterStore (layouts) {
      const storeIds = layouts.map(item => {
        return item.storeId
      })
      return Array.from(new Set(storeIds))
    },
  },
}
</script>

<style lang="scss">
  .draggable-wrapper {
    height: 600px;
    width: 100%;
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px;
    position: relative;
    overflow: hidden;
    .add-btn {
      position: absolute;
      top: 10px;
      right: 50px;
      cursor: pointer;
      color: #409EFF;
      z-index: 9999;
    }
    .delete-btn {
      position: absolute;
      top: 10px;
      right: 20px;
      cursor: pointer;
      color: #F56C6C;
      z-index: 9999;
    }
    .desabled {
      cursor: no-drop;
      color: #909399;
    }
    .draggable-item-wrapper {
      width: 100%;
      height: 100;
      position: absolute;
      top: 0;
      left: 0;
      .draggable-item {
        border: none;
        background-color: rgb(191, 191, 191) ;
        text-align: center;
        color: white;
      }
    }
  }
  .view-draggable-wrapper {
    width: 99%;
    margin: auto;
    background: rgb(238, 245, 254);
    border: 1px solid #EBEEF5;
  }
</style>

