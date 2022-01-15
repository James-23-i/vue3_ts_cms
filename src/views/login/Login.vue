<template>
  <div id="login">
    <div class="login">
      <el-tabs type="border-card" v-model="currentTab">
        <el-tab-pane class="item" label="账号登录" name="info">
          <loginInfo ref="loginInfoRef" />
        </el-tab-pane>
        <el-tab-pane class="item" label="手机登录" name="phone">
          <loginPhone ref="loginPhoneRef" />
        </el-tab-pane>
      </el-tabs>
      <div class="bottom" flex="main:justify">
        <el-checkbox v-model="isRemember" label="记住密码"></el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button @click="onLogin" style="width: 320px" type="primary">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import loginInfo from "./child/loginInfo.vue"
import loginPhone from "./child/loginPhone.vue"

import { defineComponent, ref } from "vue"

export default defineComponent({
  setup() {
    const currentTab = ref("info")
    // 忘记密码复选框
    const isRemember = ref(true)

    // 获取子组件的校验登录
    const loginInfoRef = ref<InstanceType<typeof loginInfo>>()
    const loginPhoneRef = ref<InstanceType<typeof loginPhone>>()
    const onLogin = () => {
      if (currentTab.value === "info") {
        // 当用密码登录要记住密码时
        loginInfoRef.value?.loginAction(isRemember.value)
      } else {
        loginPhoneRef.value?.loginAction()
      }
    }

    return {
      isRemember,
      loginInfoRef,
      onLogin,
      currentTab,
      loginPhoneRef
    }
  },
  components: {
    loginPhone,
    loginInfo
  }
})
</script>

<style scoped lang="less">
#login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .bottom{
    padding-top: 20px;
  }
}
</style>
