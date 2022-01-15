<template>
  <div class="base-echart">
    <div ref="echartRef" :style="echartStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from "vue"
import { useEchart } from "./hooks/useEchart"

export default defineComponent({
  name: "base-echart",
  props: {
    echartStyle: {
      type: Object,
      default: () => ({
        width: "100%",
        height: "300px"
      })
    },
    echartOption: Object
  },
  setup(props: any) {
    const echartRef = ref<HTMLElement>()
    onMounted(() => {
      const { setOption } = useEchart(echartRef.value!)
      watchEffect(() => setOption(props.echartOption)) // 使用watchEffect自动监听加载dom挂载echart
    })
    return {
      echartRef
    }
  }
})
</script>

<style scoped>
</style>

