/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 定义装饰器
declare module "*.json"
