
import axios, { AxiosInstance } from 'axios'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'

import { YHrequestConfig, YhInterceptor } from './type'


class YhRequest {
  instance: AxiosInstance
  interceptors?: YhInterceptor
  loading?: ILoadingInstance
  showLoading: boolean
  constructor(config: YHrequestConfig) {
    this.showLoading = config.showLoading ?? true

    // 继续创建axios实例给instance
    this.instance = axios.create(config)

    // 将拦截器加在config配置上
    this.interceptors = config.interceptors

    // 往instance实例追加请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 往instance实例追加响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局添加拦截器
    this.instance.interceptors.request.use(config => {
      if (this.showLoading) {
        this.loading = ElLoading.service({
          text: '加载中...'
        })
      }
      return config
    }, err => {
      this.loading?.close()
      return err
    })
    this.instance.interceptors.response.use(res => {
      this.loading?.close()
      return res
    }, err => {
      return err
    })
  }

  request<T>(config: YHrequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        // 往 request 请求内部单独添加拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance.request<any, T>(config).then(res => {
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        resolve(res)
        this.showLoading = true
      }, err => {
        reject(err)
        this.showLoading = true
        return err
      })
    })
  }

  get<T>(config: YHrequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'get'})
  }

  post<T>(config: YHrequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'post'})
  }

  patch<T>(config: YHrequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'patch'})
  }

  delete<T>(config: YHrequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'delete'})
  }
}

export default YhRequest
