<template>
  <div>
    <div class="mb-2 mt-2">
      <el-tooltip v-if="isStart">
        <template slot="content">
          开始当前商铺的绘制
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
        <el-button type="primary">
          提交
        </el-button>
      </el-tooltip>
    </div>
    <div class="draggable-wrapper">
      <el-tooltip>
        <template slot="content">
          添加元素
        </template>
        <i
          class="add-btn el-icon-circle-plus-outline"
          @click="handleAddclick" />
      </el-tooltip>
      <el-tooltip>
        <template slot="content">
          删除所选元素
        </template>
        <i
          class="delete-btn el-icon-delete"
          two-tone-color="#eb2f96"
          @click="handleDeleteClick" />
      </el-tooltip>
      <vue-draggable-resizable
        class-name="draggable-item"
        :grid="[20,20]"
        :w="item.w"
        :h="item.h"
        :x="item.x"
        :y="item.y"
        :active="item.active"
        @dragging="onDrag(index, ...arguments)"
        @resizing="onResize(index, ...arguments)"
        @activated="onActivated(index)"
        @deactivated="onDeactivated(index)"
        v-for="(item, index) in layouts"
        :key="index" />
    </div>
    <el-dialog title="绑定商户信息" :visible.sync="openDialog" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商户名称" prop="storeName">
          <el-select v-model="form.storeName" filterable placeholder="请选择绑定商户">
            <el-option
              v-for="item in storeOptions"
              :key="item.id"
              :label="item.storeName"
              :value="item.id">
            </el-option>
          </el-select>
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
import VueDraggableResizable from 'vue-draggable-resizable'
import { listStore } from '@/api/business/store'

export default {
  name: 'FloorPlan',
  components: {
    VueDraggableResizable,
  },
  data () {
    return {
      layouts: [
        {
          w: 100,
          h: 100,
          x: 0,
          y: 0,
          active: false,
        },
      ],
      currentActivedIndex: '',
      isStart: true,
      openDialog: false,
      form: {},
      rules: {},
      storeOptions: [],
    }
  },
  created () {
    this.fetchStroeList()
  },
  methods: {
    async fetchStroeList () {
      const res = await listStore({
        pageSize: 1,
        pageNum: 10000,
      })
      this.storeOptions = res.rows
    },
    handleAddclick () {
      this.layouts.push({
        w: 100,
        h: 100,
        x: 0,
        y: -100 * this.layouts.length,
        active: true,
      })
    },
    handleDeleteClick () {
      this.layouts.splice(this.currentActivedIndex, 1)
    },
    onResize (i, x, y, w, h) {
      this.layouts[i].x = x
      this.layouts[i].y = y
      this.layouts[i].w = w
      this.layouts[i].h = h
    },
    onDrag (i, x, y) {
      this.layouts[i].x = x
      this.layouts[i].y = y
    },
    onActivated (i) {
      this.layouts[i].active = true
      this.currentActivedIndex = i
    },
    onDeactivated (i) {
      this.layouts[i].active = false
    },
    handleStartClick () {
      this.isStart = false
      this.openDialog = true
    },
    handleCompleteClick () {

    },
    submitForm () {

    },
    cancel () {
      this.isStart = true
      this.openDialog = false
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
    }
    .delete-btn {
      position: absolute;
      top: 10px;
      right: 20px;
      cursor: pointer;
      color: #F56C6C;
    }
    .draggable-item {
      border: none;
      background-color: rgb(191, 191, 191) ;
      text-align: center;
    }
  }
</style>

