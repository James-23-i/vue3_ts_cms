<template>
  <div class="loginInfo">
    <el-form ref="ruleInfoRef" :model="info" :rules="infoRules">
      <el-form-item label="账号" prop="name">
        <el-input v-model="info.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="info.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"

import { infoRules } from "../config"

import { ElForm } from "element-plus"

import Cache from '@/utils/cache/cache'

import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    // 登录信息
    const info = reactive({
      name: Cache.getCache('name') || '',
      password: Cache.getCache('password') || '',
    })

    const ruleInfoRef = ref<InstanceType<typeof ElForm>>()
    // 校验通过调用函数
    const loginAction = (isRemember: boolean) => {
      ruleInfoRef.value?.validate((vaild) => {
        if (vaild) {
          // 登录逻辑
          store.dispatch('login/infoLoginAction', {...info})

          // 是否记住密码
          if (isRemember) {
            Cache.setCache('name', info.name)
            Cache.setCache('password', info.password)
          } else {
            Cache.delCache('name')
            Cache.delCache('password')
          }
        }
      })
    }
    return {
      info,
      infoRules,
      loginAction,
      ruleInfoRef
    }
  }
})
</script>

<style scoped lang="less">
.loginInfo {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
