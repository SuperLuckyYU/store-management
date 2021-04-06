<template>
  <div class="statistic">
    <div class="statistic-title">{{ title }}</div>
    <div class="statistic-content">
      <span class="statistic-content-value">
        <span class="statistic-content-value-int" :style="{...valueStyle}">{{ value }}</span>
      </span>
      <span class="statistic-content-suffix" :style="{...valueStyle}">
        {{ suffix }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseStatistic',
  props: {
    title: {
      type: String,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    suffix: {
      type: String,
    },
    valueStyle: {
      type: Object,
    },
  },
  data () {
    return  {

    }
  },
}
</script>

<style lang="scss" scoped>
  .statistic {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: "tnum";
    .statistic-title {
      margin-bottom: 4px;
      color: rgba(0,0,0,.45);
      font-size: 14px;
    }
    .statistic-content {
      color: rgba(0,0,0,.85);
      font-size: 24px;
      font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
      .statistic-content-suffix {
        margin-left: 4px;
        font-size: 16px;
      }
    }
  }
</style>
