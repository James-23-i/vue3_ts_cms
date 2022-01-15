<template>
  <div class="department">
    <pageSearch :formConfig="formConfig" @queryForm="queryForm" @resetForm="resetForm" />
    <!-- 传递 pageName -> 拼接接口 url -->
    <pageContent @onAdd="onAdd" @onEdit="onEdit" @onDel="onDel" :tableConfig="tableConfig" pageName="department" ref="pageContentRef"></pageContent>
    <pageModal
      ref="pageModalRef"
      :detailData="detailData"
      @onSave="onSave"
      :modalTitle="modalTitle"
      v-model:modalVisible="modalVisible"
      :dialogConfig="dialogConfig"
    ></pageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue"

import { formConfig } from "./config/page-search.config"
import { tableConfig } from "./config/page-content.config"
import { dialogConfig } from "./config/page-modal.config"

import { getCurrentInstance } from "vue"

import { usePage } from "@/hooks/usePage"
import { useModal } from "@/hooks/useModal"

export default defineComponent({
  name: "department",
  setup() {
    const { queryForm, resetForm, pageContentRef } = usePage()
    const { pageModalRef, editId, detailData, modalVisible, modalTitle, isEdit, store } = useModal()
    // 在 setup 使用全局属性
    const global = getCurrentInstance()
    console.log(global?.appContext.config.globalProperties)

    // 删除
    const onDel = (val: any) => {
      store.dispatch("system/delById", {
        id: val.id,
        name: pageContentRef.value?.pageName
      })
    }

    // 编辑
    const onEdit = (val: any) => {
      isEdit.value = true
      editId.value = val.id
      modalVisible.value = true
      // 调用详情接口获取数据
      store.dispatch("system/detailData", {
        id: val.id,
        name: pageContentRef.value?.pageName
      })
    }

    // 新增
    const onAdd = () => {
      isEdit.value = false
      modalVisible.value = true
    }

    // 保存
    const onSave = () => {
      store.dispatch("system/addData", {
        name: pageContentRef.value?.pageName,
        id: isEdit.value ? editId.value : null,
        params: pageModalRef.value?.form
      })
      modalVisible.value = false
    }

    // 编辑新增展示标题
    watch(
      isEdit,
      (val) => {
        modalTitle.value = val ? "编辑部门" : "新增部门"
      },
      { immediate: true }
    )
    return {
      formConfig,
      tableConfig,
      queryForm,
      resetForm,
      pageContentRef,
      pageModalRef,
      editId,
      detailData,
      modalVisible,
      modalTitle,
      isEdit,
      onDel,
      onSave,
      onEdit,
      onAdd,
      dialogConfig
    }
  }
})
</script>

<style scoped></style>
