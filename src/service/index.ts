import YhRequest from "./request";
import { TIME_OUT, BASE_URL } from './request/config'

import Cache from '@/utils/cache/cache'

const instance = new YhRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 在创建的实例中拦截token
      const token = Cache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (err) => {
      return err
    },
  },
})

export default instance
