<template>
  <div class="tree">
    <el-tree ref="treeRef" :data="data" node-key="id" :props="props" show-checkbox @check="handleCheckChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { ElTree } from 'element-plus'

export default defineComponent({
  name: "YhTree",
  props: {
    data: Array,
    props: { type: Object, default: () => ({}) }
  },
  setup(props: any, { emit }) {
    const handleCheckChange = (data1: any, data2: any) => {
      // emit("checkData", { data1, data2 })
      emit("checkData", data2)
    }
    const treeRef = ref<InstanceType <typeof ElTree>>()
    return {
      handleCheckChange,
      treeRef
    }
  }
})
</script>

<style scoped>
</style>

