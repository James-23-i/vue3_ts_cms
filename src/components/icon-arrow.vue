<template>
  <div class="nav-header" @click="onIcon">
    <el-icon class="fold-menu" v-if="!isFold"><d-arrow-left /></el-icon>
    <el-icon class="fold-menu" v-if="isFold"><d-arrow-right /></el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {DArrowLeft, DArrowRight} from '@element-plus/icons'
export default defineComponent({
  emits: ['changeFold'],
  setup (props, {emit}) {
    const isFold = ref(false)
    const onIcon = () => {
      isFold.value = !isFold.value
      emit('changeFold', isFold.value)
    }
    return {
      isFold,
      onIcon
    }
  },
  components: {
    DArrowLeft,
    DArrowRight
  },
})
</script>

<style lang="less" scoped>
.nav-header {
  .fold-menu {
    font-size: 26px;
    cursor: pointer;
  }
}
</style>

