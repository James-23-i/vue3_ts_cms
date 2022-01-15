<template>
  <div class="pie-echart">
    <base-echart :echartOption="echartOption" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"
import { IEchart } from "./types"

export default defineComponent({
  props: {
    pieData: Array as PropType<IEchart[]>
  },
  setup(props: any) {
    const echartOption = computed(() => {
      return {
        // title: {
        //   text: "Referer of a Website",
        //   subtext: "Fake Data",
        //   left: "center"
        // },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "horizontal",
          left: "left"
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: props.pieData, // 只是传递值，但是不是可响应式的 -> 包裹 computed
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
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

