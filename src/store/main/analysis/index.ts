import { getGoodsAddress, getGoodsAmount, getGoodsCount, getGoodsFavor, getGoodsSale, getGoodsSaleTopTen } from "@/service/main/analysis"
import { IRootState } from "@/store/types"
import { Module } from "vuex"
import { IAnalysisState } from "./type"

// 模块中有当前模块的泛型和根泛型
const analysisModule: Module<IAnalysisState, IRootState> = {
  // 使用命名空间
  namespaced: true,
  state: () => {
    return {
      goodsCount: [],
      goodsSale: [],
      goodsFavor: [],
      goodsSaleTopTen: [],
      goodsAddress: [],
      goodsAmount: []
    }
  },
  mutations: {
    changeGoodsCount(state, payload) {
      state.goodsCount = payload
    },
    changeGoodsSale(state, payload) {
      state.goodsSale = payload
    },
    changeGoodsFavor(state, payload) {
      state.goodsFavor = payload
    },
    changeGoodsSaleTopTen(state, payload) {
      state.goodsSaleTopTen = payload
    },
    changeGoodsAddress(state, payload) {
      state.goodsAddress = payload
    },
    changeGoodsAmount(state, payload) {
      state.goodsAmount = payload
    },
  },
  getters: {

  },
  actions: {
    async getGoodsData({ commit }) {
      const { data: goodsCount } = await getGoodsCount()
      const { data: goodsSale } = await getGoodsSale()
      const { data: goodsFavor } = await getGoodsFavor()
      const { data: goodsSaleTopTen } = await getGoodsSaleTopTen()
      const { data: goodsAddress } = await getGoodsAddress()
      const { data: goodsAmount } = await getGoodsAmount()
      goodsCount && commit('changeGoodsCount', goodsCount)
      goodsSale && commit('changeGoodsSale', goodsSale)
      goodsFavor && commit('changeGoodsFavor', goodsFavor)
      goodsSaleTopTen && commit('changeGoodsSaleTopTen', goodsSaleTopTen)
      goodsAddress && commit('changeGoodsAddress', goodsAddress)
      goodsAmount && commit('changeGoodsAmount', goodsAmount)
    }
  },
}

export default analysisModule
