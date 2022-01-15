/**
 *
 * 定义自己的 YhInterceptor 拦截器
 * 内部返回四个拦截器 -> 函数
 * request：响应成功，失败拦截器；
 * response：响应成功，失败
 *
 * 用类 YHrequestConfig 继承 AxiosRequestConfig，加入自定义的接口拦截器
 * 在原本的类型中扩展
*/

import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 如果接口里面有函数，并且类型不确定时，用泛型提到接口外面使用

interface YhInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface YHrequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YhInterceptor<T>
  showLoading?: boolean
}

export {YHrequestConfig, YhInterceptor}
