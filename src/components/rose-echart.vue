<template>
  <div class="rose-echart">
    <base-echart :echartOption="echartOption" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"
import { IEchart } from "./types"

export default defineComponent({
  props: {
    roseData: Array as PropType<IEchart[]>
  },
  setup(props: any) {
    const echartOption = computed(() => {
      return {
        legend: {
          top: "bottom"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [10, 100],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8
            },
            data: props.roseData
          }
        ]
      }
    })
    return {
      echartOption
    }
  }
})
</script>

<style scoped>
</style>

