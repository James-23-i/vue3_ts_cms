<template>
  <div class="yh-table">
    <!-- 头部可以用插槽实现，也可以使用props实现 -->
    <!-- <div class="header">
      <slot name="header"></slot>
    </div> -->
    <div class="header">
      <div class="header-left">
        <slot name="title">
          <h3>{{ title }}</h3>
        </slot>
      </div>
      <div class="header-right" v-if="btn?.length">
        <template v-for="item in btn" :key="item.text">
          <!-- v-bind="item.prop" 按钮的属性 -->
          <el-button
            v-if="isCreate"
            :size="item.prop?.size || 'medium'"
            :type="item.prop?.type || 'primary'"
            :plain="item.prop?.plain || true"
            :round="item.prop?.round"
            :circle="item.prop?.circle"
            :disabled="item.prop?.disabled"
            :icon="item.prop?.icon"
            :loading="item.loading"
            @click="() => btnClick(item.cb, item.loading)"
          >
            {{ item.text }}
          </el-button>
        </template>
      </div>
    </div>
    <el-table v-bind="treeProps" :data="pageList" @selection-change="handleSelection" border style="width: 100%">
      <el-table-column align="center" :type="type"></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column show-overflow-tooltip align="center" :prop="item.prop" :label="item.label" :min-width="item.width">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row"> {{ scope.row[item.prop] }} </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="page">
      <el-pagination
        :current-page="pageParams.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useAttrs } from "vue"

export default defineComponent({
  props: {
    pageParams: Object, // 双向绑定的分页数据
    total: Number, // 接口数据total
    pageList: Array, // 接口表格数据
    propList: Array, // 配置列表数据
    type: String, // 表格序号或者选择框
    btn: Array, // 表格头部按钮
    title: String, // 表格头部标题
    page: { type: Boolean, default: true }, // 是否分页
    // treeProps: Object // 树形表格使用
    isCreate: Boolean, // 是否有新增权限
  },
  emits: ["handleSelection", "update:pageParams"],
  setup(props: any, { emit }) {
    const { treeProps } = useAttrs() // 跨级组件传值
    const handleSelection = (value: any) => {
      emit("handleSelection", value)
    }

    // 处理分页数据
    const handleCurrentChange = (pageNum: number) => {
      emit("update:pageParams", { ...props.pageParams, pageNum }) // 用分页时改变的参数替换props的值
    }
    const handleSizeChange = (pageSize: number) => {
      emit("update:pageParams", { ...props.pageParams, pageSize })
    }

    // 调用btn传递进来的回调函数和loading，给外部使用
    const btnClick = (fun: any, loading: boolean) => {
      fun(loading)
    }
    return {
      handleCurrentChange,
      handleSizeChange,
      handleSelection,
      treeProps,
      btnClick
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>

