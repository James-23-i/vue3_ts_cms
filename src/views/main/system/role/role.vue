<template>
  <div class="role">
    <pageSearch :formConfig="formConfig" @queryForm="queryForm" @resetForm="resetForm" />
    <!-- 传递 pageName -> 拼接接口 url -->
    <pageContent @onAdd="onAdd" @onEdit="onEdit" @onDel="onDel" :tableConfig="tableConfig" pageName="role" ref="pageContentRef" />
    <pageModal
      ref="pageModalRef"
      :detailData="detailData"
      @onSave="onSave"
      :modalTitle="modalTitle"
      v-model:modalVisible="modalVisible"
      :dialogConfig="dialogConfig"
    >
      <YhTree ref="treeRef" :data="menuList" :props="props" @checkData="checkData" />
    </pageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, nextTick } from "vue"

import pageSearch from "@/components/page-search.vue"
import pageContent from "@/components/page-content.vue"

import { formConfig } from "./config/page-search.config"
import { tableConfig } from "./config/page-content.config"
import { dialogConfig } from "./config/page-modal.config"

import { getCurrentInstance } from "vue"

import { usePage } from "@/hooks/usePage"
import { useModal } from "@/hooks/useModal"

import { getRoleLeaf } from "@/utils/mapMenu/mapMenu"

import YhTree from "@/base-ui/tree/YhTree.vue"

export default defineComponent({
  name: "role",
  components: { pageSearch, pageContent },
  setup() {
    const treeRef = ref<InstanceType<typeof YhTree>>()
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
      // 调用详情接口获取数据（角色这里详情没有返回树形数据，用分页数据处理）
      store.dispatch("system/detailData", {
        id: val.id,
        name: pageContentRef.value?.pageName
      })
      if (val.menuList.length > 0) {
        const leafArr = getRoleLeaf(val.menuList)
        nextTick(() => {
          treeRef.value?.treeRef?.setCheckedKeys(leafArr, false)
        })
      }
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
        params: {
          ...pageModalRef.value?.form,
          menuList: permissDepartList.value
        }
      })
      modalVisible.value = false
    }

    // 编辑新增展示标题
    watch(
      isEdit,
      (val) => {
        modalTitle.value = val ? "编辑角色" : "新增角色"
      },
      { immediate: true }
    )

    // 部门的树形列表
    const menuList = computed(() => store.state.menuList)
    const props = {
      label: "name",
      children: "children"
    }
    const permissDepartList = ref<any>([])
    const checkData = (val: any) => {
      permissDepartList.value = [...val.checkedKeys, ...val.halfCheckedKeys]
    }
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
      dialogConfig,
      menuList,
      props,
      checkData,
      permissDepartList,
      treeRef
    }
  }
})
</script>

<style scoped></style>
