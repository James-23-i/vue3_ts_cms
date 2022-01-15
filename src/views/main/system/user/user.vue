<template>
  <div class="user">
    <pageSearch :formConfig="formConfig" @queryForm="queryForm" @resetForm="resetForm" />
    <!-- 传递 pageName -> 拼接接口 url -->
    <pageContent @onAdd="onAdd" @onEdit="onEdit" @onDel="onDel" :tableConfig="tableConfig" pageName="users" ref="pageContentRef">
      <template #status="scope">
        <el-button size="mini" type="primary">{{ scope.row.enable ? "启用" : "禁用" }}</el-button>
      </template>
    </pageContent>
    <pageModal
      ref="pageModalRef"
      :detailData="detailData"
      @onSave="onSave"
      :modalTitle="modalTitle"
      v-model:modalVisible="modalVisible"
      :dialogConfig="modalComputedRef"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue"

import { formConfig } from "./config/page-search.config"
import { tableConfig } from "./config/page-content.config"
import { dialogConfig } from "./config/page-modal.config"

import { getCurrentInstance } from "vue"

import { usePage } from "@/hooks/usePage"
import { useModal } from "@/hooks/useModal"

export default defineComponent({
  name: "user",
  setup() {
    const { queryForm, resetForm, pageContentRef } = usePage()
    const { pageModalRef, editId, detailData, modalVisible, modalTitle, isEdit, store } = useModal()
    // 在 setup 使用全局属性，当前组件的所有方法
    const global = getCurrentInstance()
    console.log(global?.appContext.config.globalProperties)
    console.log(global)

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
      dialogConfig.itemForm.find((item: any) => item.field === "password")!.hidden = true
      // 调用详情接口获取数据
      store.dispatch("system/detailData", {
        id: val.id,
        name: pageContentRef.value?.pageName
      })
    }

    // 新增
    const onAdd = (loading: boolean) => {
      isEdit.value = false
      dialogConfig.itemForm.find((item: any) => item.field === "password")!.hidden = false
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
        modalTitle.value = val ? "编辑用户" : "新增用户"
      },
      { immediate: true }
    )

    // 获取部门，角色列表
    const modalComputedRef = computed(() => {
      dialogConfig.itemForm.find((item: any) => item.field === "departmentId")!.option = store.state.departmentList.map((item) => ({
        label: item.name,
        value: item.id
      }))
      dialogConfig.itemForm.find((item: any) => item.field === "roleId")!.option = store.state.roleList.map((item) => ({
        label: item.name,
        value: item.id
      }))
      return dialogConfig
    })

    return {
      formConfig,
      tableConfig,
      dialogConfig,
      queryForm,
      resetForm,
      pageContentRef,
      modalVisible,
      onAdd,
      onDel,
      onEdit,
      onSave,
      modalTitle,
      detailData,
      isEdit,
      editId,
      pageModalRef,
      modalComputedRef
    }
  }
})
</script>

<style scoped></style>
