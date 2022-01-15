import YhRequest from '../../index'
import { IData } from '../../actionType'

// 获取分页数据
export function getPage(url: string, data: any) {
  return YhRequest.post<IData>({
    url,
    data
  })
}

// 新增编辑功能
export function addData(url: string, data: any) {
  return url.split('/')[1] ? YhRequest.patch<IData>({ url, data }) : YhRequest.post<IData>({ url, data })
}

// 删除功能
export function delDataById(url: string) {
  return YhRequest.delete<IData>({
    url
  })
}

// 详情功能
export function detailData(url: string) {
  return YhRequest.get<IData>({
    url
  })
}


