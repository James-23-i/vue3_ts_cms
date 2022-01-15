<template>
  <div class="goods">
    <pageSearch :formConfig="formConfig" @queryForm="queryForm" @resetForm="resetForm" />
    <!-- 传递 pageName -> 拼接接口 url -->
    <pageContent :tableConfig="tableConfig" pageName="goods" ref="pageContentRef">
      <template #image="scope">
        <el-image
          style="height:60px; width:60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
      <template #status="scope">
        <el-button size="mini" type="primary" plain>{{scope.row.status ? '启用' : '禁用'}}</el-button>
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
  name: "goods",
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

