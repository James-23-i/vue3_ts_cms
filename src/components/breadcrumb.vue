<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadList" :key="item.name">
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { IBreadItem } from "./types"

export default defineComponent({
  props: {
    breadList: Array as PropType<IBreadItem[]>
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>

