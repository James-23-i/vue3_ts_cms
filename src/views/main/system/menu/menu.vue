<template>
  <div class="menu">
    <pageSearch :formConfig="formConfig" @queryForm="queryForm" @resetForm="resetForm" />
    <!-- 传递 pageName -> 拼接接口 url -->
    <pageContent :tableConfig="tableConfig" pageName="menu" ref="pageContentRef">
      <template #type="scope">
        <el-button size="medium" type="success">{{ scope.row.type + "级" }}</el-button>
      </template>
    </pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { formConfig } from "./config/page-search.config"
import { tableConfig } from "./config/page-content.config"

import { getCurrentInstance } from "vue"

import { usePage } from "@/hooks/usePage"

export default defineComponent({
  name: "menu",
  setup() {
    const { queryForm, resetForm, pageContentRef } = usePage()
    // 在 setup 使用全局属性
    const global = getCurrentInstance()
    console.log(global?.appContext.config.globalProperties)
    return {
      formConfig,
      tableConfig,
      queryForm,
      resetForm,
      pageContentRef
    }
  }
})
</script>

<style scoped></style>


