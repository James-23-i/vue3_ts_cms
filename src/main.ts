import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { globalFunc } from '@/global'
// import instance from '@/service'
import 'normalize.css'
import './assets/css/index.less'
import 'flex.css'
import { getInitData } from './store'
import 'flex.css/dist/data-flex.css'

const app = createApp(App)

getInitData()
app.use(router)
app.use(store)
globalFunc(app)


// instance.request({
//   url: '/get',
//   method: 'get',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独的请求拦截成功')
//       return config
//     },
//     requestInterceptorCatch: (err) => {
//       console.log('单独的请求拦截失败')
//       return err
//     },
//     responseInterceptor: (res) => {
//       console.log('单独的响应拦截成功')
//       return res
//     },
//     responseInterceptorCatch: (err) => {
//       console.log('单独的响应拦截失败')
//       return err
//     },
//   },
// })

app.mount("#app")
