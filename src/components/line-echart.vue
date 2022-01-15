<template>
  <div class="line-echart">
    <base-echart :echartOption="echartOption" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"
import { IxLabels, IValues } from "./types"

export default defineComponent({
  props: {
    xLabels: Array as PropType<IxLabels[]>,
    values: Array as PropType<IValues[]>
  },
  setup(props: any) {
    const echartOption = computed(() => {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: props.xLabels
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "分别销量",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series"
            },
            data: props.values
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

