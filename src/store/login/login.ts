import { Module } from "vuex"

import { ILoginState } from './type'
import { IRootState } from '../types'

import { login, getUserInfoById, getRuleMenusById } from '@/service/login/login'
import { ILogin } from '@/service/login/type'

import Cache from '@/utils/cache/cache'
import { mapMenu, getPermission } from '@/utils/mapMenu/mapMenu'

import router from '@/router'

// export interface Module<S, R> {
//   namespaced?: boolean;
//   state?: S | (() => S);
//   getters?: GetterTree<S, R>;
//   actions?: ActionTree<S, R>;
//   mutations?: MutationTree<S>;
//   modules?: ModuleTree<R>;
// }

// 模块中有当前模块的泛型和根泛型
const loginModule: Module<ILoginState, IRootState> = {
  // 使用命名空间
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      menus: [],
      permission: [],
    }
  },
  mutations: {
    changeToken(state, payload: string) {
      state.token = payload
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload
    },
    changeMenus(state, payload: any) {
      state.menus = payload
      // 注册动态路由
      mapMenu(payload).forEach(route => {
        if (route) router.addRoute('main', route)
      })
      // 获取按钮权限
      state.permission = getPermission(payload)
    },
  },
  actions: {
    async infoLoginAction({ commit, dispatch }, payload: ILogin) {
      // 登录：获取token和id
      const loginInfo = await login(payload)
      const { id, token } = loginInfo.data
      commit('changeToken', token)
      Cache.setCache('token', token)

      // 在获取完token后再去请求list数据
      dispatch('getOption', null, { root: true })

      // 根据id获取用户信息
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      commit('changeUserInfo', userInfo)
      Cache.setCache('userInfo', userInfo)

      // 根据id获取不同权限的菜单（根据登录用户权限下的id）
      const menusRes = await getRuleMenusById(userInfo.role.id)
      const menus = menusRes.data
      commit('changeMenus', menus)
      Cache.setCache('menus', menus)

      router.push('/main')

    },
    // 刷新Vuex数据丢失问题
    getInitData({ commit, dispatch }) {
      // 要做判断，因为没有登录时，没有token userInfo、menus
      const token = Cache.getCache('token')
      if (token) {
        commit('changeToken', token)
        dispatch('getOption', null, { root: true })
      }
      const userInfo = Cache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const menus = Cache.getCache('menus')
      if (menus) {
        commit('changeMenus', menus)
      }
    }

    // phoneLoginAction({ commit }, payload) {
    //   console.log('登录', payload)
    // },
  }
}

export default loginModule
