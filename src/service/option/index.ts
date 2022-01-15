import YhRequest from '../index'
import { IData } from '../actionType'

// 获取部门、角色下拉数据
export function getDepartmentList(url: string, data: any) {
  return YhRequest.post<IData>({
    url,
    data
  })
}
export function getRoleList(url: string, data: any) {
  return YhRequest.post<IData>({
    url,
    data
  })
}
export function getMenuList(url: string, data: any) {
  return YhRequest.post<IData>({
    url,
    data
  })
}
