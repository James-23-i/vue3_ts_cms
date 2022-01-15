<template>
  <div class="model">
    <el-dialog @close="onClose" v-model="visible" :title="modalTitle" width="30%" center>
      <template #footer>
        <YhForm ref="yhFormRef" v-bind="dialogConfig" v-model:form="form" />
        <slot></slot>
        <span class="dialog-footer">
          <el-button @click="onClose">关闭</el-button>
          <el-button type="primary" @click="onSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, toRefs, reactive } from "vue"

import YhForm from "@/base-ui/Form/YhForm.vue"

export default defineComponent({
  name: "pageModal",
  components: { YhForm },
  emits: ["update:modalVisible", "onSave"],
  props: {
    modalVisible: Boolean,
    modalWidth: { type: String, default: "30%" },
    modalTitle: String,
    dialogConfig: Object,
    detailData: Object
  },
  setup(props: any, { emit }) {
    // 双向绑定弹窗控制
    const { modalVisible } = toRefs(props)
    const state = reactive({
      visible: modalVisible.value
    })
    watch(
      modalVisible,
      (val) => {
        state.visible = val
      },
      { immediate: true }
    )

    // 用详情数据回显编辑
    const form = ref<any>({})
    watch(
      () => props.detailData,
      (val) => {
        props.dialogConfig?.itemForm.map((item: any) => {
          form.value[item.field] = val[item.field]
        })
      }
    )

    // 关闭、保存
    const yhFormRef = ref<InstanceType<typeof YhForm>>()
    const onClose = () => {
      emit("update:modalVisible", false)
      yhFormRef.value?.resetFields()
    }
    const onSave = () => {
      emit("onSave")
    }

    return {
      ...toRefs(state),
      onClose,
      onSave,
      form,
      yhFormRef,
    }
  }
})
</script>

<style scoped></style>
