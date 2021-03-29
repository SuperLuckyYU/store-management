<template>
  <div id="app">
    <router-view />
    <!--  底部  -->
    <div class="app-login-footer">
      <div style="width:300px;margin:0 auto;margin-top: 10px;">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011302003323" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
          <img src="@/assets/images/huizhang.png" style="vertical-align: middle;" />
          <span style="margin-left: 5px;color:#939393;">京公网安备 11011302003323号</span>
        </a >
      </div>
      <div style="margin-top: 5px">
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="nofollow">京ICP备2021008492号-1</a>
        <span>版权所有© 2021 北京恒易相元科技有限公司</span>
      </div>
    </div>
  </div>
</template>

<script>
export default  {
  name:  'App'
}
</script>

<style scoped>
.app-login-footer {
  height: 60px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
  background: black;
}
</style>
