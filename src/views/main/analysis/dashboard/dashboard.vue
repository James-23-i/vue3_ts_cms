<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="7">
        <YhCard title="分类商品数量（饼图）">
          <PieEchart :pieData="pieData" />
        </YhCard>
      </el-col>
      <el-col :span="10">
        <YhCard title="不同城市销售数量">
          <CityEchart :cityData="cityData" />
        </YhCard>
      </el-col>
      <el-col :span="7">
        <YhCard title="分类商品数量（玫瑰图）">
          <RoseEchart :roseData="pieData" />
        </YhCard>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="12">
        <YhCard title="分类商品数量">
          <LineEchart v-bind="lineData" />
        </YhCard>
      </el-col>
      <el-col :span="12">
        <YhCard title="分类商品收藏">
          <ShadowEchart v-bind="shadowData" />
        </YhCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { storeType } from "@/store"
import { defineComponent, computed } from "vue"
import PieEchart from "@/components/pie-echart.vue"
import RoseEchart from "@/components/rose-echart.vue"
import LineEchart from "@/components/line-echart.vue"
import ShadowEchart from "@/components/shadow-echart.vue"
import CityEchart from "@/components/city-echart.vue"

export default defineComponent({
  name: "dashboard",
  components: { PieEchart, RoseEchart, LineEchart, ShadowEchart, CityEchart },
  setup() {
    const store = storeType()
    store.dispatch("analysis/getGoodsData")
    const pieData = computed(() => store.state.analysis.goodsCount.map((item: any) => ({ name: item.name, value: item.goodsCount })))
    const lineData = computed(() => {
      const data = store.state.analysis.goodsSale
      const xLabels: string[] = []
      const values: any[] = []
      if (data) {
        for (const item of data) {
          xLabels.push(item.name)
          values.push(item.goodsCount)
        }
      }
      return { xLabels, values }
    })
    const shadowData = computed(() => {
      const data = store.state.analysis.goodsFavor
      const xLabels: string[] = []
      const values: any[] = []
      if (data) {
        for (const item of data) {
          xLabels.push(item.name)
          values.push(item.goodsFavor)
        }
      }
      return { xLabels, values }
    })
    const cityData = computed(() => store.state.analysis.goodsAddress.map((item: any) => ({ name: item.address, value: item.count })))
    return {
      pieData,
      lineData,
      shadowData,
      cityData
    }
  }
})
</script>

<style scoped></style>
