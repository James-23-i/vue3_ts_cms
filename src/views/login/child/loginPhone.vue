<template>
  <div class="loginPhone">
    <el-form
    ref="rulePhoneRef"
    :model="info"
    :rules="phoneRules"
    >
      <el-form-item label="手机" prop="num">
        <el-input v-model="info.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verify">
        <el-input v-model="info.verify"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import {phoneRules} from '../config'
import { ElForm } from 'element-plus'

import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    // 登录信息
    const info = reactive({
      num: '',
      verify: ''
    })

    const rulePhoneRef = ref<InstanceType <typeof ElForm>>()
    // 校验通过调用函数
    const loginAction = () => {
      rulePhoneRef.value?.validate((vaild) => {
        if (vaild) {
          console.log("登录成功")
          store.dispatch('login/phoneLoginAction', {...info})
        }
      })
    }
    return {
      info,
      phoneRules,
      loginAction,
      rulePhoneRef
    }
  }
})
</script>

<style scoped lang="less">
.loginPhone {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

