<template>
  <div class="page-content">
    <!-- <YhTable :type="type" @handleSelection="handleSelection" :pageList="pageList" :propList="propList"> -->
    <YhTable
      :btn="btn"
      :isCreate="isCreate"
      v-model:pageParams="pageParams"
      v-bind="tableConfig"
      :pageList="pageData"
      :total="pageTotal"
    >
      <!-- 共有的插槽 -->
      <template #createAt="scope">
        <span>{{ $utils.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $utils.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #action="scope">
        <div class="actionBtn">
          <el-button plain size="mini" v-if="isUpdate" @click="onEdit(scope.row)" type="primary">编辑</el-button>
          <el-button plain size="mini" v-if="isDelete" @click="onDel(scope.row)" type="danger">删除</el-button>
        </div>
      </template>

      <!-- 自己组件内独有的插槽，遍历独有的table列，动态获取slotName -->
      <template v-for="item in commonSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </YhTable>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import YhTable from "@/base-ui/table/YhTable.vue"

import { useAction } from "@/hooks/useAction"
import { usePermission } from "@/hooks/usePermission"

export default defineComponent({
  name: 'pageContent',
  components: { YhTable },
  props: {
    tableConfig: Object,
    pageName: String
  },
  emits: ["onEdit", "onDel", "onAdd"],
  setup(props: any, { emit }) {
    const { isBtnPermission } = usePermission()
    // 是否有按钮权限
    const isCreate = isBtnPermission(props.pageName, "create")
    const isUpdate = isBtnPermission(props.pageName, "update")
    const isDelete = isBtnPermission(props.pageName, "delete")
    const isQuery = isBtnPermission(props.pageName, "query")
    const { getData, pageData, pageTotal, pageParams } = useAction(props, isQuery)

    // 定义共有的插槽
    const arr = ["createAt", "updateAt", "action"]
    const commonSlots = computed(() => {
      return props.tableConfig.propList.filter((item: any) => {
        return !arr.includes(item.slotName)
      })
    })

    // 表格头部按钮
    const btn = [{ text: "新增", cb: (loading: boolean) => onAdd(loading), loading: false }]

    // 新增 编辑 删除功能
    const onAdd = (loading: boolean) => {
      emit("onAdd", loading)
    }
    const onEdit = (row: any) => {
      emit("onEdit", row)
    }
    const onDel = (row: any) => {
      emit("onDel", row)
    }

    return {
      btn,
      getData,
      pageData,
      pageTotal,
      pageParams,
      commonSlots,
      isCreate,
      isUpdate,
      isDelete,
      onDel,
      onEdit,
      onAdd
    }
  }
})
</script>

<style scoped>
</style>

