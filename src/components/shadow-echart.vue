<template>
  <div class="shadow-echart">
    <base-echart :echartOption="echartOption" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"
import { IxLabels, IValues } from "./types"
import * as echarts from 'echarts'

export default defineComponent({
  props: {
    xLabels: Array as PropType<IxLabels[]>,
    values: Array as PropType<IValues[]>
  },
  setup(props: any) {
    const echartOption = computed(() => {
      return {
        xAxis: {
          data: props.xLabels,
          axisLabel: {
            inside: true,
            color: "#fff"
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#999"
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
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

