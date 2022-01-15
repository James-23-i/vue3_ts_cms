// 请求成功返回数据的接口模型
export interface IData<T = any> {
  code: number
  data: T
}
