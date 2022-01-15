export interface IRootState {
  departmentList: any[]
  roleList: any[]
  menuList: any[]
}

/**
 * 定义交叉类型（根 当前页面（子模块）所使用的类型）
 * 解决当Vuex集成typescript时，不能使用 IRootState 找到对应的子模块
*/

import { ILoginState } from '@/store/login/type'
import { ISystemState } from './main/system/type'
import { IAnalysisState } from './main/analysis/type'
export interface IRootWidthModule {
  login: ILoginState
  system: ISystemState
  analysis: IAnalysisState
}

export type IStoreType = IRootWidthModule & IRootState
