import { createStore, Store, useStore } from "vuex"

import { IRootState, IStoreType } from './types'

import { getDepartmentList, getRoleList, getMenuList } from '@/service/option'

import login from './login/login'
import system from "./main/system"
import analysis from "./main/analysis"

const store = createStore<IRootState>({
  state: () => {
    return {
      departmentList: [],
      roleList: [],
      menuList: []
    }
  },
  mutations: {
    changeDepartmentList(state, payload: any) {
      state.departmentList = payload
    },
    changeRoleList(state, payload: any) {
      state.roleList = payload
    },
    changeMenuList(state, payload: any) {
      state.menuList = payload
    },
  },
  actions: {
    async getOption({ commit }) {
      const params = { offset: 0, size: 999 }
      const { data: depList } = await getDepartmentList('/department/list', params)
      const { data: roleList } = await getRoleList('/role/list', params)
      const { data: menuList } = await getMenuList('/menu/list', params)
      depList && commit('changeDepartmentList', depList.list)
      roleList && commit('changeRoleList', roleList.list)
      menuList && commit('changeMenuList', menuList.list)
    },
  },
  modules: {
    login,
    system,
    analysis,
  }
})

export default store

// 导出一个每次登录完都会获取token、userInfo、menus的方法（并在main.ts初始化调用）
// 加上初始化部门列表和角色列表
// （问题：token userinfo menus list都是异步请求，又可能导致加载顺序问题，token有可能没有拿到已经请求list了导致出现没有值的情况）
export function getInitData() {
  store.dispatch('login/getInitData')
  // store.dispatch('getOption')
}
// 使用接口继承store子模块
export function storeType(): Store<IStoreType> {
  return useStore()
}
