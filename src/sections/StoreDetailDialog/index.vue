<template>
  <el-dialog title="商铺详情信息" @close="handleCloseClick" :visible="true" append-to-body>
    <span>{{id}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloseClick">取 消</el-button>
      <el-button type="primary" @click="handleCloseClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
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
    }
  },
  methods: {
    handleCloseClick() {
      this.$emit('CloseStoreDetailDialog')
    }
  }
}
</script>
