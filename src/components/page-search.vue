<template>
  <div class="page-search">
    <yh-form v-bind="formConfig" ref="yhFormRef" v-model:form="form" />
    <div class="formBtn">
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button @click="resetForm">清空</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import YhForm from "@/base-ui/Form/YhForm.vue"

export default defineComponent({
  name: 'pageSearch',
  components: { YhForm },
  props: {
    formConfig: Object
  },
  emits: ['queryForm', 'resetForm'],
  setup(props: any, { emit }) {
    // 双向绑定表单的值通过 config 配置遍历出来
    const obj: any = {}
    props.formConfig.itemForm.map((item: any) => {
      return (obj[item.field] = "")
    })
    const form = ref(obj)

    // 查询清空逻辑
    const yhFormRef = ref<InstanceType<typeof YhForm>>()
    const submitForm = () => {
      // 校验
      yhFormRef.value?.vaildate()
      // 查询
      emit('queryForm', form.value)
    }
    const resetForm = () => {
      // 清空
      yhFormRef.value?.resetFields()
      emit('resetForm')
    }
    return {
      form,
      submitForm,
      yhFormRef,
      resetForm,
    }
  }
})
</script>

<style scoped>
</style>

