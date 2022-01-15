
import { ILogin, ILoginObj } from './type'
import { IData } from '../actionType'

enum loginApi {
  login = '/login', // 用户登录
  loginUserInfo = '/users/', // 根据id获取用户信息
  loginMenus = '/role/' // 根据id获取不同的菜单
}

import YhRequest from "../index";

// 用户登录
export function login(info: ILogin) {
  return YhRequest.post<IData<ILoginObj>>({
    url: loginApi.login,
    data: info
  })
}

// 根据id获取用户信息
export function getUserInfoById(id: number) {
  return YhRequest.get<IData>({
    url: loginApi.loginUserInfo + id,
    showLoading: false
  })
}

// 根据id获取不同的菜单
export function getRuleMenusById(id: number) {
  return YhRequest.get<IData>({
    url: loginApi.loginMenus + id + '/menu',
    showLoading: false
  })
}
