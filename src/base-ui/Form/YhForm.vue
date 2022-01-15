<template>
  <div class="yh-form">
    <el-form :labelWidth="labelWidth" ref="formRef" :model="formData">
      <el-row>
        <template v-for="item in itemForm" :key="item.label">
          <el-col v-bind="layout">
            <el-form-item v-if="!item.hidden" :label="item.label">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input :show-password="item.type === 'password'" v-model="formData[item.field]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select v-model="formData[item.field]" :placeholder="item.placeholder" style="width: 100%">
                  <el-option v-for="optItem in item.option" :label="optItem.label" :value="optItem.value" :key="optItem.value"> </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datePicker'">
                <el-date-picker
                  v-model="formData[item.field]"
                  style="width: 100%"
                  :type="item.otherOption.type"
                  :start-placeholder="item.otherOption.StartDate"
                  :end-placeholder="item.otherOption.EndDate"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"
import { ItemForm } from "./types"
import { ElForm } from "element-plus"

export default defineComponent({
  props: {
    form: Object,
    itemForm: Array as PropType<ItemForm[]>,
    labelWidth: { type: String, default: "150px" },
    layout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ["update:form"],
  setup(props: any, { emit }) {
    // const formData = computed({
    //   get: () => props.form,
    //   set: (val) => {
    //     debugger // 没有实现双向绑定
    //     emit("update:form", val)
    //   }
    // })
    const formData = ref(props.form) // 浅拷贝一份数据，不会去修改props进来的数据
    watch(
      formData,
      (val) => {
        emit("update:form", val)
      },
      { deep: true }
    )

    // 校验表单
    const formRef = ref<InstanceType<typeof ElForm>>()
    const vaildate = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 新增编辑校验功能
        } else {
          console.log("error submit!!")
          return false
        }
      })
    }
    const resetFields = () => {
      formData.value = {}
    }
    return {
      formData,
      vaildate,
      resetFields
    }
  }
})
</script>

<style scoped>
</style>

