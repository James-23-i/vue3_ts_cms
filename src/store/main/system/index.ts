import { getPage, delDataById, addData, detailData } from "@/service/main/system"
import { IRootState } from "@/store/types"
import { Module } from "vuex"
import { ISystemState } from "./type"

import utils from '@/utils/tools'

import { ElMessage } from 'element-plus'

// 模块中有当前模块的泛型和根泛型
const systemModule: Module<ISystemState, IRootState> = {
  // 使用命名空间
  namespaced: true,
  state: () => {
    return {
      usersList: [],
      roleList: [],
      goodsList: [],
      menuList: [],
      departmentList: [],
      usersTotal: 0,
      roleTotal: 0,
      goodsTotal: 0,
      menuTotal: 0,
      departmentTotal: 0,
      detailData: null
    }
  },
  mutations: {
    changeDetailData(state, payload: any) {
      state.detailData = payload
    },
    changeUsersPage(state, payload: any) {
      state.usersList = payload
    },
    changeRolePage(state, payload: any) {
      state.roleList = payload
    },
    changeGoodsPage(state, payload: any) {
      state.goodsList = payload
    },
    changeMenuPage(state, payload: any) {
      state.menuList = payload
    },
    changeDepartmentPage(state, payload: any) {
      state.departmentList = payload
    },
    changeUsersTotal(state, payload: any) {
      state.usersTotal = payload
    },
    changeRoleTotal(state, payload: any) {
      state.roleTotal = payload
    },
    changeGoodsTotal(state, payload: any) {
      state.goodsTotal = payload
    },
    changeMenuTotal(state, payload: any) {
      state.menuTotal = payload
    },
    changeDepartmentTotal(state, payload: any) {
      state.departmentTotal = payload
    },
  },
  // 定义getter （用传递的pageName动态修改分页数据和分页总数）
  getters: {
    getPageData(state) {
      return (pageName: string) => {
        // 不能以对象 . 的形式获取，就通过 [] / 动态获取时
        return (state as any)[`${pageName}List`]
      }
    },
    getPageTotal(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Total`]
      }
    },
  },
  actions: {
    async getPageList({ commit }, payload: any) {
      const apiUrl = `/${payload.name}/list`
      const { data: { totalCount, list } } = await getPage(apiUrl, payload.params)
      const commitAction = `${utils.upperFrist(payload.name)}`
      commit(`change${commitAction}Page`, list)
      commit(`change${commitAction}Total`, totalCount)
    },
    async delById({ commit }, payload: any) {
      const apiUrl = `${payload.name}/${payload.id}`
      const { code, data } = await delDataById(apiUrl)
      if (code !== 0) {
        return ElMessage({
          message: data,
          type: 'error',
        })
      } else {
        return ElMessage({
          message: '删除成功',
          type: 'success',
        })
      }
    },
    async addData({ commit }, payload: any) {
      const apiUrl = payload.id ? `${payload.name}/${payload.id}` : `${payload.name}`
      const { code, data } = await addData(apiUrl, payload.params)
      if (code !== 0) {
        return ElMessage({
          message: data,
          type: 'error',
        })
      } else {
        return ElMessage({
          message: '保存成功',
          type: 'success',
        })
      }
    },
    async detailData({ commit }, payload: any) {
      const apiUrl = `${payload.name}/${payload.id}`
      const { data } = await detailData(apiUrl)
      data && commit('changeDetailData', data)
    },
  },
}

export default systemModule
